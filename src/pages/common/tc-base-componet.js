/**
 * Created by coin on 21/04/2017.
 */
import React from 'react';

import ReactPullLoad,{ STATS } from 'react-pullload';
import {Spinner} from 'react-activity';

export default class TCBaseComponet extends React.Component{

    constructor(props){
        super(props);
        this.mainId = '';
        this.mainData = '';
        this.state = {
            data:{},
            itemDatas:[],
            showLoading:false
        };
        this.inheritStateFromSuper();
    }

    /**
     * 继承父类的State
     */
    inheritStateFromSuper(){
        Object.assign(this.state,this.superState);
        this.superState = this.state;
    }

    /**
     * 导航栏左侧点击
     */
    onRightClick(){
        window.JSBridge.sendDataToNative(null,'rightNavigationBarButtonClicked');
    }

    /**
     * 导航栏右侧点击
     */
    onLeftClick(){
        window.JSBridge.sendDataToNative(null,'leftNavigationBarButtonClicked');
    }

    showLoading(){
        this.setState({
            showLoading:true
        });
    }

    hideLoading(){
        this.setState({
            showLoading:false
        });
    }

    loadingComponents(){
        return <Spinner style={this.state.showLoading ? styles.showLoading : styles.hideLoading} />
    }

    requestData(){
        this.refreshRequest();
    }

    /**
     * 生成刷新的请求
     */
    generateRefreshRequest(){
        let r = null;

        return r;
    }

    /**
     * 生成加载更多的请求
     */
    generateLoadMoreRequest(){
        let r = null;

        return r;
    }

    /**
     * 刷新
     */
    refreshRequest(){

    }

    /**
     * 加载更多
     */
    loadMore(){

    }

    render(){
        return <div>

        </div>
    }
}

const styles = {
    showLoading:{
        position:'fixed',
        top:'50%',
        left:'50%',
    },
    hideLoading:{
        display:'none',
    }
}
