import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Typography, Toolbar, Button, Grid, Box, makeStyles, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import firebaseAuth from "~/lib/firebaseAuth";
import { UserContext } from "~/context/UserContext";

const useStyles = makeStyles({
  logoContainer: {
    cursor: "pointer",
  },
  logo: {
    height: 36,
    marginRight: 10,
  },
  title: {
    marginRight: 15,
  },
});

const Header = () => {
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
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid container item direction="row" xs={10}>
            <Link href="/">
              <Box display="flex" flexDirection="row" alignItems="center" className={classes.logoContainer}>
                <img className={classes.logo} src="/images/uPennLogo.svg" layout="fill" alt="UPenn Logo" />
                <Typography variant="h6" className={classes.title}>
                  MCIT Central
                </Typography>
              </Box>
            </Link>
            <Link href="/">
              <Button>Courses</Button>
            </Link>
            <Link href="/reviews">
              <Button>Reviews</Button>
            </Link>
          </Grid>
          <Grid container item direction="row" xs={2} justify="flex-end">
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
