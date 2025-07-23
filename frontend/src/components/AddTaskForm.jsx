import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const newTask = await response.json();
        onTaskAdded(newTask); // Notify parent component to refresh tasks
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to add task");
        alert("Failed to add task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error connecting to the server. Please try again later.");
    }
  };

  return (
    <Card className="p-4 mb-4 shadow-sm">
      <Card.Title className="mb-3">
        <h4>Add a Task</h4>
      </Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="taskTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </Card>
  );
}

export default AddTaskForm;
