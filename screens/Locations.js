import { ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNLocation from 'react-native-location';
import {
  NativeBaseProvider,
  Text,
  VStack,
  Center,
  Input,
  Box,
  Divider,
  Button
} from 'native-base';


const stationData = require('../stations.json')


const Locations = ({ navigation }) => {
  const [permissionsEnabled, setPermissionsEnabled] = useState(false)
  const [viewLocation, setViewLocation] = useState([])
  const [q, setQ] = useState();
  const [stations, setStations] = useState(stationData)
  

  useEffect(() => {
    requestPermission()
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
        }, 2000);
      }
    }
  }

  const requestPermission = async () => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    });
    if (!permission) {
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
    setQ(text)
    if (text !== "") {
      const results = stations.filter((station) => {
        return station.name.toLowerCase().startsWith(text.toLowerCase())
      });
      setStations(results)
    } else {
      setStations(stationData)
    }
  };

  const goToTides = ({station}) => {
    navigation.navigate('Tides', { item: station });
  }


  return (
      <ScrollView>
        <NativeBaseProvider>
          <Box alignItems="center" marginTop={1} marginBottom={1}>
            <Input size="lg"
              mx="3"
              placeholder="Search..."
              w="100%"
              color="primary.100"
              InputLeftElement={<Icon name="search" size={20} color="#ecfeff" style={{ "marginLeft": 10 }} />}
              onChangeText={search}
              value={q}
            />
          </Box>
          <Divider bg="muted.500" width="97%" margin={1} />
          <VStack space={1}  marginTop={1}>
            {stations.map((station, i) => (
              <Center key={station.id}
                w="full" 
                bg="primary.900" 
                color="primary.100" 
                rounded="md" 
                shadow={3}
                >
                <Button primary w="full" 
                  leftIcon={<Icon name="location-on" size={20} color="#67e8f9" />}
                  onPress={() => goToTides({station})}>       
                    <Text fontSize="lg" color="primary.100">{station.name}</Text>
                </Button>
              </Center>
            ))}
          </VStack>
        </NativeBaseProvider>
      </ScrollView>
  )
}

export default Locations