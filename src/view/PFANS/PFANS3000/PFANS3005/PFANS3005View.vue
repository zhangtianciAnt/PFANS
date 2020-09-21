<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowClassName="rowClassName"
                   :showSelection="isShow" ref="roletable" :selectable="selectInit">
  </EasyNormalTable>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS3005View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS3005VIEW',
        data: [],
        selectedlist: [],
        purchasedetail: [],
        isShow: true,
        columns: [
          {
            code: 'purnumbers',
            label: 'label.PFANS3005VIEW_NUMBERS',
            width: 150,
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
          {
            code: 'acceptstatus',
            label: 'label.PFANS3001FORMVIEW_CHULISTATUS',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'findate',
            label: 'label.PFANS1016FORMVIEW_COMPLETEDATE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'loanapno',
            label: 'label.PFANS1012VIEW_TEMPORARYLOAN',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'application_date',
            label: 'label.application_date',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'procurementdetails',
            label: 'label.PFANS3005VIEW_PROCUREMENTDETAILS_NAME',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'storagedate',
            label: 'label.PFANS3005VIEW_STORAGEDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'collectionday',
            label: 'label.PFANS3005VIEW_COLLECTIONDAY',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'recipients',
            label: 'label.PFANS3005VIEW_RECIPIENTS',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'actuarialdate',
            label: 'label.PFANS3005VIEW_ACTUARIALDATE',
            width: 150,
            fix: false,
              filter: true,
          },
          {
            code: 'actuarialamount',
            label: 'label.PFANS3005VIEW_ACTUARIALAMOUNT',
            width: 150,
            fix: false,
            filter: false,
          },

          {
            code: 'center_id',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'yusuanbuzu',
            label: 'label.PFANS3007FORMVIEW_REFUSEREASON',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'linenumber',
            label: 'label.PFANS3005VIEW_LINENUMBER',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'setplace',
            label: 'label.PFANS3005VIEW_SETPLACE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'controller',
            label: 'label.PFANS3005VIEW_CONTROLLER',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'username',
            label: 'label.PFANS3005VIEW_USER',
            width: 150,
            fix: false,
            filter: false,
          },
          // ccm 使用期限
          {
            code: 'usertime',
            label: 'label.PFANS3005VIEW_TIME',
            width: 150,
            fix: false,
            filter: false,
          },
          // ccm 使用期限
          {
            code: 'budgetnumber',
            label: 'label.budgetunit',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'careerplan',
            label: 'label.PFANS3005FORMVIEW_CAREERPLAN',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'businessplanamount',
              label: 'label.PFANS3005FORMVIEW_CAREERPLANAMOUNT',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'purchasepurpose',
            label: 'label.PFANS3005VIEW_PURCHASEPURPOSE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'procurementproject',
            label: 'label.PFANS3005VIEW_PROCUREMENTPROJECT',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'remarks',
            label: 'label.remarks',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'brandname',
            label: 'label.PFANS3005VIEW_BRANDNAME',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'model',
            label: 'label.PFANS3005VIEW_MODEL',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'equipmenturl',
            label: 'label.PFANS3005VIEW_EQUIPMENTURL',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'quantity',
            label: 'label.PFANS3005VIEW_QUANTITY',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'unitprice',
            label: 'label.PFANS3005VIEW_UNITPRICE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'totalamount',
            label: 'label.PFANS3005VIEW_TOTALAMOUNT',
            width: 150,
            fix: false,
            filter: false,
          },

        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'export', 'name': 'button.generatearticle', 'disabled': false, 'icon': 'el-icon-download'},
          {'key': 'conapp', 'name': 'button.conapp', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-edit-outline'},
          {'key': 'export2', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-edit-outline'},

        ],
        rowid: '',
        row: 'purchase_id',
        caigouhetongTable: [],
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS3005Store/getPurchase')
        .then(response => {
          if (response.length > 0) {
            let now = new Date();
            now = moment(now.setMonth(now.getMonth() + 6)).format('YYYY-MM-DD');
            let application_date = moment(response[0].application_date).format('YYYY-MM-DD');
            if (application_date > now) {
              this.buttonList[1].disabled = true;
            }
          }
          for (let j = 0; j < response.length; j++) {
            let lst = getOrgInfoByUserId(response[j].user_id);
            response[j].group_id1 = response[j].group_id;
            response[j].center_id = lst.centerNmae;
            response[j].group_id = lst.groupNmae;
            response[j].team_id = lst.teamNmae;
            if (response[j].procurementproject !== null && response[j].procurementproject !== '') {
              let procurement = getDictionaryInfo(response[j].procurementproject);
              if (procurement != null) {
                response[j].procurementproject = procurement.value1;
              }
            }
            if (response[j].budgetnumber !== null && response[j].budgetnumber !== '') {
              let procurement = getDictionaryInfo(response[j].budgetnumber);
              if (procurement != null) {
                response[j].budgetnumber = procurement.value1;
              }
            }
            if (response[j].application_date !== null && response[j].application_date !== '') {
              response[j].application_date = moment(response[j].application_date).format('YYYY-MM-DD');
            }
            if (response[j].storagedate !== null && response[j].storagedate !== '') {
              response[j].storagedate = moment(response[j].storagedate).format('YYYY-MM-DD');
            }
            if (response[j].collectionday !== null && response[j].collectionday !== '') {
              response[j].collectionday = moment(response[j].collectionday).format('YYYY-MM-DD');
            }
            if (response[j].actuarialdate !== null && response[j].actuarialdate !== '') {
              response[j].actuarialdate = moment(response[j].actuarialdate).format('YYYY-MM-DD');
            }
            let controller = getUserInfo(response[j].controller);
            if (controller) {
              response[j].controller = getUserInfo(response[j].controller).userinfo.customername;
            }
            let username = getUserInfo(response[j].username);
            if (username) {
              response[j].username = getUserInfo(response[j].username).userinfo.customername;
            }
            let recipients = getUserInfo(response[j].recipients);
            if (recipients) {
              response[j].recipients = getUserInfo(response[j].recipients).userinfo.customername;
            }
            let user = getUserInfo(response[j].user_id);
            if (user) {
              response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
            }
            response[j].status = getStatus(response[j].status);
            if (response[j].implement_date !== null && response[j].implement_date !== '') {
              response[j].implement_date = moment(response[j].implement_date).format('YYYY-MM-DD');
            }
            if (response[j].careerplan === '1') {

              if (this.$i18n) {
                response[j].careerplan = this.$t('label.PFANS1004VIEW_INSIDE');
              }
            } else {
              if (this.$i18n) {
                response[j].careerplan = this.$t('label.PFANS1004VIEW_OUTER');
              }
            }
            // ADD_FJL   (受理状态)
            if (response[j].acceptstatus !== null && response[j].acceptstatus !== "") {
              if (this.$i18n) {
                if (response[j].acceptstatus === '0') {
                  response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                } else if (response[j].acceptstatus === '1') {
                  response[j].acceptstatus = this.$t('label.PFANS3006VIEW_DUIYINGZHONG');
                } else if (response[j].acceptstatus === '2') {
                  response[j].acceptstatus = this.$t('label.PFANS3006VIEW_WEIDUIYING');
                }
              }
            }
            // ADD_FJL   (受理时间)
            if (response[j].findate !== null && response[j].findate !== "") {
              response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
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
    methods: {
      selectInit(row, index) {
        return row.status === this.$t('label.PFANS5004VIEW_OVERTIME');
      },
      //add_fjl_05/19  --设置受理状态和审批状态改变行的背景色
      rowClassName({row, rowIndex}) {
        if (row.acceptstatus === this.$t('label.PFANS3006VIEW_REFUSE') || row.status === this.$t('label.node_step2')) {
          return 'sub_bg_color_lightgray';
        }
        if (row.acceptstatus === this.$t('label.PFANS3006VIEW_CARRYOUT') || row.actuarialdate != null) {
          return 'sub_bg_color_lightblue';
        }
      },
      //add_fjl_05/19  --设置受理状态和审批状态改变行的背景色
      rowClick(row) {
        this.rowid = row.purchase_id;
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
            name: 'PFANS3005FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS3005FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
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
            name: 'PFANS3005FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'export') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.selectedlist = this.$refs.roletable.selectedList;
          this.export1(this.selectedlist);
        }

        if (val === 'export2') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              this.$t('label.application'),//申请日
              this.$t('label.department'),//部门
              this.$t('label.applicant'),//申请者
              this.$t('label.PFANS3005VIEW_LINENUMBER'),//内线号
              this.$t('label.PFANS3005VIEW_SETPLACE'),//放置场所
              this.$t('label.PFANS3005VIEW_CONTROLLER'),//管理者
              this.$t('label.PFANS3005VIEW_USER'),//使用者
              this.$t('label.PFANS1025VIEW_BUDGETCODE'),//预算编码
              this.$t('label.PFANS3005FORMVIEW_CAREERPLAN'),//事业计划内外
              this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE'),//事业计划余额
              this.$t('label.PFANS3005VIEW_PURCHASEPURPOSE'),//购入目的
              this.$t('label.PFANS3005VIEW_PROCUREMENTPROJECT'),//采购目的
              this.$t('label.PFANS3005VIEW_PROCUREMENTDETAILS'),//采购明细
              this.$t('label.remarks'),//备注
              this.$t('label.PFANS3005VIEW_ITEMNAME'),//物品名称
              this.$t('label.PFANS3005VIEW_BRANDNAME'),//品牌名
              this.$t('label.PFANS3005VIEW_MODEL'),//型号
              this.$t('label.PFANS3005VIEW_EQUIPMENTURL'),//设备url
              this.$t('label.PFANS3005VIEW_QUANTITY'),//数量
              this.$t('label.PFANS3005VIEW_UNITPRICE'),//单价
              this.$t('label.PFANS3005VIEW_TOTALAMOUNT'),//总金额
              this.$t('label.PFANS3005VIEW_STORAGEDATE'),//入库日
              this.$t('label.PFANS3005VIEW_COLLECTIONDAY'),//领取日
              this.$t('label.PFANS3005VIEW_RECIPIENTS'),//领取者
              this.$t('label.PFANS3005VIEW_ACTUARIALDATE'),//精算日
              this.$t('label.PFANS3005VIEW_ACTUARIALAMOUNT'),//精算金额
            ];
            const filterVal = [
              'application_date',
              'group_id',
              'user_id',
              'linenumber',
              'setplace',
              'controller',
              'username',
              'budgetnumber',
              'careerplan',
              'businessplanamount',
              'purchasepurpose',
              'procurementproject',
              'procurementdetails',
              'remarks',
              'procurementdetails',
              'brandname',
              'model',
              'equipmenturl',
              'quantity',
              'unitprice',
              'totalamount',
              'storagedate',
              'collectionday',
              'recipients',
              'actuarialdate',
              'actuarialamount',
            ];
            const list = this.selectedlist;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS3005') + '_' + this.$t(moment(new Date()).format('YYYY-MM-DD')));
          });
        }

        //add_fjl_0724   添加跳转申请精算与暂借款  end
        if (val === 'actuarial' || val === 'temLoanApp') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }//add-ws-8/19-禅道470任务
          else {
            let selectedlist = this.$refs.roletable.selectedList;
            let n = 0;
            let checksum = selectedlist.length;
            for (let i = 0; i < selectedlist.length; i++) {
              if (selectedlist[i].loanapno == null || selectedlist[i].loanapno == '') {
                n = n + 1;
              }
            }
            if (n != checksum) {
              if (n != 0) {
                Message({
                  message: this.$t('label.PFANS1001FORMVIEW_CHECKSUM'),
                  type: 'info',
                  duration: 2 * 1000,
                });
                return;
              }
            }
          }
          //add-ws-8/19-禅道470任务
          this.selectedlist = [];
          this.selectedlist = this.$refs.roletable.selectedList;
          let optionsSEL = [];
          let _judgement = '';
          let _judgement_name = '';
          let _judgements_moneys = '';
          let _remarks = '';
          for (let i = 0; i < this.selectedlist.length; i++) {
            let user = getUserInfo(this.selectedlist[i].user_id);
            if (user) {
              this.selectedlist[i].user_id = getUserInfo(this.selectedlist[i].user_id).userinfo.customername;
            }
            var vote = {};
            vote.user_id = this.selectedlist[i].user_id;
            vote.remarks = this.selectedlist[i].purchasepurpose;
            vote.numbers = this.selectedlist[i].purnumbers;
            vote.value = this.selectedlist[i].purchase_id;
            vote.label = this.selectedlist[i].purnumbers;
            vote.judgements_moneys = this.selectedlist[i].totalamount;
            if (this.$i18n) {
              vote.judgements_type = this.$t('label.PFANS1012VIEW_PURCHASSES');
            }
            optionsSEL.push(vote);
            _judgement += this.selectedlist[i].purchase_id + ',';
            _judgement_name += this.selectedlist[i].purnumbers + ',';
            _judgements_moneys += this.selectedlist[i].totalamount + ',';
            _remarks += this.selectedlist[i].purchasepurpose + '^';
          }

          if (val === 'actuarial') {
            //del ccm 0813 决裁到暂借款，精算  check去掉
            // //是否已经精算
            // let str = '';
            // for (let i = 0; i < this.selectedlist.length; i++) {
            //   if (this.selectedlist[i].invoiceno != null && this.selectedlist[i].invoiceno != '' && this.selectedlist[i].invoiceno != undefined) {
            //     str += this.selectedlist[i].purnumbers + ' , ';
            //   }
            // }
            //del ccm 0813 决裁到暂借款，精算  check去掉
            //如果有暂借款，是否是相同的暂借款
            let loan = '';
            let loanmoney = '';
            let k = 0;
            for (let i = 0; i < this.selectedlist.length; i++) {
              // if (k != 0)
              // {
              //   if (this.selectedlist[i].loanapno === gid)
              //   {
              //     continue;
              //   }
              //   else
              //   {
              //     Message({
              //       message: this.$t('label.PFANS3005VIEW_MSG3'),
              //       type: 'info',
              //       duration: 3 * 1000,
              //     });
              //     return
              //   }
              // }
              // k++;
              // gid = this.selectedlist[i].loanapno;
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loan += this.selectedlist[i].loanapplication_id + ',';
              }
            }
            //del ccm 0813 决裁到暂借款，精算  check去掉
            // if (str === '') {
            //del ccm 0813 决裁到暂借款，精算  check去掉
            if (loan != null && loan != '' && loan != undefined) {
              loan = loan.substring(0, loan.length - 1);
              if (loan != null && loan != '' && loan != undefined) {
                this.$router.push({
                  name: 'PFANS1012FormView',
                  params: {
                    _name: optionsSEL,
                    _type: 'PJ001002',
                    _haveLoanapp: loan,
                    disabled: true,
                  },
                });
              } else {
                this.$router.push({
                  name: 'PFANS1012FormView',
                  params: {
                    _name: optionsSEL,
                    _type: 'PJ001002',
                    disabled: true,
                  },
                });
              }
            } else {
              this.$router.push({
                name: 'PFANS1012FormView',
                params: {
                  _name: optionsSEL,
                  _type: 'PJ001002',
                  disabled: true,
                },
              });
            }
            //del ccm 0813 决裁到暂借款，精算  check去掉
            // } else {
            //   Message({
            //     message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + str + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
            //     type: 'info',
            //     duration: 3 * 1000,
            //   });
            //   return
            // }
            //del ccm 0813 决裁到暂借款，精算  check去掉
          } else {
            //暂借款申请
            //del ccm 0813 决裁到暂借款，精算  check去掉
            // //check是否存在暂借款
            // let str = '';
            // for (let i = 0; i < this.selectedlist.length; i++) {
            //   if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
            //     str += this.selectedlist[i].purnumbers + ' , ';
            //   }
            // }
            // if (str === '') {
            //del ccm 0813 决裁到暂借款，精算  check去掉
            this.$router.push({
              name: 'PFANS1006FormView',
              params: {
                _id: '',
                _judgement: _judgement,
                _judgement_name: _judgement_name,
                _judgements_moneys: _judgements_moneys,
                _remarks: _remarks,
                _judgements_type: this.$t('label.PFANS1012VIEW_PURCHASSES'),
                disabled: true,
              },
            });
            //del ccm 0813 决裁到暂借款，精算  check去掉
            // } else {
            //   Message({
            //     message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + str + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
            //     type: 'info',
            //     duration: 3 * 1000,
            //   });
            //   return
            // }
            //del ccm 0813 决裁到暂借款，精算  check去掉
          }
        }
        //add_fjl_0724   添加跳转申请精算与暂借款  end
        if (val === 'conapp') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.selectedlist = [];
          this.selectedlist = this.$refs.roletable.selectedList;
          let purnumberss = '';

          this.caigouhetongTable = [];
          for (let i = 0; i < this.selectedlist.length; i++) {
            let o = [];
            purnumberss += this.selectedlist[i].purnumbers + ',';
            o.purnumbers = this.selectedlist[i].purnumbers;
            o.totalamount = this.selectedlist[i].totalamount;
            this.caigouhetongTable.push(o);
          }
          let gid = '';
          let k = 0;
          for (let i = 0; i < this.selectedlist.length; i++) {
            if (gid != '') {
              if (this.selectedlist[i].group_id === gid) {
                continue;
              } else {
                Message({
                  message: this.$t('label.PFANS3005VIEW_MSG2'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
            }
            k++;
            gid = this.selectedlist[i].group_id;
          }
          //采购合同重复check
          this.$store
            .dispatch('PFANS1026Store/purchaseExistCheck', {'purnumbers': purnumberss})
            .then(response => {
              if (response.length === 0) {
                //合同号申请
                this.$router.push({
                  name: 'PFANS1033FormView',
                  params: {
                    _id: '',
                    _applicantdeptcode: this.selectedlist[0].group_id1,
                    _caigouhetongTable: this.caigouhetongTable,
                    disabled: true,
                  },
                });
              } else {
                let jmsg = '';
                for (let j = 0; j < response.length; j++) {
                  jmsg += response[j].purnumbers + ' , ';
                }
                Message({
                  message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + jmsg + ' ' + this.$t('label.PFANS3005VIEW_MSG1'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
              // if (this.$store.getters.historyUrl) {
              //   this.$router.push(this.$store.getters.historyUrl);
              // }
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
      },
      export1() {
        this.loading = true;
        this.$store
          .dispatch('PFANS3005Store/downLoad', {purchase: this.selectedlist})
          .then(response => {
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
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j]);
            } else {
              return v[j];
            }
          }),
        );
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
