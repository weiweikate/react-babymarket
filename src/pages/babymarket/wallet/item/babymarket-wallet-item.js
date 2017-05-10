/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-wallet-item.css';

export default class BabymarketWalletItem extends Component {

    date(){
        return window.Tool.timeStringForDateString(this.props.data.DateTime,'mm-dd');
    }

    time(){
        return window.Tool.timeStringForDateString(this.props.data.DateTime,'HH:MM');
    }

    money(){
        if (this.props.data.Money) {
        }
    }
    render(){
        return <li className="bm-wallet-item-root">
            <div className="bm-wallet-item-left">
                <span className="bm-wallet-item-date">{this.date()}</span>
                <span className="bm-wallet-item-time">{this.time()}</span>
            </div>
            <div className="bm-wallet-item-right">
                <span className="bm-wallet-item-title">{this.props.data.Money}</span>
                <span className="bm-wallet-item-des">{this.props.data.Title}</span>
            </div>
        </li>
    }
}

