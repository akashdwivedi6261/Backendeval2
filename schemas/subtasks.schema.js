const mongoose = require("mongoose");

let subtaskSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model("subtask", subtaskSchema)