import Search from './components/search';
import { useEffect, useState } from "react";
import './App.css';

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
  const [changeDegree,setDegree]=useState("metric")
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

        setCurrentWeather({ city: city.label, ...weatherResponse });
        setForecast({ city: city.label, ...forcastResponse });
        setDegree(unit === "metric" ? "metric" : "imperial");
      })
      .catch(console.log);
  },[city,unit])
 console.log(changeDegree);

  //  const handleOnsearchChange=(searchData)=>{
  //    setCity(searchData);
  //   const [lat, lon] = searchData.value.split(" ");
   
  //   const currentWeatherFetch = fetch(
  //     `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  //   );
  //   const forecastFetch = fetch(
  //     `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  //   );

  //   Promise.all([currentWeatherFetch, forecastFetch])
  //     .then(async (response) => {
  //       const weatherResponse = await response[0].json();
  //       const forcastResponse = await response[1].json();

  //       setCurrentWeather({ city: searchData.label, ...weatherResponse });
  //       setForecast({ city: searchData.label, ...forcastResponse });
  //     })
  //     .catch(console.log);

      
  //  }
  console.log(forecast);
  return (

      <div className=" flex flex-col items-center justify-center mx-auto max-w-max mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl 
      shadow-gray-700">
        
      <div className="flex flex-row  items-center justify-center w-1/2">
        <div className="flex-grow basis-1/2 self-start text-overflow-ellipsis whitespace-no-wrap w-1/2 " >
        <Search onSearchChange={setCity} />
</div>
        <div className=" flex flex-row flex-grow basis-1/2 items-center justify-center  w-1/2 ">
        <button
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          className="text-xl font-light border rounded-md px-5 py-1 transition hover:scale-105 "
        >
          {`°${unit === "metric" ? "C" : "F"}`}
        </button>
        </div>
        </div>
      {currentWeather && <Timeandlocation data={currentWeather}/>}
      {currentWeather && <TemperatureandDetails data={currentWeather} unit={changeDegree}/>}
      {forecast && <Forcast data={forecast}/>}
     
      </div>
    
  );
}

export default App;
