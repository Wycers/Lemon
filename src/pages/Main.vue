<template lang="pug">
v-app(:dark="dark")
  v-navigation-drawer(v-model='drawer',:mini-variant.sync="mini", persistent,enable-resize-watcher, :dark="dark", fixed, clipped, app)
    .pa-3.text-xs-center(v-show="!mini")
      div.display-2.py-4 Lemon!
      p {{$t('Just for fun')}}
      div
        v-btn(dark, tag="a", href="https://github.com/Wycers/Lemon", primary) 
          v-icon(left, dark) star
          span Github 
    .pa-3.text-xs-center(v-show="mini")
      .display-2 A
    v-divider
    v-list(dense)
      template(v-for='item in menu')
        v-list-group(v-if='item.items', v-bind:group='item.group')
          v-list-tile(:to='item.href', slot='item', :title="item.title")
            v-list-tile-action
              v-icon() {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ $t(item.title) }}
            v-list-tile-action
              v-icon() keyboard_arrow_down
          
          v-list-tile(v-for='subItem in item.items', :key='subItem.href',:to='subItem.href', v-bind:router='!subItem.target', ripple, v-bind:disabled='subItem.disabled', v-bind:target='subItem.target')
            v-list-tile-action(v-if='subItem.icon')
              v-icon.success--text {{ subItem.icon }}
            v-list-tile-content
              v-list-tile-title {{ $t(subItem.title) }}
        v-subheader(v-else-if='item.header') {{ item.header }}
        v-divider(v-else-if='item.divider')
        v-list-tile(v-else,:to='item.href', router, v-bind:disabled='item.disabled', :title="item.title")
          v-list-tile-action
            v-icon() {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ $t(item.title) }}
          v-list-tile-action(v-if='item.subAction')
            v-icon.success--text {{ item.subAction }}
  v-toolbar.darken-1(fixed, dark,:class="theme", clipped-left, app, style="z-index:1000") 
    v-toolbar-side-icon(dark, @click.stop='drawer = !drawer')
    v-toolbar-title {{$t(pageTitle)}}
    v-spacer
    v-menu(offset-y)
      v-btn(icon, dark, slot="activator")
        v-icon(dark) language
      v-list
        v-list-tile(v-for="lang in locales" :key="lang",@mouseover.native="changeLocale(lang)")
          v-list-tile-title {{lang}}
    v-menu(offset-y)
      v-btn(icon, dark, slot="activator")
        v-icon(dark) format_paint
      v-list
        v-list-tile(v-for="n in colors", :key="n", :class="n",@mouseover.native="theme = n")
  v-content
    v-slide-y-transition(mode='out-in')
      router-view
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>Copyright © {{ new Date().getFullYear() }} Wycer All Rights Reserverd</div>
  </v-footer>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      dark: false,
      theme: 'primary',
      mini: false,
      drawer: true,
      locales: ['en-US', 'zh-CN'],
      colors: ['blue', 'green', 'purple', 'red']
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
    changeLocale (to) {
      global.helper.ls.set('locale', to)
      this.$i18n.locale = to
    },
    fetchMenu () {
      this.$http.get('/menu', {
        params: {token: this.$store.state.token}
      }).then(({data}) => this.$store.commit('setMenu', data))
    }
  },

  created () {
    this.fetchMenu()
    let value = this.$store.state.token
    if (value === null || typeof (value) === 'undefined' || value === '') {
      this.$router.replace('/login')
    }
  }
}
</script>
