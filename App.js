/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Navigator}from 'react-native-deprecated-custom-components'
import StackNavigator from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity
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
     let type=1;
     if(type==1){
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
                 }}
             />
         );
     }else{

     }
  }
  _routerMap={
    LeftButton:(route,navigator,index,navState)=>{
      if(index>0){
          return(<TouchableOpacity onPress={()=>navigator.pop()}>
              <Text><Icon size={18} name='ios-arrow-back'></Icon>back</Text>
          </TouchableOpacity>);
      }
    },
    RightButton:(route,navigator,index,navState)=>{
      return null;
    },
    Title:(route,navigator,index,navState)=>{
      return(
          <Text>{navigator.title}</Text>
      );
    }
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
