console.log('client.js loaded');

$(document).ready(function() {
    console.log('jQuery loaded');

    $('#submit-btn').on('click', addTodo);
    $('#todo-list').on('click', '.delete-btn', deleteTodo);
    $('#todo-list').on('click', '.todo-text', toggleCompleted);

    getTodos();
});

function addTodo() {
    if ($('#todo-in').val() === '') {
        alert('form is empty');
        return;
    } else {
        const dataToSend = {text: $('#todo-in').val(), completed: false}
        $.ajax({
            type: 'POST',
            url: '/todos',
            data: dataToSend
        }).then(function(response) {
            getTodos();
            $('#todo-in').val('');
            // $('#todo-in').focus();
        }).catch(function(error) {
            console.log('Error in POST', error);
            alert('Unable to add a new task at this time. Please try again later.');
        });
    };
};

function deleteTodo() {
    const id = $(this).closest('tr').data('id');
    console.log(id);
    $.ajax({
        type: 'DELETE',
        url: `/todos/${id}`
    }).then(function(response) {
        console.log('Response from server', response);
        getTodos();
    }).catch(function(error) {
        console.log('Error in DELETE', error);
    });
};

function toggleCompleted() {
    const id = $(this).closest('tr').data('id');
    $.ajax({
        type: 'PUT',
        url: `/todos/${id}`
    }).then(function(response) {
        console.log('Response from server', response)
        getTodos();
    }).catch(function(error) {
        console.log('Error in PUT', error);
    })
};

function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function(response) {
        console.log(response);
        displayList(response);
    }).catch(function(error) {
        console.log('Error in GET', error);
    });
};

function displayList(listData) {
    $('#todo-list').empty();

    for (let i = 0; i < listData.length; i++) {
        let completeClass;
        if(listData[i].completed === false) { // if task is not yet completed
            completeClass = '' // default state
        } else {
            completeClass = 'completed-task' // disabled to show that task is checked off
        }
        $('#todo-list').append(`<tbody id="list-body"></tbody>`)
        $('#list-body').append(`<tr data-id="${listData[i].id}" class="table-hover ${completeClass} ">
                                    <td class="todo-text"><span>${listData[i].text}</span></td>
                                    <td align="right"><button class="delete-btn">X</button></td>
                                </tr>`)
    }
}