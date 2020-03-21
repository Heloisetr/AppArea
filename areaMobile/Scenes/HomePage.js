import React, {Component} from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

import Corona from '../Components/CoronaWidget';

export default class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    render()  {
        return (
            <View style={styles.HomePage}>
                <View>
                    <Text>Homepage</Text>
                    <Corona name='China'/>
                </View>
            </View>
        )   
    }
}

const styles = StyleSheet.create({
    HomePage: {
      flex: 1,
      backgroundColor: "#303030",
      //flexDirection: 'row',
      //justifyContent: 'center',
    }
});