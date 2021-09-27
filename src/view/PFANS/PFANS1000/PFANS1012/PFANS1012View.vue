<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :showSelection="isShow"
                   :title="title" @buttonClick="buttonClick" :selectable="selectInit"
                   @rowClick="rowClick" ref="roletable" v-loading="loading">
  </EasyNormalTable>

</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import {getDepartmentById, getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';
    import moment from 'moment';

    const {Parser} = require('json2csv');
    export default {
        name: 'PFANS1012View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                optations: [],
                totalcostvalue: [],
                selectedlist: [],
                selectedList: [],
                startoption: [],
                startoptionvalue: [],
                loading: false,
                title: 'title.PFANS1012VIEW',
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'invoiceno',
                        label: 'label.PFANS1013VIEW_REIMNUMBER',
                        width: 130,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 100,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'moneys',
                        label: 'label.PFANS1012VIEW_MONEY',
                        width: 110,
                        fix: false,
                        filter: false,
                    },
                    {
                      code: 'foreigncurrencytemp',
                      label: 'label.PFANS1013VIEW_CURRENCY',
                      width: 110,
                      fix: false,
                      filter: false,
                    },
                  //region add_qhr_20210810  一览加入项目名称列
                    {
                      code: 'projectname',
                      label: 'label.PFANS5004VIEW_PROJECTNAMW',
                      width: 180,
                      fix: false,
                      filter: false,
                    },
                  //endregion add_qhr_20210810  一览加入项目名称列
                    {
                        code: 'remark',
                        label: 'label.PFANS1012VIEW_ABSTRACT',
                        width: 330,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 120,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'modifyon',
                        label: 'label.PFANS1030FORMVIEW_TIEEEND',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'processingstatus',
                        label: 'label.status',
                        width: 130,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'expectedpaydate',
                        label: 'label.PFANS1012VIEW_EXPECTEDPAYDATE',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'moduleid',
                        label: 'label.PFANS1012VIEW_MODULE',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    //ADD-WS-4/27-精算类型添加
                    {
                        code: 'type',
                        label: 'label.PFANS1012VIEW_TYPECHECK',
                        width: 130,
                        fix: false,
                        filter: true,
                    },
                    //ADD-WS-4/27-精算类型添加
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
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                    {
                        'key': 'export',
                        'name': 'label.PFANS1012VIEW_EXPORTCSV',
                        'disabled': false,
                        icon: 'el-icon-upload2',
                    },
                    {
                        'key': 'export1',
                        'name': 'button.printing',
                        'disabled': false,
                        icon: 'el-icon-upload2',
                    },
                ],
                rowid: '',
                row_id: 'publicexpenseid',
                isShow: true,
                // add-ws-8/20-禅道469
                statuss: '',
                // add-ws-8/20-禅道469
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1012Store/get', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].user_id !== null && response[j].user_id !== '') {
                            let rst = getUserInfo(response[j].user_id);
                            let nameflg = getOrgInfoByUserId(response[j].user_id);
                            if (nameflg) {
                                response[j].center_name = nameflg.centerNmae;
                                // response[j].group_name = nameflg.groupNmae;
                                response[j].team_name = nameflg.teamNmae;
                            }
                            if (response[j].groupid !== null && response[j].groupid !== '' && response[j].groupid !== undefined) {
                                response[j].group_name = getDepartmentById(response[j].groupid);
                            }
                            if (rst) {
                                response[j].user_id = rst.userinfo.customername;
                            }
                            //add_fjl_0928  添加外币的场合 币种+外币金额 start
                            if (response[j].currency !== null && response[j].currency !== '') {
                              response[j].foreigncurrencytemp = response[j].currency;
                              response[j].moneys = response[j].foreigncurrency;
                            }
                            else
                            {
                              response[j].foreigncurrencytemp = this.$t('label.PFANS1012VIEW_RMB');
                            }
                            //add_fjl_0928  添加外币的场合 币种+外币金额 end
                            //ADD-WS-4/27-精算类型添加
                            if (response[j].type !== null && response[j].type !== '') {
                                if (response[j].type === 'PJ001001') {
                                    if (this.$i18n) {
                                        response[j].type = this.$t('label.PFANS1012VIEW_TYPECHECKJT');
                                    }
                                } else if (response[j].type === 'PJ001002') {
                                    if (this.$i18n) {
                                        response[j].type = this.$t('label.PFANS1012VIEW_TYPECHECKQQ');
                                    }
                                }
                            }
                            if (response[j].expectedpaydate !== null && response[j].expectedpaydate !== '') {
                                response[j].expectedpaydate = moment(response[j].expectedpaydate).format('YYYY-MM-DD');
                            }
                            //ADD-WS-4/27-精算类型添加
                            if (response[j].status != '0') {
                                if (response[j].modifyon !== null && response[j].modifyon !== '') {
                                    response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
                                }
                            } else {
                                response[j].modifyon = null;
                            }
                            if (response[j].status !== null && response[j].status !== '') {
                                response[j].status = getStatus(response[j].status);
                            }
                            if (response[j].budgetunit !== null && response[j].budgetunit !== '') {
                                let letbudge = getDictionaryInfo(response[j].budgetunit);
                                if (letbudge) {
                                    response[j].budgetunit = letbudge.value1;
                                }
                            }
                            if (response[j].moduleid !== null && response[j].moduleid !== '') {
                                let letbudge = getDictionaryInfo(response[j].moduleid);
                                if (letbudge) {
                                    response[j].moduleid = letbudge.value1;
                                }
                            }
                            // add-ws-8/12-禅道任务446
                            if (response[j].processingstatus != null && response[j].processingstatus != '') {
                                if (this.$i18n) {
                                    if (response[j].processingstatus === '0') {
                                        response[j].processingstatus = this.$t('label.PFANS1006FORMVIEW_OPTIONS1');
                                    } else if (response[j].processingstatus === '1') {
                                        response[j].processingstatus = this.$t('label.PFANS1006FORMVIEW_OPTIONS2');
                                    }
                                }
                            }
                            // add-ws-8/12-禅道任务446
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
        methods: {
            //ADD_FJL
            selectInit(row, index) {
                if (row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
                    return row;
                }
            },
            //ADD_FJL
            rowClick(row) {
                // add-ws-8/20-禅道469
                this.statuss = row.status;
                // add-ws-8/20-禅道469
                this.rowid = row.publicexpenseid;
            },
            MyBrowserIsIE() {
                let isIE = false;
                if (
                    navigator.userAgent.indexOf('compatible') > -1 &&
                    navigator.userAgent.indexOf('MSIE') > -1
                ) {
                    // ie浏览器
                    isIE = true;
                }
                if (navigator.userAgent.indexOf('Trident') > -1) {
                    // edge 浏览器
                    isIE = true;
                }
                return isIE;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                }));
            },
            export1(val) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1012Store/exportjs', {publicexpenseid: this.$refs.roletable.selectedList[val].publicexpenseid})
                    .then(response => {
                        this.loading = false;
                        if (val < this.$refs.roletable.selectedList.length - 1) {
                            val = val + 1;
                            this.export1(val);
                        }
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
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', '');
                //ADD_FJL_0906  添加workfolwurl start
                this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1012View');
                //ADD_FJL_0906  添加workfolwurl end
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
                        name: 'PFANS1012FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false,
                            //add-ws-8/19-禅道458任务修正
                            _workfliw: true,
                            //add-ws-8/19-禅道458任务修正
                        },
                    });
                } else if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS1012PointFormView',
                        params: {
                            _id: '',
                            disabled: true,
                        },
                    });

                } else if (val === 'export') {
                    this.startoptionvalue = [];
                    this.totalcostvalue = [];
                    this.startoption = [];
                    this.selectedList = {};
                    this.selectedList.totalcost = [];
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    //DEL_FJL
                    // else if(this.$refs.roletable.selectedList.length > 0){
                    //   for(let i = 0; i < this.$refs.roletable.selectedList.length; i++){
                    //     if(this.$refs.roletable.selectedList[i].status !== this.$t("label.PFANS5004VIEW_OVERTIME")){
                    //       Message({
                    //         message: this.$t('label.PFANS1013VIEW_EXPORTERRINFO'),
                    //         type: 'error',
                    //         duration: 2 * 1000
                    //       });
                    //       return;
                    //     }
                    //   }
                    // }
                    //DEL_FJL
                    this.selectedlist = this.$refs.roletable.selectedList;
                    for (let m = 0; m < this.selectedlist.length; m++) {
                        if (this.selectedlist[m].moduleid === 'GL' || this.selectedlist[m].moduleid === 'PJ002002') {
                            Message({
                                message: this.$t('label.PFANS1012VIEW_GL'),
                                type: 'info',
                                duration: 2 * 1000,
                            });
                            return;
                        }
                    }
                    for (let i = 0; i < this.selectedlist.length; i++) {
                        this.selectedList.totalcost.push({
                            publicexpenseid: this.selectedlist[i].publicexpenseid,
                        });
                    }
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS1012Store/gettotalcost', this.selectedList)
                        .then(response => {
                            let error = 0;
                            for (let k = 0; k < response.length; k++) {
                                for (let n = 1; n < response.length; n++) {
                                    if (response[k].currency != response[n].currency) {
                                        error = error + 1;
                                        Message({
                                            message: this.$t('label.PFANS1002FORMVIEW_CURRENCYCHECK'),
                                            type: 'error',
                                            duration: 5 * 1000,
                                        });
                                    }
                                    break;
                                }
                                break;
                            }
                            //PSDCD_PFANS_20210519_BUG_006 修改供应商编码 供应商地点错误 fr
                            if (error == 0) {
                                this.selectedlist = this.$refs.roletable.selectedList;
                                let sum = 0;
                                let invoiceamountvalue = 0;
                                for (let m = 0; m < response.length; m++) {
                                    sum = sum + 1;
                                    for (let i = 0; i < this.selectedlist.length; i++) {
                                        if (response[m].publicexpenseid == this.selectedlist[i].publicexpenseid) {
                                            let letErrortype = getDictionaryInfo(this.selectedlist[i].paymentmethod);
                                            if (letErrortype != null) {
                                                this.selectedlist[i].paymentmethod = letErrortype.value1;
                                                if (this.selectedlist[i].paymentmethod === this.$t('label.PFANS1012VIEW_ONLINEPAYMENT') || this.selectedlist[i].paymentmethod === this.$t('label.PFANS1012VIEW_TRANSFERCHECK')) {
                                                    this.selectedlist[i].paymentmethod = this.$t('label.PFANS1012VIEW_COST');
                                                } else if (this.selectedlist[i].paymentmethod === this.$t('label.PFANS1012VIEW_PPAYMENT')) {
                                                    this.selectedlist[i].paymentmethod = this.$t('label.PFANS1012VIEW_OFFICE');
                                                } else if (this.selectedlist[i].paymentmethod === '') {
                                                  this.selectedlist[i].paymentmethod = '';
                                                }
                                                if (this.selectedlist[i].loantype != '' && this.selectedlist[i].loantype != null && this.selectedlist[i].loantype != undefined) {
                                                  let lype = this.selectedlist[i].loantype.split(',')[0];
                                                  if(lype === '0'){
                                                    this.selectedlist[i].paymentmethod = this.$t('label.PFANS1012VIEW_OFFICE');
                                                  }else if(lype === '1'){
                                                    this.selectedlist[i].paymentmethod = this.$t('label.PFANS1012VIEW_COST');
                                                  }
                                                }
                                            }
                                            if(response[m].vendorcode == '' || response[m].vendorcode == null || response[m].vendorcode == undefined){
                                              response[m].vendorcode = this.selectedlist[i].loantype.split(',')[1];
                                            }
                                            if (response[m].invoicedate !== null && response[m].invoicedate !== '') {
                                                let date;
                                                let invoiceDate = moment(response[m].invoicedate).format('MM');
                                                if (invoiceDate == '01') {
                                                    date = 'JAN';
                                                } else if (invoiceDate == '02') {
                                                    date = 'FEB';
                                                } else if (invoiceDate == '03') {
                                                    date = 'MAR';
                                                } else if (invoiceDate == '04') {
                                                    date = 'APR';
                                                } else if (invoiceDate == '05') {
                                                    date = 'MAY';
                                                } else if (invoiceDate == '06') {
                                                    date = 'JUN';
                                                } else if (invoiceDate == '07') {
                                                    date = 'JUL';
                                                } else if (invoiceDate == '08') {
                                                    date = 'AUG';
                                                } else if (invoiceDate == '09') {
                                                    date = 'SEP';
                                                } else if (invoiceDate == '10') {
                                                    date = 'OCT';
                                                } else if (invoiceDate == '11') {
                                                    date = 'NOV';
                                                } else if (invoiceDate == '12') {
                                                    date = 'DEC';
                                                }
                                                let invoiceDat = moment(response[m].invoicedate).format('DD');
                                                let invoicedat = moment(response[m].invoicedate).format('YYYY');
                                                response[m].invoicedate = invoiceDat + date + invoicedat;
                                            }
                                            if (response[m].conditiondate !== null && response[m].conditiondate !== '') {
                                                let Date;
                                                let conditionDate = moment(response[m].conditiondate).format('MM');
                                                if (conditionDate == '01') {
                                                    Date = 'JAN';
                                                } else if (conditionDate == '02') {
                                                    Date = 'FEB';
                                                } else if (conditionDate == '03') {
                                                    Date = 'MAR';
                                                } else if (conditionDate == '04') {
                                                    Date = 'APR';
                                                } else if (conditionDate == '05') {
                                                    Date = 'MAY';
                                                } else if (conditionDate == '06') {
                                                    Date = 'JUN';
                                                } else if (conditionDate == '07') {
                                                    Date = 'JUL';
                                                } else if (conditionDate == '08') {
                                                    Date = 'AUG';
                                                } else if (conditionDate == '09') {
                                                    Date = 'SEP';
                                                } else if (conditionDate == '10') {
                                                    Date = 'OCT';
                                                } else if (conditionDate == '11') {
                                                    Date = 'NOV';
                                                } else if (conditionDate == '12') {
                                                    Date = 'DEC';
                                                }
                                                let conditionDat = moment(response[m].invoicedate).format('DD');
                                                let conditiondat = moment(response[m].invoicedate).format('YYYY');
                                                response[m].conditiondate = conditionDat + Date + conditiondat;
                                            }
                                            if (response[m].subjectnumber != '' && response[m].subjectnumber != null) {
                                                response[m].subjectnumber = response[m].subjectnumber.replace('-0', '0');
                                                response[m].subjectnumber = response[m].subjectnumber.replace('0-', '0');
                                                response[m].subjectnumber = response[m].subjectnumber.replace('-A', 'A');
                                            }
                                            if (response[m].budgetcoding != '' && response[m].budgetcoding != null) {
                                                let letbudge = getDictionaryInfo(response[m].budgetcoding);
                                                if (letbudge) {
                                                    response[m].budgetcoding = letbudge.value2;
                                                }
                                            }
                                            invoiceamountvalue += parseFloat(response[m].lineamount);
                                            this.totalcostvalue.push({
                                                invoicenumber: response[m].invoicenumber,
                                                number: response[m].number,
                                                invoicetype: 'STANDARD',
                                                rowtype: 'ITEM',
                                                invoicedate: response[m].invoicedate,
                                                conditiondate: response[m].conditiondate,
                                                vendorcode: response[m].vendorcode,
                                                paymentmethod: this.selectedlist[i].paymentmethod,
                                                currency: response[m].currency,
                                                invoiceamount: response[m].invoiceamount,
                                                lineamount: parseFloat(response[m].lineamount).toFixed(2),
                                                currencyrate: response[m].exchangerate,
                                                companysegment: '01',
                                                budgetcoding: response[m].budgetcoding,
                                                subjectnumber: response[m].subjectnumber,
                                                productsegment: '00000',
                                                vatnumber: '',
                                                taxCode: '0%',
                                                paymentterms: '00/00/00',
                                                remark: response[m].remark,
                                                source: 'OPEN_IF',
                                                paymentmethods: 'WIRE',
                                                type: ',',
                                            });
                                        }
                                    }
                                }
                                this.startoption.push({
                                    invoicenumber: 'LAST',
                                    number: '9999',
                                    invoicetype: '',
                                    rowtype: '',
                                    invoicedate: '',
                                    conditiondate: '',
                                    vendorcode: '',
                                    paymentmethod: '',
                                    currency: '',
                                    invoiceamount: sum + 1,
                                    lineamount: invoiceamountvalue.toFixed(2),
                                    currencyrate: '',
                                    companysegment: '',
                                    budgetcoding: '',
                                    subjectnumber: '',
                                    productsegment: '',
                                    vatnumber: '',
                                    taxCode: '',
                                    paymentterms: '',
                                    remark: '',
                                    source: '',
                                    paymentmethods: '',
                                    type: '',
                                });
                                this.startoptionvalue = this.totalcostvalue.concat(this.startoption);
                                let csvData = [];
                                for (let i = 0; i < this.startoptionvalue.length; i++) {
                                    let obj = this.startoptionvalue[i];
                                    obj.vendorcode = '\t' + obj.vendorcode;
                                  //PSDCD_PFANS_20210519_BUG_006 修改供应商编码 供应商地点错误 to
                                    csvData.push({
                                        invoicenumber: obj.invoicenumber,
                                        number: obj.number,
                                        invoicetype: obj.invoicetype,
                                        rowtype: obj.rowtype,
                                        invoicedate: obj.invoicedate,
                                        conditiondate: obj.conditiondate,
                                        vendorcode: obj.vendorcode,
                                        paymentmethod: obj.paymentmethod,
                                        currency: obj.currency,
                                        invoiceamount: obj.invoiceamount,
                                        lineamount: obj.lineamount,
                                        currencyrate: obj.currencyrate,
                                        companysegment: obj.companysegment,
                                        budgetcoding: obj.budgetcoding,
                                        subjectnumber: obj.subjectnumber,
                                        productsegment: obj.productsegment,
                                        vatnumber: obj.vatnumber,
                                        taxCode: obj.taxCode,
                                        paymentterms: obj.paymentterms,
                                        remark: obj.remark,
                                        source: obj.source,
                                        paymentmethods: obj.paymentmethods,
                                        type: obj.type,
                                    });
                                }
                                let filterVal = ['invoicenumber', 'number', 'invoicetype', 'rowtype', 'invoicedate', 'conditiondate', 'vendorcode', 'paymentmethod', 'currency',
                                    'invoiceamount', 'lineamount', 'currencyrate', 'companysegment', 'budgetcoding', 'subjectnumber',
                                    , 'productsegment', 'vatnumber', 'taxCode', 'paymentterms', 'remark', 'source', 'paymentmethods', 'type'];
                                const parser = new Parser({header: false});
                                const result = parser.parse(csvData);
                                let aaa = result.replace(new RegExp('"', 'gm'), '');
                                let ccc = encodeURI(aaa);
                                let ddd = ccc.replace(new RegExp('%0A', 'gm'), '%0D%0A');
                                let eee = ddd + '%0D%0A';
                                let csvContent = 'data:text/csv;charset=utf-8,\ufeff' + eee;
                                const link = document.createElement('a');
                                link.href = csvContent;
                                link.download = this.$t('AP') + this.$t('title.PFANS1012VIEW') + '.csv';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);


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
                } else if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1012FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true,
                            // add-ws-8/20-禅道469
                            _statuss: this.statuss,
                            // add-ws-8/20-禅道469
                            //add-ws-8/19-禅道458任务修正
                            _workfliw: true,
                            //add-ws-8/19-禅道458任务修正
                        },
                    });
                } else if (val === 'export1') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.selectedlist = this.$refs.roletable.selectedList;
                    this.export1(0);

                }
            },
        },
    };
</script>

<style scoped>

</style>


