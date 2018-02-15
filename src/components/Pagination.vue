<template>
  <div>
      <a v-for="page in pages" :key="page" :href="'/#'+page" >{{page}}</a>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['length', 'pagination'],


  computed: {
    pages () {
      let pages = []
      pages.push(1)
      if (this.pagination.page > 3) {
        for (let i = this.pagination.page - 2; i < this.pagination.page + 3; i++) {
          pages.push(i)
          console.log(i);
        }
      }
      pages.push(this.length / this.pagination.rowsPerPage)

      let res = pages.filter(function(item, pos, self) {
        return self.indexOf(item) == pos
      })
console.log(res);


      return res
    }
  },

}
</script>

<style lang="scss" scoped>

</style>