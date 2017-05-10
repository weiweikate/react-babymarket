/**
 * Created by coin on 4/13/17.
 */
import React,{Component} from 'react';
import './babymarket-help-topbar-item.css';

export default class BabymarketHelpTopbarItem extends Component {
    render(){
        return <div
            id={this.props.tag}
            onClick={this.props.onPress}
            className="bmht-item-root">

            <img className="bmht-item-img" src={this.props.image}/>
            <span className="bmht-item-title">{this.props.title}</span>
            <span className="bmht-item-des">{this.props.des}</span>
        </div>
    }
}


