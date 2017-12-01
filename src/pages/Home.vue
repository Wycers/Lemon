<template lang="pug">
.text-center
  v-container.pa-4
    <v-layout row wrap>
      <v-flex xs12 lg5>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
            <div slot="header">Item</div>
            <v-card>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 lg5 offset-lg2>
        <v-expansion-panel inset>
          <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
            <div slot="header">Item</div>
            <v-card>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    div.headline {{ $t('Todos') }}
    <div style="max-width: 100%; margin: auto;" class="grey lighten-3">
      v-container(fluid, grid-list-lg, style="min-height: 0;")
        v-layout(row, wrap)
          v-flex(xs12, md6, :tasks="tasks", v-for='task in tasks')
            v-card.black--text
              v-container.fluid.grid-list-lg(:style="`background-color: ${task.color}`")
                v-layout.row
                  v-flex.xs7
                    div(class="headline", v-if="$i18n.locale === 'zh-CN'") {{ task.item }}
                    div(class="headline", v-else) {{ task.eitem }}
                    div {{$t('Deadline')}}: {{ task.ddl }}
                    div {{$t('Content')}}: {{ task.content }}
                    <v-checkbox color="blue" :label="finished.indexOf(`${task.id}`) == -1 ? fields.unfinished : fields.finished" v-model="finished" light :value="`${task.id}`"></v-checkbox>
                  v-flex.xs5
                    v-card-media(
                      src="https://vuetifyjs.com/static/doc-images/cards/halcyon.png", 
                      height="125px",
                      contain)
      <p class="black--text">{{ finished }}</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tasks: [],
      finished: [],
      fields: {
        finished: this.$t('Finished'),
        unfinished: this.$t('Unfinished')
      }
    }
  },

  methods: {
    fetchData () {
      this.$http.get('/tasks').then(({data}) => {
        while (this.finished.length) {
          this.finished.pop()
        }
        this.tasks = data.data
        for (let i in data.data) {
          if (data.data[i].finished === true) {
            this.finished.push(data.data[i].id.toString())
          }
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

  created () {
    this.fetchData()
  }
}
</script>
