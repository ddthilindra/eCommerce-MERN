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
import NewsViewPopup from "./ProductViewPopup";

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
export default function NewsCard(props) {
  const classes = useStyles();
  const [newsRecordForView, setnewsRecordForView] = useState(null);
  const [openNewsPopup, setOpenNewsPopup] = useState(false);

  const [value, setvalue] = useState([]);
  useEffect(() => {
    // setvalue(props)
    // console.log(value)
  }, []);

  const openInNewsPopup = async (id) => {
    console.log(id);
    setnewsRecordForView(id);
    setOpenNewsPopup(true);
  };
  return (
    <Grid item className={classes.card}>
      <Card>
        <CardContent>
          <CardMedia
            className={classes.CardMedia}
            image={props.image}
          ></CardMedia>

          <Typography
            variant="h5"
            style={{ fontWeight: "bold", marginTop: "1%" }}
          >
            {props.title}
          </Typography>
          <Typography variant="subtitile1" paragraph>
            {props.description.substring(0, 90)}...
          </Typography>

          <Button
            className={classes.ReadBtn}
            color="secondary"
            onClick={() => openInNewsPopup(props._id)}
          >
            Read more
          </Button>

          <NewsViewPopup
            openNewsPopup={openNewsPopup}
            setOpenNewsPopup={setOpenNewsPopup}
            newsRecordForView={newsRecordForView}
          ></NewsViewPopup>
        </CardContent>
      </Card>
    </Grid>
  );
}
