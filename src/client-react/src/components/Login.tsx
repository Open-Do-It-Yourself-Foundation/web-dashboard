import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Theme } from "@material-ui/core/styles";
import { useHistory, withRouter } from "react-router";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tertiaryAction: {
      [theme.breakpoints.up("sm")]: {
        textAlign: "right",
      },
    },
    actions: {
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(3),
      },
    },
    formInput: {
      width: "100%",
    },
  })
);

export interface IUsers {
    password: string,
    email: string
    
}

export interface IFormState {
    [key: string]: any;
    values: IUsers[];
    submitSuccess: boolean;
    loading: boolean;
}
const defaultValues: IUsers = {
    password: "",
    email: "",
}

const Login = () => {
  const [values, setValues] = useState(defaultValues as IUsers);

  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
     console.log(values);
     event.preventDefault();
    var data = {
      email: values.email,
      password: values.password,
    };
    axios.post(`http://localhost:4000/api/auth/login`, data).then(() => {
        history.push('/home');
    });
  };
  return (
    <section>
      <Container maxWidth="xs">
        <Box pt={8} pb={10}>
          <Box mb={3} textAlign="center">
            <Typography variant="h5" component="h2">
              Sign in
            </Typography>
          </Box>
          <Box>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
          id="outlined-input"
          name="email"
          label="Email "
          type="email"
          defaultValue={values.email}
          className={classes.formInput}
          variant="outlined" fullWidth
          onChange={handleChange}
        />
                </Grid>

                <Grid item xs={12}>
                <TextField
          id="outlined-input"
          name="password"
          label="Password"
          type="password"
          defaultValue={values.password}
          className={classes.formInput}
          variant="outlined" fullWidth
          onChange={handleChange}
        />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </Box>
              <Grid container spacing={2} className={classes.actions}>
                <Grid item xs={12} sm={12}>
                  Default admin user (Email: "sean.maxwell@gmail.com", Password:
                  "Password@1")
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default withRouter(Login);
