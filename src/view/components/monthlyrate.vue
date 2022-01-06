<template>
  <el-select ref="sel" v-model="value" :disabled="disabled"
             :loading="loading"
             :multiple="multiple" :size="size" filterable @change="change">
    <el-option
      v-for="item in optionscurrency"
      :key="item.currency"
      :label="item.currencyname"
      :value="item.currency">
    </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'monthlyrate',
  data() {
    return {
      optionscurrency: [],
      value: '',
      loading: false,
    };
  },
  props: {
    size: {
      type: String,

    },
    month: {
      type: String,
      default:
        function() {
          return '';
        },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [String, Array],
    },
    disabled: {
      type: Boolean,
      default:
        false,
    },
    no: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  mounted() {
    if (this.data) {
      this.value = this.data;
    }
    if (this.month) {
      this.loading = true;
      this.optionscurrency = [];
      let dic = this.$store.getters.monthlyrate.filter(item => item.month === this.month);
      for (let item of dic) {
        this.optionscurrency.push(item);
      }
      this.loading = false;
    } else {
      this.optionscurrency = [];
    }
  },
  methods: {
    change(val) {
      this.$emit('change', val, this.no);
    },
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
        this.optionscurrency = [];
        let dic = this.$store.getters.monthlyrate.filter(item => item.month === val);
        for (let item of dic) {
          this.optionscurrency.push(item);
        }
      } else {
        this.optionscurrency = [];
      }
    },
  },
};
</script>

<style scoped>
</style>
