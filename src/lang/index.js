import Vue from 'vue'
import VueI18N from 'vue-i18n'
import cn from './cn'
import en from './en'
import { getLocale, saveLocale } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en,
  cn
}

// 设置默认语言
let locale = getLocale()
if (!locale) locale = 'cn'

saveLocale(locale)

const i18n = new VueI18N({
  locale,
  messages
})

export default i18n
