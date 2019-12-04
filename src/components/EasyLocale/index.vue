<template>
  <div>
    <el-select v-model="value" placeholder="请选择"@change="change" size="mini">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        options: [{
          value: 'zh_CN',
          label: this.$t('normal.zh_CN')
        }, {
          value: 'ja',
          label: this.$t('normal.ja')
        }],
        value: this.$i18n.locale
      };
    },
    props: {
    },
    methods: {
      change(val){
        this.$i18n.locale = val
        localStorage.setItem('lang', this.$i18n.locale)
        this.options=[{
          value: 'zh_CN',
          label: this.$t('normal.zh_CN')
        }, {
          value: 'ja',
          label: this.$t('normal.ja')
        }]
      }
    },
    mounted() {

    },
    watch: {}
  }
</script>
<style lang='scss'>

</style>
