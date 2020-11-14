import React from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";

const Login = () => {
  return (
    <Container>
      <Typography>Login</Typography>
      <form>
        <TextField label="email"></TextField>
      </form>
    </Container>
  );
};

// Redirect if logged in
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // TODO: Check why this doesn't exist.
  // @ts-ignore
  const cookie = req.cookies.mcitcentral;
  if (cookie) {
    return { props: {}, redirect: { destination: "/" } };
  } else return { props: {} };
};

export default Login;
