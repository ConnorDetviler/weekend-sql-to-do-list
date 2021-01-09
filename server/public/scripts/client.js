console.log('client.js loaded');

$(document).ready(function() {
    console.log('jQuery loaded');

    $('#submit-btn').on('click', addTodo);
    $('#todo-list').on('click', '.delete-btn', deleteTodo);

    getTodos();
});

function addTodo() {
    const dataToSend = {text: $('#todo-in').val(), completed: false}
    $.ajax({
        type: 'POST',
        url: '/todos',
        data: dataToSend
    }).then(function(response) {
        getTodos();
        $('#todo-in').val('');
    })
}

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

function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function(response) {
        console.log(response);
        displayList(response);
    });
};

function displayList(listData) {
    $('#todo-list').empty();

    for (let i = 0; i < listData.length; i++) {
        //'completed-true', 'completed-false' classes allow styling to show whether a todo is completed
        // $('#todo-list').append(`<li class="completed-${listData[i].completed}">${listData[i].text}<button class="delete-btn">delete</button></li>`)
        $('#todo-list').append(`<tr data-id="${listData[i].id}" class="completed-${listData[i].completed}">
                                    <td class="todo-text">${listData[i].text}</td>
                                    <td><button class="delete-btn">X</button></td>
                                </tr>`)
    }
}