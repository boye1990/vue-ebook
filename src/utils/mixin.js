import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'defaultFontSize',
      'themeList',
      'defaultTheme',
      'bookAvailable'
    ])
  },
  methods: { ...mapActions(['setFileName', 'setDefaultFontSize', 'setDefaultTheme', 'setBookAvailable']) }
}
