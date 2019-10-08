<template>
  <div >
    <div class="header">
      <span v-if="open" @click="open = !open "><a-icon type="caret-up" />Collapse</span>
      <span v-if="!open" @click="open = !open "><a-icon type="caret-down" />Expend</span>
    </div>
    <slot v-if="open">

    </slot>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  data() {
    return { open: true };
  },
};
</script>

<style scoped>
  .header {
    background: linear-gradient(to bottom, #DADAD9,#DADAD9 );
    padding: 3px;
    cursor: pointer;

  }

</style>
