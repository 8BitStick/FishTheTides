import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Tides from './screens/Tides'
import Locations from './screens/Locations';

const App = ({}) => {
  const Tab = createBottomTabNavigator();
  
  return (
    <Provider store={store}>
      <NavigationContainer theme={DefaultTheme}>
        <StatusBar barStyle='dark-content' />
        <Tab.Navigator initialRoute="Locations"
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#f05c2c",
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
            options={{
              headerStyle: {
                shadowColor: 'gray',
                shadowRadius: 3
              },
              headerTintColor: '#f05c2c',
              headerTitleStyle: {
                fontSize: 20
              },
            }}
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
              }
            }}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer >
    </Provider>
  );
}

export default App

  