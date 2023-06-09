require('dotenv').config()

const express = require('express')

const todoListRoutes = require('./routes/TodoListRoute')

const mongoose = require('mongoose')


// express app
const app = express() 


//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/todoList', todoListRoutes)

// Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        // Listening for requests
        app.listen(process.env.PORT, () => {
            console.log('listening to port: ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })