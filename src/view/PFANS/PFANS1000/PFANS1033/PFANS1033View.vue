<template>
  <div>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
  </EasyNormalTable>
    <el-container>
      <el-dialog center
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:13vw" v-model="department"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="new_center_id"
                            :error="error_center">
                <org :orglist="form.new_center_id"
                     orgtype="4"
                     style="width: 10vw"
                     @getOrgids="getCenterid"
                     :error="error_center"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
          </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import { Message } from 'element-ui'
    import moment from "moment";
    import {getOrgInfo,getUserInfo,getStatus,getDictionaryInfo} from '@/utils/customize';
    import org from '@/view/components/org';

    export default {
        name: 'PFANS1033View',
        components: {
            EasyNormalTable,
            org
        },
        data() {
          var centerId = (rule, value, callback) => {
            if (!this.form.new_center_id || this.form.new_center_id === '') {
              callback(new Error(this.$t('normal.error_08') + this.$t('label.center')));
              this.error_center = this.$t('normal.error_08') + this.$t('label.center');
            } else {
              callback();
            }
          };
            return {
                loading: false,
                title: "title.PFANS1033VIEW",
                contractnumbercount: '',
                data: [],
              groupid: '',
              department: '',
              maketype: '',
              error_group: '',
              error_center: '',
              rows: {},
              rules: {
                new_center_id: [
                  {
                    required: true,
                    validator: centerId,
                    trigger: 'blur',
                  }
                ],
              },
              form: {
                last_center_id: '',
                last_group_id: '',
                last_team_id: '',
                new_center_id: '',
                new_group_id: '',
                new_team_id: '',
                org: '',
              },
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'deployment',
                        label: 'label.department',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'contractnumber',
                        label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
                      width: 140,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'contracttype',
                        label: 'label.PFANS1024VIEW_CONTRACTTYPE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
 //add-ws-6/16-禅道任务135和057
                  {
                    code: 'entrycondition',
                    label: 'label.PFANS1024VIEW_ENTRYCONDITION',
                    width: 180,
                    fix: false,
                    filter: true,
                  },
//add-ws-6/16-禅道任务135和057
                    {
                        code: 'applicationdate',
                        label: 'label.PFANS1024VIEW_APPLICATIONDATE',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                  // 禅道70 start
                  {
                    code: 'conchinese',
                    label: 'label.PFANS6007VIEW_PJNAME',
                    width: 280,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'custochinese',
                    label: 'label.PFANS1010FORMVIEW_COMPANYNAME',
                    width: 240,
                    fix: false,
                    filter: true,
                  },
                  // 禅道70 end
                    {
                        code: 'state',
                        label: 'label.PFANS1024VIEW_STATE',
                        width: 120,
                        fix: false,
                        filter: true,
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                  {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                contractnumber: '',
                state: '',
                row : 'contractapplication_id ',
              dialogVisible: false
            };
        },
        mounted() {
            this.load();
        },
        methods: {
          load(){
            this.loading = true;
            this.$store
              .dispatch('PFANS1026Store/get',{'type': '2'})
              .then(response => {
                let letcontractnumber = [];
                let tabledata = response.contractapplication;

                for (let i = 0; i < tabledata.length; i++) {
                  //add-ws-6/16-禅道任务135和057
                  if (tabledata[i].entrycondition !== null && tabledata[i].entrycondition !== '') {
                    let letbudge = getDictionaryInfo(tabledata[i].entrycondition);
                    if (letbudge) {
                      tabledata[i].entrycondition = letbudge.value1;
                    }
                  }
                  //add-ws-6/16-禅道任务135和057
                  tabledata[i].status = getStatus(tabledata[i].status);
                  let user = getUserInfo(tabledata[i].user_id);
                  if (user) {
                    tabledata[i].user_id = getUserInfo(tabledata[i].user_id).userinfo.customername;
                  }
                  if (tabledata[i].applicationdate !== null && tabledata[i].applicationdate !== "") {
                    tabledata[i].applicationdate = moment(tabledata[i].applicationdate).format("YYYY-MM-DD");
                  }
                  if (tabledata[i].contracttype !== null && tabledata[i].contracttype !== "") {
                    let letContracttype = getDictionaryInfo(tabledata[i].contracttype);
                    if (letContracttype != null) {
                      tabledata[i].contracttype = letContracttype.value1;
                    }

                  }
                  if(tabledata[i].contractnumber != ""){
                    letcontractnumber.push(tabledata[i].contractnumber);
                  }
                  if(tabledata[i].state === '1' && this.$i18n){
                    tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
                  }else if(tabledata[i].state === '0' && this.$i18n){
                    tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
                  }
                }
                var arr= new Array();
                let o;
                for(var i = 0; i < letcontractnumber.length; i++){
                  if(arr.indexOf(letcontractnumber[i]) == -1){
                    arr.push(letcontractnumber[i]);
                    o = Object.assign([], tabledata[i]);
                    this.data.push(o);
                  }
                }
                this.contractnumbercount = (letcontractnumber.length + 1);
                this.loading = false;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                });
                this.loading = false
              })
          },
            rowClick(row) {
                this.rowid = row.contractapplication_id;
                this.contractnumber = row.contractnumber;
                this.state = row.state;
              this.rows = row;
              this.groupid = row.group_id;
              this.department = row.deployment;
            },
          getCenterid(val){
            this.form.new_center_id = val
          },
          setOrg(val) {
            this.form.org = val;
          },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1033FormView',
                        params: {
                            _id: this.contractnumber,
                            contractnumbercount: this.contractnumbercount,
                            state: this.state,
                            disabled: true
                        }
                    })
                }
              if(val === 'carryforward'){
                if (this.rowid === '') {
                  Message({
                    message: this.$t('normal.info_01'),
                    type: 'info',
                    duration: 2 * 1000,
                  });
                  return;
                }
                this.dialogVisible = true;
              }
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1033FormView',
                        params: {
                            _id: this.contractnumber,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1033FormView',
                        params: {
                            _id: '',
                            contractnumbercount: this.contractnumbercount,
                            disabled: true
                        }
                    })
                }
            },
          submit(){
            this.loading = true;
            this.$refs['form'].validate(valid =>{
              if(valid){
                let parameter = {
                  group_id: this.form.new_center_id,
                  contractapplication_id:this.rowid,
                };
                this.$store
                  .dispatch('PFANS1026Store/dataCarryover', parameter)
                  .then(response => {
                    this.load();
                    Message({
                      message: this.$t('normal.success_07'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.dialogVisible = false;
                    this.form.new_center_id= '';
                    // this.form.new_group_id='';
                    // this.form.new_team_id= '';
                  })
              }else{
                Message({
                  message: this.$t('normal.error_12'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              }
            });
            this.loading = false;
          }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
