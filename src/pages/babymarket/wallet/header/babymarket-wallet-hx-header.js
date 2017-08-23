/**
 * Created by Patrick on 23/08/2017.
 */
import React,{Component} from 'react';
import './babymarket-wallet-hx-header.css';
import BabymarketWalletHeaderItem from './item/babymarket-wallet-header-item';
import BabymarketWalletHeaderButton from './item/babymarket-wallet-header-button';

export default class BabymarketWalletHXHeader extends Component {

    total(){
        let total = window.Tool.isValidStr(this.props.balance) ? this.props.balance : '0.0';

        return '￥' + total;
    }

    render(){
        return <li className="bmw-hx-header-root">

            <BabymarketWalletHeaderItem
                title="饭卡余额（元）"
                value={this.total()}
            />
        </li>
    }
}
