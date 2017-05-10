/**
 * Created by coin on 3/16/17.
 */

//筛选栏

import React, { Component } from 'react';
import './filter-bar.css';

export default class FilterBar extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (<div className="screening">
            <ul>
                <li className="curr">人气</li>
                <li>价格<img className="sort-icon" src="img/sort_desc.jpg"/></li>
                <li>销量</li>
                <li className="shaixuan">筛选</li>
            </ul>
        </div>)
    }
}



