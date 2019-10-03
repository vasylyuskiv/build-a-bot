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
                <a-button id="deleteButton"  v-on:click.once="deleteLine(robotName.id)" class="right" type="danger">delete</a-button>
                <a-button id="editButton" type="primary" class="right" v-on:click.prevent="handleModalOpen(robotName)">edit</a-button>
              </a-col>
            </a-row >
            <a-row type="flex" justify="space-between">
              <a-col :span="20" id="description"> Description: <p>{{robotName.description}}</p></a-col>
              <a-col :span="4" id="price">price: {{robotName.price}}$</a-col>
            </a-row>
          </li></ul></h2>

      </div>
    </div>
<div class="ant-col-8">
<a-row type="flex" justify="start">
  <form id="formSubmit" v-on:submit.prevent="post">
    <a-row type="flex">
    <a-col :span="24">
  <label > Creat your Robot Name, Description and Price:</label>
    </a-col>
   <a-col :span="24">
     <a-input placeholder="Part Name" size="default" type="text" v-model="addedName" />
   </a-col>

    </a-row>
    <a-row type="flex">
      <a-col :span="24">
        <a-textarea v-model="addedDescription" style="margin-bottom: 1px" placeholder="What your part is going to do?" :autosize="{ minRows: 2, maxRows: 50 }" />
      </a-col>
      <a-col :span="8">
        <a-input-number
          :defaultValue="20"
          :max="100000"
          :maxlength="6"
          :min="1"
          :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
          v-model="addedPrice"
        />
      </a-col>

      <a-col :span="16">
        <a-button  type="primary" id="postToBaseButton" v-on:click.prevent="post">Send</a-button>
      </a-col>
    </a-row>
    </form>
</a-row>
</div>
      </div>

    <a-modal id="modalWindow"
    title="Edit Robot Part"
    v-model="visible"
    @ok="handleModalOk" @cancel="handleModalCancel"

  >
      <div v-if="editableLine">
        <p>{{editableLine.id}}</p>
        <p><a-input v-on:keyup.enter="handleModalOk" type="text" v-model="editableLine.name"/></p>
        <p><a-input v-on:keyup.enter="handleModalOk" type="text" v-model="editableLine.description"/></p>
        <p><a-input :maxlength="6" v-on:keyup.enter="handleModalOk" type="text" v-model="editableLine.price"/></p>
      </div>
  </a-modal>
  </div>
</template>


<script>

export default {
  name: 'MoreInfo',
  data() {
    return {
      value: '',
      nonEditedName: '',
      nonEditedPrice: '',
      nonEditedDescription: '',
      editableLine: null,
      visible: false,
      robotNames: [],
      addedPrice: '20',
      addedDescription: '',
      addedName: '',
      dataIsSending: false,
    };
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
    post() {
      this.dataIsSending = true;
      const emptyField = this.addedName;
      const emptyDescription = this.addedDescription;
      const emptyPrice = this.addedPrice;
      this.addedName = null;
      this.addedDescription = null;
      this.addedPrice = 20;
      this.$http.post(`${process.env.VUE_APP_HOST}/items`, {
        name: emptyField,
        description: emptyDescription,
        price: emptyPrice,
      }).then((data) => {
        this.fetchData();
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
h3{
/*height: 32px;*/
  /*border-bottom: dashed;*/
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
#postToBaseButton{
  display: block;
  width: 100%;
  /*margin-left: 3px;*/
}
#inputPrice{
  display: block;
  width: 100%;
}
  textarea{
    margin-bottom: 0;
  }
  .ant-input-number{
    display: block;
    width: 100%;
  }
</style>
