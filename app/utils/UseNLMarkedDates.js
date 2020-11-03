import useAxios from "axios-hooks";
import Axios from "axios";
import { useEffect, useState } from "react"
import { useGlobalState } from "../state/GlobalState";
import { API_BASE_URL } from '../api/AxiosBootstrap';
import { lightFormat, isAfter, endOfMonth, setMonth } from 'date-fns';
import moment from 'moment'
import color from 'color'
import Colors from "../constants/color";

const getWeeksDay = (except) => {
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysInWeek.filter(d => !except.includes(d))
}

var getDaysArray = function (s, e) { for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) { a.push(new Date(d)); } return a; };

const UseMultipleAxioHook = (config) => {
    const [token] = useGlobalState('token');
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();

    const fetch = (con) => {
        setLoading(true)
        const finalConfig = (con || config).map(c => {
            return {
                ...c,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        return Promise.all(finalConfig.map(c => {
            return Axios(c)
        }))
            .then((r) => {
                setLoading(false)
                setData(r.map(d => d.data))
                return r
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                setError(err)
            })
    }

    return [{ loading, data, error }, fetch]
}


export const UseNLMarkedDates = ({ Bookings = [], ...props }) => {
    const [markedDays, setMarkedDay] = useState({})
    const [nonAvailableDays, setNonAvailableDays] = useState({})
    const [partialBookedDay, setPartialBookedDay] = useState({})
    const [multipleDates, setMultipleDates] = useState({})

    const [singleUserReq, getSingleUser] = useAxios({}, { manual: true })
    const [availablesDatesReq, getAvailablesDates] = useAxios({}, { manual: true })
    const [availableTimePerCoach, getUserData] = UseMultipleAxioHook()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const getTimespansPerDate = (date, timespans) => {
        return timespans.filter(timespan => {
            const formattedDate = timespan.BookingDate.split("T")[0]
            return formattedDate == date
        })
    }

    const selectRange = (date) => {
        if (!startDate && !endDate) {
            setStartDate(date)
        } else if (startDate && !endDate) {
            if (isAfter(startDate, date)) {
                setStartDate(date)
                setEndDate(startDate)
            } else {
                setEndDate(date)
            }
        } else {
            setStartDate(date)
            setEndDate(null)
        }
    }

    const markedDates = {}

    if (startDate && endDate) {
        getDaysArray(startDate, endDate)
            .map(d => {
                markedDates[lightFormat(d, 'yyyy-MM-dd')] = { color: color(`${Colors.nl_yellow}`).lighten(0.5), textColor: 'white' }
            })
    }
    if (startDate) {
        markedDates[lightFormat(startDate, 'yyyy-MM-dd')] = { startingDay: true, color: Colors.nl_yellow, textColor: 'white' }
    }
    if (endDate) {
        markedDates[lightFormat(endDate, 'yyyy-MM-dd')] = { endingDay: true, color: Colors.nl_yellow, textColor: 'white' }
    }

    const isUpdating = () => singleUserReq.loading || availableTimePerCoach.loading

    const toggleDate = (date) => {
        let newState = { ...multipleDates }

        if (multipleDates[date]) {
            const { [date]: toIgnore , ...rest} = newState
            newState = { ...rest }
        } else {
            newState[date] = { startingDay: true, customStyles: { container: { backgroundColor: Colors.nl_yellow } }}
        }
        setMultipleDates(newState)
    }


    useEffect(() => {
        getSingleUser({ url: `/Account/GetUserByEmail/${props.EmailID}` })
            .then(({ data }) => {
                getWeeksDay(data.Availabilities.map(i => i.Day)).forEach(d => {
                    markDayOfWeekNonAvailable(d)
                })
            })

        const bookedDays = Bookings.reduce((newState, book) => {
            book.Sessions.forEach(d => {
                newState[d.BookingDate?.split('T')[0]] = {
                    customStyles: { container: { backgroundColor: Colors.s_blue } },
                    total: Bookings.filter(el => el.Id == book.Id).length,
                    booking: book,
                    bookingDate: d.BookingDate,
                }
            })

            return newState
        }, {})

        if (Bookings.length != 0) {
            const bookedDates = Object.keys(bookedDays)
            const data = {
                "coachID": props.Id,
                "date": moment(bookedDates[0]).startOf("month").toISOString(),
                "endDate": moment(bookedDates.pop()).endOf("month").subtract(1, "day").toDate().toISOString(),
            }

            const axiosReq = { data, url: `${API_BASE_URL}/Users/GetAvailableTimeByCoachId`, method: 'post' }
            getAvailablesDates(axiosReq)
                .then(r => {
                    console.log(r.data)
                    const datesToCheck = r.data.map(timeSpan => {
                        return timeSpan.BookingDate.split("T")[0]
                    })
                    .reduce((newArray, next) => {
                        const temp = new Set(newArray)
                        temp.add(next)
                        return Array.from(temp.values())
                    }, [])

                    datesToCheck.forEach(d => {
                        const bookedDay = bookedDays[d]

                        if (bookedDay) {
                            //console.log("bookedDay", bookedDay)
                            //console.log("getTimespansPerDate", getTimespansPerDate(d, r.data).length)
                            
                            if (bookedDay.total >= getTimespansPerDate(d, r.data).length) {
                                bookedDays[d] = { customStyles: { container: { backgroundColor: 'gray'} }, disabled: true }
                            } else {
                                bookedDays[d] = { selected: true, customStyles: { container: { backgroundColor: Colors.s_blue } } }
                            }
                        }
                    })

                    setPartialBookedDay(bookedDays)
                })
        }

    }, [props.EmailID])

    const markAvailableDay = (string) => {
        setMarkedDay({ [string]: { selected: true } })
    }

    const markDayOfWeekNonAvailable = (dayOfWeek) => {
        var dayOfW = moment().startOf('month')
        var month = dayOfW.month();

        const dayArr = []
        while (month === dayOfW.month()) {
            if (dayOfW.format('dddd') == dayOfWeek) {
                dayArr.push(dayOfW.format('YYYY-MM-DD'))
            }
            dayOfW = dayOfW.add(1, 'd');
        }
        const newDate = {}
        dayArr.forEach(d => {
            newDate[d] = { disabled: true, customStyles: { container: { backgroundColor: 'gray'} } }
        })

        setNonAvailableDays((p) => ({ ...p, ...newDate }))
    }

    return {
        isUpdating,
        markedDays: { ...markedDays, ...nonAvailableDays, ...partialBookedDay, ...markedDates, ...multipleDates },
        markAvailableDay,
        markDayOfWeekNonAvailable,
        selectRange,
        toggleDate,
        multipleDates,
        startDate,
        endDate
    }
}