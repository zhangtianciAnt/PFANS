<template>
  <el-select :disabled="disabled" :loading="loading" :multiple="multiple"
             ref="sel" clearable
             @change="change" filterable v-model="value" :size="size">
    <el-option
      :key="item.code"
      :label="item.value1"
      :value="item.code"
      v-for="item in options">
    </el-option>
  </el-select>
</template>

<script>

    export default {
    name: 'dicselect',
    data() {
      return {
        options: [],
        value: '',
        loading: false
      }
    },
    props: {
      size:{
        type:String,

      },
      code: {
        type: String,
        //共通下拉框添加筛选 ztc 1103 fr
        default:
          function () {
            return ''
          }
      },
      fliCode: {
        type: String,
        //共通下拉框添加筛选 ztc 1103 to
        default:
          function () {
            return ''
          }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      data: {
        type: [String, Array]
      },
      disabled: {
        type: Boolean,
        default:
          false
      },
      no: {
        type: Object,
        default: function () {
          return {};
        }
      },
    },
    mounted() {
      if (this.data) {
        this.value = this.data;
      }
      if (this.code) {
        this.loading = true;
        this.options=[]
        let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === this.code);
        for(let item of dic){
          this.options.push(item);
        }
        //共通下拉框添加筛选 ztc 1103 fr
        if(this.fliCode !== ''){
          console.log(this.options)
          this.options = this.options.filter(opt => opt.value5.indexOf(this.fliCode) !== -1);
          console.log('------')
          console.log(this.options)
        }
        //共通下拉框添加筛选 ztc 1103 to
        this.loading = false;
        // this.$store
        //   .dispatch('dictionaryStore/getForSelect', {'code': this.code})
        //   .then(response => {
        //     this.options = response;
        //     this.loading = false;
        //   })
        //   .catch(error => {
        //     this.loading = false;
        //     this.$message.error({
        //       message: error,
        //       type: 'error',
        //       duration: 5 * 1000
        //     })
        //   })
      }else{
        this.options=[]
      }
    },
    methods: {
      change(val) {
        this.$emit("change", val, this.no);
      }
    },
    watch: {
      data(val) {
        if (val) {
          this.value = this.data;
        } else {
            this.value = '';
        }
      },
      code(val) {
        if (val) {
          this.options=[];
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === val);
          for(let item of dic){
            this.options.push(item);
          }
        }else{
          this.options=[];
        }
      }
    }
  }
</script>

<style scoped>
</style>
