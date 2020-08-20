/**
 * login模块接口列表
 */
// 导入接口域名列表
import base from '../base'
// 导入http中创建的axios实例
import axios from '../../utils/http'
// 根据需求是否导入qs模块
import qs from 'qs'

const login = {
    // 登录
    cellphone(params) {
        return axios.post(`${base.dev}/login/cellphone`, qs.stringify(params))
    }
}

export default login
