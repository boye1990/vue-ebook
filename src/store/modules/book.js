const book = {
  state: {
    fileName: '',
    // 默认字号
    defaultFontSize: 16,
    // 是否显示头部和菜单栏
    isShow: false,
    // 默认主题
    defaultTheme: 'default',
    // 电子书加载状态
    bookAvailable: false,
    // 主题设置列表
    themeList: [
      {
        name: 'default', // 主题名称
        title: '默认',
        style: {
          body: {
            color: '#000', // 主题字体颜色
            background: '#7d8188' // 主题背景颜色
          }
        }
      },
      {
        name: 'elegant', // 主题名称
        title: '雅致',
        style: {
          body: {
            color: '#000', // 主题字体颜色
            background: 'rgb(198, 194, 182)' // 主题背景颜色
          }
        }
      },
      {
        name: 'eye', // 主题名称
        title: '护眼',
        style: {
          body: {
            color: '#000', // 主题字体颜色
            background: 'rgb(169, 193, 169)' // 主题背景颜色
          }
        }
      },
      {
        name: 'night', // 主题名称
        title: '夜间',
        style: {
          body: {
            color: '#fff', // 主题字体颜色
            background: '#000' // 主题背景颜色
          }
        }
      }
    ]
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      console.log(fileName)
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
      console.log(bookAvailable, 'bookAvailable')
      state.bookAvailable = bookAvailable
    }
  }
}

export default book
