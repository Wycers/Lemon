<template lang="pug">
.text-center
  v-container.pa-4
    div.headline {{ $t('Appointment') }}
    <v-layout row wrap>
      <v-flex xs12 lg12>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(menu, i) in menus" :key="i" @click.native="load(i)">
            <div slot="header">{{menu.title}} 
              <v-badge color="indigo" v-model="show">
                <span slot="badge">{{items[i].length}} </span>
              </v-badge>
            </div>
            <v-card>
              <v-list three-line>
                <template lazy v-for="(item, key) in items[i]">
                  <p>{{gg}}</p>
                  <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
                  <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
                  <v-list-tile avatar v-bind:key="item.tname" @click="modify(item.aid)">
                    <v-list-tile-avatar>
                      <img v-bind:src="item.avatar"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.tname + item.tename"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="$moment(item.time).calendar() + ' at ' + item.location"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <template>
          <p>{{ items }}</p>
        </template>
      </v-flex>
    </v-layout>
  <v-dialog v-model="Toggle" max-width="500px">
    <v-card>
      <v-card-title>{{ $t('Modify ')}}{{ $t('Appointment')}} {{ toEdit}} </v-card-title>
      <v-card-text>
        <v-btn color="primary" dark @click.stop="dialog3 = !dialog3">Open Dialog 3</v-btn>
        <v-select v-bind:items="select" label="A Select List" item-value="text"></v-select>
      </v-card-text>
    <v-card-actions>
      <v-btn color="primary" flat @click.stop="Toggle = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialog3" max-width="500px">
    <v-card>
      <v-card-title>
        <span>Dialog 3</span>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" @click="">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      menus: [],
      items: [[], [], [], []],
      Toggle: false,
      dialog3: false,
      toEdit: null,
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
      this.Toggle = true
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
