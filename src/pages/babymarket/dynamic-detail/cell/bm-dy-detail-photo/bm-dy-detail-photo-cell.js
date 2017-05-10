/**
 * Created by coin on 4/5/17.
 */
import React ,{Component} from 'react';
import './bm-dy-detail-photo-cell.css';
import BMDyDetailPhotoItem from './bm-dy-detail-photo-item';

export default class BMDyDetailPhotoCell extends Component{
    constructor(props){
        super(props);
        this.imageURLs = [];
    }

    componentDidMount() {

    }

    imgClick(e){
        let index = Number(e.target.id);
        let type = this.props.type;
        if (type != 'normal') {
            let productInfo = this.props.data.OrderNoteDetail[index];
            let data = {
                'productId':productInfo.ProductId
            };
            window.JSBridge.sendDataToNative(data,'productClicked');
        }
        else{
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

            let data = {
                'index': index,
                'x': x,
                'y': y,
                'width': width,
                'height': height,
                'images':this.imageURLs
            };
            window.JSBridge.sendDataToNative(data,'imageDidClicked');
        }
    }

    generatePhotos(){
        if (window.Tool.isValidArr(this.props.data)) {
            let photos = [];
            this.imageURLs = [];
            let i = 0;
            let self = this;
            let type = this.props.type;
            let imgs = type === 'normal' ? this.props.data.Img_List : this.props.data.OrderNoteDetail;
            imgs.forEach(function (photo) {
                photos.push(<BMDyDetailPhotoItem
                    id={i}
                    key={i}
                    photo={photo}
                    imgClick={self.imgClick.bind(self)}/>)
                self.imageURLs.push(window.Tool.imageURLForId(photo.ImgId));
                i++;
            })
            return photos;
        }
    }
    render(){
        return <div className="bm-photo">
            {this.generatePhotos()}
        </div>
    }
}