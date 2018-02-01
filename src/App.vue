<template>
  <v-app>
    <v-toolbar dark color="blue">
      <v-toolbar-title>GitHub Top 100 JavaScript Repositories</v-toolbar-title>
    </v-toolbar>
    <div v-if="loading" class="centered">
      <v-progress-circular indeterminate size="60" color="blue"></v-progress-circular>
    </div>
    <v-list v-if="!loading" class="list elevation-3" two-line>
      <list-item :item="headers"></list-item>
      <template v-for="item in getItems()">
        <list-item :key="item.id" :item="item"></list-item>
      </template>
    </v-list>
    <div v-if="!loading" class="text-xs-center pt-3 pb-4">
      <v-pagination v-model="pagination.page" :length="pages" />
    </div>
  </v-app>
</template>

<script>
import {BACKEND} from './backend'
import ListItem from './components/ListItem';

export default {
  name: 'App',

  components: {
    ListItem
  },

  data() {
    return {
      items: [],
      loading: true,
      pagination: {page: 1, rowsPerPage: 20},
      headers: {
        owner: false,
        name: 'Repository',
        description: 'Description',
        stargazers_count: 'Stars',
        forks_count: 'Forks'
      },
    }
  },

  computed: {
    pages () {
      return Math.ceil(this.items.length / this.pagination.rowsPerPage)
    }
  },

  methods: {
    getItems: function (page) {
      let start = this.pagination.rowsPerPage * (this.pagination.page - 1) 
      let end = this.pagination.rowsPerPage * this.pagination.page
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