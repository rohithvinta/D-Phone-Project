//imports
import { Grid, Button, Typography, TextField } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import CartItem from '../Components/CartItem';
import Summary from '../Components/Summary';

import { useCookies } from 'react-cookie';

import NavbarComponent from '../Components/Navbar';

const Cart = ({ cart, setCart }) => {
  const [cookie, setCookie] = useCookies("jwt");
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [message, setMessage] = useState(null);
  
  const sendOrder = async() => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.jwt}`,
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      }
      console.log("cart", cart[0][0]);
      const { data } = await axios.post(`http://localhost:8080/orderadd/${token}`, { ...cart[0][0], productPrice: cart[0][0].productPrice - user.points + 100 } ,config);
      setMessage(data);
    } catch (e) {
      console.log(e);
    }
  }
  const getUserData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.jwt}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    const userData = await axios.get("http://localhost:8080/userinfo", config);
    setUser(userData.data);
    console.log(userData)
  }
  
  useEffect(() => {
    getUserData();
  },[])
  console.log(cart.length)
    return (
      <div className="productsDiv">
        <NavbarComponent user = {user} cart = {cart} auth = {true} />
        <Container>
          <Grid container>
            <Grid style={{ paddingTop: "30px" }} item xs={12} sm={12} md={7}>
             { cart.map((e)=>{
               return (
                  <CartItem data={e[0]} />
                )
              })}
            </Grid>
            {cart[0] && user &&  (<Grid style={{ paddingTop: "30px" }} item xs={12} sm={12} md={4}>
              <div style={{ paddintTop: "10px", marginLeft: "10px" }}>
                <Typography align="center">PRICE DETAILS</Typography>
                <div style={{ marginBottom: "10px" }}>
                  <Typography style={{ float: "right" }}>{cart[0][0].productPrice}</Typography>
                  <Typography style={{ color: "#282c3f" }}>Total MRP</Typography>
                </div>
                {
                  user && (
                    <div style={{ marginBottom: "10px" }}>
                      <Typography style={{ float: "right", color: "#1fad8c" }}>
                        {user.points}
                      </Typography>
                      <Typography>Discount With points</Typography>
                    </div>
                  )
                }
                <div style={{ marginBottom: "10px" }}>
                  <TextField value={token} required onChange={(e) => {
                    setToken(e.target.value)
                  }} style={{ float: "right", color: "#1fad8c" }} id="outlined-basic" label="Code" variant="standard" />

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
                    {cart[0][0].productPrice - user.points + 100}
                  </Typography>
                  <Typography>Total</Typography>
                </div>

                <Button
                  variant="contained"
                  size="large"
                  onClick={sendOrder}
                  style={{ width: "100%", backgroundColor: "#153A8C" }}
                >

                  Place Order
                </Button>
                <Typography variant='h4'> { message}</Typography>
              </div>                             
            </Grid>)}
           
          </Grid>
        </Container>
      </div>
    );
}

export default Cart
