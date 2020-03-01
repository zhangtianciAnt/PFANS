<template>
  <el-select :disabled="disabled" :loading="loading" :multiple="multiple" @change="change" filterable refs="project"
             v-model="value">
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
    name: "project",
    data() {
      return {
        options: [],
        value: '',
        loading: false
      }
    },
    props: {
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
      this.loading = true;

      this.$store
        .dispatch('PFANS5001Store/getFpans5001List', {})
        .then(response => {
          for (let item of response) {
            let i = {};
            i.value1 = item.project_name;
            i.code = item.companyprojects_id;
            this.options.push(i);
          }
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
    , methods: {
      change(val) {
        this.$emit("change", val, this.no);
      }
    },
    watch: {
      data(val) {
        if (val) {
          this.value = this.data;
        }
      }
    }
  }
</script>

<style scoped>

</style>
