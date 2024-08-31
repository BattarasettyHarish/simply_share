import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    
    // useEffect(() => {
    //  SplashScreen.hideAsync();
    // }, [])
    
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}

export default RootLayout