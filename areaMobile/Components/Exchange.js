import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Exchange extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount() {
        return fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,CAD')
        .then ((response) => response.json())
        .then ((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson,
            })
        })
        .catch((erro) => {
            console.log(error)
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let euro = this.state.dataSource.rates.EUR;
            let cad = this.state.dataSource.rates.CAD;

            return (
                <View style={StyleSheet.Exchange}>
                    <Text>1 dollar est tant {euro} en euro</Text>
            <Text>1 dollar est tant {cad} en canadien</Text>
                </View>
            )
        }
    }
}