<template lang="pug">
v-container
  v-layout
    v-flex(xs8)
      div.headline {{Headline}}
      v-form(v-model="model", v-bind="$data", :method="method", :action="action", @success="onSuccess")
        div(slot="buttons",class="my-4")
          v-btn(dark, class="grey",@click.native="$root.back()") 
            v-icon(dark, left) chevron_left 
            span {{$t('Back')}}
          v-btn(color="primary", dark, type='submit') {{$t('Submit')}}
            v-icon(right, dark) send
          div {{ fields }}
</template>

<script>

export default {

  data () {
    return {
      model: {},
      fields: {},
      rules: {},
      messages: {},
      toAppoint: null,
      Headline: null
    }
  },
  computed: {
    method () {
      return this.isEdit ? 'patch' : 'post'
    },
    action () {
      if (this.isEdit) {
        return `${this.resource}/${this.id}`
      } else {
        return `${this.resource}`
      }
    },
    isEdit () {
      return !!this.id
    },
    resource () {
      return 'appointment'
    },
    id () {
      return this.$route.params.id
    },
    toAppointName () {
      return this.$store.state.toAppoint.name
    },
    toAppointID () {
      return this.$store.state.toAppoint.uid
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
    },
    updateFields () {

    },
    fetch () {
      this.$http.get(`${this.resource}/form`, {
        params: {id: this.id}
      }).then(({data}) => {
        console.log(data.fields)
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    onSubmit () {

    },
    onSuccess (data) {
      this.$router.push({path: '/appointments'})
    },
    getUser (uid) {
      this.$http.get('/appointment/query', {
        params: {uid: this.$store.state.toAppoint}
      }).then(({data}) => {
        this.toAppoint = data.uid
        var choices = []
        for (let i in data.timeblocks) {
          choices.push({
            text: this.$moment(data.timeblocks[i].timeBegin).calendar() + ' ~ ' + this.$moment(data.timeblocks[i].timeEnd).calendar() + ' at ' + data.timeblocks[i].location,
            value: i
          })
        }
        this.fields.select.choices = choices
        console.log('qwq')
      })
      this.$http.get('/user', {
        params: {uid: this.toAppoint}
      }).then(({data}) => {
        console.log(data)
        this.Headline = this.$t('create an appointment') + ':' + data.name
      })
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    this.$store.commit('setPageTitle', pageTitle)
  },
  mounted () {
    // this.$bus.showMessage('success', 'success')
    this.fetch()
    this.getUser()
  }
}
</script>
