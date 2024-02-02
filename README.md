# MERN Not-Todo List App

This is a simple Not-Todo List App built with MERN (MongoDB, Express.js, React and Node.js) and React-Bootstrap for front-end design. The app designed and built to create and manage your daily tasks into 2 main categories, Todo and Not-Todo.

This app also has CORS (Cross-origin resource sharing) to prevent malicious cross-origin HTTP requests.

## 🚀 Getting Started

This application runs on Windows 10, 11, macOS and Linux. I've built and tested this application on macOS.

#### Tools you need:

- [Visual Studio Code (VS Code)](https://code.visualstudio.com/download)
- [NPM (Node Package Manager)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)

### 💻 Setting up your Local Server

Follow the simple steps to setup your local server using vscode terminal:

#### 📁 Creating directories

- Create new directory 'not-todo-list' `mkdir not-todo-list`
- Inside 'not-todo-list' directory, create another 2 directories named 'api' and 'client'

- Type `cd api` to go inside the 'api' directory

- Initialize your folder using NPM `npm init` or using Yarn `yarn init`

- It asks to type project details (e.g. project name, version, description, author etc.. ) which not much important until you make commercial application.

- Now it creates a file named package.json inside api directory. Open that file and add following code:

```Javascript
"type: "module",

"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

#### Install Dependencies using NPM or Yarn

Yarn is just a better alternative to NPM. I recommend to use Yarn for faster installation process.

#### Install Express

NPM

```bash
npm install nodemon
```

Yarn

```bash
yarn add nodemon
```

#### Install Mongoose

NPM

```bash
npm install mongoose
```

Yarn

```bash
yarn add mongoose
```

#### Install Nodemon

NPM

```bash
npm install nodemon
```

Yarn

```bash
yarn add nodemon
```

#### CORS

NPM

```bash
npm install cors
```

Yarn

```bash
yarn add cors
```

### 🖥️ Setting up Server with Server.js

Create 'server.js' file inside 'api' directory and paste following code:

```JavaScript
import express                                                   from "express"
import cors                                                      from 'cors'
import path                                                      from "path"


// Import dependencies

import { connectMongo }                                          from "./src/config/dbConfig.js"
import taskRouter                                                from "./src/router/taskRouter.js"


// Define dirname and Port

const _dirname = path.resolve()
const PORT = 8000

const app = express()


// Define the CORS options
const corsOptions = {
  credentials: true,
   // Whitelist the domains you want to allow
  origin: true,
};

// Use the cors middleware with your options
app.use(cors(corsOptions));

// Connect to database
connectMongo()

// middleware to parse request
app.use(express.json());

//SSR
app.use('/', express.static(path.join(_dirname, 'frontendBuild')))

// Tasks Routes
  app.use("/api/tasks", taskRouter)

// start a server
app.listen(PORT, (error)=>{
  error ? console.log("Error", error) : console.log("Your seerver is running at http://localhost:" + PORT)
})

```

### 🗄️ Setting up Database Connection

Create a new directory named 'src' inside the 'api' project directory. Then, within the 'src' directory, create another directory called 'config'. This structure will organize the project more efficiently.

Now, in 'config' folder, create a file `dbConfig.js` and paste the following code:

```Javascript
import mongoose                                                  from "mongoose";


// Define and connect to database URI

const mongo_db_url = "mongodb://localhost:27017/ntdl-db";


// Function to connect MongoDB

export const connectMongo = () => {
  try {
    const connect = mongoose.connect(mongo_db_url);
    if (connect) {
      console.log("Database conected at" + mongo_db_url);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

```

### 🚦 Creating Schema

Schema defines the data structure, data types, relation between multiple tables, and data blueprint.

In this project, I used schema to define data structure for each task.

To make Schema, create one new directory named 'schema' inside the folder 'src'. Then create new file named 'TaskSchema.js' inside the 'src' directory and copy following code:

```Javascript

import mongoose                                                  from "mongoose";

const TaskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    default: "easy",
  },
  time_to_complete: {
    type: Number,
    required: true,
  },
  priority: {
    type: String,
    default: "low",
  },
  type: {
    type: String,
    default: "completed",
  },
});

export default mongoose.model("tasks", TaskSchema);

```

#### In above's schema:

I wrote a simple data structure rules for different keys task_name, difficulty, time_to_complete, priority and type.

### ⚙️ Creating Model to Perform CRUD Operation

Model creates data as per rules defined by schema, organize and stores to database.
In most of the projects we use model to perform CRUD operation. CRUD stands for Create, Read, Update and Delete the data from database.

To create model, make new directory named 'model' inside 'src' folder and create new file 'TaskModel.js' inside the directory.

Copy following code in TaskModel.js

```Javascript
import TaskSchema                                                from "../schema/TaskSchema.js"

// Read all data
export const getTasks = () => {
  return TaskSchema.find();
}

// Read one data
export const getTask = (id) => {
  return TaskSchema.findById(id)
}

//Create a data
export const createTask = (taskObj) => {
  return TaskSchema(taskObj).save();
}


//Update a data
export const updateTask = (id, updatedData) => {
  return TaskSchema.findByIdAndUpdate(id, updatedData)
}

// Delete a data
export const deleteTask = (id) => {
  return TaskSchema.findByIdAndDelete(id)
}
```

### 🌏 Router

A router allows you to define routes based on the URL and HTTP method. Each route can have one or more handler functions, which are executed when the route is matched.

To create router, simply make new directory called 'router' inside 'src' folder and create taskRouter.js file inside new 'router' directory and copy following code:

```Javascript
import express                                                   from "express"

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

```
