<template>
  <div>
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
          <li class="nav-item">
            <router-link active-class="nav-high" class="nav-link" :to="{ name: 'AddParts'}" exact>
              Add Parts
            </router-link>
          </li>
        </ul>
        <a-breadcrumb>
          <router-link active-class="nav-high" class="nav-link" :to="{ name: 'Home'}" exact>
          <a-breadcrumb-item >
            <a-icon type="home" />
          </a-breadcrumb-item>
          </router-link>
          <router-link active-class="nav-high" class="nav-link" :to="{ name: 'Build'}" exact>
          <a-breadcrumb-item href="">
            <a-icon type="user" />
            <span>Build Robot</span>
          </a-breadcrumb-item>
          </router-link>
          <router-link active-class="nav-high" class="nav-link" :to="{ name: 'BrowseParts'}" exact>
          <a-breadcrumb-item>
            Browse Parts
          </a-breadcrumb-item>
          </router-link>
          <router-link active-class="nav-high" class="nav-link" :to="{ name: 'AddParts'}" exact>
            <a-breadcrumb-item>
             Add Parts
            </a-breadcrumb-item>
          </router-link>

        </a-breadcrumb>
      </nav>
      </header>
  </div>
    <div class="container">
      <!--<aside class="aside">
        <router-view name="sidebar"/>

      </aside>-->
    <main>
    <router-view/>
    </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      current: ['mail'],
    };
  },
};
</script>
<style lang="less">
  /*@import  "~ant-design-vue/dist/antd.less";*/

  body{
    background: linear-gradient(to bottom, #DADAD9,#DADAD9);
    background-attachment: fixed;
  }
</style>
<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

}
  main {
    padding: 30px;
background-color: #DADAD9;
width: 1164px;
min-height: 300px;
  }
header {
  background: linear-gradient(to right,#DADAD9,#DADAD9);
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
