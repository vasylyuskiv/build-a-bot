<template>
  <div >
    <div class="header">
      <span v-if="open" @click="open = !open ">&#8593;Collapse</span>
      <span v-if="!open" @click="open = !open ">&#8595;Expend</span>
    </div>
    <slot v-if="open">

    </slot>
  </div>
</template>

<script>
  export default {
    name: 'CollapsibleSection',
    data(){
      return {open: true};
    },
  };
</script>

<style scoped>
  .header {
    background: linear-gradient(to bottom, #e84393,#F4D35E );
    padding: 3px;
    cursor: pointer;

  }

</style>
