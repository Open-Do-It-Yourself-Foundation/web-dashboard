import React, { useEffect, useState, Props } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Header from './Header';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    marginRight: {
        marginRight: 10
    }
});

export interface IUsers {
    id: number,
    name: string,
    email: string,
    pwdHash:string,
    role:number
}


const Home = () => {
    const classes = useStyles();
    const [data, setData] = useState([] as IUsers[]);
    useEffect(() => {
         getData();
    }, []);
    
    const getData = async () => {
        const datausers = await axios.get(`http://localhost:4000/api/users/all`);
        setData(datausers.data.users);
       
    }

    
    const deleteCustomer = async (event: any, id: number) => {
       //delete code will be here
       event.persist();
       await axios.delete(`http://localhost:4000/api/users/delete/${id}`).then(() => {
            getData();

        })
    }

    return (
      

        <TableContainer component={Paper}>
            <Header/>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(user => (
                    <TableRow key={user.id}>
                                          
                        <TableCell align="center">{user.name}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        
                        <TableCell align="center">
                        <Link to={`edit/${user.email}`}> <EditIcon className={classes.marginRight} /> </Link>
                           <DeleteIcon onClick={e => deleteCustomer(e, user.id)} /> 
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
};

export default Home;