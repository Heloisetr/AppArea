import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';

export default class HomePage extends Component
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
            /*let movies = this.state.dataSource.map((val, key) => {
                return (
                    <View key={key}>
                        <Text>{val.main.temp}</Text>
                    </View>
                )
            })*/

        return (
            <View>
                <Text>Homepage</Text>
                <Text>{temp}</Text>
                <Text>{humidity}</Text>
            </View>
        )
    }
    }
}

