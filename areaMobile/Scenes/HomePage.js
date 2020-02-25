import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../Components/WeatherWidget'
import NYTImes from '../Components/NYTimes';
import Exchange from '../Components/ExchangeWidget';
import Sport from '../Components/Sport';
import Services from '../Components/Services/Services';

export default class HomePage extends Component
{
    render()  {
        return (
            <View style={styles.HomePage}>
                <Text>Homepage</Text>
                    <NYTImes/>
                </View>
        )   
    }
}

const styles = StyleSheet.create({
    HomePage: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
    }
});