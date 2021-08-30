<template>
  <div>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
<!--   add-lyt-2021/4/4-添加年份检索栏-start-->
    <el-date-picker
      v-model="yearvalue"
      type="year"
      @change="changed"
      slot="customize"
      placeholder="选择年">
    </el-date-picker>
<!--    add-lyt-2021/4/4-添加年份检索栏-end-->
  </EasyNormalTable>
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
              <el-input :disabled="true" style="width: 15vw" v-model="form.last_center_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.group')">
              <el-input :disabled="true" style="width: 15vw" v-model="form.last_group_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('label.team')">
              <el-input :disabled="true" style="width: 15vw" v-model="form.last_team_id"></el-input>
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
                   style="width: 13vw"
                   @getOrgids="getCenterid"
                   :error="error_center"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-bottom: -1vw;">
            <el-form-item :label="$t('label.group')" prop="new_group_id"
                          :error="error_group">
              <org :orglist="form.new_group_id"
                   orgtype="2"
                   style="width: 13vw"
                   @getOrgids="getGroupid"
                   :error="error_group"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="7" style="margin-bottom: -1vw;">
            <el-form-item :label="$t('label.team')">
              <org :orglist="form.new_team_id"
                   orgtype="3"
                   style="width: 13.5vw"
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
  </div>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import org from '@/view/components/org';
  import {getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo,getDepartmentById} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from "moment";

  export default {
    name: 'PFANS2023View',
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
        rules: {
          new_center_id: [
            {
              required: true,
              validator: centerId,
              trigger: 'blur',
            }
          ],
          // new_group_id: [
          //   {
          //     required: true,
          //     validator: groupId,
          //     trigger: 'blur',
          //   }
          // ],
          // new_team_id: [
          //   {
          //     required: true,
          //     validator: teamId,
          //     trigger: 'blur',
          //   }
          // ],
        },
        form: {
          centername: '',
          groupname: '',
          teamname: '',
          last_center_id: '',
          last_group_id: '',
          last_team_id: '',
          new_center_id: '',
          new_group_id: '',
          new_team_id: '',
          org: '',
        },
        dialogVisible: false,
        loading: false,
        title: "title.PFANS2023VIEW",
        // 表格数据源
        data: [],
        rowInfo: [],
        error_group: '',
        error_center: '',
        // add-lyt-2021/4/4-添加年份检索栏-start
        yearvalue: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format("YYYY") : moment(new Date()).format('YYYY'),
        // add-lyt-2021/4/4-添加年份检索栏-end
        // 列属性
        columns: [
          {
            code: 'years',
            label: 'label.PFANS2023VIEW_YEARS',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'user_name',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'stage',
            label: 'label.PFANS2023VIEW_STAGE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.PFANS2023VIEW_COMPLETIONSTATUS',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'createon',
            label: 'label.PFANS2023VIEW_MAKINGTIME',
            width: 120,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          // add-ccm  数据转结 fr
          // {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
          // add-ccm  数据转结 to
        ],
        rowid: '',
        row: 'goalmanagement_id',
        mounth: '',
        date: '',
      };
    },
    mounted() {
      this.getList();
      this.getdate();
    },
    methods: {
      // getCenterid(val){
      //   this.form.new_center_id = val
      // },
      // getGroupid(val){
      //   this.form.new_group_id = val
      // },
      // getTeamid(val){
      //   this.form.new_team_id = val
      // },
      getCenterid(val) {
        this.form.new_center_id = val;
        this.getOrgInformation(val);
        if (!val || this.form.new_center_id === '') {
          this.error_center = this.$t('normal.error_08') + 'center';
        } else {
          this.error_center = '';
        }
      },
      getGroupid(val) {
        this.form.new_group_id = val;
        this.getOrgInformation(val);
      },
      getTeamid(val) {
        this.form.new_team_id = val;
        this.getOrgInformation(val);
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
      setOrg(val) {
        this.form.org = val;
      },
      getList(){
        this.loading = true;
        //gbb 禅道 609 2.0-目标管理增加按钮控制是都可填写 20201211
        this.getCurrentRole2();
        this.$store
        // add-lyt-2021/4/4-添加年份检索栏-start
          .dispatch('PFANS2023Store/getFpans2023List', {'years': this.yearvalue})
          // add-lyt-2021/4/4-添加年份检索栏-end
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].user_id !== null && response[j].user_id !== "") {
                response[j].center_name = getDepartmentById(response[j].center_id);
                response[j].group_name = getDepartmentById(response[j].group_id);
                response[j].team_name = getDepartmentById(response[j].team_id);
                let user = getUserInfo(response[j].user_id);
                if (user) {
                  response[j].user_name = user.userinfo.customername;
                }
              }
              response[j].status = getStatus(response[j].status);
              if (response[j].createon !== null && response[j].createon !== "") {
                response[j].createon = moment(response[j].createon).format("YYYY-MM-DD");
              }
              if (response[j].stage !== null && response[j].stage !== "") {
                let letStage = getDictionaryInfo(response[j].stage);
                if (letStage != null) {
                  response[j].stage = letStage.value1;
                }
              }
              if (this.$i18n) {
                if (response[j].stage !== null && response[j].stage !== "") {
                  if (response[j].stage == '0') {
                    response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSYEAR');
                  } else if (response[j].stage == '1') {
                    response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSSEP');
                  } else if (response[j].stage == '2') {
                    response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSDEC');
                  } else if (response[j].stage == '3') {
                    response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSMAR');
                  }
                }
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
              goalmanagement_id:this.rowid,
            };
            this.$store
              .dispatch('PFANS2023Store/change', parameter)
              .then(response => {
                // this.data = response;
                this.getList();
                this.form.new_center_id = '';
                this.form.new_group_id = '';
                this.form.new_team_id = '';
                Message({
                  message: this.$t('normal.success_07'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.dialogVisible = false;
                this.form.new_center_id = '' ;
                this.form.new_group_id = '' ;
                this.form.new_team_id = '' ;
                this.rowid = '';
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
      //add    数据转结按钮显示  from
      getdate(){
        this.mounth = new Date().getMonth() + 1;
        this.date = new Date().getDate();
        if(this.mounth === 4 && this.date >= 10 && this.date <= 30){
          this.buttonList = [
            {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
            {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
            {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
            {'key': 'open', 'name': 'button.open1', 'disabled': true,},
            {'key': 'close', 'name': 'button.close1', 'disabled': false,},
            // add-ccm  数据转结 fr
            {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
            // add-ccm  数据转结 to
          ]
        } else {
          this.buttonList = [
            {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
            {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
            {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
            {'key': 'open', 'name': 'button.open1', 'disabled': true,},
            {'key': 'close', 'name': 'button.close1', 'disabled': false,}
          ]
        }
      },
      //add    数据转结按钮显示  to
      rowClick(row) {
        this.rowid = row.goalmanagement_id;
        this.rowInfo = row;
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
            name: 'PFANS2023FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'carryforward') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          } else {
            this.form.last_center_id = this.rowInfo.center_name;
            this.form.last_group_id = this.rowInfo.group_name;
            this.form.last_team_id = this.rowInfo.team_name;
          }
          this.dialogVisible = true;
          this.form.new_center_id = '' ;
          this.form.new_group_id = '';
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS2023FormView',
            params: {
              _id: "",
              disabled: true
            }
          })
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
            name: 'PFANS2023FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
        if (val === 'open') {
            let formdis = {
            code: 'PR066001',
            value1: '1'
          };
          this.loading = true;
          this.$store
            .dispatch('dictionaryStore/updateDictionary', formdis)
            .then(response => {
              this.loading = false;
              this.buttonList[2].disabled = false;
              this.buttonList[3].disabled = true;
              this.buttonList[4].disabled = false;
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
        if (val === 'close') {
          let formdis = {
            code: 'PR066001',
            value1: '0'
          };
          this.loading = true;
          this.$store
            .dispatch('dictionaryStore/updateDictionary', formdis)
            .then(response => {
              this.loading = false;
              this.buttonList[2].disabled = true;
              this.buttonList[3].disabled = false;
              this.buttonList[4].disabled = true;
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
      },
      //获取角色
      getCurrentRole2() {
        let letStage = getDictionaryInfo("PR066001");
        if (letStage != null) {
          letStage = letStage.value1;
          if (letStage == '0') {
            this.buttonList[2].disabled = true;
          } else {
            this.buttonList[2].disabled = false;
          }
        }
        let roles = '';
        if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
          for (let role of this.$store.getters.useraccount.roles) {
            roles = roles + role.description;
          }
          if (roles.toUpperCase().indexOf('人事总务部长') != -1 || roles.toUpperCase().indexOf('工资计算担当') != -1) {
            // 目标管理开放
            let letStage = getDictionaryInfo("PR066001");
            if (letStage != null) {
              letStage = letStage.value1;
              if (letStage == '0') {
                this.buttonList = [
                  {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                  {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                  {'key': 'edit', 'name': 'button.update', 'disabled': true, 'icon': 'el-icon-edit'},
                  {'key': 'open', 'name': 'button.open1', 'disabled': false,},
                  {'key': 'close', 'name': 'button.close1', 'disabled': true,},
                  // add-ccm  数据转结 fr
                  {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
                  // add-ccm  数据转结 to
                ]
              } else {
                this.buttonList = [
                  {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                  {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                  {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                  {'key': 'open', 'name': 'button.open1', 'disabled': true,},
                  {'key': 'close', 'name': 'button.close1', 'disabled': false,},
                  // add-ccm  数据转结 fr
                  {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
                  // add-ccm  数据转结 to
                ]
              }
            }
          }
        }
      },
      // add-lyt-2021/4/4-添加年份检索栏-start
      changed() {
        if (this.yearvalue !== '' && this.yearvalue !== null && this.yearvalue !== undefined) {
          this.loading = true;
          this.$store
            .dispatch('PFANS2023Store/getFpans2023List', {'years':moment(this.yearvalue).format('YYYY')})
            .then(response => {
              for (let j = 0; j < response.length; j++) {
                if (response[j].user_id !== null && response[j].user_id !== "") {
                  let user = getUserInfo(response[j].user_id);
                  let nameflg = getOrgInfoByUserId(response[j].user_id);
                  if (nameflg) {
                    response[j].center_name = nameflg.centerNmae;
                    response[j].group_name = nameflg.groupNmae;
                    response[j].team_name = nameflg.teamNmae;
                  }
                  if (user) {
                    response[j].user_name = user.userinfo.customername;
                  }
                }
                response[j].status = getStatus(response[j].status);
                if (response[j].createon !== null && response[j].createon !== "") {
                  response[j].createon = moment(response[j].createon).format("YYYY-MM-DD");
                }
                if (response[j].stage !== null && response[j].stage !== "") {
                  let letStage = getDictionaryInfo(response[j].stage);
                  if (letStage != null) {
                    response[j].stage = letStage.value1;
                  }
                }
                if (this.$i18n) {
                  if (response[j].stage !== null && response[j].stage !== "") {
                    if (response[j].stage == '0') {
                      response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSYEAR');
                    } else if (response[j].stage == '1') {
                      response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSSEP');
                    } else if (response[j].stage == '2') {
                      response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSDEC');
                    } else if (response[j].stage == '3') {
                      response[j].stage = this.$t('label.PFANS2023FORMVIEW_TARGETGOALSMAR');
                    }
                  }
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
        }
      }
    }
  }
      // add-lyt-2021/4/4-添加年份检索栏-end
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
