import { Box, Heading, Text, HStack, Center, Divider, Spacer } from 'native-base';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'


const Tide = ({tideDay}) => {

  return (
    <Box flex={1} justifyContent="center" marginBottom={3}>
      <Divider marginTop={3} marginBottom={3} />
      <Heading size="md" color="#16688d" marginBottom={3}>{tideDay.date}</Heading>
      {tideDay.tides.map((tide, i) => (
        tide.tide_type !== ""
          ? <Center key={i} bg="#fff" rounded="lg" shadow={3} marginBottom={2}>
            <Box flex={1} flexDirection="row" justifyContent="space-between">
              <Box flex={1} marginLeft={2} justifyContent="center">
                <HStack>
                  <Center padding={1} w="33%">
                    <Text fontSize="xl"
                      fontWeight={700}
                      color={tide.tide_type === "Low" ? "#f05c2c" : "#16688d"}>
                      {(tide.tide_type).toUpperCase()}
                    </Text>
                  </Center>
                  <Center padding={1}>
                    <Divider orientation="vertical" mx="2" />
                  </Center>
                  <Center>
                    <Text fontSize="lg" fontWeight={500} color="#16688d">
                      {tide.tide_time}
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
}

export default Tide