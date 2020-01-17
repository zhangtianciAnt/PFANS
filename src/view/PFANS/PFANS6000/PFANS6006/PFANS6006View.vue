<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getDictionaryInfo, getUserInfo} from '@/utils/customize';
    import {Message} from 'element-ui';
    import moment from 'moment';

    export default {
        name: "PFANS6006View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: "title.PFANS6006VIEW_TITLE",
                data: [],
                columns: [
                    {
                        label: 'label.PFANS2023FORMVIEW_INTELLIGENCE',
                        child: [
                            {/*NO. */
                                code: 'no',
                                label: 'label.PFANS2006VIEW_NO',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*PJ名 */
                                code: 'project_name',
                                label: 'label.PFANS6007VIEW_PJNAME',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*窓口 */
                                code: 'managerid',
                                label: 'label.PFANS6007VIEW_PSDCDWINDOW',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*BP会社名 */
                                code: 'suppliername',
                                label: 'label.PFANS6007VIEW_BPCLUBNAME',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*BP名前 */
                                code: 'expname',
                                label: 'label.PFANS5001FORMVIEW_BPNAME',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*入场时间 */
                                code: 'admissiontime',
                                label: 'label.PFANS6004FORMVIEW_ADMISSIONTIME',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*退场时间 */
                                code: 'exitime',
                                label: 'label.PFANS6004FORMVIEW_EXITIME',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*作業形態 */
                                code: 'operationform',
                                label: 'label.PFANS6004FORMVIEW_OPERATIONFORM',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*作業分類 */
                                code: 'jobclassification',
                                label: 'label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*配賦対象 */
                                code: 'distributionobj',
                                label: 'label.PFANS6005VIEW_PFDX',
                                width: 150,
                                fix: false,
                                filter: true,
                            },
                            {/*構内対象 */
                                code: 'venuetarget',
                                label: 'label.PFANS6005VIEW_SNDX',
                                width: 150,
                                fix: false,
                                filter: true,
                            }
                        ],
                    },
                    {
                        label: 'label.PFANS6005VIEW_HYZK',
                        child: [
                            {/*1*/
                                code: 'january',
                                label: 'label.January',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*2*/
                                code: 'february',
                                label: 'label.February',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*3*/
                                code: 'march',
                                label: 'label.March',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*4*/
                                code: 'april',
                                label: 'label.April',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*5*/
                                code: 'may',
                                label: 'label.May',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*6*/
                                code: 'june',
                                label: 'label.June',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*7*/
                                code: 'july',
                                label: 'label.July',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*8*/
                                code: 'august',
                                label: 'label.August',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*9*/
                                code: 'september',
                                label: 'label.September',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*10*/
                                code: 'october',
                                label: 'label.October',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*11*/
                                code: 'november',
                                label: 'label.November',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*12*/
                                code: 'december',
                                label: 'label.December',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*勤続月数*/
                                code: 'monthlength',
                                label: 'label.PFANS6005VIEW_KQYS',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*備考*/
                                code: 'remarks',
                                label: 'label.PFANS6007VIEW_REMARKS',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                        ]
                    },
                    {
                        label: 'label.PFANS6004VIEW_EXINTELLIGENCE',
                        child: [
                            {/*所有技術*/
                                code: 'alltechnology',
                                label: 'label.PFANS6004FORMVIEW_ALLTECHNOLOGY',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*現場評価*/
                                code: 'sitevaluation',
                                label: 'label.PFANS6004FORMVIEW_SITEVALUATION',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*退場理由*/
                                code: 'exitreason',
                                label: 'label.PFANS6004FORMVIEW_EXITREASON',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*業務影響*/
                                code: 'businessimpact',
                                label: 'label.PFANS6004FORMVIEW_BUSINESSIMPACT',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                            {/*対策*/
                                code: 'countermeasure',
                                label: 'label.PFANS6004FORMVIEW_COUNTERMEASURE',
                                width: 160,
                                fix: false,
                                filter: true,
                            },
                        ]
                    }
                ],
                buttonList: [
                    {'key': 'save', 'name': 'button.save', 'disabled': false,},
                ],
                form: {
                    window: '',
                    pjname: '',
                    bpname: '',
                    bpcompany: '',
                    admissiontime: '',
                    exitime: '',
                    operationform: '',
                    jobclassification: '',
                    distributionobj: '',
                    venuetarget: '',
                    january: '',
                    february: '',
                    march: '',
                    april: '',
                    may: '',
                    june: '',
                    july: '',
                    august: '',
                    september: '',
                    october: '',
                    november: '',
                    december: '',
                    monthlength: '',
                    remarks: '',
                    alltechnology: '',
                    sitevaluation: '',
                    exitreason: '',
                    businessimpact: '',
                    countermeasure: '',
                },
            };
        },
        methods: {
            getFpans5001List() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS5001Store/getFpans5001List', {})
                    .then(response => {
                        // let _tableList1 = response;
                        // let list = [];
                        // if(this.data.expatriatesinfor_id == _tableList1.bpname){
                        //     for (let i = 0; i < _tableList1.length; i++) {
                        //         if (_tableList1[i].project_name !== null && _tableList1[i].project_name !== "") {
                        //             let project_name = getUserInfo(_tableList1[i].project_name);
                        //             if (project_name) {
                        //                 _tableList1[i].project_name = project_name;
                        //             }
                        //         }
                        //         {
                        //             if (_tableList1[i].managerid !== null && _tableList1[i].managerid !== "") {
                        //                 let managerid = getUserInfo(_tableList1[i].managerid);
                        //                 if (managerid) {
                        //                     _tableList1[i].managerid = managerid;
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
                        // this.data = _tableList1;
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
            getexpatriatesinfor() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6004Store/getexpatriatesinfor', {})
                    .then(response => {
                        let _tableList = response;
                        for (let j = 0; j < _tableList.length; j++) {
                            if (_tableList[j].expname !== null && _tableList[j].expname !== "") {
                                let expname = getUserInfo(_tableList[j].expname);
                                if (expname) {
                                    _tableList[j].expname = user.userinfo.customername;
                                }
                            }
                            if (_tableList[j].suppliername !== null && _tableList[j].suppliername !== "") {
                                let suppliername = getUserInfo(_tableList[j].suppliername);
                                if (suppliername) {
                                    _tableList[j].suppliername = user.userinfo.customername;
                                }
                            }
                            if (_tableList[j].admissiontime !== null && _tableList[j].admissiontime !== "") {
                                _tableList[j].admissiontime = moment(_tableList[j].admissiontime).format("YYYY-MM-DD");
                            }
                            if (_tableList[j].exitime !== null && _tableList[j].exitime !== "") {
                                _tableList[j].exitime = moment(_tableList[j].exitime).format("YYYY-MM-DD");
                            }
                            if (_tableList[j].operationform !== null && _tableList[j].operationform !== "") {
                                let operationform = getDictionaryInfo(_tableList[j].operationform);
                                if (operationform != null) {
                                    _tableList[j].operationform = operationform.value1;
                                }
                            }
                            if (_tableList[j].jobclassification !== null && _tableList[j].jobclassification !== "") {
                                let jobclassification = getDictionaryInfo(_tableList[j].jobclassification);
                                if (jobclassification != null) {
                                    _tableList[j].jobclassification = jobclassification.value1;
                                }
                            }
                            if (_tableList[j].alltechnology !== null && _tableList[j].alltechnology !== "") {
                                let alltechnology = getUserInfo(_tableList[j].alltechnology);
                                if (alltechnology) {
                                    _tableList[j].alltechnology = user.userinfo.customername;
                                }
                            }
                            if (_tableList[j].sitevaluation !== null && _tableList[j].sitevaluation !== "") {
                                let sitevaluation = getDictionaryInfo(_tableList[j].sitevaluation);
                                if (sitevaluation != null) {
                                    _tableList[j].sitevaluation = sitevaluation.value1;
                                }
                            }
                            if (_tableList[j].exitreason !== null && _tableList[j].exitreason !== "") {
                                let exitreason = getDictionaryInfo(_tableList[j].exitreason);
                                if (exitreason != null) {
                                    _tableList[j].exitreason = exitreason.value1;
                                }
                            }
                            if (_tableList[j].businessimpact !== null && _tableList[j].businessimpact !== "") {
                                let businessimpact = getDictionaryInfo(_tableList[j].businessimpact);
                                if (businessimpact != null) {
                                    _tableList[j].businessimpact = businessimpact.value1;
                                }
                            }
                            if (_tableList[j].countermeasure !== null && _tableList[j].countermeasure !== "") {
                                let countermeasure = getDictionaryInfo(_tableList[j].countermeasure);
                                if (countermeasure != null) {
                                    _tableList[j].countermeasure = countermeasure.value1;
                                }
                            }
                        }
                        this.data = _tableList;
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
            }
        },
        buttonClick(val) {
            if (val === 'save') {
                return;
            }
        },
        mounted() {
            this.getexpatriatesinfor();
            this.getFpans5001List();
            this.$store.commit('global/SET_OPERATEID', '');
        },
    }
</script>

<style scoped>

</style>
