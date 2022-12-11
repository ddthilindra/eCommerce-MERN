import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../Component/ProductCard";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://onextrapixel.com/wp-content/uploads/2017/03/flow-gallery.jpg')`,
    height: "100px",
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
    width: 180,
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
    marginTop: "2%",
  },
}));
export default function Category() {
  const classes = useStyles();
  const { category } = useParams();
  const [news, setnews] = useState([]);

  useEffect(() => {
    console.log(category);
    axios
      .get(`http://localhost:8000/news/getNewsByCategory/${category}`)

      .then((res) => {
        console.log("Getting from:", res.data.data[0]);
        setnews(res.data.data);
        
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Box className={classes.hero}>
        <Box>{category} News</Box>
      </Box>
      <div style={{ margin: "5% 5% 5% 5%" }}>
        <Container>
          
          <Divider />
          <Grid>
            {news.map((data) => (
              <NewsCard {...data} />
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
}
