import React,{Component} from 'react';
import {
    ListView,
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    ToastAndroid
} from 'react-native';
import Constant from './Constant';
import Detail from './Detail';
var source=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var page;
var demoList;
export default class MyListView extends Component {
    constructor(props) {
        super(props);
        page=0;
        demoList=[];
        this.state = (
            {
                data:source.cloneWithRows([]),
                isLoadingTail: false,
                isRefreshing: false,
                isNoMoreData: false
            }
        );
    }

    componentDidMount() {
      this.fetchData(true,false);
    }

    fetchData(isLoadFirst,loadMore){
        let pages;
        if(loadMore){
            pages=page;
            this.setState({
                isLoadingTail:true
            });
        }else{
            pages=1;
            if(!isLoadFirst){
                this.setState({
                    isRefreshing:true
                });
            }
        }
        ToastAndroid.show("dd"+pages,ToastAndroid.SHORT);
        fetch(Constant.URL+pages*10, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseData) => {
                    let data=responseData.data;
                    if(data.length!=0){
                        if(loadMore){
                            this.demoList=[];
                            this.demoList=this.demoList.concat(data);
                            page+=1;
                            if(page>=5){
                                this.setState({
                                    isNoMoreData:true
                                });
                            }

                        }else {
                            page=1;
                            this.demoList=[];
                            this.demoList=this.demoList.concat(data);

                        }
                        this.setState({
                            data:source.cloneWithRows(this.demoList)
                        });
                    }

                }
            )
            .catch((error) => {
                // 修改加载状态
                if(loadMore) {
                    // 关闭加载状态
                    this.setState({
                        isLoadingTail: false
                    });
                } else {
                    // TODO 可区分是否是第一次加载
                    this.setState({
                        isRefreshing: false
                    });
                }
            });

        // 修改加载状态
        if(loadMore) {
            // 关闭加载状态
            this.setState({
                isLoadingTail: false
            });
        } else {
            // TODO 可区分是否是第一次加载
            this.setState({
                isRefreshing: false
            });
        }

    }
    _onRefresh(){
        this.setState({
            isRefreshing: true
        });
        this.fetchData(false,false);
    }
    _endReached(){
        ToastAndroid.show(this.state.isLoadingTail+""+page,ToastAndroid.SHORT);
        if(this.state.isNoMoreData){

            return;
        }
        this.fetchData(false,true);
    }
    render() {
        if (!this.state.data) {
            return this.renderLoading();
        } else {
            return (
                <View>
                    <ListView
                        dataSource={this.state.data}
                        initialListSize={5}
                        renderSeparator={(sectionID,rowID)=>this._renderSeperator(sectionID,rowID)}
                        renderRow={(rowData) => this.renderRow(rowData)}
                        renderHeader={()=>this._renderHeader()}
                        renderFooter={()=>this._renderFooter()}
                        onEndReached={()=>this._endReached()}
                        onEndReachedThreshold={10}
                        refreshControl={<RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={()=>this._onRefresh()}/>}>
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

    _renderHeader(){

    }
    _renderFooter(){
        if(this.state.isNoMoreData){


        }else {
            return(<View style={{justifyContent:'center',alignItems:'center'}}>
                <Text>loading...</Text>
            </View>);
        }

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
        } else {
            alert("null");
        }
    }
    //分割线
    _renderSeperator(sectionID: number, rowID: number) {
        return (
            <View
                key ={'${sectionID}-${rowID}'}
                style ={{
                    height: 2,
                    backgroundColor: '#3B5998'}}
            />);

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
    },
    listViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
    }
});