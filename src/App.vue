<template>
  <v-app>
    <v-toolbar dark>
      <div class="toolbar-content">
        <div>GitHub</div>
        <v-select
          class="toolbar-languages"
          :items="languages"
          v-model="language"
        />
        <div>Repositories</div>
      </div>
    </v-toolbar>
    <div v-if="loading" class="centered">
      <v-progress-circular indeterminate size="60" color="blue" />
    </div>
    <v-list v-if="!loading" class="list elevation-3" two-line>
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
    <div v-if="!loading" class="text-xs-center pt-3 pb-4">
      <v-pagination v-model="page" :length="pages" :total-visible="9" />
      <!-- < :pagination="pagination" :length="items.length" /> -->
    </div>
  </v-app>
</template>

<script>
import {BACKEND} from './backend'
import ListItem from './components/ListItem';
// import Pagination from './components/Pagination';

export default {
  name: 'App',

  components: {
    ListItem
  },

  data() {
    return {
      cache: [],
      items: [],
      language: 'JavaScript',
      languages: ['JavaScript', 'Python', 'Java', 'PHP', 'Ruby', 'C++', 'C', 'C#', 'Shell', 'HTML'],
      loading: true,
      page: 1,
      pages: 0,
      rowsPerPage: 20,
    }
  },

  methods: {
    getItems() {

      //cache lookup
      let inCache = true;
      for (let i = 0; i < this.rowsPerPage; i++) {
        if (!this.cache[this.language][i + (this.page - 1) * this.rowsPerPage]) inCache = false;
      }
      if (inCache) {
        this.items = this.cache[this.language].slice((this.page - 1) * this.rowsPerPage, this.page * this.rowsPerPage)
        return
      }

      BACKEND.get('search/repositories?q=language:'+this.language+'&sort=stars&order=desc&per_page='+this.rowsPerPage+'&page='+this.page)
      .then(res => {
        for (let i = 0; i < res.data.items.length; i++) {
          this.cache[this.language][(this.page - 1) * this.rowsPerPage + i] = res.data.items[i]
        }
        this.items = res.data.items
        this.pages = Math.min(100, Math.ceil(res.data.total_count / this.rowsPerPage))
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
    page: function (val) {
      this.getItems()
    },
    language: function (val) {
      this.getItems()
    },
  },
  
  created() {
    for (let i = 0; i < this.languages.length; i++) {
      this.cache[this.languages[i]] = [];
    }
    this.getItems()
  },
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

.toolbar-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  font-size: 19px;
  font-weight: 500;

  &:before {
    position: relative;
    left: 4px;
    top: 2px;
    padding-right: 16px;
    content: url('./assets/octicon.svg');
  }
}

.toolbar-languages {
  max-width: 200px;
  margin: 0 10px;
}
</style>