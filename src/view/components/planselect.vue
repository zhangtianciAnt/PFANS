<template>
  <dicselect :code="code" :data="data" :disabled="disabled" :multiple="multiple" :no="no"></dicselect>
</template>

<script>
  import dicselect from '@/view/components/dicselect.vue'
  import {Message} from 'element-ui'

  export default {
    name: "planselect",
    components: {
      dicselect
    },
    data() {
      return {
        code: ""
      }
    },
    props: {
      type: {
        type: String,
        default: "1"
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
      let user = this.$store.getters.userinfo.userinfo;
      let value2 = user.centerid;
      if (this.type === '2') {
        value2 = user.groupid;
      } else if (this.type === '3') {
        value2 = user.teamid;
      }

      this.$store
        .dispatch('dictionaryStore/getForvalue2', {'value2': value2})
        .then(response => {
          if (response.length > 0) {
            this.code = response[0].code;
          }else{
            this.code = 'PG001'
          }
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
</script>

<style scoped>

</style>
