<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" ref="roletable"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" :showSelection="isShow"
                   v-loading="loading" :psearchValue="search">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import moment from 'moment';
    import {
        getCurrentRole2,
        getDepartmentById,
        getDictionaryInfo,
        getOrgInfoByUserId,
        getStatus,
        getUserInfo
    } from '@/utils/customize';

    export default {
        name: 'PFANS3001View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS3001VIEW',
                isShow: true,
                data: [],
                ticketsdetail: [],
                selectedlist: [],
                //add-ws-7/7-禅道247
                search: '',
                //add-ws-7/7-禅道247
                columns: [
                    //add-ws-7/7-禅道247
                    {
                        code: 'businessname',
                        label: 'label.PFANS1001FORMVIEW_BUSINESS_NUMBER',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    //add-ws-7/7-禅道247
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
                        code: 'ticketstype',
                        label: 'label.type',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'idcard',
                        label: 'label.PFANS3001VIEW_IDCARD',
                        width: 270,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'user_id',
                        label: 'label.PFANS3001VIEW_USERID',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'romanid',
                        label: 'label.PFANS3001VIEW_ROMANID',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'extensionnumber',
                        label: 'label.PFANS3001VIEW_EXTENSIONNUMBER',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'budgetnumber',
                        label: 'label.budgetunit',
                        width: 180,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'mobilephone',
                        label: 'label.PFANS3001VIEW_MOBILEPHONE',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'trip',
                        label: 'label.PFANS3001VIEW_TRIP',
                        width: 200,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'trippoint',
                        label: 'label.PFANS3001VIEW_TRIPPOINT',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    /*{
                      code: 'go',
                      label: 'label.PFANS3001VIEW_GO',
                      child: [
                        {
                          code: 'going',
                          label: 'label.PFANS3001VIEW_GOING',
                          width: 130,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'goairlinenumber',
                          label: 'label.PFANS3001VIEW_GOAIRLINENUMBER',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'godeparturedate',
                          label: 'label.PFANS3001VIEW_GODEPARTUREDATE',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'goarrivaldate',
                          label: 'label.PFANS3001VIEW_GOARRIVALDATE',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                      ],
                      width: 580,
                    },
                    {
                      code: 'return',
                      label: 'label.PFANS3001VIEW_RETURN',
                      child: [
                        {
                          code: 'back',
                          label: 'label.PFANS3001VIEW_BACK',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'reairlinenumber',
                          label: 'label.PFANS3001VIEW_GOAIRLINENUMBER',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'redeparturedate',
                          label: 'label.PFANS3001VIEW_GODEPARTUREDATE',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'rearrivaldate',
                          label: 'label.PFANS3001VIEW_GOARRIVALDATE',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                        {
                          code: 'ticketingdate',
                          label: 'label.PFANS3001VIEW_TICKETINGDATE',
                          width: 150,
                          fix: false,
                          filter: false,
                        },
                      ],
                      width: 700,
                    },*/
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
                        filter: true,
                    },
                ],
                buttonList: [],
                rowid: '',
                role1: '',
                row_id: 'tickets_id',
            };
        },
        //add-ws-7/14-禅道247
        created() {
            this.role1 = getCurrentRole2();
            if (this.role1 === '0') {
                this.buttonList = [
                    {key: 'view', name: 'button.view', disabled: false, icon: 'el-icon-view'},
                    {key: 'insert', name: 'button.insert', disabled: false, icon: 'el-icon-plus'},
                    {key: 'edit', name: 'button.update', disabled: false, icon: 'el-icon-edit'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 start
                  {key: 'export', name: 'button.export', disabled: false, icon: 'el-icon-download'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 end
                    {key: 'qxjp', name: 'button.qxjp', disabled: false, icon: 'el-icon-edit'},
                ];
            } else {
                this.buttonList = [
                    {key: 'view', name: 'button.view', disabled: false, icon: 'el-icon-view'},
                    {key: 'insert', name: 'button.insert', disabled: false, icon: 'el-icon-plus'},
                    {key: 'edit', name: 'button.update', disabled: false, icon: 'el-icon-edit'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 start
                  {key: 'export', name: 'button.export', disabled: false, icon: 'el-icon-download'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 end

                ];
            }
        },
        //add-ws-7/14-禅道247
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS3001Store/getFpans3001List', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let user = getUserInfo(response[j].user_id);
                        let nameflg = getOrgInfoByUserId(response[j].user_id);
                        if (nameflg) {
                            response[j].center_id = nameflg.centerNmae;
                            // response[j].group_id = nameflg.groupNmae;
                            response[j].team_id = nameflg.teamNmae;
                        }
                        //add_fjl_0927
                        if (response[j].group_id !== null && response[j].group_id !== '' && response[j].group_id !== undefined) {
                            response[j].group_id = getDepartmentById(response[j].group_id);
                        }
                        //add_fjl_0927
                        if (user) {
                            response[j].user_id = user.userinfo.customername;
                        }
                        // 禅道494 ztc
                        if (response[j].budgetnumber !== null && response[j].budgetnumber !== "") {
                            let procurement = getDictionaryInfo(response[j].budgetnumber);
                            if (procurement != null) {
                                response[j].budgetnumber = procurement.value2 + '_' + procurement.value3;
                            }
                        }
                        // 禅道494 ztc
                        // ADD_FJL   (受理状态)
                        if (response[j].acceptstatus !== null && response[j].acceptstatus !== '') {
                            if (this.$i18n) {
                                if (response[j].acceptstatus === '0') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_ACCEPT');
                                } else if (response[j].acceptstatus === '1') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_REFUSE');
                                } else if (response[j].acceptstatus === '2') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                                } else if (response[j].acceptstatus === '3') {
                                    response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT2');
                                }
                            }
                        }
                        // ADD_FJL   (受理时间)
                        if (response[j].findate !== null && response[j].findate !== '') {
                            response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
                        }
                        if (response[j].status !== null && response[j].status !== '') {
                            response[j].status = getStatus(response[j].status);
                        }
                        if (response[j].ticketstype === 'first') {
                            if (this.$i18n) {
                                response[j].ticketstype = this.$t('label.PFANS3001FORMVIEW_DOMESTIC');
                            }

                            response[j].idcard = response[j].idcard;
                        } else {
                            if (this.$i18n) {
                                response[j].ticketstype = this.$t('label.PFANS3001FORMVIEW_FOREIGN');
                            }

                            response[j].idcard = response[j].passport + '、' + moment(response[j].effectivedate).format('YYYY-MM-DD');
                        }
                        if (response[j].tripstart !== null && response[j].tripstart !== '' && response[j].tripend !== null && response[j].tripend !== '') {
                            response[j].trip = moment(response[j].tripstart).format('YYYY-MM-DD') + ' - ' + moment(response[j].tripend).format('YYYY-MM-DD');
                        }
                        if (response[j].godeparturedate !== null && response[j].godeparturedate !== '') {
                            response[j].godeparturedate = moment(response[j].godeparturedate).format('YYYY-MM-DD hh:mm');
                        }
                        if (response[j].goarrivaldate !== null && response[j].goarrivaldate !== '') {
                            response[j].goarrivaldate = moment(response[j].goarrivaldate).format('YYYY-MM-DD hh:mm');
                        }
                        if (response[j].redeparturedate !== null && response[j].redeparturedate !== '') {
                            response[j].redeparturedate = moment(response[j].redeparturedate).format('YYYY-MM-DD hh:mm');
                        }
                        if (response[j].rearrivaldate !== null && response[j].rearrivaldate !== '') {
                            response[j].rearrivaldate = moment(response[j].rearrivaldate).format('YYYY-MM-DD hh:mm');
                        }
                        if (response[j].ticketingdate !== null && response[j].ticketingdate !== '') {
                            response[j].ticketingdate = moment(response[j].ticketingdate).format('YYYY-MM-DD');
                        }
                        if (response[j].budgetnumber !== null && response[j].budgetnumber !== '') {
                            let letBudgetnumber = getDictionaryInfo(response[j].budgetnumber);
                            if (letBudgetnumber != null) {
                                response[j].budgetnumber = letBudgetnumber.value1;
                            }
                        }
                    }
                    this.data = response;
                    //add-ws-7/7-禅道247
                    this.check();
                    //add-ws-7/7-禅道247
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
            this.geticketsdetail();
        },
        methods: {
            //add-ws-7/7-禅道247
            check() {
                if (this.$route.params._id) {
                    this.search = this.$route.params._id;
                }
            },
            //add-ws-7/7-禅道247
            rowClick(row) {
                this.rowid = row.tickets_id;
              //NT_PFANS_20210308_BUG_148 ztc start 机票受理状态为【取消】或【完成】时【取消机票】按钮不可用
              if (row.acceptstatus === '取消' || row.acceptstatus === '完成') {
                this.buttonList[4].disabled = true;
              } else {
                this.buttonList[4].disabled = false;
              }
              //NT_PFANS_20210308_BUG_148 ztc end 机票受理状态为【取消】或【完成】时【取消机票】按钮不可用
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
                        name: 'PFANS3001FormView',
                        params: {
                            _type: 2,
                            _id: this.rowid,
                            disabled: false,
                        },
                    });
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3001FormView',
                        params: {
                            _id: '',
                            disabled: true,
                            _type: 2,
                        },
                    });
                }
                if (val === 'edit') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3001FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true,
                            _type: 2,
                        },
                    });
                }
