import axios from './axios';

let http = {

    validResponed(res) {
        if (res.status !== 200 || res.statusText.toLowerCase() !== 'ok') {
            return Promise.reject(res.data);
        }
    },

    axioHandle(url, params = {}, success, failure, type) {
        type = type.toLowerCase()
        if (type === 'get' && params) params._ = Date.parse(new Date())
        axios[type](url, type === 'get' ? { params: params } : params)
        .then(res => {
            this.validResponed(res);
            if(success) success(res.data);
        }).catch(error => {
            if(failure) failure(error);
        });
    }

}

export default function() {
    let parameter = Array.from(arguments)  //将类数组转换成数组
    if (typeof arguments[1] === "function") {
        parameter.splice(1, 0, '')
    }
    let [which, params, success, failure] = parameter
	http.axioHandle(which.url, params, success, failure, which.type);
};