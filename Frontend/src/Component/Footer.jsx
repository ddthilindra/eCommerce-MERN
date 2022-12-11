import { Box, Container, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  foo: {
    color: "#007acc",
  },
  divider: {
    background: "#007acc",
    height: "2px",
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer>
      <Box className={classes.foo}>
        <Divider className={classes.divider} />
        <Container maxWidth="lg" style={{ paddingTop: "2%" }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Typography
                variant="button"
                color="primary"
                className={classes.menuItem}
              >
                {navigationLinks.map((item) => (
                    <Box>
                    <Link
                    color="primary"
                    href={item.href}
                    underline="none"
                    className={classes.link}
                  >
                    {item.name}
                  </Link>
                    </Box>
                  
                ))}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Typography
                variant="button"
                color="primary"
                className={classes.menuItem}
              >
                {navigationLinks.map((item) => (
                    <Box>
                    <Link
                    color="primary"
                    href={item.href}
                    underline="none"
                    className={classes.link}
                  >
                    {item.name}
                  </Link>
                    </Box>
                  
                ))}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Typography
                variant="button"
                color="primary"
                className={classes.menuItem}
              >
                {navigationLinks.map((item) => (
                    <Box>
                    <Link
                    color="primary"
                    href={item.href}
                    underline="none"
                    className={classes.link}
                  >
                    {item.name}
                  </Link>
                    </Box>
                  
                ))}
              </Typography>
            </Grid>
          </Grid>
          <Box Align="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
           <div> Deshitha Thilindra &reg; {new Date().getFullYear()}</div>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

const navigationLinks = [
    { name: "Home", href: "/" },
  ];
