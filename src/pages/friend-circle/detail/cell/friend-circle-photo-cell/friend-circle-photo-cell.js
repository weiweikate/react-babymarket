/**
 * Created by coin on 3/27/17.
 */
import React ,{Component} from 'react';
import './friend-circle-photo-cell.css';
import FriendCirclePhotoItem from './friend-circle-photo-item';

export default class FriendCirclePhotoCell extends Component{
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {

    }

    generatePhotos(){
        if (window.Tool.isValidArr(this.props.photos)) {
            let photos = [];
            let i = 0;
            this.props.photos.forEach(function (photo) {
                photos.push(<FriendCirclePhotoItem key={i} photo={photo}/>)
                i++;
            })
            return photos;
        }
    }
    render(){
        return <div className="fc-photo">
            {this.generatePhotos()}
        </div>
    }
}
