import React,{Component} from 'react';
import {
    ListView,
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Constant from './Constant';
import Detail from './Detail';
export default class MyListView extends Component {
    constructor(props) {
        super(props);
        this.state = (
            {
                data: null
            }
        );
    }

    componentDidMount() {
        fetch(Constant.URL, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseData) => {
                    this.setState({
                        data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(responseData.data)
                    });
                }
            )
            .catch((error) => {
                alert(error);
            });

    }

    render() {
        if (!this.state.data) {
            return this.renderLoading();
        } else {
            return (
                <View>
                    <ListView
                        dataSource={this.state.data}
                        renderRow={(rowData) => this.renderRow(rowData)}>
                    </ListView>
                </View>
            );
        }

    }

    renderLoading() {
        return (
            <View>
                <Text>正在加载数据
                </Text>
            </View>
        );
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity style={styles.itemStyle} activeOpacity={0.6}
                              onPress={() => {
                                  this._onPress(rowData)
                              }}>
                <Image source={{uri: rowData.picSmall}} style={{resizeMode: 'cover', width: 50, height: 50}}></Image>
                <View>
                    <Text style={styles.textName} numberOfLines={1}>名称:{rowData.name}</Text>
                    <Text style={styles.textDes} numberOfLines={1}>简介:{rowData.description}</Text>
                </View>

            </TouchableOpacity>
        );
    }


    _onPress(rowData) {

        let {navigator} = this.props;
        if (navigator) {
            navigator.push(
                {
                    name: 'Detail',
                    component: Detail,
                    params: {
                        des: rowData
                    }
                }
            )
        }else {
            alert("null");
        }
    }
}
const styles=StyleSheet.create({
    itemStyle:{
       flex:1,
       flexDirection:'row',
       justifyContent:'flex-start',
       padding:10,
       alignItems:'center'
    },
    imageStyle:{

    },
    textName:{
        fontSize:15,
        color:'#000000',
        textAlign:'left',
        padding:5
    },
    textDes:{
        fontSize:12,
        color:'#000000',
        textAlign:'left',
        padding:5
    }
});