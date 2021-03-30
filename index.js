
const express = require("express");
const app = express();
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")


app.set("views",path.join(__dirname,"views" ))
app.set("view engine", "ejs")

//middleware

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride("_method"))

let tasks =[
    {
        id: uuidv4(),
        task:"Clean My Office",
        deadline: "Monday"
    },
    {
        id: uuidv4(),
        task:"Clean My car",
        deadline: "Monday"
    },
    {
        id: uuidv4(),
        task:"Clean My closet",
        deadline: "Monday"
    },
    {
        id: uuidv4(),
        task:"Clean My house",
        deadline: "Monday"
    },
    {
        id: uuidv4(),
        task:"Clean My clothes",
        deadline: "Monday"
    }
]

//this will be our main index

app.get("/tasks", (req,res)=>{
    res.render("tasks/index", {tasks})

})

//this will be our form to push a new task

app.get("/tasks/new", (req,res)=>{
    res.render("tasks/new")
})

//this is the action of posting the form

app.post("/tasks", (req,res)=>{
    const {task,deadline} = req.body
    tasks.push({task,deadline, id: uuidv4()})
    res.redirect("/tasks")
  

})

//this will allow us to view individual tasks
app.get("/tasks/:id",(req,res)=>{
    const {id} = req.params;
    const task = tasks.find(c => c.id === id)
res.render("tasks/show" ,{task})
})

//this will serve the form to edit a post

app.get("/tasks/:id/edit", (req,res)=>{
    const {id} = req.params
    const task = tasks.find(f => f.id ===id)
    res.render("tasks/edit", {task})
})
//this lets you edit the post

app.patch("/tasks/:id",(req,res)=>{
    const {id}= req.params
    const newTask = req.body.task
    const findTask = tasks.find(t => t.id === id);
    findTask.task = newTask
    res.redirect("/tasks")
})

//this will let you delete

app.delete("/tasks/:id",(req,res)=>{
    const {id} = req.params;
    tasks= tasks.filter(f => f.id !== id);
    res.redirect("/tasks")



})

app.listen(1800, ()=>{
    console.log("it workss")
})