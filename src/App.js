import Search from './components/search';
import { useEffect, useState } from "react";
import './App.css';
import moment from 'moment'
import * as Unicons from '@iconscout/react-unicons';
import Timeandlocation from './components/Timeandlocation';
import TemperatureandDetails from './components/TemperatureandDetails';
import { WEATHER_API_KEY,WEATHER_API_URL } from './api';
import Forcast from './components/Forcast';

function App() {
   const [city,setCity]=useState({ value:"12.97194 77.59369" ,
   label:"Bangalore",});
   const [unit,setUnit]=useState("metric");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [changeDegree,setDegree]=useState("metric");
  const [locatime,setLocatime] = useState();
  const [Day,setDay] = useState();
  useEffect(()=>{
   
    const [lat, lon] = city.value.split(" ");
   
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        
        const timezone =weatherResponse.timezone;
        const timezoneInMinutes = timezone / 60;
        const currtime = moment().utcOffset(timezoneInMinutes).format("HH:mm");
        const sunrisetime = weatherResponse.sys.sunrise;
        const sunsettime = weatherResponse.sys.sunset;
       const  x = moment.utc(sunrisetime,'X').add(timezone,'seconds').format('HH:mm');
       const  y= moment.utc(sunsettime,'X').add(timezone,'seconds').format('HH:mm');
        if(currtime==sunsettime||currtime >y||currtime<x){
          setDay(0);
        }else{
          setDay(1);
        }

        setCurrentWeather({ city: city.label, ...weatherResponse });
        setForecast({ city: city.label, ...forcastResponse });
        setDegree(unit === "metric" ? "metric" : "imperial");
      })
      .catch(console.log);
  },[city,unit])
  
 console.log(Day)

 const formatBackground = () => {
  if (!Day) return "from-[#1D4ED8] to-[#070834]";
  return "from-[#19BDFF]   to-[#004764]  ";
};
  return (

      <div className={` flex flex-col items-center justify-center mx-auto max-w-max mt-4 py-5 px-32 sm:px-12 bg-gradient-to-br ${formatBackground()}  h-fit shadow-xl shadow-gray-700 lg:mx-4 lg:mb-4`}>
        
      <div className="flex flex-row  items-center justify-center w-1/2  md:w-full">
        <div className="flex-grow text-white  basis-1/2 self-start text-overflow-ellipsis whitespace-no-wrap w-1/2 " >
        <Search onSearchChange={setCity} Day={Day} />
</div>
        <div className=" flex flex-row flex-grow basis-1/2 items-center justify-center  w-1/2  md:w-full">
        <button
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          className="text-xl text-white  font-light border rounded-md px-5 py-1 transition hover:scale-105 "
        >
          {`°${unit === "metric" ? "C" : "F"}`}
        </button>
        </div>
        </div>
      {currentWeather && <Timeandlocation data={currentWeather}/>}
      {currentWeather && <TemperatureandDetails data={currentWeather} unit={changeDegree} />}
      {forecast && <Forcast data={forecast}/>}
     
      </div>
    
  );
}

export default App;

