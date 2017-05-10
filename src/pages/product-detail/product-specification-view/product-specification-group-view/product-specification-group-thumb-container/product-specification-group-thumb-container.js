/**
 * Created by coin on 3/22/17.
 */

//规格列表容器

import React, {Component} from 'react';
import './product-specification-group-thumb-container.css';
import ProductSpecificationGroupThumbView from '../product-specification-group-thumb-view/product-specification-group-thumb-view';

export default class ProductSpecificationGroupThumbContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectIndex:-1,
            thumbs:[]
        };
    }

    onClick(e){
        let index = Number(e.target.id);
        this.setState({
            selectIndex:index
        })
        this.props.thumbSelectAtIndex(this,index);
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return true;
    }

    generateThumbs(){
        let arr = [];
        let titleArray = this.props.thumbs;
        for (let i = 0;i<titleArray.length;i++)
        {
            let a = <ProductSpecificationGroupThumbView
                selectIndex={this.state.selectIndex}
                tag={i}
                onPress={this.onClick.bind(this)}
                btnTitle={titleArray[i]}
                key={i}
            />;

            arr.push(a);
        }
        return arr;
    }
    render(){
        return <div className="specification-thumb-container">
            {this.generateThumbs()}
        </div>
    }
}