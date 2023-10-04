import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const EditNotes = ({ userNotes, setUserNotes }) => {
  const { id } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [pack, setPack] = useState(0);
  const [questions, setQuestions] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    const data = userNotes?.find((data) => data._id === id);
    if (data) {
      setCompanyName(data.companyName);
      setRole(data.role);
      setPack(data.package);
      setQuestions(data.questions);
    }
  }, [id, userNotes]);

  async function EditNewNotes() {
    const notes = {
      companyName,
      role,
      package: pack,
      questions,
    };
    const res = await fetch(`https://interviewapp-backend.onrender.com/api/notes/user/edit/${id}`, {
      method: "PUT",
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
    const notesIndex = userNotes?.findIndex((data) => data._id === id);
    userNotes[notesIndex] = data.data;
    await setUserNotes([...userNotes]);
    setMsg(data.message);
  }

  return (
    <Base title={"Edit Notes"}>
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
        <Button type="submit" variant="contained" onClick={EditNewNotes}>
          Edit Notes
        </Button>

        {err ? <Typography color={"danger"}>{err}</Typography> : ""}

        {msg ? <Typography color={"danger"}>{msg}</Typography> : ""}
      </form>
    </Base>
  );
};

export default EditNotes;
