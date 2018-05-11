import React,{Component} from'react';
import {StackNavigator} from'react-navigation';
import {Navigator}from 'react-native-deprecated-custom-components';
import {
    View,
    Button
}from'react-native';
import MyListView from'./MyListView';
import Detail from "./Detail";
import Main from  './Main';
const Nav=new StackNavigator({
    MyListView: {screen: MyListView},
    Detail: {screen: Detail}
    },
    {
    navigationOptions:{
        headerBackTitle:null,
        headerTintColor:'#333333',
        // title:'MyListView',
        visible:false,
        // style:{
        //     flex:1,
        //     alignItems:'center',
        //     backgroundColor:'#ffffff',
        //     justifyContent:'center'
        //
        // },
        // titleStyle:{
        //     titleColor:'#000000',
        //     alignSelf:'center',
        //
        // },
        // headerRight:(<View style={{
        //     marginLeft:5,
        //     marginRight:5
        // }
        // } >
        // <Button title='Right'
        //             style={{backgroundColor:null}}
        //             onPress={()=>alert("click right")}
        //     />
        // </View>),
        },
        showIcon:true,
        mode:'modal',
        headerMode:'none',
        initialRouteName:'MyListView',
        gesturesEnabled:true //滑动返回
    }
);

export default class MyListViewNav extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let rootViewName='Main';
        let rootComponent=Main;
        let type=2;
        if(type==2){
            return(<Navigator
                initialRoute={{name:rootViewName,component:rootComponent}}
                configureScene = {(route) => {
                    return Navigator.SceneConfigs.HorizontalSwipeJump ;
                }}
                renderScene = {(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator = {navigator} />
                }}
            />)
        }else {
            return(<Nav/>);
        };
    }
}