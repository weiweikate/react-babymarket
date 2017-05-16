/**
 * Created by coin on 4/5/17.
 */
import React,{Component} from 'react';
import './babymarket-dynamic-detail.css';
import TCPullLoadComponet from '../../common/tc-pull-load-componet';

import BMDyDetailContent from './cell/bm-dy-detail-content';
import BMDyDetailComment from './cell/comment/bm-dy-detail-comment';
import BMDyDetailMenu from './cell/bm-dy-detail-menu';
import BMDyDetailPhotoCell from './cell/bm-dy-detail-photo/bm-dy-detail-photo-cell';
import BMDyDetailCommentHeader from './cell/comment/bm-dy-detail-comment-header';
import BMDownloadBar from '../download-bar/bm-download-bar';
import BMDynamicDetailProduct from './cell/bm-dy-detail-product';
import BMDyDetailFrom from './cell/bm-dy-detail-from';

import ReactPullLoad,{ STATS } from 'react-pullload';

export default class BabymarketDynamicDetail extends TCPullLoadComponet {

    constructor(props){
        super(props);
        this.mainId = '';
        this.state = {
        };
        this.inheritStateFromSuper();
    }

    componentDidMount() {
        this.requestData();
    }

    /**
     * 刷新主入口
     */
    requestData(){
        let theId = window.Tool.getURLParameter('Id');
        if (window.Tool.isEmptyStr(theId)) {
            alert('Id不能为空');
        }
        this.mainId = theId;
        this.requestDetail(theId);
        this.refreshRequest();
    }

    /**
     * 详情
     * @param theId
     */
    requestDetail(theId){
        let r = window.RequestReadFactory.dynamicDetailRead(theId);
        let self = this;
        r.finishBlock = (req,data) => {
            if (window.Tool.isValidObject(data)) {
                self.setState({
                    data:data,
                })
            }
        };
        r.start();
    }

    /**
     * 生成刷新的请求
     */
    generateRefreshRequest(){
        let r = window.RequestReadFactory.dynamicDetailCommentsRead(this.mainId);
        return r;
    }

    /**
     * 生成加载更多的请求
     */
    generateLoadMoreRequest(){
        let r = window.RequestReadFactory.dynamicDetailCommentsRead(this.mainId,this.state.index);
        return r;
    }

    generatePhotos(){
        if (window.Tool.isValidArr(this.state.data)) {
            if ('Normal' === this.dynamicType()) {
                return <BMDyDetailPhotoCell key={90002} type="normal" data={this.state.data}/>;
            }
            else if ('Product' === this.dynamicType()) {
                return <BMDynamicDetailProduct
                    title={this.state.data.ProductName}
                    des={this.state.data.ProductDescription}
                    img={this.state.data.ProductImgId}
                    productId={this.state.data.SourceId}
                    key={90001}
                />
            }
            else if ('Order' === this.dynamicType()) {
                return <BMDyDetailPhotoCell key={90000} type="order" data={this.state.data}/>;
            }
        }
    }

    generateComments(){
        if (window.Tool.isValidArr(this.state.itemDatas)) {
            let comments = [];
            comments.push(<BMDyDetailCommentHeader count={this.state.total} key={99}/>);

            let i = 0;
            this.state.itemDatas.forEach(function (comment) {
                comments.push(<BMDyDetailComment key={i + 100} comment={comment}/>)
                i++;
            });
            return comments;
        }
    }

    generateDownloadBar(){
        if (!window.inApp) {
            return <BMDownloadBar key={5}/>
        }
    }

    dynamicType(){
        if (window.Tool.isValidStr(this.state.data.SourceId)) {
            let SourceType = this.state.data.SourceType;
            if (window.Tool.isValidStr(SourceType)) {
                // 订单(Order), 产品(Product)
                return this.state.data.SourceType;
            }
            else{
                return 'Normal';
            }
        }
        else
        {
            return 'Normal';
        }
    }

    /**
     * 生成主内容视图
     * @returns {Array}
     */
    generateContent(){
        let arr = [];
        arr.push(<BMDyDetailContent
            key={0}
            data={this.state.data}
        />);
        arr.push(this.generatePhotos());

        if ('Order' === this.dynamicType()) {
            console.log('is from order');
            arr.push(<BMDyDetailFrom key={4} from="来自于订单分享"/>);
        }

        arr.push(<BMDyDetailMenu
            data={this.state.data}
            key={2}
            dynamicId={this.state.data.Id}
        />);

        arr.push(<ul
            key={3}
            style={{padding:0,margin:0}}>
            {this.generateComments()}
        </ul>);
        arr.push(this.generateDownloadBar());

        return arr;
    }

    render(){

        return <div className="babymarket-root">
            {this.generatePullLoad()}
        </div>
    }
}


