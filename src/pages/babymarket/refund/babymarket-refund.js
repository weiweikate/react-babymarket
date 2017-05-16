/**
 * Created by coin on 15/05/2017.
 */
/**
 * 申请退款
 */

import React from 'react';

export default class BabymarketRefund extends React.Component{
    reasonDidClicked(){

    }

    userName(){
        return 'xxx';
    }

    userPhone(){
        return '12543535';
    }

    submitBtnClicked(){
        window.location.href = "http://www.baidu.com";
    }

    render(){
        return <div>
            <p style={styles.p}>
                <span>温馨提示：</span><br/>
                <span>1.限时特价、满减等购买优惠可能一并取消</span><br/>
                <span>2.如遇订单拆分，包邮等条件订单可能新增运费</span><br/>
                <span>3.退款按付款方式原路返回，不能返回的付款方式返回余额中</span><br/>
                <span>4.订单一旦取消，无法恢复</span><br/>
            </p>
            <div onClick={this.reasonDidClicked} style={styles.reasonCell}>
                <span>退款原因：</span>
                <div>
                    <select dir="rtl" style={{backgroundColor:'transparent',borderColor:'transparent',height:20,marginTop:0,align:'right'}}>
                        <option value="不想买了">不想买了</option>
                        <option value="订单不能按预计时间送达">订单不能按预计时间送达</option>
                        <option value="配送信息有误">配送信息有误</option>
                        <option value="忘记使用优惠券">忘记使用优惠券</option>
                        <option value="商品买错了">商品买错了(颜色、尺寸等弄错了)</option>
                        <option value="重复下单/误下单">重复下单/误下单</option>
                        <option value="其他渠道价格更低">其他渠道价格更低</option>
                        <option value="其他原因">其他原因</option>
                    </select>
                    <img style={styles.reasonImg}/>
                </div>
            </div>
            <div style={styles.des}>
                <span>退款说明：</span>
                <textarea style={styles.textarea} placeholder="选填"></textarea>
            </div>
            <div style={styles.contact}>
                <span style={styles.name}>退款联系人：{this.userName()}</span>
                <div style={styles.phoneBase}>
                    <span style={styles.phoneTitle}>联系方式：</span>
                    <span style={styles.phoneValue}>{this.userPhone()}</span>
                </div>
            </div>
            <div onClick={this.submitBtnClicked} style={styles.submitBtnBase}>
                <span style={styles.submitBtn}>提交</span>
            </div>
        </div>
    }
}

const styles = {
    p:{
        margin:10
    },
    reasonCell:{
        display:'flex',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'white'
    },
    reasonImg:{
        height:10,
        width:10
    },
    des:{
        display:'flex',
        padding:10,
        marginTop:12,
        backgroundColor:'white'
    },
    textarea: {
        borderColor: 'transparent',
        height: 90,
        flex: 1,
        resize: 'none',
        fontSize: 14,
        padding: 0,
        outline: 'none',
    },
    contact:{
        padding:10,
        marginTop:12,
        backgroundColor:'white'
    },
    name:{
    },
    phoneBase:{
        paddingTop:10
    },
    phoneTitle:{
    },
    phoneValue:{
        color:'#7697c6'
    },
    submitBtnBase:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        position:'fixed',
        bottom:20,
        left:'5%',
        backgroundColor:'#af8327',
        borderRadius:5,
    },
    submitBtn:{
        padding:10,
        color:'white',
        fontSize:15,
    }

}