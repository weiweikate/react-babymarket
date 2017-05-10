/**
 * Created by coin on 4/13/17.
 */
import React, {Component} from 'react';
import './babymarket-help.css';

import BabymarketHelpTopbar from './topbar/babymarket-help-topbar';
import BabymarketHelpSwitcher from './switch-button/babymarket-help-switcher';
import BabymarketHelpList from './list/babymarket-help-list';
import TCSeparationLine from '../../common/tc-separation-line';

export default class BabymarketHelp extends Component {
    render(){
        return <div style={{backgroundColor:"white"}}>
            <BabymarketHelpTopbar/>
            <TCSeparationLine height={12}/>
            <BabymarketHelpSwitcher/>
            <TCSeparationLine/>
            <BabymarketHelpList/>
        </div>
    }
}