import Axios from 'axios'
import {ArrangeParams} from './util'
import Bus from '@/bus/'
// import qs from 'querystring'

Axios.defaults.timeout = 20000
Axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization") + ''
// export const rootUrl = process.env.NODE_ENV == 'development' ? window.location.origin + '/dsdpy/api/v3/' : window.location.origin + '/dsdpy/api/v3/'
export const rootUrl = process.env.NODE_ENV == 'development' ? window.location.origin + '/api/v1' : 'https://dsdfund.co/api/'
Axios.defaults.baseURL = rootUrl


let requestTime = 0

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  requestTime++
  Bus.$emit('showLoading', requestTime)
  return config;
}, function (err) {
  // 对请求错误做些什么
  requestTime = 0
  Bus.$emit('showLoading', 0)
  Bus.$emit('SystemError', '')
  return Promise.reject(err)
})

Axios.interceptors.response.use(function (res) {
  requestTime--
  Bus.$emit('showLoading', requestTime)
  return res
}, function (err) {
  requestTime = 0
  Bus.$emit('showLoading', 0)
  if (parseInt(err.response.status) === 401) {
    // error
    localStorage.clear()
    window.history.go(0)
  }
  return Promise.reject(err)
})


/**
 * 设置Axios默认header
 * @param key
 * @param value
 */
export function SetDefaultHeader(key, value) {
  Axios.defaults.headers[key] = value
}


export default {
  httpGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {params: ArrangeParams(params)}).then(res => {
        resolve(res.data)
        if (res.data.status === 401) {
          localStorage.clear()
          window.history.go(0)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpPost(url, params) {
    return new Promise((resolve, reject) => {
      Axios.post(url, ArrangeParams(params)).then(res => {
        resolve(res.data)
        if (res.data.status === 401) {
          localStorage.clear()
          window.history.go(0)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpPut(url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url, ArrangeParams(params)).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpDelete(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, {params: ArrangeParams(params)}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  httpAuth(url, auth) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {auth: auth}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
