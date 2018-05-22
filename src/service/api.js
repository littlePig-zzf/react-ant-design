
const API_FULL = 'https://api.myjson.com/bins/'; // 测试服
// const API_FULL = 'http://c.xiulianzone.com'; // 正式服
// https://api.myjson.com/bins/pvwou
export const SERVER_URL = API_FULL;

export const GET_IMG = API_FULL + '/api/getfile/img?id=';

export const api = {
    common: {
        index: {
            type: 'post',
            url: '/api/login'
            // url: API_FULL + 'pvwou'
        }
    },
    storeDetail: {
        detail: {
            type: 'get',
            url: API_FULL + '/api/owner/aiche/mstore/detail/v1.3.3'
        },
        comment: {
            type: 'get',
            url: API_FULL + '/api/owner/aiche/app/comment/store/list'
        },
        vote: {
            type: 'post',
            url: API_FULL + '/api/owner/aiche/app/comment/vote'
        }
    }
}
