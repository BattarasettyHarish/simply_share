import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CustomHeader address="123 Main St, City" appName="Simplishare" onMenuPress={() => navigation.openDrawer()} />
        <Text style={styles.text}>HomeScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollViewContent: { padding: 15 },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: { fontSize: 18, alignItems: 'center' },
});

export default HomeScreen;
