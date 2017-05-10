/**
 * Created by coin on 3/27/17.
 */

import React, {Component} from 'react';
import './friend-circle-detail.css';
import FriendCircelCommentCell from './cell/friend-circle-comment-cell';
import FriendCircleContentCell from './cell/friend-circle-content-cell';
import FriendCircleLikeCell from './cell/friend-circle-like-cell';
import FriendCirclePhotoCell from './cell/friend-circle-photo-cell/friend-circle-photo-cell';
import FirendCircleTimeCell from './cell/friend-circle-time-cell';

export default class FriendCircleDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar:'',
            content:'',
            name:'',
            time:'',
            photos:[],
            likes:[],
            comments:[],
        };
    }

    componentDidMount() {
        //登陆
        let r = window.RequestReadFactory.login('zhujianting','zhujianting');
        r.finishBlock = (req) => {
            console.log('Session:' + req.responseObject.Session);
            let session = req.responseObject.Session;
            if (window.Tool.isValidStr(session)) {

                //记录用户名
                // window.Storage.setLoginUserName(this.data.usernameText);

                //标记已登录
                window.Storage.setDidLogin(true);

                //保存session
                window.Storage.setCurrentSession(session);

                //返回
                window.Tool.navigationPop();

                this.requestData();
            }
            else
            {
                window.Tool.showAlert('登录失败!!!');
            }
        };
        r.completeBlock = () => {
            window.Tool.hideLoading();
        };
        r.start();
        window.Tool.showLoading();
    }

    requestData(){
        let theId = window.Tool.getURLParameter('Id');
        if (window.Tool.isEmptyStr(theId)) {
            theId = '238cfe32-bebb-4c1d-925c-a8415b274235';
        }
        let r = window.RequestReadFactory.topShareListRead(theId);
        let self = this;
        r.finishBlock = (req) => {
            if (window.Tool.isValidArr(req.responseObject.Datas)) {
                let data = req.responseObject.Datas[0];
                self.setState({
                    avatar:data.SaleImgId,
                    content:data.Content,
                    name:data.SalesName,
                    time:data.CreateTime,
                    photos:data.ImgDetail,
                    likes:data.Compliments,
                    comments:data.Comment
                })
            }
        };
        r.completeBlock = () => {
            window.Tool.hideLoading();
        };
        r.start();
        window.Tool.showLoading();
    }

    generatePhotos(){
        if (window.Tool.isValidArr(this.state.photos)) {
            return <FriendCirclePhotoCell photos={this.state.photos}/>;
        }
    }

    generateLikes(){
        if (window.Tool.isValidArr(this.state.likes)) {
            return <FriendCircleLikeCell likes={this.state.likes}/>
        }
    }

    generateComments(){
        if (window.Tool.isValidArr(this.state.comments)) {
            let comments = [];
            let i = 0;
            this.state.comments.forEach(function (comment) {
                comments.push(<FriendCircelCommentCell key={i} comment={comment}/>)
                i++;
            });
            return comments;
        }
    }

    render(){
        return <div>
            <FriendCircleContentCell
                avatar={this.state.avatar}
                name={this.state.name}
                content={this.state.content}
            />
            {this.generatePhotos()}
            <FirendCircleTimeCell time={this.state.time}/>
            {this.generateLikes()}
            {this.generateComments()}
        </div>
    }
}
