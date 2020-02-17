import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';


export default class HomePage extends Component
{
    render() {
        const data = {
            labels: ["Swim", "Bike", "Run"],
            data: [0.4, 0.6, 0.8]
        };
        /*const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5
          };*/
        return (
            <View>
                <Text>Homepage</Text>
            </View>
        )
    }
}

