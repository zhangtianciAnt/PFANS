<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList" @reget="getdata"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    <!--    添加筛选条件 ztc fr-->
    <el-form slot="search" label-position="top" label-width="8vw">
      <el-row>
        <el-col :span="5">
          <el-form-item :label="$t('label.group')">
            <org :orglist="retral.group_id"
                 orgtype="4"
                 style="width: 90%"
                 @getOrgids="getGroupId"
            ></org>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('label.PFANS5009VIEW_PROJECTNO')">
            <el-input v-model="retral.numbers" clearable style="width: 90%"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('label.PFANS5009VIEW_PROJECTNAME')">
            <el-input v-model="retral.project_name" clearable style="width: 90%"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')">
            <dicselect
              :data="retral.projecttype"
              code="PP001"
              style="width: 90%"
              @change="changeType"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('label.PFANS1007FORMVIEW_CONTRACTNO')">
            <el-input v-model="retral.contractno" clearable style="width: 90%"/>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="4">-->
        <!--          <el-form-item :label="$t('label.PFANS5001FORMVIEW_LEADERID')">-->
        <!--            <user :disabled="false" :selectType="selectType" :userlist="userlist"-->
        <!--                  style="width: 67%" @getUserids="getUserids"></user>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="5">-->
        <!--          <el-form-item :label="$t('label.PFANS5001FORMVIEW_TIMEBETWEEN')">-->
        <!--            <el-date-picker-->
        <!--              unlink-panels-->
        <!--              v-model="workinghours"-->
        <!--              style="width: 250px"-->
        <!--              type="daterange"-->
        <!--              :end-placeholder="$t('label.enddate')"-->
        <!--              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"-->
        <!--              :start-placeholder="$t('label.startdate')"-->
        <!--              @change="filterInfo"-->
        <!--            ></el-date-picker>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
    </el-form>
    <!--    添加筛选条件 ztc to-->
  </EasyNormalTable>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';
import {getDictionaryInfo, getStatus} from '@/utils/customize';
import {getOrgInfo} from '../../../../utils/customize';
import org from '@/view/components/org';
import dicselect from '../../../components/dicselect.vue';
import user from '../../../components/user.vue';

export default {
  name: 'PFANS5009VIEW',
  components: {
    EasyNormalTable,
    dicselect,
    org,
    user,
  },
  data() {
      return {
        loading: false,
        title: 'title.PFANS5009VIEW',
        data: [],
        submitted: this.$t('label.PFANS5009FORMVIEW_SUBMITTED'),
        notsubmitted: this.$t('label.PFANS5009FORMVIEW_NOTSUBMITTED'),
        phasestatus0: this.$t('label.PFANS5009FORMVIEW_PHASESTATUS0'),
        phasestatus1: this.$t('label.PFANS5009FORMVIEW_PHASESTATUS1'),
        contractstatus0: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS0'),
        contractstatus1: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS1'),
        contractstatus2: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS2'),
        contractstatus3: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS3'),
        // 添加筛选条件 ztc fr
        userlist: '',
        selectType: 'Single',
        retral: {
          group_id: '',
          numbers: '',
          project_name: '',
          projecttype: '',
          contractno: '',
        },
        // 添加筛选条件 ztc to
        columns: [
          {
            code: 'groupname',
            label: 'label.department',
            width: 190,
            fix: false,
            filter: true,
          },
          {
            code: 'numbers',
            label: 'label.PFANS5009VIEW_PROJECTNO',
            width: 110,
            fix: false,
            filter: false,
          },
          {
            code: 'project_name',
            label: 'label.PFANS5009VIEW_PROJECTNAME',
            width: 110,
            fix: false,
            filter: false,
          },
          {
            code: 'projecttype',
            label: 'label.PFANS5001FORMVIEW_PROJECTTYPE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'phase',
            label: 'label.PFANS5009VIEW_PHASE',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            code: 'productstatus',
            label: 'label.PFANS5009VIEW_PRODUCTSTATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'phasestatus',
            label: 'label.PFANS5009VIEW_STAGESTATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'estimatedwork',
            label: 'label.PFANS5009VIEW_ESTIMATEDWORK',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'contractno',
            label: 'label.PFANS1007FORMVIEW_CONTRACTNO',
            width: 260,
            fix: false,
            filter: false,
          },
          {
            code: 'actualwork',
            label: 'label.PFANS5009VIEW_ACTUALWORK',
            width: 150,
            fix: false,
            filter: false,
          },
          // {
          //   code: 'zpqk',
          //   label: 'label.PFANS5009VIEW_SITUATION',
          //   width: 150,
          //   fix: false,
          //   filter: true,
          // },
          {
            code: 'contractstatus',
            label: 'label.PFANS5009VIEW_STATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'status',
          //   label: 'label.approval_status',
          //   width: 150,
          //   fix: false,
          //   filter: true,
          // },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          // 添加筛选条件 ztc fr
          {
            key: 'search',
            name: 'button.search',
            disabled: false,
            icon: 'el-icon-search'
          },
          // 添加筛选条件 ztc to
        ],
        rowid: '',
        row: 'companyprojects_id',
      };
    },
    mounted: function() {
      this.getdata();
    },

    methods: {
      getdata(){
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/getSiteList4', this.retral)
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].phase !== null && response[j].phase !== '') {
                let letPhase = getDictionaryInfo(response[j].phase);
                if (letPhase != null) {
                  response[j].phase = letPhase.value1;
                }
              }
              //项目类型
              if (response[j].projecttype !== null && response[j].projecttype !== "") {
                let letStage = getDictionaryInfo(response[j].projecttype);
                if (letStage != null) {
                  response[j].projecttype = letStage.value1;
                }
              }
              if (response[j].phasestatus !== null && response[j].phasestatus !== '') {
                if (response[j].phasestatus === '0') {
                  response[j].phasestatus = this.phasestatus0;
                } else {
                  response[j].phasestatus = this.phasestatus1;
                }
              }
              if (response[j].contractstatus !== null && response[j].contractstatus !== '') {
                if (response[j].contractstatus === '0') {
                  response[j].contractstatus = this.contractstatus0;
                } else if (response[j].contractstatus === '1') {
                  response[j].contractstatus = this.contractstatus1;
                } else if (response[j].contractstatus === '3') {
                  response[j].contractstatus = this.contractstatus3;
                } else {
                  response[j].contractstatus = this.contractstatus2;
                }
              }
              response[j].status = getStatus(response[j].status);
              if (response[j].group_id)
              {
                let group = getOrgInfo(response[j].group_id);
                if (group) {
                  response[j].groupname = group.companyname;
                }
              }
            }
            this.data = response;
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
        this.rowid = row.companyprojects_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS5009FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
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
            name: 'PFANS5009FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              adddisabled: true,
            },
          });
        }
        // 添加筛选条件 ztc fr
        if (val === 'search') {
          this.getdata();
        }
        // 添加筛选条件 ztc to
      },
      // 添加筛选条件 ztc fr
      getUserids(val) {
        this.userlist = val;
        this.retral.leaderid = val;
      },
      changeType(val) {
        this.retral.projecttype = val;
      },
      getGroupId(val) {
        this.retral.group_id = val;
      },
      // 添加筛选条件 ztc to
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
