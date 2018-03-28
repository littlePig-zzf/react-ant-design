import axios from './axios';
//import {Storage} from 'commons/js/utils';

let api = {
    /**
     * 验证
     * @param {*} res 
     */
    validResponed(res){
        if (res.status !== 200 || res.statusText.toLowerCase() !== 'ok') {
            return Promise.reject(res.data);
        }
    },
    /**
    * get公共调用方法
    * @param {any} url
    * @param {any} params
    * @param {any} success
    * @param {any} failure
    */
    get(url, params = {}, success, failure){
        if(params) params._ = Date.parse(new Date());  //设置请求不缓存
        axios.get(url, { params: params })
        .then(res => {
            this.validResponed(res);
            if(success) success(res.data);
        }).catch(error => {
            if(failure) failure(error);
        });
    },
    /**
    * post公共调用方法
    * @param {any} url
    * @param {any} params
    * @param {any} success
    * @param {any} failure
    */
    post(url, params = {}, success, failure){

        axios.post(url, params)
        .then(res => {
            this.validResponed(res);
            if(success) success(res.data);
        })
        .catch(error => {
            if(failure) failure(error);
        });
    }
}

export default function(){
    let which, params, success, failure;
    if(typeof arguments[1] === "function"){
        which = arguments[0];
        success = arguments[1];
        failure = arguments[2];
    }else{
        which = arguments[0];
        params = arguments[1];
        success = arguments[2];
        failure = arguments[3];
    }
	api[which.type](which.url, params, success, failure);
};