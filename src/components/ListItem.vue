<template>
  <a class="list-item" :href="item.html_url" target="_blank">
    <div><img v-if="item.owner.avatar_url" :src="item.owner.avatar_url"></div>
    <div class="bold">{{ item.name }}</div>
    <div class="list-item-description">{{ item.description }}</div>
    <div class="star text-xs-right">{{ item.stargazers_count }}</div>
    <div class="fork text-xs-right">{{ item.forks_count }}</div>
  </a>
</template>

<script>
export default {
  name: 'list-item',
  props: ['item'],
}
</script>

<style lang="scss" scoped>
.list-item {
  // display: flex;
  // align-items: center;
  display: grid;
  align-items: center;
  grid-template-columns: 7% 13% auto 8% 8%;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  // min-width: 800px;
  min-height: 40px;
  padding: 0 30px 5px 20px;
  margin-bottom: 10px;
  border-bottom: lightgray;
  border-bottom-style: solid;
  border-width: 1px;
  color: #333;
  text-decoration: none;
  @media (max-width: 991px) {
    .list-item-description {
      display: none;
    }
  }

  &:last-child {
    margin-bottom: 0;
    border: none;
  }
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .bold {
    font-weight: 500;
  }

  .star, .fork {
    &:after {
      position: relative;
      left: 8px;
      top: 3px;
    }
  }
  .star:after { content: url('.././assets/star.svg'); }
  .fork:after { content: url('.././assets/repo-forked.svg'); }
}
</style>