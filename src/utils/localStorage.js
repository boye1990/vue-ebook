/**
 * web-storage-cache对h5新增的localStorage和sessionStorage进行了扩展，添加了超时时间，序列化方法。可以直接存储json对象，同时可以非常简单的进行超时时间的设置。优化：WebStorageCache自动清除访问的过期数据，避免了过期数据的累积。另外也提供了清除全部过期数据的方法：wsCache.deleteAllExpires();
 * https://www.npmjs.com/package/web-storage-cache
 */
import Storage from 'web-storage-cache'
const localStorage = new Storage()

export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

export function clearLocalStorage () {
  return localStorage.clear()
}
