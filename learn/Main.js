import React,{Component} from'react';
import ScrollableTabView ,{DefaultTabBar,ScrollableTabBar}from 'react-native-scrollable-tab-view';
import {
    Text,
    StyleSheet
}from 'react-native';
import MyListViewNav from "./MyListViewNav";
import Detail from "./Detail";
import TabBarView from "./TabBarView";
import {Navigator} from "react-native-deprecated-custom-components";
import MyListView from "./MyListView";
import MyMap from './MyMap';

var Dimensions=require('Dimensions');
var ScreenWidth=Dimensions.get('window').width;


const tabTitles = ['listview', 'map'];
//Tab图标


class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <ScrollableTabView
            style={styles.container}
            renderTabBar={() => <DefaultTabBar/>}
            tabBarUnderlineStyle={styles.lineStyle}
            tabBarActiveTextColor='#FF0000'
            initialPage={0}
             >
            <MyListView tabLabel='listview' navigator={this.props.navigator}/>
            <MyMap tabLabel='Map'/>
            {/*<Text style={styles.textStyle} tabLabel='军事'>军事</Text>*/}
            {/*<Text style={styles.textStyle} tabLabel='体育'>体育</Text>*/}
        </ScrollableTabView>
        );
    }
}

const styles=StyleSheet.create(
    {
        tabStyle:{
            backgroundColor:'#ff00ff',
            width:60,
            height:30
        },
        container:{
            flex:1,
            marginTop:0,
        },
        lineStyle:{
            width:ScreenWidth/2,
            height:2,
            backgroundColor:'#ff0000'
        },
        textStyle:{
            fontSize:20,
            flex:1,
            marginTop:0,
            textAlign:'center'
        }
    }
);
export default module=Main;