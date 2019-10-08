<template>
  <a-row type="flex" justify="start">
    <form id="formSubmit" v-on:submit.prevent="post">
      <a-row type="flex">
        <a-col :span="24">
          <label > Creat your Robot Name, Description and Price:</label>
        </a-col>
        <a-col :span="24">
          <a-input
            id="addingName"
            placeholder="Part Name"
            size="default"
            type="text"
            v-model="addedName"
          />
          <div  id="invalidInput" v-if="missingName && showWarning" >Part Name is required.</div>
        </a-col>

      </a-row>
      <a-row type="flex">
        <a-col :span="24">
          <a-textarea
            id="addingDescription"
            v-model="addedDescription"
            style="margin-bottom: 1px"

            placeholder="What your part is going to do?"
            :autosize="{ minRows: 2, maxRows: 50 }" />
        </a-col>
        <a-col :span="8">
          <a-input-number
            id="addingPrice"
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
          <a-button  type="primary" id="postToBaseButton" v-on:click.prevent="validateForm">
            Send
          </a-button>
        </a-col>
      </a-row>
    </form>
  </a-row>
</template>

<script>
export default {
  fetching() {
    this.$emit('fetching');
  },
  name: 'AddingPartsToServer',
  data() {
    return {
      showWarning: false,
      dataIsSending: false,
      addedPrice: '20',
      addedDescription: '',
      addedName: '',
    };
  },
  computed: {
    missingName() { return this.addedName === ''; },
  },
  methods: {
    validateForm(event) {
      if (this.missingName) {
        event.preventDefault();
        this.showWarning = true;
      } else {
        this.post();
        this.showWarning = false;
      }
    },
    post() {
      this.dataIsSending = true;
      const emptyField = this.addedName;
      const emptyDescription = this.addedDescription;
      const emptyPrice = this.addedPrice;
      this.addedName = '';
      this.addedDescription = '';
      this.addedPrice = 20;
      this.$http.post(`${process.env.VUE_APP_HOST}/items`, {
        name: emptyField,
        description: emptyDescription,
        price: emptyPrice,
      }).then((data) => {
        this.fetching();
        this.dataIsSending = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ant-input-number{
        display: block;
        width: 100%;
    }
#invalidInput{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color:#ff7979;
    }
#postToBaseButton{
  display: block;
  width: 100%;
  /*margin-left: 3px;*/
}
</style>
