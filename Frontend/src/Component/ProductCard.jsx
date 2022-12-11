import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProductViewPopup from "./Popups/ProductViewPopup";

const useStyles = makeStyles((theme) => ({
  CardMedia: {
    height: 200,
  },
  CardMedia2: {
    height: 300,
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
export default function ProductCard(props) {
  const classes = useStyles();
  const [productRecordForView, setProductRecordForView] = useState(null);
  const [openProductPopup, setOpenProductPopup] = useState(false);

  const [value, setvalue] = useState([]);
  useEffect(() => {
    // setvalue(props)
    // console.log(value)
  }, []);

  const openInProductPopup = async (id) => {
    console.log(id);
    setProductRecordForView(id);
    setOpenProductPopup(true);
  };
  return (
    <Grid item className={classes.card}>
      <Card>
        <CardContent>
          <CardMedia
            className={classes.CardMedia}
            image={props.thumbnailResult}
          ></CardMedia>

          <Typography
            variant="h5"
            style={{ fontWeight: "bold", marginTop: "1%" }}
          >
            {props.name}
          </Typography>
          <Typography variant="subtitile1" paragraph>
            {props.description.substring(0, 10)}...
          </Typography>

          <Button
            className={classes.ReadBtn}
            color="secondary"
            onClick={() => openInProductPopup(props._id)}
          >
            View Product
          </Button>

          <ProductViewPopup
            openProductPopup={openProductPopup}
            setOpenProductPopup={setOpenProductPopup}
            productRecordForView={productRecordForView}
          ></ProductViewPopup>
        </CardContent>
      </Card>
    </Grid>
  );
}
