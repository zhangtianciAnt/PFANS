<template>
  <div>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
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
  </div>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getDictionaryInfo, getStatus, getUserInfo,getOrgInfoByUserId} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from "moment";
    import org from '@/view/components/org';
    export default {
        name: 'PFANS2024View',
        components: {
            EasyNormalTable,
          org
        },
        data() {
            return {
              form:{
                year:'',
                org:''
              },
              dialogVisible:false,
                loading: false,
                title: "title.PFANS2024VIEW",
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'year',
                        label: 'label.PFANS2023VIEW_YEARS',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'user_name',
                        label: 'label.user_name',
                        width: 90,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_name',
                        label: 'label.center',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_name',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_name',
                        label: 'label.team',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'skilllevelafter',
                        label: 'label.PFANS2024VIEW_SKILLLEVEL',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'schoolspecies',
                        label: 'label.PFANS2024VIEW_SCHOOLSPECIES',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'entryyear',
                        label: 'label.PFANS2024VIEW_ENTRYYEAR',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    // {
                    //     code: 'status',
                    //     label: 'label.PFANS2023VIEW_COMPLETIONSTATUS',
                    //     width: 150,
                    //     fix: false,
                    //     filter: true
                    // }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row:'talentplan_id',
            };
        },
        mounted() {
           this.init();
        },
        methods: {
          setOrg(val){
            this.form.org = val;
          },
          init(){
            this.loading = true;

            this.$store
              .dispatch('PFANS2024Store/getFpans2024List', {})
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
                  if (response[j].status !== null && response[j].status !== "") {
                    response[j].status = getStatus(response[j].status);
                  }
                  if (response[j].skilllevelafter!== null && response[j].skilllevelafter !== "") {
                    let letStage = getDictionaryInfo(response[j].skilllevelafter);
                    if (letStage != null) {
                      response[j].skilllevelafter = letStage.value1;
                    }
                  }
                  if (response[j].schoolspecies !== null && response[j].schoolspecies !== "") {
                    let letStage = getDictionaryInfo(response[j].schoolspecies);
                    if (letStage != null) {
                      response[j].schoolspecies = letStage.value1;
                    }
                  }
                  if (response[j].entryyear !== null && response[j].entryyear !== "") {
                    response[j].entryyear = moment(response[j].entryyear).format("YYYY-MM-DD");
                  }
                  // if (response[j].graduationyear !== null && response[j].graduationyear !== "") {
                  //     response[j].graduationyear = moment(response[j].graduationyear).format("YYYY");
                  // }
                  if (response[j].contract !== null && response[j].contract !== "") {
                    response[j].contract = moment(response[j].contract).format("YYYY");
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
            rowClick(row) {
                this.rowid = row.talentplan_id;
            },
          submit(){
            this.loading = true;
            this.form.year = moment(this.form.year).format("YYYY");
            this.$store
              .dispatch('PFANS2024Store/create',  this.form)
              .then(response => {
                this.init();
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 2 * 1000
                })
                this.dialogVisible = false;
                this.loading = false;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                })
                this.loading = false;
              })

          },
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
                        name: 'PFANS2024FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
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
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2024FormView',
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
