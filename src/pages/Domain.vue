<template>
  <v-container xs12 sm6 md12 offset-sm3>
    <div class="headline">
      {{ $t('Lecturer')}}:
    </div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="md3" v-for="(item,i ) in detail.lecturer" :key="i">
          <v-card class="elevation-4">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item.name }}</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" :to="'/user/' + `${item.uid}`">{{$t('Details')}}</v-btn>
              <v-btn flat color="orange" @click.native="createAppointment(item.uid)">{{$t('Appoint')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="headline" v-if="detail.assistant.length > 0">
      {{ $t('Teacher Assistant')}}:
    </div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex md3 v-for="(item, i) in detail.assistant" :key="i">
          <v-card class="elevation-4">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item.name }}</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" :to="'/user/' + `${item.uid}`">{{$t('Details')}}</v-btn>
              <v-btn flat color="orange" @click.native="createAppointment(item.uid)">{{$t('Appoint')}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="headline">
      {{ $t('Scores')}}:
    </div>
    <v-data-table
      v-bind:headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.score }}</td>
        <td class="text-xs-right">{{ props.item.fullscore }}</td>
        <td class="text-xs-right">{{ props.item.score / props.item.fullscore * 100 + '%'}}</td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        detail: [],
        score: [],
        headers: [
          {
            text: this.$t('Title'),
            align: 'left',
            sortable: false,
            value: 'title'
          },
          { text: this.$t('Score'), value: 'score' },
          { text: this.$t('Fullscore'), value: 'fullscore' },
          { text: this.$t('Ratio'), value: 'ratio' }
        ],
        items: []
      }
    },
    methods: {
      fetchDomain () {
        this.$http.get('/domainDetail', {
          params: {id: this.domainid, token: this.$store.state.token}
        }).then(({data}) => {
          this.detail = data
        })
      },
      fetchScore () {
        this.$http.get('/score', {
          params: {id: this.domainid, token: this.$store.state.token}
        }).then(({data}) => {
          this.items = data
        })
      },
      createAppointment (uid) {
        this.$store.commit('setToAppoint', uid)
        this.$router.push({path: '/appointments/create'})
      }
    },
    computed: {
      domainid () {
        return this.$route.params.domainid
      },
      t (val) {
        return this.$t(val)
      }
    },
    watch: {
      '$route.params': 'fetchDomain'
    },
    created () {
      this.fetchDomain()
      this.fetchScore()
    }
  }
</script>
