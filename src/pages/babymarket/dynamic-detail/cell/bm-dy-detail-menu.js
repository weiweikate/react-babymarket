/**
 * Created by coin on 4/5/17.
 */

import React,{Component} from 'react';
import './bm-dy-detail-menu.css';

export default class BMDyDetailMenu extends Component
{
    constructor(props){
        super(props);
        this.state = {
            liked:false,
            favorited:false
        }
        this.favId = '';
        this.likeId = '';
    }

    componentWillReceiveProps(nextProps) {
        this.didFavorited(nextProps);
        this.didLiked(nextProps);
    }

    /**
     * 分享
     */
    dynamicShareDidClicked(){
        let data = {
            'dynamicId':this.props.dynamicId
        };
        if (window.Storage.didLogin() === false) {
            window.JSBridge.sendDataToNative(data,'needLogin');
            return;
        }
        window.JSBridge.sendDataToNative(data,'dynamicShareDidClicked');
    }

    /**
     * 评论
     */
    dynamicCommentDidClicked(){

        let data = {
            'dynamicId':this.props.dynamicId
        };
        if (window.Storage.didLogin() === false) {
            window.JSBridge.sendDataToNative(data,'needLogin');
            return;
        }
        window.JSBridge.sendDataToNative(data,'dynamicCommentDidClicked');
    }

    /**
     * 收藏
     */
    dynamicFavoriteDidClicked(){
        let data = {
            'dynamicId':this.props.dynamicId
        };
        if (window.Storage.didLogin() === false) {
            console.log('not login');
            window.JSBridge.sendDataToNative(data,'needLogin');
            return;
        }

        let self = this;
        if (this.state.favorited) {
            let r = window.RequestWriteFactory.dynamicFavoriteCancel(this.favId);
            r.finishBlock = (req) => {
                self.setState({
                    favorited:false
                });
                data['favorited'] = false;
                data['favId'] = this.favId;
                window.JSBridge.sendDataToNative(data,'dynamicFavoriteDidClicked');
            };
            r.start();
        }
        else
        {
            this.favId = window.Tool.guid();
            let r = window.RequestWriteFactory.dynamicFavoriteAdd(this.props.dynamicId,this.favId);
            r.finishBlock = (req) => {
                self.setState({
                    favorited:true
                });
                data['favorited'] = true;
                data['favId'] = this.favId;
                window.JSBridge.sendDataToNative(data,'dynamicFavoriteDidClicked');
            };
            r.start();
        }
    }

    /**
     * 点赞
     */
    dynamicLikeDidClicked(){
        let data = {
            'dynamicId':this.props.dynamicId
        };
        if (window.Storage.didLogin() === false) {
            window.JSBridge.sendDataToNative(data,'needLogin');
            return;
        }

        let self = this;
        if (this.state.liked) {
            let r = window.RequestWriteFactory.dynamicLikeCancel(this.likeId);
            r.finishBlock = (req) => {
                self.setState({
                    liked:false
                });
                data['liked'] = false;
                data['likeId'] = this.likeId;
                window.JSBridge.sendDataToNative(data,'dynamicLikeDidClicked');
            };
            r.start();
        }
        else
        {
            this.likeId = window.Tool.guid();
            let r = window.RequestWriteFactory.dynamicLikeAdd(this.props.dynamicId,this.likeId);
            r.finishBlock = (req) => {
                self.setState({
                    liked:true
                });
                data['liked'] = true;
                data['likeId'] = this.likeId;
                window.JSBridge.sendDataToNative(data,'dynamicLikeDidClicked');
            };
            r.start();
        }
    }

    favoriteIcon(){
        return this.state.favorited ? './img/dynamic-favorite-icon-select.png' : './img/dynamic-favorite-icon-normal.png';
    }

    likeIcon(){
        return this.state.liked ?  './img/dynamic-like-icon-select.png': './img/dynamic-like-icon-normal.png';
    }

    didFavorited(props){
        let currentMemberId = window.Storage.currentMemberId();
        let favorites = props.data.FavDetail;
        if (window.Tool.isValidObject(favorites)) {
            for (let i = 0; i < favorites.length; i++ ) {
                let favorite = favorites[i];
                if (favorite.MemberId === currentMemberId) {
                    this.favId = favorite.FromFavId;
                    this.setState({
                        favorited:true
                    });
                    return true;
                }
            }
        }
        this.setState({
            favorited:false
        });
        return false;
    }

    didLiked(props){
        let currentMemberId = window.Storage.currentMemberId();
        let likes = props.data.Compliment_List;
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

    deleteDynamic(){
        let data = {
            'dynamicId':this.props.dynamicId
        };
        window.JSBridge.sendDataToNative(data,'dynamicDeleteBtnClicked');
    }

    deleteBtn(){
        if (this.props.data.CreatorId === window.Storage.currentMemberId()) {
            return <span className="deleteBtn" onClick={this.deleteDynamic.bind(this)}>删除</span>;
        }
    }

    render(){
        return <div className="bmddm-root">
            <div className="bmddm-left">
                <img src={this.favoriteIcon()} onClick={this.dynamicFavoriteDidClicked.bind(this)} className="bmddm-img"/>
                <img src={this.likeIcon()} onClick={this.dynamicLikeDidClicked.bind(this)} className="bmddm-img"/>
                <img src={'./img/dynamic-share-icon-normal.png'} onClick={this.dynamicShareDidClicked.bind(this)} className="bmddm-img"/>
                {this.deleteBtn()}
            </div>
            <img src={'./img/dynamic-comment-icon.png'} onClick={this.dynamicCommentDidClicked.bind(this)} className="bmddm-img"/>
        </div>
    }
}



