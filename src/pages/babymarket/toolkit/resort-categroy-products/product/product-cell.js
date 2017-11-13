/**
 * Created by Patrick on 09/11/2017.
 */
import React, {Component} from 'react';

export default class BabymarketToolKitProductCell extends Component {

    constructor(props){
        super();
        this.state = {
        }
    }

    componentWillMount() {
    }

    render(){
        let {ShowName,ImgId,Order} = this.props.product;
        let session = window.Storage.currentSession();
        return <div style={styles.root}>
            <button onClick={this.props.onUpClick} data-index={this.props.index}>上移</button>
            <button onClick={this.props.onDownClick} data-index={this.props.index}>下移</button>
            <span>排序值：{Order}</span>
            <img style={styles.img} src={'https://www.babymarkt.com.cn/Libra.Web.Businesses.Attachments.GetFile.aspx?_SESSION_=' +session+ '&Id=' + ImgId}/>
            <span>{ShowName}</span>
            <span>{Order}</span>
        </div>
    }
}

const styles = {
    root:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        // backgroundColor:'lightGray',
        // border:'2px solid white',
        fontSize:12,
    },

    img:{
        width:40,
        height:40,
        margin:5,
        border:'1px solid lightGray',
    }

}