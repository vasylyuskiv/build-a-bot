<template>
  <div class="-col-24">
    <label>Customise your own robot:</label>
    <div class="-col-24" >
    <div class="ant-col-16" id="show-server-robots">
      <h1> Your Parts: </h1>
      <div  v-for="robotName in robotNames" class="single-info">
          <h3><ul><li>{{ robotName.name }}
            <a-button id="deleteButton"  v-on:click.once="deleteLine(robotName.id)" class="right" type="danger">delete</a-button>
            <a-button id="editButton" type="primary" class="right" v-on:click.prevent="handleModalOpen(robotName)">edit</a-button>
          </li></ul></h3>
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
      this.$http.post(`${process.env.VUE_APP_HOST}/items`, {
        name: empytField,
      }).then((data) => {
        console.log(data);
        this.fetchData();
        this.addedName = null;
        this.dataIsSending = false;
      });
    },
    deleteLine(robotInfoId) {
      this.$http.delete(`${process.env.VUE_APP_HOST}/items/${robotInfoId}`).then(() => {
        this.fetchData();
      });
    },
    editLine(robotData) {
      this.visible = false;
      this.$http.put(`${process.env.VUE_APP_HOST}/items/${robotData.id}`, {
        name: robotData.name,
      }).then(() => {
        this.fetchData();
        this.editableLine = null;
      });
    },
    fetchData() {
      this.$http.get(`${process.env.VUE_APP_HOST}/items`).then((data) => {
        this.robotNames = data.body.items;
        console.log(process.env.VUE_APP_HOST);
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
  .ant-btn-primary:focus {
    color: #fff;
    background-color: #c1d3de;
    border-color: #c1d3de;
  }

  .right{
    float: right;
  }
h3{
/*height: 32px;*/
  /*border-bottom: dashed;*/
  background: linear-gradient(to right, #DADAD9, #DADAD9 );
}
  #deleteButton {


  }
</style>
