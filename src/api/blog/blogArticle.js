import request from '@/utils/request'
import qs from 'qs'
const api = {
    saveOrUpdate: '/blogArticle/saveOrUpdate',
    page: '/blogArticle/page',
    findById: '/blogArticle/findById',
    del: '/blogArticle/del',
}

export function saveOrUpdate(data) {
    return request({
        url: api.saveOrUpdate,
        method: 'post',
        data
    })
}

/**
 * 分页
 * @param pageNumber
 * @param pageSize
 * @param searchKey
 * @returns {AxiosPromise}
 */
export function page(pageNumber, pageSize,params) {
    return request({
        url: `${api.page}/${pageNumber}/${pageSize}?${qs.stringify(params,{arrayFormat:'repeat'})}`,
        method: 'get',
    })
}

/**
 * 根据ID查询
 * @param id
 * @returns {AxiosPromise}
 */
export function findById(id) {
    return request({
        url: `${api.findById}/${id}`,
        method: 'get',
    })
}


/**
 * 根据ID删除
 * @param id
 * @returns {AxiosPromise}
 */
export function del(id) {
    return request({
        url: `${api.del}/${id}`,
        method: 'delete'
    })
}



