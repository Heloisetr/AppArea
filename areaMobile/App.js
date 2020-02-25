import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import LoginPage from './Scenes/LoginPage';
import AuthPage from './Scenes/AuthPage';
import HomePage from './Scenes/HomePage';

import { HomeScreen, ProfileScreen, FAQScreen, ServicesScreen } from './Components/Screens';

const NavStackNavigator = createBottomTabNavigator (
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="tachometer-alt" size={24} color="#CDCCCE" />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="user-alt" size={24} color="#CDCCCE" />
      }
    },
    Services: {
      screen: ServicesScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="server" size={24} color="#CDCCCE" />
      }
    },
    FAQ: {
      screen: FAQScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="question-circle" size={24} color="#CDCCCE" />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#00beb5',
      inactiveTintColor: '#ffffff',
      style: {
        backgroundColor: '#1c1c1c',
      },
    }
  }
);

const AppStackNavigator = createStackNavigator (
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        headerShown: false
      }
    },
    Register: {
      screen: AuthPage,
      navigationOptions: {
        headerShown: false
      }
    },
    NavStackNavigator: {
      screen: NavStackNavigator,
      navigationOptions: {
        headerShown: false
      }
    }
  }
);

const App =  createAppContainer(AppStackNavigator);

export default App;