/**
 * Created by coin on 18/05/2017.
 */

import React from 'react';
import TCNavigationBar from '../../../common/nav/tc-navigation-bar';
import BMAddAddressItem from './item/bm-add-address-item';

import TCBaseComponet from '../../../common/tc-base-componet';

export default class BMAddAddress extends TCBaseComponet{
    state = {
        name:'',
        phone:'',
        cardId:'',
        address:'',//省市区的全名
        addressId:'',//省市区的Id
        detail:'',//详细地址
    }
    orderId = '';
    memberId = '';

    constructor(){
        super();
        this.inheritStateFromSuper();
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillMount() {
        console.log('componentWillMount');
        let {Storage} = window;
        let addressId = Storage.read('address-id');
        let addressName = Storage.read('address-name');
        let name = Storage.read('reciver-name');
        let phone = Storage.read('reciver-phone');
        let detail = Storage.read('address-detail');
        let cardId = Storage.read('card-id');

        this.setState({
            name:name,
            phone:phone,
            cardId:cardId,
            address:addressName,
            addressId:addressId,
            detail:detail,
        });
    }

    onRightClick(){
        let {Tool} = window;
        let {state} = this;
        if (Tool.isEmptyStr(state.name)) {
            Tool.showAlert('请填写收件人姓名');
            return;
        }
        if (Tool.isEmptyStr(state.phone)) {
            Tool.showAlert('请填写手机号码');
            return;
        }
        if (Tool.isEmptyStr(state.address)) {
            Tool.showAlert('请选择省市区');
            return;
        }
        if (Tool.isEmptyStr(state.detail)) {
            Tool.showAlert('请填写详细地址');
            return;
        }
        this.submit();
    }

    /**
     * 提交
     */
    submit(){
        let {state} = this;
        let self = this;

        /**
         * 检查手机号是否已注册
         */
        this.checkPhone((req,data) => {
            if (window.Tool.isValidObject(data)) {
                window.Tool.showAlert('该手机号已注册，请使用宝贝码头App下单');
            }
            else
            {
                /**
                 * 新增用户
                 */
                self.memberId = window.Tool.guid();
                window.Storage.setCurrentMemberId(self.memberId);

                self.showLoading();
                self.addOrder((req) => {
                    self.addUser((req) => {
                        self.addOrderLines((req) => {
                            window.location.href = window.Tool.newHrefWithAction('confirm-order');
                            self.hideLoading();
                        });
                    });
                });
            }
        });
    }

    /**
     * 检查手机号是否已注册
     */
    checkPhone(finishBlock){
        let {state} = this;
        let r = window.RequestReadFactory.bmMemberInfoReadByPhone(state.phone);
        r.finishBlock = finishBlock;
        r.start();
    }

    /**
     * 新增用户
     * @param finishBlock
     */
    addUser(finishBlock){
        let code = window.Tool.getURLParameter('fromId');

        let add = window.RequestWriteFactory.bmMemberAdd(this.state.phone,code,this.memberId,this.orderId);
        add.finishBlock = finishBlock;
        add.start();
    }

    /**
     * 新增临时订单
     * @param finishBlock
     */
    addOrder(finishBlock){
        let {state} = this;
        this.orderId = window.Tool.guid();
        window.Storage.write('orderId',this.orderId);

        let r = window.RequestWriteFactory.bmOrderAdd(
            this.orderId,
            this.memberId,
            state.addressId,
            state.name,
            state.phone,
            state.address,
            state.cardId
        );

        r.finishBlock = finishBlock;
        r.container = this;
        r.start();
    }

    /**
     * 添加订单明细
     * @param finishBlock
     */
    addOrderLines(finishBlock){
        let {Storage:s} = window;
        let productId = s.read('product-id');
        let price = s.read('product-price');

        //todo test
        price = '0.01';

        let r = window.RequestWriteFactory.bmOrderLinesAdd(this.orderId,productId,'1',price);
        r.finishBlock = finishBlock;
        r.start();
    }

    onLeftClick(){
        window.history.back();
    }

    nameOnChange(value){
        this.setState({
            name:value
        });
        Storage.write('reciver-name',value);
    }

    phoneOnChange(value){
        this.setState({
            phone:value
        });
        Storage.write('reciver-phone',value);
    }

    cardIdOnChange(value){
        this.setState({
            cardId:value
        });
        Storage.write('card-id',value);
    }

    detailOnChange(value){
        this.setState({
            detail:value
        });
        Storage.write('address-detail',value);
    }

    /**
     * 点击事件
     */
    itemOnClick(){
        console.log('省市区 cell 点击');
        window.location.href = window.Tool.newHrefWithAction('province-select');
    }

    render(){
        return (
            <div>
                <TCNavigationBar
                    rightText="完成"
                    title="收货地址"
                    onRightClick={this.onRightClick.bind(this)}
                    onLeftClick={this.onLeftClick.bind(this)}
                />


                <div style={styles.main}>

                    <BMAddAddressItem
                        value={this.state.name}
                        itemOnChange={this.nameOnChange.bind(this)}
                        title="收货人姓名："
                        placeholder="填写正确的收货人"
                    />

                    <BMAddAddressItem
                        value={this.state.phone}
                        itemOnChange={this.phoneOnChange.bind(this)}
                        title="手机号码："
                        placeholder="填写正确的手机号码"
                    />

                    <BMAddAddressItem
                        value={this.state.cardId}
                        itemOnChange={this.cardIdOnChange.bind(this)}
                        title="身份证号码："
                        placeholder="购跨境商品时，须正确填写"
                    />

                    <BMAddAddressItem
                        value={this.state.address}
                        title="省市区："
                        placeholder="填写正确的省市区"
                        itemOnClick={this.itemOnClick.bind(this)}
                        disabled={true}
                    />

                    <BMAddAddressItem
                        value={this.state.detail}
                        itemOnChange={this.detailOnChange.bind(this)}
                        title="详细地址："
                        placeholder="填写详细的收货地址"
                    />

                    {this.loadingComponents()}
                </div>

            </div>
        );
    }
}

const styles = {
    main:{
        margin:'44px 0px 0px',
        padding:'10px 0px',
        backgroundColor:'white',
    }
}

