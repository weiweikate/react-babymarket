/**
 * Created by coin on 23/05/2017.
 */

import React from 'react';
import TCNavigationBar from '../../../common/nav/tc-navigation-bar';
import ProvinceSelectItem from './item/province-select-item';

class AreaLevel {}
AreaLevel.Province = 1;
AreaLevel.City = 2;
AreaLevel.District = 3;
Object.freeze(AreaLevel);

export default class ProvinceSelect extends React.Component {
    state = {
        maxLevel:AreaLevel.District,
        currentLevel:AreaLevel.Province,
        parentId:'',
        dataArray:[],

        addressId:'',
        fullName:'',
    }

    requestData(){
        let self = this;
        let r = window.RequestReadFactory.bmAreaListRead(this.state.currentLevel,this.state.parentId);
        r.finishBlock = (req) => {
            self.setState({
                dataArray:req.responseObject.Datas
            })
        };
        r.start();
    }

    onRightClick(){

    }

    onLeftClick(){
        window.history.back();
    }

    componentDidMount() {
        this.requestData();

    }

    /**
     * cell点击事件
     * @param index
     */
    itemOnClick(index){
        console.log('itemOnClick: ' + index);
        if (index >= 0) {
            let item = this.state.dataArray[index];

            if (this.state.currentLevel == this.state.maxLevel || parseInt(item.ZJS) == 0) {
                //finish
                let newLevel = this.state.currentLevel + 1;
                this.setState({
                    fullName:item.FullName,
                    currentLevel:newLevel,
                    parentId:item.Id
                });

                window.Storage.write('address-id',item.Id);
                window.Storage.write('address-name',item.FullName);
                // window.history.back();
                window.location.href = window.Tool.newHrefWithAction('add-address');
            }
            else{
                let newLevel = this.state.currentLevel + 1;
                this.state.fullName = item.FullName;
                this.state.currentLevel = newLevel;
                this.state.parentId = item.Id;
                console.log(this.state);
                this.requestData();
            }
        }
    }

    itemList(){
        let arr = [];

        this.state.dataArray.forEach((item,index) => {
            arr.push(<ProvinceSelectItem index={index} itemOnClick={this.itemOnClick.bind(this)} title={item.Name} key={index}/>)
        });

        return arr;
    }

    render(){
        return (
            <div>
                <TCNavigationBar
                    title="省市区选择"
                    onLeftClick={this.onLeftClick.bind(this)}
                />
                <ul style={styles.main}>
                    {this.itemList()}
                </ul>
            </div>
        );
    }
}

const styles = {
    main:{
        marginTop:48
    }
}