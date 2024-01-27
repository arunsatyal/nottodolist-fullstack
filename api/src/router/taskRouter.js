import express from "express"

import { createTask, deleteTask, getTask, getTasks, updateTask } from "../model/TaskModel.js"

const taskRouter = express.Router()

// Index | Get all task
taskRouter.get("/", (req, res) => {
  getTasks()
    .then((tasks)=>{
      res.json({
        status: "success",
        data: tasks,
      })
    })
    .catch((error) => {
      res.json({
        error: error,
      })
    })
})

// Show | get a single task
taskRouter.get("/:id", (req, res) => {
  getTask(req.params.id)
    .then((task)=>{
      res.json({
        status: "success",
        data: task,
      })
    })
    .catch((error) => {
      res.json({
        error: error,
      })
    })
})

// Create | create a task
taskRouter.post("/", (req, res) => {
  createTask(req.body)
    .then((task)=>{
      res.json({
        status: "success",
        data: task,
      })
    })
    .catch((error) => {
      res.json({
        error: error,
      })
    })
})

// Update | update a task
taskRouter.patch("/:id", (req, res) => {
  updateTask(req.params.id, req.body)
    .then((task)=>{
      res.json({
        status: "success",
        data: task,
      })
    })
    .catch((error) => {
      res.json({
        error: error,
      })
    })
})

// Delete | delete a task
taskRouter.delete("/:id", async(req, res) => {
  deleteTask(req.params.id)
    .then((task)=>{
      res.json({
        status: "success",
        data: task,
      })
    })
    .catch((error) => {
      res.json({
        error: error,
      })
    })
})

export default taskRouter