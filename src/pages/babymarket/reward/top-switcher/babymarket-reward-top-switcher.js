/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './babymarket-reward-top-switcher.css';
import BabymarketRewardTopSwitcherItem from './item/babymarket-reward-top-switcher-item';

export default class BabymarketRewardTopSwitcher extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectIndex:0
        }
    }

    itemClicked(e){
        let index = Number(e.currentTarget.id);
        this.setState({
            selectIndex:index
        })
        this.props.switchClickedAthIndex(index);
    }

    generateItems(){
        let arr = [];
        arr.push(<BabymarketRewardTopSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={0}
            key={0}
            title="全部奖励"/>);

        arr.push(<BabymarketRewardTopSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={1}
            key={1}
            title="消费奖励"/>);

        arr.push(<BabymarketRewardTopSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={2}
            key={2}
            title="分享奖励"/>);

        return arr;
    }

    render(){
        return <div className="bmrts-root">
            <div className="bmrts-container">
            {this.generateItems()}
            </div>
        </div>
    }
}