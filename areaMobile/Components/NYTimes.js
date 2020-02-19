import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class NYTImes extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount() {
        return fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=korea&api-key=Np6dBGDV09g8a82j0DVBR4gTFPqRC5HO')
        .then((response) => response.json())
        .then ((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson.response.docs,
            })
        })
        .catch((error) => {
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
            let article = this.state.dataSource.map((val, key) => {
                return (
                    <View key={key} style={styles.Item}>
                        <Text>{val.headline.main}</Text>
                    </View>
                )
            }) 
            return (
                <View style={styles.NYTimes}>
                    {article}
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    NYTimes: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1
    }
});