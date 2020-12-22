<template>
  <el-select :disabled="disabled" :loading="loading" :multiple="multiple"
             ref="sel"
             @change="change" filterable v-model="value" :size="size">
    <el-option
      :key="item.currency"
      :label="item.currencyname"
      :value="item.currency"
      v-for="item in options">
    </el-option>
  </el-select>
</template>

<script>

  export default {
    name: 'monthlyrate',
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
      month: {
        type: String,
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
      }
    },
    mounted() {
      if (this.data) {
        this.value = this.data;
      }
      if (this.month) {
        this.loading = true;
        this.options=[]
        let dic = this.$store.getters.monthlyrate.filter(item => item.month === this.month);
        for(let item of dic){
          this.options.push(item);
        }
        this.loading = false;
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
      month(val) {
        if (val) {
          this.options=[];
          let dic = this.$store.getters.monthlyrate.filter(item => item.month === val);
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
