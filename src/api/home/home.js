import request from '@/utils/request'

const api = {
    getTemp: '/home/temp',
}


/**
 * 获取温度数据
 * @returns {AxiosPromise}
 */
export function getTemp(id) {
    return request({
        url:`${ api.getTemp}/${id}`,
        method: 'get',
    })
}







