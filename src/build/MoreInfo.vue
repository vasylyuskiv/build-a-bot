<template>
  <div class="-col-24">
    <label>Customise your own robot:</label>
    <div class="-col-24" >
    <div class="ant-col-16" id="show-server-robots">
      <h1> Your Parts: </h1>
      <div  v-for="robotName in robotNames" class="single-info">
          <h4><ul><li>{{ robotName.name }}
            <a-button id="deleteButton"  v-on:click.once="deleteLine(robotName.id)" class="right" type="danger">delete</a-button>
            <a-button id="editButton" type="primary" class="right" v-on:click="handleModalOpen(robotName)">edit</a-button>
          </li></ul></h4>
      </div>
    </div>
<div class="ant-col-8">
  <form id="formSubmit" v-on:submit.prevent="post">
<span class="ant-row">
  <label > Send your Robot Info</label>
  </span>
    <span class="ant-row" >
  <label class="-block">
    <span class="ant-col-18">
    <a-input size="default" type="text" v-model="addedName" />
    </span>
    <span >
    <a-button  type="primary" id="postToBaseButton" v-on:click.prevent="post">Send</a-button>
    </span>
  </label>
      </span>
    </form>

</div>
      </div>

    <a-modal id="modalWindow"
    title="Edit Robot Part"
    v-model="visible"
    @ok="handleModalOk" @cancel="handleModalCancel"

  >
      <div v-if="editableLine">
        <p>{{editableLine.id}}</p>
        <p><a-input v-on:keyup.enter="handleModalOk" type="text" v-model="editableLine.name" /></p>
      </div>
  </a-modal>
  </div>
</template>


<script>
export default {
  name: 'MoreInfo',
  data() {
    return {
      nonEditedName: '',
      editableLine: null,
      visible: false,
      robotNames: [],
      addedName: '',
      dataIsSending: false,
    };
  },
  methods: {
    handleModalOpen(robotData) {

      this.visible = true;
      this.editableLine = robotData;
      this.nonEditedName = robotData.name;
    },
    handleModalOk() {
      this.editLine(this.editableLine);
    },
    handleModalCancel() {
      this.editableLine.name = this.nonEditedName;
    },
    post() {
      this.dataIsSending = true;
      const empytField = this.addedName;
      this.addedName = null;
      this.$http.post('http://test-poc.loc/items', {
        name: empytField,
      }).then((data) => {
        console.log(data);
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
    editLine(robotData) {
      this.visible = false;
      this.$http.put(`http://test-poc.loc/items/${robotData.id}`, {
        name: robotData.name,
      }).then(() => {
        this.fetchData();
        this.editableLine = null;
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


  .right{
    float: right;
  }
h4{

  background: linear-gradient(to right, #A2A7A5, #DADAD9 );
}
  #deleteButton {


  }
</style>
