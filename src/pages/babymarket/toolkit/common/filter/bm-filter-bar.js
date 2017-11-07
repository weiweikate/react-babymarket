/**
 * Created by Patrick on 06/11/2017.
 */

import React, {Component} from 'react';
import BabymarketToolKitFilterItem from './bm-filter-item';

export default class BabymarketToolKitFilter extends Component {

    render(){
        return <div style={styles.root}>
            <BabymarketToolKitFilterItem title='一级' dataArray={this.props.firstCategorys} />
            <BabymarketToolKitFilterItem title='二级' dataArray={['奶粉','米粉']} />
            <button onClick={this.props.submitButtonOnClick}>确定</button>
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
