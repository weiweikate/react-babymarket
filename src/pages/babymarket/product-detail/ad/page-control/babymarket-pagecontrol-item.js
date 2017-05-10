/**
 * Created by coin on 4/10/17.
 */
import React,{Component} from 'react';
import './babymarket-pagecontrol-item.css';

export default class BabymarketPageControlItem extends Component{
    render(){
        return <div className={this.props.selected === true ? "bmpci-root bmpci-select" : "bmpci-root bmpci-normal"}>
        </div>
    }
}