/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-wallet.css';

import TCPullLoadComponet from '../../common/tc-pull-load-componet';
import BabymarketWalletItem from './item/babymarket-wallet-item';
import BabymarketWalletHeader from './header/babymarket-wallet-header';
import BabymarketWalletHXHeader from './header/babymarket-wallet-hx-header';
import TCNavigationBar from '../../common/nav/tc-navigation-bar';
import BabymarketWalletItemSection from './item/babymarket-wallet-item-section';
import ReactPullLoad,{ STATS } from 'react-pullload';

export default class BabymarketWallet extends TCPullLoadComponet{

    constructor(props){
        super(props);
        this.mainId = window.Storage.currentMemberId();
        this.state = {
            balance:'',
            foodBalance:'',
            isThirdBalance:false,
        };
        this.inheritStateFromSuper();
    }

    componentDidMount() {
        window.JSBridge.sendDataToNative(null,'hideNavigationBar');

        this.requestData();

        let self = this;
        window.Storage.currentMemberInfoAsync((member) => {
            console.log('member:' + JSON.stringify(member));
            self.setState({
                balance:member.Balance,
                foodBalance:member.ThirdBalance,
                isThirdBalance:member.IsThirdBalance == 'True',
            })
        });
    }

    /**
     * 生成刷新的请求
     */
    generateRefreshRequest(){
        let r = window.RequestReadFactory.bmBalanceLogMonthViewRead(this.mainId);
        return r;
    }

    /**
     * 生成加载更多的请求
     */
    generateLoadMoreRequest(){
        let r = window.RequestReadFactory.bmBalanceLogMonthViewRead(this.mainId,this.state.index);
        return r;
    }

    heHeader(){
        if (this.state.isThirdBalance) {
            return <BabymarketWalletHXHeader balance={this.state.foodBalance}/>
        }
    }

    /**
     * 生成主内容视图
     */
    generateContent(){
        let arr = [];
        let count = this.state.itemDatas.length;
        let self = this;
        this.state.itemDatas.forEach((item,i) => {
            if (item.Detail.length > 0) {
                arr.push(<BabymarketWalletItemSection key={i} title={item.Month}/>);
            }
            item.Detail.forEach((subItem,j) => {
                arr.push(<BabymarketWalletItem
                    data={subItem}
                    key={j + i * 100 + 10000}
                />);
            });
        });
        return <ul className="bm-wallet-content">
            <BabymarketWalletHeader balance={this.state.balance}/>
            { this.heHeader() }
            {arr}
        </ul>
    }

    render(){
        return <div className="bm-wallet-root">
            <TCNavigationBar
                onLeftClick={this.onLeftClick.bind(this)}
                onRightClick={this.onRightClick.bind(this)}
                title="我的资产"
                rightText="优惠券"
            />
            {this.generatePullLoad()}
        </div>
    }
}
