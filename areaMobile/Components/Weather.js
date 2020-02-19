import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Weather extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount () {

        return fetch('https://api.openweathermap.org/data/2.5/find?q=Bordeaux&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388')
            .then ((response) => response.json())
            .then ((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.list[0],
                })
            })
            .catch((error) => {
                console.log(error)
            });

    }

    render() {

        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let temp = this.state.dataSource.main.temp;
            let humidity = this.state.dataSource.main.humidity;

        return (
            <View style={styles.Weather}>
                <Text>{temp} °C</Text>
                <Text>{humidity} % of humidity</Text>
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