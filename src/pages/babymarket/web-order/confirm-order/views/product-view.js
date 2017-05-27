/**
 * Created by coin on 24/05/2017.
 */

import React from 'react';

export default class BMProductView extends React.Component{

    state = {
        productTitle:'',
        productPrice:'',
        productId:'',
        productImgId:'',
        productSubtitle:'',
    }

    componentWillMount() {
        let {Storage:s} = window;
        let id = s.read('product-id');
        let imgId = s.read('product-imgId');
        let price = s.read('product-price');
        let title = s.read('product-title');
        let subtitle = s.read('product-subtitle');

        this.setState({
            productTitle:title,
            productPrice:price,
            productId:id,
            productImgId:imgId,
            productSubtitle:subtitle,
        })
    }

    img(){
        return window.Tool.imageURLForId(this.state.productImgId);
    }

    render(){
        return (
            <div style={styles.main}>
                <div style={styles.left}>
                    <img style={styles.img} src={this.img()}/>
                    <div style={styles.content}>
                        <span style={styles.title}>{this.state.productTitle}</span>
                        <span className="two-line-ellipsis" style={styles.subtitle}>{this.state.productSubtitle}</span>
                    </div>
                </div>
                <span style={styles.price}>￥{this.state.productPrice}</span>
            </div>
        )
    }
}

const styles = {
    main:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'10px 10px',
        backgroundColor:'white',
        width:'100% - 20px',
        marginBottom:10,
    },
    left:{
        display:'flex',
        alignItems:'center',
    },
    content:{
        display:'flex',
        flexDirection:'column',
    },
    img:{
        width:60,
        height:60,
        border:'1px solid #eee',
        flex:'0 0 auto',
    },
    title:{
        margin:'0px 10px',
        fontSize:16,
    },
    subtitle:{
        margin:'0px 10px',
        color:'#878787',
    },
    price:{
        alignSelf:'center',
        margin:'0px 10px',
    }
}