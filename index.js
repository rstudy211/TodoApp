const express = require("express");
const mongoose = require("mongoose");
const app = express();
const taskModel = require("./model/todoSchema");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // to set view engine
//rsapp.use();

// mongoose.connect("mongodb://localhost:27017/todoListDB");
// const todoSchema = {
//   caption: String,
//   isCompleted: Boolean,
// };

// const taskModel = mongoose.model("taskModel", todoSchema);

app.get("/", async (req, res) => {
  //res.send("all thing is working");
  let data = await taskModel.find({});
  //console.log(data);
  //res.send(data);
  let itemsLeft = data.filter((d) => `${d.isCompleted}` === "false");
  if ("isCompleted" in req.query) {
    data = data.filter((d) => `${d.isCompleted}` === req.query.isCompleted);
  }

  console.log(itemsLeft.length);
  return res.render("index", {
    todosCollection: data,
    itemsLeft: itemsLeft.length,
  });
});

app.post("/add", async (req, res) => {
  const newTask = new taskModel({
    caption: req.body.task,
    isCompleted: false,
  });
  console.log(req.query.isCompleted);
  await newTask.save();
  //res.send({todosCollection: data})
  console.log(req.query);

  res.redirect(req.get("referer"));
});

app.post("/toggle/:_id", async (req, res) => {
  const { toggleStatus } = req.body;
  console.log(req.body.toggleStatus);
  var objectId = mongoose.Types.ObjectId(req.params._id);
  var temp = toggleStatus == "false" ? true : false;
  console.log(temp);
  await taskModel.updateOne({ _id: objectId }, { isCompleted: temp });
  //res.send(req.body.checkbox);
  res.redirect(req.get("referer"));
});

app.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log("delete Succesfully");
  await taskModel.deleteOne({ _id });
  res.redirect(req.get("referer"));
});

app.listen(4000);
