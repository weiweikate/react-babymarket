/**
 * Created by coin on 3/16/17.
 */

import React, { Component } from 'react';
import FilterBar from './filter-bar/filter-bar';
import ProductCollectionView from './product-collection-view/product-collection-view';

import './product-list.css';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return <div>
            <FilterBar/>
            <ProductCollectionView/>
        </div>
    }
}