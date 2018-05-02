import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
import Constant from './Constant';
// var url='http://www.imooc.com/api/teacher?type=4&num=10';
export default class Net extends Component{
    constructor(props){
        super(props);
        this.state={data:''};
    }
    componentDidMount(){
        fetch(Constant.URL,{
            method:'GET'
        })
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
                data:responseData.data[0],
            });
             // alert(this.state.data.picBig);
        })
        .catch((error)=>{
             alert(error);
        });

    }
    render(){
        return(
            <View >
                <Text numberofLines={1}>
                    测试网络加载数据，显示图片
                </Text>
                <TouchableHighlight   onPress={()=>{
                    alert('click');
                }}
                onLongPress={()=>{
                    ToastAndroid.show('long press',ToastAndroid.SHORT);
                }}>
                <Image source={{uri:this.state.data.picBig}} style={{width:300,height:200}}
                       resizeMode={
                           Image.resizeMode.cover
                       }
                      />
                </TouchableHighlight>
            </View>
        );
    }
}
