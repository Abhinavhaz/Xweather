import axios from 'axios'
import { useState } from 'react';
import "../App.css"

function Weather(){
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);




    const handleSearch = async (e) => {
      e.preventDefault()
        try {
          setLoading(true);
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=ed57be5cc3c347bfa7955630240304&q=${location}`
          );
          setWeatherData(response.data);
          setLoading(false);
    
        

          
        } catch (error) {
          setLoading(false);
          setWeatherData("")

          setLocation("");

          alert("Error fetching weather data. Please try again.");

          console.log("Error fetching weather data. Please try again.",error);
        }
      };

    
return(
    <div className='App'>

<form onSubmit={handleSearch}>
<input value={location} placeholder='Enter a City Name' type='text' onChange={(e)=>setLocation(e.target.value)} />

<button  type='submit'>Search</button>



{loading && <p>Loading data…</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temperature</h4>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h4>Condition</h4>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}



</form>
    </div>
)
}
export default Weather