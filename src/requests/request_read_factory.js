/**
 * Created by coin on 1/13/17.
 */

import RequestRead from './request_read'
import Operation from './operation'
import RequestLogin from './request_login'
import Storage from '../tools/storage';

//读取请求具体封装
export default class RequestReadFactory {

    //示例 发货查询
    static deliveryRead(status){
        let operation = Operation.sharedInstance().deliveryReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "StatusKey":status,
            "MaxCount":'3',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '发货查询';//用于日志输出
        req.items = ['Customer'];
        return req;
    }

    //登陆
    static login(username,pasword){
        let req = new RequestLogin(username,pasword);
        req.name = '登陆';//用于日志输出
        return req;
    }

    //TOP分享圈
    static topShareListRead(theID){
        let operation = Operation.sharedInstance().topShareListRead;
        let bodyParameters = {
            "Operation":operation,
            "Condition":"StringIndexOf(${Id},'"+ theID + "') > 0",
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = 'TOP分享圈';//用于日志输出
        return req;
    }


    //积分查询
    static pointUploadRead(theId){
        let operation = Operation.sharedInstance().pointReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Id":theId,
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '积分查询';//用于日志输出
        req.items = ['Id','Reason','SFJHCG'];
        return req;
    }

    //积分产品信息
    static pointProductInfoRead(code){
        let operation = Operation.sharedInstance().pointProductInfoReadOperation;
        let bodyParameters = {
            "Operation":operation,
            "Condition":"StringIndexOf(${Mark},'"+ code + "') > 0",
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '积分产品信息';//用于日志输出
        req.items = ['Id','Mark','SPName','GG'];
        return req;
    }

    //溯源列表查询
    static productSourceRead(code){
        let operation = Operation.sharedInstance().productSourceTrackReadOperation;
        let bodyParameters = {
            "Operation":operation,
            "Condition":"StringIndexOf(${Code},'"+ code + "') > 0",
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '溯源列表查询';//用于日志输出
        req.items = ['Id','Code','Content','DateTime'];
        return req;
    }

    //条码查询
    static codeRead(theId){
        let operation = Operation.sharedInstance().tagLockCodeReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Id":theId,
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '条码查询';//用于日志输出
        req.items = ['Id','ProductName','Code'];
        return req;
    }

    //宝贝码头商品详情
    static productDetailRead(theId){
        let operation = Operation.sharedInstance().bmProductReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Id":theId,
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头商品详情';//用于日志输出
        req.items = ['Id','ShowName','SalePrice','ImgId','Warehouse','Des1','Des','Tax','Subtitle','NationalKey','StoreId','TaxRate'];
        return req;
    }

    //附件
    static attachmentsRead(theId,count = 20,index = 0){
        let operation = Operation.sharedInstance().bmAttachmentsReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Condition":"${RelevancyId} == '" + theId + "' && ${RelevancyBizElement} == 'Attachments'",
            "MaxCount":count,
            "StartIndex":index,
            "Order":'${CreateTime} ASC'
        };
        let req = new RequestRead(bodyParameters);
        req.name = '附件';//用于日志输出
        req.items = ['Id'];
        return req;
    }

    //宝贝码头 商品的国家信息
    static productNationRead(theKey){
        let operation = Operation.sharedInstance().bmNationReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Value":theKey,
            "MaxCount":1,
            "StartIndex":0
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 商品的国家信息';//用于日志输出
        req.items = ['Name'];
        return req;
    }

    //宝贝码头 动态详情
    static dynamicDetailRead(theId){
        let operation = Operation.sharedInstance().bmDynamicDetailReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Id":theId,
            "IsIncludeSubtables":true,
            "MaxCount":1,
            "StartIndex":0,
            "Subtables":[
                "Img_List",
                "Compliment_List",
                "FavDetail",
                "NoticeList",
                "OrderNoteDetail",
                "Sign_List"
            ]
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 动态详情';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //宝贝码头 产品相关动态
    static productRelativeDynamicRead(productId){
        let operation = Operation.sharedInstance().bmDynamicDetailReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "SourceId":productId,
            "SourceType":"Product",
            "MaxCount":1,
            "StartIndex":0,
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 相关动态';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //宝贝码头 运费
    static expressRuleRead(warehouseId,city){
        let operation = Operation.sharedInstance().bmExpressRuleReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Condition":"StringIndexOf(${Area_Name},'" + city +"') > 0 && ${WarehouseId} == '" + warehouseId + "'",
            "MaxCount":1,
            "StartIndex":0
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 运费';//用于日志输出
        req.items = ['Express_Fee'];
        return req;
    }

    //宝贝码头 动态评论
    static dynamicDetailCommentsRead(theId,index=0){
        let operation = Operation.sharedInstance().bmDynamicCommentsReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "NoteId":theId,
            "IsIncludeSubtables":true,
            "MaxCount":20,
            "StartIndex":index
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 动态评论';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //宝贝码头 会员钱包月汇总
    static bmBalanceLogMonthViewRead(theId,index=0){
        let operation = Operation.sharedInstance().bmBalanceLogMonthView;
        let condition = "${MemberId} == '" + theId + "'";
        let bodyParameters =  {
            "Operation":operation,
            "IsIncludeSubtables":true,
            "MaxCount":20,
            "StartIndex":index,
            "Condition":condition,
            // "View":{"EntityName":"BalanceLog",
            //     "PrimaryCondition":condition
            // },
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 会员钱包月汇总';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //我的奖励
    static bmCommissionLogRead(index=0){
        let operation = Operation.sharedInstance().bmCommissionLogOperation;
        let bodyParameters =  {
            "Operation":operation,
            "IsIncludeSubtables":true,
            "MaxCount":20,
            "StartIndex":index
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 我的奖励';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //已省金额
    static bmCommissionLogSaveRead(index=0){
        let operation = Operation.sharedInstance().bmCommissionLogSaveOperation;
        let bodyParameters =  {
            "Operation":operation,
            "IsIncludeSubtables":true,
            "MaxCount":20,
            "StartIndex":index
        };
        let req = new RequestRead(bodyParameters);
        req.name = '宝贝码头 已省金额';//用于日志输出
        // req.items = ['Name'];
        return req;
    }
}




