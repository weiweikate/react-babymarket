console.info('loading index.js');

import './index.css';
import initRoute from './tc-route';

import TCGlobal, {
    Storage,
    Tool,
    JSBridge,
    Network,
    RequestWriteFactory,
    RequestReadFactory,
    TCBaseComponet
} from './tools/tcglobal';

// import LeetCode from './leetcode';
// LeetCode();

//设置全局变量
window.TCGlobal = TCGlobal;
window.Storage = Storage;
window.Tool = Tool;
window.Network = Network;
window.JSBridge = JSBridge;
window.RequestReadFactory = RequestReadFactory;
window.RequestWriteFactory = RequestWriteFactory;
window.TCBaseComponet = TCBaseComponet;

/**
 * 是否是发布版
 * @type {boolean}
 */
window.isProduction = false;
// window.isProduction = true;

/**
 * 是否是https
 */
let isHTTPS = Tool.isHTTPS();
window.isHTTPS = isHTTPS;

/**
 * 由Native缓存图片
 */
let cacheImgByNative = window.Tool.getURLParameter('cacheImgByNative');
window.cacheImgByNative = window.Tool.isTrue(cacheImgByNative);

/**
 * 是移动端还是PC端
 */
let isMobile = Tool.mobileCheck();
window.isMobile = isMobile;

/**
 * 是否在App内部使用
 */
let inApp = Tool.getURLParameter('inApp');
if (isMobile === false && Tool.isValidStr(inApp) && window.Tool.isTrue(inApp)) {
    alert('在PC浏览器中 inApp参数会被忽略');
    inApp = 'false';
}
window.inApp = window.Tool.isTrue(inApp);

/**
 * 请求页面动作
 */
let action = Tool.getURLParameter('action');
window.action = action;

/**
 * 是Android还是iOS
 */
let isAndroid = Tool.isAndroid();
window.isAndroid = isAndroid;

console.info('isProduction : ' + window.isProduction);
console.info('isMobile     : ' + window.isMobile);
console.info('inApp        : ' + window.inApp);
console.info('isAndroid    : ' + window.isAndroid);

/**
 * 重写console的日志输出
 */
console.info('before JSBridge.overrideConsoleLog()');
JSBridge.overrideConsoleLog();
console.info('after JSBridge.overrideConsoleLog()');

let urlSession = Tool.getURLParameter('session');
let urlMemberId = Tool.getURLParameter('memberId');

let saveParams = (session,memberId,didLogin=true) => {
    Storage.setCurrentSession(session);
    Storage.setCurrentMemberId(memberId);
    Storage.setDidLogin(didLogin);
    console.info('mid:'+ memberId +', session:' + session+ ', didLogin:' + didLogin);
};

if (window.inApp) {
    console.info('in App');

    /**
     * 如果是App内部使用，则初始化JSBridge
     */
    JSBridge.sharedInstance().setup((bridge) =>
    {
        console.info('JSBridge setup OK');
        console.info('loading url:' + window.location);

        if (Tool.isValidStr(urlSession) && Tool.isValidStr(urlMemberId)) {
            saveParams(urlSession,urlMemberId);
            initRoute();
            return;
        }

        /**
         * 先从Native中获取Session
         */
        console.info('start getSessionFromNative');
        JSBridge.getSessionFromNative((session) => {
            console.info('did getSessionFromNative : ' + session);
            if (Tool.isValidStr(session)) {

                /**
                 * 从Native中获取当前登录用户的Id
                 */
                console.info('start getCurrentMemberIdFromNative');
                JSBridge.getCurrentMemberIdFromNative((memberId) => {
                    console.info('did getCurrentMemberIdFromNative : ' + memberId);
                    if (Tool.isValidStr(memberId)) {
                        saveParams(session,memberId);
                    }
                    else{
                        saveParams(session,memberId,false);
                    }

                    /**
                     * 初始化Web路由
                     */
                    initRoute();
                })
            }
            else{
                // alert('请先注册getSessionFromNative' + session);
            }
        })
    });
}

/**
 * 非App内部使用，直接初始化路由
 */
else
{
    console.info('not in App');
    saveParams(urlSession,urlMemberId,(Tool.isValidStr(urlMemberId)));
    initRoute();
}

