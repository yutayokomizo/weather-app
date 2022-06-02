import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const[search, setSearch] = useState('')

  const [allData, setAllData] = useState({
    city: '',
    country: '',
    temperature: '',
    humidity: '',
    minTemperature: '',
    icon: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (city) => {
    try {
      const APIKEY = '39c716815a98341abb23fced39139b30'
      
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemperature: result.data.main.temp_min,
        icon: `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`,    
      })
    } catch (e) {
      console.log('API not loaded correctly or loaded for the first time')
    }
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }

  return (
    <main>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            value={search}
            type='text'
            name='city'
            placeholder='City Name'
            onChange={handleChange}
          />
          <button for='city'>Search</button>
        </form>

        <section>
          <div className='header-div'>
            <div>
              <div className='data'>
                <img alt='weather' src={allData.icon} />

                <h1 className='title'>{allData.city}</h1>
                <h2 className='location'>{allData.country}</h2>

                <div className='weather-description'>
                  <div>
                    <h3>TEMPERATURE</h3>
                    <p>{allData.temperature}°C</p>
                  </div>
                  
                  <div>
                    <h3>MIN TEMPERATURE</h3>
                    <p>{allData.minTemperature}°C</p>
                  </div>

                  <div>
                    <h3>HUMIDITY</h3>
                    <p>{allData.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    </main>

  );
}

export default App;
