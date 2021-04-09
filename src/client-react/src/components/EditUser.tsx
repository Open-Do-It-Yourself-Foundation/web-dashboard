import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter, useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button, Container } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
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
    email: string,
    id:string
    
}

export interface IFormState {
    [key: string]: any;
    values: IUsers[];
    submitSuccess: boolean;
    loading: boolean;
}
const values: IUsers = {
    name: "",
    email: "",
    id:""
    
}
interface ParamTypes {
    id?: number | undefined
  }
function EditUser<RouteComponentProps>() {
    const [values, setValues] = useState({} as IUsers);
    const { email } = useParams<{ email: string }>();   
    const classes = useStyles();
    const history = useHistory();
    //console.log(email);

    useEffect(() => {
        getData();
    }, [email]);
    
    const getData = async () => {
        const customer = await axios.get(`http://localhost:4000/api/users/getOne/${email}`)
        await setValues(customer.data.users);
       // console.log(customer.data.users);
    }
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event:any) => {
        event.persist();
       // const id=values.id
        var data = {
            user: {
                name: values.name,
                email: values.email,
                id:values.id
            },
        };
       // console.log(data);
        axios.put(`http://localhost:4000/api/users/update`, data).then(() => {
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
          value={values.name}
         
          type="text"
          className={classes.formInput}
          variant="outlined" fullWidth
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="email"
          value={values.email}
         
          type="email"
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
        Update
      </Button>
        </div>
      </div>
      </Container>
      </>
    );
};
export default withRouter(EditUser);
