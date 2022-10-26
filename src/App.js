import React,{useState} from "react";
import axios from "axios";

function App() {
  const [data,setData] = useState({});
  const [location,setLocation] = useState('');
  const [searchbar,setSearchbar] = useState(false);
  const [notCity,setNotCity] = useState(false);
  
  const searchLocation = (e) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1fedb6528e2740715fedeadbca9f7405&units=metric`

    if(e.key === 'Enter'){
      setNotCity(false);
      setSearchbar(true);
      axios.get(url).then((res)=>{
        setData(res.data);
        console.log(res.data);
      }).catch(err=>{
        setNotCity(true);
        setSearchbar(false);
      })
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={e=>setLocation(e.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type='text'
        />
      </div>
      
      <div className="container">
      {notCity&&<h1>Not a registered city please try some other city</h1>}
        {searchbar&&<div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main?<h1>{data.main.temp}°C</h1>:null}
          </div>
          <div className="description">
            {data.weather?<p>{data.weather[0].main}</p>:null}
          </div>
        </div>}
        {searchbar&&<div className={searchbar?'bottom':'none'}>
          <div className="feels">
            {data.main?<p className="bold">{data.main.feels_like}°C</p>:null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main?<p className="bold">{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind?<p className="bold">{data.wind.speed}Kmph</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>}   
      </div>
    </div>
  );
}

export default App;
