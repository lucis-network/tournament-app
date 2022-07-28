/**
 * To work with REST api
 * NOTE: Currently we use GraphQL instead
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

type ApiClientOptions = {
  baseURL?: string,
}

const isClient = typeof window !== 'undefined'
class ApiClient {
  private instance: AxiosInstance
  private baseUrl: string;

  constructor(opt?: ApiClientOptions) {
    this.baseUrl = opt?.baseURL ?? process.env.NEXT_PUBLIC_API_URL as string

    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {},
    })
  }

  public getBaseUrl() {
    return this.baseUrl
  }

  public applyAuth(jwtToken: string) {
    this.instance.defaults.headers.common['Authorization'] =
      'Bearer ' + jwtToken
  }

  public req(axiosOpt: AxiosRequestConfig) {
    return this.instance.request(axiosOpt).catch(function (error: any) {
      if (error.response) {
        isClient && console.log('ApiService: ERROR: ', error.response.data)
        return error.response
      } else if (error.request) {
        isClient && console.log('ApiService: ERROR: ', error.request)
        return {
          data: {
            error_code: 'no_response',
          },
        }
      } else {
        isClient && console.log('ApiService: ERROR: ', error.message)
        return {
          data: {
            error_code: 'not_request',
          },
        }
      }
    })
  }

  public get(axiosOpt: AxiosRequestConfig) {
    axiosOpt.method = 'GET'
    return this.req(axiosOpt)
  }

  public post(axiosOpt: AxiosRequestConfig) {
    axiosOpt.method = 'POST'
    return this.req(axiosOpt)
  }
}

export const apiClient = new ApiClient()

export interface AppApiResponse {
  error: string | null
  message: string | null
  data: any
}
