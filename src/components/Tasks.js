import React, { useState, useEffect } from "react";
import axios from "axios";

// Set your FastAPI backend URL here:
const API = "https://task-manager-api-production-b6c2.up.railway.app/tasks/";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(API, { id: Date.now(), title, completed: false });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={addTask}>Add Task</button>
      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Done" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
