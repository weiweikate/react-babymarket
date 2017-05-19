/**
 * Created by coin on 1/13/17.
 */

//工具类

import DateFormat from 'dateformat';

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class Tool {

    constructor() {
        if (__instance()) return __instance();

        //init
        this.requestCount = 0;//判断加载动画是否需要隐藏

        __instance(this);
    }

    static sharedInstance(){
        return new Tool();
    }

    static formatTime(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return [year, month, day].map(Tool.formatNumber).join('-') + ' ' + [hour, minute, second].map(Tool.formatNumber).join(':');
    }

    static formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }

    static timeIntervalFromString(string){
        let date = Tool.dateFromString(string);
        let timeInterval = date.getTime() / 1000;
        return timeInterval;
    }

    static dateFromString(string){
        let date = new Date(string.replace(/-/g, '/'));
        return date;
    }

    static timeStringForDateString(string, formate){
        if ('1900-01-01 00:00:00' === string) {
            return '空';
        }
        let date = Tool.dateFromString(string);
        let timeString = Tool.timeStringForDate(date,formate);
        return timeString;
    }

    static timeStringForDate(date,formate)
    {
        let timeString = DateFormat(date,formate);
        return timeString;
    }

    static timeDurationStringForDateString(string){
        if (Tool.isEmptyStr(string)) {
            return;
        }
        let duration = new Date().getTime() / 1000 - Tool.timeIntervalFromString(string);
        let time = '';
        let count = 1;
        if (duration < 60 * 60) {
            count = parseInt(duration / 60.0);
            time = count + "分钟前";
        }
        else if(duration < (24 * 60 * 60))
        {
            count = parseInt(duration / 60 / 60);
            time = count + "小时前";
        } else
        {
            time = Tool.timeStringForDateString(string,"mm-dd HH:MM");
        }

        return (time);
    }

    //生成UUID
    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    //拼接网址
    static generateURL(baseURL, params) {
        if (undefined !== params) {
            let pairs = [];
            for (let key in params) {
                let value = params[key];
                if (window.Tool.isValidStr(value)) {
                    let pair = key + "=" + value;
                    pairs.push(pair);
                }
            }

            let query = pairs.join('&');
            let url = baseURL + '?' + query;
            url = encodeURI(url);
            return url;
        }
        else {
            return baseURL;
        }
    }

    //Object 空值判断
    static isEmpty(object) {
        if (object === null || object === undefined) {
            return true;
        }
        for (let i in object) {
            return false;
        }
        return true;
    }

    static isValid(object) {
        return !Tool.isEmpty();
    }

    static isEmptyId(theId){
        if (Tool.isEmptyStr(theId)) {
            return true;
        }
        if ('00000000-0000-0000-0000-000000000000' === theId) {
            return true;
        }
        return false;
    }

    static isValidId(theId){
        return !Tool.isEmptyId(theId);
    }

    static isEmptyObject(obj) {
        if (Tool.isEmpty(obj)) {
            return true;
        }
        for ( var name in obj) {
            return false;
        }
        return true;
    }

    static isValidObject(obj){
        return !Tool.isEmptyObject(obj);
    }

    //String 空值判断
    static isEmptyStr(str) {
        if (Tool.isEmpty(str)) {
            return true;
        }
        else if (str instanceof String && str.length === 0) {
            return true;
        }
        return false;
    }

    static isValidStr(str) {
        return !Tool.isEmptyStr(str);
    }

    //Array 空值判断
    static isEmptyArr(arr) {
        if (Tool.isEmpty(arr)) {
            return true;
        }
        else if (arr instanceof Array && arr.length === 0) {
            return true;
        }
        return false;
    }

    static isValidArr(arr) {
        return !Tool.isEmptyArr(arr);
    }

    static isTrue(str){
        if (Tool.isEmptyStr(str)) {
            return false;
        }
        return 'true' === str.toLowerCase();
    }

    static isFalse(str){
        return !Tool.isTrue(str);
    }

    //弹窗提示
    static showAlert(msg){
        if (window.inApp) {
            let data = {
                'message':msg
            };
            window.JSBridge.sendDataToNative(data,'showAlert');
        }
        else{
            alert(msg);
        }
    }

    //显示加载动画 rCount 为请求的次数
    static showLoading(rCount = 1){
        Tool.sharedInstance().requestCount = rCount;
        // wx.showToast({
        //     title:'加载...',
        //     icon: 'loading',
        //     duration:95000
        // });
    }

    //隐藏加载动画
    static hideLoading(){
        Tool.sharedInstance().requestCount--;
        if (Tool.sharedInstance().requestCount <= 0) {
            // wx.hideToast();
        }
    }

    //返回上一个界面
    static navigationPop(){
        // wx.navigateBack({
        //     delta: 1
        // });
    }

    static avatarURLForId(theId){
        return Tool.imageURLForId(theId,window.TCGlobal.BabymarketDefaultAvatar)
    }

    static imageURLForId(theID,placeholder=window.TCGlobal.BabymarketDefaultImage) {
        if (window.TCGlobal.EmptyId === theID || window.Tool.isEmptyStr(theID)) {
            return placeholder;
        }
        if (window.Storage.didLogin()) {
            return window.Network.sharedInstance().attatchmentURL + '?Id=' + theID + '&_SESSION_='+window.Storage.currentSession();
        }
        return  window.Network.sharedInstance().attatchmentURL + '?Id=' + theID;
    }

    static getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    static mobileCheck() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    /**
     * Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     *
     * @returns {String}
     */
    static getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }

    static isAndroid(){
        return "Android" === Tool.getMobileOperatingSystem();
    }

    /**
     * 获取经纬度
     * @param cb
     */
    static getCurrentLocation(cb){
        // 百度地图API功能
        if (Tool.isEmptyObject(window.baiduMap)) {
            var map = new window.BMap.Map("LocationMap");
            window.baiduMap = map;
        }
        var point = new window.BMap.Point(116.331398,39.897445);
        window.baiduMap.centerAndZoom(point,12);

        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() === window.BMAP_STATUS_SUCCESS){
                var mk = new window.BMap.Marker(r.point);
                window.baiduMap.addOverlay(mk);
                window.baiduMap.panTo(r.point);
                cb(r.point.lat,r.point.lng);
            }
            else {
            }
        },{enableHighAccuracy: true})

        //关于状态码
        //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
        //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
        //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
        //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
        //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
        //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
        //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
        //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
        //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
    }

    /**
     * 获取城市、街道信息
     * @param lat
     * @param lng
     */
    static getReverseGeocodingData(lat, lng,cb) {
        var point = new window.BMap.Point(lng,lat);
        if (Tool.isEmptyObject(window.baiduGeoc)) {
            var geoc = new window.BMap.Geocoder();
            window.baiduGeoc = geoc;
        }
        window.baiduGeoc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
            // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            cb(addComp);
        });
    }

    /**
     * MLink链接
     */
    static mLinkDownloadURL(fromId='',productId='',dynamicId=''){
        return Tool.generateURL(window.TCGlobal.BabymarketMLinkDownloadURL,{
            productId:productId,
            dynamicId:dynamicId,
            fromId:fromId,
        })
    }

    static isHTTPS(){
        var ishttps = 'https:' === document.location.protocol ? true: false;
        return ishttps;
    }

    /**
     * 更换action，切换页面
     * @param action
     */
    static newHrefWithAction(action){
        let oldAction = Tool.getURLParameter('action');
        if (Tool.isValidStr(oldAction))
        {
            let location = window.location;
            let newHref = location.href.replace('action='+oldAction,'action='+action);
            console.log('new href = ' + newHref);
            return newHref;
        }
    }
}

