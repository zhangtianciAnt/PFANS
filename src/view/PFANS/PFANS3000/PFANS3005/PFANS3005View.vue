  <template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
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
                columns: [
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
                        filter: true
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
                        filter: true
                    },
                    {
                        code: 'setplace',
                        label: 'label.PFANS3005VIEW_SETPLACE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'controller',
                        label: 'label.PFANS3005VIEW_CONTROLLER',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'username',
                        label: 'label.PFANS3005VIEW_USER',
                        width: 150,
                        fix: false,
                        filter: true
                    },
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
                        filter: true
                    },
                    {
                        code: 'purchasepurpose',
                        label: 'label.PFANS3005VIEW_PURCHASEPURPOSE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'procurementproject',
                        label: 'label.PFANS3005VIEW_PROCUREMENTPROJECT',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'procurementdetails',
                        label: 'label.PFANS3005VIEW_PROCUREMENTDETAILS',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'remarks',
                        label: 'label.remarks',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'brandname',
                        label: 'label.PFANS3005VIEW_BRANDNAME',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'model',
                        label: 'label.PFANS3005VIEW_MODEL',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'equipmenturl',
                        label: 'label.PFANS3005VIEW_EQUIPMENTURL',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'quantity',
                        label: 'label.PFANS3005VIEW_QUANTITY',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'unitprice',
                        label: 'label.PFANS3005VIEW_UNITPRICE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'totalamount',
                        label: 'label.PFANS3005VIEW_TOTALAMOUNT',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'storagedate',
                        label: 'label.PFANS3005VIEW_STORAGEDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'collectionday',
                        label: 'label.PFANS3005VIEW_COLLECTIONDAY',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'recipients',
                        label: 'label.PFANS3005VIEW_RECIPIENTS',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'actuarialdate',
                        label: 'label.PFANS3005VIEW_ACTUARIALDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'actuarialamount',
                        label: 'label.PFANS3005VIEW_ACTUARIALAMOUNT',
                        width: 150,
                        fix: false,
                        filter: true
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
                        filter: true,
                    },
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
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
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
