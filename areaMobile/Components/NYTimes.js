import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { getMostPopularNYTEmailed, getMostPopularNYTViewed, getTopStoriesNYT, getSearchNYT, getBookNYT } from '../api/GetNYTimes';

export default class NYTimes extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
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
        console.log(res.data.results[0]);
        return (res.data.results[0])
    }

    async setTopStoriesNYT(article)
    {
        let res = await getTopStoriesNYT(article);
        console.log(res);
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
            let response = await this.setMostPopularNYTEmailed('1');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'MostPopularViewed')
        {
            let response = await this.setMostPopularNYTViewed('1');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'TopStories')
        {
            let response = await this.setTopStoriesNYT('world');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'Search')
        {
            let response = await this.setSearchNYT('Coronavirus');
            this.setState({
                dataSource: response,
                isLoading: false,
            })
            return 0
        }
        else if (this.props.name == 'Book')
        {
            let response = await this.setBookNYT('Stephen+King');
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
                    <Text>Loading</Text>
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
                        <Text>{title}</Text>
                        <Text>{published_date}</Text>
                        <Text>{url}</Text>
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
                        <Text>{title}</Text>
                        <Text>{published_date}</Text>
                        <Text>{url}</Text>
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
                        <Text>{title}</Text>
                        <Text>{published_date}</Text>
                        <Text>{url}</Text>
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
                        <Text>{headline}</Text>
                        <Text>{snippet}</Text>
                        <Text>{published_date}</Text>
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
                        <Text>{book_title}</Text>
                        <Text>{book_author}</Text>
                        <Text>{published_date}</Text>
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
    }
});