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

#### 📁 Creating Directory

- Create new directory 'not-todo-list' `mkdir not-todo-list`
- Inside 'not-todo-list' directory, create another directory named 'api'

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

### 👩🏻‍💻 Setting up Front-End (Client)

I used Vite + React to setup application front-end and Bootstrap to biuld front-end user interface.

In your terminal, navigate to your project root directory 'not-todo-list' and type following command to install Vite

#### Inatall Vite using Vscode Terminal:

```bash
npm create vite@latest
```

```bash
yarn create vite@latest
```

- Type your project name 'client' and hit enter
- Select React from the available options and hit enter.
- Select JavaScript from the available options and hit enter.
- Type `cd client` in terminal
- Type `yarn` and enter
- Type `yarn dev` to run your front-end initial design on your local server.

### 💿 Install React Bootstrap using NPM or Yarn

`npm install react-bootstrap bootstrap`

`yarn add react-bootstrap bootstrap`

### ✏️ Reset / Cleanup Default Designs

When you install Vite and run your server, it will displays default design with vite react logo and other texts which needs to delete and replace following code in App.jsx file located in `client/src/App.jsx`

```Javascript

import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState }                                   from "react";

import { Col, Container, Row, Stack }                            from "react-bootstrap";

import TaskForm                                                  from "./components/taskForm";
import TaskList                                                  from "./components/taskList";
import { getTasks }                                              from "./helper/axios";

function App() {
 const [taskList, setTaskList] = useState([]);

 const fetchTasks = async () => {
   const result = await getTasks();

   if (result.status === "success") {
     setTaskList(result.data);
   }
 };

 useEffect(() => {
   fetchTasks();
 }, []);

 const completedTask = taskList.filter((task) => task.type === "completed");
 const badTask = taskList.filter((task) => task.type === "bad");

 return (
   <Container>
     <Row className="p-2 text-center">
       <h1>Not ToDo List</h1>
     </Row>

     <TaskForm fetchTasks={fetchTasks} />

     <Stack className="border p-4 shadow bg-white my-2">
       <Row>
         <Col>
           <TaskList
             title="COMPLETED TASK"
             taskList={completedTask}
             fetchTasks={fetchTasks}
           />
         </Col>

         <Col>
           <TaskList
             title="BAD TASK"
             taskList={badTask}
             fetchTasks={fetchTasks}
           />
         </Col>
       </Row>
     </Stack>
   </Container>
 );
}

export default App;


```

### Reset App.css and Index.css

Open 'App.css' and 'Index.css' located 'src' directory delete all CSS code inside.

### Create Components

We need to make different components and combine them into single page app. In this project, I made following components:

- TaskName
- TaskForm
- EmptyState

Nevigate to your client src folder and create 3 files named
'taskList.jsx', 'taskForm.jsx' and 'emptyState.jsx'.

Copy all the codes to related files

#### taskList.jsx

