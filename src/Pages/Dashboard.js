import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useNavigate } from "react-router-dom";
import { Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [err, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    let token = localStorage.getItem("token");
    const fetchData = async () => {
      const res = await fetch("https://interviewapp-backend.onrender.com/api/notes/all", {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      if (!data.data) {
        setError(data.error);
      } else {
        setNotes(data.data);
      }
    };
    fetchData();
  }, []);
  return (
    <Base title={"Dashboard"}>
      {notes && (
        <div>
          {notes?.map((data) => (
            <Paper elevation={6} key={data._id}>
              <p>Company Name : {data.companyName}</p>
              <p>Role : {data.role}</p>
              <p>Package : {data.package}</p>
              <p>Questions : {data.questions}</p>
              <p>Date : {data.date}</p>
              <p>posted by : {data.user.username}</p>
            </Paper>
          ))}
        </div>
      )}

      {err ? <Typography color={"danger"}>{err}</Typography> : ""}
    </Base>
  );
};

export default Dashboard;
