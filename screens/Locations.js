import { TouchableOpacity, ActivityIndicator, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux';
import { getStations, searchStations, setStation } from '../redux/actions';
import { NativeBaseProvider, Text, Input, Box, HStack, Spacer } from 'native-base';

const Locations = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { stations, station } = useSelector(state => state.stationsReducer);
  const fetchStations = () => dispatch(getStations())

  useEffect(() => {
    fetchStations()
    if (station.station_id === undefined) {
      console.log("persisted state NOT_FOUND, get location....")
    } else {
      navigation.navigate('Tides')
    }
  }, []);

  const qldStations = [{ region: "Queensland", data: stations.filter((station) => station.region === "QLD") }]
  const nswStations = [{ region: "New South Wales", data: stations.filter((station) => station.region === "NSW") }]
  const ntStations = [{ region: "Northern Territory", data: stations.filter((station) => station.region === "NT") }]
  const saStations = [{ region: "Sourthern Australia", data: stations.filter((station) => station.region === "SA") }]
  const tasStations = [{ region: "Tasmania", data: stations.filter((station) => station.region === "TAS") }]
  const vicStations = [{ region: "Victoria", data: stations.filter((station) => station.region === "VIC") }]
  const waStations = [{ region: "Western Australia", data: stations.filter((station) => station.region === "WA") }]
  const pngStations = [{ region: "Papua New Guinea", data: stations.filter((station) => station.region === "PNG") }]
  const ataStations = [{ region: "Antarctica", data: stations.filter((station) => station.region === "ATA") }]
  const nzlStations = [{ region: "New Zealand", data: stations.filter((station) => station.region === "NZL") }]
  const fjiStations = [{ region: "Fiji", data: stations.filter((station) => station.region === "FJI") }]
  const wsmStations = [{ region: "Samoa", data: stations.filter((station) => station.region === "WSM") }]
  const tuvStations = [{ region: "Tuvalu", data: stations.filter((station) => station.region === "TUV") }]
  const slbStations = [{ region: "Solomon Islands", data: stations.filter((station) => station.region === "SLB") }]
  const vutStations = [{ region: "Vanuatu", data: stations.filter((station) => station.region === "VUT") }]
  const mhlStations = [{ region: "Marshall Islands", data: stations.filter((station) => station.region === "MHL") }]
  const palauStations = [{ region: "Palau", data: stations.filter((station) => station.region === "PALAU") }]
  const tonStations = [{ region: "Tonga", data: stations.filter((station) => station.region === "TON") }]
  const niueStations = [{ region: "Niue", data: stations.filter((station) => station.region === "NIUE") }]
  const cokStations = [{ region: "Cook Islands", data: stations.filter((station) => station.region === "COK") }]
  const kirStations = [{ region: "Kiribati", data: stations.filter((station) => station.region === "KIR") }]
  const cckStations = [{ region: "Cocos Islands", data: stations.filter((station) => station.region === "CCK") }]
  const cxrStations = [{ region: "Christmas Island", data: stations.filter((station) => station.region === "CXR") }]


  // const pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371;
  //   const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  //   const y = (lat2 - lat1);
  //   const d = Math.sqrt(x * x + y * y) * R;
  //   return d;
  // }

  // const nearestCity = async (latitude, longitude) => {
  //   if (latitude !== undefined | longitude !== undefined) {
  //     let mindif = 99999;
  //     let closest;

  //     for (let i = 0; i < stations.length; i++) {
  //       const dif = pythagorasEquirectangular(latitude, longitude, stations[i].lat, stations[i].lng);
  //       if (dif < mindif) {
  //         closest = i;
  //         mindif = dif;
  //       }
  //       setTimeout(() => {
  //         dispatch(setStation(stations[closest]))
  //         navigation.navigate('Tides');
  //       }, 100);
  //     }
  //   }
  // }

  const search = (text) => {
    dispatch(getStations())
    dispatch(searchStations(text))
  };

  const goToTides = ({ item }) => {
    dispatch(setStation(item))
    navigation.navigate('Tides');
  }

  if (loading) {
    return (
      <NativeBaseProvider>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>Fetching the closest tides to your location....</Text>
          <ActivityIndicator size="small" />
        </Box>
      </NativeBaseProvider>
    )
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
          <SectionList
            sections={[
              ...qldStations,
              ...nswStations,
              ...ntStations,
              ...saStations,
              ...tasStations,
              ...vicStations,
              ...waStations,
              ...pngStations,
              ...nzlStations,
              ...fjiStations,
              ...wsmStations,
              ...tuvStations,
              ...slbStations,
              ...vutStations,
              ...mhlStations,
              ...palauStations,
              ...tonStations,
              ...niueStations,
              ...cokStations,
              ...kirStations,
              ...cckStations,
              ...cxrStations,
              ...ataStations,
            ]}
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
            renderSectionHeader={({ section }) => (
              section.data.length !== 0
                ? (
                  <Box bg="white" marginBottom={1} rounded="lg" paddingTop={2} paddingBottom={2} shadow={3}>
                    <Text fontSize="xl" color="#16688d" fontWeight="700" marginLeft={2}>{section.region}</Text>
                  </Box>
                )
                : null

            )}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  )
}

export default Locations