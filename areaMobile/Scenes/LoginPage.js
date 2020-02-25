import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';

import bgImg from '../assets/bgimg.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import logo from '../assets/area_title.png'

import { postLogin } from '../api/Login.js';

const { width: WIDTH } = Dimensions.get('window')

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        mail: '',
        password: ''
    }
  }

  async _login(_mail, _pass) {
    let response = await postLogin(_mail, _pass);
    if (response.status == 200) {
      await AsyncStorage.setItem('token', response.data.token);
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Register');
    }
  }

  render() {
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
            placeholder={'UserName'}
            placeholderTextColor={'white'}
            underLineColorAndroid='tranparent'
            ref= {(el) => { this.username = el; }}
            onChangeText={(username) => this.setState({mail: username})}
            value={this.state.username}
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
            ref= {(el) => { this.pass = el; }}
            onChangeText={(pass) => this.setState({password: pass})}
            value={this.state.pass}
          />
          <TouchableOpacity style={styles.btnEye}>
            <Icon name={'ios-eye'} size={26} color={'rgba(255, 255, 255, 0.7)'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress= {() => { this._login(this.state.mail, this.state.password) }}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister} onPress= {() => this.props.navigation.navigate('Register')}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
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