import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Card, Button } from 'react-native-elements';
import {getStock} from '../api/GetStock';
import { getWidgets } from '../api/GetWidget';
import {deleteWidget} from '../api/DelWidget';

export default class Stock extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            service: 'trading',
        }
    }

    async deleteWidget(widget_name) {
        let response = await deleteWidget(this.state.service, widget_name);

        return (response);
    }

    async setStockData(name)
    {
        let res = await getStock(name);
        return (res.data)
    } 

    async componentDidMount() {
        let response = await this.setStockData(this.props.name);
        this.setState({
            dataSource: response,
            isLoading: false,
        })
        //console.log(this.state.dataSource);
        return 0
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.Weather}>
                    <Text>Loading</Text>            
                </View>
            )
        } else {
            return (
                <View style={styles.Latest}>
                        <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.name)}>
                            <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                                title={this.props.name}
                                titleStyle={{color: 'rgb(255, 255, 255)'}}>
                                <Text style={{textAlign: "center"}}>You can delete this widget by clicking on it</Text>
                                <Text style={{textAlign: "center"}}>Or add another one by filling the enterprise name</Text>
                            </Card>
                        </TouchableHighlight>
                    </View>
            )
        }
         
    }
}
    

const styles = StyleSheet.create({
    Weather: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
    }
});