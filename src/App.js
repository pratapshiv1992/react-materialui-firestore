import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    body:{
        minHeight:'calc(90vh - 120px)',
        minWidth:'100%',
    },
    footer:{
        minWidth: '100%',
        background: 'gray',
        minHeight:60,
    },
    conatainer:{
        marginBottom:10
    }
};


const ButtonAppBar = ({classes})=> {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        News
                    </Typography>
                    <Button  color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

class App extends Component {
    state ={
        message:"",
    }

    handleMessage =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
  render() {
      const { classes } = this.props;
      const {message} = this.state;
    return (
        <div className={classes.conatainer} >
            <ButtonAppBar classes={classes} />
            <div className= {classes.body} >
                hjjh
            </div>
            <TextField
                id="standard-full-width"
                label="Message"
                autoFocus={true}
                multiline={true}
                placeholder="Type your message here..."
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={this.handleMessage}
                value={message}
                name="message"
            />

                <Button fullWidth={true} variant="contained" color="secondary" >
                    send
                </Button>

        </div>
    );
  }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);



