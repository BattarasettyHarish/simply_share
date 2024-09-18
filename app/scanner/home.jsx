// import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
// import { Link, Stack } from "expo-router";
// import { useCameraPermissions } from "expo-camera";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// const Home = () => {
//   const [permission, requestPermission] = useCameraPermissions();
//   const isPermissionGranted = Boolean(permission?.granted);

//   const handleRequestPermission = async () => {
//     const { status } = await requestPermission();
//     if (status === 'granted') {
//       // Optionally handle additional logic if needed
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Stack.Screen options={{ title: "Overview", headerShown: false }} />
//       <View style={styles.content}>
//         <Text style={styles.title}>QR Code Scanner</Text>
//         <Pressable onPress={handleRequestPermission} style={styles.buttonContainer}>
//           <Text style={styles.buttonStyle}>Request Permissions</Text>
//         </Pressable>
//       </View>
//       <View style={styles.iconContainer}>
//         <Link href={"/scanner"} asChild>
//           <Pressable disabled={!isPermissionGranted}>
//             <MaterialIcons name="qr-code-scanner" size={40} color="red" />
//           </Pressable>
//         </Link>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 80,
//   },
//   title: {
//     color: "#000000",
//     fontSize: 40,
//   },
//   buttonContainer: {
//     marginVertical: 20,
//   },
//   buttonStyle: {
//     color: "#0E7AFE",
//     fontSize: 20,
//     textAlign: "center",
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 10,
//   },
// });

// export default Home;
