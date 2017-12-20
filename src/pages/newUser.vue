<template lang="pug">
v-container
  v-layout
    v-flex(xs8)
      v-form(v-model="model", v-bind="$data", :method="method", :action="action", @success="onSuccess")
        div(slot="buttons",class="my-4")
          v-btn(dark, class="grey",@click.native="$root.back()") 
            v-icon(dark, left) chevron_left 
            span {{$t('Back')}}
          v-btn(primary, dark, type='submit') {{$t('Submit')}}
            v-icon(right, dark) send
</template>

<script>

export default {

  data () {
    return {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    }
  },
  computed: {
    method () {
      return this.isEdit ? 'patch' : 'post'
    },
    action () {
      return '/users/create'
    },
    isEdit () {
      return !!this.id
    },
    resource () {
      return 'users'
    },
    id () {
      return this.$route.params.id
    }

  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
      console.log(233)
    },
    updateFields () {

    },
    fetch () {
      this.$http.get('/users/form/create', {
        params: {token: this.$store.state.token}
      }).then(({data}) => {
        console.log(data.fields)
        this.fields = data.fields
      })
    },
    onSubmit () {
      console.log(this.fields)
    },
    onSuccess (data) {
      this.$router.push({name: 'grid', params: {resource: 'users'}})
      if (data.id) {
        this.$router.go(-1)
      }
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    this.$store.commit('setPageTitle', pageTitle)
  },
  mounted () {
    // this.$bus.showMessage('success', 'success')
    this.fetch()
  }
}
</script>
