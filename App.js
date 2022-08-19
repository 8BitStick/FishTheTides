import React, { useEffect } from 'react'
import ReactNative , { StatusBar, Text } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store';
import Tides from './screens/Tides'
import Locations from './screens/Locations';

const { AccessibilityManager } = ReactNative.NativeModules

const App = () => {
  const Tab = createBottomTabNavigator();

  const setAccessibility = () => {
    AccessibilityManager.setAccessibilityContentSizeMultipliers({
      // 'extraSmall': 1.0,
      // 'small': 2.0,
      // 'medium': 3.0,
      // 'large': 4.0,
      // 'extraLarge': 5.0,
      // 'extraExtraLarge': 6.0,
      // 'extraExtraExtraLarge': 7.0,
      'accessibilityMedium': 1.0,
      'accessibilityLarge': 1.0,
      'accessibilityExtraLarge': 1.0,
      'accessibilityExtraExtraLarge': 1.0,
      'accessibilityExtraExtraExtraLarge': 1.0,
    });
    AccessibilityManager
  }

  useEffect(() => {
    //setAccessibility()
  }, [])

  
  
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer theme={DefaultTheme}>
          <StatusBar barStyle='dark-content' />
          <Tab.Navigator initialRouteName="Locations"
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
      </PersistGate>
    </Provider>
  );
}

export default App

  