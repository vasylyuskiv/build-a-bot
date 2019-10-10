<template>
  <div type="flex" class="-col-24">
    <label>Customise your own robot:</label>
    <div class="-col-24" >
    <div type="flex" class="ant-col-16" id="show-server-robots">
      <h1> Your Parts: </h1>
      <div type="flex" v-for="robotName in robotNames" class="single-info">
          <h2><ul><li>
            <a-row type="flex" justify="space-between">
              <a-col>{{ robotName.name }}</a-col>
              <a-col>
                <a-button
                  id="deleteButton"
                  v-on:click="deleteLine(robotName.id)"
                  class="right"
                  type="danger">
                  delete
                </a-button>
                <a-button
                  id="editButton"
                  type="primary"
                  class="right"
                  v-on:click.prevent="handleModalOpen(robotName)">
                  edit
                </a-button>
              </a-col>
            </a-row >
            <a-row type="flex" justify="space-between">
              <a-col :span="20" id="description">
                Description:
                <p>{{robotName.description}}</p>
              </a-col>
              <a-col :span="4" id="price">price: {{robotName.price}}$</a-col>
            </a-row>
          </li></ul></h2>

      </div>
    </div>
<div class="ant-col-8">
  <AddingPartsToServer  @fetching="fetchData" />
</div>
      </div>

    <a-modal id="modalWindow"
    title="Edit Robot Part"
    v-model="visible"
    @ok="handleModalOk" @cancel="handleModalCancel"

  >
      <div v-if="editableLine">
        <p>{{editableLine.id}}</p>
        <p><a-input
          id="editName"
          v-on:keyup.enter="handleModalOk"
          type="text"
          v-model="editableLine.name"/></p>
        <p><a-input id="editDescription" v-on:keyup.enter="handleModalOk"
                    type="text"
                    v-model="editableLine.description"/></p>
        <p><a-input id="editPrice"
                    :maxlength="6"
                    v-on:keyup.enter="handleModalOk"
                    type="text"
                    v-model="editableLine.price"/></p>
      </div>
  </a-modal>
  </div>
</template>


<script>
import AddingPartsToServer from './AddingPartsToServer.vue';

export default {
  name: 'MoreInfo',
  components: { AddingPartsToServer },
  data() {
    return {
      value: '',
      nonEditedName: '',
      nonEditedPrice: '',
      nonEditedDescription: '',
      editableLine: null,
      visible: false,
      robotNames: [],
    };
  },
  computed: {
  },
  methods: {
    handleModalOpen(robotData) {
      this.visible = true;
      this.editableLine = robotData;
      this.nonEditedName = robotData.name;
      this.nonEditedPrice = robotData.price;
      this.nonEditedDescription = robotData.description;
    },
    handleModalOk() {
      this.editLine(this.editableLine);
    },
    handleModalCancel() {
      this.editableLine.name = this.nonEditedName;
      this.editableLine.price = this.nonEditedPrice;
      this.editableLine.description = this.nonEditedDescription;
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
        price: robotData.price,
        description: robotData.description,
      }).then(() => {
        this.fetchData();
        this.editableLine = null;
      });
    },
    fetchData() {
      this.$http.get(`${process.env.VUE_APP_HOST}/items`).then((data) => {
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
  .ant-btn-primary:focus {
    color: #fff;
    background-color: #c1d3de;
    border-color: #c1d3de;
  }

  .right{
    float: right;
  }
  .single-info{
    /*background-color: white;*/
    border-radius: 25px 0px 25px 25px;
    -webkit-box-shadow: 0 5px 6px -6px #777;
    -moz-box-shadow: 0 5px 6px -6px #777;
    box-shadow: 0 5px 6px -6px #777;
  }

h3{
  background: linear-gradient(to right, #DADAD9, #DADAD9 );
}
#description {
  word-break: break-all;
margin-top: 10px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
  #price{
    margin-top: 10px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
  }
#inputPrice{
  display: block;
  width: 100%;
}
  textarea{
    margin-bottom: 0;
  }
</style>
