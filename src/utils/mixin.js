import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'defaultFontSize',
      'themeList',
      'defaultTheme'
    ])
  },
  methods: { ...mapActions(['setFileName', 'setDefaultFontSize', 'setDefaultTheme']) }
}
