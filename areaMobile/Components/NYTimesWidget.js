import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Linking} from 'react-native';
import {Card} from 'react-native-elements';
import { getMostPopularNYTEmailed, getMostPopularNYTViewed, getTopStoriesNYT, getSearchNYT, getBookNYT } from '../api/GetNYTimes';

import {deleteWidget} from '../api/DelWidget';

export default class NYTimes extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            service: 'new_york_times',
        }
    }

    async deleteWidget(widget_name) {
        console.log (widget_name);
        let response = await deleteWidget(this.state.service, widget_name);
        return (response);
    }

    async setMostPopularNYTEmailed(date)
    {
        let res = await getMostPopularNYTEmailed(date);
      //  console.log(res.data.results[0]);
        return (res.data.results[0])
    }

    async setMostPopularNYTViewed(date)
    {
        let res = await getMostPopularNYTViewed(date);
        //console.log(res.data.results[0]);
        return (res.data.results[0])
    }

    async setTopStoriesNYT(article)
    {
        let res = await getTopStoriesNYT(article);
        //console.log(res);
        return (res.data.results[0])
    }

    async setSearchNYT(article)
    {
        let res = await getSearchNYT(article);
        
        return (res.data.response.docs[0])
    }

    async setBookNYT(author)
    {
        let res = await getBookNYT(author);
        
        return (res.data.results[0])
    }

    async componentDidMount() {
        if (this.props.name == 'MostPopularEmailed')
        {
            let response = await this.setMostPopularNYTEmailed(this.props.search);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'MostPopularViewed')
        {
            let response = await this.setMostPopularNYTViewed(this.props.search);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'TopStories')
        {
            let response = await this.setTopStoriesNYT(this.props.search);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'Search')
        {
            let response = await this.setSearchNYT(this.props.search);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'Book')
        {
            let response = await this.setBookNYT(this.props.search);
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.search)}>
                        <Text>Loading</Text>
                    </TouchableHighlight>
                </View>
            )
        } else {
            if (this.props.name == 'MostPopularEmailed')
            {
                let title = this.state.dataSource.title;
                let published_date = this.state.dataSource.published_date;
                let url = this.state.dataSource.url;
                
                return (
                    <View style={styles.NYTimes}>
                        <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.search)}>
                            <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                                title="Most Popular Emailed"
                                titleStyle={{color: 'rgb(255, 255, 255)'}}>
                                <Text style={styles.Content}>From {this.props.search} days{'\n'}</Text>
                                <Text style={styles.Content}>{title}</Text>
                                <Text style={styles.Content}>{published_date}</Text>
                                <Text style={styles.Content}>{url}</Text>
                            </Card>
                        </TouchableHighlight>
                    </View>
                )
            }
            else if (this.props.name == 'MostPopularViewed')
            {
                let title = this.state.dataSource.title;
                let published_date = this.state.dataSource.published_date;
                let url = this.state.dataSource.url;
                
                return (
                    <View style={styles.NYTimes}>
                        <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.search)}>
                            <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                                title="Most Popular Viewed"
                                titleStyle={{color: 'rgb(255, 255, 255)'}}>
                                <Text style={styles.Content}>From {this.props.search} days{'\n'}</Text>
                                <Text style={styles.Content}>{title}</Text>
                                <Text style={styles.Content}>{published_date}</Text>
                                <Text style={styles.Content}>{url}</Text>
                            </Card>
                        </TouchableHighlight>
                    </View>
                )
            }
            else if (this.props.name == 'TopStories')
            {
                let title = this.state.dataSource.title;
                let published_date = this.state.dataSource.published_date;
                let url = this.state.dataSource.url;
                
                return (
                    <View style={styles.NYTimes}>
                        <TouchableHighlight onPress={this.deleteWidget.bind(this, this.props.search)}>
                            <Card containerStyle={{backgroundColor: 'rgb(28, 28, 28)'}}
                                title="Top Stories"
                                titleStyle={{color: 'rgb(255, 255, 255)'}}>
                                <Text style={styles.Content}>{title}</Text>
                                <Text style={styles.Content}>{published_date}</Text>
                                <Text style={styles.Content}>{url}</Text>
                            </Card>
                        </TouchableHighlight>
                    </View>
                )
            }
            else if (this.props.name == 'Search')
            {
                let headline = this.state.dataSource.headline.main;
                let snippet = this.state.dataSource.snippet;
                let published_date = this.state.dataSource.pub_date;
                let url = this.state.dataSource.web_url;
                
                return (
                    <View style={styles.NYTimes}>
                        <Text style={styles.Content}>{headline}</Text>
                        <Text style={styles.Content}>{snippet}</Text>
                        <Text style={styles.Content}>{published_date}</Text>
                        <Text>{url}</Text>
                    </View>
                )
            }
            else if (this.props.name == 'Book')
            {
                let book_title = this.state.dataSource.book_title;
                let book_author = this.state.dataSource.book_author;
                let published_date = this.state.dataSource.publication_dt;
                let url = this.state.dataSource.url;
                
                return (
                    <View style={styles.NYTimes}>
                        <Text style={styles.Content}>{book_title}</Text>
                        <Text style={styles.Content}>{book_author}</Text>
                        <Text style={styles.Content}>{published_date}</Text>
                        <Text>{url}</Text>
                    </View>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    NYTimes: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Content : {
      color: 'rgb(255, 255, 255)',
      textAlign: "center",
    }
});