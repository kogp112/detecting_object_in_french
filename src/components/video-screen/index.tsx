import * as React from "react";
import Webcam from "react-webcam";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
//import orange from '@material-ui/core/colors/orange';
import { Box } from "@material-ui/core";

const theme = createMuiTheme({
  spacing: 8
});
class VideoScreen extends React.Component<Props> {
  data: NodeJS.Timeout;
  constructor(props: Props) {
    super(props);
    this.state = {
      click: false,
      status: 'START'
    };
  }

  // video settings
  videoConstraints = {
    width: 350,
    height: 350,
    facingMode: "user"
  };
  
  // take capture when push button
  capture () {
    const { click } = this.state;
    
    if (click) {
      this.setState({
        click: false,
        status: 'START'
      });
      clearInterval(this.data);
    } else {
      this.setState({
        click: true,
        status: 'STOP'
      })
      this.data = setInterval(() => {
        // ATTENSION getUserMedia only allow http at localhost, basically use HTTPS
        this.refs.webcam.getScreenshot();
        console.log('あ');
      }, 1000);
    }
  }
  
  render () {
    const { status } = this.state;
    return (
      <>
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={12}>
              <AppBar position="static" style={{ color: "#e0f2f1", backgroundColor: "#ff6f00" }}>
                <Toolbar>
                  <IconButton edge="start"aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6">
                    Recognition App
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Grid container>
                <Box mt={2} ml={4}>
                  <Button variant="contained" style={{ color: status == 'STOP' ? "#263238": "#e0f2f1", backgroundColor: status == 'STOP' ? "#4fc3f7": "#0277bd" }} onClick={this.capture.bind(this)}>{status}</Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={8} alignItems={'center'}>
              <Grid container alignContent={'center'} justify={'center'}>
                <Box mt={2}>
                  <Webcam
                    audio={false}
                    ref={"webcam"}
                    screenshotFormat="image/jpeg"
                    videoConstraints={this.videoConstraints}
                  />
                </Box>
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
        </ThemeProvider>
      </>
    )
  }
}

interface Props {
  click: boolean,
  status: string
}

export default VideoScreen;