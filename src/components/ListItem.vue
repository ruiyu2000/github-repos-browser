<template>
  <a class="list-item" :href="url" target="_blank">
    <div class="image" :style="{backgroundSize: 'contain', backgroundImage: 'url('+image+')'}"></div>
    <div class="name">{{ name }}</div>
    <div class="desc">{{ description }}</div>
    <div class="star text-xs-right">{{ stars }}</div>
    <div class="fork text-xs-right">{{ forks }}</div>
  </a>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    url: String,
    image: String,
    name: String,
    description: String,
    stars: [Number, String],
    forks: [Number, String]
  }
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
  padding: 5px 30px 5px 20px;
  border-bottom: lightgray;
  border-bottom-style: solid;
  border-width: 1px;
  color: #333;
  text-decoration: none;
  transition: background-color 200ms ease;
  @media (min-width: 992px) {
    grid-template-rows: 45px;
  }
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
  
  .image {
    width: 45px;
    height: 45px;
    border-radius: 3px;
  }

  .name {
    font-weight: 500;
  }

  .desc {
    max-height: 100%;
    @media (min-width: 992px) {
      overflow-y: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
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