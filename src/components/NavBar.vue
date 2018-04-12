<template>
  <nav class="navbar elevation-3">
    <div class="navbar-content">
      <div class="navbar-left">
        GitHub
        <div class="navbar-languages">
          <slot name="language"></slot>
        </div>
        Repositories
      </div>
      <div class="navbar-search">
        <slot name="search"></slot>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'NavBar'
}
</script>


<style lang="scss" scoped>
.navbar {
  width: 100%;
  padding: 0 16px;
  background-color: #24292e;
  color: white;
  font-size: 19px;
  font-weight: 500;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    min-height: 56px;
    margin: 0 auto;
  }

  &-left {
    display: flex;
    align-items: center;

    &:before {
      position: relative;
      left: 4px;
      top: 2px;
      padding-right: 16px;
      content: url('.././assets/octicon.svg');
    }
  }

  &-languages {
    align-items: center;
    position: relative;
    margin: 0 10px;

    &:after {
      position: absolute;
      top: -4px;
      right: -6px;
      font-family: 'Material Icons';
      font-size: 24px;
      pointer-events: none;
      content: 'arrow_drop_down';
    }

    select {
      width: 100%;
      padding-right: 20px;
      background: transparent;
      border-bottom: 1px solid;
      border-radius: 0;

      &:focus {
        outline: none;
      }
    }
  }

  &-search {
    input {
      padding: 0 10px;
      background: rgba(255,255,255,0.125);
    }
  }
}
</style>