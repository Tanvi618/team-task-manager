import { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../services/api";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectTitle, setProjectTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const isAdmin = user?.role === "admin";

  useEffect(() => {

    loadProjects();
    loadTasks();

  }, []);

  const loadProjects = async () => {

    try {

      const res = await api.get("/projects");

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const loadTasks = async () => {

    try {

      const res = await api.get("/tasks/all");

      setTasks(res.data.tasks);

    } catch (error) {

      console.log(error);

    }
  };

  const createProject = async () => {

    if (!projectTitle) {
      return alert("Enter project title");
    }

    try {

      await api.post("/projects/create", {
        title: projectTitle,
        createdBy: user._id,
      });

      setProjectTitle("");

      loadProjects();

    } catch (error) {

      alert("Project creation failed");

    }
  };

  const createTask = async () => {

    if (!taskTitle) {
      return alert("Enter task title");
    }

    try {

      await api.post("/tasks/create", {
        title: taskTitle,
        status: "todo",
        assignedTo: user._id,
      });

      setTaskTitle("");

      loadTasks();

    } catch (error) {

      alert("Task creation failed");

    }
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(`/tasks/update/${id}`, {
        status,
      });

      loadTasks();

    } catch (error) {

      console.log(error);

    }
  };

  const pendingTasks = tasks.filter(
    (t) => t.status !== "done"
  );

  const logout = () => {

    localStorage.removeItem("user");

    window.location.reload();
  };

  return (

    <div className="dashboard">

      {/* HEADER */}

      <div className="header">

        <div>

          <h1>Task Manager Dashboard</h1>

          <p>
            Welcome {user?.name} ({user?.role})
          </p>

        </div>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      {/* STATS */}

      <div className="stats">

        <div className="card">

          <h2>{projects.length}</h2>

          <p>Projects</p>

        </div>

        <div className="card">

          <h2>{tasks.length}</h2>

          <p>Total Tasks</p>

        </div>

        <div className="card red">

          <h2>{pendingTasks.length}</h2>

          <p>Pending Tasks</p>

        </div>

      </div>

      {/* CREATE SECTION */}

      <div className="admin-section">

        {/* CREATE PROJECT */}

        {isAdmin && (

          <div className="form-box">

            <h3>Create Project</h3>

            <input
              type="text"
              placeholder="Project title"
              value={projectTitle}
              onChange={(e) =>
                setProjectTitle(e.target.value)
              }
            />

            <button onClick={createProject}>
              Add Project
            </button>

          </div>

        )}

        {/* CREATE TASK */}

        <div className="form-box">

          <h3>Create Task</h3>

          <input
            type="text"
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
          />

          <button onClick={createTask}>
            Add Task
          </button>

        </div>

      </div>

      {/* PROJECT SECTION */}

      <div className="section">

        <h2>Project Management</h2>

        {projects.length === 0 ? (

          <p>No projects found</p>

        ) : (

          <div className="project-grid">

            {projects.map((p) => (

              <div
                className="project-card"
                key={p._id}
              >

                <h3>{p.title}</h3>

                <p>
                  Manage tasks and track progress
                </p>

                <span>
                  Active Project
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* TASK SECTION */}

      <div className="section">

        <h2>Task Management</h2>

        {tasks.length === 0 ? (

          <p>No tasks found</p>

        ) : (

          tasks.map((t) => (

            <div
              className={`item ${
                t.status === "done"
                  ? "done"
                  : ""
              }`}
              key={t._id}
            >

              <div>

                <strong>{t.title}</strong>

                <p>
                  Status: {t.status}
                </p>

              </div>

              <select
                value={t.status}
                onChange={(e) =>
                  updateStatus(
                    t._id,
                    e.target.value
                  )
                }
              >

                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="done">
                  Done
                </option>

              </select>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Dashboard;