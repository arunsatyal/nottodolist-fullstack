import TaskSchema from "../schema/TaskSchema.js"

// Read
export const getTasks = () => {
  return TaskSchema.find();
}

// Read One
export const getTask = (id) => {
  return TaskSchema.findById(id)
}

//create
export const createTask = (taskObj) => {
  return TaskSchema(taskObj).save();
}


//update
export const updateTask = (id, updatedData) => {
  return TaskSchema.findByIdAndUpdate(id, updatedData)
}

// delete
export const deleteTask = (id) => {
  return TaskSchema.findByIdAndDelete(id)
}