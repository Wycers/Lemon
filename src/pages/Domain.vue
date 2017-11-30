<template>
  <v-container xs12 sm6 md12 offset-sm3>
    <div class="headline">
      {{ $t('Lecturer')}}:
    </div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="md3" v-for="item in detail.lecturer">
          <v-card class="elevation-4">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item }}</h3>
                <div>他非常牛逼</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">查看详情</v-btn>
              <v-btn flat color="orange">预约答疑</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="headline">
      {{ $t('Teacher Assistant')}}:
    </div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex md3 v-for="item in detail.TA">
          <v-card class="elevation-4">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item }}</h3>
                <div>他非常牛逼</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">查看详情</v-btn>
              <v-btn flat color="orange">预约答疑</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        detail: {}
      }
    },
    methods: {
      fetchDomain () {
        console.log(this.domainid)
        this.$http.get('/domainDetail', {
          params: {id: this.domainid}
        }).then(({data}) => {
          this.detail = data
        })
      }
    },
    computed: {
      domainid () {
        return this.$route.params.domainid
      }
    },
    watch: {
      '$route.params': 'fetchDomain'
    },
    created () {
      this.fetchDomain()
    }
  }
</script>
