import request from '@/utils/request'

const api = {
    add: '/blogCategory',
    list: '/blogCategory/list',
    del: '/blogCategory',
    update: '/blogCategory',
}

/**
 * 添加
 * @param data
 * @returns {AxiosPromise}
 */
export function add(data) {
    return request({
        url: api.add,
        method: 'post',
        data
    })
}

/**
 * 列表
 * @param searchKey
 * @returns {AxiosPromise}
 */
export function list(searchKey) {
    return request({
        url: api.list,
        method: 'get',
        params: {searchKey}
    })
}

/**
 * 修改
 * @param data
 * @returns {AxiosPromise}
 */
export function update(id,data) {
    return request({
        url: `${api.update}/${id}`,
        method: 'put',
        data
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



