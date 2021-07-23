<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         ref="container" :showSelection="isShow"
                         @buttonClick="buttonClick" v-loading="loading"
                         :noback="noback">
      <div slot="customize" style="width: 100%">
        <el-form :model="form" label-position="top" label-width="8vw" employedref="refform" ref="form"
                 style="padding: 0.5vw">
          <el-row style="padding-top: 3%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS6011VIEW_YEARS')">
                <el-date-picker
                  :placeholder="$t('normal.error_09')"
                  @change="changeYear"
                  type="year"
                  :disabled="true"
                  v-model="refform.year"
                  style="width:10vw">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
                <el-select v-model="refform.group_id" style="width: 20vw" :disabled="false"
                           @change="groupChange">
                  <el-option
                    v-for="item in grp_options"
                    :key="item.groupid"
                    :label="item.groupname"
                    :value="item.groupid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <lb-table :column="tableData.columns"
                  :data="tableData.data" style="margin-top: -300px;"
                  :merge="['themename', 'divide', 'toolsorgs', 'numbers','staffnum']"
                  header-cell-class-name="sub_bg_color_blue" stripe
                  border>
        </lb-table>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import LbTable from '@/components/EasyMergeTable';
import {getCurrentRoleNew, getDepartmentById, getDictionaryInfo, getOrgInfo} from "../../../../utils/customize";
import moment from "moment";
import {Message} from "element-ui";
export default {
  name: "PFANS1050View",
  components: {
    LbTable,
    EasyNormalContainer,
  },
  data () {
    return {
      title: 'title.PFANS1050VIEW',
      refform: {
        year:parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
        group_id: '',
      },
      noback: true,
      loading: false,
      grp_options: [],
      buttonList: [
        {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
      ],
      isShow: false,
      tableData: {
        columns: [
          {
            prop: 'themename',
            label: '委托元名称',
            width: 120,
          },
          {
            prop: 'divide',
            label: '委托元分类',
            width: 120,
          },
          {
            prop: 'toolsorgs',
            label: '委托元公司',
            width: 120,
          },
          {
            prop: 'contractnumber',
            label: '合同号',
            width: 160,
          },
          {
            prop: 'claimamount',
            label: '合同金额',
            width: 120,
          },
          {
            prop: 'numbers',
            label: 'PJ起案',
            width: 130,
          },
          {
            prop: 'staffnum',
            label: '员工工数',
            width: 120,
          },
          {
            prop: 'outstaffnum',
            label: '外驻工数',
            width: 120,
          },
          {
            prop: 'outcompany',
            label: '外驻社名',
            width: 240,
          },
          {
            prop: 'staffcust04',
            label: '4月',
            width: 80,
          },
          {
            prop: 'staffcust05',
            label: '5月',
            width: 80,
          },
          {
            prop: 'staffcust06',
            label: '6月',
            width: 80,
          },
          {
            prop: 'staffcust07',
            label: '7月',
            width: 80,
          },
          {
            prop: 'staffcust08',
            label: '8月',
            width: 80,
          },
          {
            prop: 'staffcust09',
            label: '9月',
            width: 80,
          },
          {
            prop: 'staffcust10',
            label: '10月',
            width: 80,
          },
          {
            prop: 'staffcust11',
            label: '11月',
            width: 80,
          },
          {
            prop: 'staffcust12',
            label: '12月',
            width: 80,
          },
          {
            prop: 'staffcust01',
            label: '1月',
            width: 80,
          },
          {
            prop: 'staffcust02',
            label: '2月',
            width: 80,
          },
          {
            prop: 'staffcust03',
            label: '3月',
            width: 80,
          },
        ],
        data: []
      }
    }
  },
  mounted() {
    this.getorglistname().then(val =>{
      this.getDepartInfo();
    });
  },
  methods: {
    getDepartInfo() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1050Store/getDepartmental',{'years': this.refform.year, 'group_id': this.refform.group_id})
        .then(response => {
          if(!response) return
          response.forEach(item => {
            let letStage = getDictionaryInfo(item.divide);
            if (letStage != null) {
              item.divide = letStage.value1;
            }
          });
          this.tableData.data = response;
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
    getorglistname() {
      return new Promise((resolve, reject) => {

        let role = getCurrentRoleNew();
        const vote = [];

        if (role === '3') {//CENTER
          vote.push(
            {
              groupid: this.$store.getters.userinfo.userinfo.centerid,
              groupname: this.$store.getters.userinfo.userinfo.centername,
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
                        groupid: item.centerid,
                        groupname: item.centername,
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
                  groupid: item.centerid,
                  groupname: item.centername,
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
                        groupid: item.centerid,
                        groupname: item.centername,
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
                  groupid: this.$store.getters.userinfo.userinfo.groupid,
                  groupname: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
          || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1) //财务部长
        {
          this.$store.getters.orgGroupList.filter((item) => {
            vote1.push(
              {
                groupid: item.centerid,
                groupname: item.centername,
              },
            );
          })
          this.grp_options = vote1;
        }
        else
        {
          this.grp_options = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for(var item of this.grp_options){
          if(arrId.indexOf(item['groupname']) == -1){
            arrId.push(item['groupname']);
            letoptionsdata.push(item);
          }
        }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of letoptionsdata){
          if(getOrgInfo(item.groupid).encoding == ''){
            incfmyList.push(item.groupid)
          }
        }
        if(incfmyList.length > 0){
          for(let item of incfmyList){
            letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid != item)
          }
          let orgInfo = [];
          for(let item of incfmyList){
            if(item){
              if(getOrgInfo(item).orgs.length != 0){
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for(let item of groInfo){
            letoptionsdata.push(
              {
                groupid: item._id,
                groupname: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.grp_options = letoptionsdata;
        if (this.grp_options.length > 0)
        {
          this.refform.group_id = this.grp_options[0].groupid;
        }

        //UPD CCM 20210422
        resolve(this.grp_options)
      });
    },
    changeYear(val) {
      this.tableData.data = [];
      this.refform.years = val;
      this.getDepartInfo();
    },
    groupChange(val) {
      this.tableData.data = [];
      this.refform.group_id = val;
      let data = this.grp_options.filter(item => (item.groupid == val));
      if (data.length > 0) {
        this.refform.encoding = data[0].encoding;
      }
      this.getDepartInfo();
    },
    buttonClick(val) {
      if (val === 'export') {
        if (this.tableData.data == '') {
          Message({
            message: this.$t('normal.info_16'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
