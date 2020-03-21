import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions, Picker } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { getWidgets } from '../../api/GetWidget';
import { getNotification } from '../../api/GetNotification';
import { postWidget } from '../../api/PostWidget';
import Corona from '../../Components/CoronaWidget';

const { width: WIDTH } = Dimensions.get('window')

export default class CoronaS extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            service: 'coronavirus',
            widgets: [],
            widget_nbr: 0,
            dataSource: {data:{"country_name": "China",
            "cases": "80,652",
            "deaths": "3,070",
            "region": "5,489",
            "total_recovered": "55,521",
            "new_deaths": "28",
            "new_cases": "100",
            "serious_critical": "22,061"}},
            isLoading: true,
            notifications: [''],
            newcountry: 'France',
            new_value: '',
            refresh: 1
        }
    }

    async addWidget() {
        let response = await postWidget(this.state.service, this.state.newstock, '', this.state.new_value, 'greater');
        this.forceRefresh();
        return (response);
    }

    async forceRefresh () {
        this.setState({
            refresh: this.state.refresh + 1,
            isLoading: true,
            newstock: 'France',
        })
        let response = await this.getUserWidgets();
        if (response === undefined) {
            this.setState({
                isLoading: false,
            })
        } else {
            this.setState({
                dataSource: response,
                isLoading: false,
            })
        }
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
        let result = await getNotification();
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
                        {this.state.widgets.map((widget, index) => {
                            return (
                                <Corona name={widget.name} key={index}/>
                            )
                        })}
                        {this.state.notifications.map((notif, index) => {
                            if ((notif.match(/protéger/g) || []).length > 0) {
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
                                  placeholder={'Country'}
                                  placeholderTextColor={'white'}
                                  underLineColorAndroid='tranparent'
                                  ref= {(el) => { this.stock = el; }}
                                    onChangeText={(stock) => this.setState({newstock: stock})}
                                    value={this.state.newstock}
                                />
                                <TextInput
                                  style={styles.input}
                                  placeholder={'Rate check'}
                                  placeholderTextColor={'white'}
                                  underLineColorAndroid='tranparent'
                                  ref= {(el) => { this.rate = el; }}
                                    onChangeText={(rate) => this.setState({new_value: rate})}
                                    value={this.state.new_value}
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