/**
 * Created by coin on 3/27/17.
 */

import React,{Component} from 'react';
import './friend-circle-like-cell.css';

export default class FriendCircleLikeCell extends Component {
    // constructor(props){
    //     super(props);
    // }

    generateLikes(){
        if (window.Tool.isValidArr(this.props.likes)) {
            let photos = [];
            let i = 0;
            this.props.likes.forEach(function (like) {
                photos.push(<span key={i} className="fc-like-img">{like.PersonName}</span>)
                i++;
            })
            return photos;
        }
    }
    render(){
        return <div className="fc-like-content">
            {this.generateLikes()}
        </div>
    }
}
