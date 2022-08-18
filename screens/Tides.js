import React, { useEffect } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { NativeBaseProvider, Box, Heading, Text, Divider } from 'native-base';
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

    if ( station.station_id === undefined ) {
        const { item } = route.params
        station = item
    } 

    const fetchTides = () => dispatch(getTides(station.station_id, station.region))
    
    useEffect(() => {
        if (isFocused){
            fetchTides()
        }
    }, [isFocused])
    
    return (
        <SafeAreaView>
            <ScrollView>
                <NativeBaseProvider>
                    <Box margin={1}>
                        <Box flex={1} justifyContent="center" margin={2}>
                            <Heading size="xl" color="#f05c2c">{station.name}
                                <Box flex={1} justifyContent="center" alignItems="center">
                                    <Heading size="xs" color="muted.400">  ({station.region})</Heading>
                                </Box>
                            </Heading>
                            <Divider marginTop={3} marginBottom={3} />
                        </Box>
                        <Box bg="#fff" borderStyle="solid" rounded="md" shadow={3} marginLeft={2} marginRight={2}>
                            <Box flex={1} justifyContent="space-between" flexDirection="row" alignItems="center" marginLeft={2} marginRight={2}>
                                <NextHighTide tideDays={tideDays} />
                                <Box padding={1}>
                                    <Divider orientation='vertical' mx="2" />
                                </Box>
                                <NextLowTide tideDays={tideDays} />
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

