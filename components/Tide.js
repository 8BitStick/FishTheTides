import { Box, Heading, Text, HStack, Center, Divider } from 'native-base';
import { View, ActivityIndicator } from 'react-native'
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'


const Tide = ({tideDay, tideDays}) => {
  const [loading, setLoading] = useState(true)
  const [nextTideId, setNextTideId] = useState(0) 

  let nextTides = tideDays.reduce((prev, curr) => prev.concat(curr.tides), [])
  const result = nextTides.find((a, b) => {
    return moment(a.tide_time).diff(moment(), 'minutes') - moment(b.tide_time).diff(moment(), 'minutes') > 0
  })

  useEffect(() => {
    if (result !== undefined) {
      setNextTideId(result.id)
      setLoading(false)
    }
  }, [tideDays])


  if ( !loading ) {
    return (
      <Box flex={1} justifyContent="center" marginBottom={3}>
        <Divider marginTop={3} marginBottom={3} />
        <Heading size="md" color="#16688d" marginBottom={3}>{tideDay.date}</Heading>
        {tideDay.tides.map((tide, i) => (
          tide.tide_type !== ""
            ? <Center key={tide.id} 
                bg="#fff" 
                rounded="lg" 
                shadow={3} 
                marginBottom={2} 
                borderStyle={tide.id === nextTideId ? "solid" : ""} 
                borderColor={tide.id === nextTideId ? "#55ff55" : ""}
                borderWidth={tide.id === nextTideId ? 2 : 0}
              >
              <Box flex={1} flexDirection="row" justifyContent="space-between">
                <Box flex={1} marginLeft={2} justifyContent="center">
                  <HStack>
                    <Center padding={1} w="1/3">
                      <Box w="full">
                        <Text fontSize="lg"
                          fontWeight={700}
                          color={tide.tide_type === "Low" ? "#f05c2c" : "#16688d"}>
                          {(tide.tide_type).toUpperCase()}
                        </Text>
                      </Box>
                      
                    </Center>
                    <Center padding={1}>
                      <Divider orientation="vertical" mx="2" />
                    </Center>
                    <Center>
                      <Text fontSize="lg" fontWeight={500} color="#16688d">
                        {moment(tide.tide_time).format("h:mm a")}
                      </Text>
                    </Center>
                  </HStack>
                </Box>
                <Box flex={1} flexDirection="row-reverse">
                  <HStack space={1}>
                    <Box justifyContent="center" alignItems="space-between">
                      <Icon name={
                        tide.tide_type === "Low"
                          ? "caret-down"
                          : "caret-up"}
                        size={30}
                        color={tide.tide_type === "Low" ? "#f05c2c" : "#16688d"}
                      />
                    </Box>
                    <Box justifyContent="center">
                      <Text textAlign="right"
                        fontSize="xl"
                        color="#16688d"
                        marginRight={4}>
                        {tide.tide_height}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
            </Center>
            : false
        ))}

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

export default Tide