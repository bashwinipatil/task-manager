const db = require("../config/db");

// Create Task
exports.createTask = (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [title, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task created" });
    }
  );
};

// Get Tasks
exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// Update Task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.query(
    "UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?",
    [completed, id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task updated" });
    }
  );
};

// Delete Task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task deleted" });
    }
  );
};
