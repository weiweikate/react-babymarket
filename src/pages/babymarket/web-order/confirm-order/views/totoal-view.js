/**
 * Created by coin on 24/05/2017.
 */

import React from 'react';
import BMTotalViewCell from './item/total-view-cell';

export default class BMTotalView extends React.Component{

    render(){
        let {props} = this;
        return (
            <div style={styles.main}>
                <span style={styles.title}>结算</span>
                <div style={styles.content}>
                    <BMTotalViewCell leftText="商品合计" rightText={'￥' + props.price}/>
                    <BMTotalViewCell leftText="运费" rightText={'￥' + props.express}/>
                    <BMTotalViewCell leftText="税费" rightText={'￥' + props.tax}/>
                    <BMTotalViewCell leftText="应付总额" rightText={'￥' + props.due}/>
                </div>
            </div>
        )
    }
}

const styles = {
    main:{

    },
    title:{
        padding:'10px',
    },
    content:{
        margin:'10px 0px',
    },
}