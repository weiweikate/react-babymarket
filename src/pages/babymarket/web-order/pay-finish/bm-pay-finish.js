/**
 * Created by coin on 19/05/2017.
 */

import React from 'react';
import BMPayFinishHeader from './views/header-view';
import TCNavigationBar from '../../../common/nav/tc-navigation-bar';
import BMPayFinishInfoView from './views/info-view';

export default class BMPayFinish extends React.Component{

    onLeftClick(){
        window.history.back();
    }

    render(){
        return <div>
            <TCNavigationBar
                title="付款成功"
                onLeftClick={this.onLeftClick.bind(this)}
            />
            <div style={styles.main}>
                <BMPayFinishHeader/>
                <BMPayFinishInfoView orderNo={'fsfsfsffsf'}/>
            </div>
        </div>
    }
}

const styles = {
    main:{
        marginTop:44,
    }
}