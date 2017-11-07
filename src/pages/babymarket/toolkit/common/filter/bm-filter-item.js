/**
 * Created by Patrick on 06/11/2017.
 */
import React, {Component} from 'react';

export default class BabymarketToolKitFilterItem extends Component {

    constructor(props){
        super();
        this.state = {
            items:[],
        }
    }

    componentWillMount() {
        this.getItems();
    }

    selectOnChange(e){
        let selet = e.currentTarget;
        console.log('select value = ' + selet.value);
    }

    getItems(){

        let self = this;
        let i = 0;
        let items = [];
        if (window.Tool.isValidArr(this.props.dataArray)) {
            for (let item of this.props.dataArray) {
                items.push(<option key={i} value={item}>{item.Name}</option>)
                i++;
            }
        }

        return items;
    }

    render(){
        return <div style={styles.root}>
            <span>{this.props.title}</span>
            <div>
                <select onChange={this.selectOnChange.bind(this)} dir="rtl" style={{backgroundColor:'transparent',borderColor:'transparent',height:20,marginTop:0,align:'right'}}>
                    {this.getItems()}
                </select>
            </div>
        </div>
    }
}

const styles = {
    root:{
        display:'flex',
        flexDirection:'row',
    },

}