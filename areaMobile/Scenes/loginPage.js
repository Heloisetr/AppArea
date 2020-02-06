import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity} from 'react-native';


import bgImg from '../assets/bgimg.jpg'
import Icon from 'react-native-vector-icons/Ionicons'

const {width: WIDTH} = Dimensions.get('window')

export default function LoginPage() {
    return (
      <ImageBackground source={bgImg} style={styles.bgContainer}> 
      <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
              style={styles.inputIcon}/>
          <TextInput
            style={styles.input}
            placeholder={'UserName'}
            placeholderTextColor={'white'}
            underLineColorAndroid='tranparent'
          />
      </View>
      <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
              style={styles.inputIcon}/>
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'white'}
            underLineColorAndroid='tranparent'
          />
          <TouchableOpacity style={styles.btnEye}>
            <Icon name={'ios-eye'} size={26} color={'rgba(255, 255, 255, 0.7)'}
            />
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
  </ImageBackground>
      );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: WIDTH,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: "center",
    marginTop: 20
  }, 
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: "center"
  }
});