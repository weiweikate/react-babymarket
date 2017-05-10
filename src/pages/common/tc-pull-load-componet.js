/**
 * Created by coin on 21/04/2017.
 */
import React from 'react';
import TCBaseComponent from './tc-base-componet';
import ReactPullLoad,{ STATS } from 'react-pullload';

export default class TCPullLoadComponet extends TCBaseComponent{

    constructor(props){
        super(props);
        this.state = {
            hasMore: true,
            action: STATS.init,
            index: 0,
            total:0,
            didImplementPullToLoad:false,//使用Navtie的加载机制
            // didImplementPullToRefresh:false//todo，目前的Js不支持
        };
        this.inheritStateFromSuper();

        let self = this;
        window.JSBridge.recivedDataFromNative((data, action, returnCB) => {
            if (action === 'nativeOnLoadMore') {
                self.loadMore(self.mainId);
            }
            else if (action === 'nativeOnRefreshing') {
                self.requestData();
            }
        });

        window.JSBridge.sendDataToNative(null,'didImplementPullToLoad',(response) => {
            self.setState({
                didImplementPullToLoad:window.Tool.isTrue(response)
            })
        });
    }

    /**
     * 刷新
     */
    refreshRequest(){
        if(STATS.refreshing === this.state.action){
            return false
        }
        this.setState({
            index:0,
            hasMore:true,
            action: STATS.refreshing
        });
        let r = this.generateRefreshRequest();
        let self = this;
        r.finishBlock = (req) => {
            window.JSBridge.sendDataToNative(null,'refreshDidFinish');
            let base = req.responseObject;
            let itemDatas = req.responseObject.Datas;
            if (window.Tool.isValidArr(itemDatas)) {
                self.setState({
                    itemDatas:itemDatas,
                })
            }

            if (parseInt(base.Total) <= self.state.itemDatas.length) {
                self.setState({
                    hasMore:false,
                })
                window.JSBridge.sendDataToNative(null,'noMoreData');
            }

            self.setState({
                total:base.Total,
                index:base.StartIndex + base.Count,
                action: STATS.refreshed,
            });
        };
        r.start();
    }

    /**
     * 加载更多
     */
    loadMore(){
        if(STATS.loading === this.state.action || this.state.hasMore === false){
            return false
        }
        this.setState({
            action: STATS.loading
        })
        let r = this.generateLoadMoreRequest();
        let self = this;
        r.finishBlock = (req) => {
            window.JSBridge.sendDataToNative(null,'loadMoreDidFinish');
            let base = req.responseObject;
            let itemDatas = self.state.itemDatas.concat(req.responseObject.Datas);
            if (window.Tool.isValidArr(itemDatas)) {
                self.setState({
                    itemDatas:itemDatas,
                })
            }

            if ( base.Total <= self.state.itemDatas.length) {
                self.setState({
                    hasMore:false,
                });
                window.JSBridge.sendDataToNative(null,'noMoreData');
            }

            self.setState({
                index:base.StartIndex + base.Count,
                action: STATS.reset,
            });
        };
        r.start();
    }

    /**
     * 分发上拉下拉事件
     */
    handleAction = (action) => {
        console.info(action, this.state.action,action === this.state.action);
        if(action === this.state.action){
            return false
        }
        if(action === STATS.refreshing){//刷新
            this.refreshRequest();
        } else if(action === STATS.loading){//加载更多
            this.loadMore();
        } else{
            this.setState({
                action: action
            })
        }
    }

    /**
     * 生成主内容视图
     */
    generateContent(){
        let arr = [];
        return arr
    }

    /**
     * 生成上拉下拉控件
     */
    generatePullLoad(){
        if (this.state.didImplementPullToLoad) {
            return this.generateContent();
        }
        else {
            return <ReactPullLoad
                action={this.state.action}
                handleAction={this.handleAction}
                hasMore={this.state.hasMore}
            >
                {this.generateContent()}
            </ReactPullLoad>
        }
    }

    render(){
        return this.generatePullLoad()
    }
}
