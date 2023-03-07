//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

import axios from "axios";
import { useEffect, useState } from "react";
import { usePosition } from 'use-position';
import HavaDurumu from "./components/HavaDurumu";

function App() {
  const [weather, setWeather] = useState();
  const {latitude, longitude} = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang=navigator.language.split("-")[0];
    console.log({lang});
    const data = await (
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`
      ).then(response=>response.data).catch(err=>console.error(err))
    )
    setWeather(data);
  };

  useEffect(()=>{
    latitude && longitude && getWeatherData(latitude,longitude)
  },[latitude,longitude])


  return (
    <div className="App">
      <h2>Hava Durumu</h2>
      <HavaDurumu weather={weather}/>
    </div>
  );
}

export default App;
