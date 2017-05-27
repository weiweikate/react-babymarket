/**
 * Created by coin on 19/05/2017.
 */

/**
 * 确认订单
 */

import React from 'react';
import TCNavigationBar from '../../../common/nav/tc-navigation-bar';

import BMAdressView from './views/address-view';
import BMProductView from './views/product-view';
import BMTotalView from './views/totoal-view';
import BMBottomBar from './views/bottom-bar';


export default class BMConfirmOrder extends React.Component{
    state = {
        order:null,
    }

    componentDidMount() {
        this.readOrderInfo();
    }

    onLeftClick(){
        window.history.back();
    }
    submitBtnClicked(){
        console.log('submitBtnClicked');
        window.location.href = window.Tool.newHrefWithAction('pay-finish');
    }

    /**
     * 读取订单信息，刷新价格等信息
     * @param finishBlock
     */
    readOrderInfo(){
        let self = this;
        let orderId = window.Storage.read('orderId');
        let r = window.RequestWriteFactory.bmMemberInfoReadByPhone(orderId);
        r.finishBlock = (req,data) => {
            self.setState({
               order:data
            });
        };
    }



    render(){
        let {order} = this.state;
        return (
            <div>
                <TCNavigationBar
                    title="确认订单"
                    onLeftClick={this.onLeftClick.bind(this)}
                />
                <div style={styles.main}>
                    <BMAdressView/>
                    <BMProductView/>
                    <BMTotalView
                        price={order.money}
                        express={order.freight}
                        tax={order.tax}
                        due={order.total}
                    />
                    <BMBottomBar due={order.total} submitBtnClicked={this.submitBtnClicked.bind(this)}/>
                </div>
            </div>
        );
    }
}

const styles = {
    main:{
        marginTop:44,
    }
}
