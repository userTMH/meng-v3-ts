import request from '@/utils/request'
import type { LoginParamsType, UserResType } from '@/api/auth/types'

//登录接口
export const loginApi = (data: LoginParamsType) => {
  return request<{
    access_token: string
  }>('/auth/token', 'POST', data)
}

/**
 * 获取用户信息
 */
export const userInfoApi = () => {
  return request<UserResType>('/system/menu/user', 'GET')
}
