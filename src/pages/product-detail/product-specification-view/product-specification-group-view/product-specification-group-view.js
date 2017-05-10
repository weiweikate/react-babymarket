/**
 * Created by coin on 3/22/17.
 */

//规格组：eg.颜色：红 黄 白

import React, { Component } from 'react';
import './product-specification-group-view.css';
import ProductSpecificationGroupTitleView from './product-specification-group-title-view/product-specification-group-title-view';
import ProductSpecificationGroupThumbContainer from './product-specification-group-thumb-container/product-specification-group-thumb-container';

export default class ProductSpecificationGroupView extends Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        return <div className="specification-group">
            <ProductSpecificationGroupTitleView {...this.props}/>
            <ProductSpecificationGroupThumbContainer {...this.props}/>
        </div>
    }
}
