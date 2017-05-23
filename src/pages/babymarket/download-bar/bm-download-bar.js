/**
 * Created by coin on 4/10/17.
 */
import React,{Component} from 'react';
import './bm-download-bar.css';

export default class BMDownloadBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            showSelf:true,
            downloadUrl:''
        };
    }

    componentDidMount() {
        let link = this.link();
        this.setState({
            downloadUrl:link
        })
        console.log('download url = ' + link);
    }

    link(){
        let fromId = window.Tool.getURLParameter('fromId');
        let theId = window.Tool.getURLParameter('Id');
        let productId = '';
        let dynamicId = '';

        if (window.action === 'product-detail') {
            productId = theId;
        }
        else if (window.action === 'dynamic-detail') {
            dynamicId = theId;
        }
        let link = window.Tool.mLinkDownloadURL(fromId,productId,dynamicId);
        return link;
    }

    closeOnClick(){
        this.setState({
            showSelf:false
        });
    }

    render(){
        return <div className={this.state.showSelf ? "bmdb-root":'bmdb-hidde'}>
            <div className="bmdb-left">
                <img src="/img/close-button.png" onClick={this.closeOnClick.bind(this)} className="bmdb-close"/>
                <img src="/img/AppIcon.png" className="bmdb-icon"/>
                <div className="bmdb-text-container">
                    <span className="bmdb-title">宝贝码头</span>
                    {/*<span className="bmdb-des">描述</span>*/}
                </div>
            </div>
            <a id="invite_download0" href={this.state.downloadUrl}><span className="bmdb-download-button">打开</span></a>
        </div>
    }
}