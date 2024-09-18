import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen.jsx';
import CenterScreen from './CenterScreen';
import MonitorScreen from './MonitorScreen';
import { StatusBar } from 'expo-status-bar';

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
                        <Icon name="qrcode" color="#fff" size={24} />
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
                    <Icon name="qrcode" color="#000" size={24} />
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
    <>
      <StatusBar backgroundColor="#161622" style="light" translucent={false} />
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Center" component={CenterScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Monitor" component={MonitorScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
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

    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: -1,
    marginTop: -55
  },
  innerBorder: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',

  },
});

export default BottomTabNavigator;
