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
        req.preprocessCallback = (r) => {
            let {Tool,Storage} = window;
            let model = req.responseObject;
            let session = model.Session;
            let key = model.Person.Key;
            let id = Tool.idFromDataKey(key);

            Storage.setCurrentSession(session);
            Storage.setDidLogin(true);
            Storage.setCurrentMemberId(id);
        }
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

    //老友码头商品详情
    static productDetailRead(theId){
        let operation = Operation.sharedInstance().bmProductReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Id":theId,
            "MaxCount":'1',
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头商品详情';//用于日志输出
        req.items = ['Id','ShowName','LYPrice','SalePrice','ImgId','Warehouse','Des1','Des','Tax','Subtitle','NationalKey','StoreId','TaxRate','Import','PriceInside'];
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

    //老友码头 商品的国家信息
    static productNationRead(theKey){
        let operation = Operation.sharedInstance().bmNationReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Value":theKey,
            "MaxCount":1,
            "StartIndex":0
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头 商品的国家信息';//用于日志输出
        req.items = ['Name'];
        return req;
    }

    //老友码头 动态详情
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
        req.name = '老友码头 动态详情';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //老友码头 产品相关动态
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
        req.name = '老友码头 相关动态';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //老友码头 运费
    static expressRuleRead(warehouseId,city){
        let operation = Operation.sharedInstance().bmExpressRuleReadOperation;
        let bodyParameters =  {
            "Operation":operation,
            "Condition":"StringIndexOf(${Area_Name},'" + city +"') > 0 && ${WarehouseId} == '" + warehouseId + "'",
            "MaxCount":1,
            "StartIndex":0
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头 运费';//用于日志输出
        req.items = ['Express_Fee'];
        return req;
    }

    //老友码头 动态评论
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
        req.name = '老友码头 动态评论';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //老友码头 会员钱包月汇总
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
        req.name = '老友码头 会员钱包月汇总';//用于日志输出
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
            'Order':"${CreateTime} DESC",
            "StartIndex":index
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头 我的奖励';//用于日志输出
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
            'Order':"${CreateTime} DESC",
            "StartIndex":index
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头 已省金额';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //退款原因枚举
    static bmRefundReasonListRead(){
        let operation = Operation.sharedInstance().bmRefundReasonRead;
        let bodyParameters =  {
            "Operation":operation,
            "MaxCount":90,
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头 退款原因枚举';//用于日志输出
        // req.items = ['Name'];
        return req;
    }

    //获取退款记录id
    static bmRefundRecordIdRead(orderId){
        let operation = Operation.sharedInstance().bmRefundRead;
        let bodyParameters =  {
            "Operation":operation,
            "MaxCount":9,
            "OrderId":orderId
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头 获取退款记录id';//用于日志输出
        req.items = ['Id','OrderId','Deleted'];
        return req;
    }

    //老友码头省市区选择
    static bmAreaListRead(level = 1,parentId){
        let operation = Operation.sharedInstance().bmAreaRead;
        let condition = "${CJS} = " + level + " && ${ParentId} = '" + parentId + "'";
        if (window.Tool.isEmptyStr(parentId)) {
            condition = "${CJS} = " + level;
        }
        let bodyParameters =  {
            "Operation":operation,
            "Condition":condition,
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头省市区选择';//用于日志输出
        req.items = ["Id", "CJS", "ZJS", "FullName", "Name"];

        return req;
    }

    //老友码头用户信息读取
    static bmMemberInfoReadByPhone(phone){
        let operation = Operation.sharedInstance().bmMemberInfoRead;
        let condition = "${Mobile} == '"+phone+"'";
        let bodyParameters =  {
            "Operation":operation,
            "Condition":condition,
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头用户信息读取';//用于日志输出
        req.items = ["Id"];

        return req;
    }

    //老友码头订单详情读取
    static bmOrderDetailRead(orderId){
        let operation = Operation.sharedInstance().bmOrderRead;
        let condition = "${Id} == '" + orderId + "'";
        let bodyParameters =  {
            "Operation":operation,
            "Condition":condition,
        };
        let req = new RequestRead(bodyParameters);
        req.name = '老友码头订单详情读取';//用于日志输出
        // req.items = ["Id"];

        return req;
    }

    //第一级产品分类读取
    static bmFirstProductsCategoryRead(){
        let operation = Operation.sharedInstance().bmFirstProductsCategoryRead;
        let bodyParameters =  {
            "Operation":operation,
            'Order':"${Order} ASC",
            // "IsShow":"true",
            "Hierarchy":1,
            // "ShowInHomepage":1
        };
        let req = new RequestRead(bodyParameters);
        req.name = '第1级产品分类读取';//用于日志输出
        req.items = ["Id",'Name'];
        return req;
    }

    //第一级产品分类读取
    static bmSecondProductsCategoryRead(pid){
        let operation = Operation.sharedInstance().bmFirstProductsCategoryRead;
        let bodyParameters =  {
            'ParentId':pid,
            "Operation":operation,
            'Order':"${Order} ASC",
            // "IsShow":"true",
            // "Hierarchy":2,
            // "ShowInHomepage":1
        };
        let req = new RequestRead(bodyParameters);
        req.name = '第2级产品分类读取';//用于日志输出
        req.items = ["Id",'Name'];
        return req;
    }

    //获取分类下的商品
    static bmGetCategoryProducts(pid){
        let operation = Operation.sharedInstance().bmProductReadOperation;
        let bodyParameters =  {
            // 'Product_CategoryId':pid,
            // 'ProductCategoryInsideId':pid,
            'Condition':"${ProductCategoryInsideId} == '"+pid+"' || ${Product_CategoryId} == '"+pid+"'",
            "Operation":operation,
            'Order':"${Order} ASC",
            'IsIncludeLong':false,
            'IsIncludeSubtables':false,
        };
        let req = new RequestRead(bodyParameters);
        req.name = '获取分类下商品';//用于日志输出
        req.items = ['Id','ShowName','ImgId','Order'];
        return req;
    }


}




