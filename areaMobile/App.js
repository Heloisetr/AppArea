import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import LoginPage from './Scenes/LoginPage';
import AuthPage from './Scenes/AuthPage';
import HomePage from './Scenes/HomePage';

import { HomeScreen, ProfileScreen, CredScreen } from './Components/Screens';

const NavStackNavigator = createBottomTabNavigator (
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />
      }
    },
    Credits: {
      screen: CredScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: true
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