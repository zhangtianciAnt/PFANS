<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" @disabled="setdisabled">
      <div slot="customize">
        <el-form ref="refform" :model="form" :rules="rules" label-position="top" label-width="8vw"
                 style="padding: 3vw">
          <el-row>
            <!--1-->
            <!--            <el-col :span="8">-->
            <!--              <el-form-item :label="$t('label.PFANS6007VIEW_PJNAME')" prop="pjname">-->
            <!--                <el-select v-model="form.pjname" style="width:20vw" placeholder="请选择" @change="changeOption">-->
            <!--                  <el-option-->
            <!--                    v-for="(item,index) in options1"-->
            <!--                    :key="index"-->
            <!--                    :label="item.project_name"-->
            <!--                    :value="item.project_name">-->
            <!--                  </el-option>-->
            <!--                </el-select>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_BPPLAYER')" prop="bpplayer">
                <!--                <el-select :disabled="!disabled" style="width:20vw" v-model="form.bpplayer">-->
                <!--                  <el-option-->
                <!--                    :key="item.value"-->
                <!--                    :label="item.lable"-->
                <!--                    :value="item.value"-->
                <!--                    v-for="item in gridDatabpplayer">-->
                <!--                  </el-option>-->
                <!--                </el-select>-->
                <div class="dpSupIndex" prop="bpplayer" style="width: 20vw">
                  <el-container>
                    <input v-model="form.bpplayer" :disabled="true"
                           class="content bg"></input>

                    <el-button :disabled="!disabled" icon="el-icon-search" size="small"
                               @click="dialogTableVisible = true"></el-button>
                    <el-dialog :title="$t('label.PFANS6007VIEW_BPPLAYER')" :visible.sync="dialogTableVisible" append-to-body
                               center
                               lock-scroll size="50%"
                               top="8vh">
                      <div style="text-align: center">
                        <el-row style="text-align: center;height: 90%;overflow: hidden">
                          <el-table
                            :data="gridDatabpplayer.filter(data => !search || data.expname.toLowerCase().includes(search.toLowerCase()))"
                            height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                            @row-click="handleClickChange">
                            <el-table-column :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')" property="suppliername"
                                             width="180"></el-table-column>
                            <el-table-column :label="$t('label.user_name')"
                                             property="expname"
                                             width="100"></el-table-column>
                            <el-table-column v-if="false"
                                             property="account" width="0"></el-table-column>
                            <el-table-column v-if="false"
                                             property="group_id1" width="0"></el-table-column>
                            <el-table-column :label="$t('label.PFANS5001FORMVIEW_DEPARTMENTID')"
                                             property="group_id"
                                             width="150"></el-table-column>
                            <el-table-column
                              align="right" width="230">
                              <template slot="header" slot-scope="scope">
                                <el-input
                                  v-model="search"
                                  placeholder="请输入关键字搜索"
                                  size="mini"/>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-row>
                        <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{ $t('button.confirm') }}</el-button>
                        </span>
                      </div>
                    </el-dialog>
                  </el-container>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_BPCLUBNAME')" prop="bpclubname">
                <el-input v-model="form.bpclubname" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PJNAME')" prop="pjname">
                <el-select v-model="form.pjname" :disabled="!disabled" style="width:20vw" @change="changeOption">
                  <el-option
                    v-for="item in gridData"
                    :key="item.code"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--2-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')">
                <!--                NT_PFANS_20210304_BUG_049 限制最大长度为8-->
                <el-input v-model="form.psdcdwindow" :disabled="!disabled" maxlength="8" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2023VIEW_YEARS')" prop="year">
                <el-date-picker
                  v-model="form.year"
                  :disabled="!disabled"
                  style="width:20vw"
                  type="year"
                  @change="getYear">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PLMONTHPLAN')" prop="plmonthplan">
                <dicselect
                  :code="code2"
                  :data="form.plmonthplan"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getPlmonthplan">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--4-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_TYPEOFFEES')" prop="typeoffees">
                <dicselect
                  :code="code3"
                  :data="form.typeoffees"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getTypeoffees">
                </dicselect>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PAYMENT')" prop="payment">
                <!--<el-input :disabled="!disabled" style="width:20vw" v-model="form.payment"></el-input>-->
                <el-input-number
                  v-model="form.payment"
                  :disabled="!disabled"
                  :max="100000000"
                  :min="-100000000"
                  :precision="2" controls-position="right"
                  style="width:20vw"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS6007VIEW_REMARKS')">
                <el-input v-model="form.remarks" :disabled="!disabled" :rows="2" maxlength="200"
                          style="width: 72vw" type="textarea"></el-input>
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
import PFANS6007View from '../PFANS6007/PFANS6007View.vue';
import dicselect from '../../../components/dicselect.vue';
import {Message} from 'element-ui';
import moment from 'moment';
import {valfloat} from '@/utils/validate';
import {getOrgInfo, getUserInfo} from '@/utils/customize';

