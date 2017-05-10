/**
 * Created by coin on 3/14/17.
 */
let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class Storage {

    constructor() {
        if (__instance()) return __instance();

        //init
        this._currentSession = undefined;
        this._didLogin = undefined;
        this._loginUserName = undefined;
        this._currentMemberId = undefined;
        this._currentMemberInfo = undefined;

        __instance(this);
    }

    static sharedInstance() {
        return new Storage();
    }

    /**
     * 同步读取
     * @param key
     * @returns {*}
     */
    static read(key){
        return localStorage[key];
    }

    /**
     * 异步读取，内部实现暂时还是同步方式，定义好接口，倒置依赖，方便后面重构
     * @param key
     * @param cb
     */
    static asyncRead(key,cb){
        let value = localStorage[key];
        cb(value);
    }

    /**
     * 同步写入
     * @param key
     * @param value
     */
    static write(key,value){
        localStorage[key] = value;
        return true;
    }

    /**
     * 异步写入，内部实现暂时还是同步方式，定义好接口，倒置依赖，方便后面重构
     * @param key
     * @param value
     * @param cb
     */
    static asyncWrite(key,value,cb){
        let isSuccess = Storage.write(key,value);
        let error = '';
        cb(isSuccess,error);
    }

    //当前Session
    static currentSession() {
        if (global.Tool.isEmptyStr(Storage.sharedInstance()._currentSession)) {
                let value = Storage.read('currentSession');
                if (!global.Tool.isEmpty(value)) {
                    Storage.sharedInstance()._currentSession = value;
                }
                else {
                    Storage.sharedInstance()._currentSession = '2a119ab6-31f7-488d-9c60-a59300a70185';
                }
        }
        return Storage.sharedInstance()._currentSession;
    }

    static setCurrentSession(session){
        Storage.sharedInstance()._currentSession = session;
        Storage.write('currentSession',session);
    }

    //当前用户信息
    static currentMemberInfo() {
        if (global.Tool.isEmptyStr(Storage.sharedInstance()._currentMemberInfo)) {
            let value = Storage.read('currentMemberInfo');
            if (!global.Tool.isEmpty(value)) {
                Storage.sharedInstance()._currentMemberInfo = value;
            }
            else {
                Storage.sharedInstance()._currentMemberInfo = {};
            }
        }
        return Storage.sharedInstance()._currentMemberInfo;
    }

    //当前用户信息
    static currentMemberInfoAsync(cb) {
        if (window.Tool.isValid(Storage.sharedInstance()._currentMemberInfo)) {
            cb(Storage.sharedInstance()._currentMemberInfo);
            return;
        }

        window.JSBridge.getMemberInfoFromNative((member) => {
            Storage.setCurrentMemberInfo(member);
            if (cb) {
                cb(member);
            }
        });
    }

    static setCurrentMemberInfo(memberInfo){
        Storage.sharedInstance()._currentMemberInfo = memberInfo;
        Storage.write('currentMemberInfo',memberInfo);
    }

    //登陆标记
    static didLogin() {
        if (Storage.sharedInstance()._didLogin === undefined) {
            Storage.sharedInstance()._didLogin = Storage.read('didLogin');
        }
        return Storage.sharedInstance()._didLogin;
    }

    static setDidLogin(didLogin) {
        Storage.sharedInstance()._didLogin = didLogin;
        Storage.write('didLogin',didLogin);
    }

    //当前登录用户名
    static loginUserName(){
        if (Storage.sharedInstance()._loginUserName === undefined) {
            Storage.sharedInstance()._loginUserName = Storage.read('loginUserName');
        }
        return Storage.sharedInstance()._loginUserName;
    }

    static setLoginUserName(username){
        Storage.sharedInstance()._loginUserName = username;
        Storage.write('loginUserName',username);
    }

    //当前登录用户Id
    static currentMemberId(){
        if (Storage.sharedInstance()._currentMemberId === undefined) {
            Storage.sharedInstance()._currentMemberId = Storage.read('currentMemberId');
        }
        return Storage.sharedInstance()._currentMemberId;
    }

    static setCurrentMemberId(currentMemberId){
        Storage.sharedInstance()._currentMemberId = currentMemberId;
        Storage.write('currentMemberId',currentMemberId);
    }
}