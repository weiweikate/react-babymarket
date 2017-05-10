/**
 * Created by coin on 4/6/17.
 */
import React, {Component} from 'react';
import './bm-product-slogan.css';
import BMProductSloganItem from './bm-product-slogan-item';

export default class BMProductSlogan extends Component{

    onClick(){
        if (window.inApp) {
            let data = {
                'productId':this.props.productId.Id
            };
            window.JSBridge.sendDataToNative(data,'productGuaranteeViewDidClicked');
        }
        else{
            window.location.href = document.location.protocol + '//www.babymarkt.com.cn/aqbz.aspx';
        }
    }

    render(){
        return <div onClick={this.onClick} className="bmps-content">
            <BMProductSloganItem imgsrc="./img/product_ziying_logo.png" title="码头自营"/>
            <BMProductSloganItem imgsrc="./img/product_zheng_logo.png" title="正品保证"/>
            <BMProductSloganItem imgsrc="./img/product_feiji_logo.png" title="海外直邮"/>
            <BMProductSloganItem imgsrc="./img/product_tui_logo.png" title="七天退货"/>
        </div>
    }
}




