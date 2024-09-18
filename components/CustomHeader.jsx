import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useWindowDimensions } from 'react-native'; // For responsive scaling

const CustomHeader = ({ address = 'Default Address', appName = 'Simplishare', onMenuPress }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.headerContainer]}>
      {/* Left Part */}
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0' }} 
          style={styles.profileImage}
          accessibilityLabel="Profile Image"
        />
        <View style={styles.leftTextContainer}>
          <Text style={styles.mallText}>Inorbit Mall</Text>
          <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">{address}</Text>
        </View>
      </View>

      {/* Center Part */}
      <View style={styles.centerContainer}>
        <Text style={styles.appName}>{appName}</Text>
      </View>

      {/* Right Part */}
      <TouchableOpacity 
        onPress={onMenuPress} 
        style={styles.rightContainer}
        accessibilityLabel="Menu Button"
        accessibilityHint="Opens the menu"
      >
        <Icon name="bars" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 60, 
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.4,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  leftTextContainer: {
    justifyContent: 'center',
    maxWidth: '70%',
  },
  mallText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 10,
    color: '#888',
    flexShrink: 1,
  },
  centerContainer: {
    flex: 0.3, 
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rightContainer: {
    flex: 0.2, // Adjust width
    alignItems: 'flex-end',
  },
});

export default CustomHeader;
