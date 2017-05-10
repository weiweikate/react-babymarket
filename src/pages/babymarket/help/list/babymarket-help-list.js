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
            title={"就是垃圾了几个风格个更多广告"}
            content={"晒房了放假发首付是发个发个 我饿我饿 去而我却二切去人额让他儿童热也让他 好好好风格 辉哥好干活返回的个的个"}
        />);

        arr.push(<BabymarketHelpListItem
            key={1}
            title={"就是垃圾了几个风格个更多广告"}
            content={"晒房了放假发首付是发个发个 我饿我饿 去而我却二切去人额让他儿童热也让他 好好好风格 辉哥好干活返回的个的个"}
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

