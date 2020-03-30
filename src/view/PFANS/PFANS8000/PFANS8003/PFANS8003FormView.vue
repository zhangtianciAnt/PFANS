<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      v-loading="loading">
      <div slot="customize" @disabled="setdisabled">
        <div v-html="this.form.richtext" style="overflow: auto"/>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  export default {
    name: "PFANS8003FormView",
    components: {
      EasyNormalContainer
    },
    data() {
      return {
        loading: false,
        _id: '',
        form: {
          richtext: ""
        },
        noback: true,
      }
    },
    mounted() {
      this._id = this.$route.params._id;
      this.getOneInformation(this._id);
    },
    methods: {
      getOneInformation(information) {
        this.loading = true;
        this.$store
          .dispatch("PFANS8008Store/getOneInformation", information)
          .then(response => {
            if (response) {
              const {
                richtext
              } = response[0];
              this.form = {
                richtext
              };
            }
            this.loading = false;
          })
          .catch(err => {
            Message({
              message: err,
              type: "error",
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },
    }

  }
</script>

<style scoped>

</style>
