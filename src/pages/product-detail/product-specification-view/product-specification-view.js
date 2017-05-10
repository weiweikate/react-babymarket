/**
 * Created by coin on 3/21/17.
 */

//产品规格选择页面

import React,{ Component } from 'react';
import './product-specification-view.css'

import ProductSpecificationGroupView from './product-specification-group-view/product-specification-group-view';


export default class ProductSpecificationView extends Component{
    constructor(props){
        super(props);
        this.selectedIndexs = [-1,-1];
        this.specificationSize = undefined;
    }

    onSubmit(index){
        let specificationcolor = this.refs['specificationcolor'];
        let sep = this.specificationSize;
        console.log('submit clicked:' + this.selectedIndexs);
    }
    thumbSelectAtIndex(thunb,index){
        if (thunb.props.id === "specification color") {
            this.selectedIndexs[0] = index;
        }
        else
        {
            this.selectedIndexs[1] = index;
        }
    }

    render(){
        return <div className="specification">
            <ProductSpecificationGroupView
                thumbSelectAtIndex={this.thumbSelectAtIndex.bind(this)}
                id='specification color'
                title="颜色"
                thumbs={['1','2','3','4','5']}
                ref="specificationcolor" //ref用字符串的方式取值
            />
            <ProductSpecificationGroupView
                thumbSelectAtIndex={this.thumbSelectAtIndex.bind(this)}
                title="尺码"
                id="specification size"
                thumbs={['2','6','1','r','s']}
                ref={(ref) => this.specificationSize = ref} //ref 用回调函数的方式取值
            />
            <button
                onClick={this.onSubmit.bind(this)}>
                提交
            </button>
        </div>
    }
}