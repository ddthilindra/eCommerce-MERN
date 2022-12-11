import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  GridList,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import ProductCard from "../Component/ProductCard";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://9cover.com/images/ccovers/1465146536chanel-bag-fashion.jpg')`,
    height: "350px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffff",
    fontSize: "4rem",
    marginBottom: "2%",
  },
  CardMedia: {
    height: 100,
  },
  ReadBtn: {
    // marginLeft:"90%"
    backgroundColor: "#007acc",
    "&:hover": {
      backgroundColor: "#ffff",
    },
    "&:hover": {
      color: "#007acc",
    },
  },
  card: {
    marginTop: "5%",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [product, setproduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/product/getAllProduct")
      .then((res) => {
        if (res.data.code == 200 && res.data.success == true) {
          setproduct(res.data.data);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box className={classes.hero}>
        <Box>Product Store</Box>
      </Box>
      <div style={{ margin: "5% 15% 5% 15%" }}>
        <Divider />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <Container>
              <Grid>
                {product.map((data) => (
                  <ProductCard {...data} />
                ))}
              </Grid>
            </Container>
          </Grid>
          <Grid xs={6}>
            <Container>
              <Grid>
                {product.map((data) => (
                  <ProductCard {...data} />
                ))}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
