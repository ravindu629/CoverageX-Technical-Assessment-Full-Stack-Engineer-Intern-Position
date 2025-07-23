const Task = require("../../src/models/taskModel");
const pool = require("../../src/config/db");

// Mock the pg pool
jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}));

describe("Task Model", () => {
  beforeEach(() => {
    pool.query.mockClear();
  });

  test("should create a new task", async () => {
    const mockTask = {
      id: 1,
      title: "Test Task",
      description: "Description",
      completed: false,
    };
    pool.query.mockResolvedValueOnce({ rows: [mockTask] });

    const newTask = await Task.create("Test Task", "Description");
    expect(newTask).toEqual(mockTask);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      ["Test Task", "Description"]
    );
  });

  test("should get the most recent 5 active tasks", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", completed: false, created_at: new Date() },
      { id: 2, title: "Task 2", completed: false, created_at: new Date() },
    ];
    pool.query.mockResolvedValueOnce({ rows: mockTasks });

    const tasks = await Task.getAllActive();
    expect(tasks).toEqual(mockTasks);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM tasks WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5"
    );
  });

  test("should mark a task as completed", async () => {
    const mockCompletedTask = {
      id: 1,
      title: "Test Task",
      description: "Description",
      completed: true,
    };
    pool.query.mockResolvedValueOnce({ rows: [mockCompletedTask] });

    const completedTask = await Task.markAsCompleted(1);
    expect(completedTask).toEqual(mockCompletedTask);
    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *",
      [1]
    );
  });
});
