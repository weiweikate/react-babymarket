/**
 * Created by coin on 05/05/2017.
 */
import React from 'react';
import './babymarket-wallet-header-button.css';

export default class BabymarketWalletHeaderButton extends React.Component{
    onClick(){
        window.JSBridge.sendDataToNative(null,'getCashDidClicked')
    }
    render(){
        return <div onClick={this.onClick.bind(this)} className="bmwhb-root">
            提现
        </div>
    }
}