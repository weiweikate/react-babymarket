/**
 * Created by coin on 3/29/17.
 */
import React, {Component} from 'react';
import './babymarket-download-mobile-btn.css';

export default class BabymarketDownloadMobileBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            link:props.link
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            link:props.link
        })
    }

    render(){
        return <a
            id={this.props.theId}
            href={this.state.link}
            className={this.props.isLast === true ? "bm-down-mobile-btn lastBtn":"bm-down-mobile-btn"}>

            <img
                className="bm-down-mobile-image" src={this.props.icon}
            />
            <span className="bm-down-mobile-title">
                {this.props.title}
            </span>
        </a>
    }
}