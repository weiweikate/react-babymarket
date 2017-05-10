/**
 * Created by coin on 3/16/17.
 */

//产品列表平铺容器

import React, { Component } from 'react';
import ProductCollectionCell from '../product-collection-cell/product-collection-cell';
import './product-collection-view.css';

export default class ProductCollectionView extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return <div className="s-result-list">
            <ul>
                <ProductCollectionCell/>
                <ProductCollectionCell/>
                <ProductCollectionCell/>
                <ProductCollectionCell/>
            </ul>
            <div className="clear"></div>
        </div>
    }
}