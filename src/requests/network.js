/**
 * Created by coin on 1/13/17.
 */

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

//网络常量定义
export default class Network{

    constructor(){
        if (__instance()) return __instance();

        //站点
        this.domain = document.location.protocol + '//www.babymarkt.com.cn/';

        //配置
        let productionDomain = (window.isProduction ? this.domain : '');

        //读取
        this.readURL = productionDomain + 'Libra.Web.AppSync.AppSyncBatchReadData2.aspx';

        //写入
        this.writeURL = productionDomain + 'Libra.Web.Api.ApiBatchWrite.aspx';

        //登录
        this.loginURL = productionDomain + 'Libra.Web.Authentication.GetSession.aspx';

        //附件
        this.attatchmentURL = this.domain + 'Libra.Web.Businesses.Attachments.GetFile.aspx';

        this.statusExisted = 'Existed';
        this.statusNew = 'New';
        this.statusDelete = 'Deleted';

        __instance(this);
    }

    static sharedInstance(){
        return new Network();
    }
}