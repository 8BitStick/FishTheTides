import { Box, Heading, Text, HStack, Center } from 'native-base';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'


const Tide = ({tideDay}) => {

  return (
    <Box flex={1} justifyContent="center">
      <Heading size="lg" color="primary.100">{tideDay.date}</Heading>
      {tideDay.tides.map((tide, i) => (
        tide.tide_type !== ""
          ? <Center key={i} bg="primary.900" rounded="lg" shadow={3} marginBottom={2}>
            <Box flex={1} flexDirection="row" justifyContent="space-between">
              <Box flex={1} paddingLeft={4} justifyContent="center">
                <HStack space={3}>
                  <Text fontSize="lg"
                    color={tide.tide_type === "Low" ? "danger.500" : "primary.500"}>
                    {(tide.tide_type).toUpperCase()}
                  </Text>
                  <Text textAlign="left" fontSize="lg" color="primary.50">
                    {tide.tide_time}
                  </Text>
                </HStack>
              </Box>
              <Box flex={1} flexDirection="row-reverse">
                <HStack space={1} >
                  <Icon name={
                    tide.tide_type === "Low"
                      ? "caret-down"
                      : "caret-up"}
                    size={30}
                    color={tide.tide_type === "Low" ? "#f43f5e" : "#06b6d4"} />
                  <Box justifyContent="center">
                    <Text textAlign="right"
                      fontSize="lg"
                      color="primary.50"
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
}

export default Tide