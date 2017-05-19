/**
 * Created by coin on 18/05/2017.
 */

import React from 'react';
import TCNavigationBar from '../../../common/nav/tc-navigation-bar';

export default class BMAddAddress extends React.Component{

    onRightClick(){
        window.history.back();
    }

    onLeftClick(){
        window.history.back();
    }

    render(){
        return (
            <div>
                <TCNavigationBar
                    rightText="完成"
                    title="收货地址"
                    onRightClick={this.onRightClick.bind(this)}
                    onLeftClick={this.onLeftClick.bind(this)}
                />
                add address
            </div>
        );
    }
}


