const dummyData = [
    {
        text: 'Take garbage out',
        completed: true
    },
    {
        text: 'Work on weekend coding project',
        completed: false
    },
    {
        text: 'Practice piano',
        completed: false
    },
    {
        text: 'Eat junk food and pass out',
        completed: true
    }
];

console.log('client.js loaded');

$(document).ready(function() {
    console.log('jQuery loaded');

    $('#submit-btn').on('click', addTodo);

    // displayList(dummyData);
    getTodos();
});

function addTodo() {
    
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