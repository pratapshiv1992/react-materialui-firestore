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
import * as firebase from 'firebase';

const config = {
    apiKey: "apiKey",  // required
    projectId: 'projectId', // required
    authDomain: "projectId.firebaseapp.com", // optional
    databaseURL: "https://databaseName.firebaseio.com", // optional
    storageBucket: "bucket.appspot.com" // optional
};

const app = firebase.initializeApp(config);

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
        minHeight:'calc(85vh - 120px)',
        minWidth:'100%',
    },
    footer:{
        minWidth: '100%',
        background: 'gray',
        minHeight:60,
    },
    conatainer:{
        marginBottom:10
    },
    light:{
        marginTop: '30px',
        background: '#f8f5f573',
        color: '#932626',
        textAlign: 'center',
    },
};


const ButtonAppBar = ({classes})=> {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar >
                    <IconButton onClick={()=>alert('Menu clicked')} className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography onClick={()=>alert('News clicked')} variant="h6" color="inherit" className={classes.grow}>
                        News
                    </Typography>
                    <Typography  variant="h6" color="inherit" className={classes.grow}>
                        Chatting App
                    </Typography>
                    <Button  color="inherit" onClick={()=>alert('Home clicked')} >Home</Button>
                </Toolbar  >
            </AppBar>
        </div>
    );
}

class App extends Component {
    state ={
        message:"",
        messagesList:null,
    }


    componentDidMount() {
        this.showMessages()
    }

    handleMessage =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSend =(e)=>{
        const {message} = this.state;
        if(message){
            app
                .firestore()
                .collection('messages')
                .add({
                    message:message,
                    createdAt:new Date(),
                });
            this.setState({
                message:"",
            })
        }

    }

    showMessages = () => {
        app
            .firestore()
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(7)
            .onSnapshot({ includeMetadataChanges: false }, snap => {
                let messagesList = snap.docs.map(x =>({...x.data() }));
                this.setState({messagesList:messagesList.reverse()})

            })

   }

  render() {
      const { classes } = this.props;
      const {message,messagesList} = this.state;
    return (
        <div className={classes.conatainer} >
            <ButtonAppBar classes={classes} />
            <div className= {classes.body} >
                {(messagesList ||[{message:"No messages"}]).map((message,i)=>
                <Typography key={i} classes={{root:classes.light}}  variant="h4" gutterBottom>
                    {message.message}
                </Typography>
            )}
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

                <Button
                    fullWidth={true}
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSend}
                    disabled={message ? false : true}
                >
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



