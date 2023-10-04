import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddNotes from "./Pages/AddNotes";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import User from "./Pages/User";
import EditNotes from "./Pages/EditNotes";
import { useState } from "react";

function App() {
  const [userNotes, setUserNotes] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/account"
          element={<User userNotes={userNotes} setUserNotes={setUserNotes} />}
        />
        <Route
          path="/add/notes"
          element={
            <AddNotes userNotes={userNotes} setUserNotes={setUserNotes} />
          }
        />
        <Route
          path="/edit/notes/:id"
          element={
            <EditNotes userNotes={userNotes} setUserNotes={setUserNotes} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
