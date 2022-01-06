<template>
  <EasyNormalTable
    v-loading="loading"
    :buttonList="buttonList"
    :columns="columns"
    :data="data" :rowid="rowid"
    :title="title"
    @buttonClick="buttonClick"
    @reget="getdate"
    @rowClick="rowClick"
  ></EasyNormalTable>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {getDictionaryInfo, getOrgInfo, getStatus, getUserInfo} from '../../../../utils/customize';
import {Message} from 'element-ui';

let moment = require('moment');

export default {
  name: 'PFANS2002View',
  components: {
    EasyNormalTable,
  },

  data() {
    return {
      loading: false,
      data: [],
      title: 'title.PFANS2002VIEW',
      buttonList: [
        {
          key: 'view',
          name: 'button.view',
          disabled: false,
          icon: 'el-icon-search',
        },
        {
          key: 'new',
          name: 'button.insert',
          disabled: false,
          icon: 'el-icon-plus',
        },
        {
          key: 'update',
          name: 'button.update',
          disabled: false,
          icon: 'el-icon-edit',
        },
      ],

      columns: [
        {
          code: 'name',
          label: 'label.PFANS2002VIEW_NAME',
          width: 100,
          fix: false,
          filter: false,
        },
        //region  upd  ml  20210723  学习经历改为Rn  from
        {
          // code: "education1",
          // label: "label.PFANS2002VIEW_EDUCATION",
          code: 'level',
          label: 'label.PFANS2003FORMVIEW_RN',
          width: 80,
          fix: false,
          filter: true,
        },
        //endregion  upd  ml  20210723  学习经历改为Rn  to
        {
          code: 'center',
          label: 'label.center',
          width: 200,
          fix: false,
          filter: true,
        },
        {
          code: 'group',
          label: 'label.group',
          width: 200,
          fix: false,
          filter: true,
        },
        {
          code: 'team',
          label: 'label.team',
          width: 200,
          fix: false,
          filter: true,
        },
        //region  upd  ml  20210723  生年月日改为预计入职时间、面试官改为实际入职时间  from
        {
          // code: "birthday",
          // label: "label.PFANS2002VIEW_BIRTHDAY",
          code: 'expectedtime',
          label: 'label.PFANS2002FORMVIEW_EXPECTEDTIME',
          width: 130,
          fix: false,
          filter: false,
        },
        {
          // code: "_interview",
          // label: "label.PFANS2002VIEW_INTERVIEW",
          code: 'entrytime',
          label: 'label.PFANS2002FORMVIEW_REALINTIME',
          width: 130,
          fix: false,
          // filter: true
          filter: false,
        },
        //endregion  upd  ml  20210723  出生年月改为预计入职时间、面试官改为实际入职时间  to
        {
          code: 'createon',
          label: 'label.PFANS2002VIEW_CREATEON',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'entrydivision',
          label: 'label.PFANS2002FORMVIEW_ENTRYDIVISION',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'status',
          label: 'label.approval_status',
          width: 150,
          fix: false,
          filter: true,
        },
      ],
      id: '',
      rowid: 'recruitjudgement_id',
    };
  },
  mounted() {
    this.getdate();
  },

  methods: {
    getdate() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2002Store/get')
        .then(response => {
          this.data = response;
          for (let j = 0; j < this.data.length; j++) {
            let interview = '';
            if (getOrgInfo(this.data[j].center_id)) this.data[j].center = getOrgInfo(this.data[j].center_id).companyname;
            if (getOrgInfo(this.data[j].group_id)) this.data[j].group = getOrgInfo(this.data[j].group_id).companyname;
            if (getOrgInfo(this.data[j].team_id)) this.data[j].team = getOrgInfo(this.data[j].team_id).departmentname;
            //region  upd  ml  20210723  学习经历改为Rn  from
            //   if (response[j].education1 !== null && response[j].education1 !== "") {
            //       let letStage = getDictionaryInfo(response[j].education1);
            //       if (letStage != null) {
            //           response[j].education1 = letStage.value1;
            //       }
            //   }
            if (response[j].level !== null && response[j].level !== '') {
              let letStage = getDictionaryInfo(response[j].level);
              if (letStage != null) {
                response[j].level = letStage.value1;
              }
            }
            //endregion  upd  ml  20210723  学习经历改为Rn  to
            if (response[j].entrydivision !== null && response[j].entrydivision !== '') {
              let letStage = getDictionaryInfo(response[j].entrydivision);
              if (letStage != null) {
                response[j].entrydivision = letStage.value1;
              }
            }
            if (this.data[j].interview !== null && this.data[j].interview !== '' && this.data[j].interview !== undefined) {
              for (var val of JSON.parse(this.data[j].interview)) {
                if (val.interviewer) {
                  if (getUserInfo(val.interviewer)) {
                    interview += getUserInfo(val.interviewer).userinfo.customername + ',';
                  }
                }
              }
            }
            //region  upd  ml  20210723  面试官改为实际入职时间  from
            //   this.data[j]._interview = interview.substring(0, interview.length - 1);
            if (this.data[j].entrytime !== null && this.data[j].entrytime !== '' && this.data[j].entrytime !== undefined) {
              this.data[j].entrytime = moment(this.data[j].entrytime).format(
                'YYYY-MM-DD',
              );
            } else {
              this.data[j].entrytime = '';
            }
            //endregion  upd  ml  20210723  面试官改为实际入职时间  to
            this.data[j].status = getStatus(this.data[j].status);
            //region  upd  ml  20210723  生年月日改为预计入职时间  from
            //   this.data[j].birthday = moment(this.data[j].birthday).format(
            //       "YYYY-MM-DD"
            //   );
            if (this.data[j].expectedtime !== null && this.data[j].expectedtime !== '' && this.data[j].expectedtime !== undefined) {
              this.data[j].expectedtime = moment(this.data[j].expectedtime).format(
                'YYYY-MM-DD',
              );
            } else {
              this.data[j].expectedtime = '';
            }
            //endregion  upd  ml  20210723  生年月日改为预计入职时间  to
            this.data[j].createon = moment(this.data[j].createon).format(
              'YYYY-MM-DD',
            );
          }
          this.loading = false;
        })
        .catch(err => {
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },
    rowClick(row) {
      this.id = row.recruitjudgement_id;
    },
    buttonClick(val) {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      if ('update' === val) {
        if (!this.id) {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.$router.push({
          name: 'PFANS2002FormView',
          params: {
            _id: this.id,
            disabled: false,
          },
        });
      } else if ('view' === val) {
        if (!this.id) {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.$router.push({
          name: 'PFANS2002FormView',
          params: {
            _id: this.id,
            disabled: true,
          },
        });
      } else if ('new' === val) {
        this.$router.push({
          name: 'PFANS2002FormView',
          params: {
            _id: '',
            disabled: false,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
