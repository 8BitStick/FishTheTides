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
    const { item } = route.params
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const { tideDays } = useSelector(state => state.tidesReducer);
    const fetchTides = () => dispatch(getTides(item.station_id, item.region))
    
    
    useEffect(() => {
        if(isFocused){
            fetchTides()
        }
    }, [isFocused])

    
    return (
        <SafeAreaView>
            <ScrollView>
                <NativeBaseProvider>
                    <Box margin={1}>
                        <Box flex={1} justifyContent="center" margin={2}>
                            <Heading size="xl" color="#f05c2c">{item.name}</Heading>
                            <Divider marginTop={3} marginBottom={3} />
                        </Box>
                        <Box flex={1} justifyContent="space-between" flexDirection="row" alignItems="center" marginLeft={2} marginRight={2}>
                            <NextHighTide tideDays={tideDays} />
                            <NextLowTide tideDays={tideDays} />
                        </Box>
                        <Box margin={2}>
                            {tideDays.map((tideDay, i) => (
                                <Tide key={tideDay.id} tideDay={tideDay} tideDays={tideDays} />
                            ))}
                        </Box>
                    </Box>
                </NativeBaseProvider>
            </ScrollView>
        </SafeAreaView>
    ) 
    
}
export default Tides

