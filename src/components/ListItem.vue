<template>
  <a class="listitem" :href="url" target="_blank" rel="noopener noreferrer">
    <div class="image" :style="header ? null : {backgroundImage: `url(${image})`}" />
    <div class="name">{{ name }}</div>
    <div class="desc">{{ description }}</div>
    <div :class="{star: true, 'sort-down': header && sort === 'stars'}" @click="$emit('sortby', 'stars')">{{ stars }}</div>
    <div :class="{fork: true, 'sort-down': header && sort === 'forks'}" @click="$emit('sortby', 'forks')">{{ forks }}</div>
  </a>
</template>


<script>
export default {
  name: 'list-item',
  props: {
    header: Boolean,
    sort: String,
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
.listitem {
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
    grid-template-rows: 46px;
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
    background-size: contain;
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
    text-align: right;
    cursor: pointer;

    &:after {
      position: relative;
      left: 8px;
      top: 3px;
    }
  }
  .star:after { content: url('.././assets/star.svg'); }
  .fork:after { content: url('.././assets/repo-forked.svg'); }

  .sort-down::before {
    position: relative;
    top: 4px;
    right: 6px;
    font-family: 'Material Icons';
    font-size: 18px;
    line-height: 0;
    content: 'arrow_downward';
  }
}
</style>