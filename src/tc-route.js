/**
 * Created by coin on 4/7/17.
 */
import ReactDOM from 'react-dom';
import React ,{Component} from 'react';

import ProductDetail from './pages/product-detail/product-detail';
import FriendCircleDetail from './pages/friend-circle/detail/friend-circle-detail';

import BabymarketDynamicDetail from './pages/babymarket/dynamic-detail/babymarket-dynamic-detail';
import BabymarketProductDetail from './pages/babymarket/product-detail/babymarket-product-detail';
import BabymarketHelp from './pages/babymarket/help/babymarket-help';
import BabymarketSystemMessage from './pages/babymarket/system-message/babymarket-system-message';
import BabymarketReward from './pages/babymarket/reward/babymarket-reward';
import BabymarketWallet from './pages/babymarket/wallet/babymarket-wallet';

import BabymarketDownloadPC from './pages/download/babymarket/babymarket-download-pc';
import BabymarketDownloadMobile from './pages/download/babymarket/babymarket-download-mobile';

export default function initRoute() {
    console.info('start initRoute');
    let root = document.getElementById('root');
    let action = window.Tool.getURLParameter('action');
    let isMobile = window.isMobile;

    /**
     * Render the HTML
     */

    if ('product-detail' === action) {
        ReactDOM.render(<BabymarketProductDetail/>, root);
    }
    else if ('dynamic-detail' === action) {
        ReactDOM.render(<BabymarketDynamicDetail/>, root);
    }
    else if ('help' === action) {
        ReactDOM.render(<BabymarketHelp/>, root);
    }
    else if ('system-message' === action){
        ReactDOM.render(<BabymarketSystemMessage/>, root);
    }
    else if ('wallet' === action){
        ReactDOM.render(<BabymarketWallet/>, root);
    }
    else if ('reward' === action){
        let isSave = window.Tool.getURLParameter('isSave');
        ReactDOM.render(<BabymarketReward isSave={window.Tool.isTrue(isSave)}/>, root);
    }
    else {
        if (isMobile) {
            ReactDOM.render(<BabymarketDownloadMobile/>, root);
        }
        else {
            ReactDOM.render(<BabymarketDownloadPC/>, root);
        }
    }
    console.info('finish initRoute with action : ' + action);

    /**
     * 加载魔窗Mlink配置
     */
    setTimeout(()=> {
        window.loadMlink();
    },1000);
}
