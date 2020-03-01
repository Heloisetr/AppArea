import React, {Component} from 'react';
import { StyleSheet, Text, View, Picker, TextInput, TouchableHighlight, Dimensions } from 'react-native';
import { getWidgets } from '../../api/GetWidget';
import { postWidget } from '../../api/PostWidget';
import { FontAwesome5 } from '@expo/vector-icons';
import NYTimes from '../../Components/NYTimesWidget';


const { width: WIDTH } = Dimensions.get('window')

export default class NYTimesS extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            service: 'new_york_times',
            widgets: [],
            widget_nbr: 0,
            dataSource: null,
            isLoading: true,
            new_type: 'MostPopularEmailed',
            new_search: '',
            refresh: 1
        }
    }

    async addWidget() {
        let response = await postWidget(this.state.service, this.state.new_search, {type: this.state.new_type});
        this.forceRefresh();
        return (response);
    }

    async forceRefresh() {
        this.setState({
            refresh: this.state.refresh + 1,
            isLoading: true,
        })
        let response = await this.getUserWidgets();
        this.setState({
            dataSource: response,
            isLoading: false,
        })
        return response;
    }

    async getUserWidgets() {
        let response = await getWidgets(this.state.service);

        if (response !== undefined) {
            this.setState({
                widgets: response.data,
            })
            //console.log(response.data);
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
        let Adding = <Picker
                        style={{width: 200}}
                        selectedValue={this.state.new_search}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({new_search: itemValue})
                        }>
                        <Picker.Item label="Day" value="1" />
                        <Picker.Item label="Week" value="7" />
                        <Picker.Item label="Month" value="30" />
                    </Picker>
        if (this.state.new_type == "TopStories") {
            Adding = <Picker
                        style={{width: 200}}
                        selectedValue={this.state.new_search}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({new_search: itemValue})
                        }>
                        <Picker.Item label="World" value="world" />
                        <Picker.Item label="Business" value="business" />
                        <Picker.Item label="Food" value="food" />
                    </Picker>
        } else if (this.state.new_type == "Book") {
            Adding = <TextInput
                      style={styles.input}
                      placeholder={'Author Name (Stephen+King)'}
                      placeholderTextColor={'white'}
                      underLineColorAndroid='tranparent'
                      ref= {(el) => { this.curr = el; }}
                        onChangeText={(curr) => this.setState({new_search: curr})}
                        value={this.state.new_search}
                    />
        } else if (this.state.new_type == "Search") {
            Adding = <TextInput
                      style={styles.input}
                      placeholder={'Your Research'}
                      placeholderTextColor={'white'}
                      underLineColorAndroid='tranparent'
                      ref= {(el) => { this.curr = el; }}
                        onChangeText={(curr) => this.setState({new_search: curr})}
                        value={this.state.new_search}
                    />
        }else {
            Adding = <Picker
                        style={{width: 200}}
                        selectedValue={this.state.new_search}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({new_search: itemValue})
                        }>
                        <Picker.Item label="Day" value="1" />
                        <Picker.Item label="Week" value="7" />
                        <Picker.Item label="Month" value="30" />
                    </Picker>
        }
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
                        {this.state.widgets.map((widget, index) => {
                            return (
                                <View style={{width: WIDTH - 55, flex: 1}} key={index}>
                                    <NYTimes name={widget.params.description.type} search={widget.name} key={index} />
                                </View>
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
                                    <Picker.Item label="Most Popular Email" value="MostPopularEmailed" />
                                    <Picker.Item label="Most Popular View" value="MostPopularViewed" />
                                    <Picker.Item label="Top Stories" value="TopStories" />
                                    <Picker.Item label="Search" value="Search" />
                                    <Picker.Item label="Book" value="Book" />
                                </Picker>
                            </View>
                            <View>
                                {Adding}
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
        //justifyContent: 'center',
        backgroundColor: "#303030",
        height: 45
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