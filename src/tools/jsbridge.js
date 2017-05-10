/**
 * Created by coin on 3/31/17.
 */
let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class JSBridge {

    constructor() {
        if (__instance()) return __instance();

        //init

        __instance(this);
    }

    static sharedInstance() {
        return new JSBridge();
    }

    static bridge() {
        return window.jsbridge;
    }

    /**
     * 注册给Native调用的方法
     */
    registerAllHandler(){

        /**
         * 统一处理中心
         *
         * data:主要数据Object
         * action:相当于handler的作用，区分不同的action
         * returnCB:相当于函数调用的返回值
         */
        JSBridge.recivedDataFromNative((data, action, returnCB) => {
            if (action === 'NativeIsReady') {

            }
        });

        /*****************************************************************************/
        /********************            具体实例                ***********************/
        /*****************************************************************************/

        //获取session
        JSBridge.registerHandler('getSessionFromJS', (params, returnCB) => {
            returnCB(window.Storage.currentSession());
        });

        //获取用户Id
        JSBridge.registerHandler('getCurrentMemberIdFromJS', (params, returnCB) => {
            returnCB(window.Storage.currentMemberId());
        });
    }

    /**
     * 初始化jsbridge
     * @param cb
     */
    setup(cb) {

        let self = this;

        /**
         * 安卓
         */
        if (window.isAndroid) {
            window.connectWebViewJavascriptBridge(function(bridge) {
                window.jsbridge = bridge;
                bridge.init(function(message, responseCallback) {
                    console.info('init jsbridge on Android', message);
                    var data = {
                        'Javascript Responds': 'init success!'
                    };
                    responseCallback(data);
                });
                self.registerAllHandler();
                if (cb) {
                    cb(bridge);
                }
            })
        }

        /**
         * iOS
         */
        else {
            window.setupJSBridge(function (bridge) {
                window.jsbridge = bridge;
                self.registerAllHandler();
                if (cb) {
                    cb(bridge);
                }
            });
        }
    }

    /**
     * 封装一层，方便IDE自动补全
     * @param handler 字符串
     * @param cb  回调 (data,cb)=>{}
     */
    static registerHandler(handler, returnCB) {
        if (window.jsbridge === undefined) {
            // alert('jsbridge undefined');
            return;
        }
        console.info('registerHandler:' + handler);
        window.jsbridge.registerHandler(handler, returnCB);
    }

    /**
     * 封装一层，方便IDE自动补全
     * @param handler 字符串
     * @param params 入参 {'key':'value'}
     * @param cb 回调 (response)=>{}
     */
    static callHandler(handler, params, responseCB) {
        if (window.jsbridge === undefined) {
            // alert('jsbridge undefined');
            return;
        }
        // console.info('callHandler:' + handler + ' params:' + params);
        window.jsbridge.callHandler(handler, params, responseCB);
    }

    /**
     * 当成通知使用,相当于收到notification,Native主动发起
     * @param cb (data,action,returnCB)=>{}
     */
    static recivedDataFromNative(cb) {
        JSBridge.registerHandler('sendDataToJS', (data, returnCB) => {

            let action = data['action'];
            if (window.Tool.isValidStr(action)) {
                console.info('recivedDataFromNative : ' + action);
                cb(data, action, returnCB);
            }
        });
    }

    /**
     * 发送数据到Native,相当于post notification,JS主动发起
     * @param data
     * @param action
     */
    static sendDataToNative(data, action,responseCB) {
        if (window.Tool.isEmpty(data)) {
            data = {};
        }
        data['action'] = action;
        this.callHandler('sendDataToNative', data, responseCB);
    }

    /*****************************************************************************/
    /********************            具体实例                ***********************/
    /*****************************************************************************/

    /**
     * 调用Native方法，获取Native的session
     * @param cb (response)=>{}
     */
    static getSessionFromNative(responseCB) {
        this.callHandler('getSessionFromNative', {}, responseCB);
    }

    /**
     * 调用Native方法，获取Native的登录用户Id
     * @param cb (response)=>{}
     */
    static getCurrentMemberIdFromNative(responseCB) {
        this.callHandler('getCurrentMemberIdFromNative', {}, responseCB);
    }

    /**
     * 调用Native方法，获取Native的登录用户Id
     * @param cb (response)=>{}
     */
    static getMemberInfoFromNative(responseCB) {
        this.callHandler('getMemberInfoFromNative', {}, responseCB);
    }

    /**
     * 给Native传输日志信息
     * @param action:console.log, console.error...
     */
    static sendConsoleLogToNative(action,message){
        this.callHandler('sendConsoleLogToNative', {
            action:action,
            message:message
        }, ()=>{});
    }

    /**
     * 重写console的日志输出
     */
    static overrideConsoleLog(){

        (function () {
            // var isDev = !window.isProduction;
            var isDev = true;

            var __log = window.console.log.bind(console);
            window.console.log = function (str) {
                if (isDev) {
                    __log(str);
                    JSBridge.sendConsoleLogToNative('console.log',str);
                } else {
                    return false;
                }
            };

            var __debug = window.console.debug.bind(console);
            window.console.debug = function (str) {
                if (isDev) {
                    __debug(str);
                    JSBridge.sendConsoleLogToNative('console.debug',str);
                } else {
                    return false;
                }
            };

            var __error = window.console.error.bind(console);
            window.console.error = function (str) {
                if (isDev) {
                    __error(str);
                    JSBridge.sendConsoleLogToNative('console.error',str);
                } else {
                    return false;
                }
            };

            var __info = window.console.info.bind(console);
            window.console.info = function (str) {
                if (isDev) {
                    __info(str);
                    JSBridge.sendConsoleLogToNative('console.info',str);
                } else {
                    return false;
                }
            };

            var __warn = window.console.warn.bind(console);
            window.console.warn = function (str) {
                if (isDev) {
                    // __warn(str);
                    // JSBridge.sendConsoleLogToNative('console.warn',str);
                } else {
                    return false;
                }
            };
        })();
    }
}


