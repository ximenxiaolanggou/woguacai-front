import request from '@/utils/request'

const api = {
    add: 'sysPermission',
    update: 'sysPermission',
    findPids: 'sysPermission/findPids',
    tree: '/sysPermission/tree',
    del: '/sysPermission',
    findByRole: '/sysPermission/findByRole'
}

/**
 * 列表
 * @param searchKey
 * @returns {AxiosPromise}
 */
export function tree() {
    return request({
        url: api.tree,
        method: 'get'
    })
}

/**
 * 列表
 * @returns {AxiosPromise}
 */
export function findPids(permissionId) {
    return request({
        url: `${api.findPids}/${permissionId}`,
        method: 'get'
    })
}

/**
 * 根据角色ID查询
 * @param roleId
 * @returns {AxiosPromise}
 */
export function findByRole(roleId) {
    return request({
        url: `${api.findByRole}/${roleId}`,
        method: 'get'
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


