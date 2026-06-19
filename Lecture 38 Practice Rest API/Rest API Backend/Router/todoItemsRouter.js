const express = require('express');
const todoItemsRouter = express.Router();

const todoItemsController = require('../Controller/todoItemsController');



todoItemsRouter.post('/', todoItemsController.createTodoItems)



module.exports = todoItemsRouter; 