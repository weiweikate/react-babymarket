/**
 * Created by coin on 4/13/17.
 */
import React,{Component} from 'react';
import './babymarket-help-switcher.css';
import BabymarketHelpSwitcherItem from './item/babymarket-help-switcher-item';

export default class BabymarketHelpSwitcher extends Component {

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
    }

    generateItems(){
        let arr = [];
        arr.push(<BabymarketHelpSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={0}
            key={0}
            title="常见问题"/>);

        arr.push(<BabymarketHelpSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={1}
            key={1}
            title="购物问题"/>);

        arr.push(<BabymarketHelpSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={2}
            key={2}
            title="物流问题"/>);

        arr.push(<BabymarketHelpSwitcherItem
            selectIndex={this.state.selectIndex}
            onPress={this.itemClicked.bind(this)}
            tag={3}
            key={3}
            title="售后问题"/>);

        return arr;
    }

    render(){
        return <div className="bmhs-root">
            {this.generateItems()}
        </div>
    }
}
