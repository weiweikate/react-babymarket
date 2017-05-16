/**
 * Created by coin on 15/05/2017.
 */
import React from 'react';
import './bm-dy-detail-from.css';

export default class BMDyDetailFrom extends React.Component
{
    render(){
        return <span className="bm-dy-detail-from">{this.props.from}</span>
    }
}