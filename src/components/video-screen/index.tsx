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
import orange from '@material-ui/core/colors/orange';
import { Box } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[500],
    }
  },
  spacing: 8
});
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
    width: 350,
    height: 350,
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
        this.refs.webcam.getScreenshot();
        console.log('あ');
      }, 1000);
    }
  }
  
  render () {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" color="default" aria-label="menu">
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
                  <Button variant="contained" color="default" onClick={this.capture.bind(this)}>START</Button>
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
}

export default VideoScreen;