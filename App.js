import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Tides from './screens/Tides'
import Locations from './screens/Locations';



const App = ({}) => {
  const Tab = createBottomTabNavigator();
  
  return (
      <NavigationContainer theme={DarkTheme}>
        <StatusBar barStyle='light-content' />
        <Tab.Navigator initialRoute="Locations"
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#22d3ee",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Tides') {
                iconName = focused
                  ? 'water'
                  : 'water';
              } else if (route.name === 'Locations') {
                iconName = focused
                  ? 'location-arrow'
                  : 'location-arrow';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
            <Tab.Screen
              name="Locations"
              component={Locations}
            />
            <Tab.Screen
              name="Tides"
              component={Tides}
              initialParams={{
                item: {
                  "id": 34,
                  "lat": -33.87271,
                  "lng": 151.2056942,
                  "name": "Sydney (Fort Denison)",
                  "region": "NSW",
                  "station_id": "NSW_TP007"
                } }}
              options={{
                headerShown: false,
              }}
              />
          </Tab.Navigator>
      </NavigationContainer >
    
  );
}

export default App

  