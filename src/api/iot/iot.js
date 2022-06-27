import request from '@/utils/request'

const api = {
    add: '/iot',
    update: '/iot',
    list: '/iot/list',
    openOrCloseLed: '/iot/openOrCloseLed',
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
 * 修改
 * @param id
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

// 开关灯
export function openOrCloseLed({id,ledValue}) {
    return request({
        url: `${api.openOrCloseLed}/${id}`,
        method: 'put',
        params: {openOrClose:ledValue}
    })
}





