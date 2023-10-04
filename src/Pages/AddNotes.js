import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

const AddNotes = ({ userNotes, setUserNotes }) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [pack, setPack] = useState(0);
  const [questions, setQuestions] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate("");

  async function postNewNotes() {
    const notes = {
      companyName,
      role,
      package: pack,
      questions,
    };
    const res = await fetch("https://interviewapp-backend.onrender.com/api/notes/user/add", {
      method: "POST",
      body: JSON.stringify(notes),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    if (!data.data) {
      setErr(data.err);
      setMsg(data.message);
    }
    setUserNotes([...userNotes, data.data]);
    setMsg(data.message);
  }

  return (
    <Base title={"AddNotes"}>
      <form>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          sx={{ m: 2 }}
        />

        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          type="text"
          sx={{ m: 2 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <TextField
          label="Package"
          variant="outlined"
          type="number"
          fullWidth
          sx={{ m: 2 }}
          value={pack}
          onChange={(e) => setPack(e.target.value)}
        />

        <TextField
          label="Questions"
          variant="outlined"
          fullWidth
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          inputProps={{ sx: { height: 100 } }}
          sx={{ m: 2 }}
        />
        <Button type="submit" variant="contained" onClick={postNewNotes}>
          Add Notes
        </Button>

        {err ? <Typography color={"danger"}>{err}</Typography> : ""}

        {msg ? <Typography color={"danger"}>{msg}</Typography> : ""}
      </form>
    </Base>
  );
};

export default AddNotes;
