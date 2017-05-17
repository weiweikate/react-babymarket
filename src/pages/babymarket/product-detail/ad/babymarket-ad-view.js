/**
 * Created by coin on 4/5/17.
 */

import React ,{Component} from 'react';
import './babymarket-ad-view.css';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize ,bindKeyboard} from 'react-swipeable-views-utils';
import flowRight from 'lodash/flowRight';
import BabymarketPageControl from './page-control/babymarket-pagecontrol';

const EnhancedSwipeableViews = flowRight(
    autoPlay,
    virtualize,
    bindKeyboard
)(SwipeableViews);

export default class BabymarketADView extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectIndex:0,
            images:{},
        };
        this.imagesStates = {};
    }

    componentWillReceiveProps(nextProps) {
        this.getImagesFromNative(nextProps);
    }

    componentDidMount() {
    }

    getImagesFromNative(props){
        if (window.cacheImgByNative && window.inApp && props && window.Tool.isValidArr(props.images))
        {
            console.log('getImagesFromNative start');

            /**
             * 先下载第1张图片，再下载后面的图片
             */
            let self = this;
            let firstImageUrl = props.images[0];
            if (window.Tool.isValidStr(firstImageUrl)) {
                this.downloadImage(firstImageUrl,() => {
                    props.images.forEach((imgURL,index)=>{

                        /**
                         * 第一张不用再下载
                         */
                        if (index > 0) {
                            self.downloadImage(imgURL);
                        }
                    });
                });
            }
        }
    }

    downloadImage(imgURL,finishBlock){
        let state = this.imagesStates[imgURL];
        if (window.Tool.isValidStr(state) && state === 'finish') {
            return;
        }

        let self = this;
        let images = self.state.images;
        if (window.Tool.isEmptyStr(images[imgURL])) {
            images[imgURL] = window.TCGlobal.BabymarketDefaultImage;
            self.setState({
                images:images
            })
        }
        window.JSBridge.sendDataToNative({
            imgURL:imgURL + '&w=60&h=60',
        },'downloadImgForJS',(data) => {
            let oldURL = imgURL;//data[0];
            let newURL = data[1];
            let images = self.state.images;
            images[oldURL] = newURL;
            self.setState({
                images:images
            });

            window.JSBridge.sendDataToNative({
                imgURL:imgURL,
            },'downloadImgForJS',(data) => {
                let oldURL = data[0];
                let newURL = data[1];
                let images = self.state.images;
                images[oldURL] = newURL;
                self.imagesStates[oldURL] = 'finish';
                self.setState({
                    images:images
                });

                if (finishBlock) {
                    finishBlock();
                }
            });
        });
    }

    imageAtIndex(index){
        let img;

        /**
         * 大图下载由Native完成
         */
        if (window.cacheImgByNative && window.inApp) {
            let imgURL = this.props.images[index];
            img = this.state.images[imgURL];
        }
        else{
            img = this.props.images[index];
        }
        return img;
    }

    slideRenderer({key, index}){
        index = index % this.props.images.length;
        return <div
            className="product-detail-ad-content"
            key={key}
        >
            <img
                onClick={this.imgClick.bind(this)}
                className="product-detail-ad-img"
                src={this.imageAtIndex(index)}
                id={index}
            />
        </div>;
    };

    onChangeIndex(index){
        this.setState({
            selectIndex:index
        })
    }

    imgClick(e){
        let self = this;
        let index = Number(e.target.id);
        let image = e.target;

        let x = image.getBoundingClientRect().left;
        let y = image.getBoundingClientRect().top;
        let width = image.width;
        let height = image.height;
        if (width === undefined) {
            return;
        }

        x = x + document.documentElement.scrollLeft;
        y = y + document.documentElement.scrollTop;

        window.JSBridge.sendDataToNative({
            'index': index,
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'images':self.props.images
        },'imageDidClicked');
    }

    render(){
        return <div>
            <EnhancedSwipeableViews
                slideCount={this.props.images.length}
                onChangeIndex={this.onChangeIndex.bind(this)}
                slideRenderer={this.slideRenderer.bind(this)}
            />
            <BabymarketPageControl style={[{
                flex:1,
                position:'absolute',
                top:41,
                bottom:100,
                left:0,
                right:0,
            }]}
                itemCount={this.props.images.length}
                selectIndex={this.state.selectIndex}
            />
        </div>
    }
}
