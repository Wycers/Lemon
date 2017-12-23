<template lang="pug">
.text-center
  v-container.pa-4
    div.headline {{ $t('Appointment') }}
    <v-layout row wrap>
      <v-flex xs12 lg12>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(menu, i) in menus" :key="i">
            <div slot="header">{{menu.title}} 
              <v-badge color="indigo" v-model="show">
                <span slot="badge">{{items[i].length}} </span>
              </v-badge>
            </div>
            <v-card>
              <v-list three-line>
                <v-list-tile v-for="(item, key) in items[i]" avatar v-bind:key="item.tname" @click="">
                  <v-list-tile-avatar>
                    <img v-if="($store.state.user.uid === item.s.uid)" :src="item.t.avatar"/>
                    <img v-if="($store.state.user.uid === item.t.uid)" :src="item.s.avatar"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-if="($store.state.user.uid === item.s.uid)" v-html="item.t.name"></v-list-tile-title>
                    <v-list-tile-title v-if="($store.state.user.uid === item.t.uid)" v-html="item.s.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="$moment(item.b.timeBegin).calendar() + ' at ' + item.b.location"></v-list-tile-sub-title> 
                  </v-list-tile-content>
                  <v-list-tile-action v-if="($store.state.user.uid === item.t.uid) && (item.confirmable)">
                    <v-btn icon ripple @click.native="confirm(item.aid)">
                      <v-icon color="blue lighten-1">done</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action v-if="($store.state.user.uid === item.s.uid) && (item.editable)">
                    <v-btn icon ripple @click.native="modify(item.aid)">
                      <v-icon color="blue lighten-1">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action v-if="item.deletable">
                    <v-btn icon ripple @click.native="askDel(item.aid)">
                      <v-icon color="red lighten-1">delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action v-if="item.cancelable">
                    <v-btn icon ripple @click.native="askCancel(item.aid)">
                      <v-icon color="red lighten-1">cancel</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list> 
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <template>
          <p>{{ items }}</p>
        </template>
      </v-flex>
    </v-layout>
  <v-dialog v-model="EditToggle" max-width="500px">
    <v-card>
      <v-card-title>{{ $t('Modify ')}}{{ $t('Appointment')}} {{toEdit}} </v-card-title>
      <v-card-text>
        v-form(v-model="model", v-bind="$data", method="POST", @success="onSuccess")
          div(slot="buttons",class="my-4")
            v-btn(dark, class="grey",@click.native="EditToggle = false") 
              v-icon(dark, left) chevron_left 
              span {{$t('Back')}}
            v-btn(color="primary", dark, type='submit') {{$t('Submit')}}
              v-icon(right, dark) send
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="DelToggle" max-width="500px">
    <v-card>
      v-card-title 删除预约
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="delConfirmed">确定</v-btn>
        <v-btn color="primary" flat @click.stop="DelToggle=false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="CancelToggle" max-width="500px">
    <v-card>
      v-card-title 取消预约
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="cancelConfirmed">确定</v-btn>
        <v-btn color="primary" flat @click.stop="CancelToggle=false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar :timeout="timeout" top right v-model="snackbar">
    <p>{{ opt }}{{ resultHint }} </p>
    <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      menus: [],
      active: 0,
      comfirmHint: null,
      resultHint: null,
      items: [[], [], [], []],
      EditToggle: false,
      DelToggle: false,
      CancelToggle: false,
      opt: null,
      toEdit: null,
      snackbar: false,
      timeout: 5000,
      model: {},
      fields: {},
      rules: {},
      messages: {}
    }
  },
  methods: {
    onSuccess () {

    },
    modify (aid) {
      this.toEdit = aid
      this.$http.get('/appointment/form', {
        params: {token: this.$store.state.token, aid: aid}
      }).then(({data}) => {
        console.log(data.fields)
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
      this.EditToggle = true
    },
    askDel (aid) {
      this.toEdit = aid
      this.DelToggle = true
      this.$http.get('/appointment/del/hint', {
        params: {token: this.$store.state.token, aid: aid}
      }).then(({ data }) => {
        console.log(data)
      })
    },
    askCancel (did) {
      this.toEdit = did
      this.CancelToggle = true
      this.$http.get('/appointment/cancel/hint', {
        params: {token: this.token}
      }).then(({ data }) => {
        console.log(data)
      })
    },
    delConfirmed () {
      console.log(this.toEdit)
      this.$http.get('/appointment/del', {
        params: {
          token: this.$store.state.token,
          aid: this.toEdit
        }
      }).then(({ data }) => {
        this.opt = 'del'
        this.resultHint = data
        this.snackbar = true
        this.fetchAppointment()
      })
      this.DelToggle = false
    },
    cancelConfirmed () {
      console.log(this.toEdit)
      this.$http.get('/appointment/cancel', {
        params: {
          token: this.$store.state.token,
          aid: this.toEdit
        }
      }).then(({ data }) => {
        this.opt = 'cancel'
        this.resultHint = data
        this.snackbar = true
        this.fetchAppointment()
      })
      this.CancelToggle = false
    },
    confirm (aid) {
      this.$http.get('/appointment/confirm', {
        params: {
          token: this.$store.state.token,
          aid: aid
        }
      }).then(({data}) => {
        this.opt = 'confirm'
        this.resultHint = data
        this.snackbar = true
        this.fetchAppointment()
      })
    },
    fetchMenu () {
      this.$http.get('/appointment/menu', {
        params: {token: this.$store.state.token}
      }).then(({data}) => {
        this.menus = data
      })
    },
    fetchAppointment () {
      this.$http.get('/appointment/query', {
        params: {token: this.$store.state.token}
      }).then(({ data }) => {
        for (let i in this.items) {
          while (this.items[i].length) {
            this.items[i].pop()
          }
        }
        for (let i in data) {
          this.items[data[i].status].push(data[i])
        }
      })
    },
    fetch () {
      this.fetchMenu()
      this.fetchAppointment()
    },
    getUser (uid) {
      this.$http.get('/timeblock/query', {
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

  watch: {
    '$i18n.locale' (val) {
      this.fields = {
        finished: this.$t('Finished'),
        unfinished: this.$t('Unfinished')
      }
      this.fetchData()
    }
  },
  mounted () {
    this.show = true
  },
  created () {
    this.fetch()
  }
}
</script>
