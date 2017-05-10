/**
 * Created by coin on 4/5/17.
 */
import React ,{Component} from 'react';
import './bm-dy-detail-photo-item.css';

export default class BMDyDetailPhotoItem extends Component{

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
            img = window.Tool.imageURLForId(this.props.photo.ImgId);
        }
        return img;
    }

    componentWillReceiveProps(nextProps) {
        this.getImagesFromNative(nextProps);
    }

    getImagesFromNative(props){
        let oldURL = window.Tool.imageURLForId(props.photo.ImgId);
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

    render(){
        return <img
                id={this.props.id}
                className="bm-photo-item"
                src={this.imageURL()}
                onClick={this.props.imgClick}
            />
    }
}