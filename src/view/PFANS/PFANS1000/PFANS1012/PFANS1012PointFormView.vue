<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.type')">
                <dicselect :code="code1"
                           :data="form.type"
                           @change="getValue"
                           style="width: 20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="hidden">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_JCTYPE')" v-show="show ">
                <el-select @change="changedata" clearable v-model="form.judgementnumber" style="width: 20vw">
                  <el-option
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                    v-for="item in optionsdata">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.judgement')" v-show="showdata">
                <el-select @change="change" @remove-tag="getAward" multiple clearable v-model="form.judgement"
                           style="width: 20vw">
                  <el-option
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect';
  import user from '../../../components/user.vue';
  import moment from 'moment';
  import {Message} from 'element-ui';
  import {getCurrentRole2} from '@/utils/customize';

  export default {
    name: 'PFANS1012PointFormView',
    components: {
      EasyNormalContainer, user,
      dicselect,
    },
    data() {
      return {
        vote: [],
        optionsdata: [{value: '1', lable: this.$t('menu.PFANS1004')}, {
          value: '2',
          lable: this.$t('menu.PFANS1005'),
        }, {value: '3', lable: this.$t('menu.PFANS1010')}
          , {value: '4', lable: this.$t('label.PFANS1012VIEW_CHECKLIST')}
          , {value: '5', lable: this.$t('label.PFANS1012VIEW_PURCHASSES')}
          , {value: '6', lable: this.$t('label.PFANS1012VIEW_PURCHASSESWC')}],
        award: [],
        role1: '',
        options: [],
        selectType: 'Single',
        loading: false,
        showdata: false,
        userlist: '',
        title: 'title.PFANS1012VIEW',
        buttonList: [{
          key: 'next',
          name: 'button.next',
          disabled: true,
          icon: 'el-icon-check',
        }],
        form: {
          judgementnumber: [],
          type: '',
          judgement: [],
        },
        code1: 'PJ001',
        show: false,
      };
    },
    mounted() {
      //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的而数据
      this.role1 = getCurrentRole2();
      //add-ws-5/13-总务担当看到所有符合条件的数据，其他人看本身的而数据
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
          .then(response => {
            this.form = response.publicexpense;
            this.getValue(this.form.type);
            if (this.form.type === 'PJ001001') {
              this.show = false;
              this.showdata = false;
            } else if (this.form.type === 'PJ001002') {
              this.show = true;
              this.showdata = true;
            }
            this.loading = false;
          });
      }
    },
    methods: {
      changedata(val) {
        this.loading = true;
        this.showdata = true;
        let user_id = this.$store.getters.userinfo.userid;
        if (val == '1') {
          this.form.judgement = '';
          this.options = [];
          if (this.role1 === '0') {
            this.$store
              .dispatch('PFANS1012Store/selectJudgement', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if (response[i].equipment == '0') {
                    if (response[i].createon !== null && response[i].createon !== '') {
                      response[i].createon = moment(response[i].createon).format('YYYY-MM-DD');
                    }
                    var vote = {};
                    vote.value = response[i].judgementid;
                    vote.label = this.$t('menu.PFANS1004') + '_' + response[i].judgnumbers;
                    this.options.push(vote);
                  }
                }
                this.loading = false;
              }).catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
          } else {
            this.$store
              .dispatch('PFANS1012Store/selectJudgement', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if (user_id === response[i].user_id && response[i].equipment == '0') {
                    if (response[i].createon !== null && response[i].createon !== '') {
                      response[i].createon = moment(response[i].createon).format('YYYY-MM-DD');
                    }
                    var vote = {};
                    vote.value = response[i].judgementid;
                    vote.label = this.$t('menu.PFANS1004') + '_' + response[i].judgnumbers;
                    this.options.push(vote);
                  }
                }
                this.loading = false;
              }).catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
          }
        } else if (val == '2') {
          this.form.judgement = '';
          this.options = [];
          this.$store
            .dispatch('PFANS1012Store/selectPurchaseApply', {})
            .then(response => {
              let user_id = this.$store.getters.userinfo.userid;
              for (let i = 0; i < response.length; i++) {
                if (user_id === response[i].user_id) {
                  if (response[i].createon !== null && response[i].createon !== '') {
                    response[i].createon = moment(response[i].createon).format('YYYY-MM-DD');
                  }
                  var vote = {};
                  vote.value = response[i].purchaseapply_id;
                  vote.label = this.$t('menu.PFANS1005') + '_' + response[i].purchasenumbers;
                  this.options.push(vote);
                }
              }
              this.loading = false;
            }).catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
        } else if (val == '3') {
          this.form.judgement = '';
          this.options = [];
          this.$store
            .dispatch('PFANS1012Store/selectCommunication', {})
            .then(response => {
              let user_id = this.$store.getters.userinfo.userid;
              for (let i = 0; i < response.length; i++) {
                if (user_id === response[i].user_id) {
                  if (response[i].createon !== null && response[i].createon !== '') {
                    response[i].createon = moment(response[i].createon).format('YYYY-MM-DD');
                  }
                  var vote = {};
                  vote.value = response[i].communication_id;
                  vote.label = this.$t('menu.PFANS1010') + '_' + response[i].createon;
                  this.options.push(vote);
                }
              }
              this.loading = false;
            }).catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
        } else if (val == '4') {
          this.form.judgement = '';
          this.options = [];
          this.loading = true;
          this.$store
            .dispatch('PFANS1025Store/get', {'maketype': '7'})
            .then(response => {
              for (let i = 0; i < response.length; i++) {
                if (response[i].status === '4') {
                  var vote = {};
                  vote.value = response[i].award_id;
                  vote.label = this.$t('label.PFANS1012VIEW_CHECKLIST') + '_' + response[i].contractnumber;
                  this.options.push(vote);
                }
              }
              this.loading = false;
            }).catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
        } else if (val == '5') {
          this.form.judgement = '';
          this.options = [];
          if (this.role1 === '0') {
            this.loading = true;
            this.$store
              .dispatch('PFANS3005Store/getPurchaseList')
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if (response[i].status === '4') {
                    var vote = {};
                    vote.value = response[i].purchase_id;
                    vote.label = this.$t('label.PFANS1012VIEW_PURCHASSES') + '_' + response[i].purnumbers;
                    this.options.push(vote);
                  }
                }
                this.loading = false;
              }).catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
          } else {
            this.loading = true;
            this.$store
              .dispatch('PFANS3005Store/getPurchase')
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if (response[i].status === '4') {
                    var vote = {};
                    vote.value = response[i].purchase_id;
                    vote.label = this.$t('label.PFANS1012VIEW_PURCHASSES') + '_' + response[i].purnumbers;
                    this.options.push(vote);
                  }
                }
                this.loading = false;
              }).catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
          }
        } else if (val == '6') {
          this.form.judgement = '';
          this.options = [];
          this.$store
            .dispatch('PFANS1012Store/selectJudgement', {})
            .then(response => {
              for (let i = 0; i < response.length; i++) {
                if (user_id === response[i].user_id && response[i].equipment == '1') {
                  if (response[i].createon !== null && response[i].createon !== '') {
                    response[i].createon = moment(response[i].createon).format('YYYY-MM-DD');
                  }
                  var vote = {};
                  vote.value = response[i].judgementid;
                  vote.label = this.$t('menu.PFANS1003') + '_' + response[i].judgnumbers;
                  this.options.push(vote);
                }
              }
              this.loading = false;
            }).catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
        }
      },

      change(val) {
        let option = '';
        let _option = [];
        this.buttonList[0].disabled = false;
        val.forEach(a => {
          option = this.options.filter((option1) => {
            return a === option1.value;
          });
          if (option) {
            _option.push(option);
          } else {
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
        this.options = [];
        this.form.type = val;
        if (val === 'PJ001001') {
          this.show = false;
          this.showdata = false;
          this.buttonList[0].disabled = false;
        } else if (val === 'PJ001002') {
          this.buttonList[0].disabled = true;
          this.show = true;
        }
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', '');
        if (val === 'next') {
          this.$router.push({
            name: 'PFANS1012FormView',
            params: {
              _name: this.vote,
              _type: this.form.type,
              disabled: true,
            },
          });
        } else {
          this.$router.push({
            name: 'PFANS1012View',
            params: {},

          });
        }
      },
    },
  };

</script>

<style rel="stylesheet/scss" lang="scss">

</style>


