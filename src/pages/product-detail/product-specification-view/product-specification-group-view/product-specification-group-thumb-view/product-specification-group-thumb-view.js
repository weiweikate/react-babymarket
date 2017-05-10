/**
 * Created by coin on 3/22/17.
 */

//规格选项 eg.红色

import React , {Component} from 'react';
import './product-specification-group-thumb-view.css';

export default class ProductSpecificationGroupThumbView extends Component {
    // constructor(props){
    //     super(props);
    // }

    stypeName(){
        return (this.props.tag === this.props.selectIndex) ? "specification-thumb select" : "specification-thumb";
    }

    render(){
        return <div
            id={this.props.tag}
            onClick={this.props.onPress}
            className={this.stypeName()}>
            {this.props.btnTitle}
        </div>
    }
}