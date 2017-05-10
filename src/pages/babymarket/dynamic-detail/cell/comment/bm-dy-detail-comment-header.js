/**
 * Created by coin on 4/7/17.
 */

import React,{Component} from 'react';
import './bm-dy-detail-comment-header.css';

export default class BMDyDetailCommentHeader extends Component {
    render(){
        return <li className="bmddch-root">
            <div className="bmddch-sep"></div>
            <span className="bmddch-title">
                {this.props.count}条评论
            </span>
            <div className="bmddch-sepline"></div>
        </li>
    }
}


