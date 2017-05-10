/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-wallet-header.css';
import BabymarketWalletHeaderItem from './item/babymarket-wallet-header-item';
import BabymarketWalletHeaderButton from './item/babymarket-wallet-header-button';

export default class BabymarketWalletHeader extends Component {

    total(){
        let total = window.Tool.isValidStr(this.props.balance) ? this.props.balance : '0.0';

        return '￥' + total;
    }

    render(){
        return <li className="bmw-header-root">

            <BabymarketWalletHeaderItem
                title="余额（元）"
                value={this.total()}
            />
            <BabymarketWalletHeaderButton/>
        </li>
    }
}