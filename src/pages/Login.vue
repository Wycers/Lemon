<template lang="pug">
div
  v-dialog(:value='true', max-width="290", persistent='')
    v-card(hover='', style='background:white')
      v-card-row.deep-purple.darken-1
        v-card-title.black--text
          div(style="font-size: x-large",class="text-xs-center")  {{$t("Login")}}
      v-card-row
        v-card-text.pt-4
          v-form(v-model='model', action='login', @success='onSuccess', submitButtonText="Login")
            v-text-field(:label="`${$t('Username')}`", v-model="model.username", required, type="text")
            v-text-field(:label="`${$t('Password')}`", v-model="model.password", required, type="password")
            .flex.pb-2
              small {{$t("* Indicates required field")}}
            
</template>

<style>
  body{
    background: url(http://api.dujin.org/bing/1366.php) no-repeat center;
  }
</style>

<script>

export default {

  data () {
    return {
      model: {
        username: 'admin',
        password: '123456'
      },
      show: false
    }
  },
  methods: {
    onSuccess (data) {
      this.$store.commit('setAuth', data)
      this.$router.replace('/')
    }
  },

  mounted () {
  }
}
</script>
