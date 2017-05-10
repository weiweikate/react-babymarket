/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-reward-item.css';

export default class BabymarketRewardItem extends Component {

    time(){
        return window.Tool.timeDurationStringForDateString(this.props.data.OrderDate);
    }
    render(){
        return <li className="bm-reward-item-root">
            <span className="bm-reward-item-title">{this.props.data.Type}</span>
            <span className="bm-reward-item-value">+{this.props.data.Commission}</span>
            <span className="bm-reward-item-time">{this.time()}</span>
        </li>
    }
}