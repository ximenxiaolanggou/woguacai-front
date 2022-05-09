import request from '@/utils/request'

const api = {
    saveOrUpdate: '/blogArticle/saveOrUpdate',
}

export function saveOrUpdate(data) {
    return request({
        url: api.saveOrUpdate,
        method: 'post',
        data
    })
}



