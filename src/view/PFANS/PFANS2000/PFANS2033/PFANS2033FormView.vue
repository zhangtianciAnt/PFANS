<template>
  <div>
    <EasyNormalContainer
      :title="title"
      ref="container"

      v-loading="loading"
    >
      <div slot="customize">
        <el-table :data="tableA" border
                  header-cell-class-name="sub_bg_color_blue"
                  stripe>
          <el-table-column :label="$t('label.user_name')" align="center"
                            width="110">
            <template slot-scope="scope">
              <span>{{scope.row.username}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.application_date')" align="center"
                           width="110">
            <template slot-scope="scope">
              <span>{{scope.row.applicationdate}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS2016VIEW_ERRORTYPE')" align="center"
                           width="180">
            <template slot-scope="scope">
              <span>{{scope.row.errortype}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS2016VIEW_PERIODLENGTH')" align="center"
                           width="110">
            <template slot-scope="scope">
              <span>{{scope.row.lengthtime}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS2016VIEW_REPERIODLENGTH')" align="center"
                          width="110">
            <template slot-scope="scope">
              <span>{{scope.row.relengthtime}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS2016VIEW_OCCURRENCEDATE')" align="center"
                           width="110">
            <template slot-scope="scope">
              <span>{{scope.row.occurrencedate}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.PFANS2016VIEW_FINISHEDDATE')" align="center"
                           width="110">
            <template slot-scope="scope">
              <span>{{scope.row.finisheddate}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('label.approval_status')" align="center"
                           width="100">
            <template slot-scope="scope">
              <span>{{scope.row.status}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </EasyNormalContainer>

  </div>
</template>

<script>

  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from "element-ui";
  import moment from "moment";
  import {
    getDictionaryInfo,
    getOrgInfoByUserId,
    getStatus,
    getUserInfo,
  } from '@/utils/customize';
  import user from "../../../components/user";
  import org from "../../../components/org";

  export default {
    name: 'PFANS2033FormView',
    components: {
      PFANS2033Pop,
      EasyNormalContainer,
      user,
      org,
      getOrgInfoByUserId,
    },
    data() {
      return {
        //add-ws-9/11-禅道任务515
        params_id: '',
        //add-ws-9/11-禅道任务515
        loading: false,
        title: 'title.PFANS2016VIEW',
        tableA:[],
        url: '',
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
        //urlparams: '',
        urlparams: {},
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
      };
    },
    methods: {
      viewBook(row)
      {
        this.url = '';
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
        //this.urlparams = '';
        this.urlparams = {};
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
        this.url = 'PFANS2016FormView';
        this.urlparams = {'_id': row.abnormalid, 'disabled': false};
        this.$refs.PFANS2016Pop.open = true;
      }
    },
    mounted() {
      //add-ws-9/11-禅道任务515
      this.params_id = this.$route.params._id;
      //add-ws-9/11-禅道任务515
      if (this.params_id && !this.$route.params._view) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2010Store/getabnormalByuseridandDate', {'user_id': this.params_id,'dates':this.$route.params._dates})
          .then(response => {
            if (response !== undefined) {
              for (let j = 0; j < response.length; j++) {
                if (response[j].errortype != "PR013005" && response[j].errortype != "PR013007")
                {
                  if (this.$i18n) {
                    response[j].lengthtime = response[j].lengthtime + this.$t("label.hours");
                    if (parseInt(response[j].status) > 4) {
                      response[j].relengthtime = response[j].relengthtime + this.$t("label.hours");
                    } else {
                      response[j].relengthtime = '';
                    }
                  }
                } else {
                  if (this.$i18n) {
                    response[j].lengthtime = response[j].lengthtime === "4" ? this.$t("label.PFANS2011FROMVIEW_HALFDATE") : this.$t("label.PFANS2016FORMVIEW_QUANTIAN");
                    if (parseInt(response[j].status) > 4) {
                      if (parseInt(response[j].relengthtime) >= 8) {
                        response[j].relengthtime = this.$t("label.PFANS2016FORMVIEW_QUANTIAN")
                      } else if (parseInt(response[j].relengthtime) === 4) {
                        response[j].relengthtime = this.$t("label.PFANS2011FROMVIEW_HALFDATE")
                      } else if (parseInt(response[j].relengthtime) === 0) {
                        response[j].relengthtime = this.$t("label.PFANS2016FORMVIEW_UNREST")
                      } else {
                        response[j].relengthtime = '';
                      }
                    } else {
                      response[j].relengthtime = '';
                    }
                  }
                }

                let user = getUserInfo(response[j].user_id);
                let nameflg = getOrgInfoByUserId(response[j].user_id);
                if (nameflg) {
                  response[j].centername = nameflg.centerNmae;
                  response[j].groupname = nameflg.groupNmae;
                  response[j].teamname = nameflg.teamNmae;
                }
                if (user) {
                  response[j].username = user.userinfo.customername;
                }
                if (response[j].applicationdate !== null && response[j].applicationdate !== "")
                {
                  response[j].applicationdate = moment(response[j].applicationdate).format("YYYY-MM-DD");
                }
                if (parseInt(response[j].status) > 4) {
                  //实际日期
                  if (response[j].reoccurrencedate !== null && response[j].reoccurrencedate !== "") {
                    response[j].occurrencedate = moment(response[j].reoccurrencedate).format("YYYY-MM-DD");
                  }
                  if (response[j].refinisheddate !== null && response[j].refinisheddate !== "") {
                    response[j].finisheddate = moment(response[j].refinisheddate).format("YYYY-MM-DD");
                  }
                } else {
                  //预计日期
                  if (response[j].occurrencedate !== null && response[j].occurrencedate !== "") {
                    response[j].occurrencedate = moment(response[j].occurrencedate).format("YYYY-MM-DD");
                  }
                  if (response[j].finisheddate !== null && response[j].finisheddate !== "") {
                    response[j].finisheddate = moment(response[j].finisheddate).format("YYYY-MM-DD");
                  }
                }
                if (response[j].status !== null && response[j].status !== "") {
                  response[j].status = getStatus(response[j].status);
                }
                if (response[j].errortype !== null && response[j].errortype !== "") {
                  let letErrortype = getDictionaryInfo(response[j].errortype);
                  if (letErrortype != null) {
                    response[j].errortype = letErrortype.value1;
                  }
                }
              }
              this.tableA = response;
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
      }
      //考勤异常申请显示履历
      if(this.$route.params._view){
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/lookingFor', {'user_id': this.$route.params._userid,'errortype':this.$route.params._errortype,'occurrencedate':this.$route.params._date})
          .then(response => {
            if (response !== undefined) {
              for (let j = 0; j < response.length; j++) {
                if (response[j].errortype != "PR013005" && response[j].errortype != "PR013007")
                {
                  if (this.$i18n) {
                    response[j].lengthtime = response[j].lengthtime + this.$t("label.hours");
                    if (parseInt(response[j].status) > 4) {
                      response[j].relengthtime = response[j].relengthtime + this.$t("label.hours");
                    } else {
                      response[j].relengthtime = '';
                    }
                  }
                } else {
                  if (this.$i18n) {
                    response[j].lengthtime = response[j].lengthtime === "4" ? this.$t("label.PFANS2011FROMVIEW_HALFDATE") : this.$t("label.PFANS2016FORMVIEW_QUANTIAN");
                    if (parseInt(response[j].status) > 4) {
                      if (parseInt(response[j].relengthtime) >= 8) {
                        response[j].relengthtime = this.$t("label.PFANS2016FORMVIEW_QUANTIAN")
                      } else if (parseInt(response[j].relengthtime) === 4) {
                        response[j].relengthtime = this.$t("label.PFANS2011FROMVIEW_HALFDATE")
                      } else if (parseInt(response[j].relengthtime) === 0) {
                        response[j].relengthtime = this.$t("label.PFANS2016FORMVIEW_UNREST")
                      } else {
                        response[j].relengthtime = '';
                      }
                    } else {
                      response[j].relengthtime = '';
                    }
                  }
                }

                let user = getUserInfo(response[j].user_id);
                let nameflg = getOrgInfoByUserId(response[j].user_id);
                if (nameflg) {
                  response[j].centername = nameflg.centerNmae;
                  response[j].groupname = nameflg.groupNmae;
                  response[j].teamname = nameflg.teamNmae;
                }
                if (user) {
                  response[j].username = user.userinfo.customername;
                }
                if (response[j].applicationdate !== null && response[j].applicationdate !== "")
                {
                  response[j].applicationdate = moment(response[j].applicationdate).format("YYYY-MM-DD");
                }
                if (parseInt(response[j].status) > 4) {
                  //实际日期
                  if (response[j].reoccurrencedate !== null && response[j].reoccurrencedate !== "") {
                    response[j].occurrencedate = moment(response[j].reoccurrencedate).format("YYYY-MM-DD");
                  }
                  if (response[j].refinisheddate !== null && response[j].refinisheddate !== "") {
                    response[j].finisheddate = moment(response[j].refinisheddate).format("YYYY-MM-DD");
                  }
                } else {
                  //预计日期
                  if (response[j].occurrencedate !== null && response[j].occurrencedate !== "") {
                    response[j].occurrencedate = moment(response[j].occurrencedate).format("YYYY-MM-DD");
                  }
                  if (response[j].finisheddate !== null && response[j].finisheddate !== "") {
                    response[j].finisheddate = moment(response[j].finisheddate).format("YYYY-MM-DD");
                  }
                }
                if (response[j].status !== null && response[j].status !== "") {
                  response[j].status = getStatus(response[j].status);
                }
                if (response[j].errortype !== null && response[j].errortype !== "") {
                  let letErrortype = getDictionaryInfo(response[j].errortype);
                  if (letErrortype != null) {
                    response[j].errortype = letErrortype.value1;
                  }
                }
              }
              this.tableA = response;
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
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>

