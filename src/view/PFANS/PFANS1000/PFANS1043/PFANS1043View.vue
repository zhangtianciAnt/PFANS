<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList" @reget="showData"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="rowid"
    >
      <el-date-picker
        v-model="year"
        type="year"
        slot="customize"
        @change="showData">
      </el-date-picker>
    </EasyNormalTable>

  </div>
</template>
<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';
import {getDictionaryInfo, getUserInfo} from "../../../../utils/customize";
let moment = require('moment');

  export default {
    name: 'PFANS1043View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        year:  parseInt(moment(new Date()).format('MM')) < 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY'),
        loading: false,
        title: 'title.PFANS1043VIEW',
        data: [],
        columns: [
          {
            code: 'number',
            label: 'label.PFANS1043FORMVIEW_NUMBER',
            width: 120,
            fix: false,
            filter: true,
          },
          //theme管理添加列 ztc fr
          // {
          //   code: 'year',
          //   label: 'label.PFANS1043FORMVIEW_YEAR',
          //   width: 140,
          //   fix: false,
          //   filter: true,
          // },
          //theme管理添加列 ztc to
          {
            code: 'themename',
            label: 'label.PFANS1043FORMVIEW_NAME',
            width: 140,
            fix: false,
            filter: true,
          },
          //theme管理添加列 ztc fr
          // 申请人
          {
            code: 'user_id',
            label: 'label.PFANS1043FORMVIEW_USER',
            width: 140,
            fix: false,
            filter: true,
          },
          // 分野
          {
            code: 'divide',
            label: 'label.PFANS1043FORMVIEW_DIVIDE',
            width: 140,
            fix: false,
            filter: true,
          },
          // 委托元
          {
            code: 'toolsorgs',
            label: 'label.PFANS1043FORMVIEW_COMMOIN',
            width: 140,
            fix: false,
            filter: true,
          },
          // 通货种别
          {
            code: 'currency',
            label: 'label.PFANS1043FORMVIEW_CATEGORY',
            width: 140,
            fix: false,
            filter: true,
          },
          //theme管理添加列 ztc to
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'copy', 'name': 'button.copy', 'disabled': false, icon: 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        row: '',
        themename: '',
        //theme管理添加列 ztc fr
        user_id: '',
        divide: '',
        toolsorgs: '',
        currency: '',
        //theme管理添加列 ztc to
        rowid: 'themeinfor_id',
      };
    },
    mounted() {
      //add ztc 添加系统年度 fr
      this.year = this.$store.getters.sysYears;
      //add ztc 添加系统年度 to
      this.getlistname(this.year);
    },
    methods: {
      showData() {
        this.getlistname(moment(this.year).format('YYYY'));
      },
      getlistname(val) {
        let parameters = {
          year: val,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1043Store/getFpans1043List', parameters)
          .then(response => {
            const data = [];
            for (let j = 0; j < response.length; j++) {
              //theme管理添加列 ztc fr
              let user = getUserInfo(response[j].user_id);
              if (user) {
                response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
              }
              if (response[j].divide !== null && response[j].divide !== '') {
                let divide = getDictionaryInfo(response[j].divide);
                if (divide != null) {
                  response[j].divide = divide.value1;
                }
              }
              if (response[j].currency !== null && response[j].currency !== '') {
                let currencyInfo = getDictionaryInfo(response[j].currency);
                if (currencyInfo != null) {
                  response[j].currency = currencyInfo.value1;
                }
              }
              //theme管理添加列 ztc to
              data.push({
                themename: response[j].themename,
                //theme管理添加列 ztc fr
                user_id: response[j].user_id,
                divide: response[j].divide,
                toolsorgs: response[j].toolsorgs,
                currency: response[j].currency,
                // year: response[j].year,
                //theme管理添加列 ztc to
                number: j + 1,
                themeinfor_id: response[j].themeinfor_id,
              });
            }
            this.data = data;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      rowClick(row) {
        this.row = row.themeinfor_id;
        this.themename = row.themename;
        //theme管理添加列 ztc fr
        // this.year = row.year;
        //theme管理添加列 ztc to
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.loading = true;
          this.$store
            .dispatch('PFANS1043Store/getthemename', {'themename': this.themename})
            .then(response => {
              if (response.length > 0) {
                this.$confirm(this.$t('label.PFANS1043FORMVIEW_UODATAMESSAGE'), this.$t('normal.info'),
                  {
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel'),
                    type: 'warning',
                    center: true,
                  },
                ).then(() => {
                  this.$router.push({
                    name: 'PFANS1043FormView',
                    params: {
                      _id: this.row,
                      type: false,
                      disabled: true,
                    },
                  });
                }).catch(() => {
                  this.$message.info({
                    type: 'info',
                    message: this.$t('normal.info_18'),
                  });
                  this.loading = false;
                });
              } else {
                this.$router.push({
                  name: 'PFANS1043FormView',
                  params: {
                    _id: this.row,
                    disabled: true,
                  },
                });
                this.loading = false;
              }
              this.loading = false;
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        } else if (val === 'view') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1043FormView',
            params: {
              _id: this.row,
              disabled: false,
            },
          });
        } else if (val === 'copy') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          } else if (this.year != moment(new Date()).format('YYYY')) {
            Message({
              message: this.$t('label.PFANS1043FORMVIEW_MESSAGE'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$confirm(this.$t('label.PFANS1043FORMVIEW_COPY'), this.$t('normal.info'),
            {
              confirmButtonText: this.$t('button.confirm'),
              cancelButtonText: this.$t('button.cancel'),
              type: 'warning',
              center: true,
            },
          ).then(() => {
            this.$router.push({
              name: 'PFANS1043FormView',
              params: {
                _id: this.row,
                type: true,
                disabled: true,
              },
            });
          }).catch(() => {
            this.$message.info({
              type: 'info',
              message: this.$t('normal.info_18'),
            });
            this.loading = false;
          });

        } else if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1043FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
