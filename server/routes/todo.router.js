const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
todoRouter.get('/', (req,res) => {
    const queryText = 'SELECT * FROM "todos";';
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// POST
todoRouter.post('/', (req,res) =>{
    const newTodo = req.body;
    const queryText =
    `INSERT INTO "todos" ("text", "completed")
    VALUES ($1, $2);`;

    pool.query(queryText, [req.body.text, req.body.completed])
    .then((result) => {
        console.log(result);
        res.sendStatus(201)
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// PUT


// DELETE

module.exports = todoRouter;