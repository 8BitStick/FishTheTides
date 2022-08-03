import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import { NativeBaseProvider, Box, Heading } from 'native-base';
import moment from 'moment';
import cheerio from 'react-native-cheerio'
import { useIsFocused } from '@react-navigation/native';
import Tide from '../components/Tide'
import { useSelector, useDispatch } from 'react-redux';
import { getTides } from '../redux/actions';






const Tides = ({ route }) => {
    const { tideDays } = useSelector(state => state.tidesReducer);
    const dispatch = useDispatch();
    const fetchTides = () => dispatch(getTides(item.station_id, item.region))
    const { item } = route.params
    const isFocused = useIsFocused()

    
    useEffect(() => {
        if(isFocused && item){
            fetchTides()
        }
    }, [isFocused, item])


    if (tideDays !== undefined) {
        
        return (
            <SafeAreaView>
                <ScrollView>
                    <NativeBaseProvider>
                        <Box flex={1} flexDirection="row" justifyContent="space-between" >
                            <Box flex={1} justifyContent="center">
                                <Heading size="lg" color="primary.100" marginTop={2}>{item.name}</Heading>
                            </Box>
                        </Box>
                        <Box marginTop={3}>
                            {tideDays.map((tideDay, i) => (
                                <Tide key={tideDay.id} tideDay={tideDay} />
                            ))}
                        </Box>
                    </NativeBaseProvider>
                </ScrollView>
            </SafeAreaView>    
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View >
    )
}
export default Tides