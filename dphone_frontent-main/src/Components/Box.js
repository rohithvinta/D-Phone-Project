//imports  MUI
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";

const Box = ({data}) => {          // data as parameter form parent 
  return (
    <Card className="imageCard" sx={{ maxWidth: 345 }}>
      <div className="imageDiv">
        <Link to={"/product/" + data.productId}>     
          <CardMedia
            className="image"
            component="img"
            alt={data.title}
            height="300"
            image={data.productImage}
          />
        </Link>
      </div>

      <CardContent>
        <Typography gutterBottom variant="p" component="div">
          {data.productModel}
        </Typography>
        ₹ {data.productPrice}
        
      </CardContent>
      <Button>
        <AddShoppingCartIcon />
      </Button>
      <Button style={{ float: "right" }}>
        <FavoriteBorderIcon style={{ color: "red" }} />
      </Button>
    </Card>
  );
};

export default Box;
