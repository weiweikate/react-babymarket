/**
 * Created by coin on 23/05/2017.
 */

import React from 'react';

export default class ProvinceSelectItem extends React.Component {

    onClick(){
        let {itemOnClick} = this.props;
        if (window.Tool.isFunction(itemOnClick)) {

            itemOnClick(this.props.index);
        }
    }

    render(){
        return (
            <li onClick={this.onClick.bind(this)} style={styles.li}>
                <span style={styles.span}>{this.props.title}</span>
            </li>
        );
    }
}

const styles = {
    li:{
        borderBottom:'1px solid lightGray',
        paddingTop:10,
        paddingBottom:10,
    },
    span:{
        margin:'20px',
    }
}