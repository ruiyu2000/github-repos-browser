<template>
  <v-app>
    <nav-bar :language="language" :languages="languages">
      <select slot="language" v-model="language">
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
      <input slot="search" v-model.lazy="search" type="text" placeholder="search">
    </nav-bar>
    <div v-if="loading" class="centered">
      <v-progress-circular indeterminate size="60" color="blue" />
    </div>
    <v-list
      v-if="items.length"
      :class="{list: true, loading: loading, 'elevation-3': true}"
      two-line
    >
      <list-item
        name='Repository'
        description='Description'
        stars='Stars'
        forks='Forks'
      />
      <list-item
        v-for="item in items"
        :key="item.id"
        :url="item.html_url"
        :image="item.owner.avatar_url"
        :name="item.name"
        :description="item.description"
        :stars="item.stargazers_count"
        :forks="item.forks_count"
      />
    </v-list>
    <div v-if="pages" class="text-xs-center pt-3 pb-4">
      <v-pagination v-model="page" :length="pages" :total-visible="11" />
      <!-- < :pagination="pagination" :length="items.length" /> -->
    </div>
  </v-app>
</template>


<script>
import {BACKEND} from './backend'
import NavBar from './components/NavBar';
import ListItem from './components/ListItem';
// import Pagination from './components/Pagination';

export default {
  name: 'App',

  components: {
    NavBar, ListItem
  },

  data() {
    return {
      cache: {},
      items: [],
      language: 'JavaScript',
      languages: ['JavaScript', 'Python', 'Java', 'PHP', 'Ruby', 'C++', 'C', 'C#', 'Shell', 'HTML'],
      loading: true,
      page: 1,
      pages: 0,
      rowsPerPage: 20,
      search: ''
    }
  },

  computed: {
    query() {
      return `q=${this.search}+language:${encodeURIComponent(this.language)}&sort=stars&order=desc`
    },
  },

  methods: {
    getItems() {
      //cache lookup
      let inCache = true
      for (let i = 0; i < this.rowsPerPage; i++) {
        if (!this.cache[this.query][i + (this.page - 1) * this.rowsPerPage]) inCache = false
      }
      if (inCache) {
        this.items = this.cache[this.query].slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
        return
      }

      //cache a few pages ahead
      const pagesToCache = 5
      this.loading = true

      BACKEND.get(`search/repositories?${this.query}&per_page=${this.rowsPerPage * pagesToCache}&page=${Math.ceil(this.page / pagesToCache)}`)
      .then(res => {
        for (let i = 0; i < res.data.items.length; i++) {
          let start = ((this.page - 1) - ((this.page - 1) % pagesToCache)) * this.rowsPerPage
          this.cache[this.query][start + i] = res.data.items[i]
        }
        this.items = this.cache[this.query].slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
        this.pages = Math.ceil(Math.min(1000, res.data.total_count) / this.rowsPerPage) //GitHub limits search results to 1000
        this.loading = false
      })
      .catch(e => {
        console.log(e)
        this.loading = false
      })
      // window.onhashchange = (e) => {
      //   let re = /#(.*)/
      //   this.page = parseInt(e.newURL.match(re)[1]) //need conditional to go to first page if too high
      // }
      // window.location.hash = '#'+this.page
    },
  },

  watch: {
    page: function(val) {
      this.getItems()
    },
    language: function(val) {
      this.page = 1
      this.cache[this.query] = this.cache[this.query] || []
      this.getItems()
    },
    search: function(val) {
      this.page = 1
      this.cache[this.query] = this.cache[this.query] || []
      this.getItems()
    },
  },
  
  created() {
    this.cache[this.query] = this.cache[this.query] || []
    this.getItems()
  },
}
</script>


<style lang="scss" scoped>
.list {
  width: 100%;
  max-width: 1200px;
  margin: 24px auto 0;
  padding: 0;

  &.loading {
    opacity: 0.5;
  }
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>