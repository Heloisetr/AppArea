import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Weather from '../../Components/WeatherWidget';

import { getWidgets } from '../../api/GetWidget';
import { getNotifications } from '../../api/GetNotification';
import { postWidget } from '../../api/PostWidget';

const { width: WIDTH } = Dimensions.get('window')

export default class WeatherS extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            service: 'meteo',
            widgets: [],
            widget_nbr: 0,
            dataSource: null,
            isLoading: true,
            notifications : [''],
            new_name: '',
            new_temp: '',
            new_check: '',
            refresh: 1,
            timeout: 30000,
        }
    }

    async forceRefresh () {
        this.setState({
            refresh: this.state.refresh + 1,
            isLoading: true,
            new_name: '',
            new_temp: '',
            new_check: ''
        })
        let response = await this.getUserWidgets();
        this.setState({
            dataSource: response,
            isLoading: false,
        })
        this.Timer();
        return response;
    }

    async addWidget() {
        let response = await postWidget(this.state.service, this.state.new_name, '', this.state.new_temp, this.state.new_check);
        this.forceRefresh();
        return (response);
    }

    async getUserWidgets() {
        let response = await getWidgets(this.state.service);

        if (response !== undefined) {
            this.setState({
                widgets: response.data,
            })
            //console.log(response);
        }
        return (response);
    }

    Timer() {
        const time = setTimeout(() => {
            this.forceRefresh();
        }, this.state.timeout);
    }

    async componentDidMount() {
        let response = await this.getUserWidgets();
        this.setState({
            dataSource: response,
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
                    <View style={styles.container} >
                        {this.state.widgets.map((widget, index) => {
                            return (
                                <Weather name={widget.name} key={index}/>
                            )
                        })}
                    </View>
                    <View style={styles.add}>
                        <View>
                            <TextInput
                              style={styles.input}
                              placeholder={'Ville'}
                              placeholderTextColor={'white'}
                              underLineColorAndroid='tranparent'
                              ref= {(el) => { this.name = el; }}
                                onChangeText={(name) => this.setState({new_name: name})}
                                value={this.state.new_name}
                            />
                            <TextInput
                              style={styles.input}
                              placeholder={'Temperature'}
                              placeholderTextColor={'white'}
                              underLineColorAndroid='tranparent'
                              ref= {(el) => { this.temp = el; }}
                                onChangeText={(temp) => this.setState({new_temp: temp})}
                                value={this.state.new_temp}
                            />
                            <TextInput
                              style={styles.input}
                              placeholder={'lower / greater'}
                              placeholderTextColor={'white'}
                              underLineColorAndroid='tranparent'
                              ref= {(el) => { this.check = el; }}
                                onChangeText={(check) => this.setState({new_check: check})}
                                value={this.state.new_check}
                            />
                        </View>
                        <View style={styles.btn}>
                            <TouchableHighlight onPress={this.addWidget.bind(this, this.props.new_name)}>
                                <FontAwesome5 name="plus-circle" size={24} color="#CDCCCE" />
                            </TouchableHighlight>
                        </View>
                    </View>
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