const { Router } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

module.exports = todoRouter;