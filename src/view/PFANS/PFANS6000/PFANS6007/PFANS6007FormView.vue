<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
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
              <el-form-item :error="error_pjname" :label="$t('label.PFANS6007VIEW_PJNAME')"
                            prop="pjname">
                <div class="dpSupIndex" style="width: 20vw" prop="pjname">
                  <el-container>
                    <input class="content bg" v-model="form.pjname" :error="error_pjname"
                           :disabled="true"></input>
                    <el-button :disabled="!disabled" icon="el-icon-search" @click="dialogTableVisible = true"
                               size="small"></el-button>
                    <el-dialog :title="$t('label.PFANS6007VIEW_PJNAME')" :visible.sync="dialogTableVisible" center
                               size="50%"
                               top="8vh" lock-scroll
                               append-to-body>
                      <div style="text-align: center">
                        <el-row style="text-align: center;height: 90%;overflow: hidden">
                          <el-table
                            :data="gridData.filter(data => !search || data.pjname.toLowerCase().includes(search.toLowerCase()))"
                            height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                            @row-click="handleClickChange">
                            <el-table-column property="pjname" :label="$t('label.PFANS6007VIEW_PJNAME')"
                                             width="150"></el-table-column>
                            <el-table-column property="psdcdwindow" :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')"
                                             width="120"></el-table-column>
                            <el-table-column property="bpclubname"
                                             :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                                             width="150"></el-table-column>
                            <el-table-column property="bpplayer"
                                             :label="$t('label.PFANS6007VIEW_BPPLAYER')"
                                             width="120"></el-table-column>
                            <el-table-column
                              align="right" width="230">
                              <template slot="header" slot-scope="scope">
                                <el-input
                                  v-model="search"
                                  size="mini"
                                  placeholder="请输入供应商关键字搜索"/>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-row>
                        <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                      </div>
                    </el-dialog>
                  </el-container>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')">
                <el-input :disabled="true" style="width:20vw" v-model="form.psdcdwindow"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_BPCLUBNAME')" prop="bpclubname">
                <el-input :disabled="true" style="width:20vw" v-model="form.bpclubname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--2-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_BPPLAYER')">
                <el-input :disabled="true" style="width:20vw" v-model="form.bpplayer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2023VIEW_YEARS')" prop="year">
                <el-date-picker
                  :disabled="!disabled"
                  @change="getYear"
                  style="width:20vw"
                  type="year"
                  v-model="form.year">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PLMONTHPLAN')" prop="plmonthplan">
                <dicselect
                  :disabled="!disabled"
                  :code="code2"
                  :data="form.plmonthplan"
                  :multiple="multiple"
                  @change="getPlmonthplan"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--4-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_TYPEOFFEES')" prop="typeoffees">
                <dicselect
                  :disabled="!disabled"
                  :code="code3"
                  :data="form.typeoffees"
                  :multiple="multiple"
                  @change="getTypeoffees"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PAYMENT')" prop="payment">
                <!--<el-input :disabled="!disabled" style="width:20vw" v-model="form.payment"></el-input>-->
                <el-input-number
                  v-model="form.payment"
                  controls-position="right"
                  style="width:20vw"
                  :disabled="!disabled"
                  :min="0" :max="1000000000"
                  :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS6007VIEW_REMARKS')">
                <el-input :disabled="!disabled" :rows="2" style="width: 72vw" type="textarea"
                          v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import PFANS6007View from "../PFANS6007/PFANS6007View.vue";
  import dicselect from "../../../components/dicselect.vue";
  import {Message} from 'element-ui'
  import moment from "moment";
  import {valfloat} from '@/utils/validate';
  import {getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS6007FormView',
    components: {
      EasyNormalContainer,
      PFANS6007View,
      dicselect
    },
    data() {
      var checkpjname = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_pjname = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PJNAME');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PJNAME')));
        } else {
          this.error_pjname = "";
          return callback();
        }
      };
      var checkbpclubname = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_bpclubname = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_BPCLUBNAME');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_BPCLUBNAME')));
        } else {
          this.error_bpclubname = "";
          return callback();
        }
      };
      var checkyear = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_year = this.$t('normal.error_09') + this.$t('label.PFANS2007VIEW_YEAR');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2007VIEW_YEAR')));
        } else {
          this.error_year = "";
          return callback();
        }
      };
      var checkplmonthplan = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_plmonthplan = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PLMONTHPLAN');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PLMONTHPLAN')));
        } else {
          this.error_plmonthplan = "";
          return callback();
        }
      };
      var checktypeoffees = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_typeoffees = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_TYPEOFFEES');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_TYPEOFFEES')));
        } else {
          this.error_typeoffees = "";
          return callback();
        }
      };
      var checkpayment = (rule, value, callback) => {
        if (this.form.payment !== null && this.form.payment !== '') {
          if (valfloat(value)) {
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
        error_year: '',
        error_plmonthplan: '',
        error_typeoffees: '',
        error_payment: '',
        selectType: "Single",
        title: "title.PFANS6007VIEW_TITLE",
        buttonList: [],
        search: '',
        gridData: [],
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
        },
        code2: 'BP013',
        code3: 'BP014',
        dialogTableVisible: false,
        rules: {
          pjname: [
            {
              required: true,
              validator: checkpjname,
              trigger: 'change'
            },
          ],
          bpclubname: [
            {
              required: true,
              validator: checkbpclubname,
              trigger: 'change'
            },
          ],
          year: [
            {
              required: true,
              validator: checkyear,
              trigger: 'change'
            },
          ],
          plmonthplan: [
            {
              required: true,
              validator: checkplmonthplan,
              trigger: 'change'
            },
          ],
          typeoffees: [
            {
              required: true,
              validator: checktypeoffees,
              trigger: 'change'
            },
          ],
          payment: [
            {
              required: true,
              validator: checkpayment,
              trigger: 'change'
            },
          ]
        },
      };
    },
    mounted() {
      this.getPjnameList();
      if (this.$route.params._id) {//查看详情
        this.loading = true;
        this.$store
          .dispatch('PFANS6007Store/getvariousfundsApplyOne', {"variousfunds_id": this.$route.params._id})
          .then(response => {
            this.form = response;
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
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    methods: {
      getPjnameList() {
        this.$store
          .dispatch('PFANS6007Store/getPjnameList', {})
          .then(response => {
            console.log(response)
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              this.gridData = [];
              for (let i = 0; i < response.length; i++) {
                let vote = {};
                vote.pjname = response[i].project_name;
                if (response[i].managerid !== null && response[i].managerid !== '') {
                  let user = getUserInfo(response[i].managerid);
                  if (user) {
                    vote.psdcdwindow = user.userinfo.customername;
                  }
                }
                vote.bpclubname = response[i].entrust;
                vote.bpplayer = response[i].deployment;
                this.gridData.push(vote);
              }
            }
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      changeOption(val) {
        for (let i = 0; i < this.options1.length; i++) {
          if (this.options1[i].project_name === val) {
            this.form.psdcdwindow = this.options1[i].username;
            this.form.bpclubname = this.options1[i].bpclubname;
            this.form.bpplayer = this.options1[i].bpplayer;
          }
        }
      },
      getYear(val) {
        this.form.year = val;
      },
      handleClickChange(val) {
        this.currentRow = val.pjname;
        this.currentRow1 = val.psdcdwindow;
        this.currentRow2 = val.bpclubname;
        this.currentRow3 = val.bpplayer;
      },
      submit() {
        let lst = this.currentRow;
        let lst1 = this.currentRow1;
        let lst2 = this.currentRow2;
        let lst3 = this.currentRow3;
        this.dialogTableVisible = false;
        this.form.pjname = lst;
        this.form.psdcdwindow = lst1;
        this.form.bpclubname = lst2;
        this.form.bpplayer = lst3;
      },
      getPlmonthplan(val) {
        this.form.plmonthplan = val;
      },
      getTypeoffees(val) {
        this.form.typeoffees = val;
      },

      buttonClick(val) {
        this.$refs["refform"].validate(valid => {
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
                  if (val !== "update") {
                    Message({
                      message: this.$t("normal.success_02"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                .catch(error => {
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                  });
                  this.loading = false;
                })
            } else {
              this.form.year = moment(this.form.year).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS6007Store/createvariousfundsApply', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t("normal.success_01"),
                    type: 'success',
                    duration: 5 * 1000
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                })
                .catch(error => {
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                  });
                  this.loading = false;
                })
            }
          }
          else{
              Message({
                  message: this.$t("normal.error_12"),
                  type: 'error',
                  duration: 5 * 1000
              });
          }
        })
      }
    }
  }
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
