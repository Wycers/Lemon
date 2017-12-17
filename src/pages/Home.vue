<template lang="pug">
.text-center
  v-container.pa-4
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
      this.$http.get('/tasks', {
        params: {token: this.$store.state.token}
      }).then(({data}) => {
        while (this.finished.length) {
          this.finished.pop()
        }
        while (this.tasks.length) {
          this.tasks.pop()
        }
        console.log(data)
        for (let i in data) {
          console.log(i)
          this.tasks.push(data[i])
          if (data[i].finished === true) {
            this.finished.push(data[i].id.toString())
          }
        }
        console.log(this.tasks)
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
