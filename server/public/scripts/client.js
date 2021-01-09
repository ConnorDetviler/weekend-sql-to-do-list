console.log('client.js loaded');

$(document).ready(function() {
    console.log('jQuery loaded');

    $('#submit-btn').on('click', addTodo);

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
        $('#todo-list').append(`<li class="completed-${listData[i].completed}">${listData[i].text}</li>`)
    }
}