/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Navigator} from 'react-native-deprecated-custom-components'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';
import Net from './learn/Net';
import MyListView from './learn/MyListView';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={language:null};
  }
  render() {
    let rootViewName='MyListView';
    let rootComponent=MyListView;
    return (
      <Navigator
       initialRoute={{name:rootViewName,component:rootComponent}}
       configureScene = {(route) => {
           return Navigator.SceneConfigs.HorizontalSwipeJump ;
       }}
       renderScene = {(route, navigator) => {
           let Component = route.component;
           return <Component {...route.params} navigator = {navigator} />
       }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
