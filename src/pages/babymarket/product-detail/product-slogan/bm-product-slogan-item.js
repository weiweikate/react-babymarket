/**
 * Created by coin on 4/6/17.
 */
import React,{Component} from 'react';
import './bm-product-slogan-item.css';

export default class BMProductSloganItem extends Component{
    render(){
        return <div className="bmpsi-content">
            <img src={this.props.imgsrc} className="bmpsi-image"/>
            <span className="bmpsi-title">
                {this.props.title}
            </span>
        </div>
    }
}