/**
 * Created by coin on 25/05/2017.
 */

import React from 'react';

export default class BMPayFinishInfoView extends React.Component {
    render(){
        return (
            <div style={styles.main}>
                <span style={styles.item}>订单号：{this.props.orderNo}</span>
                <span style={styles.item}>支付金额：￥{this.props.due}</span>
            </div>
        )
    }
}

const styles = {
    main:{
        display:'flex',
        flexDirection:'column',
        margin:'10px 0px',
        backgroundColor:'white',
        padding:'5px',
    },
    item:{
        margin:5,
    },
}