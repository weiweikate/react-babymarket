/**
 * Created by coin on 24/05/2017.
 */

import React from 'react';

export default class BMBottomBar extends React.Component{
    render(){
        return (
            <div style={styles.main}>
                <div style={styles.left}>
                    <span style={styles.title}>实付：</span>
                    <span style={styles.due}>￥{this.props.due}</span>
                </div>
                <div onClick={this.props.submitBtnClicked.bind(this)} style={styles.submitBtn}>
                    <span style={styles.submitText}>提交订单</span>
                </div>
            </div>
        )
    }
}

const styles = {
    main:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        position:'fixed',
        bottom:0,
        width:'100%',
        height:44,
        backgroundColor:'white',
    },
    left:{
        margin:'0px 10px',
    },
    title:{

    },
    due:{
        color:'#ae8231',
    },
    submitBtn:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        backgroundColor:'#ae8231',
        padding:'0px 15px',
    },
    submitText:{
        color:'white',
    }
}