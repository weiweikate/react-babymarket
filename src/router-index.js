/**
 * Created by coin on 19/05/2017.
 */

import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import BMAddAddress from './pages/babymarket/web-order/address/bm-add-address';
import BMConfirmOrder from './pages/babymarket/web-order/confirm-order/bm-confirm-order';
import BMPayFinish from './pages/babymarket/web-order/pay-finish/bm-pay-finish';

export default class WebOrderIndex extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={BMAddAddress}/>
                    <Route path="/address/add" component={BMAddAddress}/>
                    <Route path="/order/confirm" component={BMConfirmOrder}/>
                    <Route path="/pay/finish" component={BMPayFinish}/>
                </div>
            </Router>
        );
    }
}