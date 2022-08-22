import React, { useEffect } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { NativeBaseProvider, Box, Heading, Text, Divider, HStack, Center } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getTides } from '../redux/actions';
import { useIsFocused } from '@react-navigation/core';
import Tide from '../components/Tide'
import NextHighTide from '../components/NextHighTide';
import NextLowTide from '../components/NextLowTide'


const Tides = ({ route }) => {
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const { tideDays } = useSelector(state => state.tidesReducer);
    let { station } = useSelector(state => state.stationsReducer)

    if (station.station_id === undefined) {
        const { item } = route.params
        station = item
    }

    const fetchTides = () => dispatch(getTides(station.station_id, station.region, station.timezone, station.tz))

    useEffect(() => {
        if (isFocused) {
            fetchTides()
        }
    }, [isFocused])

    return (
        <SafeAreaView>
            <ScrollView>
                <NativeBaseProvider>
                    <Box margin={1}>
                        <Box marginLeft={2} marginRight={2}>
                            <HStack space={1} justifyContent="flex-start">
                                <Center>
                                    <Heading size="xl" color="#f05c2c">{station.name}</Heading>
                                </Center>
                                <Center>
                                    <Heading size="xs" color="muted.400">  ({station.region})</Heading>
                                </Center>
                            </HStack>
                            <Divider marginTop={3} marginBottom={4} />
                        </Box>
                        <Box bg="#fff" borderStyle="solid" rounded="md" shadow={3} marginLeft={2} marginRight={2}>
                            <Box flex={1} justifyContent="space-between" flexDirection="row" alignItems="center" marginLeft={2} marginRight={2}>
                                <NextHighTide />
                                <Box padding={1}>
                                    <Divider orientation='vertical' mx="2" />
                                </Box>
                                <NextLowTide />
                            </Box>
                        </Box>
                        <Box margin={2}>
                            {tideDays.map((tideDay, i) => (
                                <Tide key={tideDay.id} tideDays={tideDays} tideDay={tideDay} />
                            ))}
                        </Box>
                    </Box>
                </NativeBaseProvider>
            </ScrollView>
        </SafeAreaView>
    )

}
export default Tides

