import { mapGetters, mapActions } from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'defaultFontSize'
    ])
  },
  methods: { ...mapActions(['setFileName', 'setDefaultFontSize']) }
}
