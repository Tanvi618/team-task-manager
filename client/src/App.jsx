import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState("login");

  if (user) return <Dashboard />;

  if (page === "signup") {
    return <Signup setPage={setPage} />;
  }

  return <Login setPage={setPage} />;
}

export default App;