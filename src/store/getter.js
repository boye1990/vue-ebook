const book = {
  fileName: state => state.book.fileName,
  defaultFontSize: state => state.book.defaultFontSize,
  defaultTheme: state => state.book.defaultTheme,
  themeList: state => state.book.themeList,
  bookAvailable: state => state.book.bookAvailable,
  isShow: state => state.book.isShow
}
export default book
