/**
 * Created by coin on 15/05/2017.
 */
/**
 * 申请退款
 */

import React from 'react';

export default class BabymarketRefund extends React.Component{
    constructor(props){
        super(props);

        /**
         * _userName: 退款联系人,
         * _userPhone: 联系方式,
         * _reasons: 退款原因枚举,
         * _selectedReason: 选中的退款原因,
         * _refundDes: 退款说明
         */
        this.state = {
            _userName:'',
            _userPhone:'',
            _reasons:[],
            _selectedReason:{},
            _refundDes:'',
        };

    }

    componentDidMount() {

        let self = this;
        window.Storage.currentMemberInfoAsync((member) => {
            self.setState({
                _userName:member.Nickname,
                _userPhone:member.Mobile,
            })
        });

        window.Storage.write('refund-reason','');
        window.Storage.write('refund-des','');

        this.requestData();
    }

    requestData(){
        let self = this;
        let r = window.RequestReadFactory.bmRefundReasonListRead();
        r.finishBlock = (req) => {
            let datas = req.responseObject.Datas;
            self.setState({
                _reasons:datas
            });
        };
        r.start();
    }

    userName(){
        return this.state._userName;
    }

    userPhone(){
        return this.state._userPhone;
    }

    /**
     * 提交
     */
    submitBtnClicked(){

        // host: "192.168.0.156:3000"
        // hostname: "192.168.0.156"
        // href: "http://192.168.0.156:3000/?action=refund&inApp=true&orderNo=201705170000000003"
        // origin: "http://192.168.0.156:3000"
        // pathname: "/"
        // port: "3000"
        // protocol: "http:"
        // search: "?action=refund&inApp=true&orderNo=201705170000000003"

        let self = this;
        let orderId = window.Tool.getURLParameter('orderId');
        console.log('orderId = ' + orderId);
        this.refundId = window.Tool.guid();
        let r = window.RequestWriteFactory.bmRefund(this.refundId,orderId,this.state._selectedReason.Id,this.state._refundDes);
        r.finishBlock = (req) =>
        {
            let location = window.location;
            let newSearch = location.search.replace('action=refund','action=refund-finish');
            newSearch = newSearch + '&refundId=' + this.refundId;
            let newHref = location.origin + location.pathname + newSearch;
            console.log('new href = ' + newHref);
            window.location.href = newHref;
        }
        r.start();
    }

    selectOnChange(e){
        let selet = e.currentTarget;
        console.log('select value = ' + selet.value);
        window.Storage.write('refund-reason',selet.value);
    }

    textareaOnChange(e){
        let element = e.currentTarget;
        let value = element.value;
        console.log('textareaOnChange : ' + value);
        window.Storage.write('refund-des',value);
    }

    selectOptions(){
        let arr = [];
        this.state._reasons.forEach((reason,index) => {
            arr.push(<option key={reason.Order} value={reason.Id}>{reason.Name}</option>)
        });
        return arr;
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
            <div style={styles.reasonCell}>
                <span>退款原因：</span>
                <div>
                    <select onChange={this.selectOnChange.bind(this)} dir="rtl" style={{backgroundColor:'transparent',borderColor:'transparent',height:20,marginTop:0,align:'right'}}>
                        {this.selectOptions()}
                    </select>
                    <img style={styles.reasonImg}/>
                </div>
            </div>
            <div style={styles.des}>
                <span>退款说明：</span>
                <textarea onChange={this.textareaOnChange.bind(this)} style={styles.textarea} placeholder="选填"></textarea>
            </div>
            <div style={styles.contact}>
                <span style={styles.name}>退款联系人：{this.userName()}</span>
                <div style={styles.phoneBase}>
                    <span style={styles.phoneTitle}>联系方式：</span>
                    <span style={styles.phoneValue}>{this.userPhone()}</span>
                </div>
            </div>
            <div onClick={this.submitBtnClicked.bind(this)} style={styles.submitBtnBase}>
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