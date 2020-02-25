import React, {Component} from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class ServicesStock extends Component
{
    render() {
        return (
            <View style={styles.serviceCard}>
                <Avatar
                    size="small"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle={{flex: 1, marginLeft: 8, marginTop: 50, height: 10}}
                />
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    serviceCard: {
        flex: 1,
        height: 10,
        alignItems: "stretch",
    }
})