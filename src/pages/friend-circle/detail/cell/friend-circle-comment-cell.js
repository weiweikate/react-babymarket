/**
 * Created by coin on 3/27/17.
 */

import React, { Component } from 'react';
import './friend-circle-comment-cell.css';

export default class FriendCircleCommentCell extends Component {
    // constructor(props){
    //     super(props);
    // }

    render()
    {
        return <div className="fc-comment">
            <img className="fc-comment-avatar" src=""/>
            <div className="fc-comment-contariner">
                <div className="fc-comment-name-time">
                    <span className="fc-comment-name">{this.props.comment.Person}</span>
                    <span className="fc-comment-time">{this.props.comment.DateTime}</span>
                </div>
                <span className="fc-comment-content">{this.props.comment.Content}</span>
            </div>
        </div>
    }
}