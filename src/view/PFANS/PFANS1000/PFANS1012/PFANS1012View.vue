<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   ref="roletable" :showSelection="isShow"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>

</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize'
    import json2csv from 'json2csv';
    import moment from "moment";

    export default {
        name: "PFANS1012View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                totalcostvalue: [],
                selectedlist: [],
                selectedList: [],
                startoption: [],
                startoptionvalue: [],
                loading: false,
                title: "title.PFANS1012VIEW",
                // 表格数据源
                data: [],
                // 列属性
                columns: [
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 100,
                        fix: false,
                        filter: true,
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
                        code: 'budgetunit',
                        label: 'label.budgetunit',
                        width: 170,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'moneys',
                        label: 'label.PFANS1012VIEW_MONEY',
                        width: 110,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 120,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, "icon": "el-icon-plus"},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'},
                    {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-upload2'}
                ],
                rowid: '',
                row_id: 'publicexpenseid',
                isShow: true,
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS1012Store/get', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].user_id !== null && response[j].user_id !== "") {
                            let rst = getUserInfo(response[j].user_id);
                            if (rst) {
                                response[j].user_id = rst.userinfo.customername;
                            }
                            response[j].center_name = response[j].centerid;
                            response[j].group_name = response[j].centerid;
                            response[j].team_name = response[j].centerid;


                            if (response[j].status !== null && response[j].status !== "") {
                                response[j].status = getStatus(response[j].status);
                            }
                            if (response[j].budgetunit !== null && response[j].budgetunit !== "") {
                                let letbudge = getDictionaryInfo(response[j].budgetunit);
                                if (letbudge) {
                                    response[j].budgetunit = letbudge.value1;
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
                })
        },
        methods: {
            rowClick(row) {
                this.rowid = row.publicexpenseid;
            },
            MyBrowserIsIE() {
                let isIE = false;
                if (
                    navigator.userAgent.indexOf("compatible") > -1 &&
                    navigator.userAgent.indexOf("MSIE") > -1
                ) {
                    // ie浏览器
                    isIE = true;
                }
                if (navigator.userAgent.indexOf("Trident") > -1) {
                    // edge 浏览器
                    isIE = true;
                }
                return isIE;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', '');
                if (val === "view") {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1012FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                } else if (val === "insert") {
                    this.$router.push({
                        name: 'PFANS1012PointFormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                } else if (val === 'export') {
                    this.selectedList = {};
                    this.selectedList.totalcost = [];
                    this.selectedlist = this.$refs.roletable.selectedList;
                    for (let i = 0; i < this.selectedlist.length; i++) {
                        this.selectedList.totalcost.push({
                            publicexpenseid: this.selectedlist[i].publicexpenseid
                        })
                    }
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS1012Store/gettotalcost', this.selectedList)
                        .then(response => {
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
                                            if (this.selectedlist[i].paymentmethod === this.$t("label.PFANS1012VIEW_ONLINEPAYMENT") || this.selectedlist[i].paymentmethod === this.$t("label.PFANS1012VIEW_TRANSFERCHECK")) {
                                                this.selectedlist[i].paymentmethod = this.$t("label.PFANS1012VIEW_COST")
                                            } else if (this.selectedlist[i].paymentmethod === this.$t("label.PFANS1012VIEW_PPAYMENT")) {
                                                this.selectedlist[i].paymentmethod = this.$t("label.PFANS1012VIEW_OFFICE")
                                            } else if (this.selectedlist[i].paymentmethod === '') {
                                                this.selectedlist[i].paymentmethod = ''
                                            }
                                        }
                                        let letError = getDictionaryInfo(this.selectedlist[i].currency);
                                        if (letError.value1 == this.$t("label.PFANS1012VIEW_USD")) {
                                            this.selectedlist[i].currencyrate = letError.value1;
                                            response[m].currency = this.$t("label.PFANS1012FORMVIEW_USDA");
                                        } else if (letError.value1 == null) {
                                            this.selectedlist[i].currencyrate = ''
                                            response[m].currency = this.$t("label.PFANS1012FORMVIEW_CNY");
                                        }
                                        if (response[m].invoicedate !== null && response[m].invoicedate !== "") {
                                            let date;
                                            let invoiceDate = moment(response[m].invoicedate).format("MM");
                                            if (invoiceDate == '01') {
                                                date = 'Jan'
                                            } else if (invoiceDate == '02') {
                                                date = 'Feb'
                                            } else if (invoiceDate == '03') {
                                                date = 'Mar'
                                            } else if (invoiceDate == '04') {
                                                date = 'Apr'
                                            } else if (invoiceDate == '05') {
                                                date = 'May'
                                            } else if (invoiceDate == '06') {
                                                date = 'June'
                                            } else if (invoiceDate == '07') {
                                                date = 'July'
                                            } else if (invoiceDate == '08') {
                                                date = 'Aug'
                                            } else if (invoiceDate == '09') {
                                                date = 'Sept'
                                            } else if (invoiceDate == '10') {
                                                date = 'Oct'
                                            } else if (invoiceDate == '11') {
                                                date = 'Nov'
                                            } else if (invoiceDate == '12') {
                                                date = 'Dec'
                                            }
                                            let invoiceDat = moment(response[m].invoicedate).format("DD");
                                            let invoicedat = moment(response[m].invoicedate).format("YYYY");
                                            response[m].invoicedate = invoiceDat+date+invoicedat;
                                        }
                                        if (response[m].conditiondate !== null && response[m].conditiondate !== "") {
                                            let Date;
                                            let conditionDate = moment(response[m].conditiondate).format("MM");
                                            if (conditionDate == '01') {
                                                Date = 'Jan'
                                            } else if (conditionDate == '02') {
                                                Date = 'Feb'
                                            } else if (conditionDate == '03') {
                                                Date = 'Mar'
                                            } else if (conditionDate == '04') {
                                                Date = 'Apr'
                                            } else if (conditionDate == '05') {
                                                Date = 'May'
                                            } else if (conditionDate == '06') {
                                                Date = 'June'
                                            } else if (conditionDate == '07') {
                                                Date = 'July'
                                            } else if (conditionDate == '08') {
                                                Date = 'Aug'
                                            } else if (conditionDate == '09') {
                                                Date = 'Sept'
                                            } else if (conditionDate == '10') {
                                                Date = 'Oct'
                                            } else if (conditionDate == '11') {
                                                Date = 'Nov'
                                            } else if (conditionDate == '12') {
                                                Date = 'Dec'
                                            }
                                            let conditionDat = moment(response[m].invoicedate).format("DD");
                                            let conditiondat = moment(response[m].invoicedate).format("YYYY");
                                            response[m].conditiondate = conditionDat+Date+conditiondat;
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
                                            lineamount: response[m].lineamount,
                                            currencyrate: this.selectedlist[i].currencyrate,
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
                                        })
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
                                invoiceamount: sum,
                                lineamount: invoiceamountvalue,
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
                            })
                            this.startoptionvalue = this.totalcostvalue.concat(this.startoption);
                            let csvData = [];
                            for (let i = 0; i < this.startoptionvalue.length; i++) {
                                let obj = this.startoptionvalue[i];
                                csvData.push({
                                    [[0]]: obj.invoicenumber,
                                    [[1]]: obj.number,
                                    [[2]]: obj.invoicetype,
                                    [[3]]: obj.rowtype,
                                    [[4]]: obj.invoicedate,
                                    [[5]]: obj.conditiondate,
                                    [[6]]: obj.vendorcode,
                                    [[7]]: obj.paymentmethod,
                                    [[8]]: obj.currency,
                                    [[9]]: obj.invoiceamount,
                                    [[10]]: obj.lineamount,
                                    [[11]]: obj.currencyrate,
                                    [[12]]: obj.companysegment,
                                    [[13]]: obj.budgetcoding,
                                    [[14]]: obj.subjectnumber,
                                    [[15]]: obj.productsegment,
                                    [[16]]: obj.vatnumber,
                                    [[17]]: obj.taxCode,
                                    [[18]]: obj.paymentterms,
                                    [[19]]: obj.remark,
                                    [[20]]: obj.source,
                                    [[21]]: obj.paymentmethods,
                                    [[22]]: obj.type,
                                })
                            }
                            let filterVal = ['invoicenumber', 'number', 'invoicetype', 'rowtype', 'invoicedate', 'conditiondate', 'vendorcode', 'paymentmethod', 'currency',
                                'invoiceamount', 'lineamount', 'currencyrate', 'companysegment', 'budgetcoding', 'subjectnumber',
                                , 'productsegment', 'vatnumber', 'taxCode', 'paymentterms', 'remark', 'source', 'paymentmethods', 'type'];
                            const result = json2csv.parse(csvData, {
                                excelStrings: true
                            });
                            let aaa = result.substring(220);
                            let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + aaa;
                            const link = document.createElement("a");
                            link.href = csvContent;
                            link.download = this.$t('AP') + this.$t('title.PFANS1012VIEW') + '.csv';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
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
                } else if (val === "update") {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS1012FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>


