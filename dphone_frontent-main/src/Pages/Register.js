

import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";

import axios from "axios";
import { useCookies } from 'react-cookie';
import NavbarComponent from '../Components/Navbar';
import { Link } from "react-router-dom";


const Register = () => {

  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    conformPassword: ""
  });
  const [message, setMessage] = useState(null);
  const [cookies, setCookie] = useCookies(['jwt']);
  
  const register = async () => {
    try {
      const response = await axios.post("http://localhost:8080/new", data);
      console.log(response.data);
      setMessage("Registered ..");
      
    } catch (e) {
      console.log(e);
      setMessage(e.message);
    }
  }

  return (
    <div className="loginDiv">
      <NavbarComponent auth={false} />
      <Container className="pagecontainer">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h3">Dphone</Typography>

            <Typography variant="caption">
              Designed with instinct, to bring joy back to the everyday
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{ marginTop: "15px" }}>
            <Typography variant="h5">Register</Typography>
            <TextField
              style={{ width: "100%" }}
              helperText="Please enter your username"
              id="email"
              label="Name"
              type="text"
              value={data.name}
              onChange={(e) => setData((preVal) => {
                return { ...preVal, name: e.target.value }
              })}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              helperText="Please enter your email"
              id="email"
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => setData((preVal) => {
                return { ...preVal, email: e.target.value }
              })}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              helperText="Please enter your password"
              id="password"
              label="Password"
              type="password"
              value={data.password}
              onChange={(e) => setData((preVal) => {
                return { ...preVal, password: e.target.value }
              })}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              helperText="Please enter your password again"
              id="conformPassword"
              label="Comform Password"
              type="password"
              value={data.conformPassword}
              onChange={(e) => setData((preVal) => {
                return { ...preVal, conformPassword: e.target.value }
              })}
            />
            {
              message && (
                <p style={{wordWrap:"break-word"}}>{message}</p>
              )
            }
            <Button onClick={register}>Submit</Button>
            <Link to = "/login"> Login</Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Register