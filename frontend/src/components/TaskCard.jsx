import React from "react";
import { Card, Button } from "react-bootstrap";

function TaskCard({ task, onTaskCompleted }) {
  const handleComplete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}/complete`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        onTaskCompleted(task.id); // Notify parent component to remove task
      } else {
        console.error("Failed to complete task");
        alert("Failed to mark task as complete.");
      }
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <Card className="mb-3 p-3 shadow-sm d-flex justify-content-between align-items-center flex-row">
      <div>
        <Card.Title className="mb-1">{task.title}</Card.Title>
        <Card.Text className="text-muted">{task.description}</Card.Text>
      </div>
      <Button variant="outline-success" onClick={handleComplete}>
        Done
      </Button>
    </Card>
  );
}

export default TaskCard;
