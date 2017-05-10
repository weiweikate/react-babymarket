/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-reward-header.css';

export default class BabymarketRewardHeader extends Component {
    total(){
        let total = window.Tool.isValidStr(this.props.total) ? this.props.total : '0.0';
        return '￥' + total;
    }
    render(){
        return <div className="bmr-header-root">
            <span className="bmr-header-title">{this.props.title}（元）</span>
            <span className="bmr-header-value">{this.total()}</span>
        </div>
    }
}