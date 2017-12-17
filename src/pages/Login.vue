<template lang="pug">
div
  v-app.main
    div(style="background: url(http://api.dujin.org/bing/1366.php) no-repeat center;z-index=-1; height:100%; weight: 100%")
    v-dialog(:value='true', max-width="290", persistent='')
      v-card(hover='', style='background:white')
        v-card-title.black--text.cyan.darken-1
            div(style="font-size: x-large",class="text-xs-center")  {{$t("Login")}}
        v-card-text.pt-4
          v-form(v-model='model', :fields='fields' action='login', @success='onSuccess', submitButtonText="Login")
            .flex.pb-2
              small {{$t("* Indicates required field")}}
              
</template>
<script>

export default {

  data () {
    return {
      model: {
        username: 'admin',
        password: '123456'
      },
      fields: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      show: true
    }
  },
  methods: {
    onSuccess (data) {
      console.log('wtf')
      this.$store.commit('setAuth', data)
      this.$router.replace('/')
    },
    onSubmit () {
      console.log(233)
    }
  },

  mounted () {
  }
}
</script>
