import express from "express"
import cors from 'cors'
import path from "path"

const _dirname = path.resolve()

import { connectMongo } from "./src/config/dbConfig.js"

import taskRouter from "./src/router/taskRouter.js"

const app = express()
const PORT = process.env.PORT || 8000

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