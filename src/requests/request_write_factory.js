/**
 * Created by coin on 1/13/17.
 */

import RequestWrite from './request_write';
import Network from './network';
import Operation from './operation';
import Tool from '../tools/tool';
import Storage from '../tools/storage';

//写入请求具体封装
export default class RequestWriteFactory {

    //示例
    static demo(){
        let operation = Operation.sharedInstance().locationUploadOperation;
        let status = Network.sharedInstance().statusNew;

        let params = {
            "Operation":operation,
            "Longitude":'30',
            "Latitude":'120',
            "LongAddress":'浙江省杭州市。。。',
            "Address":'杭照所',
        };

        let req = new RequestWrite(status,'Location',params,null);
        req.name = '定位信息上传';

        return req;
    }

    //积分上传
    static pointUpload(phone,code1,code2){
        let operation = Operation.sharedInstance().pointUploadOperation;
        let status = Network.sharedInstance().statusNew;
        let time = Tool.formatTime(new Date());

        let params = {
            "Operation":operation,
            "Id":Tool.guid(),
            "CXFSKey" : "6",//微信小程序key值,平台值
            "SJHM" : phone,
            "CodePart1" : code1,
            "CXSJ" : time,
            "CodePart2" : code2,
            "SFJHCG":"True",
        };

        let req = new RequestWrite(status,'JFJL',params,null);
        req.name = '积分上传';

        return req;
    }

    //条形码上传
    static codeUpload(code){
        let operation = Operation.sharedInstance().tagLockCodeWriteOperation;
        let status = Network.sharedInstance().statusNew;
        let time = Tool.formatTime(new Date());

        let params = {
            "Operation":operation,
            "Id":Tool.guid(),
            "Code" : code,
        };

        let req = new RequestWrite(status,'TagLock',params,null);
        req.name = '二维码上传';

        return req;
    }

    //宝贝码头动态收藏
    static dynamicFavoriteAdd(dynamicId,favId){
        let operation = Operation.sharedInstance().bmDynamicFavoriteAddOperation;
        let status = Network.sharedInstance().statusNew;

        let params = {
            "Operation":operation,
            'Id':favId,
            'FavoriteObjectId':dynamicId,
            "FavoriteObjectType":'Note',
            'MemberId':window.Storage.currentMemberId()
        };

        let req = new RequestWrite(status,'Favorite',params,null);
        req.name = '宝贝码头动态收藏';

        return req;
    }

    //宝贝码头动态收藏 取消
    static dynamicFavoriteCancel(favId){
        let operation = Operation.sharedInstance().bmDynamicFavoriteCancelOperation;
        let status = Network.sharedInstance().statusDelete;

        let params = {
            "Operation":operation,
            'Id':favId,
        };

        let req = new RequestWrite(status,'Favorite',params,null);
        req.name = '宝贝码头动态收藏 取消';

        return req;
    }

    //宝贝码头动态点赞
    static dynamicLikeAdd(dynamicId,likeId){
        let operation = Operation.sharedInstance().bmDynamicLikeAddOperation;
        let status = Network.sharedInstance().statusNew;
        let params = {
            "Operation":operation,
            'Id':likeId,
            'NoteId':dynamicId,
            'MemberId':window.Storage.currentMemberId()
        };

        let req = new RequestWrite(status,'Compliment',params,null);
        req.name = '宝贝码头动态点赞';

        return req;
    }

    //宝贝码头动态点赞 取消
    static dynamicLikeCancel(likeId){
        let operation = Operation.sharedInstance().bmDynamicLikeCancelOperation;
        let status = Network.sharedInstance().statusExisted;

        let params = {
            "Operation":operation,
            'Id':likeId,
            'Deleted':'True'
        };

        let req = new RequestWrite(status,'Compliment',params,null);
        req.name = '宝贝码头动态点赞 取消';

        return req;
    }

    //宝贝码头动态评论点赞
    static dynamicCommentLikeAdd(commentId,likeId){
        let operation = Operation.sharedInstance().bmDynamicCommentLikeAddOperation;
        let status = Network.sharedInstance().statusNew;
        let params = {
            "Operation":operation,
            'Id':likeId,
            'DYBJPLId':commentId,
            'MemberId':window.Storage.currentMemberId()
        };

        let req = new RequestWrite(status,'Compliment1',params,null);
        req.name = '宝贝码头动态评论点赞';

        return req;
    }

    //宝贝码头动态评论点赞 取消
    static dynamicCommentLikeCancel(likeId){
        let operation = Operation.sharedInstance().bmDynamicCommentLikeCancelOperation;
        let status = Network.sharedInstance().statusExisted;

        let params = {
            "Operation":operation,
            'Id':likeId,
            'Deleted':'True'
        };

        let req = new RequestWrite(status,'Compliment1',params,null);
        req.name = '宝贝码头动态评论点赞 取消';

        return req;
    }
}

