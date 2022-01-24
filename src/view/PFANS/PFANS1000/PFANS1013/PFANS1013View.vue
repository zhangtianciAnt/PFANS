<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :showSelection="isShow"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    :selectable="selectInit"
    ref="roletable"
    v-loading="loading"
    :showSelectBySearch="false"
  >
    <!--  region  add   ml   220112  添加筛选条件   from    -->
    <el-form label-position="top" label-width="8vw" slot="search">
      <el-row>
        <el-col :span="3">
          <el-form-item :label="$t('label.PFANS1013VIEW_REIMNUMBER')">
            <el-input style="width: 90%" v-model="form1.invoiceno" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('label.applicant')">
            <user :userlist="form1.userid"
                  @getUserids="getUserids" style="width: 65%"></user>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('label.center')">
            <org :orglist="form1.centerid"
                 orgtype="1"
                 style="width: 80%"
                 @getOrgids="getCenter"
            ></org>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('label.group')">
            <org :orglist="form1.groupid"
                 orgtype="2"
                 style="width: 80%"
                 @getOrgids="getGroup"
            ></org>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('label.PFANS1013VIEW_TYPE')">
            <el-select @change="change" v-model="form1.type" clearable style="width: 85%">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in codes"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('label.PFANS1013VIEW_STARTDATE')">
            <el-date-picker
              style="width: 85%"
              type="date"
              v-model="form1.startdate">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="$t('label.PFANS1013VIEW_ENDDATE')">
            <el-date-picker
              style="width: 85%"
              type="date"
              v-model="form1.enddate">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  endregion  add   ml   220112  添加筛选条件   to    -->
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo, getDepartmentById} from '@/utils/customize';
  import moment from 'moment';
  import user from '../../../components/user.vue';
  import org from '@/view/components/org';

  const {Parser} = require('json2csv');

  export default {
    name: 'PFANS1013View',
    components: {
      moment,
      EasyNormalTable,
      org,
      user,
    },
    data() {
      return {
        statuss: '',
        travelcostvalue: [],
        startoption: [],
        selectedlist: [],
        selectedList: [],
        isShow: true,
        loading: false,
        title: 'title.PFANS1013VIEW',
        data: [],
        //region  add  ml  220112   筛选条件   from
        form1 : {
          invoiceno: '',
          userid: '',
          centerid: '',
          groupid: '',
          type: '',
          startdate: null,
          enddate: null,
        },
        codes: [
          {
            value: '0',
            label:this.$t('label.PFANS1013VIEW_TYPEON')
          },
          {
            value: '1',
            label:this.$t('label.PFANS1013VIEW_TYPEOFF')
          }
        ],
        //endregion  add  ml  220112   筛选条件   to
        columns: [
          {
            code: 'invoiceno',
            label: 'label.PFANS1013VIEW_REIMNUMBER',
            width: 130,
            fix: false,
            filter: false,
          },
          {
            code: 'applicant',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true,
          },
          //add-ws-5/11-支出总额添加
          {
            code: 'totalpay',
            label: 'label.PFANS1013VIEW_TOTALPAY',
            width: 130,
            fix: false,
            filter: false,
          },
          //add-ws-5/11-支出总额添加
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
            code: 'startdate',
            label: 'label.PFANS1013VIEW_STARTDATE',
            width: 150,
            fix: false,
            filter: true,

          },
          {
            code: 'enddate',
            label: 'label.PFANS1013VIEW_ENDDATE',
            width: 150,
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
            code: 'type',
            label: 'label.PFANS1013VIEW_TYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'centername',
            label: 'label.center',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'groupname',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'teamname',
            label: 'label.team',
            width: 130,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'balance',
          //   label: 'label.PFANS1013VIEW_BALANCE',
          //   width: 100,
          //   fix: false,
          //   filter: true
          // },

        ],
        buttonList: [
          {
            key: 'view',
            name: 'button.view',
            disabled: false,
            icon: 'el-icon-view',
          },
            // {
            //   key: 'insert',
            //   name: 'button.insert',
            //   disabled: false,
            //   icon: 'el-icon-plus',
            // },
          {
            key: 'update',
            name: 'button.update',
            disabled: false,
            icon: 'el-icon-edit',
          },
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
          //region   add    ml   220112   筛选条件   from
          {
            'key': 'search',
            'name': 'button.search',
            'disabled': false,
            icon: 'el-icon-search'
          },
          //endregion   add    ml   220112   筛选条件   to
        ],
        rowid: '',
        row_id: 'evectionid',
      };
    },
    mounted() {
      this.getdata();
    },
    methods: {
      getdata(){
        this.loading = true;
        this.$store
          //  region  update  ml  220117   检索   from
          .dispatch('PFANS1013Store/getSearch', this.form1)
          // .dispatch('PFANS1013Store/get')
          //  endregion  update  ml  220117   检索   to
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              let user = getUserInfo(response[j].userid);
              if (user) {
                response[j].applicant = user.userinfo.customername;
              }
              let nameflg = getOrgInfoByUserId(response[j].userid);
              if (nameflg) {
                response[j].centername = nameflg.centerNmae;
                // response[j].groupname = nameflg.groupNmae;
                response[j].teamname = nameflg.teamNmae;
              }
              if (response[j].groupid !== null && response[j].groupid !== '' && response[j].groupid !== undefined) {
                response[j].groupname = getDepartmentById(response[j].groupid);
              }
              // response[j].centername = response[j].centerid;
              // response[j].groupname = response[j].groupid;
              // response[j].teamname = response[j].teamid;
              // if (response[j].budgetunit !== null && response[j].budgetunit !== "") {
              //   let letBudgetunit = getDictionaryInfo(response[j].budgetunit);
              //   if (letBudgetunit != null) {
              //     response[j].budgetunit = letBudgetunit.value1;
              //   }
              // }
              if (response[j].type !== null && response[j].type !== '') {
                if (response[j].type === '0') {
                  if (this.$i18n) {

                    response[j].type = this.$t('label.PFANS1013VIEW_TYPEON');
                  }
                } else if (response[j].type === '1') {
                  if (this.$i18n) {

                    response[j].type = this.$t('label.PFANS1013VIEW_TYPEOFF');
                  }
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
              //region add_qhr_0609 添加实际出差开始日、实际出差结束日和实际出差天数
              if (response[j].realstartdate !== null && response[j].realstartdate !== '') {
                response[j].startdate = moment(response[j].realstartdate).format('YYYY-MM-DD');
              } else {
                if (response[j].startdate !== null && response[j].startdate !== '') {
                  response[j].startdate = moment(response[j].startdate).format('YYYY-MM-DD');
                }
              }
              //endregion add_qhr_0609 添加实际出差开始日、实际出差结束日和实际出差天数
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
              //region add_qhr_0609 添加实际出差开始日、实际出差结束日和实际出差天数
              if (response[j].realenddate !== null && response[j].realenddate !== '') {
                response[j].enddate = moment(response[j].realenddate).format('YYYY-MM-DD');
              } else {
                if (response[j].enddate !== null && response[j].enddate !== '') {
                  response[j].enddate = moment(response[j].enddate).format('YYYY-MM-DD');
                }
              }
              //endregion add_qhr_0609 添加实际出差开始日、实际出差结束日和实际出差天数
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
      //ADD_FJL
      selectInit(row, index) {
        if (this.$i18n) {
          return row.status === this.$t('label.PFANS5004VIEW_OVERTIME');
        }
      },
      //ADD_FJL
      rowClick(row) {
        this.rowid = row.evectionid;
        this.statuss = row.status;
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
          .dispatch('PFANS1013Store/exportjs', {evectionid: this.$refs.roletable.selectedList[val].evectionid})
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
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
          //ADD_FJL_0906  添加workfolwurl start
          this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1013View');
          //ADD_FJL_0906  添加workfolwurl end
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
            name: 'PFANS1013FormView',
            params: {
              _statuss: this.statuss,
              _id: this.rowid,
              disabled: true,
              method: 'update',
            },
          });
        } else if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        } else if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1013FormView',
            params: {
              _statuss: this.statuss,
              _id: this.rowid,
              disabled: false,
              method: 'view',
            },
          });
        } else if (val === 'export') {
          this.startoptionvalue = [];
          this.travelcostvalue = [];
          this.startoption = [];
          this.selectedList = {};
          this.selectedList.travelcost = [];
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          //DEL_FJL
          // else if (this.$refs.roletable.selectedList.length > 0) {
          //   for (let i = 0; i < this.$refs.roletable.selectedList.length; i++) {
          //     if (this.$refs.roletable.selectedList[i].status !== this.$t('label.PFANS5004VIEW_OVERTIME')) {
          //       Message({
          //         message: this.$t('label.PFANS1013VIEW_EXPORTERRINFO'),
          //         type: 'error',
          //         duration: 2 * 1000,
          //       });
          //       return;
          //     }
          //   }
          // }
          //DEL_FJL
          this.selectedlist = this.$refs.roletable.selectedList;
          for (let i = 0; i < this.selectedlist.length; i++) {
            this.selectedList.travelcost.push({
              evectionid: this.selectedlist[i].evectionid,
            });
          }
          this.loading = true;
          this.$store
            .dispatch('PFANS1013Store/gettravelcostvo', this.selectedList)
            .then(response => {
              this.selectedlist = this.$refs.roletable.selectedList;
              let sum = 0;
              let invoiceamountvalue = 0;
              for (let z = 0; z < response.length; z++) {
                invoiceamountvalue += parseFloat(response[z].lineamount);
              }
              for (let m = 0; m < response.length; m++) {
                sum = sum + 1;
                for (let i = 0; i < this.selectedlist.length; i++) {
                  if (response[m].evectionid == this.selectedlist[i].evectionid) {
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
                    }
                    if (response[m].budgetcoding != '' && response[m].budgetcoding != null) {
                      let letbudge = getDictionaryInfo(response[m].budgetcoding);
                      if (letbudge) {
                        response[m].budgetcoding = letbudge.value2;
                      }
                    }
                    this.travelcostvalue.push({
                      invoicenumber: response[m].invoicenumber,
                      number: response[m].number,
                      invoicetype: 'STANDARD',
                      rowtype: 'ITEM',
                      invoicedate: response[m].invoicedate,
                      conditiondate: response[m].conditiondate,
                      vendorcode: response[m].vendorcode,
                      paymentmethod: this.$t('label.PFANS1012VIEW_OFFICE'),
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
                      remarks: response[m].remarks,
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
                remarks: '',
                source: '',
                paymentmethods: '',
                type: '',
              });
              this.startoptionvalue = this.travelcostvalue.concat(this.startoption);
              let csvData = [];
              for (let i = 0; i < this.startoptionvalue.length; i++) {
                let obj = this.startoptionvalue[i];
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
                    remarks: obj.remarks,
                  source: obj.source,
                  paymentmethods: obj.paymentmethods,
                  type: obj.type,
                });
              }

              let filterVal = ['invoicenumber', 'number', 'invoicetype', 'rowtype', 'invoicedate', 'conditiondate', 'vendorcode', 'paymentmethod', 'currency',
                'invoiceamount', 'lineamount', 'currencyrate', 'companysegment', 'budgetcoding', 'subjectnumber',
                , 'productsegment', 'vatnumber', 'taxCode', 'paymentterms', 'remarks', 'source', 'paymentmethods', 'type'];
              const parser = new Parser({header: false});
              const result = parser.parse(csvData);
              let aaa = result.replace(new RegExp('"', 'gm'), '');
              let ccc = encodeURI(aaa)
              let ddd = ccc.replace(new RegExp('%0A',"gm"), '%0D%0A');
              let eee = ddd + '%0D%0A'
              let csvContent = 'data:text/csv;charset=utf-8,\ufeff' + eee;
              const link = document.createElement('a');
              link.href = csvContent;
              link.download = this.$t('AP') + this.$t('title.PFANS1013VIEW') + '.csv';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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
        //  region   add   ml  220112   检索   from
        } else if(val === 'search') {
          this.getdata();
        }
        //  endregion   add   ml  220112   检索   to
      },
      //region   add  ml  220112  检索  from
      change(val) {
        this.form1.type = val;
      },
      getUserids(val) {
        this.form1.userid = val;
      },
      getCenter(val) {
        this.form1.centerid = val;
        this.form1.groupid = '';
        if(val === ""){
          this.form1.groupid = "";
        }
      },
      getGroup(val) {
        this.form1.groupid = val;
        if(val != ""){
          this.getOrgInformation(val);
        }
      },
      getOrgInformation(id) {
        let org = {};
        let treeCom = this.$store.getters.orgs;
        if (id && treeCom.getNode(id)) {
          let node = id;
          let type = treeCom.getNode(id).data.type || 0;
          for (let index = parseInt(type); index >= 1; index--) {
            if (index === 2) {
              org.groupname = treeCom.getNode(node).data.departmentname;
              org.group_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.centername = treeCom.getNode(node).data.companyname;
              org.center_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            center_id: this.form1.centerid,
            group_id: this.form1.groupid,
          } = org);
        }
      },
      //endregion   add  ml  220112  检索   to
    },
  };
</script>

<style scoped>

</style>


