/**
 * Created by coin on 4/13/17.
 */
import React,{Component} from 'react';
import './babymarket-help-switcher-item.css';

export default class BabymarketHelpSwitcherItem extends Component {

    bottomLineCssClass(){
        if (this.props.selectIndex === this.props.tag) {
            return "bmhsi-bottom-line bmhsi-bottom-line-select";
        }
        return "bmhsi-bottom-line";
    }

    titleClassName(){
        if (this.props.selectIndex === this.props.tag) {
            return "bmhsi-title bmhsi-title-select";
        }
        return "bmhsi-title";
    }

    render(){
        return <div
            id={this.props.tag}
            onClick={this.props.onPress}
            className="bmhsi-root">

            <span className={this.titleClassName()}>{this.props.title}</span>
            <div className={this.bottomLineCssClass()}></div>
        </div>
    }
}