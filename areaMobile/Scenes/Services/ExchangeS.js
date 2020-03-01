import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions, Picker } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import {getWidgets} from '../../api/GetWidget';
import {deleteWidget} from '../../api/DelWidget';
import { postWidget } from '../../api/PostWidget';
import Exchange from '../../Components/ExchangeWidget';

const { width: WIDTH } = Dimensions.get('window')

export default class ExchangeS extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            service: 'currency',
            widgets: [],
            widget_nbr: 0,
            dataSource: null,
            isLoading: true,
            refresh: 1,
            new_type: 'Latest',
            new_date: '2010-01-12',
            new_curr: 'EUR',
            new_type_cpy: '',
            new_date_cpy: '',
            new_curr_cpy: ''
        }
    }

    ex_test = [
        {
          type: 'usercurrencies',
          base: 'USD',
          comp: 'EUR',
        },
        {
          type: 'usercurrencies',
          base: 'USD',
          comp: 'JPY',
        }
    ]

    async addWidget() {
        let response = await postWidget(this.state.service, this.state.new_type, {base: "USD", wanted: this.state.new_curr});
        this.forceRefresh();
        return (response);
    }

    async forceRefresh () {
        this.setState({
            refresh: this.state.refresh + 1,
            isLoading: true,
            new_type: 'Latest',
            new_date: '2010-01-12',
            new_curr: 'EUR',
            new_type_cpy: '',
            new_date_cpy: '',
            new_curr_cpy: '',
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
        this.setState({
            dataSource: response,
            isLoading: false,
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
                                <Exchange name={widget.name} base={widget.params.description.base} comp={widget.params.description.wanted} key={index}/>
                            )
                        })}
                    </View>
                    <View style={styles.add}>
                        <View style={styles.inputcont}>
                            <View style={{alignItems: "center"}}>
                                <Picker
                                    style={{width: 200}}
                                    selectedValue={this.state.new_type}
                                    onValueChange={(itemValue, itemIndex) =>
                                      this.setState({new_type: itemValue})
                                    }>
                                    <Picker.Item label="Compare" value="compare" />
                                    <Picker.Item label="Latest" value="latest" />
                                    <Picker.Item label="Day" value="day" />
                                </Picker>
                            </View>
                            <View>
                                <TextInput
                                  style={styles.input}
                                  placeholder={'Date (format : yyyy-mm-dd)'}
                                  placeholderTextColor={'white'}
                                  underLineColorAndroid='tranparent'
                                  ref= {(el) => { this.date = el; }}
                                    onChangeText={(date) => this.setState({new_date: date, new_date_cpy: date})}
                                    value={this.state.new_date_cpy}
                                />
                            </View>
                            <View>
                                <TextInput
                                  style={styles.input}
                                  placeholder={'Currency (ex : EUR / CNY / JPY)'}
                                  placeholderTextColor={'white'}
                                  underLineColorAndroid='tranparent'
                                  ref= {(el) => { this.curr = el; }}
                                    onChangeText={(curr) => this.setState({new_curr: curr, new_curr_cpy: curr})}
                                    value={this.state.new_curr_cpy}
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