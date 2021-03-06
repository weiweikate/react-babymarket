/**
 * Created by coin on 4/6/17.
 */

import React,{Component} from 'react';
import './bm-product-info.css';

export default class BMProductInfo extends Component {
    constructor(props){
        super(props);
        this.isHoldingTitle = false;
        this.state = {
            isInside:false
        };
    }

    componentDidMount() {
        let self = this;
        window.Storage.currentMemberInfoAsync((member) => {
            self.setState({
                isInside:window.Tool.isTrue(member.Inside)
            })
        });
    }

    rateText(){
        return  ((this.props.product.TaxRate === '0' || this.props.product.TaxRate === undefined) ? '' : '税率：'+parseFloat(this.props.product.TaxRate).toFixed(2) * 100 + '%');
    }

    expressText(){
        let {express} = this.props;
        if (this.props.product.FreePost == 'True') {
            return '包邮';
        }
        if (express == 0 || express === undefined) {
            return '包邮';
        }
        else
            return '首重'+this.props.express+'元';
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
        // this.isHoldingTitle = true;
        // let self = this;
        // setTimeout(() => {
        //     console.log('setTimeout');
        //     if (self.isHoldingTitle){
        //         self.isHoldingTitle = false;
        //         self.titleClicked();
        //     }
        // },2000);
        // console.log('onTitleTouchStart');
    }

    onTitleTouchEnd(){
        this.isHoldingTitle = false;
        console.log('onTitleTouchEnd');
    }

    priceSubfix(){
        // return window.Storage.didLogin() ? <img src="./img/price-subfix.png" className="bmpi-price-subfix"/>: "";
        return <img src="./img/price-subfix.png" className="bmpi-price-subfix"/>;
    }
    price(){
        return this.props.product.SalePrice;
    }

    oldPrice(){
        // if (this.props.product.LYPrice === this.price() || this.props.product.LYPrice == 0) {
        //     return "";
        // }
        return '￥' + this.props.product.LYPrice;
        // return window.Storage.didLogin() ? '￥' + this.props.product.LYPrice : "";
    }

    importIcon(){
        console.log('是否是进口 ： ' + this.props.product.Import);
        if (window.Tool.isTrue(this.props.product.Import)){
            return <span style={{
                border:'1px solid #f0cd74',
                borderRadius:5,
                color:'#f0cd74',
                fontSize:14,
                padding:4,
                paddingTop:2,
                paddingBottom:0,
                marginLeft:10,
                display:'inline',
            }}>保税</span>
        }
    }

    buyButton(){
        if (!window.inApp) {
            // return <span onClick={this.buyBtnClicked.bind(this)} className="bmpi-buy-button">立即购买</span>;
        }
    }

    buyBtnClicked(){
        let {Storage:s} = window;
        let {product:p} = this.props;
        s.write('product-id',p.Id);
        s.write('product-imgId',p.ImgId);
        s.write('product-price',p.SalePrice);
        s.write('product-title',p.ShowName);
        s.write('product-subtitle',p.Subtitle);

        window.location.href = window.Tool.newHrefWithAction('add-address');
    }

    render(){
        return <div className="bmpi-content">
            <div className="bmpi-sep"></div>
            <div style={{
                display:'block',
                marginTop:10
            }}>
                {this.importIcon()}
                <div onTouchStart={this.onTitleTouchStart.bind(this)} onTouchEnd={this.onTitleTouchEnd.bind(this)} className="bmpi-title">{this.props.product.ShowName}</div>
            </div>
            <p className="bmpi-des">{this.props.product.Subtitle}</p>
            <div className="bmpi-price-container">
                <span className="bmpi-price">￥{this.price()} {this.priceSubfix()}</span>
                <span className="bmpi-old-price">{this.oldPrice()}</span>
                {this.buyButton()}
            </div>
            <div className="bmpi-country-base">
                <span className="bmpi-country">{this.supplyText()}</span>
            </div>
            <div className="bmpi-express-base">
                <span className="bmpi-location">配送费：{this.props.product.Warehouse}到{this.props.province}</span>
                <span className="bmpi-express">{this.expressText()}</span>
                <span className="bmpi-tax">{this.rateText()}</span>
            </div>
        </div>
    }
}


