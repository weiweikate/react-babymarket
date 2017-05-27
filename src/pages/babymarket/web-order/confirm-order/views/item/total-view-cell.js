/**
 * Created by coin on 24/05/2017.
 */

import React from 'react';

export default class BMTotalViewCell extends React.Component{
    render(){
        return (
            <div style={styles.main}>
                <span style={styles.left}>{this.props.leftText}</span>
                <span style={styles.right}>{this.props.rightText}</span>
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
        backgroundColor:'white',
        padding:'5px 10px',
        borderBottom:'1px solid lightGray',
    },
    left:{
        margin:'0px 0px',
    },
    right:{
        margin:'0px 10px',
    }
}
