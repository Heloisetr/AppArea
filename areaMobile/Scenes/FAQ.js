import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { FontAwesome5 } from '@expo/vector-icons';


export default class FAQ extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    }
  }

  services = [
      {
        name: 'Meteo',
        scene: 'Meteo',
        info: 'You can add cities. Check actual Weather, Temperatures, wind or Humidity.',
      },
      {
        name: 'Exchange',
        scene: 'Exchange',
        info: 'You can add a currency to compare to USD currency.',
      },
      {
        name: 'New York Times',
        scene: 'NYTimes',
        info: 'You can see or search New York Times articles. You can check the most Viewed and the most Emailed News.',
      },
      {
        name: 'Sport',
        scene: 'Sport',
        info: 'You can see or search New York Times articles. You can read a resume of the wanted article.',
      },
      {
        name: 'Bourse',
        scene: 'Bourse',
        info: 'You can see or search New York Times articles. You can read a resume of the wanted article.',
      }
    ]

    render() {
      return (
          <View style={{ flex: 1, backgroundColor: "#303030", alignItems: 'center' }}>
              <Text style={styles.Text}>FAQ</Text>
              {this.services.map((service, index) => {
                  return (
                    <View key={index}>
                      <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.visibility}
                        >
                        <View style={{ flex: 1, backgroundColor: "#303030", alignItems: 'center' }}>
                          <Text>{service.info}{'\n\n'}</Text>
                          <TouchableOpacity onPress={() => {
                            this.setState({
                              visibility: false,
                            })
                          }}>
                            <Text>Back</Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
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
                                onPress={() => this.setState({
                                  visibility: true,
                                })}
                              >
                                <FontAwesome5 name="biohazard" size={40} color="#ffffff" />
                              </TouchableOpacity>
                          </SwipeButtonsContainer>
                        }
                      >
                        <Text>{service.name}</Text>
                      </SwipeItem>
                    </View>
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