const request = require("supertest");
const app = require("../../src/app"); // Adjust path to your app.js
const pool = require("../../src/config/db");

describe("Task API Integration Tests", () => {
  beforeAll(async () => {
    // Clear tasks table before running tests
    await pool.query("DELETE FROM tasks");
  });

  afterAll(async () => {
    // Clear tasks table after all tests
    await pool.query("DELETE FROM tasks");
    await pool.end(); // Close the pool connection
  });

  let taskId;

  test("POST /api/tasks - should create a new task", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Integration Test Task",
      description: "This is a task for integration testing.",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Integration Test Task");
    expect(res.body.completed).toBe(false);
    taskId = res.body.id;
  });

  test("GET /api/tasks - should retrieve the most recent 5 active tasks", async () => {
    // Create more tasks to ensure limit of 5 is tested
    for (let i = 0; i < 6; i++) {
      await request(app)
        .post("/api/tasks")
        .send({ title: `Extra Task ${i}`, description: `Description ${i}` });
    }

    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeLessThanOrEqual(5);
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body.every((task) => task.completed === false)).toBe(true);
  });

  test("PUT /api/tasks/:id/complete - should mark a task as completed", async () => {
    const res = await request(app).put(`/api/tasks/${taskId}/complete`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(taskId);
    expect(res.body.completed).toBe(true);
  });

  test("GET /api/tasks - should not show the completed task", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
    const completedTaskExists = res.body.some((task) => task.id === taskId);
    expect(completedTaskExists).toBe(false);
  });

  test("POST /api/tasks - should return 400 if title is missing", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ description: "Missing title" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe("Title is required");
  });

  test("PUT /api/tasks/:id/complete - should return 404 for non-existent task", async () => {
    const res = await request(app).put("/api/tasks/99999/complete");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Task not found");
  });
});
