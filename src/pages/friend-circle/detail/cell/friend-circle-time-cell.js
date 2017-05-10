/**
 * Created by coin on 3/27/17.
 */

import React, {Component} from 'react';
import './friend-circle-time-cell.css';

export default class FriendCircleTimeCell extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return <div className="fc-time">
            <div className="fc-time-text">
                <span className="fc-time-time">{this.props.time}</span>
                {/*<span className="fc-time-delete">删除</span>*/}
            </div>
            <img className="fc-time-menubtn" src=""/>
        </div>
    }
}
