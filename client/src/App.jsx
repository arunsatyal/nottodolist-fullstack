import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import { Col, Container, Row, Stack } from "react-bootstrap";

import TaskForm from "./components/taskForm";
import TaskList from "./components/taskList";
import { getTasks } from "./helper/axios";

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
