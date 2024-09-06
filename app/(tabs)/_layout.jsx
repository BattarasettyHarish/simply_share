import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons for React Native
import HomeScreen from './HomeScreen.jsx'; // Import your screen components
import CenterScreen from './CenterScreen';
import MonitorScreen from './MonitorScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer}>
              {isFocused ? (
                <View style={styles.focusedTab}>
                  <View style={styles.outerBorder}>
                    <View style={styles.innerBorder}>
                      {index === 0 && (
                        <Icon name="home" color="#fff" size={24} />
                      )}
                      {index === 1 && (
                        <Icon name="plus-square" color="#fff" size={24} />
                      )}
                      {index === 2 && (
                        <Icon name="user" color="#fff" size={24} />
                      )}
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.tabIcon}>
                  {index === 0 && (
                    <Icon name="home" color="#000" size={24} />
                  )}
                  {index === 1 && (
                    <Icon name="plus-square" color="#000" size={24} />
                  )}
                  {index === 2 && (
                    <Icon name="user" color="#000" size={24} />
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Center" component={CenterScreen} />
      <Tab.Screen name="Monitor" component={MonitorScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'space-around', // Ensures equal space between the tabs
    alignItems: 'center',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, // Keep the width consistent
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedTab: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerBorder: {
  
    borderRadius: 35, // Makes the outer border circular
    borderWidth: 1, // Outer border width
    borderColor: '#e0e0e0', // Outer border color gray
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: -1, // Ensures the outer border is behind the icon
    marginTop:-55
  },
  innerBorder: {
    width: 60,
    height: 60,
    borderRadius: 35, // Makes the inner border circular
    borderWidth: 5, // Inner border width
    borderColor: '#fff', // Inner border color white
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b6b', // Background color of focused tab
   
  },
});

export default BottomTabNavigator;
