# import the opencv library 
import cv2 
import pickle

# define a video capture object 
#ls -al /dev/video* (to check id of the webcam)
#sudo systemctl start gopro_webcam.service
vid = cv2.VideoCapture(42) 

width = int(vid.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(vid.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(width)
print(height)

#calibartion data import
cameraMatrix, dist = pickle.load(open("calibration.pkl", "rb"))
cameraMatrix = pickle.load(open("cameraMatrix.pkl", "rb"))
dist = pickle.load(open("dist.pkl", "rb"))

#removing distortion
def undistort_frame(frame):
    h,  w = frame.shape[:2]
    newCameraMatrix, roi = cv2.getOptimalNewCameraMatrix(cameraMatrix, dist, (w,h), 1, (w,h))
    # Undistort
    dst = cv2.undistort(frame, cameraMatrix, dist, None, newCameraMatrix)
    # crop the image
    x, y, w, h = roi
    dst = dst[y:y+h, x:x+w]
    return dst

while(True): 
	
	# Capture the video frame 
	# by frame 
	ret, frame = vid.read() 
	frame = undistort_frame(frame)

	# Display the resulting frame 
	cv2.imshow('frame', frame) 
	
	# the 'q' button is set as the 
	# quitting button you may use any 
	# desired button of your choice 
	if cv2.waitKey(1) & 0xFF == ord('q'): 
		break

# After the loop release the cap object 
vid.release() 
# Destroy all the windows
cv2.destroyAllWindows() 

#gstreamer init
# gst-launch-1.0 v4l2src io-mode=2 do-timestamp=TRUE device=/dev/video42 ! video/x-raw ! queue ! videoconvert ! videoscale ! video/x-raw,format=I420,width=640,height=480,framerate=30/1  ! x264enc bframes=0 key-int-max=10 bitrate=500 ! video/x-h264,stream-format=avc,alignment=au,profile=baseline ! queue ! kvssink stream-name="BELIVIPSEdgeCom" storage-size=512 access-key="AKIATLYA6YMFGTC3QFGN" secret-key="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" aws-region="us-west-2"
