<template>
  <div>
    <el-tooltip :content="$t('help.name')" effect="light" placement="bottom">
      <img :src="help" style="height: 20px;cursor:pointer;" @click="dialogVisible=true"/>
    </el-tooltip>
    <el-dialog :title="$t('help.name')" :visible.sync="dialogVisible" center>
      <slot name="helpDetail"></slot>
    </el-dialog>
  </div>
</template>

<script>
import help from '@/assets/svg/help.svg';

export default {
  name: 'index',
  components: {},
  data() {
    return {
      dialogVisible: false,
      help: help,
    };
  },
  props: {},
  methods: {},
  mounted() {

  },
  watch: {},
};
</script>
<style lang='scss'>

</style>
