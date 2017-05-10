/**
 * Created by coin on 4/5/17.
 */
import React,{Component} from 'react';
import './bm-dy-detail-content.css';

export default class BMDyDetailContent extends Component {

    mentionDidClicked(e){
        let index = Number(e.target.id);
        let member = this.props.data.NoticeList[index];
        let data = {
            'userId':member.MemberId,
            'username':member.NicknName
        };
        window.JSBridge.sendDataToNative(data,'mentionDidClicked');
    }

    topicDidClicked(e){
        let index = Number(e.target.id);
        let topic = this.props.data.Sign_List[index];
        let data = {
            'topic':topic.Sign_Name,
            'topicId':topic.SignId
        };
        window.JSBridge.sendDataToNative(data,'topicDidClicked');
    }

    avatarDidClicked(e){
        let data = {
            'userId': this.props.data.MemberId,
        };
        window.JSBridge.sendDataToNative(data,'avatarDidClicked');
    }

    createTime(){
        return window.Tool.timeDurationStringForDateString(this.props.data.CreateTime);
    }

    generateMentions(){
        let arr = [];
        let mentions = this.props.data.NoticeList;
        if (window.Tool.isValidArr(mentions)) {
            let i = 0;
            mentions.forEach((mention)=>{
                arr.push(<span
                    id={i}
                    key={i}
                    onClick={this.mentionDidClicked.bind(this)}
                    className="bmdd-content-at">@{mention.NicknName}
                    </span>)
                i++;
            });
        };
        return arr;
    }

    generateTopic(){
        let arr = [];
        let topics = this.props.data.Sign_List;
        if (window.Tool.isValidArr(topics)) {
            let i = 0;
            topics.forEach((topic) => {
                arr.push(<span
                    id={i}
                    key={i}
                    onClick={this.topicDidClicked.bind(this)}
                    className="bmdd-content-topic">#{topic.Sign_Name}#
                </span>);
                i++;
            });
        }
        return arr;
    }

    render(){
        return <div className="bmdd-content-root">
            <div className="bmdd-content-user-time">
                <div onClick={this.avatarDidClicked.bind(this)} className="bmdd-content-userinfo">
                    <img
                        onError={window.TCGlobal.onImageLoadError}
                        className="bmdd-content-avatar"
                        src={window.Tool.avatarURLForId(this.props.data.PictureId)}
                    />
                    <span className="bmdd-content-name">{this.props.data.NickName}</span>
                </div>
                <span className="bmdd-content-time">{this.createTime()}</span>
            </div>

            <div className="bmdd-content-text-contariner">
                <span className="bmdd-content-content">{this.props.data.Content}</span>
                {this.generateMentions()}
                {this.generateTopic()}
            </div>
        </div>
    }
}
