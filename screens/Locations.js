import { Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNLocation from 'react-native-location';
import {
  NativeBaseProvider,
  Text,
  Input,
  Box,
  HStack, 
  FlatList,
  Spacer
} from 'native-base';


const stationData = require('../stations.json')


const Locations = ({ navigation }) => {
  const [permissionsEnabled, setPermissionsEnabled] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [stations, setStations] = useState(stationData)
  

  useEffect(() => {
    checkPermissions()
    requestLocation()
  }, []);

 
  const pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  const nearestCity = async (latitude, longitude) => {
    if (latitude !== undefined | longitude !== undefined) {
      let mindif = 99999;
      let closest;

      for (let i = 0; i < stations.length; i++) {
        const dif = pythagorasEquirectangular(latitude, longitude, stations[i].lat, stations[i].lng);
        if (dif < mindif) {
          closest = i;
          mindif = dif;
        }
        setTimeout(() => {
          navigation.navigate('Tides', { item: stations[closest] });
        }, 100);
      }
    }
  }

  const checkPermissions = async () => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    });
    if (!permission){
        permission = await RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "coarse",
            rationale: {
              title: "We need to access your location",
              message: "We use your location to show where you the closest station",
              buttonPositive: "OK",
              buttonNegative: "Cancel"
            }
          }
        })
      if (!permission) {
        Alert.alert(
          'Location Service not enabled',
          'Please enable your location services for automatic location selection',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        setLoading(false)
      }
    } else {
      setPermissionsEnabled(true)
    }
  }

  const requestLocation = async () => { 
    const { latitude, longitude } = await RNLocation.getLatestLocation({ timeout: 100 })
      if (latitude && longitude) {
        nearestCity(latitude, longitude)
      }
  }

  const search = (text) => {
    if (text !== "") {
      const results = stations.filter((station) => {
        return station.name.toLowerCase().startsWith(text.toLowerCase())
      });
      setStations(results)
    } else {
      setStations(stationData)
    }
  };

  const goToTides = ({item}) => {
    navigation.navigate('Tides', { item: item });
  }


  return (
      <NativeBaseProvider>
        <Box margin={2}>
          <Box alignItems="center" marginTop={1} marginBottom={1}>
            <Input size="2xl"
              mx="3"
              placeholder="Search..."
              w="100%"
              color="#16688d"
              borderColor="muted.400"
              InputLeftElement={<Icon name="search" size={30} color="#f05c2c" style={{ "marginLeft": 10 }} />}
              onChangeText={search}
            />
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <FlatList data={stations} 
              renderItem={({ item }) => (
                <Box borderBottomWidth="1" borderColor="muted.400" pl={["0", "4"]} pr={["0", "5"]} py="2">
                  <TouchableOpacity onPress={() => goToTides({ item })}>
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <Icon name="location-on" size={30} color="#f05c2c" />
                      <Text fontSize="xl" color="#16688d">{item.name}</Text>
                      <Spacer />
                    </HStack>
                  </TouchableOpacity>
                </Box>
              )} 
              keyExtractor={item => item.id}
            />
          </Box>
        </Box>
      </NativeBaseProvider>
  )
}

export default Locations