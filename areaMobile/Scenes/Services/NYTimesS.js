import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HomePage extends Component
{
    render()  {
        return (
            <View style={styles.HomePage}>
                <Text>NYTIMES SCENE</Text>
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