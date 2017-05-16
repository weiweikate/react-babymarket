/**
 * Created by coin on 4/5/17.
 */

import React , {Component} from 'react';
import './bm-dy-detail-comment.css';

export default class BMDyDetailComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            liked:false,
            likeCount:0
        }
        this.likeId = '';
    }

    componentWillReceiveProps(nextProps) {
        this.didLiked(nextProps);
    }

    componentDidMount() {
        this.didLiked(this.props);
    }

    /**
     * 头像点击
     * @param e
     */
    avatarDidClicked(e){
        let data = {
            'userId': (e.target.id === 'reply-name') ? this.props.comment.FromCommentPersonId:this.props.comment.MemberId,
        };
        window.JSBridge.sendDataToNative(data,'avatarDidClicked');
    }

    /**
     * 回复点击
     * @param e
     */
    dynamicDetailCommentReplyDidClicked(e){
        let data = {
            'commentId': this.props.comment.Id,
        };
        if (window.Storage.didLogin() === false) {
            window.JSBridge.sendDataToNative(data,'needLogin');
            return;
        }
        window.JSBridge.sendDataToNative(data,'dynamicDetailCommentReplyDidClicked');
    }

    /**
     * 评论点赞点击
     */
    dynamicDetailCommentLikeDidClicked(){
        let data = {
            'commentId': this.props.comment.Id,
        };

        if (window.Storage.didLogin() === false) {
            window.JSBridge.sendDataToNative(data,'needLogin');
            return;
        }
        window.JSBridge.sendDataToNative(data,'dynamicDetailCommentLikeDidClicked');

        let self = this;
        let count = this.state.likeCount;
        if (this.state.liked) {
            let r = window.RequestWriteFactory.dynamicCommentLikeCancel(this.likeId);
            r.finishBlock = (req) => {
                --count
                self.setState({
                    liked:false,
                    likeCount:count
                })
            };
            r.start();
        }
        else
        {
            this.likeId = window.Tool.guid();
            let r = window.RequestWriteFactory.dynamicCommentLikeAdd(this.props.comment.Id,this.likeId);
            r.finishBlock = (req) => {
                ++count;
                self.setState({
                    liked:true,
                    likeCount:count
                })
            };
            r.start();
        }
    }

    createTime(){
        return window.Tool.timeDurationStringForDateString(this.props.comment.CreateTime);
    }

    likeIcon(){
        return this.state.liked ? './img/dynamic-comment-like-select.png':'./img/dynamic-comment-like-normal.png';
    }

    replyElement(){
        if (window.Tool.isValidId(this.props.comment.FromCommentsId)) {
            return <div className="bmdd-comment-reply-container">
                <span onClick={this.avatarDidClicked.bind(this)} id="reply-name" className="bmdd-comment-reply-auther">{this.props.comment.FromCommentPersonName}: </span>
                <span className="bmdd-comment-reply-content">{this.props.comment.FromCommentContent}</span>
            </div>
        }
    }

    didLiked(props){
        this.setState({
            likeCount:parseInt(props.comment.Compliments)
        })

        let currentMemberId = window.Storage.currentMemberId();
        let likes = props.comment.Compliment_List;//todo
        if (window.Tool.isValidObject(likes)) {
            for (let i = 0; i < likes.length; i++ ) {
                let like = likes[i];
                if (like.MemberId === currentMemberId) {
                    this.likeId = like.Id;
                    this.setState({
                        liked:true
                    });
                    return true;
                }
            }
        }
        this.setState({
            liked:false
        });
        return false;
    }

    render(){
        return <li className="bmdd-comment-root">
            <div className="bmdd-comment-auther">

                <div onClick={this.avatarDidClicked.bind(this)} className="bmdd-comment-auther-left">
                    <img
                        onError={window.TCGlobal.onImageLoadError}
                        className="bmdd-conmment-avatar"
                        src={window.Tool.avatarURLForId(this.props.comment.PictrueId)}
                    />

                    <div className="bmdd-comment-name-container">
                        <span className="bmdd-comment-name">{this.props.comment.NickName}</span>
                        <span className="bmdd-comment-time">{this.createTime()}</span>
                    </div>
                </div>

                <div className="bmdd-comment-auther-right">
                    <div onClick={this.dynamicDetailCommentLikeDidClicked.bind(this)} className="bmdd-comment-like-containner">
                        <img src={this.likeIcon()} className="bmdd-comment-like-img"/>
                        <span className="bmdd-comment-like-text">{this.state.likeCount <= 0 ? "赞":this.state.likeCount}</span>
                    </div>

                    <span onClick={this.dynamicDetailCommentReplyDidClicked.bind(this)} className="bmdd-comment-reply">回复</span>

                </div>
            </div>
            {this.replyElement()}
            <span className="bmdd-comment-content">{this.props.comment.Content}</span>
            <div className="bmdd-comment-sepline"></div>
        </li>
    }
}


