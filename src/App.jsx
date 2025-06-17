import axios from "axios";
import { Cloudy, Gauge, LocateFixed, Navigation, ThermometerSun, Wind } from "lucide-react";
import React, {  useEffect, useState } from "react";
import Loader from "./components/Loader";


const App = () => {
  const [location, setLocation] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [svg, setSvg] = useState('');

  const API_KEY = import.meta.env.VITE_API_KEY; // Ensure you have your API key set in .env file

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      if (!location) {
        setError("Please enter a location");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
        );
        const data = response.data;
        console.log(response.status);
        setError(null);
        if (response.status !== 200) {
          throw new Error("Failed to fetch weather data");
        }
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      }
    };
    fetchWeather();
    setLoading(false);
  }, [location]);

  const HandleLocation = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };
  const HandleLocation2 = () => {
    if (inputValue.trim() !== "") {
      setLocation(inputValue.trim());
      setInputValue("");
    } else {
      setError("Please enter a location");
    }
  };
  useEffect(() => {
    const getCloudEmoji = (clouds) => {
  if (clouds <= 10) { setSvg('🌤️'); return; }
  if (clouds <= 25) { setSvg('🌤️'); return; }
  if (clouds <= 50) { setSvg('⛅'); return; }
  if (clouds <= 75) { setSvg('🌥️'); return; }
  if (clouds < 100) { setSvg('☁️'); return; }
  setSvg('🌫️') ;
};
getCloudEmoji(weatherData?.current.cloud);}, [weatherData]);

  return (
    <div className="">
     <Loader/>
     
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-black">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-md p-4 flex gap-5 items-center px-6">
          <input
            type="text"
            placeholder="Enter city name"
            className="border border-gray-300 rounded-full p-2 focus:outline-none text-2xl px-4 pl-10  w-[35vw]"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={HandleLocation}
          />
          <div
            className="h-15 w-15  bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer"
            onClick={HandleLocation2}
          >
            <Navigation className="text-black  " />
          </div>
        </div>

        <div className="bg-neutral-900 backdrop-blur-md rounded-md p-3 mt-5 flex gap-5  h-[100vw] w-[45vw]">
          {loading ? (
            <div >loading...</div>
          ) : (
            <div className="flex flex-col  justify-center w-full h-full">
              {error ? (
                <div className="flex items-center justify-center">{error}</div>
              ) : (
                <div className="w-full  relative">
                  <div className="flex flex-col items-center gap-3 w-full ">
                    <p className="text-5xl">{svg}</p>
                    <p className="text-5xl doto">{weatherData?.current.temp_c}°C</p>
                    <p>{weatherData?.current.condition.text}</p>
                    <h1 className="text-5xl doto">{weatherData?.location.name}, {weatherData?.location.region}</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-15  h-1/2 place-items-center-safe">
                    <div className="flex flex-col items-center justify-center">
                      <Wind className="h-20 w-20 text-blue-400/40"/>
                    <p className="text-2xl mt-5 doto">Wind: {weatherData?.current.wind_kph} km/h</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <ThermometerSun className="h-20 w-20 text-blue-400/40"/>
                    <p className="text-2xl doto">Humidity: {weatherData?.current.humidity}%</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <Cloudy  className="h-20 w-20 text-blue-400/40"/>
                    <p className="text-2xl doto">Cloud Cover: {weatherData?.current.cloud}%</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <Gauge className="h-20 w-20 text-blue-400/40"/>
                    <p className="text-2xl doto">Pressure: {weatherData?.current.pressure_in}in</p>
                    </div>

                    
               
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    <h1 className="text-sm doto p-2 w-full flex items-center justify-center absolute bottom-0.5">Roundbex ©️ All rights reserved</h1>
    </div>
  );
};

export default App;
