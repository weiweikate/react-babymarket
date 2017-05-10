/**
 * Created by coin on 3/22/17.
 */

//规格标题 eg.颜色

import React ,{Component} from 'react';
import './product-specification-group-title-view.css';

export default class ProductSpecificationGroupTitleView extends Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        return <div className="specification-title">
           {this.props.title}
        </div>
    }
}