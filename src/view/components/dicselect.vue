<template>
  <el-select :disabled="disabled" :loading="loading" :multiple="multiple" @change="change" filterable v-model="value">
    <el-option
      :key="item.code"
      :label="item.value1"
      :value="item.code"
      v-for="item in options">
    </el-option>
  </el-select>
</template>

<script>
  import {Message} from 'element-ui'

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
      code: {
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
      if (this.code) {
        this.loading = true;

        this.$store
          .dispatch('dictionaryStore/getForSelect', {'code': this.code})
          .then(response => {
            this.options = response;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
          })
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
        }
      },
      code(val) {
        if (val) {
          this.$store
            .dispatch('dictionaryStore/getForSelect', {'code': val})
            .then(response => {
              this.options = response
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000
              })
            })
        }
      }
    }
  }
</script>

<style scoped>
</style>
