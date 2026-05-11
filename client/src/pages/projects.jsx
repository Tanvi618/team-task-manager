import { useState } from "react";
import api from "../services/api";

function Projects() {
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const createProject = async () => {
    try {
      const res = await api.post("/projects/create", {
        title,
        createdBy: user._id,
      });

      setProjects([...projects, res.data.project]);
      setTitle("");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>

      <input
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createProject}>Create</button>

      {projects.map((p) => (
        <div key={p._id}>
          <h4>{p.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default Projects;