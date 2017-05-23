/**
 * Created by coin on 19/05/2017.
 */

import React from 'react';

export default class BMAddAddressItem extends React.Component{
    state = {
        value:''
    }

    componentDidMount() {
        if (this.props.value != undefined) {
            this.setState({
                value:this.props.value
            })
        }
    }

    inputChanged(e){
        let value = e.currentTarget.value;
        this.setState({
            value:value
        });

        if (window.Tool.isFunction(this.props.itemOnChange)) {
            this.props.itemOnChange(value);
        }
    }

    itemOnClick(){
        if (window.Tool.isFunction(this.props.itemOnClick)) {
            this.props.itemOnClick();
        }
    }

    render(){
        return (
            <div style={styles.main} onClick={this.itemOnClick.bind(this)}>
                <span style={styles.must}>*</span>
                <span style={styles.title}>{this.props.title}</span>
                <input
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.inputChanged.bind(this)}
                    disabled={this.props.disabled}
                />
            </div>
        )
    }
}

const styles = {
    main:{
        display:'flex',
        flexDirection:'row',
        margin:'10px 10px'
    },
    must:{

    },
    title:{

    },
    input:{
        display:'flex',
        flex:'1 0 auto',
        borderColor: 'transparent',
    }
}