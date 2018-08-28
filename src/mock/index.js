import Mock from 'mockjs';
import { message } from 'antd';

Mock.setup({timeout: '1200-2600'})

Mock.mock('/api/login', (option) => {
	let param = JSON.parse(option.body);
	let res = {
        code: 200,
        token: '15454852124854',
        data: {
			userName: param.userName
		}
    }
	// if(param.userName !== 'zzf') {
	// 	res.code = 502
	// 	res.data.msg = '用户名错误！'
	// }else if(param.password !== '123456') {
	// 	res.code = 502
	// 	res.data.msg = '密码错误！'
	// }else {
	// 	res.data.userName = 'zzf'
	// }
    return res
})

Mock.mock('/api/companyList', () => {
	let res = {
        code: 200,
        data: []
    }
    for (let i = 0; i < 22; i++) {
	  (res.data).push({
	    key: i,
	    name: `Edward King ${i}`,
	    age: `${i}`,
	    address: `London, Park Lane no. ${i}`,
	  });
	}

	if(!localStorage.token) {
		message.warning('用户验证失败，请重新登录！');
		return false
	}
    return res
})
