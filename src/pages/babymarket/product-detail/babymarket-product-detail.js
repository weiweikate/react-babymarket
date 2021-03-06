/**
 * Created by coin on 4/5/17.
 */

import React ,{ Component } from 'react';
import './babymarket-product-detail.css';
import BabymarketADView from './ad/babymarket-ad-view';
import BMProductInfo from './product-info/bm-product-info';
import BMProductSlogan from './product-slogan/bm-product-slogan';
import BMProductDynamic from './product-dynamic/bm-product-dynamic';
import BMDownloadBar from '../download-bar/bm-download-bar';
export default class BabymarketProductDetail extends Component {

    constructor(props){
        super(props);
        let province = window.Storage.read('province');
        province = (window.Tool.isValidStr(province) ? province : '浙江');
        this.state = {
            product:{},
            images:[],
            nation:'',
            province:province,
            express:'0',
            dynamic:{},
            dynamicCount:0,
        };
        this.productId = '';
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        let theId = window.Tool.getURLParameter('Id');

        if (window.Tool.isEmptyStr(theId)) {
            alert('Id不能为空');
        }

        this.productId = theId;

        this.requestProductInfo(theId);
        this.requestAttatchments(theId);
        this.requestDynamic(theId);
    }

    //商品详情
    requestProductInfo(theId){
        if (window.Tool.isEmptyStr(theId)) {
            window.Tool.showAlert('商品Id为空');
        }

        let r = window.RequestReadFactory.productDetailRead(theId);
        let self = this;
        r.finishBlock = (req,firstData) => {
            if (window.Tool.isValidObject(firstData)) {
                let images = this.state.images;
                images.unshift(window.Tool.imageURLForId(firstData.ImgId));

                // if (window.Storage.didLogin()) {
                    let tempPrice = firstData.SalePrice;
                    firstData.SalePrice = firstData.LYPrice;
                    firstData.LYPrice = tempPrice;
                // }
                // else{
                //     firstData.LYPrice = "0";
                // }

                self.setState({
                    product:firstData,
                    images:images
                })
                self.requestNation(firstData.NationalKey);
                self.requestExpressInfo();

                /**
                 * App内部，用JSBridge 获取位置信息
                 * 浏览器中，用百度地图获取位置信息
                 */
                self.requestLocation();
            }
            else
            {
                window.Tool.showAlert('商品不存在或已下架');
            }
        };
        r.completeBlock = () => {
        };
        r.start();
    }

        //附件
    requestAttatchments(theId){
        let r2 = window.RequestReadFactory.attachmentsRead(theId);
        let self = this;
        r2.finishBlock = (req) => {
            let Datas = req.responseObject.Datas;
            let images = this.state.images;
            if (window.Tool.isValidArr(Datas)) {
                Datas.forEach((data) => {
                    images.push(window.Tool.imageURLForId(data.Id));
                });

                self.setState({
                    images:images
                })
            }
        };
        r2.completeBlock = () => {
        };
        r2.start();
    }

    //国家信息
    requestNation(theKey){
        let r = window.RequestReadFactory.productNationRead(theKey);
        let self = this;
        r.finishBlock = (req,data) => {
            if (window.Tool.isValidObject(data)) {
                self.setState({
                    nation:data.Name
                })
            }
        };
        r.start();
    }

    //运费
    requestExpressInfo(){
        let r = window.RequestReadFactory.expressRuleRead(this.state.product.StoreId,this.state.province);
        let self = this;

        r.finishBlock = (req,data) => {
            if (window.Tool.isValidObject(data)) {
                self.setState({
                    express:data.Express_Fee
                })
            }
        };
        r.start();
    }

    /**
     * 获取位置信息，计算运费
     */
    requestLocation(){
        let self = this;
        if (window.inApp) {
            window.JSBridge.sendDataToNative({},'getProvinceFromNative',(province) => {
                if (window.Tool.isEmptyStr(province)) {
                    return;
                }
                self.setState({
                    province:province
                })
                self.requestExpressInfo();
            });
        }
        else{
            // window.Tool.getCurrentLocation((lat,lng) => {
            //     window.Tool.getReverseGeocodingData(lat,lng,(location) => {
            //         if (window.Tool.isEmptyStr(location.province)) {
            //             return;
            //         }
            //         self.setState({
            //             province:location.province
            //         })
            //         self.requestExpressInfo();
            //     });
            // });
        }
    }

    /**
     * 获取相关动态
     * @param theId
     */
    requestDynamic(theId){
        let self = this;
        let r = window.RequestReadFactory.productRelativeDynamicRead(theId);
        r.finishBlock = (req,data) => {
            if (window.Tool.isValidObject(data)) {
                self.setState({
                    dynamic:data,
                    dynamicCount:req.responseObject.Total
                })
            }
        }
        r.start();
    }

    /**
     * 提示下载or打开
     * @returns {XML}
     */
    generateDownloadBar(){
        if (!window.inApp) {
            // return <BMDownloadBar/>
            return <a className='buy-bar-link' href={this.downloadLink()}><img className="buy-bar" src="./img/buy-bar.png"/></a>
        }
    }

    /**
     * 动态
     * @returns {XML}
     */
    generateDynamic(){
        if (window.Tool.isValidObject(this.state.dynamic)) {
            return <BMProductDynamic productId={this.state.product.Id} count={this.state.dynamicCount} dynamic={this.state.dynamic}/>
        }
    }

    setIframeHeight(iframe) {
        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            }
        }
    };

    iframeOnLoad(){
        let iframe = document.getElementById('external-frame');
        this.setIframeHeight(iframe)
    }

    downloadLink(){
        let fromId = window.Tool.getURLParameter('fromId');
        let theId = window.Tool.getURLParameter('Id');
        let productId = '';
        let dynamicId = '';

        if (window.action === 'product-detail') {
            productId = theId;
        }
        else if (window.action === 'dynamic-detail') {
            dynamicId = theId;
        }
        let link = window.Tool.mLinkDownloadURL(fromId,productId,dynamicId);
        return link;
    }

    generateWebDetail(){
        if (!window.inApp) {
            let src = window.Network.sharedInstance().productWebUrl + '?Id=' + this.state.product.Id;
            return <iframe className="web-detail" src={src} id="external-frame"></iframe>
        }
    }

    render(){
        return <div className="bmp-detail-content">
            <BabymarketADView images={this.state.images}/>
            <BMProductInfo
                product={this.state.product}
                nation={this.state.nation}
                province={this.state.province}
                express={this.state.express}
            />
            <BMProductSlogan product={this.state.product}/>
            {this.generateDynamic()}
            {this.generateWebDetail()}
            {this.generateDownloadBar()}
        </div>
    }
}


