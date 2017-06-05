/**
 * Created by coin on 15/05/2017.
 */

/**
 * 申请退款完成
 */

import React from 'react';

export default class BabymarketRefundFinish extends React.Component{
    constructor(props){
        super(props);

        this.refundId = '';
    }

    componentDidMount() {

    }

    cancelBtnClicked(){
        this.refundId = window.Tool.getURLParameter('refundId');
        if (window.Tool.isValidStr(this.refundId)) {
            this.cancelRequest()
        }
        else
        {
            let orderId = window.Tool.getURLParameter('orderId');
            if (window.Tool.isEmptyStr(orderId)) {
                window.Tool.showAlert('无法获取orderId');
                return;
            }
            let r = window.RequestReadFactory.bmRefundRecordIdRead(orderId);
            let self = this;
            r.finishBlock = (req,data) => {
                if (data && window.Tool.isValidStr(data.Id)) {
                    self.refundId = data.Id;
                    self.cancelRequest();
                }
                else {
                    window.Tool.showAlert('无法获取退款信息');
                }
            };
            r.start();
        }
    }

    cancelRequest(){
        if (window.Tool.isEmptyStr(this.refundId)) {
            window.Tool.showAlert('无法获取refundId');
            return;
        }
        let r = window.RequestWriteFactory.bmRefundCancel(this.refundId);
        r.finishBlock = (req) => {
            window.Tool.showAlert('取消成功');
            window.JSBridge.sendDataToNative(null,'refundDidCancel');
        };
        r.start();
    }

    render(){
        return <div style={styles.root}>
            <div style={styles.header}>
                <span>您的退款申请已经提交成功！<br/>请耐心等待退款处理结果，谢谢您的理解！</span>
            </div>
            <span style={styles.propmt}>如果你想取消退款申请，可以点击下方取消退款按钮</span>
            <div onClick={this.cancelBtnClicked.bind(this)} style={styles.cancelBtnBase}>
                <span style={styles.cancelBtn}>取消退款申请</span>
            </div>
        </div>
    }
}

const styles = {
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    header:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:200,
        width:'100%',
        backgroundColor:'white',
    },
    propmt:{
        fontSize:13,
        color:'gray',
        padding:10,
        width:'90%',
        marginBottom:15,
        marginTop:8,
    },
    cancelBtnBase:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        backgroundColor:'#af8327',
        borderRadius:5,
    },
    cancelBtn:{
        padding:10,
        color:'white',
        fontSize:15,
    },
}
