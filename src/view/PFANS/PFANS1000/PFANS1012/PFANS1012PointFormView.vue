<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="left" label-width="8rem" ref="reff" style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.type')">
                <dicselect :code="code1"
                           :data="form.type"
                           @change="getValue"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="hidden">
            <el-form-item :label="$t('label.judgement')" v-show="show ">
              <el-select @change="change" @remove-tag="getAward" multiple placeholder="请选择" v-model="form.judgement">
                <el-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in options">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {getOrgInfoByUserId} from '@/utils/customize'
  import dicselect from "../../../components/dicselect";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui';

  export default {
    name: 'PFANS1012PointFormView',
    components: {
      EasyNormalContainer, user,
      dicselect,
    },
    data() {
      return {
        vote:[],
        award: [],
        options: [],
        selectType: "Single",
        loading: false,
        userlist: "",
        title: "title.PFANS1012VIEW",
        buttonList: [{
          key: "next",
          name: "button.next",
          disabled: true,
          icon: "el-icon-check"
        }],
        form: {
          type: '',
          judgement: []
        },
        code1: 'PJ001',
        show: false,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
          .then(response => {
            this.form = response.publicexpense;
            this.getValue(this.form.type);
            if (this.form.type === 'PJ001001' || this.form.type === 'PJ001002') {
              this.show = false;
            } else {
              this.show = true;
            }
            this.loading = false
          })
      }

      this.loading = true;
      this.$store
        .dispatch('PFANS1012Store/getJudgement', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            vote.value = response[i].judgementid;
            vote.label = response[i].filename;
            this.options.push(vote)
          }
          this.loading = false;
        })
        .catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },

    methods: {
      change(val) {
        let option="";
        let _option = [];
        this.buttonList[0].disabled = false;
        val.forEach(a => {
          option = this.options.filter((option1) => {
             return  a === option1.value
          });
          if(option){
            _option.push(option);
          }else{
            _option = [];
          }
        });
        this.vote = _option;
      },
      getAward() {
        if (this.form.judgement.length === 0) {
          this.buttonList[0].disabled = true;
        }
      },
      getValue(val) {
        this.form.type = val;
        if (val === 'PJ001001' || val === 'PJ001002') {
          this.show = false;
          this.buttonList[0].disabled = false;
        } else {
          this.buttonList[0].disabled = true;
          this.show = true;
        }
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', '');
        if (val === "next") {
          this.$router.push({
            name: 'PFANS1012FormView',
            params: {
              _name: this.vote,
              _type: this.form.type,
              disabled: true
            }
          })
        } else {
          this.$router.push({
            name: 'PFANS1012View',
            params: {}

          })
        }
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">

</style>


