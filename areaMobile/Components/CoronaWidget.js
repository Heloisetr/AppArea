import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Card, Button } from 'react-native-elements';
import {getStock} from '../api/GetStock';
import { getWidgets } from '../api/GetWidget';
import {deleteWidget} from '../api/DelWidget';
import { allCountriesCases } from '../api/coronaStat';


export default class Corona extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            service: 'coronavirus',
            case: '',
            death: '',
        }
    }

    async deleteWidget(widget_name) {
        let response = await deleteWidget(this.state.service, widget_name);

        return (response);
    }

    async setCoronaData(name)
    {
        allCountriesCases.countries_stat.map((country, index) => {
            if (country.country_name == name) {
                this.setState({
                    dataSource: country,
                })
            }
        })
    } 

    async componentDidMount() {
        await this.setCoronaData(this.props.name);
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
                                <Text style={{textAlign: "center"}}>Cases : {this.state.dataSource.cases}</Text>
                                <Text style={{textAlign: "center"}}>New Cases : {this.state.dataSource.new_cases}{"\n"}</Text>
                                <Text style={{textAlign: "center"}}>Deaths : {this.state.dataSource.deaths}</Text>
                                <Text style={{textAlign: "center"}}>New Deaths : {this.state.dataSource.new_deaths}</Text>
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