import { Box, Text } from 'native-base';
import { View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';


const NextLowTide = () => {
    const [loading, setLoading] = useState(true)
    const [nextLowTide, setNextLowTide] = useState({})
    const [timeUntilNow, setTimeUnitNow] = useState({ hrs: "", mins: "" })
    const { tideDays } = useSelector(state => state.tidesReducer)

    const nextTides = tideDays.reduce((prev, curr) => prev.concat(curr.tides), [])
    const result = nextTides.find((a, b) => {
        return moment(a.tide_time).diff(moment(), 'minutes') - moment(b.tide_time).diff(moment(), 'minutes') > 0 && a.tide_type === "Low"
    })


    useEffect(() => {
        if (result !== undefined) {
            let minsToNow = moment(result.tide_time).diff(moment(), 'minutes')
            let mins = (minsToNow % 60) + 1
            let hrs = Math.floor(minsToNow / 60)
            setTimeUnitNow({ hrs: hrs, mins: mins })
            setNextLowTide(result)
            setLoading(false)
        }
    }, [tideDays])


    if (!loading) {
        return (
            <Box margin={2} w="1/3">
                <Text fontSize="md" color="#f05c2c" textAlign="right">
                    Next <Text fontWeight={700} fontSize="lg">{nextLowTide.tide_type}
                    </Text>
                </Text>
                <Box>
                    <Text fontSize="lg" color="#f05c2c" fontWeight={700} textAlign="right">
                        {
                            timeUntilNow.hrs !== 0 ? `${timeUntilNow.hrs}hrs `
                                : timeUntilNow.mins === 60 ? `${timeUntilNow.hrs + 1}hrs `
                                    : ""
                        }
                        {
                            timeUntilNow.mins !== 60 ? `${timeUntilNow.mins}mins` : ""
                        }
                    </Text>
                </Box>
            </Box>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="small" />
            </View>
        )
    }

}

export default NextLowTide