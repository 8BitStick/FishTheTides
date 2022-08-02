import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import { NativeBaseProvider, Box, Heading } from 'native-base';
import moment from 'moment';
import cheerio from 'react-native-cheerio'
import { useIsFocused } from '@react-navigation/native';
import Tide from '../components/Tide'


const Tides = ({ route }) => {
    const [tideDays, setTideDays] = useState()
    const { item } = route.params
    const isFocused = useIsFocused()
    
    useEffect(() => {
        if(isFocused && item){
            getData()
        }
    }, [isFocused, item])

    
    const getData = async () => {
        const location = item.station_id
        const region = item.region
        const tz = "Australia/Sydney"
        const tz_js = "AEDST"
        const today = moment().format('DD-MM-YYYY')

        try {
            const response = await fetch(`http://www.bom.gov.au/australia/tides/print.php?aac=${location}&type=tide&date=${today}&region=${region}&tz=${tz}&tz_js=${tz_js}&days=7`);
            const html = await response.text();
            const $ = cheerio.load(html)
            let title = $('h2').text()
            let days = []
            let tides = $('.tide-days-outer').children().toArray()

            tides.map((tide, i) => {
                const tideBody = $(tide).find('tbody')
                const date = $(tide).find('h3').text()

                let firstTideType = tideBody.children().find('th').html()
                let firstTideTime = tideBody.children().find('td').html()
                let firstTideHeight = tideBody.children().next().find('td').html()

                let secondTideType = tideBody.children().next().find('th').html()
                let secondTideTime = tideBody.children().next().next().find('td').html()
                let secondTideHeight = tideBody.children().next().next().next().find('td').html()

                let thirdTideType = tideBody.children().next().next().next().next().find('th').html()
                let thirdTideTime = tideBody.children().next().next().next().next().find('td').html()
                let thirdTideHeight = tideBody.children().next().next().next().next().next().find('td').html()

                let fourthTideType = tideBody.children().next().next().next().next().next().next().find('th').html()
                let fourthTideTime = tideBody.children().next().next().next().next().next().next().find('td').html()
                let fourthTideHeight = tideBody.children().next().next().next().next().next().next().next().find('td').html()

                let day = {
                    "id": i,
                    "date": date,
                    "location": title,
                    "tides": [
                        {
                            "tide_type": firstTideType,
                            "tide_time": firstTideTime,
                            "tide_height": firstTideHeight
                        },
                        {
                            "tide_type": secondTideType,
                            "tide_time": secondTideTime,
                            "tide_height": secondTideHeight
                        },
                        {
                            "tide_type": thirdTideType,
                            "tide_time": thirdTideTime,
                            "tide_height": thirdTideHeight
                        },
                        {
                            "tide_type": fourthTideType !== "&#xA0;" ? fourthTideType : "",
                            "tide_time": fourthTideTime !== "&#xA0;" ? fourthTideTime : "",
                            "tide_height": fourthTideHeight !== "&#xA0;" ? fourthTideHeight : ""
                        }
                    ]
                }
                days.push(day)
            });
            setTideDays(days)

        } catch (error) {
            console.error(error);
        }
    }

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