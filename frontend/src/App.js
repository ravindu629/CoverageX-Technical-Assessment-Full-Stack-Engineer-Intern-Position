import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import AddTaskForm from "./components/AddTaskForm";
import TaskCard from "./components/TaskCard";
import "./App.css"; // For general app styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setError(null);
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
        setError("Failed to load tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(
        "Could not connect to the backend API. Please ensure the backend is running."
      );
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskAdded = (newTask) => {
    // Optimistically add the new task and then refetch to ensure it respects the 5-task limit and order
    fetchTasks();
  };

  const handleTaskCompleted = (completedTaskId) => {
    // Remove the completed task from the UI immediately and then refetch
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== completedTaskId)
    );
    fetchTasks();
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">📝 My To-Do App</h1>
      <Row>
        <Col md={5}>
          <AddTaskForm onTaskAdded={handleTaskAdded} />
        </Col>
        <Col md={7}>
          <h2 className="mb-3">Current Tasks</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {tasks.length === 0 && !error ? (
            <p>No active tasks. Add a new one!</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskCompleted={handleTaskCompleted}
              />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
