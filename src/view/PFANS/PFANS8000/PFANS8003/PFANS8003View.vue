<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      v-loading="loading" :noback="noback">
      <div slot="customize">
        <el-form label-position="left" label-width="8rem" ref="form" style="padding: 2rem;height: 35rem">
            <div v-html="this.form.richtext">
            </div>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import {Message} from 'element-ui';
    export default {
        name: "PFANS8003View",
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
