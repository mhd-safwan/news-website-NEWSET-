// App.js or index.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './Home';
import LocalNewsScreen from './LocalNews';
import SearchScreen from './Serch';
import SettingsScreen from './Settings';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Local News':
      iconName = 'map-marker';
      break;
    case 'Search':
      iconName = 'search';
      break;
    case 'Settings':
      iconName = 'cog';
      break;
    default:
      iconName = 'home'; // Default icon
  }

  return <FontAwesome name={iconName} size={25} color="black" />;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icon = getTabBarIcon(route);
            return React.cloneElement(icon, { color, size });
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Local News" component={LocalNewsScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
