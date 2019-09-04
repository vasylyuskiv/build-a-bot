<template>
  <div id="app">
      <header>
      <nav>
        <ul>
          <li class="nav-item">
          <router-link active-class="nav-high" class="nav-link" :to="{ name: 'Home'}" exact>
            <img class="logo" src="./assets/build-a-bot-logo.png"/>
            Build-a-Bot
          </router-link>
        </li>
          <li class="nav-item">
            <router-link active-class="nav-high" class="nav-link" :to="{ name: 'Build'}" exact>
              Build
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="nav-high" class="nav-link" :to="{ name: 'BrowseParts'}" exact>
              Browse Parts
            </router-link>
          </li>
        </ul>
      </nav>
      </header>
    <div class="container">
      <aside class="aside">
        <router-view name="sidebar"/>

      </aside>
    <main>
    <router-view/>
    </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>
<style>
  body{
    background: linear-gradient(to bottom, #e84393,#a29bfe );
    background-attachment: fixed;
  }
</style>
<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

}
  main {
    padding: 30px;
background-color: white;
width: 964px;
min-height: 300px;
  }
header {
  background: linear-gradient(to right,#a29bfe,#fd79a8);
  width: 1184px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.nav-link{
  text-decoration: none;
  color: inherit;
}
  .nav-high {
    color: white;
  }
  .container{
    display: flex;
    margin: 10px auto 0 auto;
    justify-content: center;
  }
  .aside{
    padding: 30px;
    background: linear-gradient(to bottom,#FDFFFC,#8338EC);
    width: 100px;
    min-height: 300px;
  }
</style>
