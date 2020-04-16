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
    <EasyNormalTable :buttonList="buttonList1" :columns="columns1" :data="data2" :rowid="row_id" :title="title2"
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
            checktype:"",
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
                {
                    code: 'numbers',
                    label: 'label.PFANS5009VIEW_PROJECTNO',
                    width: 110,
                    fix: false,
                    filter: true,
                },
              {
                code: 'project_name',
                label: 'label.PFANS5004VIEW_PROJECTNAMW',
                width: 120,
                fix: false,
                filter: true
              },
              /*阶段信息*/
              {
                code: 'phase',
                label: 'label.PFANS5009VIEW_PHASE',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'productstatus',
                label: 'label.PFANS5009VIEW_PRODUCTSTATUS',
                width: 150,
                fix: false,
                filter: true
              },
              {
                code: 'estimatedwork',
                label: 'label.PFANS5009VIEW_ESTIMATEDWORK',
                width: 150,
                fix: false,
                filter: true
              },
              {
                code: 'actualwork',
                label: 'label.PFANS5009VIEW_ACTUALWORK',
                width: 120,
                fix: false,
                filter: true
              },
              /*合同状态*/
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
            columns1:[
                {
                    code: 'numbers',
                    label: 'label.PFANS5009VIEW_PROJECTNO',
                    width: 110,
                    fix: false,
                    filter: true,
                },
              {
                code: 'project_name',
                label: 'label.PFANS5004VIEW_PROJECTNAMW',
                width: 120,
                fix: false,
                filter: true
              },
              /*阶段信息*/
              {
                code: 'phase',
                label: 'label.PFANS5009VIEW_PHASE',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'productstatus',
                label: 'label.PFANS5009VIEW_PRODUCTSTATUS',
                width: 130,
                fix: false,
                filter: true
              },
              {
                code: 'estimatedwork',
                label: 'label.PFANS5009VIEW_ESTIMATEDWORK',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'actualwork',
                label: 'label.PFANS5009VIEW_ACTUALWORK',
                width: 120,
                fix: false,
                filter: true
              },
              /*合同状态*/
              {
                code: 'contractstatus',
                label: 'label.PFANS5009VIEW_STATUS',
                width: 150,
                fix: false,
                filter: true,
              }
            ],
            buttonList: [
              {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
              {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
            ],
            buttonList1: [
              {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
            ],
            rowid: '',
            show: true,
            row_id: 'companyprojects_id'
          }
      },
      mounted() {
        this.checktype = 1;
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getList2', {flag: "0"})
          .then(response => {
            if(response.length > 0) {
                for (let j = 0; j < response.length; j++) {
                  if(response[j].status==='4'){
                      response[j].status = this.$t('label.PFANS5004VIEW_OVERTIME')
                  }else  if(response[j].status==='7'){
                      response[j].status = this.$t('label.node_step4')
                  }else  if(response[j].status==='8'){
                      response[j].status = this.$t('label.node_step2')
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
                        if (response[j].contractstatus === "0") {
                            response[j].contractstatus = this.contractstatus0
                        } else if (response[j].contractstatus === "1") {
                            response[j].contractstatus = this.contractstatus1
                        } else if (response[j].contractstatus === "3") {
                            response[j].contractstatus = this.contractstatus3
                        } else {
                            response[j].contractstatus = this.contractstatus2
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
          });

        this.$store
          .dispatch('PFANS5001Store/getList2', {flag: "1"})
          .then(response => {
            if (response.length > 0) {
                for (let j = 0; j < response.length; j++) {
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
            this.checktype=2
            this.showTable1 = false;
          } else if (this.region === '1') {
            this.checktype=1
            this.showTable1 = true;
          }
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
                duration: 2 * 1000
              });
              return;
            }
            this.$router.push({
              name: 'PFANS5004FormView',
              params: {
                type:this.checktype,
                _id: this.rowid,
                disabled: true
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
              name: 'PFANS5004FormView',
              params: {
                type:this.checktype,
                _id: this.rowid,
                disabled: false
              }
            })
          }

        }
      }
    }
</script>

<style scoped>

</style>
