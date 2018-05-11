/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Navigator}from 'react-native-deprecated-custom-components'
import {StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View
} from 'react-native';
import Net from './learn/Net';
import MyListView from './learn/MyListView';
import Second from './learn/Second';
import Detail from './learn/Detail';
import Main from './learn/Main';
import MyListViewNav from './learn/MyListViewNav';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


const Nav=StackNavigator({
    MyListView:{screen:MyListView},
    Detail:{screen:Detail},
    Second:{screen:Second}
},{
    navigationOptions:{
        headerBackTitle:null,
        headerTintColor:'#333333',
        title:'MyListView',
        style:{
            flex:1,
            alignItems:'center',
            backgroundColor:'#ffffff',
            justifyContent:'center'

        },
        titleStyle:{
            titleColor:'#000000',
            alignSelf:'center',

        },
        headerRight:(<View style={{
            marginLeft:5,
            marginRight:5
          }
        } >
        <Button title='Right'
                    style={{backgroundColor:null}}
                    onPress={()=>alert("click right")}
            />
        </View>),

        showIcon:true,
        mode:'modal',
        headerMode:'screen',
        initialRouteName:'MylistView',
        gesturesEnabled:true //滑动返回
    }
});
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={language:null};
  }
  render() {
     let type=3;
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
     }else if(type==2){
         return (<Nav/>);
     }else {
         return(<MyListViewNav/>);
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
