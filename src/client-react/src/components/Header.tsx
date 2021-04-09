import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Link, useHistory, withRouter} from 'react-router-dom';
import { Button, Toolbar } from '@material-ui/core';
import logo from '../assets/images/logo.png';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.common.white,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1,
        },
    },
    headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    menuButtonText: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: 'bold',
    },
    logo: {
        margin: 'auto',
        maxWidth: '20%',
        maxHeight: '20%',
    },
    burgerMenu: {
        fontSize: '50px',
    },
}));


const Header=(props:any)=> {
    const classes = useStyles();
    const history = useHistory();
    const handleButtonClick = (pageURL: any) => {
        history.push(pageURL);
    };

    const menuItems = [
        {
            menuTitle: 'Users',
            pageURL: '/home',
        },
        {
            menuTitle: 'Create User',
            pageURL: '/create',
        },
       
        {
            menuTitle: 'Login',
            pageURL: '/',
        },
       
    ];
  return (
   
    <div className={classes.root}>
    <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            <div>
                <img src={logo} className={classes.logo} alt="logo" />
            </div>
                <div className={classes.headerOptions}>
                    <Button
                        color="primary"
                        className={classes.menuButtonText}
                        onClick={() => handleButtonClick('/home')}
                    >
                       Users
                    </Button>
                    <Button
                        className={classes.menuButtonText}
                        color="primary"
                        onClick={() => handleButtonClick('/create')}
                    >
                       Create User
                    </Button>
                    <Button
                        color="primary"
                        className={classes.menuButtonText}
                        onClick={() => handleButtonClick('/')}
                    >
                       Login
                    </Button>
                   
                </div>
            
        </Toolbar>
    </AppBar>
</div>
  );
}
export default withRouter(Header);