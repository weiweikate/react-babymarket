/**
 * Created by coin on 4/6/17.
 */

import React,{Component} from 'react';
import './bm-product-dynamic-item.css';

export default class BMProductDynamicItem extends Component {

    createTime(){
        return window.Tool.timeDurationStringForDateString(this.props.dynamic.CreateTime);
    }

    render(){
        return <div className="bmpdi-content">
            <div className="bmpdi-sep"></div>
            <div className="bmpdi-user-time">
                <div className="bmpdi-userinfo">
                    <img className="bmpdi-avatar" src={window.Tool.avatarURLForId(this.props.dynamic.PictureId)}/>
                    <span className="bmpdi-name">{this.props.dynamic.NickName}</span>
                </div>
                <span className="bmpdi-time">{this.createTime()}</span>
            </div>
            <p className="bmpdi-des">{this.props.dynamic.Content}</p>
        </div>
    }
}


