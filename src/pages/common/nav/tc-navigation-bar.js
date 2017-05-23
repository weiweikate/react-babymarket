/**
 * Created by coin on 4/17/17.
 */
import React,{Component} from 'react';
import './tc-navigation-bar.css';

export default class TCNavigationBar extends Component{
    titleView(){
        if (this.props.titleView) {
            return this.props.titleView;
        }
        return <span className="tc-navigation-title">{this.props.title}</span>;
    }

    generateRightBarButton(){
        if (window.Tool.isValidStr(this.props.rightText)) {
            return <span
                onClick={this.props.onRightClick}
                className="tc-navigation-right"
                style={{height:40}}
            >
                {this.props.rightText}
            </span>
        }
        else if (window.Tool.isValidStr(this.props.rightImage)){
            return <img
                onClick={this.props.onRightClick}
                src={this.props.rightImage}
                className="tc-navigation-right"
                style={{height:40}}
            />
        }
        else{
            return <img
                className="tc-navigation-right"
            />
        }
    }

    render(){
        return <div
            className="tc-navigation-root"
            style={{backgroundColor:window.TCGlobal.BabymarketMainColor}}
        >

            <img
                onClick={this.props.onLeftClick}
                src="/img/babymarket-back-arrow-white.png"
                className="tc-navigation-left"
            />

            {this.titleView()}

            {this.generateRightBarButton()}

        </div>
    }
}
