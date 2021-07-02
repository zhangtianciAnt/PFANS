<template>
  <div>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
    <el-dialog center
               :visible.sync="dialogVisible"
               :title="$t('button.carryforward')"
               width="50%">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 0.1vw">
        <el-row>
          <div style=
                 "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold">{{$t('label.PFANS3005VIEW_OLDORGANIZATION')}}</div>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 0.5vw">
            <el-form-item :label="$t('label.center')">
              <el-input :disabled="true" style="width:15vw" v-model="form.last_center_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.group')">
              <el-input :disabled="true" style="width:15vw" v-model="form.last_group_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('label.team')">
              <el-input :disabled="true" style="width:15vw" v-model="form.last_team_id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style=
                 "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold">{{$t('label.PFANS3005VIEW_NEWORGANIZATION')}}</div>
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
          <el-col :span="8" style="margin-bottom: -1vw;">
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
          <el-col :span="7" style="margin-bottom: -1vw;">
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
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '@/view/components/org';
  import {getOrgInfo,getStatus, getUserInfo, getDictionaryInfo, getOrgInfoByUserId,getDepartmentById} from '@/utils/customize';

  export default {
    name: 'PFANS2032View',
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
          title: 'title.PFANS2032VIEW',
          data: [],
          // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 start
          status:'',
          // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 end
          rowInfo: [],
          error_group: '',
          error_center: '',
          columns: [
          {
            code: 'user_id',
            label: 'label.user_name',
            width: 100,
            fix: false,
            filter: false,
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
            code: 'starank',
            label: 'label.PFANSUSERFORMVIEW_RANK',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'sex',
            label: 'label.sex',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'position',
            label: 'label.PFANS2026VIEW_POSITION',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'entry_time',
            label: 'label.PFANS2026VIEW_ENTRYTIME',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'resignation_date',
            label: 'label.PFANS2026VIEW_RESIGNATIONDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList:[ ],
          buttonListAll: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          // add-ccm  数据转结 fr
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit', },
          // add-ccm  数据转结 to
        ],
          buttonListial:[
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
          rowid: '',
          row_id: 'staffexitproce_id',
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
        this.getOrgInformation(val);
        if (!val || this.form.new_center_id === '') {
          this.error_center = this.$t('normal.error_08') + 'center';
        } else {
          this.error_center = '';
        }
      },
      getGroupid(val) {
        this.getOrgInformation(val);
        if (this.form.new_center_id === '') {
          this.error_group = this.$t('normal.error_08') + 'center';
        } else {
          this.error_group = '';
        }
      },
      getTeamid(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === '') {
          this.error_group = this.$t('normal.error_08') + 'center';
        } else {
          this.error_group = '';
        }
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
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2026Store/get2', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].user_id !== null && response[j].user_id !== '') {
                if (response[j].starank != '' && response[j].starank != null) {
                  let letbudge = getDictionaryInfo(response[j].starank);
                  if (letbudge) {
                    response[j].starank = letbudge.value1;
                  }
                }
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
                let postinfo = getDictionaryInfo(response[j].position);
                if (postinfo) {
                  response[j].position = postinfo.value1;
                }
                let rst = getUserInfo(response[j].user_id);
                if (rst) {
                  response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                }
                if (response[j].status !== null && response[j].status !== '') {
                  response[j].status = getStatus(response[j].status);
                }

                if (response[j].entry_time !== null && response[j].entry_time !== '') {
                  response[j].entry_time = moment(response[j].entry_time).format('YYYY-MM-DD');
                }
                if (response[j].resignation_date !== null && response[j].resignation_date !== '') {
                  response[j].resignation_date = moment(response[j].resignation_date).format('YYYY-MM-DD');
                }

                if (response[j].sex !== null && response[j].sex !== '') {
                  let letsex = getDictionaryInfo(response[j].sex);
                  if (letsex) {
                    response[j].sex = letsex.value1;
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
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //add    数据转结按钮显示  from
      getdate(){
        this.mounth = new Date().getMonth() + 1;
        this.date = new Date().getDate();
        if(this.mounth === 4 && this.date >= 10 && this.date <= 30){
          this.buttonList = this.buttonListAll
        } else {
          this.buttonList = this.buttonListial;
        }
      },
      //add    数据转结按钮显示  to
      submit(){
        this.loading = true;
        this.$refs['form'].validate(valid =>{
          if(valid){
            let parameter = {
              center_id: this.form.new_center_id,
              group_id: this.form.new_group_id,
              team_id:this.form.new_team_id,
              staffexitproce_id:this.rowid,
            };
            this.$store
              .dispatch('PFANS2026Store/change2', parameter)
              .then(response => {
                // this.data = response;
                this.getList();
                Message({
                  message: this.$t('normal.success_07'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.dialogVisible = false;
                this.form.new_center_id = '' ;
                this.form.new_group_id = '' ;
                this.form.new_team_id = '' ;
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
      rowClick(row) {
        this.rowid = row.staffexitproce_id;
        // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 start
        this.status = row.status;
        // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 end
        this.rowInfo = row;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        // this.$store.commit('global/SET_OPERATEID', this.rowid);
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
            name: 'PFANS2032FormView',
            params: {
              // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 start
              _status:this.status,
              // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 end
              _checkdisabled: false,
              _type: 0,
              _id: this.rowid,
              disabled: false,
            },
          });
        }  else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2032FormView',
            params: {
              // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 start
              _status:this.status,
              // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 end
              _checkdisabled: false,
              _type: 0,
              _id: this.rowid,
              disabled: true,
            },
          });
        } else if(val === 'carryforward'){
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }else{
            this.form.last_center_id = this.rowInfo.center_name;
            this.form.last_group_id = this.rowInfo.group_name;
            this.form.last_team_id = this.rowInfo.team_name;
          }
          this.dialogVisible = true;
        }
      },
    },
  };
</script>

<style scoped>

</style>
