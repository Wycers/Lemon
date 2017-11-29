<template>
  <v-tabs>
    <v-tabs-bar dark color="primary">
      <v-tabs-slider color="yellow"></v-tabs-slider>
        v-for="(item, i) in domains"
          console.log(data.data)
          for (let i in data.data) {
            this.domains.push(data.data[i])
          }
        })
      }
    },
    created () {
      this.fetchDomain()
    }
  }
</script>
