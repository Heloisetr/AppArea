import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions } from 'react-native';

import { getNotifications } from '../../api/GetNotification';

const { width: WIDTH } = Dimensions.get('window')

export default class Notification extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            isLoading: true,
            refresh: 0,
            timeout: 30000,
        }
    }

    Timer() {
        const time = setTimeout(() => {
            this.forceRefresh();
        }, this.state.timeout);
    }

    async forceRefresh () {
        this.setState({
            refresh: this.state.refresh + 1,
            isLoading: true,
        })
        let response = await getNotifications();
        this.setState({
            dataSource: response.data,
            isLoading: false,
        })
        this.Timer();
        return response;
    }

    async componentDidMount() {
        let response = await getNotifications();
        this.setState({
            dataSource: response.data,
            isLoading: false,
        })
        this.Timer();
        return 0
    }

    render()  {
        if (this.state.isLoading) {
            return (
                <View style={styles.HomePage}>
                    <Text>Loading</Text>            
                </View>
            )
        } else {
            return (
                <View style={styles.HomePage} key={this.state.refresh}>
                    {this.state.dataSource.map((notif, index) => {
                        return (
                            <Text key={index}>{notif}</Text>
                        )
                    })}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    HomePage: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#303030",
      height: 45
    },
    container: {
        flex: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    add: {
        flex: 2,
        alignItems: 'center',
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },
    btn: {
        position: 'relative',
        top: '20%'
    }
});