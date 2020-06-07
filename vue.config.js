if (process.env.NODE_ENV === 'development') process.env.VUE_APP_RES_URL = 'http://192.168.1.4:8081'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
