import request from '@/utils/request'


/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}

/**
 * 用户信息
 * @returns {AxiosPromise}
 */
export function userInfo() {
    return request({
        url: '/auth/userInfo',
        method: 'get'
    })
}


/**
 * 登出
 * @returns {AxiosPromise}
 */
export function logout() {
    return request({
        url: '/auth/logout',
        method: 'delete'
    })
}

