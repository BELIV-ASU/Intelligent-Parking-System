import React, { useEffect, useState } from "react";
import Header from "../Header";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import NavigateIcon from "@mui/icons-material/NearMe";
import WatchIcon from "@mui/icons-material/PlayCircleOutline";
import SpotsTable from "../SpotsTable";
import ParkingLotMap from "../ParkingLotMap";
import LiveFeed from "../LiveFeed";

const useStyles = {
  backgroundStyle: {
    backgroundImage: `linear-gradient(#ebebda, #ebebda), linear-gradient(#F2F1F1, #F2F1F1)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw calc(100% - 70%), 100vw calc(100% - 30%)",
    backgroundPosition: "top, bottom",
    height: "100vh",
  },
  outerBox: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "65px",
    height: "90vh",
    "@media (max-width:767px)": {
      marginLeft: "0px",
      //overflow: "auto",
      //height: "auto",
    },
  },
  innerBox: {
    display: "flex",
    height: "80vh",
    "@media (max-width:767px)": {
      flexDirection: "column",
      height: "auto",
    },
  },
  pageTitle: {
    marginLeft: "8px",
    marginTop: "20px",
    "@media (max-width:767px)": {
      marginTop: "10px",
      //marginLeft: "25px",
      alignSelf: "center",
      backgroundColor: "#fff",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      borderRadius: "5rem",
    },
  },
  detailButtonStyle: {
    width: "15vw",
    marginTop: "10px",
    backgroundColor: "#000",
    borderRadius: "8px",
    height: "50px",
    "@media (max-width:767px)": {
      width: "200px",
      marginTop: "0px",
      marginBottom: "20px",
      height: "40px",
    },
  },
  detailTitle: {
    padding: "10px 0px",
    textAlign: "center",
    borderBottom: "1px solid #979797",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  detailContent: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  },

  // Watch live page
  liveDataBox: {
    marginTop: "0.8em",
    borderRadius: "20px",
    backgroundColor: "#fff",
    width: "1050px",
    height: "70vh",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 30%)",
    flex: 3,
    //alignSelf: "center",
    justifyContent: "center",
    "@media (max-width:767px)": {
      width: "90vw",
      margin: "20px",
      height: "27vh",
    },
  },
  liveDetailBox: {
    margin: "0.8em 60px 20px 40px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    width: "300px",
    height: "300px",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 15%)",
    flex: 1,
    "@media (max-width:767px)": {
      marginLeft: "60px",
      alignSelf: "center",
      width: "80vw",
    },
  },

  // Find Page
  findDataBox: {
    marginTop: "0.8em",
    borderRadius: "20px",
    backgroundColor: "#fff",
    width: "1050px",
    height: "78vh",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 30%)",
    flex: 3,
    alignSelf: "center",
    justifyContent: "center",
    "@media (max-width:767px)": {
      width: "90vw",
      margin: "20px",
      height: "60vh",
    },
  },
  findDetailBox: {
    margin: "0.8em 60px 20px 40px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    width: "300px",
    height: "40vh",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 30%)",
    flex: 1,
    "@media (max-width:767px)": {
      marginLeft: "20vw",
      marginRight: "20vw",
      alignSelf: "center",
      width: "80vw",
    },
  },

  //Navigate Page
  navigateDataBox: {
    marginTop: "0.8em",
    borderRadius: "20px",
    backgroundColor: "#fff",
    width: "1050px",
    height: "80vh",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 30%)",
    flex: 3,
    alignSelf: "center",
    justifyContent: "center",
    "@media (max-width:767px)": {
      width: "90vw",
      margin: "20px",
      height: "50vh",
    },
  },
  locationDetailOuterBox: {
    marginLeft: "40px",
    marginTop: "8px",
    marginRight: "65px",
    marginBottom: "20px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    width: "300px",
    height: "350px",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 30%)",
    flex: 1,
    "@media (max-width:767px)": {
      marginLeft: "60px",
      alignSelf: "center",
      width: "80vw",
    },
  },
  locationDetailBox: {
    margin: "5px",
    borderRadius: "20px",
    backgroundColor: "#ebebda",
    height: "400px",
    border: "1px solid #D8D8D8",
    overflow: "auto",
    scrollbarWidth: "thin",
    boxShadow: " 0 0 0 2px white,1.1em 0.5em 3em rgb(0 0 0 / 20%)",
  },
  distanceStyle: {
    fontWeight: "bold",
    fontSize: "1em",
    textAlign: "center",
    paddingBottom: "5px",
    marginBottom: "10px",
    borderBottom: "1px solid #9C9A9A",
  },
  addressStyle: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#D8D8D8",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  directionsStyle: {
    fontSize: "13px",
    width: "210px",
    "@media (max-width:767px)": {
      width: "55vw",
    },
  },
};

export interface ISpotsData {
  id: number;
  name: string;
  block: string;
  location: string;
  distance: string;
  vacant: string;
  lat: number;
  long: number;
  ev: boolean;
}

interface IProps {
  title: string;
  page: string;
}

const ParkingPage: React.FC<IProps> = (props) => {
  const { title, page } = props;

  const [spotsData, setSpotsData] = useState<ISpotsData[]>([]);

  const [spotDetail, setSpotDetail] = useState<ISpotsData>();

  const [isLoading, setIsLoading] = useState(true);

  const [locationDetails, setLocationDetails] = useState<any>(null);

  let evAvailable = "No";

  const getSpotsData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://xm5kidlp3k.execute-api.us-east-2.amazonaws.com/default/spots"
      )
      .then((response) => {
        if (response.status === 200) {
          setSpotsData(response.data);
          evAvailable = response.data.map((parkingSpot: ISpotsData) => {
            return parkingSpot["ev"] === true ? "Yes" : "No";
          });
        } else {
          throw response;
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>?/gm, " ");
  };

  useEffect(() => {
    getSpotsData();
  }, []);

  useEffect(() => {
    setSpotDetail(spotsData[0]);
  }, [spotsData, page]);

  // HTML code for parking page
  return (
    // Background colors
    <div style={useStyles.backgroundStyle}>
      <Header />

      <Box sx={useStyles.outerBox}>
        <Typography variant="h6" sx={useStyles.pageTitle} children={title} />

        <Box sx={useStyles.innerBox}>
          {page === "navigate" && (
            <>
              <Box sx={useStyles.navigateDataBox}>
                <ParkingLotMap
                  locationDetails={locationDetails}
                  setLocationDetails={setLocationDetails}
                  spotsData={spotsData}
                />
              </Box>
              <Box sx={useStyles.locationDetailOuterBox}>
                {locationDetails && (
                  <Box sx={{ margin: "20px" }}>
                    <Typography
                      variant="body2"
                      sx={useStyles.addressStyle}
                      children={"A. " + locationDetails["start_address"]}
                    />
                    <Typography
                      variant="body2"
                      sx={useStyles.addressStyle}
                      children={"B. " + locationDetails["end_address"]}
                    />
                  </Box>
                )}
                <Box sx={useStyles.locationDetailBox}>
                  {locationDetails && (
                    <Box sx={{ padding: "10px" }}>
                      <Typography
                        variant="body1"
                        sx={useStyles.distanceStyle}
                        children={
                          locationDetails["distance"].text +
                          ", About " +
                          locationDetails["duration"].text
                        }
                      />
                      {locationDetails["steps"].map(
                        (step: any, index: number) => {
                          return (
                            <Box
                              display="flex"
                              key={index}
                              sx={{ justifyContent: "center" }}
                            >
                              <Typography
                                variant="body2"
                                sx={useStyles.directionsStyle}
                                children={
                                  index +
                                  1 +
                                  ". " +
                                  stripHtmlTags(step["instructions"])
                                }
                              />
                              <Typography
                                variant="body2"
                                sx={{ fontSize: "12px", paddingLeft: "20px" }}
                                children={stripHtmlTags(step["distance"].text)}
                              />
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}

          {page === "find" && (
            <>
              <Box sx={useStyles.findDataBox}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <SpotsTable
                    spotsData={spotsData}
                    setSpotsData={setSpotsData}
                    setSpotDetail={setSpotDetail}
                    setIsLoading={setIsLoading}
                  />
                )}
              </Box>
              <Box sx={useStyles.findDetailBox}>
                <Box sx={useStyles.detailTitle}>
                  <Typography
                    variant="h6"
                    children={spotDetail && spotDetail["name"].toUpperCase()}
                  />
                </Box>
                <Box sx={useStyles.detailContent}>
                  <Box>
                    <Typography children="EV Charging " />
                    <Typography children={"Last update"} />
                  </Box>
                  <Box>
                    <Typography children={" : No"} />
                    <Typography children={": 20:23"} />
                  </Box>
                </Box>
                <Box sx={[useStyles.flexCol, { alignItems: "center" }]}>
                  <Button
                    variant="contained"
                    href={
                      spotDetail
                        ? `/navigate?lat=${spotDetail["lat"]}&long=${spotDetail["long"]}`
                        : "/navigate"
                    }
                    sx={useStyles.detailButtonStyle}
                    startIcon={<NavigateIcon />}
                    children="Navigate"
                  />
                  <Button
                    variant="contained"
                    href="/watch"
                    sx={useStyles.detailButtonStyle}
                    startIcon={<WatchIcon />}
                    children="Watch Live"
                  />
                </Box>
              </Box>
            </>
          )}

          {page === "watch" && (
            <>
              <Box sx={useStyles.liveDataBox}>
                <LiveFeed />
              </Box>
              <Box sx={useStyles.liveDetailBox}>
                <Box sx={useStyles.detailTitle}>
                  <Typography
                    variant="h6"
                    children={spotDetail && spotDetail["name"].toUpperCase()}
                  />
                </Box>
                <Box sx={useStyles.detailContent}>
                  <Box>
                    <Typography children={"Total Spots"} />
                    <Typography children={"EV Availability"} />
                    <Typography children={"Distance"} />
                    <Typography children={"Type"} />
                  </Box>
                  <Box>
                    <Typography children={": " + spotsData.length} />
                    <Typography children={": " + evAvailable} />
                    <Typography
                      children={`: ${
                        spotsData.length && spotsData[0]?.distance
                      }`}
                    />
                    <Typography children={": Outdoor"} />
                  </Box>
                </Box>
                <Box sx={[useStyles.flexCol, { alignItems: "center" }]}>
                  <Button
                    variant="contained"
                    href={"/navigate"}
                    sx={useStyles.detailButtonStyle}
                    startIcon={<NavigateIcon />}
                    children="Navigate"
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ParkingPage;
