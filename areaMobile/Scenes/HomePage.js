import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../Components/Weather'
import NYTImes from '../Components/NYTimes';
import Exchange from '../Components/Exchange';
import Sport from '../Components/Sport';

export default class HomePage extends Component
{
    render()  {
        return (
            <View style={styles.HomePage}>
                <Text>Homepage</Text>
                <Sport />
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