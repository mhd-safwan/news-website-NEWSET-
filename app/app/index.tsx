import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import BreakingNewsScreen from './screens/BreakingNews'; 
import LocalNewsScreen from './screens/LocalNews'; 
import MoreScreen from './screens/More'; 
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Breaking News':
              iconName = 'More'; 
              break;
            case 'Local News':
              iconName = 'map-marker'; 
              break;
            case 'More':
              iconName = 'ellipsis-h'; 
              break;
            default:
              iconName = 'home';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Breaking News" component={BreakingNewsScreen} />
      <Tab.Screen name="Local News" component={LocalNewsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
