import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

const axios = require("axios");

export default class Sport extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount () {
         axios({
            method: 'GET',
            url:"https://api-football-beta.p.rapidapi.com/leagues",
            headers:{
               "content-type":"application/octet-stream",
               "x-rapidapi-host":"api-football-beta.p.rapidapi.com",
               "x-rapidapi-key":"be8efd67acmsh34a9d536f06d340p19d480jsn56edaddd89f4"
            },
            params:{
                "id":"61"
            }
            })
            .then((response)=>{
               this.setState({
                    isLoading: false,
                    dataSource: response[0],
                 })
            })
            .catch((error) => {
              console.log(error)
            });
    }

    render () {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let name = this.state.dataSource.name;
            let type = this.state.dataSource.type;
        
            return (
                <View>
                    <Text>{name}  | test</Text>
                    <Text>{type} | ets</Text>
                </View>
            )
        }
    }
}
