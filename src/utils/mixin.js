import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'defaultFontSize',
      'themeList',
      'defaultTheme',
      'bookAvailable',
      'isShow'
    ])
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setDefaultFontSize',
      'setDefaultTheme',
      'setBookAvailable',
      'setIsShow'
    ])
  }
}
