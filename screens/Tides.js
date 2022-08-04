import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import { NativeBaseProvider, Box, Heading, Text, Divider } from 'native-base';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import Tide from '../components/Tide'
import { useSelector, useDispatch } from 'react-redux';
import { getTides } from '../redux/actions';


const Tides = ({ route }) => {
    const [nextTide, setNextTide] = useState(null)
    const [timeUntilNextTide, setTimeUntilNextTide] = useState(null)
    const { tideDays } = useSelector(state => state.tidesReducer);
    const dispatch = useDispatch();
    const fetchTides = () => dispatch(getTides(item.station_id, item.region))
    const { item } = route.params
    const isFocused = useIsFocused()

    
    
    useEffect(() => {
        if(isFocused && item){
            fetchTides();
            calcNextTide();
        }
    }, [isFocused, item])


    const calcNextTide = async() => {
        if (tideDays !== undefined) {
            const arr = []
            tideDays.map((tideDay) => {
                tideDay.tides.map((tide, i) => {
                    let dateTime = moment(`${tideDay.date} ${moment().format('YYYY')} ${tide.tide_time}`)
                    let obj = {
                        id: i,
                        tideDayId: tideDay.id,
                        tideId: tide.id,
                        tideTime: dateTime,
                        timeDiff: dateTime.diff(moment(), 'minutes')
                    }
                    if (obj.timeDiff > 0) {
                        arr.push(obj)
                    }
                })
            })
            const closest = arr.sort((a, b) => {
                return a.tideTime - b.tideTime
            })
            const tideDaysIndex = closest[0].tideDayId
            const tidesIndex = closest[0].tideId - 1
            const minutes = ( closest[0].timeDiff % 60 ) + 1
            const hours = Math.floor((closest[0].timeDiff + 1) / 60)
            setTimeUntilNextTide({
                hours: hours,
                minutes: minutes
            })
            setNextTide(tideDays[tideDaysIndex].tides[tidesIndex])

        }
    }

  

    if(nextTide){
        return (
            <SafeAreaView>
                <ScrollView>
                    <NativeBaseProvider>
                        <Box margin={1}>
                            <Box flex={1} justifyContent="center" margin={2}>
                                <Heading size="xl" color="#f05c2c">{item.name}</Heading>
                                <Divider marginTop={3} marginBottom={3} />
                            </Box>
                            <Box flex={1} flexDirection="row-reverse" >
                                <Text fontSize="lg" fontWeight={700} color="#16688d">
                                    Next Tide: <Text fontSize="xl" color={nextTide.tide_type === "High" ? "#16688d" : "#f05c2c"}>
                                        {nextTide.tide_type}
                                    </Text>
                                </Text>
                            </Box>
                            <Box flex={1} flexDirection="row-reverse">
                                <Text fontSize="lg" fontWeight={700} color="#16688d">
                                    {timeUntilNextTide.hours === "0" ? "" : `${timeUntilNextTide.hours} hrs`} {timeUntilNextTide.minutes === "60" ? "" : `${timeUntilNextTide.minutes} mins`}
                                </Text>
                            </Box>
                            <Box margin={2}>
                                {tideDays.map((tideDay, i) => (
                                    <Tide key={tideDay.id} tideDay={tideDay}  />
                                ))}
                            </Box>
                        </Box>
                    </NativeBaseProvider>
                </ScrollView>
            </SafeAreaView>
        )
    }
        
    
}
export default Tides