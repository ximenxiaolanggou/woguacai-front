import request from '@/utils/request'

const api = {
    page: '/sysUser/page',
    add: '/sysUser',
    update: '/sysUser',
    del: '/sysUser'
}

/**
 * 分页
 * @param pageNumber
 * @param pageSize
 * @param searchKey
 * @returns {AxiosPromise}
 */
export function page({pageNumber, pageSize, searchKey}) {
    return request({
        url: `${api.page}/${pageNumber}/${pageSize}`,
        method: 'get',
        params: {searchKey}
    })
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

