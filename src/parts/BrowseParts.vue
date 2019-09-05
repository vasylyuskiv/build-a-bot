<template>
  <div>
    <h1>Browse Parts</h1>
    <ul class="menu">
      <li> <router-link :to="{name:'BrowseHeads'}"> <a-button class="" type="primary">Heads</a-button></router-link></li>
      <li>
        <router-link :to="{name:'BrowseArms'}"> <a-button class="" type="primary">Arms</a-button></router-link>
      </li>
      <li>
        <router-link :to="{name:'BrowseTorsos'}"> <a-button class="" type="primary">Torsos</a-button></router-link>
      </li>
      <li>
        <router-link :to="{name:'BrowseBases'}"> <a-button class="" type="primary">Bases</a-button></router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'BrowseParts',
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  .menu {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
    font-size: 20px;
  }
  ul {
    list-style-type: none;
  }
  a {
    color: palevioletred;
  }
</style>
