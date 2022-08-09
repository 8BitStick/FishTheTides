import { Box, Text } from 'native-base';
import { View, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment';


const NextLowTide = ({tideDays}) => {
    const [loading, setLoading] = useState(true)
    const [nextLowTide, setNextLowTide] = useState({})
    const [timeUntilNow, setTimeUnitNow] = useState({hrs: "", mins: ""})


    let nextTides = tideDays.reduce((prev, curr) => prev.concat(curr.tides), [])
    const result = nextTides.find((a, b) => {
        return moment(a.tide_time).diff(moment(), 'minutes') - moment(b.tide_time).diff(moment(), 'minutes') > 0 && a.tide_type === "Low"
    })

    useEffect(() => {
        if ( result !== undefined) {
            let minsToNow = moment(result.tide_time).diff(moment(), 'minutes')
            let mins = (minsToNow % 60) + 1
            let hrs = Math.floor(minsToNow / 60)
            setTimeUnitNow({hrs: hrs, mins: mins})
            setNextLowTide(result)
            setLoading(false)
            
        }
    }, [tideDays])

    
    if (!loading){
        return (
            <Box>
                <Text fontSize="md" color="#16688d" textAlign="right">
                    Next <Text color="#f05c2c" fontWeight={700} fontSize="lg">{nextLowTide.tide_type}
                    </Text>
                </Text>
                <Box justifyContent="center" alignItems="center">
                    <Text fontSize="lg" color="#16688d" fontWeight={700}>
                        {timeUntilNow.hrs}hrs {timeUntilNow.mins} mins
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