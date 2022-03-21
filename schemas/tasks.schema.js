const mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    status: {type: Boolean, required: true, default: true},
    subtask: {type: Array, default: ["Coding MERN", "Coding JAva", "coding PYTHON"]} //One - to - many --> one task can have multiple subtasks
})

module.exports = mongoose.model("task", taskSchema)