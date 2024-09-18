import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy'; // Updated import
import { useIsFocused } from '@react-navigation/native';
import { Video } from 'expo-av'; // Import Video component for playback
import CustomHeader from '../../components/CustomHeader';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const MediaScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [mode, setMode] = useState('camera'); // 'camera' or 'video'
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0); // Track recording duration
  const [type, setType] = useState(CameraType.back);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  // Animation state
  const modeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    Animated.timing(modeAnim, {
      toValue: mode === 'camera' ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0); // Reset duration when not recording
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'camera' ? 'video' : 'camera'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImages((prevImages) => [...prevImages, data.uri]); // Add new image
      } catch (e) {
        console.error('Error taking picture:', e);
      }
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync({
          maxDuration: 60, // Optional: Limit video length to 60 seconds
        });
        setVideo(video.uri);
        setIsRecording(false);
      } catch (e) {
        console.error('Error recording video:', e);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (e) {
        console.error('Error stopping recording:', e);
      }
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setImages([]); // Clear the images
      setVideo(null); // Clear the video
      setRecordingDuration(0); // Reset recording duration
    }
  }, [isFocused]);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
       <CustomHeader
        address="123 Main St, City"
        appName="Simplishare"
        onMenuPress={() => navigation.openDrawer()} 
      />
      {isFocused && (
        <>
          <View style={styles.cameraWrapper}>
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => {
                cameraRef.current = ref;
              }}
            />
          </View>
          {mode === 'camera' && (
            
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.buttonInner} />
            </TouchableOpacity>
          )}
          {mode === 'video' && (
            <>
              <TouchableOpacity
                style={[styles.captureButton, styles.recordButton]}
                onPress={isRecording ? stopRecording : recordVideo}
              >
                <View style={styles.buttonInner} />
              </TouchableOpacity>
              {isRecording && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{Math.floor(recordingDuration / 60)}:{('0' + (recordingDuration % 60)).slice(-2)}</Text>
                </View>
              )}
            </>
          )}
        </>
      )}

      {/* Render the latest image and the count of remaining images */}
      {mode === 'camera' && images.length > 0 && (
        <View style={styles.latestImageContainer}>
          <Image
            source={{ uri: images[images.length - 1] }} // Show the most recent image
            style={styles.latestImage}
          />
          {images.length > 1 && (
            <View style={styles.imageCountContainer}>
              <Text style={styles.imageCountText}>+{images.length - 1} more</Text>
            </View>
          )}
        </View>
      )}

      {/* Render the recorded video */}
      {mode === 'video' && video && (
        <View style={styles.latestImageContainer}>
          <Video
            source={{ uri: video }}
            style={styles.latestImage}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}

      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setMode('camera')}>
          <Animated.Text style={[styles.toggleText, mode === 'camera' && styles.activeText]}>
            Camera
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('video')}>
          <Animated.Text style={[styles.toggleText, mode === 'video' && styles.activeText]}>
            Video
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: screenWidth,
    height: screenHeight,
    borderRadius: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  latestImageContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    alignItems: 'center',
  },
  latestImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  imageCountContainer: {
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  imageCountText: {
    color: '#fff',
    fontSize: 14,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  recordButton: {
    backgroundColor: 'red',
  },
  buttonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 18,
    color: '#007BFF',
    marginHorizontal: 20,
  },
  activeText: {
    fontWeight: 'bold',
    color: '#0056b3',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
  timerText: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
});

export default MediaScreen;
