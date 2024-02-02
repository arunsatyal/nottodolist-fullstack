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

#### Express

- NPM `npm install express`
- Yarn `yarn add express`

#### Mongoose

    - NPM `npm install mongoose`
    - Yarn `yarn add mongoose`

#### Nodemon

    - NPM `npm install nodemon`
    - Yarn `yarn add nodemon`

#### CORS

    - NPM `npm install cors`
    - Yarn `yarn add cors`

### 🗄️ Setting up Database Connection to MongoDB with Server.js

Create 'server.js' file inside 'api' directory and paste following code:

```JavaScript
import express from "express"
import cors from 'cors'
import path from "path"

const _dirname = path.resolve()

import { connectMongo } from "./src/config/dbConfig.js"

import taskRouter from "./src/router/taskRouter.js"

const app = express()
const PORT = 8000

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
