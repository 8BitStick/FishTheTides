import moment from "moment";
import axios from "axios";
import cheerio from "react-native-cheerio";
import uuid from 'react-native-uuid';


export const GET_TIDES = 'GET_TIDES';
export const FIND_NEXT_TIDE = 'FIND_NEXT_TIDE'

export const getTides = (location, region) => {
    const URL = `http://www.bom.gov.au/australia/tides/`
    const tz = "Australia/Sydney"
    const tz_js = "AEDST"
    const today = moment().format('DD-MM-YYYY')
    const BASE_URL = `${URL}print.php?aac=${location}&type=tide&date=${today}&region=${region}&tz=${tz}&tz_js=${tz_js}&days=7`

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

