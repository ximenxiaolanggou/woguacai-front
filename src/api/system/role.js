import request from '@/utils/request'

const api = {
    list: '/sysRole/list',
}

/**
 * 分页
 * @param pageNumber
 * @param pageSize
 * @param searchKey
 * @returns {AxiosPromise}
 */
export function list() {
    return request({
        url: api.list,
        method: 'get'
    })
}

