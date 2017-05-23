/**
 * Created by coin on 4/7/17.
 */
import ReactDOM from 'react-dom';
import React ,{Component} from 'react';

/**
 * 路由入口
 */
import WebOrderIndex from './router-index';

/**
 * 下载
 */
import BabymarketDownloadPC from './pages/download/babymarket/babymarket-download-pc';
import BabymarketDownloadMobile from './pages/download/babymarket/babymarket-download-mobile';

/**
 * 宝贝码头
 */
import BabymarketDynamicDetail from './pages/babymarket/dynamic-detail/babymarket-dynamic-detail';
import BabymarketProductDetail from './pages/babymarket/product-detail/babymarket-product-detail';
import BabymarketHelp from './pages/babymarket/help/babymarket-help';
import BabymarketSystemMessage from './pages/babymarket/system-message/babymarket-system-message';
import BabymarketReward from './pages/babymarket/reward/babymarket-reward';
import BabymarketWallet from './pages/babymarket/wallet/babymarket-wallet';
import BabymarketRefund from './pages/babymarket/refund/babymarket-refund';
import BabymarketRefundFinish from './pages/babymarket/refund/babymarket-refund-finish';

import BMAddAddress from './pages/babymarket/web-order/address/bm-add-address';
import BMConfirmOrder from './pages/babymarket/web-order/confirm-order/bm-confirm-order';
import BMPayFinish from './pages/babymarket/web-order/pay-finish/bm-pay-finish';
import ProvinceSelect from './pages/babymarket/web-order/province-select/province-select';

export default function initRoute() {
    console.info('start initRoute');
    let root = document.getElementById('root');
    let action = window.Tool.getURLParameter('action');
    let isMobile = window.isMobile;

    /**
     * Render the HTML
     */

    /**
     * 商品详情
     */
    if ('product-detail' === action) {
        ReactDOM.render(<BabymarketProductDetail/>, root);
    }

    /**
     * 动态
     */
    else if ('dynamic-detail' === action) {
        ReactDOM.render(<BabymarketDynamicDetail/>, root);
    }

    /**
     * 帮组
     */
    else if ('help' === action) {
        ReactDOM.render(<BabymarketHelp/>, root);
    }

    /**
     * 系统消息
     */
    else if ('system-message' === action){
        ReactDOM.render(<BabymarketSystemMessage/>, root);
    }

    /**
     * 我的资产
     */
    else if ('wallet' === action){
        ReactDOM.render(<BabymarketWallet/>, root);
    }

    /**
     * 奖励
     */
    else if ('reward' === action){
        let isSave = window.Tool.getURLParameter('isSave');
        ReactDOM.render(<BabymarketReward isSave={window.Tool.isTrue(isSave)}/>, root);
    }

    /**
     * 退款
     */
    else if ('refund' === action){
        ReactDOM.render(<BabymarketRefund/>, root);
    }

    /**
     * 退款完成
     */
    else if ('refund-finish' === action){
        ReactDOM.render(<BabymarketRefundFinish/>, root);
    }

    /**
     * 新增地址
     */
    else if ('add-address' === action) {
        ReactDOM.render(<BMAddAddress/>, root);
    }

    /**
     * 确认订单
     */
    else if ('confirm-order' === action ){
        ReactDOM.render(<BMConfirmOrder/>, root);
    }

    /**
     * 支付成功
     */
    else if ('pay-finish' === action ){
        ReactDOM.render(<BMPayFinish/>, root);
    }

    /**
     * 省市区选择
     */
    else if ('province-select' === action){
        ReactDOM.render(<ProvinceSelect/>,root);
    }

    /**
     * router
     */
    else if ('router' === action) {
        ReactDOM.render(<WebOrderIndex/>, root);
    }

    /**
     * 下载
     */
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
    if (window.inApp) {
        setTimeout(()=> {
            window.loadMlink();
        },1000);
    }
}
