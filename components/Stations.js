import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios';
import cheerio from 'react-native-cheerio';


const Stations = () => {
    const stations = require('../stations.json')
    const BASE_URL = `http://www.bom.gov.au/australia/tides/#!/`

    const doingShit = async () => {
        stations.map(async (station) => {
            const PAGE = `${station.region.toLowerCase()}-${station.name.toLowerCase().replace(/\s+/g, "-").replace(/[()\s]/g, "").replace(/\./g, "")}`
            const res = await axios.get(`${BASE_URL}${PAGE}`);
            if (res.data) {
                const html = res.data;
                const $ = cheerio.load(html)

            } else {
                console.log(`ERROR: ${PAGE}`)
            }

        })
    }

    useEffect(() => {
        doingShit()
    }, [])


    return (
        <View>
            <Text>Hello World</Text>
        </View>

    )
};
export default Stations