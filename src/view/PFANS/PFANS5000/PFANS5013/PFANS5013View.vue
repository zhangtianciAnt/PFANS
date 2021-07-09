<template>
  <div>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
    <el-container>
      <el-dialog center
                 :visible.sync="dialogVisible"
                 :title="$t('button.carryforward')"
                 width="50%">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 0.1vw;margin-top: -2vw">
          <el-row>
            <div style=
                   "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_OLDORGANIZATION')}}</div>
          </el-row>
          <el-row>
            <el-col :span="8" style="margin-left: 0.5vw">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:15vw" v-model="centername"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:15vw" v-model="groupname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:15vw" v-model="teamname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style=
                   "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_NEWORGANIZATION')}}</div>
          </el-row>
          <el-row>
            <el-col :span="8" style="margin-left: 0.5vw; margin-bottom: -1vw;">
              <el-form-item :label="$t('label.center')" prop="new_center_id"
                            :error="error_center">
                <org :orglist="form.new_center_id"
                     orgtype="1"
                     style="width: 14vw"
                     @getOrgids="getCenterid"
                     :error="error_center"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 0.5vw; margin-bottom: -1vw;">
              <el-form-item :label="$t('label.group')" prop="new_group_id"
                            :error="error_group">
                <org :orglist="form.new_group_id"
                     orgtype="2"
                     style="width: 14vw"
                     @getOrgids="getGroupid"
                     :error="error_group"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="margin-left: 0.5vw; margin-bottom: -1vw;">
              <el-form-item :label="$t('label.team')">
                <org :orglist="form.new_team_id"
                     orgtype="3"
                     style="width: 14vw"
                     @getOrgids="getTeamid"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
          </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getDictionaryInfo, getStatus, getUserInfo, getOrgInfo} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from "moment";
    import org from '@/view/components/org';

    export default {
        name: 'PFANS5001View',
        components: {
            EasyNormalTable,
            org,
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
                title: "title.PFANS5013View",
                // 表格数据源
                data: [],
              error_group: '',
              error_center: '',
              rows: {},
              centername: '',
              groupname: '',
              teamname: '',
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
                // 列属性
                columns: [
                    // {
                    //     code: 'numbers',
                    //     label: 'label.PFANS5009VIEW_PROJECTNO',
                    //     width: 110,
                    //     fix: false,
                    //     filter: true,
                    // },
                  {
                    code: 'numbers',
                    label: 'label.PFANS5009VIEW_PROJECTNO',
                    width: 110,
                    fix: false,
                    filter: false,
                  },
                    {
                        code: 'project_name',
                        label: 'label.PFANS5001FORMVIEW_PROJECT_NAME',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    // {
                    //     code: 'createby',
                    //     label: 'label.applicant',
                    //     width: 150,
                    //     fix: false,
                    //     filter: true
                    // },
                    {
                        code: 'projecttype',
                        label: 'label.PFANS5001FORMVIEW_PROJECTTYPE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'leaderid',
                        label: 'label.PFANS5001FORMVIEW_LEADERID',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'startdate',
                        label: 'label.PFANS5001FORMVIEW_STARTDATE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'enddate',
                        label: 'label.PFANS5001FORMVIEW_ENDDATE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    // {
                    //     code: 'createon',
                    //     label: 'label.PFANS2001VIEW_APPLICATIONTIME',
                    //     width: 150,
                    //     fix: false,
                    //     filter: true
                    // },
                    {
                        code: 'status',
                        label: 'label.PFANS5005VIEW_STATUS',
                        width: 150,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                  {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                  {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                  {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                ],
                rowid: '',
              mounth: '',
              date: '',
                row:'comproject_id',
              dialogVisible: false,
            };
        },
        mounted() {
            this.load();
          this.getdate();
        },
        methods: {
          getdate(){
            this.mounth = new Date().getMonth() + 1;
            this.date = new Date().getDate();
            if(this.mounth === 4 && this.date >= 10 && this.date <= 30){
              this.buttonList = [
                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
              ]
            } else {
              this.buttonList = [
                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
              ]
            }
          },
            rowClick(row) {
                this.rowid = row.comproject_id;
                this.rows = row;
            },
          getCenterid(val){
            this.form.new_center_id = val
            this.getOrgInformation(val);
            if (!val || this.form.new_center_id === '') {
              this.error_center = this.$t('normal.error_08') + 'center';
            } else {
              this.error_center = '';
            }
          },
          getGroupid(val){
            this.form.new_group_id = val
            this.getOrgInformation(val);
          },
          getTeamid(val){
            this.form.new_team_id = val
            this.getOrgInformation(val);
          },
          setOrg(val) {
            this.form.org = val;
          },
          getOrgInformation(id) {
            let org = {};
            let treeCom = this.$store.getters.orgs;
            if (id && treeCom.getNode(id)) {
              let node = id;
              let type = treeCom.getNode(id).data.type || 0;
              for (let index = parseInt(type); index >= 1; index--) {
                if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
                  org.teamname = treeCom.getNode(node).data.departmentname;
                  org.team_id = treeCom.getNode(node).data._id;
                }
                if (index === 2) {
                  org.groupname = treeCom.getNode(node).data.departmentname;
                  org.group_id = treeCom.getNode(node).data._id;
                }
                if (index === 1) {
                  org.centername = treeCom.getNode(node).data.companyname;
                  org.center_id = treeCom.getNode(node).data._id;
                }
                node = treeCom.getNode(node).parent.data._id;
              }
              ({
                centername: this.form.centername,
                groupname: this.form.groupname,
                teamname: this.form.teamname,
                center_id: this.form.new_center_id,
                group_id: this.form.new_group_id,
                team_id: this.form.new_team_id,
              } = org);
            }
          },
          load(){
            this.loading = true;
            this.$store
              .dispatch('PFANS5013Store/getFpans5013List', {})
              //根据user_id取组织架构和user_name
              .then(response => {
                for (let j = 0; j < response.length; j++) {
                  if(response[j].createby !== null && response[j].createby !== "") {
                    let user = getUserInfo(response[j].createby);
                    if (user) {
                      response[j].createby = user.userinfo.customername;
                    }
                  }
                  //项目负责人
                  if(response[j].leaderid !== null && response[j].leaderid !== "") {
                    let user = getUserInfo(response[j].leaderid);
                    if (user) {
                      response[j].leaderid = user.userinfo.customername;
                    }
                  }
                  //项目类型
                  if (response[j].projecttype !== null && response[j].projecttype !== "") {
                    let letStage = getDictionaryInfo(response[j].projecttype);
                    if (letStage != null) {
                      response[j].projecttype = letStage.value1;
                    }
                  }
                  //状态
                  response[j] .status = getStatus(response[j] .status);
                  // 开始时间
                  if (response[j].startdate !== null && response[j].startdate !== "") {
                    response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
                  }
                  //预计完成时间
                  if (response[j].enddate !== null && response[j].enddate !== "") {
                    response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
                  }
                  //申请时间
                  if (response[j].createon !== null && response[j].createon !== "") {
                    response[j].createon = moment(response[j].createon).format("YYYY-MM-DD");
                  }
                }
                this.data = response;
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
          submit(){
            this.loading = true;
            this.$refs['form'].validate(valid =>{
              if(valid){
                let parameter = {
                  center_id: this.form.new_center_id,
                  group_id: this.form.new_group_id,
                  team_id:this.form.new_team_id,
                  comproject_id:this.rowid,
                };
                console.log(parameter)
                this.$store
                  .dispatch('PFANS5013Store/dataCarryover', parameter)
                  .then(response => {
                      this.load();
                    Message({
                      message: this.$t('normal.success_07'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.dialogVisible = false;
                    this.form.new_center_id= '';
                    this.form.new_group_id='';
                    this.form.new_team_id= '';
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
          },
            //点击上部按钮处理
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
                        name: 'PFANS5013FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS5013FormView',
                        params: {
                            _id: "",
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
                this.form.new_center_id= '';
                this.form.new_group_id='';
                this.form.new_team_id= '';
                let center = getOrgInfo(this.rows.center_id);
                if(center){
                  this.centername = center.companyname;
                }
                let group = getOrgInfo(this.rows.group_id);
                if(group){
                  this.groupname = group.companyname;
                }
                let team = getOrgInfo(this.rows.team_id);
                if(team){
                  this.teamname = team.companyname;
                }
              }
                if (val === 'edit') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS5013FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
