import React, {Component} from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
Dimensions } from 'react-native';
import { getCurrentUser } from '../api/GetCurrentUser';
import Icon from 'react-native-vector-icons/Ionicons'


const { width: WIDTH } = Dimensions.get('window')

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
                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                    <View style={styles.body}>
                        <Text style={styles.name}>{username}</Text>
                        <Text style={styles.info}>{email}</Text>
                        <View style={styles.inputContainer}>
                            <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
                                style={styles.inputIcon} />
                                <TextInput
                                style={styles.input}
                                placeholder={'New UserName'}
                                placeholderTextColor={'white'}
                                underLineColorAndroid='tranparent'
                                />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
                                style={styles.inputIcon} />
                                <TextInput
                                style={styles.input}
                                placeholder={'New Password'}
                                placeholderTextColor={'white'}
                                underLineColorAndroid='tranparent'
                                />
                        </View>
                        <TouchableOpacity style={styles.btnLogin}>
                            <Text style={styles.text}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              );
        }
    }
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#303030",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
      alignItems: 'center',
      padding:30,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10,
      marginBottom: 60
    },
  inputContainer: {
    marginTop: 30
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
  btnLogin: {
    width: WIDTH - 200,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#0a1b48',
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: "center"
  }
  });