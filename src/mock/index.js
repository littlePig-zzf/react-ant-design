import Mock from 'mockjs';

Mock.setup({timeout: '1200-2600'})

Mock.mock('/api/login', {
	data: {
		username: 'zzf',
		password: '123456'
	}
})