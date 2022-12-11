import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Divider,
  FormControl,
  Hidden,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SwipeableDrawer,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#ffff",
  },
  menu: {
    display: "flex",
  },

  menuItem: {
    justifyContent: "flex-end",
  },
  logo: {
    marginLeft: "5%",
    marginRight: "auto",
    fontWeight: "bold",
  },
  headline: {
    marginLeft: "5%",
    marginRight: "auto",
    fontWeight: "bold",
  },
  link: {
    marginRight: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  menuButton: {
    color: "#1e1e1e",
  },
  divider: {
    background: "#007acc",
    height: "2px",
    marginLeft: "5%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#007acc",
    "&:hover": {
      backgroundColor: "#007acc",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  active: {
    background: "#f4f4f4",
  },
}));

const navigationLinks = [
  { name: "Home", path: "/" },
];

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [open, setopen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    console.log(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const [categories, setcategories] = useState([]);

  const [product, setproduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/category/getAllCategory")
      .then((res) => {
        if (res.data.code == 200 && res.data.success == true) {
          setcategories(res.data.data);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/product/getAllproduct")
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
    <AppBar className={classes.appBar} position="static">
      {/* <div className="product-container">
        <div class="title">HEADLINES</div>
        <ul>
          {product.map((data) => (
            <li style={{ color: "black" }}>{data.title}</li>
          ))}
        </ul>
      </div> */}
      <Toolbar>
        <Typography variant="h4" color="primary" className={classes.logo}>
          <div
            style={{
              "border-radius": "5px",
              border: "5px solid #007acc",
              padding: "8px",
              marginTop: "5%",
            }}
          >
            
          </div>
          Shop
        </Typography>
        {/* <Button color="primary">Login</Button> */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
      <Divider className={classes.divider} />

      <Toolbar>
        <Typography
          variant="h9"
          color="primary"
          className={classes.headline}
        ></Typography>

        <Hidden xsDown>
          <Typography color="primary">
            <List className={classes.menu}>
              {navigationLinks.map((item) => (
                <ListItem
                  key={item.name}
                  color="primary"
                  button
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname == item.path ? classes.active : null
                  }
                >
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              ))}

              <ListItem>
                <Typography
                  sx={{
                    marginRight: "20px",
                    cursor: "pointer",
                    color: "primary",
                    marginTop: "80px",
                  }}
                  aria-control="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  Category
                </Typography>

                <Menu
                  style={{ marginTop: "3%" }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                >
                  {categories.map((data) => (
                    <MenuItem
                      onClick={() => {
                        history.push(`/category/` + data.category);
                        window.location.reload();
                      }}
                      key={data.id}
                      value={data.category}
                      setSelectedValue={data.category}
                    >
                      {data.category}
                    </MenuItem>
                  ))}
                </Menu>
              </ListItem>
            </List>
          </Typography>
        </Hidden>
        <Hidden smUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={() => setopen(true)} />
          </IconButton>
        </Hidden>
      </Toolbar>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setopen(true)}
        onClose={() => setopen(false)}
      >
        <div>
          <IconButton>
            <ChevronRight onClick={() => setopen(false)} />
          </IconButton>
        </div>
        <Divider className={classes.divider} />
        <List>
          {navigationLinks.map((item) => (
            <ListItem>
              <Link
                color="primary"
                href={item.href}
                underline="none"
                className={classes.link}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
