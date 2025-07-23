const pool = require("../config/db");

class Task {
  static async create(title, description) {
    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return result.rows[0];
  }

  static async getAllActive() {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5"
    );
    return result.rows;
  }

  static async markAsCompleted(id) {
    const result = await pool.query(
      "UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Task;
