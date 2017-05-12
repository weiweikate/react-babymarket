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

    constructor(props){
        super(props);
        this.state = {
            imgURL:''
        }
        this.getImagesFromNative(props);
    }

    imageURL(){
        let img;

        /**
         * 大图下载由Native完成
         */
        if (window.cacheImgByNative && window.inApp) {
            img = this.state.imgURL;
        }
        else{
            img = window.Tool.imageURLForId(this.props.img);
        }
        return img;
    }

    componentWillReceiveProps(nextProps) {
        this.getImagesFromNative(nextProps);
    }

    getImagesFromNative(props){
        let oldURL = window.Tool.imageURLForId(props.img);
        if (window.Tool.isEmptyStr(this.state.imgURL)){
            this.setState({
                imgURL:window.TCGlobal.BabymarketDefaultImage
            })
        }

        window.JSBridge.sendDataToNative({
            imgURL:oldURL,
        },'downloadImgForJS',(data) => {
            let oldURL = data[0];
            let newURL = data[1];
            this.setState({
                imgURL:newURL
            })
        });
    }

    onClick(){
        let data = {
            'productId':this.props.productId
        };
        JSBridge.sendDataToNative(data,'productClicked');
    }

    render(){
        return <div onClick={this.onClick.bind(this)} className="bmdyd-product-root">
            <img
                src={this.imageURL()}
                className="bmdyd-product-img"/>

            <div className="bmdyd-product-right">
                <span className="bmdyd-product-title">{this.props.title}</span>
                <p className="bmdyd-product-des">{this.props.des}</p>
            </div>
        </div>
    }
}