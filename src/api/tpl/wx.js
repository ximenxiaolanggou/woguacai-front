import request from '@/utils/request'


/**
 * 微信账号平台登录
 * @param data
 * @returns {AxiosPromise}
 */
export function bind(data,openId) {
    return request({
        url: `/wx/auth/bind/${openId}`,
        method: 'post',
        data
    })
}

/**
 * 微信登录
 * @returns {AxiosPromise}
 */
export function render() {
    return request({
        url: `/wx/auth/render`,
        method: 'get',
    })
}


