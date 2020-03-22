import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { FontAwesome5 } from '@expo/vector-icons';


export default class AllServices extends Component
{
  constructor(props) {
    super(props);
  }

  services = [
      {
        name: 'Meteo',
        scene: 'Meteo',
        info: 'You can add cities. Chech the weather, temperatures, wind or athmospheric pression.',
        logo: 'data:image/png;base64,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',
      },
      {
        name: 'Exchange',
        scene: 'Exchange',
        info: 'You can add cities. Chech the weather, temperatures, wind or athmospheric pression.',
        logo: 'data:image/png;base64,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',
      },
      {
        name: 'New York Times',
        scene: 'NYTimes',
        info: 'You can see or search New York Times articles. You can read a resume of the wanted article.',
        logo: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png',
      },
      {
        name: 'Corona Virus',
        scene: 'Corona',
        info: 'You can see or search New York Times articles. You can read a resume of the wanted article.',
        logo: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png',
      },
      {
        name: 'Bourse',
        scene: 'Bourse',
        info: 'You can see or search New York Times articles. You can read a resume of the wanted article.',
        logo: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png',
      }
    ]

    render() {
      return (
          <View style={{ flex: 1, backgroundColor: "#303030", alignItems: 'center' }}>
              <Text style={styles.Text}>All Services</Text>
              {this.services.map((service, index) => {
                  return (
                    <SwipeItem
                      style={styles.button}
                      swipeContainerStyle={styles.swipeContentContainerStyle}
                      leftButtons={
                        <SwipeButtonsContainer
                          style={{
                            alignSelf: 'center',
                            aspectRatio: 1,
                            flexDirection: 'column',
                            padding: 10,
                          }}
                        >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate(service.scene)}
                            >
                              <FontAwesome5 name="biohazard" size={40} color="#ffffff" />
                            </TouchableOpacity>
                        </SwipeButtonsContainer>
                      }
                      rightButtons={
                        <SwipeButtonsContainer
                          style={{
                            alignSelf: 'center',
                            aspectRatio: 1,
                            flexDirection: 'column',
                            padding: 10,
                          }}
                        >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('Notification')}
                            >
                              <FontAwesome5 name="bell"x size={40} color="#ffffff" />
                            </TouchableOpacity>
                        </SwipeButtonsContainer>
                      }
                      key={index}
                    >
                      <Text key={index}>{service.name}</Text>
                    </SwipeItem>
                  )
              })}
          </View>
      );
    }
}

const styles = StyleSheet.create({
    Text: {
      color: '#ffffff',
    },
    button: {
      width: '80%',
      height: 100,
      alignSelf: 'center',
      marginVertical: 5,
  },
  swipeContentContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderColor: '#e3e3e3',
      borderWidth: 1,
  }
});