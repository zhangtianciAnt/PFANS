  <template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowClassName="rowClassName"
                   :showSelection="isShow" ref="roletable" :selectable="selectInit">
  </EasyNormalTable>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getOrgInfoByUserId,getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize'

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
                isShow: true,
                columns: [
                  {
                    code: 'purnumbers',
                    label: 'label.PFANS3005VIEW_NUMBERS',
                    width: 150,
                    fix: false,
                    filter: false
                  },
                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'application_date',
                        label: 'label.application_date',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'linenumber',
                        label: 'label.PFANS3005VIEW_LINENUMBER',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'setplace',
                        label: 'label.PFANS3005VIEW_SETPLACE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'controller',
                        label: 'label.PFANS3005VIEW_CONTROLLER',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'username',
                        label: 'label.PFANS3005VIEW_USER',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                  // ccm 使用期限
                  {
                    code: 'usertime',
                    label: 'label.PFANS3005VIEW_TIME',
                    width: 150,
                    fix: false,
                    filter: false
                  },
                  // ccm 使用期限
                    {
                        code: 'budgetnumber',
                        label: 'label.budgetunit',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'careerplan',
                        label: 'label.PFANS3005FORMVIEW_CAREERPLAN',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'businessplanamount',
                        label: 'label.PFANS3005VIEW_BUSINESSPLANAMOUNT',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'purchasepurpose',
                        label: 'label.PFANS3005VIEW_PURCHASEPURPOSE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'procurementproject',
                        label: 'label.PFANS3005VIEW_PROCUREMENTPROJECT',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'procurementdetails',
                        label: 'label.PFANS3005VIEW_PROCUREMENTDETAILS_NAME',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'remarks',
                        label: 'label.remarks',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'brandname',
                        label: 'label.PFANS3005VIEW_BRANDNAME',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'model',
                        label: 'label.PFANS3005VIEW_MODEL',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'equipmenturl',
                        label: 'label.PFANS3005VIEW_EQUIPMENTURL',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'quantity',
                        label: 'label.PFANS3005VIEW_QUANTITY',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'unitprice',
                        label: 'label.PFANS3005VIEW_UNITPRICE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'totalamount',
                        label: 'label.PFANS3005VIEW_TOTALAMOUNT',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'storagedate',
                        label: 'label.PFANS3005VIEW_STORAGEDATE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'collectionday',
                        label: 'label.PFANS3005VIEW_COLLECTIONDAY',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'recipients',
                        label: 'label.PFANS3005VIEW_RECIPIENTS',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'actuarialdate',
                        label: 'label.PFANS3005VIEW_ACTUARIALDATE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'actuarialamount',
                        label: 'label.PFANS3005VIEW_ACTUARIALAMOUNT',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'acceptstatus',
                        label: 'label.PFANS3001FORMVIEW_ACCEPTSTATUS',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'findate',
                        label: 'label.PFANS3006VIEW_ACCEPTTIME',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'refusereason',
                        label: 'label.PFANS3007FORMVIEW_REFUSEREASON',
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
                    // {'key': 'conapp', 'name': 'button.conapp', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-edit-outline'},
                    {
                        'key': 'temLoanApp',
                        'name': 'button.temLoanApp',
                        'disabled': true,
                        'icon': 'el-icon-plus',
                    },
                ],
                rowid: '',
                row: 'purchase_id',
            }
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS3005Store/getPurchase')
                .then(response => {
                    if(response.length > 0){
                        let now = new Date();
                        now = moment(now.setMonth(now.getMonth() + 6)).format("YYYY-MM-DD");
                        let application_date = moment(response[0].application_date).format("YYYY-MM-DD");
                        if(application_date > now){
                            this.buttonList[1].disabled = true;
                        }
                    }
                    for (let j = 0; j < response.length; j++) {
                        let lst = getOrgInfoByUserId(response[j].user_id);
                        response[j].center_id = lst.centerNmae;
                        response[j].group_id = lst.groupNmae;
                        response[j].team_id = lst.teamNmae;
                        if (response[j].procurementproject !== null && response[j].procurementproject !== "") {
                            let procurement = getDictionaryInfo(response[j].procurementproject);
                            if (procurement != null) {
                                response[j].procurementproject = procurement.value1;
                            }
                        }
                        if (response[j].budgetnumber !== null && response[j].budgetnumber !== "") {
                            let procurement = getDictionaryInfo(response[j].budgetnumber);
                            if (procurement != null) {
                                response[j].budgetnumber = procurement.value1;
                            }
                        }
                        if (response[j].application_date !== null && response[j].application_date !== "") {
                            response[j].application_date = moment(response[j].application_date).format("YYYY-MM-DD");
                        }
                        if (response[j].storagedate !== null && response[j].storagedate !== "") {
                            response[j].storagedate = moment(response[j].storagedate).format("YYYY-MM-DD");
                        }
                        if (response[j].collectionday !== null && response[j].collectionday !== "") {
                            response[j].collectionday = moment(response[j].collectionday).format("YYYY-MM-DD");
                        }
                        if (response[j].actuarialdate !== null && response[j].actuarialdate !== "") {
                            response[j].actuarialdate = moment(response[j].actuarialdate).format("YYYY-MM-DD");
                        }
                        let controller = getUserInfo(response[j].controller);
                        if(controller)
                        {
                            response[j].controller = getUserInfo(response[j].controller).userinfo.customername;
                        }
                        let username = getUserInfo(response[j].username);
                        if(username)
                        {
                            response[j].username = getUserInfo(response[j].username).userinfo.customername;
                        }
                        let recipients = getUserInfo(response[j].recipients);
                        if(recipients)
                        {
                            response[j].recipients = getUserInfo(response[j].recipients).userinfo.customername;
                        }
                        let user = getUserInfo(response[j].user_id);
                        if(user)
                        {
                            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                        }
                        response[j].status = getStatus(response[j].status);
                        if (response[j].implement_date !== null && response[j].implement_date !== '') {
                            response[j].implement_date = moment(response[j].implement_date).format('YYYY-MM-DD')
                        }
                        if(response[j].careerplan === "1"){

                            if (this.$i18n) {
                                response[j].careerplan = this.$t('label.PFANS1004VIEW_INSIDE');
                            }
                        }
                        else{
                            if (this.$i18n) {
                                response[j].careerplan = this.$t('label.PFANS1004VIEW_OUTER');
                            }
                        }
                        // ADD_FJL   (受理状态)
                        if (response[j].acceptstatus !== null && response[j].acceptstatus !== "") {
                            if (this.$i18n) {
                                if (response[j].acceptstatus === '0') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_ACCEPT');
                                } else if (response[j].acceptstatus === '1') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_REFUSE');
                                } else if (response[j].acceptstatus === '2') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                                }
                            }
                        }
                        // ADD_FJL   (受理时间)
                        if (response[j].findate !== null && response[j].findate !== "") {
                            response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
                        }
                    }
                    this.data = response;
                    this.loading = false
                })
                .catch(error => {
                    Message({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    this.loading = false
                })
        },
        methods: {
          selectInit(row, index) {
            if(row.acceptstatus ==='完成' && row.actuarialamount!= '0')
            {
              return row.status === this.$t("label.PFANS5004VIEW_OVERTIME");
            }
          },
            //add_fjl_05/19  --设置受理状态和审批状态改变行的背景色
            rowClassName({row, rowIndex}) {
                if (row.acceptstatus === this.$t('label.PFANS3006VIEW_REFUSE') || row.status === this.$t('label.node_step2')) {
                    return 'sub_bg_color_lightgray';
                }
                if (row.acceptstatus === this.$t('label.PFANS3006VIEW_CARRYOUT')) {
                    return 'sub_bg_color_lightblue';
                }
            },
            //add_fjl_05/19  --设置受理状态和审批状态改变行的背景色
            rowClick(row) {
                this.rowid = row.purchase_id
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
                        return
                    }
                    this.$router.push({
                        name: 'PFANS3005FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3005FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                }
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return
                    }
                    this.$router.push({
                        name: 'PFANS3005FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
              if (val === 'export') {
                if(this.$refs.roletable.selectedList.length === 0){
                  Message({
                    message: this.$t('normal.info_01'),
                    type: 'info',
                    duration: 2 * 1000
                  });
                  return;
                }
                this.selectedlist = this.$refs.roletable.selectedList;
                this.export1(this.selectedlist);
                // import('@/vendor/Export2Excel').then(excel => {
                //   const tHeader = [
                //     this.$t('label.PFANS3005VIEW_NUMBERS'),
                //     this.$t('label.application_date'),
                //     this.$t('label.PFANS2006VIEW_CLUB'),
                //     this.$t('label.applicant'),
                //     this.$t('label.PFANS3005VIEW_SETPLACE'),
                //     this.$t('label.PFANS3005VIEW_CONTROLLER'),
                //     this.$t('label.PFANS3005VIEW_USER'),
                //     this.$t('label.PFANS3005VIEW_PROCUREMENTPROJECT'),
                //     this.$t('label.PFANS3005VIEW_PROCUREMENTDETAILS'),
                //     this.$t('label.remarks'),
                //     this.$t('label.PFANS3005VIEW_QUANTITY'),
                //     this.$t('label.PFANS3005VIEW_UNITPRICE'),
                //     this.$t('label.PFANS3005VIEW_TOTALAMOUNT'),
                //     this.$t('label.PFANS3005VIEW_STORAGEDATE'),
                //     this.$t('label.PFANS3005VIEW_COLLECTIONDAY'),
                //     this.$t('label.PFANS3005VIEW_STORAGENAME'),
                //     this.$t('label.PFANS3005VIEW_RECIPIENTSNAME'),
                //     this.$t('label.PFANS3005VIEW_ACTUARIALAMOUNT'),
                //     this.$t('label.PFANS1008FORMVIEW_ASSETMANAGEMENTNUMBER'),
                //     this.$t('label.PFANS3005VIEW_ACCEPTANCEDATE'),
                //     this.$t('label.PFANS3005VIEW_ACCEPTANCENAME')
                //   ];
                //   const filterVal = [
                //     'purnumbers',
                //     'application_date',
                //     'group_id',
                //     'user_id',
                //     'setplace',
                //     'controller',
                //     'username',
                //     'procurementproject',
                //     'procurementdetails',
                //     'remarks',
                //     'quantity',
                //     'unitprice',
                //     'totalamount',
                //     'storagedate',
                //     'collectionday',
                //     '',
                //     '',
                //     'actuarialamount',
                //     '',
                //     '',
                //     ''
                //   ];
                //   const list = this.selectedlist;
                //   const data = this.formatJson(filterVal, list);
                //   excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS3005'));
                // })

              }
                //add_fjl_0724   添加跳转申请精算与暂借款  end
                if (val === 'actuarial' || val === 'temLoanApp') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
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
                        this.$router.push({
                            name: 'PFANS1012FormView',
                            params: {
                                _name: optionsSEL,
                                _type: 'PJ001002',
                                disabled: true,
                            },
                        });
                    } else {
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
                    }

                }
                //add_fjl_0724   添加跳转申请精算与暂借款  end
            },
          export1(){
            this.loading = true;
            this.$store
              .dispatch("PFANS3005Store/downLoad", {purchase: this.selectedlist})
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
              })
          },
          // download(data, filename) {
          //   if("msSaveOrOpenBlob" in navigator){
          //     window.navigator.msSaveOrOpenBlob(
          //       new Blob([data],{type: 'application/vnd.ms-excel;charset=utf-8'}),
          //       decodeURI(filename) + ".xlsx"
          //     );
          //   }else {
          //     var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          //     var downloadElement = document.createElement('a');
          //     var href = window.URL.createObjectURL(blob); //创建下载的链接
          //     downloadElement.href = href;
          //     downloadElement.download = decodeURI(filename) + '.xlsx'; //下载后文件名
          //     document.body.appendChild(downloadElement);
          //     downloadElement.click(); //点击下载
          //     document.body.removeChild(downloadElement); //下载完成移除元素
          //     window.URL.revokeObjectURL(href); //释放掉blob对象
          //   }
          // },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => {
              if (j === 'timestamp') {
                return parseTime(v[j])
              } else {
                return v[j]
              }
            }))
          },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
