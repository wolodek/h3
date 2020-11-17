import { ResponseT } from './types'

export const MIMES = {
  html: 'text/html',
  json: 'application/json'
}

export function send (res: ResponseT, data: string, type: string) {
  defaultContentType(res, type)
  res.end(data)
}

export function defaultContentType (res: ResponseT, type: string) {
  if (!res.getHeader('Content-Type')) {
    res.setHeader('Content-Type', type)
  }
}

export function error (res: ResponseT, data: string, code: number = 500) {
  code = res.statusCode = (res.statusCode === 200) ? code : res.statusCode
  res.end(code + ': ' + data)
}

export function redirect (res: ResponseT, location: string, code = 302) {
  res.statusCode = code
  res.setHeader('Location', location)
  defaultContentType(res, MIMES.html)
  res.end(location)
}