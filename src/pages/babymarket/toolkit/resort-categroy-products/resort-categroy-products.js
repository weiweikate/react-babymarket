/**
 * Created by Patrick on 06/11/2017.
 */

import React, {Component} from 'react';
import BabymarketToolKitFilter from '../common/filter/bm-filter-bar';

export default class BabymarketToolKitResortCategoryProducts extends Component {

    constructor(props){
        super();
        this.state = {
            firstCategorys:[],
            secondCategorys:[],
        }

        let self = this;

        let r = window.RequestReadFactory.bmFirstProductsCategoryRead();
        r.finishBlock = (res) => {
            let datas = res.responseObject.datas;
            self.setState({
                firstCategorys:datas,
            })
        }
        r.start()
    }

    componentDidMount() {

    }

    selectOnChange(e){
        let selet = e.currentTarget;
        console.log('the select value = ' + selet.value);
    }

    submitButtonOnClick(){
        console.log('submitButtonOnClick');
    }

    render(){
        return <div style={styles.main}>
            <BabymarketToolKitFilter
                submitButtonOnClick={this.submitButtonOnClick}
                firstCategorys={this.state.firstCategorys}
            />
        </div>
    }
}

const styles = {
    root:{

    },

}