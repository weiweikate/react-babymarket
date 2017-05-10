/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-system-message.css';
import BabymarketSystemMessageItem from './item/babymarket-system-message-item';

export default class BabymarketSystemMessage extends Component{

    generateItems(){
        let arr = [];
        arr.push(<BabymarketSystemMessageItem/>);
        arr.push(<BabymarketSystemMessageItem/>);
        arr.push(<BabymarketSystemMessageItem/>);

        return arr;
    }

    render(){
        return <div>
            {this.generateItems()}
        </div>
    }
}

