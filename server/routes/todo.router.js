const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
todoRouter.get('/', (req,res) => {
    const queryText = 'SELECT * FROM "todos" ORDER BY "id";';
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
todoRouter.put('/:id', (req,res) => {
    const id = req.params.id;
    // SET "completed" = NOT "completed" toggles the boolean value in the SQL database
    const queryText = `UPDATE "todos"
                       SET "completed" = NOT "completed"
                       WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// DELETE
todoRouter.delete('/:id', (req,res) => {
    const id = req.params.id;
    const queryText = `DELETE FROM "todos" WHERE "id" = $1`

    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});


module.exports = todoRouter;