//imports 
import { Button, Typography, TextField } from '@mui/material';
import React from 'react';


const Summary = ({cost}) => {

  //summary Componment in cart page
  return (
    <div style={{ paddintTop: "10px", marginLeft: "10px" }}>
      <Typography align="center">PRICE DETAILS</Typography>
      <div style={{ marginBottom: "10px" }}>
        <Typography style={{ float: "right" }}>{ cost}</Typography>
        <Typography style={{ color: "#282c3f" }}>Total MRP</Typography>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Typography style={{ float: "right", color: "#1fad8c" }}>
          ₹ 400
        </Typography>
        <Typography>Discount</Typography>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField style={{ float: "right", color: "#1fad8c" }} id="outlined-basic" label="Code" variant="standard" />

        <Typography>Referal Code</Typography>

      </div>
      <br></br>
      <br></br>
      <div style={{ marginBottom: "10px" }}>
        <Typography style={{ float: "right" }}>₹ 100</Typography>
        <Typography>Shipping</Typography>
      </div>
      <hr></hr>
      <div style={{ marginBottom: "10px" }}>
        <Typography style={{ float: "right", color: "##3e4152" }}>
          ₹ 800
        </Typography>
        <Typography>Total</Typography>
      </div>
      
      <Button
        variant="contained"
        size="large"
        style={{ width: "100%", backgroundColor: "#153A8C" }}
      >
        Place Order
      </Button>
    </div>
  );
}

export default Summary