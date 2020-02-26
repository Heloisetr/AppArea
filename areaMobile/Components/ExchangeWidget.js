import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { getLatestExchange, getDayExchange, getCompareExchange } from '../api/GetExchange';

//https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,CAD

export default class Exchange extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
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
        
        if (this.props.name == 'Latest')
        {
            let response = await this.setLatestExchangeData('USD');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
          
            return 0
        }
        else if (this.props.name == 'Day')
        {
            let response = await this.setDayExchange('USD', '2010-01-12');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'Compare')
        {
            let response = await this.setCompareExchange('USD', 'EUR');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            console.log(this.state.dataSource);
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
            if (this.props.name == 'Latest')
            {
                let exchangeEuro = this.state.dataSource.rates.EUR;
                let exchangeYuan = this.state.dataSource.rates.CNY;
                let exchangeYen = this.state.dataSource.rates.JPY;

                return (
                    <View style={styles.Latest}>
                        <Text>1 dollar est tant {exchangeEuro} en euro</Text>
                        <Text>1 dollar est tant {exchangeYuan} en yuan</Text>
                        <Text>1 dollar est tant {exchangeYen} en yen</Text>
                    </View>
                )
            }
            else if (this.props.name == 'Day')
            {
                let exchangeEuro = this.state.dataSource.rates.EUR;
                let exchangeYuan = this.state.dataSource.rates.CNY;
                let exchangeYen = this.state.dataSource.rates.JPY;
               
                return (
                    <View style={styles.Latest}>
                        <Text>1 dollar est tant {exchangeEuro} en euro</Text>
                        <Text>1 dollar est tant {exchangeYuan} en yuan</Text>
                        <Text>1 dollar est tant {exchangeYen} en yen</Text>
                    </View>
                )
            }
            else if (this.props.name == 'Compare')
            {
                //TODO :change EUR by baseCmp when the manageùment of the currency is ok
               let exchange = this.state.dataSource.rates.EUR;

               return (
                <View style={styles.Compare}>
                    <Text>1 dollar est tant {exchange} en euro</Text>
                </View>
            )
            }
            
        }
    }
}

const styles = StyleSheet.create({
    Latest: {
        flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Day: {
        flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Compare: {
        flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
})