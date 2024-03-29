import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Typography, Toolbar, Button, Grid, Box, makeStyles, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import firebaseAuth from "~/lib/firebaseAuth";
import { UserContext } from "~/context/UserContext";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    cursor: "pointer",
    width: 180,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 36,
    marginRight: 10,
  },
  title: {
    marginRight: 15,
  },
  buttons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const { user, logout } = useContext(UserContext);
  const [isMenuActive, setMenuActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuActive(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuActive(false);
  };

  return (
    <AppBar>
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid container item direction="row" xs={10}>
            <Link href="/">
              <Box className={classes.logoContainer}>
                <img className={classes.logo} src="/images/uPennLogo.svg" alt="UPenn Logo" />
                <Typography variant="h6" className={classes.title}>
                  MCIT Central
                </Typography>
              </Box>
            </Link>
            <Link href="/">
              <Button className={classes.buttons}>Courses</Button>
            </Link>
            <Link href="/reviews">
              <Button className={classes.buttons}>Reviews</Button>
            </Link>
            {user && (
              <>
                <Link href="/electives">
                  <Button className={classes.buttons}>Electives</Button>
                </Link>
              </>
            )}
          </Grid>
          <Grid container item direction="row" xs={2} justifyContent="flex-end">
            {user ? (
              <>
                <Button onClick={(e) => handleOpenMenu(e)}>
                  <AccountCircleIcon />
                </Button>
                <Menu open={isMenuActive} onClose={handleCloseMenu} anchorEl={anchorEl}>
                  <MenuItem onClick={() => router.push("/user/reviews")}>My Reviews</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button onClick={() => firebaseAuth.handleGoogleLogin()}>Login</Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
