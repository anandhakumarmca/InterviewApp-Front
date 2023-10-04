import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";
const User = ({ userNotes, setUserNotes }) => {
  const [err, setError] = useState("");
  const [succesMsg, setSucessMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    let token = localStorage.getItem("token");
    const fetchUserData = async () => {
      const res = await fetch("https://interviewapp-backend.onrender.com/api/notes/user/all", {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      if (!data.data) {
        setError(data.error);
      } else {
        setUserNotes(data.data);
      }
    };
    fetchUserData();
  }, []);

  async function handleDelete(id) {
    const res = await fetch(
      `https://interviewapp-backend.onrender.com/api/notes/user/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    const newUserNotes = userNotes.filter((data) => data._id !== id);
    setUserNotes([...newUserNotes]);
    setSucessMsg(data.message);
  }

  return (
    <Base title={"My account"}>
      <div>
        <Button
          edge="end"
          color="primary"
          arial-label="Add-Notes"
          onClick={() => navigate("/add/notes")}
        >
          Add Notes
        </Button>
      </div>
      {userNotes && (
        <div>
          {userNotes?.map((data) => (
            <Paper elevation={6} key={data._id}>
              <p>Company Name : {data.companyName}</p>
              <p>Role : {data.role}</p>
              <p>Package : {data.package}</p>
              <p>Questions : {data.questions}</p>
              <p>Date : {data.date}</p>
              <p>posted by : {data.user.username}</p>
              <Button onClick={() => navigate(`/edit/notes/${data._id}`)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(data._id)}>Delete</Button>
            </Paper>
          ))}
        </div>
      )}

      {err ? <Typography color={"danger"}>{err}</Typography> : ""}
      {succesMsg ? <Typography color={"danger"}>{succesMsg}</Typography> : ""}
    </Base>
  );
};

export default User;
