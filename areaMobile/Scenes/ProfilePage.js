import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCurrentUser } from '../api/GetCurrentUser';

export default class ProfilePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    async setProfileData() {
        let res = await getCurrentUser();
        return (res.data)
    } 

    async componentDidMount() {
        let response = await this.setProfileData();
        this.setState({
            dataSource: response,
            isLoading: false,
        })
        console.log(this.state.dataSource);
        return 0
    }

    render()  {
        //console.log(this.state.dataSource);
        if (this.state.isLoading)
        {
            return (
            <View>
                <Text>Loading</Text>
            </View>
            )
        } else {
            let username = this.state.dataSource.name;
            let email = this.state.dataSource.id;
            
            return (
                <View style={styles.HomePage}>
                    <Text>email : {email}</Text>
                </View>
            )   
        }
    }
}

const styles = StyleSheet.create({
    HomePage: {
      flex: 1,
      alignItems: 'center',
      //flexDirection: 'row',
      //justifyContent: 'center',
    },
    container: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
    }
});