/**
 * Created by coin on 05/05/2017.
 */
import React from 'react';
import './babymarket-wallet-item-section.css';

export default class BabymarketWalletItemSection extends React.Component{
    time(){
        let date = this.props.title;
        let thisMonth = window.Tool.timeStringForDate(new Date(),'mm');
        let itemMonth = window.Tool.timeStringForDateString(date,'mm');

        if (thisMonth === itemMonth) {
            itemMonth = '本';
        }

        return itemMonth + '月';
    }
    render(){
        return <li className="bmwis-root">
            <span>{this.time()}</span>
        </li>
    }
}