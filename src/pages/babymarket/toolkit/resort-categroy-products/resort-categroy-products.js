/**
 * Created by Patrick on 06/11/2017.
 */

import React, {Component} from 'react';
import BabymarketToolKitFilter from '../common/filter/bm-filter-bar';
import BabymarketToolKitProductCell from './product/product-cell';

export default class BabymarketToolKitResortCategoryProducts extends Component {

    constructor(props){
        super();
        this.state = {
            firstCategorys:[],
            secondCategorys:[],
            products:[],
            firstCurrentIndex:0,
            secondCurrentIndex:0,
        }
        this.currentCategoryId = '';
        this.getFirstCategorys();
    }

    getFirstCategorys(){
        let self = this;
        let r = window.RequestReadFactory.bmFirstProductsCategoryRead();
        r.finishBlock = (res) => {
            let datas = res.responseObject.Datas;
            self.setState({
                firstCategorys:datas,
            })
            if (window.Tool.isValidArr(datas)) {
                let pid = datas[0].Id;
                self.getSecondCategorys(pid);
            }
        }
        r.start()
    }

    getSecondCategorys(pid){
        let self = this;
        let r = window.RequestReadFactory.bmSecondProductsCategoryRead(pid);
        r.finishBlock = (res) => {
            let datas = res.responseObject.Datas;
            self.setState({
                secondCategorys:datas,
            })
            if (window.Tool.isValidArr(datas)) {
                let pid = datas[0].Id;
                self.getProducts(pid);
            }
        }
        r.start()
    }

    getProducts(pid){
        this.currentCategoryId = pid;

        let self = this;
        let r = window.RequestReadFactory.bmGetCategoryProducts(pid);
        r.finishBlock = (res) => {
            let datas = res.responseObject.Datas;
            self.setState({
                products:datas,
            })
        }
        r.start()
    }

    componentDidMount() {

    }

    firstCategoryOnChange(e){
        let select = e.currentTarget;
        console.log('the 1select value = ' + select.value);
        let pid = select.value;
        this.getSecondCategorys(pid);

        if (window.Tool.isValidArr(select.selectedOptions)) {
            let index = parseInt(select.selectedOptions[0].dataset.index);
            this.setState({
                firstCurrentIndex:index,
                secondCurrentIndex:0,
            })
            console.log('the 1select index = ' + index);
        }
    }

    secondCategoryOnChange(e){
        let select = e.currentTarget;
        console.log('the 2select value = ' + select.value);

        this.getProducts(select.value);

        if (window.Tool.isValidArr(select.selectedOptions)) {
            let index = parseInt(select.selectedOptions[0].dataset.index);
            this.setState({
                secondCurrentIndex:index,
            })
            console.log('the 2select index = ' + index);
        }
    }

    submitButtonOnClick(){
        console.log('submitButtonOnClick');
    }

    onDownClick(e){
        let index = parseInt(e.currentTarget.dataset.index);
        console.log('onDownClick:' + index);

        if (index == this.state.products.length - 1) {
            alert('已经是第最后一个了');
            return;
        }

        let preIndex = index + 1;
        let preProduct = this.state.products[preIndex];
        let currentProduct = this.state.products[index];
        if (preProduct.Order == 999 || currentProduct.Order == 999) {
            alert('请先点击「自动分配排序值」按钮');
            return;
        }

        let bodys = [{
            Id:preProduct.Id,
            Order:currentProduct.Order,
        },{
            Id:currentProduct.Id,
            Order:preProduct.Order,
        }]
        let r = window.RequestWriteFactory.bmModifyProducts(bodys);
        r.finishBlock = (res) => {
            this.getProducts(this.currentCategoryId);
        }
        r.start();
    }

    onUpClick(e){
        let index = parseInt(e.currentTarget.dataset.index);
        console.log('onUpClick:' + index);

        if (index == 0) {
            alert('已经是第一个了');
            return;
        }

        let preIndex = index - 1;
        let preProduct = this.state.products[preIndex];
        let currentProduct = this.state.products[index];
        if (preProduct.Order == 999 || currentProduct.Order == 999) {
            alert('请先点击「自动分配排序值」按钮');
            return;
        }

        let bodys = [{
            Id:preProduct.Id,
            Order:currentProduct.Order,
        },{
            Id:currentProduct.Id,
            Order:preProduct.Order,
        }]
        let r = window.RequestWriteFactory.bmModifyProducts(bodys);
        r.finishBlock = (res) => {
            this.getProducts(this.currentCategoryId);
        }
        r.start();
    }

    autoSort(){
        let bodys = [];

        let i = 1;
        for (let product of this.state.products) {
            bodys.push({
                Id:product.Id,
                Order:i+'',
            })
            i++;
        }

        let r = window.RequestWriteFactory.bmModifyProducts(bodys);
        r.finishBlock = (res) => {
            this.getProducts(this.currentCategoryId);
        }
        r.start();
    }

    getCells(){
        let cells = [];

        if (window.Tool.isEmptyArr(this.state.products)) {
            return cells;
        }

        let i = 0;
        for (let p of this.state.products) {
            cells.push(<BabymarketToolKitProductCell
                key={i}
                index={i}
                onUpClick={this.onUpClick.bind(this)}
                onDownClick={this.onDownClick.bind(this)}
                product={p}
            />);
            i++;
        }

        return cells;
    }

    render(){
        return <div style={styles.root}>
            <BabymarketToolKitFilter
                submitButtonOnClick={this.submitButtonOnClick.bind(this)}
                firstCategoryOnChange={this.firstCategoryOnChange.bind(this)}
                secondCategoryOnChange={this.secondCategoryOnChange.bind(this)}
                firstCategorys={this.state.firstCategorys}
                secondCategorys={this.state.secondCategorys}
                firstCurrentIndex={this.state.firstCurrentIndex}
                secondCurrentIndex={this.state.secondCurrentIndex}
            />
            <button onClick={this.autoSort.bind(this)}>自动分配排序值</button>
            <span>{'查到' + this.state.products.length + '条记录'}</span>
            {this.getCells()}
        </div>
    }
}

const styles = {
    root:{
        // backgroundColor:'lightGray',
    },

}