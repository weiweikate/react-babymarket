/**
 * Created by coin on 3/27/17.
 */

import React ,{Component} from 'react';
import './friend-circle-content-cell.css';

export default class FriendCircleContentCell extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return <div className="fc-content">
            <img className="fc-avatar" src={window.Tool.imageURLForId(this.props.avatar)}/>
            <div className="fc-text-contariner">
                <span className="fc-name">{this.props.name}</span>
                <span className="fc-content">{this.props.content}</span>
            </div>
        </div>
    }
}