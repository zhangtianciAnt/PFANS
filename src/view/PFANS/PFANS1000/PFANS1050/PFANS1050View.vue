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
                  v-model="form.year"
                  style="width:10vw">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS6011VIEW_GROUP')" prop="center_id">
                <el-select v-model="form.group_id" style="width: 15vw"
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
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
    <lb-table :column="tableData.columns"
              :data="tableData.data" :title="title" style="margin-top: -300px;"
              :merge="['themename', 'divide', 'toolsorgs', 'numbers','staffnum']"
              header-cell-class-name="sub_bg_color_blue" stripe
              border>
    </lb-table>
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
      title: 'title.PFANS6011VIEW',
      form: {
        year: moment(new Date()).format('YYYY'),
        group_id: '',
      },
      noback: true,
      loading: false,
      optionsdata: [],
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
    this.getById();
    this.getDepartInfo();
  },
  methods: {
    getDepartInfo() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1050Store/getDepartmental',{'years': this.form.year, 'group_id': this.form.group_id})
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
    getById() {
      this.loading = true;
      //update gbb 20210331 2021组织架构变更-group下拉变为center下拉 start
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
            if (others.centerid != null)
            {
              // let groupname = getOrgInfo(others.groupid);
              // if (groupname) {
              //   vote.push(
              //     {
              //       value: others.groupid,
              //       lable: groupname.companyname,
              //     },
              //   );
              // }
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
        this.form.group_id = this.$store.getters.userinfo.userinfo.centerid;
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
        // let centerId = this.$store.getters.userinfo.userinfo.centerid;
        // let orgs = getDownOrgInfo(centerId);
        // if (orgs){
        //   if(orgs.length > 0){
        //     this.group_id = orgs[0]._id;
        //   }
        //   for (let org of orgs) {
        //     console.log(org)
        //     vote.push(
        //       {
        //         value: org._id,
        //         lable: org.companyname,
        //       },
        //     );
        //   }
        // }
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs)
        {
          for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
          {
            // if (others.groupid)
            // {
            //   // let groupname = getOrgInfo(others.groupid);
            //   // if (groupname) {
            //   //   vote.push(
            //   //     {
            //   //       value: others.groupid,
            //   //       lable: groupname.companyname,
            //   //     },
            //   //   );
            //   // }
            // }
            // else
            if (others.centerid)
            {
              // let centerId = others.centerid;
              // let orgs = getDownOrgInfo(centerId);
              // if (orgs){
              //   for (let org of orgs) {
              //     vote.push(
              //       {
              //         value: org._id,
              //         lable: org.companyname,
              //       },
              //     );
              //   }
              // }
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
      } else if (role === '1') {//总经理
        //update gbb 20210331 之后的代码有判断，此处重复(总经理) start
        // let centerId = this.$store.getters.userinfo.userinfo.centerid;
        // let orgs = getDownOrgInfo(centerId);
        // if (orgs){
        //   if(orgs.length > 0){
        //     if(getDownOrgInfo(orgs[0]._id).length > 0){
        //       this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
        //     }
        //   }
        //   for (let center of orgs) {
        //     let centers = getDownOrgInfo(center._id);
        //     if (centers){
        //       for (let group of centers) {
        //         vote.push(
        //           {
        //             value: group._id,
        //             lable: group.companyname,
        //           },
        //         );
        //       }
        //     }
        //
        //   }
        // }
        //update gbb 20210331 之后的代码有判断，此处重复 end
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
      //let role9 = getCurrentRole9();
      //
      if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
        || this.$store.getters.roles.indexOf("11") != -1 //总经理
        || this.$store.getters.roles.indexOf("16") != -1 //财务部长
        || this.$store.getters.roles.indexOf("18") != -1//企划部长
        || this.$store.getters.roles.indexOf("22") != -1)//外注管理担当
      {
        this.$store.getters.orgGroupList.filter((item) => {
          vote1.push(
            {
              value: item.centerid,
              lable: item.centername,
            },
          );
        })
        // let orgs = getDownOrgInfo(centerId);
        // if (orgs){
        //   if(orgs.length > 0){
        //     if(getDownOrgInfo(orgs[0]._id).length > 0){
        //       this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
        //     }
        //   }
        //   for (let center of orgs) {
        //     let centers = getDownOrgInfo(center._id);
        //     if (centers){
        //       for (let group of centers) {
        //         vote1.push(
        //           {
        //             value: group._id,
        //             lable: group.companyname,
        //           },
        //         );
        //       }
        //     }
        //   }
        // }
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
      //update gbb 20210331 2021组织架构变更-group下拉变为center下拉 end
      //针对经营管理统计到group修改 start
      let incfmyList = [];
      for(let item of letoptionsdata){
        if(getOrgInfo(item.value).encoding == ''){
          incfmyList.push(item.value)
        }
      }
      if(incfmyList.length > 0){
        for(let item of incfmyList){
          letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
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
              value: item._id,
              lable: item.title,
            },
          );
        }
      }
      //针对经营管理统计到group修改 end
      this.optionsdata = letoptionsdata;
      if(this.optionsdata.length > 0){
        this.form.group_id = this.optionsdata[0].value;
      }
      this.loading = false;
    },
    changeYear(val) {
      this.tableData.data = [];
      this.form.years = val;
      this.getDepartInfo();
    },
    changeGroup(val) {
      this.tableData.data = [];
      this.form.group_id = val;
      this.getDepartInfo();
    },
    buttonClick(val) {
      if (val === 'export') {
        if (this.tableData.length === 0) {
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
