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

//操作常量定义
export default class Operation{

    constructor(){
        if (__instance()) return __instance();
        /*****************************************************************************/
        /********************            TOPe企                ***********************/
        /*****************************************************************************/
        //发货查询
        this.deliveryReadOperation = '801a39c2-e388-491f-b6e8-a6ba000d3608';

        //定位信息上传
        this.locationUploadOperation = 'a7bae6d9-f2b8-078f-3213-3f4600b2a3b9';

        //积分上传
        this.pointUploadOperation = '1e2c21c5-ace8-46ec-8983-9fdd0185c222';

        //积分查询
        this.pointReadOperation = 'ef074842-4310-4789-81af-a2d500e7ce95';

        //积分产品信息
        this.pointProductInfoReadOperation = 'ab0c1939-1f5d-4563-a36d-a6fd0117dbc1';

        //溯源列表查询
        this.productSourceTrackReadOperation = '657be14c-3687-0f7d-3bce-3fff01e4111f';

        //条形码上传
        this.tagLockCodeWriteOperation = '80cb94d0-b047-0604-3d59-3e3801d08f2e';
        this.tagLockCodeReadOperation = '0e88d500-98e4-086f-0280-3e360013e897';

        //top分享圈
        this.topShareListRead = '49f5a241-f345-0c28-0a81-3ce400f8825e';
        /*****************************************************************************/
        /********************            TOPe企                ***********************/
        /*****************************************************************************/







        /*****************************************************************************/
        /********************            老友码头                ***********************/
        /*****************************************************************************/
        //老友码头商品详情
        this.bmProductReadOperation = 'de9362a8-395e-09a4-087d-3c1701f9da63';
        this.bmProductModify = 'c761ab7b-ede4-0413-0f19-3c1a01ee3df6';

        //老友码头附件
        this.bmAttachmentsReadOperation = '7eba4898-2f70-05b4-0b17-009a002e71ad';

        //老友码头 商品的国家信息
        this.bmNationReadOperation = 'c5cb5117-b585-0160-2ab2-3c1f0016ec87';

        //老友码头 动态详情
        this.bmDynamicDetailReadOperation = '64c44bb7-8657-0355-3ad9-3c7b004d7aff';

        //老友码头 运费
        this.bmExpressRuleReadOperation = '91972a34-2e32-0928-156f-3c3501e55857';

        //老友码头 收藏动态
        this.bmDynamicFavoriteAddOperation = '23183844-883f-04c2-0a27-3c3501c7be16';
        //老友码头 取消收藏
        this.bmDynamicFavoriteCancelOperation = '6ad78ca1-4b32-038b-3f48-3c3601d52a16';

        //老友码头 动态点赞
        this.bmDynamicLikeAddOperation = '8df129ef-2b80-08c1-0542-3c7501f0693a';
        //老友码头 动态点赞 取消
        this.bmDynamicLikeCancelOperation = '7bc68905-905c-4a9d-bf8c-a58a01602986';

        //动态评论点赞
        this.bmDynamicCommentLikeAddOperation = 'e57fd029-caa6-0402-2740-3c7101cdb636';
        //动态评论点赞 取消
        this.bmDynamicCommentLikeCancelOperation = '50d1173b-7b33-4cfb-a6b2-a58a016208d2';

        //动态评论
        this.bmDynamicCommentsReadOperation = 'b4d6d9ec-6727-061c-223a-3c7b0033bedb';

        //会员钱包月汇总
        this.bmBalanceLogMonthView = 'a0d1c6cb-0618-008d-3073-3e5e0059b80b';

        //我的奖励
        this.bmCommissionLogOperation = '82f1f24c-e796-4d4c-8afb-a75c009c282d';

        //已省金额
        this.bmCommissionLogSaveOperation = 'def432e0-c6b8-4bef-8ed3-a75c009c3aed';

        //退款原因枚举
        this.bmRefundReasonRead = 'd8f2d996-53f4-0d49-2b4a-3e7601740c18';

        //退款
        this.bmRefundRead = '18525e79-8689-4e57-9f1f-a77500182f04';
        this.bmRefundWrite = 'a6998041-52b6-0a29-30cf-3e7800b26949';
        this.bmRefundDelete = '88c79a35-f915-473d-b8c3-a77500185b8c';

        //区域选择
        this.bmAreaRead = "7e179d1c-ab1c-0352-0a44-393c01c0abf4";

        //用户信息
        this.bmMemberInfoRead = 'b83b9dc9-5568-0c67-1926-3c1701fb385b';
        this.bmMemberAdd = '3678dc19-7dcb-020c-26ff-3c1900385fe2';

        //订单
        this.bmOrderLineWrite = "6a5ba01b-d63c-0e45-230f-3c19005015b1"
        this.bmOrderWrite = "c65c46b6-b12e-0e57-28fe-3c1900223872"
        this.bmOrderDelete = "8f93f253-7223-091e-1d91-3c1a0030ac72"
        // this.bmOrderRead = "481f0766-998d-003c-1727-3c1701e15fcb"
        this.bmOrderRead = "02926fbb-1e62-033c-3390-3c1a01c81ad1"
        this.bmOrderModify = "51edceb5-4d37-0d8b-1043-3c1a01f6b85e"//

        this.bmFirstProductsCategoryRead = '4293f401-3425-4d6b-bf67-a618018b764a';

        /*****************************************************************************/
        /********************            老友码头                ***********************/
        /*****************************************************************************/






        /*****************************************************************************/
        /********************            TOPMOM                ***********************/
        /*****************************************************************************/


        /*****************************************************************************/
        /********************            TOPMOM                ***********************/
        /*****************************************************************************/
        __instance(this);
    }

    static sharedInstance(){
        return new Operation();
    }
}