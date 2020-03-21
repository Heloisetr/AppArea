import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions, Picker } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import {getWidgets} from '../../api/GetWidget';
import {deleteWidget} from '../../api/DelWidget';
import { postWidget } from '../../api/PostWidget';
import Stock from '../../Components/StockWidget';
import { getNotifications } from '../../api/GetNotification';

const { width: WIDTH } = Dimensions.get('window')

export default class StockS extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            service: 'trading',
            widgets: [],
            widget_nbr: 0,
            dataSource: null,
            isLoading: true,
            notifications: [''],
            newstock: 'MSFT',
            new_value: '',
            new_check: '',
            refresh: 1
        }
    }

    async addWidget() {
        let response = await postWidget(this.state.service, this.state.newstock, '', this.state.new_value, this.state.new_check);
        this.forceRefresh();
        return (response);
    }

    async forceRefresh () {
        this.setState({
            refresh: this.state.refresh + 1,
            isLoading: true,
            newstock: 'MSFT',
        })
        let response = await this.getUserWidgets();
        this.setState({
            dataSource: response,
            isLoading: false,
        })
    }

    async getUserWidgets() {
        let response = await getWidgets(this.state.service);
        //console.log(response.data);

        if (response !== undefined) {
            this.setState({
                widgets: response.data,
            })
        }
        return (response);
    }

    async componentDidMount() {
        let response = await this.getUserWidgets();
        let result = await getNotifications();
        this.setState({
            dataSource: response,
            isLoading: false,
            notifications: result,
        })
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
                    <View style={styles.container}>
                        {this.state.dataSource.data.map((widget, index) => {
                            return (
                                <Stock name={widget.name} key={index}/>
                            )
                        })}
                        {this.state.notifications.map((notif, index) => {
                            if ((notif.match(/Trading/g) || []).length > 0) {
                                return (
                                    <Text key={index}>{notif}</Text>
                                )
                            }
                        })}
                    </View>
                    <View style={styles.add}>
                        <View style={styles.inputcont}>
                            <View>
                                <TextInput
                                  style={styles.input}
                                  placeholder={'Enterprise'}
                                  placeholderTextColor={'white'}
                                  underLineColorAndroid='tranparent'
                                  ref= {(el) => { this.stock = el; }}
                                    onChangeText={(stock) => this.setState({newstock: stock})}
                                    value={this.state.newstock}
                                />
                                <TextInput
                                  style={styles.input}
                                  placeholder={'Stock check'}
                                  placeholderTextColor={'white'}
                                  underLineColorAndroid='tranparent'
                                  ref= {(el) => { this.price = el; }}
                                    onChangeText={(price) => this.setState({new_value: price})}
                                    value={this.state.new_value}
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
                        </View>
                        <View style={styles.btn}>
                            <TouchableHighlight onPress={this.addWidget.bind(this)}>
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
      backgroundColor: "#303030",
    },
    container: {
        flex: 4,
        alignItems: 'center',
        flexDirection: 'row',
    },
    add: {
        flex: 2,
        alignItems: 'center',
    },
    inputcont: {
        flex: 4
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        marginTop: 10
    },
    btn: {
        alignItems: "center",
        flex: 1,
        flexDirection: 'row'
    }
});