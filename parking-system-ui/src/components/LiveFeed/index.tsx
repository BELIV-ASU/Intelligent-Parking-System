import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import AWS from 'aws-sdk';
import { Box, CircularProgress } from '@mui/material';

const useStyles = {
  webVideoStyle: { 
    width: '100%', 
    height: '70vh', 
    borderRadius: '20px',
  },
  mobileVideoStyle: { 
    width: '100%', 
    height: '27vh', 
    borderRadius: '20px',
  }
}


const LiveFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  AWS.config.update({
    region: 'us-west-2',
    accessKeyId: 'AKIATLYA6YMFGTC3QFGN',
    secretAccessKey: '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',
  });
      
  const kinesisVideo = new AWS.KinesisVideo({ apiVersion: 'latest' });
   
  const getHLSStreamURL = async(streamName: string): Promise<string> => {
    const params = {
      StreamName: streamName,
      APIName: 'GET_HLS_STREAMING_SESSION_URL'
    };
      
    const options = {
      PlaybackMode: 'LIVE', 
      DisplayFragmentTimestamp: 'ALWAYS',
      Expires: 600,
      ContainerFormat: 'FRAGMENTED_MP4',
      DiscontinuityMode: 'ALWAYS',
      HLSFragmentSelector: {
        FragmentSelectorType: 'SERVER_TIMESTAMP',
      },
    };
      
    const currentDate = new Date();
    const startDate = new Date(currentDate.setDate(new Date().getDate()-2));
      
        // For testing
    const playBackOptions = {
      PlaybackMode: 'LIVE_REPLAY', 
      DisplayFragmentTimestamp: 'NEVER',
      Expires: 600,
      ContainerFormat: 'FRAGMENTED_MP4',
      DiscontinuityMode: 'ALWAYS',
      HLSFragmentSelector: {
        FragmentSelectorType: 'SERVER_TIMESTAMP',
        TimestampRange: {
            StartTimestamp: startDate,
            EndTimestamp: new Date(),
        }
      },
    }
      
    try {
      const data = await kinesisVideo.getDataEndpoint(params).promise();
      if (!data.DataEndpoint) {
        throw new Error('Endpoint not found');
      }
    
      const endpoint = data.DataEndpoint;
      const kvam = new AWS.KinesisVideoArchivedMedia({
        endpoint,
        apiVersion: 'latest',
      });
    
      const hlsParams = {
        StreamName: streamName,
        ...playBackOptions
      };
    
      const hlsData = await kvam.getHLSStreamingSessionURL(hlsParams).promise();
        if (!hlsData.HLSStreamingSessionURL) {
          throw new Error('HLS Session URL not found');
        }
    
      return hlsData.HLSStreamingSessionURL;
    } catch (error) {
      console.error('Error retrieving HLS stream:', error);
      throw error;
    }
  };   

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const initVideo = async () => {
      try {
        const streamUrl = await getHLSStreamURL('BELIVIPSEdgeCom');

        if (videoRef.current) {
          console.log('in video ref')
          if (Hls.isSupported()) {
            setIsLoading(false);
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(videoRef.current);
            // hls.on(Hls.Events.MANIFEST_PARSED, function () {
            //   videoRef.current?.play();
            // });
          } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = streamUrl;
            // videoRef.current.addEventListener('loadedmetadata', () => {
            //   videoRef.current?.play();
            // });
          }
        }
      } catch (error) {
        console.error('Error initializing video:', error);
      }
    };

    initVideo();

    // return () => {
    //   if (videoRef.current) {
    //     videoRef.current.pause();
    //     videoRef.current.removeAttribute('src');
    //     videoRef.current.load();
    //   }
    // };
  }, []);

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
    <Box>
    {
      isLoading ?
      (<CircularProgress/>) :
      (<div style={{height:"27vh"}}>
      <video controls ref={videoRef} style={isMobileView ? useStyles.mobileVideoStyle : useStyles.webVideoStyle} autoPlay />
    </div>)
    }
    </Box>
  );
}

export default LiveFeed;