/**
 * Created by coin on 3/28/17.
 */
import React, {Component} from 'react';
import './babymarket-download-mobile.css';
import BabymarketDownloadMobileBtn from './button/babymarket-download-mobile-btn';

export default class BabymarketDownloadMobile extends Component {

    link(){
        let fromId = window.Tool.getURLParameter('fromId');
        let link = window.Tool.mLinkDownloadURL(fromId);
        return link;
    }

    render(){
        return <div className="bm-down-mobile">
            <img
                className="bm-down-mobile-bg"
                src="./img/babymarket-screenshot-mobile.png"
            />

            <BabymarketDownloadMobileBtn
                theId='invite_download0'
                link={this.link()}
                title='下载Android版'
                icon='./img/android-icon-black.png'
            />
            <BabymarketDownloadMobileBtn
                theId='invite_download1'
                link={this.link()}
                isLast={true}
                title='访问App Store'
                icon='./img/ios-icon-black.png'
            />
            <span className="bm-down-mobile-des">老友好物分享App</span>
        </div>
    }
}





