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

        let req = new RequestWrite(status,'Location',params,null,null);
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

        let req = new RequestWrite(status,'JFJL',params,null,null);
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

        let req = new RequestWrite(status,'TagLock',params,null,null);
        req.name = '二维码上传';

        return req;
    }

    //老友码头动态收藏
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

        let req = new RequestWrite(status,'Favorite',params,null,null);
        req.name = '老友码头动态收藏';

        return req;
    }

    //老友码头动态收藏 取消
    static dynamicFavoriteCancel(favId){
        let operation = Operation.sharedInstance().bmDynamicFavoriteCancelOperation;
        let status = Network.sharedInstance().statusDelete;

        let params = {
            "Operation":operation,
            'Id':favId,
        };

        let req = new RequestWrite(status,'Favorite',params,null,null);
        req.name = '老友码头动态收藏 取消';

        return req;
    }

    //老友码头动态点赞
    static dynamicLikeAdd(dynamicId,likeId){
        let operation = Operation.sharedInstance().bmDynamicLikeAddOperation;
        let status = Network.sharedInstance().statusNew;
        let params = {
            "Operation":operation,
            'Id':likeId,
            'NoteId':dynamicId,
            'MemberId':window.Storage.currentMemberId()
        };

        let req = new RequestWrite(status,'Compliment',params,null,null);
        req.name = '老友码头动态点赞';

        return req;
    }

    //老友码头动态点赞 取消
    static dynamicLikeCancel(likeId){
        let operation = Operation.sharedInstance().bmDynamicLikeCancelOperation;
        let status = Network.sharedInstance().statusExisted;

        let params = {
            "Operation":operation,
            'Id':likeId,
            'Deleted':'True'
        };

        let req = new RequestWrite(status,'Compliment',params,null,null);
        req.name = '老友码头动态点赞 取消';

        return req;
    }

    //老友码头动态评论点赞
    static dynamicCommentLikeAdd(commentId,likeId){
        let operation = Operation.sharedInstance().bmDynamicCommentLikeAddOperation;
        let status = Network.sharedInstance().statusNew;
        let params = {
            "Operation":operation,
            'Id':likeId,
            'DYBJPLId':commentId,
            'MemberId':window.Storage.currentMemberId()
        };

        let req = new RequestWrite(status,'Compliment1',params,null,null);
        req.name = '老友码头动态评论点赞';

        return req;
    }

    //老友码头动态评论点赞 取消
    static dynamicCommentLikeCancel(likeId){
        let operation = Operation.sharedInstance().bmDynamicCommentLikeCancelOperation;
        let status = Network.sharedInstance().statusExisted;

        let params = {
            "Operation":operation,
            'Id':likeId,
            'Deleted':'True'
        };

        let req = new RequestWrite(status,'Compliment1',params,null,null);
        req.name = '老友码头动态评论点赞 取消';

        return req;
    }

    //老友码头 退款
    static bmRefund(refundId,orderId,reasonId,reason=''){
        let operation = Operation.sharedInstance().bmRefundWrite;
        let status = Network.sharedInstance().statusNew;

        let params = {
            "Operation":operation,
            'Id':refundId,
            'OrderId':orderId,
            'Remark':reason,
            'ReasonId':reasonId,
        };

        let req = new RequestWrite(status,'Refund',params,null,null);
        req.name = '老友码头 退款';

        return req;
    }

    //老友码头 取消退款
    static bmRefundCancel(refundId){
        let operation = Operation.sharedInstance().bmRefundDelete;
        let status = Network.sharedInstance().statusExisted;

        let params = {
            "Operation":operation,
            'Id':refundId,
            'Deleted':'True'
        };

        let req = new RequestWrite(status,'Refund',params,null,null);
        req.name = '老友码头 取消退款';

        return req;
    }

    //老友码头 创建用户
    //todo
    static bmMemberAdd(phone,code,memberId,orderId){
        let operation = Operation.sharedInstance().bmMemberAdd;
        let status = Network.sharedInstance().statusNew;

        let params = {
            "Operation":operation,
            "Id":memberId,
            "Name":phone,
            "Mobile":phone,
            "OrderId":orderId,
            "YQM":code,
        };

        let req = new RequestWrite(status,'Member',params,null,null);
        req.name = '老友码头 创建用户';

        return req;
    }

    //老友码头 创建临时订单
    //todo
    static bmOrderAdd(orderId,memberId,districtId,name,mobile,addressDetail,cardId){
        let operation = Operation.sharedInstance().bmOrderWrite;
        let status = Network.sharedInstance().statusNew;

        let params = {
            "Operation":operation,
            "Id":orderId,
            "MemberId":memberId,
            "DistrictId":districtId,
            "Consignee":name,
            "Mobile":mobile,
            "Address":addressDetail,
        };

        if (window.Tool.isValidStr(cardId)) {
            params['PurchaseIDCard'] = cardId;
        }

        let req = new RequestWrite(status,'Order',params,null,null);
        req.name = '老友码头 创建临时订单';

        return req;
    }

    //老友码头 修改并激活订单
    //todo
    static bmOrderActive(){
        let operation = Operation.sharedInstance().bmOrderModify;
        let status = Network.sharedInstance().statusExisted;

        let params = {
            "Operation":operation,
        };

        let req = new RequestWrite(status,'Order',params,null,null);
        req.name = '老友码头 修改并激活订单';

        return req;
    }

    //老友码头 增加订单明细
    //todo
    static bmOrderLinesAdd(orderId,productId,count,price){
        let operation = Operation.sharedInstance().bmOrderLineWrite;
        let status = Network.sharedInstance().statusNew;

        let params = {
            "Operation":operation,
            "OrderId":orderId,
            "MemberId":window.Storage.currentMemberId(),
            "ProductId":productId,
            "Qnty":count,
            "Price":price,
        };

        let req = new RequestWrite(status,'Order_Line',params,null,null);
        req.name = '老友码头 增加订单明细';

        return req;
    }

    //修改商品信息
    static bmModifyProducts(body) {
        let operation = Operation.sharedInstance().bmProductModify;
        let status = Network.sharedInstance().statusExisted;

        let params = body;

        let req = new RequestWrite(status,'Product',params,operation,null);
        req.name = '修改商品信息';

        return req;
    }
}


