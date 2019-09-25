<template>
  <div class="-col-24">
    <label>Customise your own robot:</label>
    <!--<a-button type="primary">Get info from server </a-button>-->
    <div class="-col-24" >
    <div class="ant-col-16" id="show-server-robots">
      <h1> Your Parts: </h1>
      <div  v-for="robotName in robotNames" class="single-info">
        <h4><ul><li>{{ robotName.name }} <a-button id="deleteButton"  v-on:click.once="deleteLine(robotName.id)" class="right" type="danger">delete</a-button></li></ul></h4>
      </div>
    </div>
<div class="ant-col-8">
  <form v-on:submit.prevent="post">
<span class="ant-row">
  <label > Send your Robot Info</label>
  </span>
    <span class="ant-row">
  <label class="-block">
    <input type="text" v-model="addedName" />
    <a-button type="primary" id="postToBaseButton" v-on:click.prevent="post" >Send</a-button>
  </label>
      </span>
    </form>

</div>
      </div>
  </div>
</template>


<script>
export default {
  name: 'MoreInfo',
  data() {
    return {
      robotNames: [],
      addedName: '',
      dataIsSending: false,
    };
  },
  methods: {
    post() {
      this.dataIsSending = true;
      const empytField = this.addedName;
      this.addedName = null;
      this.$http.post('http://test-poc.loc/items', {
        name: empytField,
      }).then((data) => {
        console.log(data);
        // this.emit('itemPosted');
        this.fetchData();
        this.addedName = null;
        this.dataIsSending = false;
      });
    },
    deleteLine(robotInfoId) {
      this.$http.delete(`http://test-poc.loc/items/${robotInfoId}`).then(() => {
        this.fetchData();
      });
    },
    fetchData() {
      this.$http.get('http://test-poc.loc/items').then((data) => {
        this.robotNames = data.body.items;
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
 /* @import "~ant-design-vue/dist/antd.less";*/

  .right{
    float: right;
  }
h4{

  background: linear-gradient(to right, #A2A7A5, #DADAD9 );
}
  #deleteButton {


  }
</style>
