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
                           :multiple="multiple"
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
          </el-row>
          <!--          add-ws-5/27-No.170-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.judgement')" v-show="showdata">
                <el-input type="textarea" :disabled="true" style="width:50vw" v-model="form.judgement"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="show7">
            <el-table
              :data="options.filter(data => !search || data.numbers.toLowerCase().includes(search.toLowerCase()))"
              style="width: 1205px"
              height="250"
              header-cell-class-name="sub_bg_color_blue" stripe border
            >
              <el-table-column
                align="center"
                prop="numbers"
                :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"
                width="150px">
              </el-table-column>
              <el-table-column
                align="center"
                prop="user_id"
                :label="$t('label.applicant')"
                width="142px">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="remarks"
                :label="$t('label.PFANS1012VIEW_ABSTRACT')"
                width="300px">
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="180">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleterow(scope.$index, options)"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click.native.prevent="viewdata(scope.row)"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.sumnumber')}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                align="right" width="205">
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="请输入编号关键字搜索"/>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container" style="padding-top: 2rem">
              <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                             :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                             @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
                <slot><span class="front Content_front"
                            style="padding-right: 0.5rem;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
              </el-pagination>
            </div>
          </div>
          <!--          add-ws-5/27-No.170-->
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
  import {getCurrentRole2, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1012PointFormView',
    components: {
      EasyNormalContainer, user,
      dicselect,
    },
    data() {
      return {
        multiple: false,
        totaldata: [],
        total: 0,
        listQuery: {
          page: 1,
          limit: 50,
        },
        show7: false,
        vote: [],
        optionsdata: [{value: '1', lable: this.$t('menu.PFANS1004')},
          {value: '2', lable: this.$t('menu.PFANS1005')},
          {value: '3', lable: this.$t('menu.PFANS1010')},
          {value: '4', lable: this.$t('label.PFANS1012VIEW_CHECKLIST')},
          {value: '5', lable: this.$t('label.PFANS1012VIEW_PURCHASSES')},
          {value: '6', lable: this.$t('label.PFANS1012VIEW_PURCHASSESWC')}],
        award: [],
        role1: '',
        search: '',
        options: [],
        selectType: 'Single',
        loading: false,
        showdata: false,
        userlist: '',
        listjudgement: [],
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
      // if (this.$route.params._id) {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS1012Store/selectById', {'publicexpenseid': this.$route.params._id})
      //     .then(response => {
      //       this.form = response.publicexpense;
      //       this.getValue(this.form.type);
      //       if (this.form.type === 'PJ001001') {
      //         this.show = false;
      //         this.showdata = false;
      //         this.show7 = false;
      //       } else if (this.form.type === 'PJ001002') {
      //         this.show = true;
      //         this.showdata = true;
      //       }
      //       this.loading = false;
      //     });
      // }
    },
    methods: {
      // add-ws-5/29-No.170
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      getList() {
        this.loading = true;
        let start = (this.listQuery.page - 1) * this.listQuery.limit;
        let end = this.listQuery.page * this.listQuery.limit;
        if (this.totaldata) {
          let pList = this.totaldata.slice(start, end);
          this.options = pList;
          this.total = this.totaldata.length;
        }
        this.loading = false;
      },
      deleterow(index, row) {
        this.listjudgement = [];
        let checktableD = '';
        if (this.form.judgement !== null && this.form.judgement !== '') {
          let letstaff = this.form.judgement.split(',');
          for (let a = 0; a < letstaff.length; a++) {
            if (row[index].label === letstaff[a]) {
              letstaff.splice(a, 1);
            }
          }
          for (let c = 0; c < letstaff.length; c++) {
            checktableD = checktableD + letstaff[c] + ',';
          }
          this.form.judgement = '';
          this.form.judgement = checktableD.substring(0, checktableD.length - 1);
        }
        let listcheck = this.form.judgement.split(',');
        for (let b = 0; b < this.options.length; b++) {
          for (let a = 0; a < listcheck.length; a++) {
            if (this.options[b].label === listcheck[a]) {
              var vote = {};
              vote.value = this.options[b].value;
              vote.label = this.options[b].label;
              this.listjudgement.push(vote);
              break;
            }
          }
        }
        if (this.form.judgement !== null && this.form.judgement !== '') {
          this.buttonList[0].disabled = false;
        }else{
          this.buttonList[0].disabled = true;
        }
      },
      viewdata(row) {
        this.listjudgement = [];
        let error = 0;
        let listcheck = this.form.judgement.split(',');
        for (let c = 0; c < listcheck.length; c++) {
          if (row.label === listcheck[c]) {
            error = error + 1;
          }
        }
        if (error === 0) {
          this.form.judgement = row.label + ',' + this.form.judgement;
        }
        let listcheckment = this.form.judgement.split(',');
        for (let b = 0; b < this.options.length; b++) {
          for (let a = 0; a < listcheckment.length; a++) {
            if (this.options[b].label === listcheckment[a]) {
              var vote = {};
              vote.value = this.options[b].value;
              vote.label = this.options[b].label;
              this.listjudgement.push(vote);
              break;
            }
          }
        }
        this.buttonList[0].disabled = false;
      },
      // add-ws-5/29-No.170
      changedata(val) {
        this.buttonList[0].disabled = true;
        this.loading = true;
        this.showdata = true;
        let user_id = this.$store.getters.userinfo.userid;
        if (val == '1') {
          this.form.judgement = '';
          this.options = [];
          this.totaldata = [];
          if (this.role1 === '0') {
            this.$store
              .dispatch('PFANS1012Store/selectJudgement', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if (response[i].equipment == '0') {
                    let user = getUserInfo(response[i].user_id);
                    if (user) {
                      response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                    }
                    var vote = {};
                    vote.user_id = response[i].user_id;
                    vote.remarks = response[i].filename;
                    vote.numbers = response[i].judgnumbers;
                    vote.value = response[i].judgementid;
                    vote.label = this.$t('menu.PFANS1004') + '_' + response[i].judgnumbers;
                    this.options.push(vote);
                    this.totaldata.push(vote);
                    this.getList();
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
                    let user = getUserInfo(response[i].user_id);
                    if (user) {
                      response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                    }
                    var vote = {};
                    vote.user_id = response[i].user_id;
                    vote.remarks = response[i].filename;
                    vote.numbers = response[i].judgnumbers;
                    vote.value = response[i].judgementid;
                    vote.label = this.$t('menu.PFANS1004') + '_' + response[i].judgnumbers;
                    this.options.push(vote);
                    this.totaldata.push(vote);
                    this.getList();
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
          this.totaldata = [];
          this.$store
            .dispatch('PFANS1012Store/selectPurchaseApply', {})
            .then(response => {
              let user_id = this.$store.getters.userinfo.userid;
              for (let i = 0; i < response.length; i++) {
                if (user_id === response[i].user_id) {
                  let user = getUserInfo(response[i].user_id);
                  if (user) {
                    response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                  }
                  var vote = {};
                  vote.user_id = response[i].user_id;
                  vote.remarks = response[i].remarks;
                  vote.numbers = response[i].purchasenumbers;
                  vote.value = response[i].purchaseapply_id;
                  vote.label = this.$t('menu.PFANS1005') + '_' + response[i].purchasenumbers;
                  this.options.push(vote);
                  this.totaldata.push(vote);
                  this.getList();
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
          this.totaldata = [];
          this.$store
            .dispatch('PFANS1012Store/selectCommunication', {})
            .then(response => {
              let user_id = this.$store.getters.userinfo.userid;
              for (let i = 0; i < response.length; i++) {
                if (user_id === response[i].user_id) {
                  let user = getUserInfo(response[i].user_id);
                  if (user) {
                    response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                  }
                  var vote = {};
                  vote.user_id = response[i].user_id;
                  vote.remarks = response[i].remarks;
                  vote.numbers = response[i].numbercation;
                  vote.value = response[i].communication_id;
                  vote.label = this.$t('menu.PFANS1010') + '_' + response[i].numbercation;
                  this.options.push(vote);
                  this.totaldata.push(vote);
                  this.getList();
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
          this.totaldata = [];
          this.loading = true;
          this.$store
            .dispatch('PFANS1025Store/get', {'maketype': '7'})
            .then(response => {
              for (let i = 0; i < response.length; i++) {
                if (response[i].status === '4') {
                  let user = getUserInfo(response[i].user_id);
                  if (user) {
                    response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                  }
                  var vote = {};
                  vote.user_id = response[i].user_id;
                  vote.remarks = response[i].remarks;
                  vote.numbers = response[i].contractnumber;
                  vote.value = response[i].award_id;
                  vote.label = this.$t('label.PFANS1012VIEW_CHECKLIST') + '_' + response[i].contractnumber;
                  this.options.push(vote);
                  this.totaldata.push(vote);
                  this.getList();
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
          this.totaldata = [];
          if (this.role1 === '0') {
            this.loading = true;
            this.$store
              .dispatch('PFANS3005Store/getPurchaseList')
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  if (response[i].status === '4') {
                    let user = getUserInfo(response[i].user_id);
                    if (user) {
                      response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                    }
                    var vote = {};
                    vote.user_id = response[i].user_id;
                    vote.remarks = response[i].purchasepurpose;
                    vote.numbers = response[i].purnumbers;
                    vote.value = response[i].purchase_id;
                    vote.label = this.$t('label.PFANS1012VIEW_PURCHASSES') + '_' + response[i].purnumbers;
                    this.options.push(vote);
                    this.totaldata.push(vote);
                    this.getList();
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
                    let user = getUserInfo(response[i].user_id);
                    if (user) {
                      response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                    }
                    var vote = {};
                    vote.user_id = response[i].user_id;
                    vote.remarks = response[i].purchasepurpose;
                    vote.numbers = response[i].purnumbers;
                    vote.value = response[i].purchase_id;
                    vote.label = this.$t('label.PFANS1012VIEW_PURCHASSES') + '_' + response[i].purnumbers;
                    this.options.push(vote);
                    this.totaldata.push(vote);
                    this.getList();
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
          this.totaldata = [];
          this.$store
            .dispatch('PFANS1012Store/selectJudgement', {})
            .then(response => {
              for (let i = 0; i < response.length; i++) {
                if (user_id === response[i].user_id && response[i].equipment == '1') {
                  let user = getUserInfo(response[i].user_id);
                  if (user) {
                    response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
                  }
                  var vote = {};
                  vote.user_id = response[i].user_id;
                  vote.remarks = response[i].filename;
                  vote.numbers = response[i].judgnumbers;
                  vote.value = response[i].judgementid;
                  vote.label = this.$t('menu.PFANS1003') + '_' + response[i].judgnumbers;
                  this.options.push(vote);
                  this.totaldata.push(vote);
                  this.getList();
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
        this.show7 = true;
      },

      getValue(val) {
        this.options = [];
        this.form.type = val;
        if (val === 'PJ001001') {
          this.show = false;
          this.showdata = false;
          this.show7 = false;
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
              _name: this.listjudgement,
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


