/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-reward-top-switcher-item.css';

export default class BabymarketRewardTopSwitcherItem extends Component {

    bottomLineCssClass(){
        if (this.props.selectIndex === this.props.tag) {
            return "bmrtsi-bottom-line bmrtsi-bottom-line-select";
        }
        return "bmrtsi-bottom-line";
    }

    titleClassName(){
        if (this.props.selectIndex === this.props.tag) {
            return "bmrtsi-title bmrtsi-title-select";
        }
        return "bmrtsi-title";
    }

    render(){
        return <div
            id={this.props.tag}
            onClick={this.props.onPress}
            className="bmrtsi-root">

            <span className={this.titleClassName()}>{this.props.title}</span>
            <div className={this.bottomLineCssClass()}></div>
        </div>
    }
}