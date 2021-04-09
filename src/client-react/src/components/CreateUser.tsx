
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button, Container, Box, Card, CardContent, Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
        display: "block"
      },
    },
    wrapper: {
        width:"100%",
    },
    formInput: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
    },
      
  }),
);

export interface IUsers {
    name: string,
    email: string
    
}

export interface IFormState {
    [key: string]: any;
    values: IUsers[];
    submitSuccess: boolean;
    loading: boolean;
}
const defaultValues: IUsers = {
    name: "",
    email: "",
}
const CreateUser = () => {
    
    const [values, setValues] = useState(defaultValues as IUsers);

    const classes = useStyles();
    const history = useHistory();
    
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event:any) => {
       // console.log(values);
        event.persist();
        var data = {
          user: {
              name: values.name,
              email: values.email
              
          },
      };
        axios.post(`http://localhost:4000/api/users/add`, data).then(() => {
          history.push('/home');
      })
    }
    return (
      <>
       <Header/>
      <Container maxWidth="xs">
        <div className={classes.root}>
        <div className={classes.wrapper}>
        <TextField
          id="outlined-input"
          name="name"
          label="Name"
          type="text"
          defaultValue={values.name}
          className={classes.formInput}
          variant="outlined" fullWidth
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="email"
          label="Email Address"
          type="email"
          defaultValue={values.email}
          className={classes.formInput}
          variant="outlined" fullWidth
          onChange={handleChange}
        />
        
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        Save
      </Button>
        </div>
      </div>
      </Container>
      </>
    );
};

export default withRouter(CreateUser);