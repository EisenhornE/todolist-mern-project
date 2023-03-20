const Todo = require ('../models/TodolistModel')

const mongoose = require('mongoose')

// get all task
const getAllTask = async (req, res) => {
    const todolist = await Todo.find({}).sort({createdAt: -1})

    res.status(200).json(todolist)
}

// get one task
const getTask = async (req, res) => {
    const {id} = req.params


    // Below is to ensure that it will throw an error message if the ID given is invalid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such task."})
    }

    const tdL = await Todo.findById(id)

    if(!tdL){
        return res.status(404).json({error: "No Such Task"})
    }
    
    res.status(200).json(tdL)
}


// create a task
const createTask = async (req, res) => {
    const {title, description, duedate, status} = req.body

    let emptyFields =  []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!duedate){
        emptyFields.push('duedate')
    }
    if(emptyFields.length > 0 ){
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db
    try{
        const todolist = await Todo.create({title, description, duedate, status})
        res.status(200).json(todolist)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such task."})
    }

    const todolist = await Todo.findOneAndDelete({_id: id})

    res.status(200).json(todolist)
}

// update workout

const updateTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such task."})
    }

    const todolist = await Todo.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!tdL){
        return res.status(404).json({error: "No Such Task"})
    }

    res.status(200).json(todolist)
}

// export

module.exports = {
    getAllTask,
    getTask,
    createTask,
    deleteTask,
    updateTask
}