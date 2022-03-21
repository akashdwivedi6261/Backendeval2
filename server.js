const express = require("express");
const mongoose = require("mongoose");
const SubtaskModel = require("./schemas/subtasks.schema")
const TaskModel = require("./schemas/tasks.schema")
global.bodyParser = require('body-parser');


const cors = require("cors");
let PORT = 8002;

let app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
  }))
  app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 100000
  }))

mongoose.connect("mongodb+srv://akash:rewa_123@cluster0.a6hwt.mongodb.net/stackoverflow?retryWrites=true&w=majority");

app.get("/tasks", async (req, res) => { //get tasks
    let tasks = await TaskModel.find();
    res.status(200).json(tasks)
})

app.post('/tasks', async (req, res) => {
    let createdTask = await TaskModel.create(req.body)
    res.status(200).json(createdTask)
})

app.get("/tasks/:id", async (req, res) => { //get tasks
    let task = await TaskModel.findById(req.params.id).populate("subtask");
    res.status(200).json(task)
})



app.get("/subtask", async (req, res) => { //get tasks
    let task = await SubtaskModel.find();
    res.status(200).json(task)
})

app.post('/subtask', async (req, res) => {
    let createdTask = await SubtaskModel.create(req.body)
    res.status(200).json(createdTask)
})

app.patch("/tasks/:id", async(req, res) => {
      let updatedUser = await TaskModel.findByIdAndUpdate(
           req.params.id,
           req.body,
           {new:true}
       );
       res.status(200).json(updatedUser)
   })

    app.delete("/tasks/:id", async(req, res) => {
       let deletedUser =  await TaskModel.findByIdAndDelete(req.params.id)
       res.status(200).json(deletedUser)
   })

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})