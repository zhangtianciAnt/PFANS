<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2vw">
      <el-form :model="form" label-position="top" label-width="8vw" ref="form" :rules="rules">
        <el-row style="padding-top: 2%;padding-bottom: 2%">
          <el-col :span="6">
            <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')">
              <div class="block">
                <el-date-picker
                  v-model="form.years"
                  type="year"
                  :disabled="true"
                  format="yyyy"
                  :placeholder="$t('normal.error_09')">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="centerid">
              <el-select v-model="form.centerid" style="width: 20vw" :disabled="disabledC"
                         @change="groupChange">
                <el-option
                  v-for="item in grp_options"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table
          :data="tableDataBp"
          border stripe
          :style="{width:'75VW',marginLeft:'0%',marginTop: '1%'}"
          header-cell-class-name="sub_bg_color_blue">
          <el-table-column
            prop="thisyear"
            :label="$t('label.PFANS1038VIEW_ISINOROUT')"
            width="120"
            align="center"
            :formatter="formatterIro">
          </el-table-column>
          <!--四月-->
          <el-table-column
            :label="$t('label.April')"
            align="center"
            width="130"
            prop="april">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.april">
              </el-input-number>
            </template>
          </el-table-column>
          <!--五月-->
          <el-table-column
            :label="$t('label.May')"
            align="center"
            width="130"
            prop="may">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.may">
              </el-input-number>
            </template>
          </el-table-column>
          <!--六月-->
          <el-table-column
            :label="$t('label.June')"
            align="center"
            width="130"
            prop="june">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.june">
              </el-input-number>
            </template>
          </el-table-column>
          <!--七月-->
          <el-table-column
            :label="$t('label.July')"
            align="center"
            width="130"
            prop="july">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.july">
              </el-input-number>
            </template>
          </el-table-column>
          <!--八月-->
          <el-table-column
            :label="$t('label.August')"
            align="center"
            width="130"
            prop="august">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.august">
              </el-input-number>
            </template>
          </el-table-column>
          <!--九月-->
          <el-table-column
            :label="$t('label.September')"
            align="center"
            width="130"
            prop="september">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.september">
              </el-input-number>
            </template>
          </el-table-column>
          <!--十月-->
          <el-table-column
            :label="$t('label.October')"
            align="center"
            width="130"
            prop="october">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.october">
              </el-input-number>
            </template>
          </el-table-column>
          <!--十一月-->
          <el-table-column
            :label="$t('label.November')"
            align="center"
            width="130"
            prop="november">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.november">
              </el-input-number>
            </template>
          </el-table-column>
          <!--十二月-->
          <el-table-column
            :label="$t('label.December')"
            align="center"
            width="130"
            prop="december">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.december">
              </el-input-number>
            </template>
          </el-table-column>
          <!--一月-->
          <el-table-column
            :label="$t('label.January')"
            align="center"
            width="130"
            prop="january">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.january">
              </el-input-number>
            </template>
          </el-table-column>
          <!--二月-->
          <el-table-column
            :label="$t('label.February')"
            align="center"
            width="130"
            prop="february">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.february">
              </el-input-number>
            </template>
          </el-table-column>
          <!--三月-->
          <el-table-column
            :label="$t('label.March')"
            align="center"
            width="130"
            prop="march">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="disabled"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.march">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('label.PFANS2005FORMVIEW_TOTAL')"
            align="center"
            width="130"
            prop="moneytotal"
            v-if="false">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :disabled="true"
                :min="0"
                :precision="2"
                :step="0.01"
                controls-position="right"
                style="width:90%"
                v-model.trim="scope.row.moneytotal">
              </el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
import EasyNormalContainer from "@/components/EasyNormalContainer";
import dicselect from "../../../components/dicselect";
import {Message} from 'element-ui';
import {getCurrentRoleNew, getDepartmentById, getOrgInfoByUserId, getUserInfo,getDictionaryInfo, getOrgInfo} from "../../../../utils/customize";

