import React, { useState ,useEffect} from 'react'
import moment from 'moment'
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown
} from '@iconscout/react-unicons';
function TemperatureandDetails({data,unit,}) {
  const [sunrise,setsunrise]=useState();
  const [sunset,setsunset]=useState();
  useEffect(()=>{
    const timezone =data.timezone;
    const sunrisetime = data.sys.sunrise;
    const sunsettime = data.sys.sunset;
   const  x = moment.utc(sunrisetime,'X').add(timezone,'seconds').format('h:mm a');
   const  y= moment.utc(sunsettime,'X').add(timezone,'seconds').format('h:mm a');
setsunrise(x);
setsunset(y);
//  console.log(data); 
},[data])
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p >{data.weather[0].description}</p>
      </div>

      <div className="flex items-center justify-center text-white py-3 flex-wrap gap-4">
        
      <img
          alt="weather"
          className="w-25  "
          src={`icons/${data.weather[0].icon}.png`}
        />
        <p className="text-5xl ">{Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}</p>
        <div className="flex flex-col space-y-2 items-start justify-start  ">
          <div className="flex font-light text-sm items-center justify-center">
           <UilTemperature size={18} className="mr-1"/>
           Real fell:
           <span className="font-medium ml-1">{Math.round(data.main.feels_like)}°</span>

          </div>
          <div className="flex font-light text-sm items-center justify-center">
           <UilTear size={18} className="mr-1"/>
          Humidity:
           <span className="font-medium ml-1">{data.main.humidity}%</span>

          </div>
          <div className="flex font-light text-sm items-center justify-center">
           <UilWind size={18} className="mr-1"/>
          wind:
           <span className="font-medium ml-1">{data.wind.speed}{unit === "metric"?"mt/sec":"km/hr"}</span>

          </div>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col sm:justify-start sm:items-start sm:space-y-2 items-center justify-center  space-x-2 text-white text-sm py-2 flex-wrap">
      <div className="flex  items-center justify-center">
      <UilSun />
      Rise:<span className="font-medium ml-1">{sunrise}</span>
      
       </div>
      <p className="font-light sm:hidden">|</p>
      <div  className="flex  items-center justify-center">
      <UilSunset />
      Set:<span className="font-medium ml-1">{sunset}</span>
      </div>
      <p className="font-light sm:hidden ">|</p>
      <div  className="flex  items-center justify-center">
      <UilArrowUp />
      High: <span className="font-medium ml-1">{Math.round(data.main.temp_max)}°</span>
       
       </div>
       <p className="font-light sm:hidden">|</p>
       <div  className="flex  items-center justify-center">
       <UilArrowDown />
       
      Low: <span className="font-medium ml-1">{Math.round(data.main.temp_min)}°</span>
      </div>
      </div>
    </div>
  )
}

export default TemperatureandDetails
