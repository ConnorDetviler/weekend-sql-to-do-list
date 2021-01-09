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


// PUT


// DELETE

module.exports = todoRouter;