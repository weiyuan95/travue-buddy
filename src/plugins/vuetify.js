import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken4,
        secondary: colors.red.lighten,
      },
      dark: {
        primary: '#bb86fc',
        secondary: "#03DAC6",
      }
    }
  }
});
