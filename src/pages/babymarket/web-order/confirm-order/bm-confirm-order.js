/**
 * Created by coin on 19/05/2017.
 */

/**
 * 确认订单
 */

import React from 'react';
import BMAdressView from './views/address-view';
import BMProductView from './views/product-view';
import TCNavigationBar from '../../../common/nav/tc-navigation-bar';

export default class BMConfirmOrder extends React.Component{

    onLeftClick(){
        window.history.back();
    }

    render(){
        return (
            <div>
                <TCNavigationBar
                    title="确认订单"
                    onLeftClick={this.onLeftClick.bind(this)}
                />
                <div style={styles.main}>
                    <BMAdressView/>
                    <BMProductView/>
                    confirm order
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
