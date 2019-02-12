
import client from './client'
const apiClicent = client('')

export const api = {
    login: (params) => apiClicent.post('/api/login', {params}),
    company: () => apiClicent.get('/api/companyList')
}
