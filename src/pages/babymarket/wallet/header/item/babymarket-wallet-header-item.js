/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-wallet-header-item.css';

export default class BabymarketWalletHeaderItem extends Component {

    render(){
        return <div className="bmw-header-item-root">
            <span className="bmw-header-item-title">{this.props.title}</span>
            <span className="bmw-header-item-value">{this.props.value}</span>
        </div>
    }
}