import React, {useEffect, useState} from 'react'
import Header from '../Header';
import {Box, Button, Typography, Slide} from '@mui/material';
import HeroImage from '../../static/images/parking.jpeg';
import DashboardImage from '../../static/images/parking-lot.jpeg';
import ParkingAppImage from '../../static/images/parking-app.jpg';
import ParkingMap from '../../static/images/parking-maps.jpg';
import NavigateIcon from '@mui/icons-material/NearMe';


const useStyles = {
  backgroundStyle: {
        backgroundImage: `url(${HeroImage}), linear-gradient(#ebebda, #ebebda)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "calc(100% - 66.7%) 100vh, calc(100% - 33.3%) 100vh",
        backgroundPosition: "left, right",
        height: "100vh",
    },

    mobileBackgroundStyle: {
      backgroundColor: "#ebebda",
      height: "100vh",
    }, 

    boxStyle: {
      display: "flex",
      flexDirection: "column",
      marginTop: "calc(100% - 95%)",
      marginLeft: "calc(100% - 76%)",
      //justify:"center",
      alignItems: "center",
      '@media (max-width:767px)': {
        display: "flex",
        marginTop: "calc(100% - 85%)",
        marginLeft: "0px",
        justifyContent: "center",
      }
    },
    titlePosition: {
      display: "flex",
      flexDirection: "column",
      marginTop: "calc(100% - 97%)",
      marginLeft: "calc(100% - 90%)",
      width: "calc(100% - 75%)",
      alignItems: "end"
    },
    titleText: {
      fontWeight: "900",
      fontSize: "2.125rem",
      paddingRight: "4rem",
      paddingLeft: "1rem",
      color: "#fff",
      marginBottom: "0.5rem",
      backgroundColor: "rgba(65, 65, 65, 0.66)"
    },
    realtimeText: {
      fontWeight: "400",
      fontSize: "2.125rem",
      color: "#fff",
      backgroundColor: "#000",
      borderRadius: "8px",
      textDecoration: "underline",
      textDecorationColor: "red",
      padding: "0px 10px"
    },
    detailButtonStyle: {
      color:'#000',
      width: "150px",
      marginTop: "20px",
      backgroundColor: "#fff",
      borderRadius: '10px',
      height: "40px",
    },

};

const HomePage: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkView = () => {
      setIsMobileView(window.innerWidth < 767) 
    };

    checkView();

    window.addEventListener('resize', checkView);

    return () => {
      window.removeEventListener('resize', checkView);
    };
  },[]);

  return (
    <div id="homepage-id" style={isMobileView ? useStyles.mobileBackgroundStyle : useStyles.backgroundStyle}>
        <Header />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={useStyles.titlePosition}>
            <Typography sx={useStyles.titleText} children="Intelligent" />
            <Typography sx={useStyles.titleText} children="Parking" />
            <Typography sx={useStyles.titleText} children="System" />
          </Box>
          <Box sx={useStyles.boxStyle}>
            <Typography variant="h4" children="Find and Park" />
            <Typography variant="h4" component="span"> All in <Typography sx={useStyles.realtimeText} children="Realtime" component="span" /> </Typography>
            <Box sx={{position:'absolute', left:'45%', bottom: 0, margin: '0px 0 0 130px'}}>
              <Slide direction='right' in={true}  timeout={1500} mountOnEnter unmountOnExit>
                <img src={ParkingAppImage} width="200px" style={{ borderRadius: '12px 12px 0 0',}}></img>
              </Slide>
            </Box>
            <Box sx={{position:'absolute', bottom: 0, margin: '0px 0px 0 200px' }}>
              <Slide direction='left' in={true}  timeout={1500} mountOnEnter unmountOnExit>
                <img src={ParkingMap} width="200px" style={{ borderRadius: '12px 12px 0 0',}}></img>
              </Slide>
            </Box>
            <Box sx={{position:'absolute', bottom: 0, }}>
              <Slide direction='up' in={true}  timeout={1500} mountOnEnter unmountOnExit>
                <img src={DashboardImage} alt="center_parking_spots" width="200px" style={{ borderRadius: '12px 12px 0 0', border: '#fff 12px'}} ></img>
              </Slide>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={useStyles.boxStyle}>
            
          </Box>

          <Box>

          </Box>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: 'center', flexDirection:'column', height:'40vh'}}>
          <Box sx={useStyles.boxStyle}>
            <Typography variant="h4" children="Find and Park" />
            <Typography variant="h4" component="span"> All in <Typography sx={useStyles.realtimeText} children="Realtime" component="span" /> </Typography>
          </Box>
          <Button variant="contained" href={"/find"} sx={useStyles.detailButtonStyle} startIcon={<NavigateIcon/>} children="Go"/>
          
          <Box sx={{position:'absolute', left:'40%', top:'calc(100% - 30%)', bottom: 0, margin: '0px 0 0 -100px', height:'0'}}>
            <Slide direction='right' in={true}  timeout={1500} mountOnEnter unmountOnExit>
              <img src={ParkingAppImage} width="150px" style={{ borderRadius: '12px 12px 0 0',}}></img>
            </Slide>
          </Box>
          <Box sx={{position:'absolute', top:'calc(100% - 30%)', bottom: 0, margin: '0px 0px 0 100px' }}>
            <Slide direction='left' in={true}  timeout={1500} mountOnEnter unmountOnExit>
              <img src={ParkingMap} width="150px" style={{ borderRadius: '12px 12px 0 0',}}></img>
            </Slide>
          </Box>
          <Box sx={{position:'absolute', top:'calc(100% - 35%)', bottom: 0, }}>
            <Slide direction='up' in={true}  timeout={1500} mountOnEnter unmountOnExit>
              <img src={DashboardImage} alt="center_parking_spots" width="150px" style={{ borderRadius: '12px 12px 0 0', border: '#fff 12px'}} ></img>
            </Slide>
          </Box>
          
          
        </Box>
    </div>
  )
}

export default HomePage;