import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await api.get("/tasks/all");
    setTasks(res.data.tasks);
  };

  const createTask = async () => {
    await api.post("/tasks/create", {
      title,
      status: "todo",
      assignedTo: user._id,
    });

    setTitle("");
    loadTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tasks</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Add Task</button>

      <div style={{ marginTop: "20px" }}>
        {tasks.map((t) => (
          <div key={t._id} style={{ padding: "10px", border: "1px solid #ddd" }}>
            <p>{t.title}</p>
            <small>{t.status}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;