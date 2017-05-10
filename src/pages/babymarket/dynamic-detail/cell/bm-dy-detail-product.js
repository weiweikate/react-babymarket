/**
 * Created by coin on 25/04/2017.
 */
import React from 'react';
import TCGlobal,{
    Tool,
    Storage,
    JSBridge,
    Network,
    TCBaseComponet,
    TCPullLoadComponet,
    TCSeparationLine,
    TCNavigationBar,
} from '../../../../tools/tcglobal';
import './bm-dy-detail-product.css';

export default class BMDynamicDetailProduct extends TCBaseComponet{

    onClick(){
        let data = {
            'productId':this.props.productId
        };
        JSBridge.sendDataToNative(data,'productClicked');
    }
    render(){
        return <div onClick={this.onClick.bind(this)} className="bmdyd-product-root">
            <img
                src={Tool.imageURLForId(this.props.img)}
                className="bmdyd-product-img"/>

            <div className="bmdyd-product-right">
                <span className="bmdyd-product-title">{this.props.title}</span>
                <p className="bmdyd-product-des">{this.props.des}</p>
            </div>
        </div>
    }
}