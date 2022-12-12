import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ProductCard from "../Component/ProductCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import ProductPopup from "../Component/Popups/ProductPopup";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://sport.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_xl/public/sport-active-part-erasmus-plus-crop.jpg?h=5dabf909&itok=JM-JNmjy')`,
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

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
export default function Dashboard() {
  const classes = useStyles();
  const [product, setProduct] = useState([]);

  const [productRecordForEdit, setProductRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);


  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzk0NWQ3YjMwZTdjYTQ1Zjg2ZmFjZWQiLCJmaXJzdE5hbWUiOiJ2ZW5kb3IiLCJsYXN0TmFtZSI6InZlbmRvciIsImVtYWlsIjoidmVuZG9yQG1haWwuY29tIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE2NzA2Njc2NDQxODcsImV4cCI6MTY3MDY2ODg1Mzc4N30.VcI4FwC8tRq5hdTiDlhN7zEzd_odv17haFbzxekTJcs",
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/getProductByUserId/`, config)

      .then((res) => {
        console.log("Getting from:", res.data.data[0]);
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const openInPopup = async (id, update) => {
    if (update) {
      setProductRecordForEdit(id);
    }
    setOpenPopup(true);
  };


  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <>
      <Box className={classes.hero}>
        <Box>Dashboard</Box>
      </Box>
      <div style={{ margin: "5% 5% 5% 5%" }}>
        <Container>
          <Box sx={{ bgcolor: "background.paper", width: 500 }}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="My Product" {...a11yProps(0)} />
                <Tab label="Fav Product" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={openInPopup}
                >
                  Add Product
                </Button>

                <ProductPopup
                  openProductPopup={openPopup}
                  setProductOpenPopup={setOpenPopup}
                  productRecordForEdit={productRecordForEdit}
                ></ProductPopup>
                
                <div style={{ margin: "5% 5% 5% 5%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid xs={6}>
                      <Container>
                        {product.map((data) => (
                          <ProductCard {...data} />
                        ))}
                      </Container>
                    </Grid>
                    <Grid xs={6}>
                      <Container>
                        {product.map((data) => (
                          <ProductCard
                            {...data}
                            openInPopup={openInPopup}
                            // openInDeletePopup={openInDeletePopup}
                          />
                        ))}
                      </Container>
                    </Grid>
                  </Grid>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Item Two
              </TabPanel>
            </SwipeableViews>
          </Box>
          <Divider />
        </Container>
      </div>
    </>
  );
}
