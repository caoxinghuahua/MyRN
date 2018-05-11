import React,{Component} from 'react';
import ScrollableTabView ,{DefaultTabBar,ScrollableTabBar}from 'react-native-scrollable-tab-view';

import{
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
var Dimensions=require('Dimensions');
var ScreenWidth=Dimensions.get('window').width;

const hourData=[{index:1,degree:10,day:'2018-5-1'},{index:2,degree:12,day:'2018-5-2'},{index:3,degree:14,day:'2018-5-3'},{index:4,degree:16,day:'2018-5-4'},{index:5,degree:18,day:'2018-5-5'}];

export  default class Second extends Component{
    constructor(props){
        super(props);
        this.state={
            data:hourData
        }
    }

    render(){
        const hourView=this.state.data.map((elem,index)=>{
            return(<View style={{margin:20,justifyContent:'center',width:60}}>
                    <Text>{elem.index}</Text>
                    <Text>{elem.degree}</Text>
                    <Text>{elem.day}</Text>
                   </View>);
        });
        return (
            <View style={{flex:1}}>
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar />}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarActiveTextColor='#FF0000'
                initialPage={2}>

                <Text style={styles.textStyle} tabLabel='娱乐'>娱乐</Text>
                <Text style={styles.textStyle} tabLabel='科技'>科技</Text>
                <Text style={styles.textStyle} tabLabel='军事'>军事</Text>
                <Text style={styles.textStyle} tabLabel='体育'>体育</Text>
            </ScrollableTabView>
            </View>
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
            marginTop:20,
        },
        lineStyle:{
            width:ScreenWidth/4,
            height:2,
            backgroundColor:'#ff0000'
        },
        textStyle:{
            fontSize:20,
            flex:1,
            marginTop:20,
            textAlign:'center'
        }
    }
);