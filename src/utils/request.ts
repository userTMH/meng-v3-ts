import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type Method
} from 'axios'
import type { DataType } from '@/utils/types'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

// axios实例对象
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const stores = useAuthStore()
    if (stores.token) {
      config.headers.Authorization = 'Bearer ' + stores.token
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求成功,将response.data返回出去
    if (response.status === 200 && response.data.code === 20000) {
      return response.data
    }
    ElMessage.error(response.data.msg || 'Error')
  },
  (error: AxiosError) => {
    const { message, response } = error
    if (message.indexOf('timeout') != -1) {
      ElMessage.error('网络超时！')
    } else if (message == 'Network Error') {
      ElMessage.error('网络连接错误！')
    } else {
      if (response!.data) {
        ElMessage.error(response!.statusText)
      } else {
        ElMessage.error('接口路径找不到')
      }
    }
    return Promise.reject(error)
  }
)

// service
// 1. service.request 这个是怎么来的
// 2. 泛型 预先不指定具体的类型 使用的时候在指定类型
// T ListResponseType

const request = <T = any>(
  url: string,
  method: Method = 'GET',
  data?: Object,
  options?: InternalAxiosRequestConfig
) => {
  return service.request<T, DataType<T>>({
    url,
    method,
    [method === 'GET' ? 'params' : 'data']: data,
    ...options
  })
}

export const get = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'GET', data)
}

export const post = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'POST', data)
}

export const put = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'PUT', data)
}

export const del = <T = any>(url: string, data: Object) => {
  return request<T>(url, 'DELETE', data)
}

export default request
