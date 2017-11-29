<template>
  <v-tabs>
    <v-tabs-bar dark color="primary">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tabs-item
        v-for="(item, i) in domains"
        :key="i"
        :href="'#tab-' + i"
      >
        {{ $i18n.locale === 'zh-CN' ? item.title : item.etitle }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="(item, i) in domains"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ item.id }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        domains: []
      }
    },
    methods: {
      fetchDomain () {
        this.$http.get('/domain').then(({data}) => {
          while (this.domains.length) {
            this.domains.pop()
          }
          console.log(data.data)
          for (let i in data.data) {
            this.domains.push(data.data[i])
          }
        })
      }
    },
    created () {
      this.fetchDomain()
    }
  }
</script>
