import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Card } from 'react-native-elements';
import { getLatestExchange, getDayExchange, getCompareExchange } from '../api/GetExchange';
import {deleteWidget} from '../api/DelWidget';

//https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,CAD

export default class Exchange extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            service: 'currency',
        }
    }

    async deleteWidget(widget_name) {
        let response = await deleteWidget(this.state.service, widget_name);
        return (response);
    }

    async setLatestExchangeData(base)
    {
        let res = await getLatestExchange(base);
        console.log(res.data);
        return (res.data)
    }
    
    async setDayExchange(base, day)
    {
        let res = await getDayExchange(base, day);
        return (res.data)
    }

    async setCompareExchange(base, baseCmp)
    {
        let res = await getCompareExchange(base, baseCmp);
        return (res.data)
    }

    async componentDidMount() {
        
        if (this.props.name == 'latest')
        {
            let response = await this.setLatestExchangeData('USD');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
          
            return 0
        }
        else if (this.props.name == 'day')
        {
            let response = await this.setDayExchange('USD', this.props.date);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'usercurrencies' || this.props.name == 'compare')
        {
            let response = await this.setCompareExchange(this.props.base, this.props.comp);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            //console.log(this.state.dataSource);
            return 0
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            if (this.props.name == 'latest')
            {
                let exchangeEuro = this.state.dataSource.rates.EUR;
                let exchangeYuan = this.state.dataSource.rates.CNY;
                let exchangeYen = this.state.dataSource.rates.JPY;

                return (
                    <View style={styles.Latest}>
                        <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.name)}>
                            <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                                title="Latest Currency Exchange"
                                titleStyle={{color: 'rgb(255, 255, 255)'}}>
                                <Text>1 dollar est tant {exchangeEuro} en euro</Text>
                                <Text>1 dollar est tant {exchangeYuan} en yuan</Text>
                                <Text>1 dollar est tant {exchangeYen} en yen</Text>
                            </Card>
                        </TouchableHighlight>
                    </View>
                )
            }
            else if (this.props.name == 'day')
            {
                let exchangeEuro = this.state.dataSource.rates.EUR;
                let exchangeYuan = this.state.dataSource.rates.CNY;
                let exchangeYen = this.state.dataSource.rates.JPY;
               
                return (
                    <View style={styles.Latest}>
                        <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.name)}>
                            <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                                title="Currency Exchange that Day"
                                titleStyle={{color: 'rgb(255, 255, 255)'}}>
                                <Text>1 dollar est tant {exchangeEuro} en euro</Text>
                                <Text>1 dollar est tant {exchangeYuan} en yuan</Text>
                                <Text>1 dollar est tant {exchangeYen} en yen</Text>
                            </Card>
                        </TouchableHighlight>
                    </View>
                )
            }
            else if (this.props.name == 'usercurrencies' || this.props.name == 'compare')
            {
                //TODO :change EUR by baseCmp when the management of the currency is ok
                
                let exchange = this.state.dataSource.rates.EUR;
                for (let [key, value] of Object.entries(this.state.dataSource.rates)) {
                    if (key == this.props.comp) {
                        exchange = value;
                    }
                }

               return (
                <View style={styles.Compare}>
                    <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.name)}>
                        <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                            title="Currency Exchange"
                            titleStyle={{color: 'rgb(255, 255, 255)'}}>
                            <Text style={{color: '#ffffff', textAlign: "center"}}>1 USD{"\n"}{exchange} {this.props.comp}</Text>
                        </Card>
                    </TouchableHighlight>
                </View>
            )
            }
            
        }
    }
}

const styles = StyleSheet.create({
    Latest: {
        flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Day: {
        flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Compare: {
        flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    }
})