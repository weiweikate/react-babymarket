/**
 * Created by coin on 24/05/2017.
 */

import React from 'react';

export default class BMAdressView extends React.Component{
    state = {
        name:'',
        phone:'',
        detail:'',
    }

    componentWillMount() {
        let {Storage} = window;
        let name = Storage.read('reciver-name');
        let phone = Storage.read('reciver-phone');
        let detail = Storage.read('address-detail');

        this.setState({
            name:name,
            phone:phone,
            detail:detail,
        });
    }

    render(){
        return (
            <div style={styles.main}>
                <div style={styles.top}>
                    <span style={styles.name}>收货人：{this.state.name}</span>
                    <span style={styles.phone}>{this.state.phone}</span>
                </div>
                <div style={styles.bottom}>
                    <span style={styles.detail}>收货地址：{this.state.detail}</span>
                </div>
            </div>
        )
    }
}

const styles = {
    main:{
        backgroundColor:'white',
        padding:12,
        marginBottom:10,
    },
    top:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
    },
    bottom:{

    },
    name:{

    },
    phone:{

    },
    detail:{

    }
}