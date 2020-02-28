import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Card, Button } from 'react-native-elements';
import {getWeather} from '../api/GetWeather';
import { getWidgets } from '../api/GetWidget';
import {deleteWidget} from '../api/DelWidget';

export default class Weather extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            service: 'meteo',
        }
    }

    async deleteWidget(widget_name) {
        let response = await deleteWidget(this.state.service, widget_name);

        return (response);
    }

    async setWeatherData(name)
    {
        let res = await getWeather(name);
        return (res.data)
    } 

    async componentDidMount() {
        let response = await this.setWeatherData(this.props.name);
        this.setState({
            dataSource: response,
            isLoading: false,
        })
        //console.log(this.state.dataSource);
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
                    <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.name)}>
                        <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                            title={this.props.name}
                            titleStyle={{color: 'rgb(255, 255, 255)'}}>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>{weather}</Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>{mainTemp}°C{"\n"}</Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>Min  Feels  Max </Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>{tempMin}°C  {feelsLike}°C  {tempMax}°C{"\n"}</Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>Humidity {humidity}%</Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>Wind {wind}km/h{"\n"}</Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>Sunrise{"\n"}{sunrise}{"\n"}</Text>
                            <Text style={{textAlign: "center", color: 'rgb(255, 255, 255)'}}>Sunset{"\n"}{sunset}</Text>
                        </Card>
                    </TouchableHighlight>
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
      color: '#ffffff',
    }
});