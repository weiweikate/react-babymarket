/**
 * Created by coin on 4/10/17.
 */

import React,{Component} from 'react';
import './babymarket-pagecontrol.css';
import BabymarketPageControlItem from './babymarket-pagecontrol-item';

export default class BabymarketPageControl extends Component{

    pageControlDisplay(){
        return this.props.itemCount <= 1 ? {display:'none'}:{display:'flex'};
    }
    items(){
        let {selectIndex,itemCount} = this.props;
        let items = [];
        for (let i = 0; i < itemCount; i++) {
            let selected = i === selectIndex;
            items.push(<BabymarketPageControlItem key={i} selected={selected} />);
        }
        return items;
    }

    render(){
        return <div className="bmpc-root" style={this.pageControlDisplay()}>
            {this.items()}
        </div>
    }
}


