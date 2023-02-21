// imports
import { Grid, Typography } from '@mui/material'
import React from 'react'

//styles
const imageStyle = {
    width: "100%",
    maxWidth: "100px",
    display: "block",
    marginLeft: "auto",
    marginRight:"auto"
}
const CartItem = ({ data }) => {    // data as parameter
  console.log("in cart item ", data);
  

  return (
    <Grid
      style={{
        marginBottom: "5px",
        paddingTop: "10px",
        border: "0.3px solid #b0b7af",
      }}
      container
    >
      <Grid item xs={4} sm={4} md={4}>
        <img alt={data.productModel} style={imageStyle} src={data.productImage} />
        {console.log("12323")}
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
        <Typography variant="h6" aligh="left">
          {data.productModel}
        </Typography>
        <Typography>Quantity: 1</Typography>
        <Typography variant="h6">₹ {data.productPrice}</Typography>
      </Grid>
    </Grid>
  );
}

export default CartItem