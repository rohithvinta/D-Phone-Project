// imports
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState,navigate } from 'react'
import Box from '../Components/Box';
import NavbarComponent from '../Components/Navbar';
import axios from "axios";
//import css
import "../products.css"
import { useCookies } from 'react-cookie';

const Products = ({ cart,history }) => {
  const [products, setProducts] = useState(null);
  const [user, setUser] = useState(null);
  const [cookie, setCookie] = useCookies("jwt");
  const fetchProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.jwt}`,
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      };
      console.log(cookie);
      const { data } = await axios.get("http://localhost:8080/products/all", config);
      const userData = await axios.get("http://localhost:8080/userinfo",config)
      setProducts(data);
      setUser(userData.data);
    } catch (e) {
      window.location.href = "/login"
    }
                    
  }
  useEffect(() => {
    fetchProducts();                                // calling fetch function
  }, [])
  return (
    <div className="productsDiv">
      <NavbarComponent cart={cart} auth={true} data={user} />
      <Container style={{ marginTop: "50px" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {products &&
            products.map((item) => {                
              return (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Box className="boxStyle" data={item} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default Products
