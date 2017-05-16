/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-reward.css';
import TCPullLoadComponet from '../../common/tc-pull-load-componet';

import BabymarketRewardTopSwitcher from './top-switcher/babymarket-reward-top-switcher';
import BabymarketRewardItem from './item/babymarket-reward-item';
import BabymarketRewardHeader from './header/babymarket-reward-header';
import TCNavigationBar from '../../common/nav/tc-navigation-bar';
import ReactPullLoad,{ STATS } from 'react-pullload';

export default class BabymarketReward extends TCPullLoadComponet {

    constructor(props) {
        super(props);
        this.state = {
            totalValue:''
        };
        this.inheritStateFromSuper();
    }

    componentDidMount() {
        window.JSBridge.sendDataToNative(null,'hideNavigationBar');

        this.requestData();

        let self = this;
        window.Storage.currentMemberInfoAsync((member) => {
            let total = self.props.isSave ? member.BuyerCommission:member.Commission;
            console.log('get total from member = ' + total);
            self.setState({
                totalValue:total
            })
        });
    }

    /**
     * 生成刷新的请求
     */
    generateRefreshRequest(){
        let r = window.RequestReadFactory.bmCommissionLogRead();
        if (this.props.isSave) {
            r = window.RequestReadFactory.bmCommissionLogSaveRead();
        }
        return r;
    }

    /**
     * 生成加载更多的请求
     */
    generateLoadMoreRequest(){
        let r = window.RequestReadFactory.bmCommissionLogRead(this.state.index);
        if (this.props.isSave) {
            r = window.RequestReadFactory.bmCommissionLogRead(this.state.index);
        }
        return r;
    }

    generateContent(){
        let arr = [];
        let i = 0;
        let count = this.state.itemDatas.length;
        this.state.itemDatas.forEach((item) => {
            arr.push(<BabymarketRewardItem
                data={item}
                key={i}
            />);
            i++;
        });
        return <ul className="bm-reward-content">
            <BabymarketRewardHeader title={this.props.isSave ? "已省金额":"收到奖励"} total={this.state.totalValue}/>
            {arr}
        </ul>
    }

    render(){
        return <div className="bm-reward-root">
            <TCNavigationBar
                onLeftClick={this.onLeftClick.bind(this)}
                title={this.props.isSave ? "已省金额":"已收到奖励"}
            />
            {this.generatePullLoad()}
        </div>
    }
}