/**
 * Created by coin on 4/6/17.
 */

import React,{Component} from 'react';
import './bm-product-info.css';

export default class BMProductInfo extends Component {
    constructor(props){
        super(props);
        this.isHoldingTitle = false;
    }

    rateText(){
        return  ((this.props.product.TaxRate === '0' || this.props.product.TaxRate === undefined) ? '' : '税率：'+parseFloat(this.props.product.TaxRate).toFixed(2) * 100 + '%');
    }

    expressText(){
        let {express} = this.props;
        if (express === '0' || express === undefined) {
            return '包邮';
        }
        else
            return ''+this.props.express+'元';
    }

    supplyText(){
        if (window.Tool.isEmptyStr(this.props.product.Warehouse)) {
            return '供货';
        }
        if (this.props.nation === '中国' || window.Tool.isEmptyStr(this.props.nation)) {
            return this.props.product.Warehouse + '供货';
        }
        else {
            return this.props.nation + '直供' + this.props.product.Warehouse + '供货';
        }
    }

    titleClicked(){
        window.JSBridge.sendDataToNative({
            title:this.props.product.ShowName,
            productId:this.props.product.Id
        },'productTitleClicked',null);
    }

    onTitleTouchStart(){
        this.isHoldingTitle = true;
        let self = this;
        setTimeout(() => {
            console.log('setTimeout');
            if (self.isHoldingTitle){
                self.isHoldingTitle = false;
                self.titleClicked();
            }
        },800);
        console.log('onTitleTouchStart');
    }

    onTitleTouchEnd(){
        this.isHoldingTitle = false;
        console.log('onTitleTouchEnd');
    }

    render(){
        return <div className="bmpi-content">
            <div className="bmpi-sep"></div>
            <span onTouchStart={this.onTitleTouchStart.bind(this)} onTouchEnd={this.onTitleTouchEnd.bind(this)} className="bmpi-title">{this.props.product.ShowName}</span>
            <p className="bmpi-des">{this.props.product.Subtitle}</p>
            <span className="bmpi-price">￥{this.props.product.SalePrice}</span>
            <div className="bmpi-country-base">
                <span className="bmpi-img">.</span>
                <span className="bmpi-country">{this.supplyText()}</span>
            </div>
            <div className="bmpi-express-base">
                <span className="bmpi-location">配送费：{this.props.product.Warehouse} 到 {this.props.province}</span>
                <span className="bmpi-express">{this.expressText()}</span>
                <span className="bmpi-tax">{this.rateText()}</span>
            </div>
        </div>
    }
}