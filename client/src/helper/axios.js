import axios from "axios"

const API_BASE_URL = "http://localhost:8000/api/tasks"

// Frontend CRUD operations here
//get all tasks
export const getTasks = () => {
    const response = axios.get(API_BASE_URL)
                      .then(res => res.data)
                      .catch(error => error)
    
    return response
};

//create a task
export const createTask = (task) => {
  const response = axios.post(API_BASE_URL, task)
                    .then(res => res.data)
                    .catch(error => error)

  return response
}

//delete a task
export const deleteTask = (id) => {
  const response = axios.delete(API_BASE_URL + `/${id}`)
                    .then(res => res.data)
                    .catch(error => error)

  return response
}

//update a task
export const updateTask = (id, updatedFieldObj) => {
  const response = axios.patch(API_BASE_URL + `/${id}`, updatedFieldObj)
                    .then(res => res.data)
                    .catch(error => error)

  return response
}

