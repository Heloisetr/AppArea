import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';


import bgImg from '../assets/bgimg.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import logo from '../assets/area_title.png'

const { width: WIDTH } = Dimensions.get('window')

export default function AuthPage() {
  return (
    <ImageBackground source={bgImg} style={styles.bgContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
          style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          placeholderTextColor={'white'}
          underLineColorAndroid='tranparent'
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
          style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          placeholderTextColor={'white'}
          underLineColorAndroid='tranparent'
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
          style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={'Confirm your Password'}
          placeholderTextColor={'white'}
          underLineColorAndroid='tranparent'
        />
      </View>
      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.text}>Sign Up</Text>
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
  logo: {
    marginBottom: 90
  },
  inputContainer: {
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
    backgroundColor: '#0a1b48',
    justifyContent: "center",
    marginTop: 20
  },
  btnRegister: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFB100',
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: "center"
  }
});