import React, { useEffect, useState } from 'react'
import moment from 'moment'
function Timeandlocation({data}) {
    const [time, setTime]=useState(null);
    const [date,setDate]=useState(null)
useEffect(()=>{
    const timezone =data.timezone;
    const timezoneInMinutes = timezone / 60;
    const currTime = moment().utcOffset(timezoneInMinutes).format("dddd, MMMM Do YYYY");
    const currDate = moment().utcOffset(timezoneInMinutes).format("h:mm a");
    setTime(currTime);
    setDate(currDate);
},[data])
console.log(data);
  return (
    <div className="flex flex-col items-center">
     <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
            {time} | Local time: {date}
        </p>
     </div>
     <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
           {data.city}
        </p>
     </div>
    </div>
  )
}

export default Timeandlocation
