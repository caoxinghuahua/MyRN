import React,{Component} from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';

export default class Detail extends Component{
    static navaigationOptions=((navigation)=>{
        title:'DeTail'
    });
    constructor(props){
        super(props);
        this.state={
           // des:this.props.navigation.state.params.des
            des:this.props.des
        }
    }
    render(){
        return(
            <View >

                <View style={{justifyContent:'center',alignItems:'center'}}>
                   <Text>{this.state.des.description}</Text>
                   <Image
                        source={{uri:this.state.des.picBig}} style={{width:600,height:200}}/>
                </View>
            </View>);
    };
}