```Javascript
/* eslint-disable react/prop-types */
import { useState }                                              from "react";
import { Alert, ListGroup, Badge, Button, Stack }                from "react-bootstrap";

import { BsTrash, BsArrowRight, BsArrowLeft }                    from "react-icons/bs";

import EmptyState                                                from "./emptyState";
import { deleteTask, updateTask }                                from "../helper/axios";

const TaskList = (props) => {
  const { title, taskList = [], fetchTasks } = props;

  const [showAlert, setShowAlert] = useState(false);

  // Function to calculate total time
  const calculateTotalTime = () => {
    return taskList.reduce((total, task) => total + task.time_to_complete, 0);
  };

  const handleOnClick = async (id) => {
    const result = await deleteTask(id);

    if (result.status === "success") {
      setShowAlert(true);
      fetchTasks();
    }
  };

  const isBadList = title === "BAD TASK";

  const handleOnSwipe = async (id) => {
    // call api to update the task
    const updatedFieldObject = isBadList
      ? { type: "completed" }
      : { type: "bad" };
    const result = await updateTask(id, updatedFieldObject);

    if (result.status === "success") {
      fetchTasks();
    }
  };

  return (
    <Stack className="py-4">
      <strong className="mb-3">{title}</strong>

      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant="success"
        dismissible
      >
        <p>Task Delted Successfully!!</p>
      </Alert>

      {!taskList.length && <EmptyState />}

      {taskList && (
        <ListGroup>
          {taskList.map((task) => (
            <ListGroup.Item
              key={task.id}
              className="d-flex justify-content-between align-items-center"
            >
              <Stack gap={2}>
                <strong>
                  {task.task_name} ({task.time_to_complete} hours)
                </strong>

                <Stack direction="horizontal" gap={2}>
                  <Badge bg="primary">{task.priority}</Badge>

                  <Badge bg="info">{task.difficulty}</Badge>
                </Stack>
              </Stack>

              <Stack gap={2} direction="horizontal">
                <Button
                  variant="warning"
                  onClick={() => handleOnSwipe(task._id)}
                >
                  {isBadList ? <BsArrowLeft /> : <BsArrowRight />}
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleOnClick(task._id)}
                >
                  <BsTrash />
                </Button>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <p className="mt-3">
        Total time to complete: {calculateTotalTime()}
        {calculateTotalTime() < 2 ? " hour" : " hours"}
      </p>
    </Stack>
  );
};

export default TaskList;

```

#### taskForm.jsx

```Javascript
import { useState }                                              from 'react';
import { Container, Form, Row, Col, Button, Alert }              from 'react-bootstrap';
import { createTask }                                            from '../helper/axios';

const initialFormData = {
  task_name: '',
  time_to_complete: 0,
  difficulty: 'easy',
  priority: 'low',
}

const TaskForm = (props) => {
  const { fetchTasks } = props

  const [formData, setFormData] = useState(initialFormData)
  const [showAlert, setShowAlert] = useState(false)
  const [error, setError] = useState('')

  const {
    task_name,
    time_to_complete,
    difficulty,
    priority,
  } = formData

  const handleFormSubmit = async (e) => {
      e.preventDefault();

    // call api here to add data to database
    const result = await createTask(formData)

    if(result.error) {
      setShowAlert(true)
      setError(result.error.message)
    }

    if(result.status === 'success') {
      setError('')
      setShowAlert(true)
      setFormData(initialFormData)
      fetchTasks()
    }
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setFormData({
      ...formData,
      [name]: name === 'time_to_complete' ? Number(value) : value,
    })
  }

  return (
    <Container className='border p-4 shadow'>
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        variant={error ? 'danger' : 'success'}
        dismissible
      >
        {error
          ? <p>{error}</p>
          : <p>Task Created Successfully!!</p>
        }
      </Alert>

      <Form onSubmit={handleFormSubmit}>
        <Row className='my-2'>
          <Col>
            <Form.Group controlId="taskName">
              <Form.Label className='fw-bold'>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="task_name"
                placeholder="Enter task name"
                value={task_name}
                onChange={(e) => handleOnChange(e)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="timeToComplete">
              <Form.Label className='fw-bold'>Time to Complete</Form.Label>
              <Form.Control
                type="number"
                name="time_to_complete"
                placeholder="Enter time"
                value={time_to_complete}
                onChange={(e) => handleOnChange(e)}
                min={1}
                max={24}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="difficulty">
              <Form.Label className='fw-bold'>Difficulty</Form.Label>
              <Form.Select
                name="difficulty"
                value={difficulty}
                onChange={(e) => handleOnChange(e)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="priority">
              <Form.Label className='fw-bold'>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={priority}
                onChange={(e) => handleOnChange(e)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="d-block mx-auto my-4">
          Add Task
        </Button>
      </Form>
    </Container>
  );
};

export default TaskForm;

```

#### emptyState.jsx

```Javascript
import { Container }                                             from 'react-bootstrap';

const EmptyState = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center border p-4'>
      <p className='fw-bold'>No task added!!</p>
    </Container>
  );
};

export default EmptyState;

```
