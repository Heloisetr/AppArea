import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../Components/Weather'
import NYTImes from '../Components/NYTimes';

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
      justifyContent: 'center',
    }
});