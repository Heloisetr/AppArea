import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {getWeather} from '../api/GetWeather';

export default class Weather extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    async setWeatherData(name)
    {
        let res = await getWeather(name);
        return (res.data)
    } 

    async componentDidMount() {
        let response = await this.setWeatherData('Bordeaux');
        this.setState({
            dataSource: response,
            isLoading: false,
        })
        console.log(this.state.dataSource);
        return 0
    }

    kToCelsius(temp)
    {
      return (Math.round(temp - 273.15))
    }


    mToKm(speed)
    {
        return (Math.round(parseInt(speed) * 3.6));
    }
    
    unixToHour(unix)
    {
      var date = new Date(unix * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var formattedTime = hours + ':' + minutes.substr(-2);
      
      return (formattedTime);
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.Weather}>
                    <Text>Loading</Text>            
                </View>
            )
        } else {
            let mainTemp = this.kToCelsius(this.state.dataSource.main.temp);
            let tempMin = this.kToCelsius(this.state.dataSource.main.temp_min);
            let tempMax = this.kToCelsius(this.state.dataSource.main.temp_max);
            let feelsLike = this.kToCelsius(this.state.dataSource.main.feels_like);
            let humidity = this.state.dataSource.main.humidity;
            let wind = this.mToKm(this.state.dataSource.wind.speed);
            let sunrise = this.unixToHour(this.state.dataSource.sys.sunrise);
            let sunset = this.unixToHour(this.state.dataSource.sys.sunset);
            let weather = this.state.dataSource.weather[0].main;
           
            return (
                <View style={styles.Weather}>
                    <Text>{mainTemp}°C</Text>
                    <Text>{tempMin}°C</Text>
                    <Text>{tempMax}°C</Text>
                    <Text>{feelsLike}°C</Text>
                    <Text>{humidity} % of humidity</Text>
                    <Text>{wind} % of humidity</Text>
                    <Text>{sunrise}</Text>
                    <Text>{sunset}</Text>
                    <Text>{weather}</Text>
                </View>
            )
        }
         
    }
}
    

const styles = StyleSheet.create({
    Weather: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});