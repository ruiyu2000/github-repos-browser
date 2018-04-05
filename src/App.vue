<template>
  <v-app>
    <v-toolbar dark color="blue">
      <v-toolbar-title>GitHub Top 100 JavaScript Repositories</v-toolbar-title>
    </v-toolbar>
    <div v-if="loading" class="centered">
      <v-progress-circular indeterminate size="60" color="blue"></v-progress-circular>
    </div>
    <v-list v-if="!loading" class="list elevation-3" two-line>
      <list-item
        name='Repository'
        description='Description'
        stars='Stars'
        forks='Forks'
      ></list-item>
      <template v-for="item in getItems">
        <list-item
          :key="item.id"
          :url="item.html_url"
          :image="item.owner.avatar_url"
          :name="item.name"
          :description="item.description"
          :stars="item.stargazers_count"
          :forks="item.forks_count"
        />
      </template>
    </v-list>
    <div v-if="!loading" class="text-xs-center pt-3 pb-4">
      <v-pagination v-model="pagination.page" :length="pages" :total-visible="9" />
      <!-- <pagination :pagination="pagination" :length="items.length"></pagination> -->
    </div>
  </v-app>
</template>

<script>
import {BACKEND} from './backend'
import ListItem from './components/ListItem';
import Pagination from './components/Pagination';

export default {
  name: 'App',

  components: {
    ListItem, Pagination
  },

  data() {
    return {
      items: [],
      loading: true,
      pagination: {page: 1, rowsPerPage: 20},
    }
  },

  computed: {
    pages () {
      return Math.ceil(this.items.length / this.pagination.rowsPerPage)
    },

    getItems () {
      if (this.pagination.page == this.items.length / this.pagination.rowsPerPage) {
        BACKEND.get('search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100&page='+parseInt(100/(5*this.pagination.rowsPerPage)+1))
        .then(res => {
          this.items = this.items.concat(res.data.items)
        })
        .catch(e => {
          console.log(e)
        })
      }
      window.onhashchange = (e) => {
        let re = /#(.*)/
        this.pagination.page = parseInt(e.newURL.match(re)[1]) //need conditional to go to first page if too high
      }
      let start = this.pagination.rowsPerPage * (this.pagination.page - 1) 
      let end = this.pagination.rowsPerPage * this.pagination.page
      window.location.hash = '#'+this.pagination.page
      return this.items.slice(start, end)
    },
  },
  
  created() {
    BACKEND.get('search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100')
    .then(res => {
      this.items = res.data.items
      this.loading = false
    })
    .catch(e => {
      console.log(e)
      this.loading = false
    })

    let re = /#(.*)/
    this.pagination.page = parseInt(window.location.href.match(re)[1])
  }
}
</script>

<style lang="scss">
.list {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 0;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>