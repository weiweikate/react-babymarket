/**
 * Created by coin on 19/05/2017.
 */

import React from 'react';

export default class BMAddAddressItem extends React.Component{
    state = {
        value:''
    }

    componentWillReceiveProps(props) {

        if (props.value != undefined) {
            this.setState({
                value:props.value
            })
        }

    }

    render(){
        return (
            <div>
                <span>*</span>
                <span>{this.props.title}</span>
                <input placeholder={this.props.placeholder} value={this.state.value}/>
            </div>
        )
    }
}