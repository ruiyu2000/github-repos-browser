<template>
  <nav class="navbar elevation-3">
    <div class="navbar-content">
      GitHub
      <div class="navbar-languages">
        <slot name="language"></slot>
      </div>
      Repositories
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
  background-color: #24292e;
  color: white;
  font-size: 19px;
  font-weight: 500;

  .navbar-content {
    display: flex;
    align-items: center;
    max-width: 1200px;
    min-height: 56px;
    margin: 0 auto;
    padding: 0 16px;

    &:before {
      position: relative;
      left: 4px;
      top: 2px;
      padding-right: 16px;
      content: url('.././assets/octicon.svg');
    }
  }

  .navbar-languages {
    position: relative;
    margin: 0 10px;
    border-bottom: 1px solid;
    border-radius: 0;

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

      &:focus {
        outline: none;
      }
    }
  }
}
</style>