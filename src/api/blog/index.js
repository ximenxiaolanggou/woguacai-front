import request from '@/utils/request'

const api = {
    upload: '/blog/upload',
    delBlogUpload: '/blog/delBlogUpload'
}

/**
 * 上传
 * @param data
 * @returns {AxiosPromise}
 */
export function upload(data) {
    return request({
        url: api.upload,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}

/**
 * 删除上传图片
 * @param blogUploadId
 * @returns {AxiosPromise}
 */
export function delBlogUpload(blogUploadId) {
    return request({
        url: `${api.delBlogUpload}/${blogUploadId}`,
        method: 'delete'
    })
}
