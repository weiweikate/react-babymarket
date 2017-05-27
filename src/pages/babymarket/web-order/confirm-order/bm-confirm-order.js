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
        order:{
            Money:'',
            Freight:'',
            Tax:'',
            Total:''
        },
    }

    componentDidMount() {
        this.readOrderInfo();
    }

    onLeftClick(){
        window.history.back();
    }

    submitBtnClicked(){
        console.log('submitBtnClicked');
        // window.location.href = window.Tool.newHrefWithAction('pay-finish');
        let orderId = window.Storage.read('orderId');
        window.location.href = 'https://www.babymarkt.com.cn/pay.aspx?Id=' + orderId;
    }

    /**
     * 读取订单信息，刷新价格等信息
     * @param finishBlock
     */
    readOrderInfo(){
        let self = this;
        let orderId = window.Storage.read('orderId');
        let r = window.RequestReadFactory.bmOrderDetailRead(orderId);
        r.finishBlock = (req,data) => {
            self.setState({
               order:data
            });
        };
        r.start();
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
                        price={order.Money}
                        express={order.Freight}
                        tax={order.Tax}
                        due={order.Total}
                    />
                    <BMBottomBar due={order.Total} submitBtnClicked={this.submitBtnClicked.bind(this)}/>
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
