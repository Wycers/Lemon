<template lang="pug">
  div
    <v-parallax src="https://vuetifyjs.com/static/doc-images/parallax/material.jpg">
      v-layout(row wrap)
        v-flex(xs12 sm6 md6 text-xs-center layout align-center justify-center)
          v-avatar(:tile="tile" size="200px" class="grey lighten-4 elevation-10")
            <img :src="user.avatar" alt="avatar">
        v-flex(xs12 sm6 md6 layout align-center )
          v-layout(row wrap)
            v-flex(xs12 sm12 md12)
              div.display-1 {{ user.name }}
            v-flex(xs12 sm12 md12)
              div.headline {{ user.ename }}
    </v-parallax>
    v-container
      div.display-1 {{ $t('Activity') }}
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex v-bind="{ [`xs${card.flex}`]: true }" v-for="card in cards" :key="card.title">
            <v-card>
              <div class="headline pa-3">
                span
                  <a class="link subtitle" :href="`/#/user/${user.uid}`">{{user.name}} {{user.ename}}</a>回答了问题
                  <a class="link subtitle" :href="`/#/question/${user.uid}`">666</a>
              </div>
              <v-card-media :src="card.src" height="200px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="card.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-chip>
                  <v-icon left>favorite</v-icon>1 
                </v-chip>
                <v-chip>
                  <v-icon left>bookmark</v-icon>1 
                </v-chip>
                <v-chip>
                  <v-icon left>share</v-icon>1 
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<style>
  .link {
    text-decoration: none;
    color: #6c6351 !important;
  }
</style>
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
        items: [],
        user: null,
        cards: [
          { title: 'Pre-fab homes', src: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg', flex: 12 },
          { title: 'Favorite road trips', src: 'https://vuetifyjs.com/static/doc-images/cards/road.jpg', flex: 6 },
          { title: 'Best airlines', src: 'https://vuetifyjs.com/static/doc-images/cards/plane.jpg', flex: 6 }
        ]
      }
    },
    methods: {
      fetchUser () {
        this.$http.get('/user', {
          params: {id: this.uid}
        }).then(({data}) => {
          this.user = data
          console.log(data)
        })
      }
    },
    computed: {
      uid () {
        return this.$route.params.uid
      },
      t (val) {
        return this.$t(val)
      }
    },
    watch: {
      '$route.params': 'fetchUser'
    },
    created () {
      this.fetchUser()
    }
  }
</script>
