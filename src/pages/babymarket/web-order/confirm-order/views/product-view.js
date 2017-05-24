/**
 * Created by coin on 24/05/2017.
 */

import React from 'react';

export default class BMProductView extends React.Component{

    state = {
        productTitle:'',
        productPrice:'',
        productId:'',
        ProductImgId:'',
    }

    componentWillMount() {
        let {Storage:s} = window;
        let id = s.read('product-id');
        let imgId = s.read('product-imgId');
        let price = s.read('product-price');
        let title = s.read('product-title');

        this.setState({
            productTitle:title,
            productPrice:price,
            productId:id,
            ProductImgId:imgId,
        })
    }

    img(){
        return window.Tool.imageURLForId(this.state.ProductImgId);
    }

    render(){
        return (
            <div style={styles.main}>
                <img style={styles.img} src={this.img()}/>
                <span style={styles.title}>{this.state.productTitle}</span>
                <span style={styles.price}>{this.state.productPrice}</span>
            </div>
        )
    }
}

const styles = {
    main:{

    },
    img:{
        width:60,
        height:60,
    },
    title:{

    },
    price:{

    }
}