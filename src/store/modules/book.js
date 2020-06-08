import { THEME_LIST } from '../../utils/book'
const book = {
  state: {
    fileName: '',
    // 默认字号
    defaultFontSize: 16,
    // 是否显示头部和菜单栏
    isShow: false,
    // 默认主题
    defaultTheme: 'default',
    // epub实例
    epubBook: null,
    // 电子书加载状态
    bookAvailable: false,
    // 主题设置列表
    themeList: THEME_LIST
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_FONTSIZE: (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    SET_THEME: (state, theme) => {
      state.defaultTheme = theme
    },
    SET_ISSHOW: (state) => {
      state.isShow = !state.isShow
    },
    SET_BOOKAVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_EPUB_BOOK: (state, epubBook) => {
      state.epubBook = epubBook
    }
  }
}

export default book
