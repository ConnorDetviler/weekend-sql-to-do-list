console.log('client.js loaded');

const maxCharacters = 140;

$(document).ready(function() {
    console.log('jQuery loaded');

    $('#submit-btn').on('click', addTodo);
    $('#todo-list').on('click', '.delete-btn', deleteTodo);
    $('#todo-list').on('click', '.todo-line', toggleCompleted);
    // next event listener counts down max characters for input
    $('#todo-in').keyup(function() {
        let length = $(this).val().length;
        let remaining = maxCharacters - length;
        console.log(remaining);
        $('#characters-remaining').html(`${remaining}`)
    })

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
        let checkIcon;
        if(listData[i].completed === false) { // if task is not yet completed
            completeClass = '' // default state
            checkIcon = 'far fa-square'
        } else {
            completeClass = 'completed-task' // disabled to show that task is checked off
            checkIcon = 'far fa-check-square'
        }
        $('#todo-list').append(`<tbody id="list-body"></tbody>`)
        $('#list-body').append(`<tr data-id="${listData[i].id}" class="table-hover">
                                    <td class="todo-line ${completeClass}"><i class="${checkIcon} checkbox-style"></i><span class="text-break todo-text"> ${listData[i].text}</span></td>
                                    <td align="right"><i class="delete-btn far fa-trash-alt fa-lg"></i></td>
                                </tr>`)
    }
}