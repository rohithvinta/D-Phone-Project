//imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavbarComponent from '../Components/Navbar';
import { Container } from "@mui/system";
import { Grid, Rating, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";


import { useCookies } from 'react-cookie';

const imageStyle = {
  maxHeight: "500px",
  padding: "30px",
  maxWidth: "80%",
};

const DetailPage = ({ cart ,setCart}) => {
  
  const { id } = useParams();                     // parameter passed with URL (ID)
  const [data, setData] = useState(null);
  const [cookie, setCookie] = useCookies("jwt");
  const [user, setUser] = useState();

  const fetch = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.jwt}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    };
    const { data } = await axios.get(`http://localhost:8080/products/${id}`,config);
    setData(data);
    
  };
  
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

  const addToCart = () => {
    setCart((prevVal) => {
      return [...prevVal,data]
    });
    
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <NavbarComponent cart={cart} auth= {true} />
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            {data && (
              <img
                alt={data[0].productBrand}
                style={imageStyle}
                src={data[0].productImage}
              ></img>
            )}
          </Grid>
          {data && (
            <Grid style={{ padding: "30px" }} item xs={12} sm={12} md={6}>
              <Typography style={{ paddingBottom: "10px" }} variant="h4">
                <b>{data[0].productBrand}  </b>
                {data[0].productModel}
              </Typography>
              <Typography style={{}} variant="p">
               
                {data[0].productDescription}
              </Typography>
              <br />
              <Typography style={{ paddingTop: "20px" }} variant="h4">
                ₹ {data[0].productPrice}
              </Typography>
              <Typography
                style={{ paddingTop: "20px", color: "#1fad8c" }}
                variant="p"
              >
                Inclusive of all taxes
              </Typography>
              

              <div style={{ paddingTop: "20px" }}>
                <Button
                  onClick={addToCart}
                  style={{ bottom: "2px", width: "55%", backgroundColor: "#153A8C" }}
                  variant="contained"
                  size="large"
                >
                  <LocalMallIcon /> Add To Cart
                </Button>
                <Button
                  style={{ float: "right", bottom: "2px", width: "40%" }}
                  variant="outlined"
                  size="large"
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default DetailPage;
