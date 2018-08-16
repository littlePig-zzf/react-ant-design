
import mockjs from 'mockjs';

const proxy = {
	// 登录
	'POST /api/login': (req,res) => {
		//需要传递的参数
		const { password, mobile} = req.body;  
		//返回的数据
		res.send({ msg : password === 'pig' && mobile === 'pig' ? {code: 200, token: '9798789789719823123123'} : 'error', type: 'account'})
	}
}

export default proxy;
