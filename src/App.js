import React, { Component } from 'react'

import config from './config' // config file that contains API Key
import Form from './components/Form'
import Titles from './components/Titles'
import Weather from './components/Weather'

// API call requires an Key that can be obtained for free from https://openweathermap.org/
const API_KEY = config.apiKey

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&id=524901&APPID=${API_KEY}`)
    const data = await api_call.json()
    const convertKelvinToFahrenheit = kelvin => Number(kelvin) * 9/5 - 459.67
    if (city && country) {
      this.setState({
        temperature: convertKelvinToFahrenheit(data.main.temp).toFixed(2),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: undefined
      }) 
    } else {
      this.setState({ 
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter city and country."
      }) 
    }
  }

  render () {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App
