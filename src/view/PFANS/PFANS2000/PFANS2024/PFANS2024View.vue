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
               width="60%">
      <el-row>
        <el-col :span="8">
          <el-form :model="form" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
            <el-form-item :label="$t('label.PFANS2007VIEW_YEAR')">
              <el-date-picker
                v-model="form.year"
                type="year">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :model="form" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
            <el-form-item :label="$t('label.PFANS1008FORMVIEW_DEPARTMENT')">
              <org
                orgtype="4"
                style="width:12vw"
                selectType="Single"
                @getOrgids="setOrg"
              ></org>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
    </el-dialog>
    <!--数据结转模态层-->
    <el-container>
      <el-dialog center
                 :visible.sync="dialogVisible1"
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
                <org :orglist="form1.new_center_id"
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
                <org :orglist="form1.new_group_id"
                     orgtype="2"
                     style="width: 13vw"
                     @getOrgids="getGroupid"
                     :error="error_group"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="margin-bottom: -1vw;">
              <el-form-item :label="$t('label.team')">
                <org :orglist="form1.new_team_id"
                     orgtype="3"
                     style="width: 13.5vw"
                     @getOrgids="getTeamid"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit1">{{$t('button.confirm')}}</el-button>
          </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus, getUserInfo, getOrgInfoByUserId, getOrgInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '@/view/components/org';

  export default {
    name: 'PFANS2024View',
    components: {
      EasyNormalTable,
      org,
    },
    data() {
      var centerId = (rule, value, callback) => {
        if (!this.form1.new_center_id || this.form1.new_center_id === '') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.center')));
          this.error_center = this.$t('normal.error_08') + this.$t('label.center');
        } else {
          callback();
        }
      };
      return {
        form: {
          year: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y') : moment(new Date()),
          org: '',
        },
        dialogVisible: false,
        loading: false,
        title: 'title.PFANS2024VIEW',
        yearvalue:moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format("YYYY") : moment(new Date()).format('YYYY'),
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
        form1: {
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
          {
            code: 'year',
            label: 'label.PFANS2023VIEW_YEARS',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'user_name',
            label: 'label.user_name',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'skilllevelafter',
            label: 'label.PFANS2024VIEW_SKILLLEVEL',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'schoolspecies',
            label: 'label.PFANS2024VIEW_SCHOOLSPECIES',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'entryyear',
            label: 'label.PFANS2024VIEW_ENTRYYEAR',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'finishstatus',
            label: 'label.PFANS2010VIEW_FINISHSTATUS',
            width: 150,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row: 'talentplan_id',
        dialogVisible1: false,
      };
    },
    mounted() {
      this.init();
    },
    methods: {
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
            centername: this.form1.centername,
            groupname: this.form1.groupname,
            teamname: this.form1.teamname,
            center_id: this.form1.new_center_id,
            group_id: this.form1.new_group_id,
            team_id: this.form1.new_team_id,
          } = org);
        }
      },
      getCenterid(val){
        this.getOrgInformation(val);
        this.form1.new_center_id = val
        if (!val || this.form1.new_center_id === '') {
          this.error_center = this.$t('normal.error_08') + 'center';
        } else {
          this.error_center = '';
        }
      },
      getGroupid(val){
        this.getOrgInformation(val);
        this.form1.new_group_id = val
      },
      getTeamid(val){
        this.getOrgInformation(val);
        this.form1.new_team_id = val
      },
      setOrg(val) {
        this.form.org = val;
      },
      init() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2024Store/getDataList', {'years':this.yearvalue})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              // if (response[j].user_id !== null && response[j].user_id !== '') {
              //   let user = getUserInfo(response[j].user_id);
              //   let nameflg = getOrgInfoByUserId(response[j].user_id);
              //   if (nameflg) {
              //     response[j].center_name = nameflg.centerNmae;
              //     response[j].group_name = nameflg.groupNmae;
              //     response[j].team_name = nameflg.teamNmae;
              //   }
              //   if (user) {
              //     response[j].user_name = user.userinfo.customername;
              //   }
              // }
              if (response[j].user_id !== null && response[j].user_id !== '') {
                let user = getUserInfo(response[j].user_id);
                let center = getOrgInfo(response[j].center_id);
                if (center) {
                  response[j].center_name = center.companyname;
                }
                let group = getOrgInfo(response[j].group_id);
                if (group) {
                  response[j].group_name = group.companyname;
                }
                let team = getOrgInfo(response[j].team_id);
                if (team) {
                  response[j].team_name = team.companyname;
                }
                if (user) {
                  response[j].user_name = user.userinfo.customername;
                }
              }
              if (response[j].status !== null && response[j].status !== '') {
                response[j].status = getStatus(response[j].status);
              }
              if (response[j].skilllevelafter !== null && response[j].skilllevelafter !== '') {
                let letStage = getDictionaryInfo(response[j].skilllevelafter);
                if (letStage != null) {
                  response[j].skilllevelafter = letStage.value1;
                }
              }
              if (response[j].schoolspecies !== null && response[j].schoolspecies !== '') {
                let letStage = getDictionaryInfo(response[j].schoolspecies);
                if (letStage != null) {
                  response[j].schoolspecies = letStage.value1;
                }
              }
              if (response[j].entryyear !== null && response[j].entryyear !== '') {
                response[j].entryyear = moment(response[j].entryyear).format('YYYY-MM-DD');
              }
              // if (response[j].graduationyear !== null && response[j].graduationyear !== "") {
              //     response[j].graduationyear = moment(response[j].graduationyear).format("YYYY");
              // }
              if (response[j].contract !== null && response[j].contract !== '') {
                response[j].contract = moment(response[j].contract).format('YYYY');
              }
              if (response[j].finishstatus == '0') {
                response[j].finishstatus = '已保存';
              } else if (response[j].finishstatus == '1') {
                response[j].finishstatus = '已完成';
              } else {
                response[j].finishstatus = '未开始';
              }
            }
            this.data = response;
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
      rowClick(row) {
        this.rowid = row.talentplan_id;
        this.rows = row;
      },
      submit() {
        this.loading = true;
        this.form.year = moment(this.form.year).format('YYYY');
        this.dialogVisible = false;
        this.$store
          .dispatch('PFANS2024Store/create', this.form)
          .then(response => {
            this.init();
            Message({
              message: this.$t('normal.success_01'),
              type: 'success',
              duration: 2 * 1000,
            });


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
      //数据结转确定事件
      submit1(){
        this.loading = true;
        this.$refs['form'].validate(valid =>{
          if(valid){
            let parameter = {
              center_id: this.form1.new_center_id,
              group_id: this.form1.new_group_id,
              team_id:this.form1.new_team_id,
              talentplan_id:this.rowid,
            };
            this.$store
              .dispatch('PFANS2024Store/dataCarryover', parameter)
              .then(response => {
                this.init();
                Message({
                  message: this.$t('normal.success_07'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.dialogVisible1 = false;
                this.form1.new_center_id= '';
                this.form1.new_group_id='';
                this.form1.new_team_id= '';
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
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2024FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
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
          this.dialogVisible1 = true;
            this.centername = this.rows.center_name;
            this.groupname = this.rows.group_name;
            this.teamname = this.rows.team_name;
        }
        if (val === 'insert') {
          // this.$router.push({
          //     name: 'PFANS2024FormView',
          //     params: {
          //         _id: "",
          //         disabled: true
          //     }
          // })
          this.dialogVisible = true;

        }
        if (val === 'edit') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2024FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
      },
      changed(){
        if(this.yearvalue !== '' && this.yearvalue !== null && this.yearvalue !== undefined){
          this.loading = true;
          this.$store
            .dispatch('PFANS2024Store/getDataList', {'years':moment(this.yearvalue).format('YYYY')})
            .then(response => {
              for (let j = 0; j < response.length; j++) {
                if (response[j].user_id !== null && response[j].user_id !== '') {
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
                if (response[j].status !== null && response[j].status !== '') {
                  response[j].status = getStatus(response[j].status);
                }
                if (response[j].skilllevelafter !== null && response[j].skilllevelafter !== '') {
                  let letStage = getDictionaryInfo(response[j].skilllevelafter);
                  if (letStage != null) {
                    response[j].skilllevelafter = letStage.value1;
                  }
                }
                if (response[j].schoolspecies !== null && response[j].schoolspecies !== '') {
                  let letStage = getDictionaryInfo(response[j].schoolspecies);
                  if (letStage != null) {
                    response[j].schoolspecies = letStage.value1;
                  }
                }
                if (response[j].entryyear !== null && response[j].entryyear !== '') {
                  response[j].entryyear = moment(response[j].entryyear).format('YYYY-MM-DD');
                }
                // if (response[j].graduationyear !== null && response[j].graduationyear !== "") {
                //     response[j].graduationyear = moment(response[j].graduationyear).format("YYYY");
                // }
                if (response[j].contract !== null && response[j].contract !== '') {
                  response[j].contract = moment(response[j].contract).format('YYYY');
                }
                if (response[j].finishstatus == '0') {
                  response[j].finishstatus = '已保存';
                } else if (response[j].finishstatus == '1') {
                  response[j].finishstatus = '已完成';
                } else {
                  response[j].finishstatus = '未开始';
                }
              }
              this.data = response;
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
        }
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
