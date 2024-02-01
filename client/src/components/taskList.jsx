/* eslint-disable react/prop-types */
import { useState }                               from "react";
import { Alert, ListGroup, Badge, Button, Stack } from "react-bootstrap";

import { BsTrash, BsArrowRight, BsArrowLeft }     from "react-icons/bs";

import EmptyState                                 from "./emptyState";
import { deleteTask, updateTask }                 from "../helper/axios";

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
