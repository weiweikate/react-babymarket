/**
 * Created by coin on 4/13/17.
 */
import React, {Component} from 'react';
import './babymarket-help-list.css';
import BabymarketHelpListItem from './item/babymarket-help-list-item';

export default class BabymarketHelpList extends Component {

    generateItems(){
        let arr = [];

        arr.push(<BabymarketHelpListItem
            key={0}
            title={"测测试测试测试测试测试测试测试测试测试试"}
            content={"测测试测试测试测试测试测试测试测试测试试测测试测试测试测试测试测试测试测试测试试测测试测试测试测试测试测试测试测试测试试"}
        />);

        arr.push(<BabymarketHelpListItem
            key={1}
            title={"测测试测试测试测试测试测试测试测试测试试"}
            content={"测测试测试测试测试测试测试测试测试测试试测测试测试测试测试测试测试测试测试测试试测测试测试测试测试测试测试测试测试测试试测测试测试测试测试测试测试测试测试测试试"}
        />);
        return arr;
    }

    render(){
        return <div>
            <ul style={{margin:0, padding:0}}>
                {this.generateItems()}
            </ul>
        </div>
    }
}

