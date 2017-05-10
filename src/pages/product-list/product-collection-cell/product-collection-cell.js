/**
 * Created by coin on 3/16/17.
 */
//产品列表平铺单元格

import React, { Component } from 'react';
import './product-collection-cell.css';

export default class ProductCollectionCell extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return <li>
            <img src="img/s_result.jpg"/>
            <a href="productDetail.html">NISSIN 日清格布东乌东面225 克</a>
            <p>￥45<span className="old-price">￥75</span></p>
        </li>
    }
}