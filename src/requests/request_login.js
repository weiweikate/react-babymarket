/**
 * Created by coin on 3/12/17.
 */

import Request from './request'
import Network from './network'

//写入请求基类
export default class RequestLogin extends Request {

    constructor(username,password) {
        super({});
        this.baseUrl = Network.sharedInstance().loginURL;

        this.username = username;
        this.password = password;
    }

    //拼接body
    body() {
        this._body = {
            "LoginName":this.username,
            "Password":this.password,
            "Medium":"React Web"
        };
        this.bodyParam = this._body;
        return this._body;
    }
}
