/**
 * Created by coin on 3/28/17.
 */

import React, {Component} from 'react';
import './babymarket-download-pc.css';

export default class BabymarketDownloadPC extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return <div className="bm-down-pc">
            <div className="bm-down-pc-topheader">
                <img className="bm-down-pc-topheader-icon" src="./img/babymarket-title-red.png"/>
                <span className="bm-down-pc-topheader-title">下载</span>
            </div>
            <div className="bm-down-pc-content">
                <img className="bm-down-pc-screenshot" src="./img/babymarket-screenshot-pc.png"/>
                <div className="bm-down-pc-des-container">
                    <span className="bm-down-pc-title">做真正的品质私享家</span>
                    <p className="bm-down-pc-des">打造一个会员专属福利平台<br/>主营跨境尖货与高端国货，100%正品保障<br/>满足会员一站式高品质家庭生活需求</p>
                    <div className="bm-down-pc-buttons">
                        <a id="mlinkButton" href={window.TCGlobal.BabymarketIOSDownloadURL}>
                            <img
                                className="bm-down-pc-ios bm-down-pc-btn"
                                src="./img/ios-icon-gray.png"
                            />
                        </a>
                        <a id="mlinkButton" href={window.TCGlobal.BabymarketAndroidDownloadURL}>
                            <img
                                className="bm-down-pc-android bm-down-pc-btn"
                                src="./img/android-icon-gray.png"
                            />
                        </a>
                        <img
                            className="bm-down-pc-qrcode bm-down-pc-btn"
                            src="./img/babymarket-qrcode.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    }
}