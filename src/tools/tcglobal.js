/**
 * Created by coin on 3/14/17.
 */

import Tool from './tool';
import RequestWriteFactory from '../requests/request_write_factory';
import RequestReadFactory from '../requests/request_read_factory';
import Storage from './storage';
import JSBridge from './jsbridge';
import Network from '../requests/network';
import TCBaseComponet from '../pages/common/tc-base-componet';
import TCPullLoadComponet from '../pages/common/tc-pull-load-componet';
import TCSeparationLine from '../pages/common/tc-separation-line';
import TCNavigationBar from  '../pages/common/nav/tc-navigation-bar';

let TCGlobal = {
    Tool:Tool,
    Storage:Storage,
    JSBridge:JSBridge,
    Network:Network,
    TCBaseComponet:TCBaseComponet,
    TCPullLoadComponet:TCPullLoadComponet,
    TCSeparationLine:TCSeparationLine,
    TCNavigationBar:TCNavigationBar,

    RequestWriteFactory:RequestWriteFactory,
    RequestReadFactory:RequestReadFactory,

    BabymarketAndroidDownloadURL:document.location.protocol + '//a.app.qq.com/o/simple.jsp?pkgname=com.babymarkt',
    BabymarketIOSDownloadURL:document.location.protocol + '//itunes.apple.com/cn/app/bao-bei-ma-tou/id1059636342?ls=1&mt=8',
    BabymarketMLinkDownloadURL:document.location.protocol + '//a.mlinks.cc/AKXd',

    BabymarketMainColor:"#715329",

    BabymarketDefaultAvatar:'./img/avatar-placeholder.png',
    BabymarketDefaultImage:'./img/defualt_loading_square_bg.png',
    EmptyId:"00000000-0000-0000-0000-000000000000",

    onImageLoadError:(e) => {
        let img = e.target;
        if (img && img.tagName === 'IMG') {
            img.src=TCGlobal.BabymarketDefaultAvatar;
        }
    },
};

module.exports = TCGlobal;