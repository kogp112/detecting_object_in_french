import * as React from "react";
import Webcam from "react-webcam";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";

class VideoScreen extends React.Component<Props> {
  data: NodeJS.Timeout;
  constructor(props: Props) {
    super(props);
    this.state = {
      click: false,
    };
  }
  
   // video settings
  videoConstraints = {
    width: 850,
    height: 700,
    facingMode: "user"
  };
  
  // take capture when push button
  capture () {
    const { click } = this.state;
    
    if (click) {
      this.setState({
        click: false
      });
      clearInterval(this.data);
    } else {
      this.setState({
        click: true
      })
      this.data = setInterval(() => {
        // ATTENSION getUserMedia only allow http at localhost, basically use HTTPS
        const imgSrc = this.refs.webcam.getScreenshot();
        console.log(imgSrc);
      }, 1000);
    }
  }
  
  render () {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Recognition App
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={2}>
            <Grid container>
              <Button onClick={this.capture.bind(this)}>START</Button>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Webcam
                audio={false}
                ref={"webcam"}
                screenshotFormat="image/jpeg"
                videoConstraints={this.videoConstraints}
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Typography variant="h6">
                Result XXXXXXX
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

interface Props {
  click: boolean,
}

export default VideoScreen;