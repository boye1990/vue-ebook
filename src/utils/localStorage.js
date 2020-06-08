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
/**
 * 获取缓存的国际化语言
 */
export function getLocale () {
  return getLocalStorage('locale')
}

/**
 *
 * @param {*} locale 设置默认的国际化语言
 */
export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}

/**
 * 为一本书开辟一个缓存, 存储的时候是一个json，获取的时候回转化成对象
 * @param {*} fileName 书名
 * @param {*} key 缓存内容的key值
 * @param {*} value 对应的值
 */
export function setBookLocalStorage (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

/**
 * 获取当前阅读书籍的缓存
 * @param {*} fileName 书名
 * @param {*} key 要获取的缓存key
 */
export function getBookLocalStorage (fileName, key) {
  const book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  }
  return null
}
