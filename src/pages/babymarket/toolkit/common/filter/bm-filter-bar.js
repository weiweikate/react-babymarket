/**
 * Created by Patrick on 06/11/2017.
 */

import React, {Component} from 'react';
import BabymarketToolKitFilterItem from './bm-filter-item';

export default class BabymarketToolKitFilter extends Component {

    constructor(props){
        super();

    }

    componentWillReceiveProps() {
        console.log('arr count = ' +  this.props.firstCategorys.length)
    }

    render(){
        return <div style={styles.root}>
            <BabymarketToolKitFilterItem
                title='一级'
                currentIndex={this.props.firstCurrentIndex}
                onChange={this.props.firstCategoryOnChange}
                dataArray={this.props.firstCategorys}
                elementId='first select'
            />
            <BabymarketToolKitFilterItem
                title='二级'
                currentIndex={this.props.secondCurrentIndex}
                onChange={this.props.secondCategoryOnChange}
                dataArray={this.props.secondCategorys}
                elementId='second select'
            />
            {/*<button onClick={this.props.submitButtonOnClick}>确定</button>*/}
        </div>
    }
}

const styles = {
    root:{
        display:'flex',
        flexDirection:'row',
        padding:20,
    },

}
