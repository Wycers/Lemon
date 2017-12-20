<template lang="pug">
v-container
  v-layout.justify-center
    v-flex(md8)
      v-text-field(inline, label="Domain's name", :value="domainname", required)
  v-card
    div
      v-btn(router,fab,absolute,top,right,dark,class="blue", @click.native="showAdd",v-if="options.create !== false")
        v-icon add
    v-data-table(:headers='columns', :items='items', :total-items="pagination.totalItems",hide-actions, :pagination.sync="pagination", :loading="loading")
      template(slot='items', scope='props')
        tr
          td(:class="column.left? '': 'text-xs-right'", v-for='column in columns', v-html="getColumnData(props.item, column)")
          td(v-if='actions !== false', width='160')
            template(v-for="(value, action) in actions")
              v-btn(v-if="['edit', 'delete'].indexOf(action) < 0", router,primary,fab,small,dark,:to="{name: action, params: {id:props.item.uid}}")
                v-icon {{action.icon ? action.icon : action}}
            v-btn(v-if="options.delete !== false", fab,small, @click="showRemove(props.item)")
              v-icon() delete
    <v-layout row wrap>
      <v-flex xs5>
        .jc
          v-pagination.ma-3(v-model='pagination.page', :length='totalPages', circle)  
      </v-flex>
      <v-flex xs2 offset-xs5>
        v-btn(primary, dark, @click.native="submit") {{$t('submit')}}
          v-icon(right, dark) send
      </v-flex>
    </v-layout>
  
  v-dialog(v-model="isShowAdd", width="30%")
    v-card
      v-card-title {{$t('Add a member')}} 
      v-card-text
        v-form(v-model="form.model", v-bind="form", method="post", :action="'/domain/query'", @success="onSaveEdit")
      v-card-actions(actions)
        v-btn(flat, primary, @click.native="isShowAdd = false") {{$t('Close')}}
  v-dialog(v-model="isShowRemove", width="30%")
    v-card
      v-card-title {{$t('Remove')}} \#{{currentItem.uid}}
      v-card-text  {{$t('Sure to remove user')}} {{currentItem.nickname}}
      v-card-actions(actions)
        v-btn(flat, primary, @click.native="remove(currentItem.uid)") {{$t('Confirm')}}
        v-btn(flat, primary, @click.native="isShowRemove = false") {{$t('Close')}}
</template>

<script>

const getDefaultData = () => {
  return {
    form: {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    },
    filters: {
      model: {},
      fields: null
    },
    loading: false,
    columns: [], // fetch grid setup params from server if `columns` is empty
    actions: {},
    options: {
      sort: 'type',
      create: false,
      update: true,
      delete: false
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      sortBy: 'type',
      descending: true,
      totalItems: 0
    },
    isShowAdd: false,
    isShowRemove: false,
    isEdit: false,
    currentItem: false,
    domainname: null,
    items: []
  }
}
export default {

  data: getDefaultData,

  watch: {
    'items.length' (val) {
      if (val === 0) {
        this.$router.go(-1)
      }
    },
    '$route.params': 'refresh'
    // '$route.query': 'updateRoute'
  },
  methods: {
    submit () {
      if (this.isEdit === true) {
        this.$http.post('/domain/edit', {token: this.$store.state.token, name: this.domainname, users: this.items}).then(({ data }) => {
          console.log(233)
          console.log(data)
        })
      } else {
        this.$http.post('/domain/create', {token: this.$store.state.token, name: this.domainname, users: this.items}).then(({ data }) => {
          console.log(data)
        })
      }
    },
    showHint (str) {
      this.Hint = str
      this.snackbar = true
    },
    fetchForm () {
      this.$http.get('/domain/form/add', {
        params: {token: this.$store.state.token}
      }).then(({data}) => {
        this.form = data
      })
    },
    onSaveEdit (data) {
      for (let i in this.items) {
        if (this.items[i].uid === data.user.uid) {
          this.showHint('Repeated item found')
          data.message = 'Repeated user'
          return
        }
      }
      if (data.user.uid) {
        this.isShowAdd = false
      }
      data.user.type = this.form.model.type
      this.items.push(data.user)
    },
    showAdd () {
      this.fetchForm()
      this.isShowAdd = true
    },
    updateRoute () {
      this.$route.query.keepLayout = true
      console.log('update route')
      this.$router.go({
        path: this.$route.path,
        params: this.$route.params,
        query: this.$route.query
      })
    },
    filter (val, search) {
      return true
      // this.search = search
      // this.fetchData()
    },
    refresh () {
      Object.assign(this.$data, getDefaultData())
      this.fetchGrid().then(() => {})
    },
    fetch () {
      if (this.columns.length <= 0) {
        // fetch grid params from server: e.g. /crud/users/grid
        this.fetchGrid()
      } else {
        // or define grid params manually
        this.fetchData()
      }
    },
    getColumnData (row, field) {
      // process fields like `type.name`
      let [l1, l2] = field.value.split('.')
      let value = row[l1]
      let tag = null
      if (l2) {
        value = row[l1] ? row[l1][l2] : null
      }
      if (field.type === 'image') {
        tag = 'img'
      }
      if (tag) {
        value = `<${tag} src="${value}" class="crud-grid-thumb" controls />`
      }
      return value
    },
    fetchGrid () {
      return new Promise((resolve, reject) => {
        this.$http.get('/domain/grid', {
          params: { token: this.$store.state.token }
        }).then(({data}) => {
          for (let k in data.columns) {
            data.columns[k].text = this.$t(data.columns[k].text)
          }
          this.columns = data.columns || {}
          this.actions = data.actions || {}
          this.filters = data.filters || {}
          this.options = data.options || {}

          if (this.options && this.options.sort) {
            let sortData = this.options.sort.split('-')
            let desc = sortData.length > 1
            let sortField = sortData.pop()

            this.pagination.sort = sortField
            this.pagination.descending = desc
          }
          resolve()
        })
      })
    },
    showRemove (item) {
      this.currentItem = item
      this.isShowRemove = true
    },
    remove (item) {
      for (let i in this.items) {
        if (this.items[i].uid === item) {
          this.items.splice(i, 1)
          break
        }
      }
      this.isShowRemove = false
    },
    next () {
      this.pagination.page++
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  mounted () {

  },
  created () {
    console.log(this.$store.state.user)
    // this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    this.fetchGrid().then(() => {})
    this.items.push(this.$store.state.user)
  }

}
</script>
