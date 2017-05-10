/**
 * Created by coin on 3/21/17.
 */

//产品详情

import React,{Component} from 'react';
import ProductSpecificationView from './product-specification-view/product-specification-view';
import './product-detail.css';
import ADView from './ad-view/ad-view';
import RequestReadFactory from '../../requests/request_read_factory';
import Tool from '../../tools/tool';

export default class ProductDetail extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {

        //登陆
        let r = RequestReadFactory.login('zhujianting','zhujianting');
        r.finishBlock = (req) => {
            console.log('Session:' + req.responseObject.Session);
            let session = req.responseObject.Session;
            if (Tool.isValidStr(session)) {

                //记录用户名
                // window.Storage.setLoginUserName(this.data.usernameText);

                //标记已登录
                window.Storage.setDidLogin(true);

                //保存session
                window.Storage.setCurrentSession(session);

                //返回
                Tool.navigationPop();
            }
            else
            {
                Tool.showAlert('登录失败!!!');
            }
        };
        r.completeBlock = () => {
            Tool.hideLoading();
        };
        r.start();
        Tool.showLoading();
    }

    render(){
        return <div className="product-detail">
            <ADView/>
            <ProductSpecificationView/>
        </div>
    }
}
