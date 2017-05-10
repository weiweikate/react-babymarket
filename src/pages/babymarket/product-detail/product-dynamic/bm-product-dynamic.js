/**
 * Created by coin on 4/6/17.
 */

import React,{Component} from 'react';
import './bm-product-dynamic.css';
import BMProductDynamicItem from './bm-product-dynamic-item';

export default class BMProductDynamic extends Component{

    onClick(){
        let data = {
            'productId':this.props.productId
        };
        window.JSBridge.sendDataToNative(data,'productRelatedDynamicDidClicked');
    }

    render(){
        return <div onClick={this.onClick.bind(this)} className="bmpd-content">
            <div className="bmpd-topbar">
               <span>相关动态({this.props.count})</span>
                <span>查看全部 ></span>
            </div>
            <BMProductDynamicItem dynamic={this.props.dynamic}/>
        </div>
    }
}
