import useAxios from "axios-hooks";
import { useEffect, useState } from "react"
import { useGlobalState } from "../state/GlobalState";
import { API_BASE_URL } from '../api/AxiosBootstrap';
import { lightFormat, isAfter } from 'date-fns';
import moment from 'moment'
import color from 'color'
import Colors from "../constants/color";

const getWeeksDay = (except) => {
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysInWeek.filter(d => !except.includes(d))
}

var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};

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


export const UseNLMarkedDates = ({ Bookings = [],...props}) => {
    const [markedDays, setMarkedDay] = useState({})
    const [nonAvailableDays, setNonAvailableDays] = useState({})
    const [partialBookedDay, setPartialBookedDay] = useState({})

    const [singleUserReq, getSingleUser] = useAxios({}, { manual: true })
    const [availableTimePerCoach, getUserData] = UseMultipleAxioHook()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

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

    useEffect(() => {
        getSingleUser({ url: `/Account/GetUserByEmail/${props.EmailID}` })
            .then(({ data }) => {
                getWeeksDay(data.Availabilities.map(i => i.Day)).forEach(d => {
                    markDayOfWeekNonAvailable(d)
                })
            })

        const bookedDays = Bookings.reduce((newState, booking) => {
            newState[booking.BookingDate.split('T')[0]] = {
                selected: true,
                selectedColor: 'orange',
                total: Bookings.filter(el => el.Id == booking.Id).length,
                booking
            }
            return newState
        }, {})

        const httpCalls = Object.keys(bookedDays).map(k => {
            const data = {
                "coachID": props.Id,
                "date": bookedDays[k].booking.BookingDate
            }
            return { data, url: `${API_BASE_URL}/Users/GetAvailableTimeByCoachId`, method: 'post' }
        })

        if (httpCalls.length != 0) {
            getUserData(httpCalls).then(r => {
                r.forEach((axiosRes) => {
                    const date = JSON.parse(axiosRes.config.data).date.split('T')[0]
                    const bookedDay = bookedDays[date]
                    if (bookedDay.total >= axiosRes.data.length) {
                        bookedDays[date] = { selected: true, selectedColor: 'red', disabled: true }
                    } else {
                        bookedDays[date] = { selected: true, selectedColor: 'orange' }
                    }
                })
    
                setPartialBookedDay(bookedDays)
            })
        }
        
    }, [props.EmailID])

    const markAvailableDay = (string) => {
        setMarkedDay({ [string]: { selected: true, selectedColor: 'white' } })
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
            newDate[d] = { selected: true, selectedColor: 'red', disabled: true }
        })

        setNonAvailableDays((p) => ({ ...p, ...newDate }))
    }

    return {
        isUpdating,
        markedDays: { ...markedDays, ...nonAvailableDays, ...partialBookedDay, ...markedDates },
        markAvailableDay,
        markDayOfWeekNonAvailable,
        selectRange,
        startDate,
        endDate
    }
}