//ADD_WXL 禅道208
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
                    let dc = [];
                    for (var a = 0; a < this.selectedlist.length; a++) {
                        let roid = this.selectedlist[a].tickets_id;
                        let ticketsdetailc = this.ticketsdetail.filter(item => item.tickets_id === roid);

                        // tick = tick.concat(ticketsdetailc);

                        for (let b = 0; b < ticketsdetailc.length; b++) {
                            let tk = [];
                            //table 行き
                            tk.going = ticketsdetailc[b].going;
                            tk.goairlinenumber = ticketsdetailc[b].goairlinenumber;
                            tk.godeparturedate = ticketsdetailc[b].godeparturedate;
                            tk.goarrivaldate = ticketsdetailc[b].goarrivaldate;
                            //table 帰り
                            tk.back = ticketsdetailc[b].back;
                            tk.reairlinenumber = ticketsdetailc[b].reairlinenumber;
                            tk.redeparturedate = ticketsdetailc[b].redeparturedate;
                            tk.ticketingdate = ticketsdetailc[b].ticketingdate;
                            //详情
                            tk.user_id = this.selectedlist[a].user_id;
                            tk.extensionnumber = this.selectedlist[a].extensionnumber;
                            tk.group_id = this.selectedlist[a].group_id;
                            tk.budgetnumber = this.selectedlist[a].budgetnumber;
                            tk.idcard = this.selectedlist[a].idcard;
                            tk.mobilephone = this.selectedlist[a].mobilephone;
                            tk.trip = this.selectedlist[a].trip;
                            tk.trippoint = this.selectedlist[a].trippoint;

                            dc.push(tk);

                        }

                    }
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [
                            this.$t('label.user_name'),//姓名
                            this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),//内線番号
                            this.$t('label.department'),//部门
                            this.$t('label.budgetunit'),//预算编码
                            this.$t('label.PFANSUSERFORMVIEW_IDNUMBER'),//身份证号码
                            this.$t('label.PFANS3001VIEW_MOBILEPHONE'),//手机号码
                            this.$t('label.PFANS3001VIEW_TRIP'),//出差时间
                            this.$t('label.PFANS3001VIEW_TRIPPOINT'),//出差地点

                            this.$t('label.PFANS3001VIEW_GOING'),//行き
                            this.$t('label.PFANS3001VIEW_GOAIRLINENUMBER'),//航空番号
                            this.$t('label.PFANS3001VIEW_GODEPARTUREDATE'),//出発時間
                            this.$t('label.PFANS3001VIEW_GOARRIVALDATE'),//到着時間

                            this.$t('label.PFANS3001VIEW_BACK'),//帰り
                            this.$t('label.PFANS3001VIEW_GOAIRLINENUMBER'),//航空番号
                            this.$t('label.PFANS3001VIEW_GODEPARTUREDATE'),//出発時間
                            this.$t('label.PFANS3001VIEW_GOARRIVALDATE'),//到着時間

                        ];
                        const filterVal = [
                            'user_id',//姓名
                            'extensionnumber',//内線番号
                            'group_id',//部门
                            'budgetnumber',//预算编码
                            'idcard',//身份证号码
                            'mobilephone',//手机号码
                            'trip',//出差时间
                            'trippoint',//出差地点

                            'going',//行き
                            'goairlinenumber',//航空番号
                            'godeparturedate',//出発時間
                            'goarrivaldate',//到着時間

                            'back',//帰り
                            'reairlinenumber',//航空番号
                            'ticketingdate',//出発時間
                            'redeparturedate',//到着時間


                        ];
                        const list = dc;
                        for (let h = 0; h < list.length; h++) {
                            if (list[h].godeparturedate !== '' && list[h].godeparturedate !== null) {
                                list[h].godeparturedate = moment(list[h].godeparturedate).format('YYYY-MM-DD HH:mm:ss');
                            }
                            if (list[h].goarrivaldate !== '' && list[h].goarrivaldate !== null) {
                                list[h].goarrivaldate = moment(list[h].goarrivaldate).format('YYYY-MM-DD HH:mm:ss');
                            }
                            if (list[h].redeparturedate !== '' && list[h].redeparturedate !== null) {
                                list[h].redeparturedate = moment(list[h].redeparturedate).format('YYYY-MM-DD HH:mm:ss');
                            }
                            if (list[h].ticketingdate !== '' && list[h].ticketingdate !== null) {
                                list[h].ticketingdate = moment(list[h].ticketingdate).format('YYYY-MM-DD HH:mm:ss');
                            }
                        }
                        const data = this.formatJson(filterVal, list);

                        excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS3001') + '_' + this.$t(moment(new Date()).format('YYYY-MM-DD')));
                    });
                }
                //add-ws-7/14-禅道247
                if (val === 'qxjp') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS3001Store/selectByIdchange', {'tickets_id': this.rowid})
                        .then(response => {
                            Message({
                                message: this.$t('label.PFANS3001VIEW_ERRORCHANGE'),
                                type: 'success',
                                duration: 5 * 1000,
                            });
                            this.loading = false;
                        }).catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    });
                }
                //add-ws-7/14-禅道247
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
            getexportList() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3001Store/selectById', {'tickets_id': this.rowid})
                    .then(response => {
                        // this.form = response.tickets;
                        // if (this.form.ticketstype === 'first') {
                        //     this.form.idcardorpa = this.form.idcard;
                        // }
                        // <!--2020-05-06 ztc 机票改为明细 start-->
                        if (response.ticketsdetails.length > 0) {
                            this.tableA = response.ticketsdetails;
                        }
                        // <!--2020-05-06 ztc 机票改为明细 end-->


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

            geticketsdetail() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3001Store/geticketsdetail')
                    .then(response => {
                        this.ticketsdetail = response;
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
//ADD_WXL 禅道208

        },
    };
</script>

<style scoped>

</style>
