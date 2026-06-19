const TodoItems = require("../model/todoItems");


exports.createTodoItems = async (req, res, next) => {
    console.log(req.body);
    const {task, date} = req.body;
    const todoItems = new TodoItems({ task, date });
    await todoItems.save();
    res.status(201).json(todoItems);
}