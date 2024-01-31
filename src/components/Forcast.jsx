import React, { useEffect,useState } from 'react'
import moment from 'moment'
function Forcast({data}) {
  const [Daily,setDaily]=useState([{
    dt_txt:"",
    main:{},
    weather:{},
  }]);
  const[daily,setdaily] =useState(); 
const [Date,setDate]=useState();
  useEffect(()=>{
    let prev=-1;
    const array=data.list;
    let x=[{}];

    for (let i = 0; i < array.length; i++) { 
   if(prev==-1) {
    prev=array[i].dt_txt;
  x.push({dt_txt:moment(data.list[i].dt_txt.split(' ')[0]).format('MMMM DD, YYYY'),main:data.list[i].main,weather:data.list[i].weather});
   }
  else if(data.list[i].dt_txt.split(' ')[0]!=prev.split(' ')[0]){
    prev=array[i].dt_txt;
    x.push({dt_txt:moment(data.list[i].dt_txt.split(' ')[0]).format('MMMM DD, YYYY'),main:data.list[i].main,weather:data.list[i].weather});
  }
  else {
   let temp_min=parseInt(x[x.length-1].main.temp_min,10);
   let temp_max=parseInt(x[x.length-1].main.temp_max,10)
   temp_max=Math.max(temp_max,parseInt(data.list[i].main.temp_max));
   temp_min=Math.min(temp_min,parseInt(data.list[i].main.temp_min));
   x[x.length-1].main.temp_min=parseInt(temp_min,10);
   x[x.length-1].main.temp_max=parseInt(temp_max,10);
  }
    }
    setDaily(x);
    
  },[data])
   console.log(Daily)
    console.log(daily);
   
  return (
    <div>
      <div className="flex flex-center justify-start my-6"></div>
      <div className="flex items-center justify-start my-4">
        <p className=" text-white font-medium uppercase">Daily Forecast</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-around gap-4  flex-wrap">
      {Daily.slice(1).map((item,idx)=>(
        <div  key={idx} className=" flex flex-col items-center justify-between text-white shrink">
        <div className="flex flex-col items-center justify-center">
           <p className="font-white text-sm flex-grow basis-1/4">
            {item.dt_txt}
       
           </p>
           <img src={`icons/${item.weather[0].icon}.png`} className="w-20 flex-grow basis-1/2" alt="weather" />
        <p className="font-medium flex-grow basis-1/4">{Math.round(item.main.temp_max)}°/{Math.round(item.main.temp_min)}°</p>
        </div>
        
       </div>
      ))}
        </div>
    </div>

  )
}

export default Forcast;
