import { useState } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { createTask } from '../helper/axios';

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
