import React, { useEffect, useRef } from 'react';
import { Camera, CameraView } from 'expo-camera';
import { Stack } from 'expo-router';
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native'; 
import { Overlay } from '../../components/Overlay';

const CenterScreen = () => {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation(); // Access navigation prop

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {/* No need to use Stack.Screen here */}
      <CustomHeader
        address="123 Main St, City"
        appName="Simplishare"
        onMenuPress={() => navigation.openDrawer()} 
      />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              await Linking.openURL(data);
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
};

export default CenterScreen;
