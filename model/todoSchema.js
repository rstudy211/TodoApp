const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todoListDB");
const todoSchema = {
  caption: String,
  isCompleted: Boolean,
};
const taskModel = mongoose.model("taskModel", todoSchema);
module.exports = taskModel;