export default {
  name: 'PFANS6007FormView',
  components: {
    EasyNormalContainer,
    PFANS6007View,
    dicselect,
  },
  data() {
    var checkpjname = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        this.error_pjname = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PJNAME');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PJNAME')));
      } else {
        this.error_pjname = '';
        return callback();
      }
    };
    var checkbpplayer = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        this.error_bpplayer = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_BPPLAYER');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_BPPLAYER')));
      } else {
        this.error_bpplayer = '';
        return callback();
      }
    };
    var checkyear = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        this.error_year = this.$t('normal.error_09') + this.$t('label.PFANS2007VIEW_YEAR');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2007VIEW_YEAR')));
      } else {
        this.error_year = '';
        return callback();
      }
    };
    var checkplmonthplan = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        this.error_plmonthplan = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PLMONTHPLAN');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PLMONTHPLAN')));
      } else {
        this.error_plmonthplan = '';
        return callback();
      }
    };
    var checktypeoffees = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        this.error_typeoffees = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_TYPEOFFEES');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_TYPEOFFEES')));
      } else {
        this.error_typeoffees = '';
        return callback();
      }
    };
    var checkpayment = (rule, value, callback) => {
      if (this.form.payment !== null && this.form.payment !== '') {
        if (valfloat(value) && value != 0) {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.effective') + this.$t('label.PFANS6007VIEW_PAYMENT')));
        }
      } else {
        this.error_typeoffees = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PAYMENT');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PAYMENT')));
      }
    };
    return {
      options1: [],
      loading: false,
      error_pjname: '',
      error_bpclubname: '',
      error_bpplayer: '',
      error_year: '',
      error_plmonthplan: '',
      error_typeoffees: '',
      error_payment: '',
      selectType: 'Single',
      title: 'title.PFANS6007VIEW_TITLE',
      buttonList: [],
      search: '',
      gridData: [],
      gridDatabpplayer: [],
      multiple: false,
      form: {
        variousfunds_id: '',
        pjname: '',
        psdcdwindow: '',
        bpclubname: '',
        bpplayer: '',
        plmonthplan: '',
        typeoffees: '',
        payment: '',
        remarks: '',
        year: '',
        groupid: '',
      },
      code2: 'BP013',
      code3: 'BP014',
      dialogTableVisible: false,
      rules: {
        pjname: [
          {
            required: true,
            validator: checkpjname,
            trigger: 'change',
          },
        ],
        bpplayer: [
          {
            required: true,
            validator: checkbpplayer,
            trigger: 'change',
          },
        ],
        year: [
          {
            required: true,
            validator: checkyear,
            trigger: 'change',
          },
        ],
        plmonthplan: [
          {
            required: true,
            validator: checkplmonthplan,
            trigger: 'change',
          },
        ],
        typeoffees: [
          {
            required: true,
            validator: checktypeoffees,
            trigger: 'change',
          },
        ],
        payment: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS6007VIEW_PAYMENT'),
            trigger: 'change',
          },
        ],
      },
    };
  },
  mounted() {
    //this.getbpplayerList();
    this.loading = true;
    this.$store
      .dispatch('PFANS6004Store/getexpatriatesinfor')
      .then(response => {

        this.gridDatabpplayer = [];
        //response = response.filter(item => item.result === 'BP003001');
        for (let i = 0; i < response.length; i++) {
          var vote = {};
          vote.suppliername = response[i].suppliername;
          vote.expname = response[i].expname;
          vote.account = response[i].account;
          vote.group_id1 = response[i].group_id;
          if (response[i].group_id !== null && response[i].group_id !== '') {
            let group = getOrgInfo(response[i].group_id);
            if (group) {
              vote.group_id = group.companyname;
            }
          }
          this.gridDatabpplayer.push(vote);
        }
        this.loading = false;
        if (this.$route.params._id) {//查看详情
          this.loading = true;
          let number = '';
          this.$store
            .dispatch('PFANS6007Store/getvariousfundsApplyOne', {'variousfunds_id': this.$route.params._id})
            .then(response => {

              this.form = response;
              for (let i = 0; i < this.gridDatabpplayer.length; i++) {
                if (this.gridDatabpplayer[i].expname === this.form.bpplayer) {
                  number = this.gridDatabpplayer[i].account;
                }
              }
              this.loading = false;
              this.$store
                .dispatch('PFANS6007Store/getPjnameList6007', {'bpplayer': number})
                .then(response => {
                  this.gridData = [];
                  for (let i = 0; i < response.length; i++) {
                    var vote = {};
                    vote.code = response[i].numbers;
                    vote.value = response[i].numbers + '_' + response[i].project_name;
                    this.gridData.push(vote);
                  }
                  this.loading = false;
                });
            });
        }
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
  created() {
    this.disabled = this.$route.params.disabled;
    if (this.disabled) {
      this.buttonList = [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ];
    }
  },
  methods: {
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disabled = val;
      }
    },
    getbpplayerList() {
      this.$store
        .dispatch('PFANS6004Store/getexpatriatesinfor')
        .then(response => {
          //response = response.filter(item => item.result === 'BP003001');
          this.gridDatabpplayer = [];
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            vote.suppliername = response[i].suppliername;
            vote.expname = response[i].expname;
            vote.account = response[i].account;
            if (response[i].group_id !== null && response[i].group_id !== '') {
              let group = getOrgInfo(response[i].group_id);
              if (group) {
                vote.group_id = group.companyname;
              }
            }
            this.gridDatabpplayer.push(vote);
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
    },
    getPjnameList(val) {
      this.loading = true;
      let id = val;
      this.$store
        .dispatch('PFANS6007Store/getPjnameList6007', {'bpplayer': id})
        .then(response => {
          this.gridData = [];
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            vote.code = response[i].numbers;
            vote.value = response[i].numbers + '_' + response[i].project_name;
            this.gridData.push(vote);
          }
          this.form.pjname = '';
          this.form.psdcdwindow = '';
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
    changeOption(val) {
      //this.form.pjname = val;
      this.loading = true;
      let number = '';
      for (let i = 0; i < this.gridData.length; i++) {
        if (this.gridData[i].value === val) {
          number = this.gridData[i].code;
        }
      }
      this.loading = true;
      let params = {
        numbers: number,
      };
      this.$store
        .dispatch('PFANS6007Store/listPsdcd', params)
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            let leaderid = response[j].leaderid;
            if (leaderid) {
              let userinfo = getUserInfo(leaderid);
              if (userinfo) {
                this.form.psdcdwindow = userinfo.userinfo.customername;
              }
            }
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
    },

    getYear(val) {
      this.form.year = val;
    },

    handleClickChange(val) {
      this.currentRow = val.expname;
      this.currentRow1 = val.suppliername;
      this.currentRow2 = val.account;
      this.currentRow3 = val.group_id1;
    },
    submit() {
      let lst = this.currentRow;
      let lst1 = this.currentRow1;
      let lst2 = this.currentRow2;
      let lst3 = this.currentRow3;
      this.dialogTableVisible = false;
      this.form.bpplayer = lst;
      this.form.bpclubname = lst1;
      this.form.groupid = lst3;
      this.$refs.refform.validateField('bpplayer');
      this.getPjnameList(lst2);
    },
    getPlmonthplan(val) {
      this.form.plmonthplan = val;
    },
    getTypeoffees(val) {
      this.form.typeoffees = val;
    },

    buttonClick(val) {
      this.$refs['refform'].validate(valid => {
        if (valid) {
          this.form.variousfunds_id = this.$route.params._id;
          this.form.year = moment(this.form.year).format('YYYY-MM-DD');
          this.loading = true;
          if (this.$route.params._id) {
            this.$store
              .dispatch('PFANS6007Store/updatevariousfundsApply', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                if (val !== 'update') {
                  Message({
                    message: this.$t('normal.success_02'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                }
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          } else {
            this.form.year = moment(this.form.year).format('YYYY-MM-DD');
            this.loading = true;
            this.$store
              .dispatch('PFANS6007Store/createvariousfundsApply', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                if (this.$store.getters.historyUrl) {
                  this.$router.push(this.$store.getters.historyUrl);
                }
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          }
        } else {
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.dpSupIndex {
  .content {
    height: 34px;
    min-width: 80%;
    border: 0.1rem solid #ebeef5;
    overflow-y: scroll;
    overflow-x: hidden;
    line-height: 34px;
    padding: 0.1rem 0.5rem 0.2rem 0.5rem;
  }

  .bg {
    background: white;
    border-width: 1px;
  }

  .content {
    height: 34px;
    min-width: 80%;
    border: 0.1rem solid #ebeef5;
    overflow-y: scroll;
    overflow-x: hidden;
    line-height: 34px;
    padding: 0.1rem 0.5rem 0.2rem 0.5rem;
  }

  .bg {
    background: white;
    border-width: 1px;
  }
}

</style>
