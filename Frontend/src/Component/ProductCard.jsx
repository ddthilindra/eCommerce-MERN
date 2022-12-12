import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ProductViewPopup from "./Popups/ProductViewPopup";
import DeleteNewsPopup from "../Component/Popups/DeleteNewsPopup";
import NewsPopup from "../Component/Popups/ProductPopup";

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

  const [newsRecordForDelete, setnewsRecordForDelete] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  
  const [newsRecordForEdit, setNewsRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const [value, setvalue] = useState([]);
  useEffect(() => {
    // setvalue(props)
    // console.log(value)
  }, []);

  const openInPopup = async (id, update) => {
    if (update) {
      setNewsRecordForEdit(id);
    }
    setOpenPopup(true);
  };

  const openInProductPopup = async (id) => {
    console.log(id);
    console.log(props._id);
    setProductRecordForView(id);
    setOpenProductPopup(true);
  };

  const openInDeletePopup = async (item) => {
    setnewsRecordForDelete(item);
    setOpenDeletePopup(true);
  };

  return (
    <Grid item className={classes.card}>
      <Card>
        <CardContent>
          <CardMedia
            className={classes.CardMedia}
            image={props.thumbnailResult}
          ></CardMedia>

          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {" "}
                {/* {props.category[0].toUpperCase()} */}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={() => openInPopup(props.id, "update")}>
                  {/* <p>{news._id}</p> */}
                  <EditOutlined />
                </IconButton>
                {/* {role == "editor" ? ( */}
                {/* "" */}
                {/* ) : ( */}
                <IconButton>
                  <DeleteOutlined onClick={() => openInDeletePopup(props)} />
                </IconButton>
                {/* )} */}
              </div>
            }
            title={props.title}
            subheader={props.category}
          />

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
          <NewsPopup
          openNewsPopup={openPopup}
          setNewsOpenPopup={setOpenPopup}
          newsRecordForEdit={newsRecordForEdit}
        ></NewsPopup>
          <ProductViewPopup
            openProductPopup={openProductPopup}
            setOpenProductPopup={setOpenProductPopup}
            productRecordForView={productRecordForView}
          ></ProductViewPopup>
          <DeleteNewsPopup
            openDeletePopup={openDeletePopup}
            setOpenDeletePopup={setOpenDeletePopup}
            newsRecordForDelete={newsRecordForDelete}
          ></DeleteNewsPopup>
        </CardContent>
      </Card>
    </Grid>
  );
}