export default {
  name: 'PFANS1038OutFormView',
  components: {
    dicselect,
    EasyNormalContainer
  },
  watch: {
    tableDataBp:{
      deep: true,
      handler: function() {
        this.tableDataBp[0].moneytotal = (
          Number(this.tableDataBp[0].april || 0) +
          Number(this.tableDataBp[0].may || 0) +
          Number(this.tableDataBp[0].june || 0) +
          Number(this.tableDataBp[0].july || 0) +
          Number(this.tableDataBp[0].august || 0) +
          Number(this.tableDataBp[0].september || 0) +
          Number(this.tableDataBp[0].october || 0) +
          Number(this.tableDataBp[0].november || 0) +
          Number(this.tableDataBp[0].december || 0) +
          Number(this.tableDataBp[0].january || 0) +
          Number(this.tableDataBp[0].february || 0) +
          Number(this.tableDataBp[0].march || 0)).toFixed(2);
        this.tableDataBp[1].moneytotal = (
          Number(this.tableDataBp[1].april || 0) +
          Number(this.tableDataBp[1].may || 0) +
          Number(this.tableDataBp[1].june || 0) +
          Number(this.tableDataBp[1].july || 0) +
          Number(this.tableDataBp[1].august || 0) +
          Number(this.tableDataBp[1].september || 0) +
          Number(this.tableDataBp[1].october || 0) +
          Number(this.tableDataBp[1].november || 0) +
          Number(this.tableDataBp[1].december || 0) +
          Number(this.tableDataBp[1].january || 0) +
          Number(this.tableDataBp[1].february || 0) +
          Number(this.tableDataBp[1].march || 0)).toFixed(2);
      }
    }

  },
  created() {
    this.disabled = this.$route.params.disabled;
    if (!this.disabled) {
      this.buttonList = [
        {
          key: "save",
          disabled : false,
          name: "button.save",
          icon: "el-icon-check"
        }
      ];
    }
  },
  mounted() {
    if (this.$route.params._id) {
      this.disabledC = true;
      this.getOne(this.$route.params._id);
    }else{
      this.buttonList[0].disabled = false;
      if (this.userlist !== null && this.userlist !== '') {
        this.disabledC = false;
        this.getorglistname();
      }
    }
  },
  methods: {
    buttonClick(val) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.employed = JSON.stringify(this.tableDataBp[0]);
          this.form.type = this.$route.params.type;
          this.form.newentry = JSON.stringify(this.tableDataBp[1]);
          if (!this.$route.params._id) {
            this.loading = true;
            this.$store
              .dispatch("PFANS1038Store/insert", this.form)
              .then(response => {
                this.loading = false;
                Message({
                  message: this.$t("normal.success_01"),
                  type: "success"
                });
                if (this.$store.getters.historyUrl) {
                  this.$router.push(this.$store.getters.historyUrl);
                }
              })
              .catch(err => {
                this.loading = false;
                Message({
                  message: err,
                  type: "error",
                  duration: 5 * 1000
                });
              });
          }else {
            this.loading = true;
            this.$store
              .dispatch("PFANS1038Store/update", this.form)
              .then(response => {
                this.loading = false;
                Message({
                  message: this.$t("normal.success_02"),
                  type: "success"
                });
                if (val !== "update") {
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                }
              })
              .catch(err => {
                this.loading = false;
                Message({
                  message: err,
                  type: "error",
                  duration: 5 * 1000
                });
              });
          }
        }else {
          this.loading = false;
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      })
    },
    getorglistname() {
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
        || this.$store.getters.roles.indexOf("16") != -1//财务部长
        || this.$store.getters.roles.indexOf("18") != -1) //企划部长部长
      {
        this.$store.getters.orgGroupList.filter((item) => {
          vote1.push(
            {
              value: item.centerid,
              lable: item.centername,
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
      this.grp_options = letoptionsdata;
      if (!this.form.centerid && this.grp_options.length > 0)
      {
        this.form.centerid = this.grp_options[0].value;
      }
      //UPD CCM 20210422
    },
    getOne(id) {
      this.loading = true;
      this.show2=true;
      this.$store
        .dispatch("PFANS1038Store/getOne", id)
        .then(response => {
          this.loading = false;
          this.form = response;
          this.form.years = response.years+ "";
          if (response.centerid)
          {
            this.grp_options = [];
            let user = getDepartmentById(response.centerid);
            if (user) {
              this.grp_options.push({
                value: response.centerid,
                lable: user,
              },)
              this.form.centerid = response.centerid;
            }
          }
          // this.form.center_id = response.center_id;
          this.tableDataBp = [];
          this.tableDataBp.push(JSON.parse(this.form.employed))
          this.tableDataBp.push(JSON.parse(this.form.newentry))
        })
        .catch(error => {
          Message({
            message: error,
            type: "error",
            duration: 5 * 1000
          });
          this.loading = false;
        });
    },
    groupChange(val) {
      this.form.centerid = val;
      this.getExpatriatesinfor()
    },
    getExpatriatesinfor() {
      let id = this.form.centerid;
      this.buttonList[0].disabled = false;
      // this.tableDataBp = [];
      this.$store
        .dispatch('PFANS1038Store/getExpatriatesinfor', id)
        .then(response => {
          // if (response.length > 0) {
          //   for (let i=0;i < response.length;i++)
          //   {
          //     response[i].nextyear = response[i].thisyear;
          //     this.tableData.push({
          //       name: response[i].name,
          //       thisyear: response[i].thisyear,
          //       nextyear: response[i].nextyear,
          //       summerplanpc: '',
          //       suppliername:response[i].suppliername,
          //       unitprice:response[i].unitprice,
          //     });
          //   }
          //
          // }
          // else
          // {
          //   this.buttonList[0].disabled = true;
          // }
        })
        .catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
        })
    },
    formatterIro(row, column, cellValue, index) {
      if (index === 0) {
        return this.$t('label.PFANS1038VIEW_INSIDE')
      }else {
        return this.$t('label.PFANS1038VIEW_OUTSIDE')
      }
    },
  },
  data() {
    return {
      loading: false,
      disabled: true,
      disabledC:false,
      buttonList: [],
      titles: "label.PFANS1038VIEW_OUTOFHOME",
      grp_options: [],
      form: {
        years:'2021',
        centerid:'',
      },
      tableDataBp: [
        {
          april:'',
          may:'',
          june:'',
          july:'',
          august:'',
          september:'',
          october:'',
          november:'',
          december:'',
          january:'',
          february:'',
          march:'',
          moneytotal:'',
        },
        {
          april:'',
          may:'',
          june:'',
          july:'',
          august:'',
          september:'',
          october:'',
          november:'',
          december:'',
          january:'',
          february:'',
          march:'',
          moneytotal:'',
        }
      ],
      rules: {
        centerid: [
          {
            required: true,
            message:
              this.$t('normal.error_09') +
              this.$t('label.PFANS2036VIEW_DEPARTMENT'),
            trigger: 'blur',
          },
        ],
      },
    }
  }
}
</script>

<style scoped>


</style>
