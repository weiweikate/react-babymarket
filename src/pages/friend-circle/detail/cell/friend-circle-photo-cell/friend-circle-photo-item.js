/**
 * Created by coin on 3/27/17.
 */
import React ,{Component} from 'react';
import './friend-circle-photo-item.css';

export default class FriendCirclePhotoItem extends Component{
    // constructor(props){
    //     super(props);
    // }

    imageURL(){
        let url = window.Tool.imageURLForId(this.props.photo.ImgId);
        return url;
    }

    render(){
        return <img className="fc-photo-item" src={this.imageURL()}/>
    }
}