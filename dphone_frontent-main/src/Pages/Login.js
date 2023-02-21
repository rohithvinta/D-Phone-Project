//imports
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useCookies } from 'react-cookie';
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../Components/Navbar";
import { Link } from "react-router-dom";


const Login = () => {
  
  const [data, setData] = useState({
    username: "",
    password:"",
  });
  const [message, setMessage] = useState(null);
  const [cookies, setCookie] = useCookies(['jwt']);
  const login = async () => {
    try {
      const jwt = await axios.post("http://localhost:8080/login", data);
      setCookie("jwt", jwt.data)
      window.location.href = "/"
    } catch (e) {
      console.log(e);
      setMessage(e);
    }
  }
  useEffect(() => {
   
  },[])
  return (
    <div className = "loginDiv">
      <NavbarComponent auth = {false} />
      <Container className="pagecontainer">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h3">Dphone</Typography>
            <Typography variant="caption">
              Designed with instinct, to bring joy back to the everyday.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{marginTop:"15px"}}>
            <TextField
              style={{ width: "100%" }}
              helperText="Please enter your username"
              id="email"
              label="Name"
              type="email"
              value = {data.username}
              onChange={(e) => setData((preVal) => {
                return {...preVal,username:e.target.value}
              })}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              helperText="Please enter your password"
              id="password"
              label="Name"
              type="password"
              value={data.password}
              onChange={(e) => setData((preVal) => {
                return { ...preVal, password: e.target.value }
              })}
            />
            <br />
            {
              message && (
                <p>{message.message}</p>
              )
            }
            <Button onClick={login}>Submit</Button>
            <Link to = "/register">Dont have a account Signup here</Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
