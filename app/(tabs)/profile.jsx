import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';
import Button from '../../components/Button';
import { useIsFocused } from '@react-navigation/native';

const Profile = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);
  const [images, setImages] = useState([]);
  const [type, setType] = useState(CameraType.back);
  const [selectedImage, setSelectedImage] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted' && mediaStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImages((prevImages) => [...prevImages, data.uri]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImages = async () => {
    if (images.length > 0) {
      try {
        const assetPromises = images.map((uri) => MediaLibrary.createAssetAsync(uri));
        await Promise.all(assetPromises);
        alert("All pictures saved!");
        setImages([]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && !selectedImage ? (
        <>
          <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
          <Button  title={"Take a picture"} icon="camera" onPress={takePicture} />
        </>
      ) : (
        <Image source={{ uri: selectedImage }} style={styles.fullImage} />
      )}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image source={{ uri: item }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.thumbnailContainer}
      />
      {images.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button title={"Save All"} icon="check" onPress={saveImages} />
          <Button title={"Clear"} icon="trash" onPress={() => setImages([])} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    paddingBottom: 20,
  },
  camera: {
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
  },
  fullImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    marginTop: 10,
  },
});

export default Profile;
