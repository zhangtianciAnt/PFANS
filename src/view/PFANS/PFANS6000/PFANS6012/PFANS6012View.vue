<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                     :showSelectByCondition="true" ref="roletable" :showIndex="true" @reget="getInfo"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading"
                     :whetherProcess="whetherProcess" @handleprocessing="handleprocessing">
      <el-form label-position="top" label-width="8vw" slot="search" :model="refform" >
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS6011VIEW_GROUP')" prop="group_id">
              <el-select v-model="refform.group_id" style="width: 20vw" :disabled="false"
                         @change="changeGroup">
                <el-option
                  v-for="item in optionsdata"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS6012VIEW_YEAES')">
              <el-date-picker
                :placeholder="$t('normal.error_09')"
                type="month"
                v-model="refform.year" @change="changeDate">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </EasyNormalTable>
  </div>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui';
import moment from 'moment';
import {
  getUserInfo,
  getDictionaryInfo,
  getDepartmentById,
  getSupplierinfor,
  getCurrentRoleNew, getOrgInfo,getCurrentRole8
} from '../../../../utils/customize';

export default {
  name: 'PFANS6012View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      loading: false,
      title: 'title.PFANS6012VIEW',
      data: [],
      columns: [
        // {
        //   code: 'rowindex',
        //   label: 'label.PFANS6012VIEW_NO',
        //   width: 120,
        //   fix: false,
        //   filter: false,
        // },
        {
          code: 'contractnumber',
          label: 'label.PFANS6012VIEW_CONTRACTNO',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'conjapanese',
          label: 'label.PFANS6012VIEW_PROJECTNAME',
          width: 140,
          fix: false,
          filter: false,
        },
        {
          code: 'custojapanese',
          label: 'label.PFANS6012VIEW_NOTECOMPANY',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'claimamount',
          label: 'label.PFANS6012VIEW_AMOUNTOF',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'deliverydate',
          label: 'label.PFANS6012VIEW_HEPRODUCTDATE',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'completiondate',
          label: 'label.PFANS6012VIEW_ACCEPTANCEDATE',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'claimdate',
          label: 'label.PFANS6012VIEW_REQUESTDATE',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'supportdate',
          label: 'label.PFANS6012VIEW_DATEOFPAYMENT',
          width: 120,
          fix: false,
          filter: false,
        },
      ],
      buttonList: [
        {
          key: "save",
          name: "button.save",
          disabled: false,
          icon: "el-icon-check"
        }
      ],
      rowid: '',
      row: 'expatriatesinfor_id',
      whetherProcess: true,
      refform: {
        year: moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM'),
        group_id: '',
      },
      optionsdata: [],
    };
  },
  mounted() {
    if(getCurrentRole8() === '1'){
      this.buttonList[0].disabled = true;
    }else{
      this.buttonList[0].disabled = false;
    }
    this.getById();
    // this.getInfo();
    console.log(this.$store.getters.roles)
  },
  methods: {
    rowClick(row) {
      this.rowid = row.entrustsupport_id;
    },
    buttonClick(val) {
      if (val === 'save') {
        if (JSON.stringify(this.data) === "[]" || this.data.length === 0) {
          Message({
            message: this.$t('normal.info_16'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.loading = true;
        this.$store
          .dispatch('PFANS6012Store/updList',this.data)
          .then(response => {
            this.getInfo();
            this.loading = false;
            Message({
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 2 * 1000,
            });
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
    handleprocessing(row){
    },
    getInfo() {
      let params = {
        group_id: this.refform.group_id,
        dates: this.refform.year
      }
      this.loading = true;
      this.$store
        .dispatch('PFANS6012Store/getList',params)
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if(response[j].claimdate){
              response[j].claimdate = moment(response[j].claimdate).format('YYYY-MM-DD');
            }
            if(response[j].completiondate){
              response[j].completiondate = moment(response[j].completiondate).format('YYYY-MM-DD');
            }
            if(response[j].deliverydate){
              response[j].deliverydate = moment(response[j].deliverydate).format('YYYY-MM-DD');
            }
            if(response[j].supportdate){
              response[j].supportdate = moment(response[j].supportdate).format('YYYY-MM-DD');
            }
            if(response[j].undertaker){
              response[j].modifyby = true;
              let user = getUserInfo(response[j].undertaker);
              response[j].undertaker = user.userinfo.customername;
            }else{
              response[j].modifyby = false;
            }
            if (response[j].processing === "true") {
              response[j].processing = true;
            }else{
              response[j].processing = false;
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
    getById() {
      //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 start
      let role = getCurrentRoleNew();
      const vote = [];
      if (role === '3') {//CENTER
        vote.push(
          {
            value: this.$store.getters.userinfo.userinfo.centerid,
            lable: this.$store.getters.userinfo.userinfo.centername,
          },
        );
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs)
        {
          for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
          {
            if (others.centerid)
            {
              this.$store.getters.orgGroupList.filter((item) => {
                if (item.centerid === others.centerid) {
                  vote.push(
                    {
                      value: item.centerid,
                      lable: item.centername,
                    },
                  );
                }
              })
            }
          }
        }
        //add ccm 0112 兼职部门
      } else if (role === '2') {//副总经理
        this.$store.getters.orgGroupList.filter((item) => {
          if (item.virtualuser === this.$store.getters.userinfo.userid) {
            vote.push(
              {
                value: item.centerid,
                lable: item.centername,
              },
            );
          }
        })
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs)
        {
          for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
          {
            if (others.centerid)
            {
              this.$store.getters.orgGroupList.filter((item) => {
                if (item.centerid === others.centerid) {
                  vote.push(
                    {
                      value: item.centerid,
                      lable: item.centername,
                    },
                  );
                }
              })
            }
          }
        }
        //add ccm 0112 兼职部门
      }
      else if (role === '4') //GM
      {
        let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
        if (centers)
        {
          if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined)
          {
            vote.push(
              {
                value: this.$store.getters.userinfo.userinfo.groupid,
                lable: this.$store.getters.userinfo.userinfo.groupname,
              },
            );
          }
        }
      }
      const vote1 = [];
      if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
        || this.$store.getters.roles.indexOf("11") != -1 //总经理
        || this.$store.getters.roles.indexOf("16") != -1 //财务部长
        || this.$store.getters.roles.indexOf("18") != -1//企划部长
        || this.$store.getters.roles.indexOf("22") != -1//外注管理担当
        || this.$store.getters.roles.indexOf("19") != -1)//合同担当
      {
        this.$store.getters.orgGroupList.filter((item) => {
          vote1.push(
            {
              value: item.centerid,
              lable: item.centername,
            },
          );
        })
        this.optionsdata = vote1;
      }
      else
      {
        this.optionsdata = vote;
      }
      //去重
      let letoptionsdata = [];
      let arrId = [];
      for(var item of this.optionsdata){
        if(arrId.indexOf(item['lable']) == -1){
          arrId.push(item['lable']);
          letoptionsdata.push(item);
        }
      }
      //针对经营管理统计到group修改 start
      let incfmyList = [];
      for(let item of letoptionsdata){
        if(getOrgInfo(item.value).encoding == ''){
          incfmyList.push(item.value)
        }
      }
      if(incfmyList.length > 0) {
        for (let item of incfmyList) {
          letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
        }
        let orgInfo = [];
        for (let item of incfmyList) {
          if (item) {
            if (getOrgInfo(item).orgs.length != 0) {
              orgInfo.push(getOrgInfo(item).orgs)
            }
          }
        }
        let groInfo = orgInfo[0].filter(item => item.type == '2');
        for (let item of groInfo) {
          letoptionsdata.push(
            {
              value: item._id,
              lable: item.title,
            },
          );
        }
      }
      //针对经营管理统计到group修改 end
      this.optionsdata = letoptionsdata;
      if(this.optionsdata.length > 0){
        this.refform.group_id = this.optionsdata[0].value;
      }
      //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
      if (this.refform.group_id) {
        this.getInfo();
      }
    },
    changeGroup(val) {
      this.refform.group_id = val;
      if (this.refform.group_id) {
        // this.$refs.roletable.$refs.eltable.clearSelection();
        this.getInfo();
      }
    },
    changeDate(val){
      this.refform.year = moment(val).format('YYYY-MM');
      this.getInfo();
    }
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
