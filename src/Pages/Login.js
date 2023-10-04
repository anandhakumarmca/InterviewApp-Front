import React, { useState } from "react";
import Base from "../Base/Base";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleLogin = async () => {
    const paylaod = {
      email,
      password,
    };
    const res = await fetch("https://interviewapp-backend.onrender.com/api/user/login", {
      method: "POST",
      body: JSON.stringify(paylaod),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.token) {
      setErr("");
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setErr(data.error);
    }
  };
  return (
    <Base title={"Login"}>
      <TextField
        fullWidth
        label="email"
        value={email}
        sx={{ m: 2 }}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="password"
        type="password"
        value={password}
        sx={{ m: 2 }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" onClick={handleLogin}>
        Login
      </Button>
      {err ? <Typography color={"danger"}>{err}</Typography> : ""}
    </Base>
  );
};

export default Login;
