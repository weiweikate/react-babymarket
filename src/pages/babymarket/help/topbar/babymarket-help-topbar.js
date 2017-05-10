/**
 * Created by coin on 4/13/17.
 */
import React,{Component} from 'react';
import './babymarket-help-topbar.css';
import BabymarketHelpTopbarItem from './item/babymarket-help-topbar-item';

export default class BabymarketHelpTopbar extends Component {

    onPress(e){
        let index = Number(e.currentTarget.id);
        console.log('index:'+index);
    }

    render(){
        return <div className="bmh-topbar-root">

            <BabymarketHelpTopbarItem
                tag={0}
                onPress={this.onPress.bind(this)}
                image=""
                title="售后申请"
                des="退货/退款/补发"/>

            <BabymarketHelpTopbarItem
                tag={1}
                onPress={this.onPress.bind(this)}
                image=""
                title="修改地址"
                des="地址修改/编辑"/>

            <BabymarketHelpTopbarItem
                tag={2}
                image=""
                onPress={this.onPress.bind(this)}
                title="账号安全"
                des="修改密码/手机"/>

            <BabymarketHelpTopbarItem
                tag={3}
                onPress={this.onPress.bind(this)}
                image=""
                title="取消订单"
                des="订单查询/取消"/>

        </div>
    }
}