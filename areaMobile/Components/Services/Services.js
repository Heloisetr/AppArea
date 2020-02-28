import React, {Component} from 'react';
import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SwipeButtonsContainer } from 'react-native-swipe-item';
import { Avatar } from 'react-native-elements';

export default class ServiceBtn extends Component
{
    render() {
        return (
            <SwipeButtonsContainer
              style={{
                alignSelf: 'center',
                aspectRatio: 1,
                flexDirection: 'column',
                padding: 10,
              }}
            >
                <TouchableOpacity
                  onPress={() => console.log('left button clicked ' + this.props.name)}
                >
                  <Text>Click Me</Text>
                </TouchableOpacity>
            </SwipeButtonsContainer>
        )
    }
}

const styles = StyleSheet.create({
    serviceCard: {
        flex: 1,
        height: 10,
        alignItems: "stretch",
    }
})