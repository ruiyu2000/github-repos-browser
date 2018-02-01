<template>
  <a class="list-item" :href="item.html_url" target="_blank">
    <div class="image"><img v-if="item.owner" :src="item.owner.avatar_url"></div>
    <div class="name">{{ item.name }}</div>
    <div class="desc">{{ item.description }}</div>
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
  display: grid;
  align-items: center;
  grid-template-columns: 7% 13% auto 8% 8%;
  grid-template-areas: "image name desc stars forks";
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  min-height: 40px;
  padding: 10px 30px 5px 20px;
  border-bottom: lightgray;
  border-bottom-style: solid;
  border-width: 1px;
  color: #333;
  text-decoration: none;
  transition: background-color 200ms ease;

  @media (max-width: 991px) {
    grid-template-areas:
      "image name stars forks"
      "image desc desc desc";
    grid-template-columns: 1fr 5fr 1fr 1fr;
    grid-row-gap: 5px;
  }

  .image { grid-area: image; }
  .desc  { grid-area: desc; }

  &:hover {
    background-color: #eee;
  }

  &:first-child {
    cursor: initial;
    &:hover {
      background-color: white;
    }
  }

  &:last-child {
    border: none;
  }
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .name {
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