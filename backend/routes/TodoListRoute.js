const express = require('express')
const {
    createTask,
    getAllTask,
    getTask,
    deleteTask,
    updateTask
} = require('../controllers/TodoListController')

const router = express.Router()

// GET all task
router.get('/', getAllTask)

// GET single task
router.get('/:id', getTask)

// POST new task
router.post('/', createTask)

// DELETE task
router.delete('/:id', deleteTask)

// UPDATE task
router.patch('/:id', updateTask)

module.exports = router