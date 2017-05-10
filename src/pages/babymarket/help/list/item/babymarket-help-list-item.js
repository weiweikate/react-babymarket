/**
 * Created by coin on 4/13/17.
 */
import React,{Component} from 'react';
import './babymarket-help-list-item.css';
import TCSeparationLine from '../../../../common/tc-separation-line';

export default class BabymarketHelpListItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            isExpand:false
        }
    }

    onClick(){
        this.setState({
            isExpand:!this.state.isExpand
        })
    }

    iconSrc(){
        return !this.state.isExpand ? './img/babymarket-help-down.png' : './img/babymarket-help-up.png';
    }

    pClassName(){
        return this.state.isExpand ? "bmhli-content" : "bmhli-content-hidden";
    }

    render(){
        return <li
            onClick={this.onClick.bind(this)}
            className="bmhli-root">

            <div className="bmhli-top">

                <span
                    className="bmhli-title">{this.props.title}
                </span>

                <img
                    src={this.iconSrc()}
                    className="bmhli-right-icon"/>

            </div>
            <TCSeparationLine/>
            <p
                className={this.pClassName()}>
                {this.props.content}
            </p>
            <TCSeparationLine/>
        </li>
    }
}


