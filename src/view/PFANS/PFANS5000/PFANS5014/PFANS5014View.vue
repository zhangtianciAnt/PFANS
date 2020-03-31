<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading"
                     v-show="showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t(title)" value="1"></el-option>
        <el-option :label="$t(title2)" value="2"></el-option>
      </el-select>
    </EasyNormalTable>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data2" :rowid="row_id" :title="title2"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading"
                     v-show="!showTable1">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t(title)" value="1"></el-option>
        <el-option :label="$t(title2)" value="2"></el-option>
      </el-select>
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize';
  import {Message} from "element-ui";
  import moment from "moment";

    export default {
        name: "PFANS5004View",
      components: {
        EasyNormalTable
      },
      data(){
          return {
            region: "1",
            showTable1: true,
            loading:false,
            title:"title.PFANS5004VIEW",
            title2: "title.PFANS5004VIEW2",
            data:[],
            data2: [],
            submitted: this.$t('label.PFANS5009FORMVIEW_SUBMITTED'),
            notsubmitted: this.$t('label.PFANS5009FORMVIEW_NOTSUBMITTED'),
            contractstatus0: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS0'),
            contractstatus1: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS1'),
            contractstatus2: this.$t('label.PFANS5009FORMVIEW_CONTRACTSTATUS2'),
            columns:[
              // {
              //   code: 'numbers',
              //   label: 'label.PFANS5009VIEW_PROJECTNO',
              //   width: 120,
              //   fix: false,
              //   filter: true,
              // },
              //   {
              //       code: 'numbers',
              //       label: 'label.PFANS5009VIEW_PROJECTNO',
              //       width: 110,
              //       fix: false,
              //       filter: true,
              //   },
              {
                code: 'project_name',
                label: 'label.PFANS5004VIEW_PROJECTNAMW',
                width: 120,
                fix: false,
                filter: true
              },
              /*项目负责人*/
              {
                code: 'leaderid',
                label: 'label.PFANS5001FORMVIEW_LEADERID',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'startdate',
                label: 'label.PFANS5001FORMVIEW_STARTDATE',
                width: 130,
                fix: false,
                filter: true
              },
              {
                code: 'nowdate',
                label: 'label.PFANS5009FORMVIEW_ACTUALENDTIME',
                width: 120,
                fix: false,
                filter: true
              },
              // {
              //   code: 'actualwork',
              //   label: 'label.PFANS5009VIEW_ACTUALWORK',
              //   width: 120,
              //   fix: false,
              //   filter: true
              // },
              /*合同状态*/
              // {
              //   code: 'contractstatus',
              //   label: 'label.PFANS5009VIEW_STATUS',
              //   width: 150,
              //   fix: false,
              //   filter: true,
              // },
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
              {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
            ],
            rowid: '',
            row_id: 'comproject_id'
          }
      },
      mounted() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5013Store/getList2', {flag: "0"})
          .then(response => {
            if(response.length > 0) {
                console.log("response",response)
                for (let j = 0; j < response.length; j++) {
                    if(response[j].leaderid !== null && response[j].leaderid !== ""){
                        let letUser = getUserInfo(response[j].leaderid);
                        if (letUser != null) {
                            response[j].leaderid = letUser.userinfo.customername;
                        }
                    }

                    if(response[j].startdate !== null && response[j].startdate !== ""){
                        response[j].startdate = moment(response[j].startdate).format('YYYY-MM-DD');
                    }

                    if(response[j].nowdate !== null && response[j].nowdate !== ""){
                        response[j].nowdate = moment(response[j].nowdate).format('YYYY-MM-DD');
                    }

                    if (response[j].phase !== null && response[j].phase !== "") {
                        let letPhase = getDictionaryInfo(response[j].phase);
                        if (letPhase != null) {
                            response[j].phase = letPhase.value1;
                        }
                    }
                    if (response[j].phasestatus !== null && response[j].phasestatus !== "") {
                        if(response[j].phasestatus === "0") {
                            response[j].phasestatus = this.phasestatus0
                        }else {
                            response[j].phasestatus = this.phasestatus1
                        }
                    }
                    if (response[j].contractstatus !== null && response[j].contractstatus !== "") {
                        if(response[j].contractstatus === "0") {
                            response[j].contractstatus = this.contractstatus0
                        }else if(response[j].contractstatus === "1"){
                            response[j].contractstatus = this.contractstatus1
                        }else {
                            response[j].contractstatus = this.contractstatus2
                        }
                    }
                    response[j] .status = getStatus(response[j] .status);
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
          });

        this.$store
          .dispatch('PFANS5013Store/getList2', {flag: "1"})
          .then(response => {
            if (response.length > 0) {
                for (let j = 0; j < response.length; j++) {

                    if(response[j].leaderid !== null && response[j].leaderid !== ""){
                        let letUser = getUserInfo(response[j].leaderid);
                        if (letUser != null) {
                            response[j].leaderid = letUser.userinfo.customername;
                        }
                    }

                    if(response[j].startdate !== null && response[j].startdate !== ""){
                        response[j].startdate = moment(response[j].startdate).format('YYYY-MM-DD');
                    }

                    if(response[j].nowdate !== null && response[j].nowdate !== ""){
                        response[j].nowdate = moment(response[j].nowdate).format('YYYY-MM-DD');
                    }

                    if (response[j].phase !== null && response[j].phase !== "") {
                        let letPhase = getDictionaryInfo(response[j].phase);
                        if (letPhase != null) {
                            response[j].phase = letPhase.value1;
                        }
                    }
                    if (response[j].phasestatus !== null && response[j].phasestatus !== "") {
                        if(response[j].phasestatus === "0") {
                            response[j].phasestatus = this.phasestatus0
                        }else {
                            response[j].phasestatus = this.phasestatus1
                        }
                    }
                    if (response[j].contractstatus !== null && response[j].contractstatus !== "") {
                        if(response[j].contractstatus === "0") {
                            response[j].contractstatus = this.contractstatus0
                        }else if(response[j].contractstatus === "1"){
                            response[j].contractstatus = this.contractstatus1
                        }else {
                            response[j].contractstatus = this.contractstatus2
                        }
                    }
                    response[j] .status = getStatus(response[j] .status);
                }
            }

            this.data2 = response;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },
      methods: {
        changed() {
          if (this.region === '2') {
            this.showTable1 = false;
          } else if (this.region === '1') {
            this.showTable1 = true;
          }
        },
        rowClick(row) {
          this.rowid = row.comproject_id;
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
              name: 'PFANS5014FormView',
              params: {
                _id: this.rowid,
                disabled: true,
                _region:this.region,
              }
            })
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
              name: 'PFANS5014FormView',
              params: {
                _id: this.rowid,
                  _flg:'1',
                disabled: false,
                _region:this.region,
              }
            })
          }

        }
      }
    }
</script>

<style scoped>

</style>
