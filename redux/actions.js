import moment from "moment";
import axios from "axios";
import cheerio from "react-native-cheerio";
import uuid from 'react-native-uuid';

export const GET_TIDES = 'GET_TIDES';

export const GET_STATIONS = 'GET_STATIONS'
export const SEARCH_STATIONS = 'SEARCH_STATIONS'
export const SET_STATION = 'SET_STATION'


export const getTides = (location, region) => {
    const URL = `http://www.bom.gov.au/australia/tides/`
    const today = moment().format('DD-MM-YYYY')
    let timeZone = ""
    let tz_js = ""

    switch (region) {
        case 'NSW':
            timeZone = "Australia/Sydney"
            tz_js = "AEDST"
            break;
        case 'QLD':
            timeZone = "Australia/Brisbane"
            tz_js = "AEST"
            break;
        case 'SA':
            timeZone = "Australia/Adelaide"
            tz_js = "ACDT"
            break;
        case 'WA':
            timeZone = "Australia/Perth"
            tz_js = "AWST"
            break;
        case 'VIC':
            timeZone = "Australia/Sydney"
            tz_js = "AEDST"
            break;
        case 'NT':
            timeZone = "Australia/Darwin"
            tz_js = "ACST"
            break;
        case 'TAS':
            timeZone = "Australia/Hobart"
            tz_js = "AEDT"
            break;
        case 'INT':
            timeZone = "Pacific/Auckland"
            tz_js = "NZDT"
            break;
        default:
            timeZone = "Australia/Sydney"
            tz_js = "AEDST"
    }
    const BASE_URL = `${URL}print.php?aac=${location}&type=tide&date=${today}&region=${region}&tz=${timeZone}&tz_js=${tz_js}&days=7`

    try {
        return async dispatch => {
            const res = await axios.get(`${BASE_URL}`);
            if (res.data) {
                const html = res.data;
                const $ = cheerio.load(html)
                let title = $('h2').text()
                let days = []
                let tides = $('.tide-days-outer').children().toArray()

                tides.map((tide, i) => {
                    const tideBody = $(tide).find('tbody')
                    const date = $(tide).find('h3').text()
                    const d = moment(`${date} ${moment().format('YYYY')}`).format('L')
                    const dateTime = (time) => moment(`${d} ${time}`)

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
                                "id": uuid.v4(),
                                "tide_type": firstTideType,
                                "tide_time": dateTime(firstTideTime),
                                "tide_height": firstTideHeight,
                            },
                            {
                                "id": uuid.v4(),
                                "tide_type": secondTideType,
                                "tide_time": dateTime(secondTideTime),
                                "tide_height": secondTideHeight,
                            },
                            {
                                "id": uuid.v4(),
                                "tide_type": thirdTideType !== "&#xA0;" ? thirdTideType : "",
                                "tide_time": thirdTideTime !== "&#xA0;" ? dateTime(thirdTideTime) : "",
                                "tide_height": thirdTideHeight !== "&#xA0;" ? thirdTideHeight : "",
                            },
                            {
                                "id": uuid.v4(),
                                "tide_type": fourthTideType !== "&#xA0;" ? fourthTideType : "",
                                "tide_time": fourthTideTime !== "&#xA0;" ? dateTime(fourthTideTime) : "",
                                "tide_height": fourthTideHeight !== "&#xA0;" ? fourthTideHeight : "",
                            }
                        ]
                    }
                    days.push(day)
                });

                dispatch({
                    type: GET_TIDES,
                    payload: days,
                });

            } else {
                console.log('Unable to fetch');
            }
        };
    } catch (error) {
        console.log(error)
    }
};

export const getStations = () => {
    const stationsJson = require('../stations.json')
    try {
        return async dispatch => {
            dispatch({
                type: GET_STATIONS,
                payload: stationsJson,
            });
        }

    } catch (error) {
        console.log(error)
    }

}

export const searchStations = (text) => {
    try {
        return async dispatch => {
            dispatch({
                type: SEARCH_STATIONS,
                payload: text
            })
        }
    } catch (error) {
        console.log(error)
    }


}

export const setStation = (station) => {
    try {
        return async dispatch => {
            dispatch({
                type: SET_STATION,
                payload: station,
            });
        }

    } catch (error) {
        console.log(error)
    }

}