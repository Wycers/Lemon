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
                    <img v-bind:src="item.avatar"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.tname + item.tename"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="$moment(item.time).calendar() + ' at ' + item.location"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="item.editable">
                    <v-btn icon ripple @click.native="modify(i, item.aid)">
                      <v-icon color="blue lighten-1">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action v-if="item.deletable">
                    <v-btn icon ripple @click.native="askDel(i, item.aid)">
                      <v-icon color="red lighten-1">delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action v-if="item.cancelable">
                    <v-btn icon ripple @click.native="askCancel(i, item.aid)">
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
        <v-btn color="primary" dark @click.stop="DelToggle = !DelToggle">Open Dialog 3</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="EditToggle = false">Close</v-btn>
      </v-card-actions>
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
      snackbar: true,
      timeout: 5000,
      itemss: [
        { header: 'Today' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/4.jpg', title: 'Birthday gift', subtitle: "<span class='grey--text text--darken-2'>Trevor Hansen</span> — Have any ideas about what we should get Heidi for her birthday?" },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/5.jpg', title: 'Recipe to try', subtitle: "<span class='grey--text text--darken-2'>Britta Holt</span> — We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
      ]
    }
  },

  methods: {
    load (index) {
      this.$http.get(this.menus[index].href).then(({ data }) => {
        while (this.items[index].length > 0) {
          this.items[index].pop()
        }
        for (let i in data) {
          this.items[index].push(data[i])
        }
        console.log(data)
      })
    },
    modify (aid) {
      this.toEdit = aid
      this.EditToggle = true
    },
    askDel (aid) {
      this.toEdit = aid
      this.DelToggle = true
      this.$http.get('/appointment/del/hint', {

      })
    },
    askCancel (aid) {
      this.toEdit = aid
      this.CancelToggle = true
      this.$http.get('/appointment/cancel/hint', {

      })
    },
    delConfirmed () {
      console.log(this.toEdit)
      this.$http.get('/appointment/del', {params: this.toEdit}).then(({ data }) => {
        this.opt = 'del'
        this.resultHint = data
        this.snackbar = true
      })
      this.DelToggle = false
    },
    cancelConfirmed () {
      console.log(this.toEdit)
      this.$http.get('/appointment/cancel', {params: this.toEdit}).then(({ data }) => {
        this.opt = 'cancel'
        this.resultHint = data
        this.snackbar = true
      })
      this.CancelToggle = false
    },
    fetch () {
      this.$http.get('/appointment/menu', {
        params: {id: 1}
      }).then(({data}) => {
        this.menus = data
        for (let i in this.menus) {
          this.load(i)
        }
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
