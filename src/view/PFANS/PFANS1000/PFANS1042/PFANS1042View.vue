<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :noback="true" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px" :rules="rules">

          <el-form-item>
            <el-row style="padding-top: 30px">
              <el-col :span="6">
                <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year" :error="erroryear">
                  <div class="block">
                    <el-date-picker
                      type="year"
                      @change="changeYear"
                      :disabled="false"
                      style="width: 18vw"
                      v-model="form.year">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="$t('label.PFANS1039FORMVIEW_GROUP')" :error="errorgroup"  prop="group">
                  <div class="block">
                    <org :disabled="false" :error="errorgroup" :orglist="form.group_id" @getOrgids="getGroupId"
                         orgtype="2" style="width:20vw"></org>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="$t('label.PFANS5009FORMVIEW_MONTH')" :error="errormonth" prop="month">
                  <div class="block">
                    <el-select v-model="form.region"  @change="changeRegion">
                      <el-option :label="$t('label.January')" value="1"></el-option>
                      <el-option :label="$t('label.February')" value="2"></el-option>
                      <el-option :label="$t('label.March')" value="3"></el-option>
                      <el-option :label="$t('label.April')" value="4"></el-option>
                      <el-option :label="$t('label.May')" value="5"></el-option>
                      <el-option :label="$t('label.June')" value="6"></el-option>
                      <el-option :label="$t('label.July')" value="7"></el-option>
                      <el-option :label="$t('label.August')" value="8"></el-option>
                      <el-option :label="$t('label.September')" value="9"></el-option>
                      <el-option :label="$t('label.October')" value="10"></el-option>
                      <el-option :label="$t('label.November')" value="11"></el-option>
                      <el-option :label="$t('label.December')" value="12"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="padding-top: 30px">
              <el-table :data="tableData" @selection-change="handleSelectionChange()"
                        header-cell-class-name="sub_bg_color_blue" stripe height="400"
                        border
                        style="width: 100%">

                <el-table-column
                  :label="$t('label.PFANS1042FORMVIEW_MONERTYPE')"
                  align="center">
                  <el-table-column
                    :label="$t('label.PFANS1042FORMVIEW_DETAILS')"
                    align="center"
                    width="160">
                    <template slot-scope="scope">
                      <span>{{scope.row.pj}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    :label="$t('共通PJ（研修会议等）')"
                    align="center"
                    width="160">
                    <template slot-scope="scope">
                      <span>{{scope.row.pj1}}</span>
                    </template>

                  </el-table-column>
                </el-table-column>

                  <el-table-column
                    :label="$t('label.PFANS1042FORMVIEW_INCOME')"
                    align="center">

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_OUTST')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <span>{{scope.row.outst1}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_TAX')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.tax}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_INST')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.inst}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_INTOTAL')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <span>{{scope.row.intotal}}</span>
                      </template>
                    </el-table-column>
                  </el-table-column>


                  <el-table-column
                    :label="$t('label.PFANS1042FORMVIEW_EXPENDITURE')"
                    align="center">

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_EMHOURS')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.emhours}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_OUTHOURS')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <span>{{scope.row.outhours}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_PEOCOST')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.peocost}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_OUTCOST')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <span>{{scope.row.outcost}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_INWEITUO')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <span>{{scope.row.inwetuo}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_RESEARCHCOST')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.researchcost}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_DEPARTMENTCOST')"
                      align="center"
                      width="200">

                      <template slot-scope="scope">
                        <span>{{scope.row.departmentcom}}</span>
                      </template>

                    </el-table-column>


                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_DEPARTCOMCOST')"
                      align="center">

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_YUANQINCOST')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <span>{{scope.row.yuanqincost}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_TRAVALCOST')"
                        align="center"
                        width="110">

                        <template slot-scope="scope">
                          <span>{{scope.row.travalcost}}</span>
                        </template>

                      </el-table-column>


                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_CONCOST')"
                        align="center"
                        width="110">

                        <template slot-scope="scope">
                          <span>{{scope.row.concost}}</span>
                        </template>

                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_CALLCOST')"
                        align="center"
                        width="110">

                        <template slot-scope="scope">
                          <span>{{scope.row.callcost}}</span>
                        </template>

                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_BRANDCOST')"
                        align="center"
                        width="110">

                        <template slot-scope="scope">
                          <span>{{scope.row.brandcost}}</span>
                        </template>

                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_RENT')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <span>{{scope.row.rent}}</span>
                        </template>

                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_OTHER')"
                        align="center"
                        width="110">

                        <template slot-scope="scope">
                          <span>{{scope.row.other}}</span>
                        </template>

                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS1042FORMVIEW_DEPARTMENTTOTAL')"
                        align="center"
                        width="170">
                        <template slot-scope="scope">
                          <span>{{scope.row.departmenttotal}}</span>
                        </template>
                      </el-table-column>
                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_ALLOCATION')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.allocation}}</span>
                      </template>

                    </el-table-column>

                    <el-table-column
                      :label="$t('label.PFANS1042FORMVIEW_COSTTOTAL')"
                      align="center"
                      width="110">

                      <template slot-scope="scope">
                        <span>{{scope.row.costtotal}}</span>
                      </template>

                    </el-table-column>
                  </el-table-column>


                <el-table-column
                  :label="$t('label.PFANS1042FORMVIEW_PRO')"
                  align="center">

                  <el-table-column
                    :label="$t('label.PFANS1042FORMVIEW_PEOCESS')"
                    align="center"
                    width="110">

                    <template slot-scope="scope">
                      <span>{{scope.row.process}}</span>
                    </template>

                  </el-table-column>

                </el-table-column>

                <el-table-column
                  :label="$t('label.PFANS1042FORMVIEW_PROFIT')"
                  align="center">

                  <el-table-column
                    :label="$t('label.PFANS1042FORMVIEW_ARGINAL')"
                    align="center"
                    width="110">
                    <template slot-scope="scope">
                      <span>{{scope.row.marginal}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    :label="$t('label.PFANS1042FORMVIEW_OPERATION')"
                    align="center"
                    width="110">
                    <template slot-scope="scope">
                      <span>{{scope.row.Operating}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>

              </el-table>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import moment from "moment";
    import {Message} from 'element-ui';
    import user from "../../../components/user.vue";
    import org from '../../../components/org';
    import {getDictionaryInfo} from '@/utils/customize';

    export default {
    name: "PFANS1042View",
    components: {
      EasyNormalContainer,
      user,
      org,
    },
    data() {
        var years = (rule, value, callback) => {
            if (!this.form.year || this.form.year === '' || this.form.year === 'undefined') {
                callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')));
                this.error = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
            } else {
                callback();
                this.error = '';
            }
        };

        var groups = (rule, value, callback) => {

            if (!value || value === '' || value === 'undefined') {
                callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP')));
                this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
            } else {
                callback();
                this.errorgroup = '';
            }
        };

        var months = (rule, value, callback) => {
            if (!this.form.region || this.form.region === '' || this.form.region === 'undefined') {
                callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH')));
                this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
            } else {
                callback();
                this.errormonth = '';
            }
        };
      return {
        errormonth:'',
        errorgroup: '',
        erroryear: '',
        loading: false,
        buttonList: [],
        baseInfo: {},
        scope: '',
        row: '',
        form: {
          year: '',
          group_id:'',
          region:'',

        },

          rules: {

              year: [{
                  required: true,
                  validator: years,
                  trigger: 'change',
              }],
              group: [{
                  required: true,
                  validator: groups,
                  trigger: 'change',
              }],
              month: [{
                  required: true,
                  validator: months,
                  trigger: 'change',
              }],

          },

        tableData: [],
        data: [],
        multipleSelection: [],
        userlist: "",
        title: 'title.PFANS1042VIEW',
        disabled: false,
        disable: true,
        buttonList: [
          // {
          //   'key': 'save',
          //   'name': 'button.save',
          //   'disabled': false,
          // },
        ],
      };
    },
      mounted() {
          // this.getList();
      },
    methods: {
        changeRegion(val){
            this.form.region = val;
            if (this.form.group_id && this.form.year && this.form.region) {
                this.getList(this.form.group_id, this.form.year, this.form.region)
            }else {
                if (!this.form.group_id || this.form.group_id === '' || !this.form.year || this.form.year === '') {
                    if (!this.form.group_id) {
                        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                    }
                    if (!this.form.year) {
                        this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                    }

                } else {
                    this.errorgroup = '';
                }
            }

        },

        changeYear(val){
            this.form.year = moment(val).format("YYYY");
            if (this.form.group_id && this.form.region) {
                if(val){
                    this.getList(this.form.group_id, this.form.year, this.form.region)
                }
            }else {
                if (!this.form.group_id || this.form.group_id === '' || val === 'undefined' || !this.form.region || this.form.region === '') {
                    if (!this.form.group_id) {
                        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                    }
                    if (!this.form.region) {
                        this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                    }
                } else {
                    this.errorgroup = '';
                }
            }

        },

        getGroupId(val) {
            this.form.group_id = val
            this.getOrgInformation(val);
            // this.form.group_id = '807C39FFD200D8A9826FD14AF50B5D112468';
            if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
                this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
            } else {
                this.errorgroup = '';
            }
            if (this.form.year && this.form.region && this.form.group_id) {
                this.getList(this.form.group_id, this.form.year, this.form.region)
            }else{
                // this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                // this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                if (!this.form.region) {
                    this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                }
                if (!this.form.year) {
                    this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                }

            }



        },

        getOrgInformation(id) {
            let org = {};
            let treeCom = this.$store.getters.orgs;

            if (id && treeCom.getNode(id)) {
                let node = id;
                let type = treeCom.getNode(id).data.type || 0;
                for (let index = parseInt(type); index >= 1; index--) {
                    if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
                        org.teamname = treeCom.getNode(node).data.departmentname;


                        org.team_id = treeCom.getNode(node).data._id;
                    }
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
                    centername: this.form.centername,
                    groupname: this.form.groupname,
                    teamname: this.form.teamname,
                    center_id: this.form.center_id,
                    group_id: this.form.group_id,
                    team_id: this.form.team_id,
                } = org);
            }
        },


        getList(groupid, year, month) {
        this.loading = true;
        this.$store
            .dispatch('PFANS1042Store/getPltab', {'groupid': groupid, 'year': year, 'month': month})
          .then(response => {
              console.log("response",response)
              let tabledate = [];
              let date1 = getDictionaryInfo('PJ086002').value2;
              let date2 = getDictionaryInfo('PJ086003').value2;

              let wai =  getDictionaryInfo('PJ110001').value2;//0.4
              let nei =  getDictionaryInfo('PJ110002').value2;//1
              let she =  getDictionaryInfo('PJ110003').value2;//3
              let aaa = getDictionaryInfo('PP024001').value1;

              let sum = 0;

              for (let j = 0; j < response.length; j++) {
                  sum += Number(response[j].emhours)
              }

              for (let j = 0; j < response.length; j++) {
//共通PJ（研修会议等）
                  if (response[j].pj == null) {
                      response[j].pj1 = aaa
                  }
//外部受託-
                  response[j].outst1 = Number(response[j].outst1) + Number(response[j].outst2) + Number(response[j].outst3);
//税金-
                  response[j].tax = ((Number(response[j].outst2) / ((1 + date1) * date1))) + ((Number(response[j].outst3) / ((1 + date2) * date2)))
//収入合計
                  response[j].intotal =  response[j].outst1 + response[j].tax + Number(response[j].inst)

                  if (sum == 0) {
                      response[j].peocost = 0;
                      response[j].outcost = 0;
                      response[j].departmentcom = 0;
                      response[j].allocation = 0;
                  } else {
//人件费计算（給料）
                      response[j].peocost = Number(response[j].emhours) / Number(sum) * Number(response[j].peocost);
//外注費计算
                      response[j].outcost = Number(response[j].emhours) / Number(sum) * Number(response[j].outcost);
//部門共通按分
                      response[j].departmentcom = Number(response[j].emhours) / Number(sum) * Number(response[j].departmenttotal);
//配賦費用
                      response[j].allocation = (Number(response[j].emhours) / Number(sum)) * ((Number(response[j].emhours) * she * 1000 + Number(response[j].outhours) * nei * 1000 + Number(response[j].outhours) * wai * 1000))
                  }
// 部門共通費用合計
                  response[j].departmenttotal = Number(response[j].yuanqincost) + Number(response[j].travalcost) + Number(response[j].concost) + Number(response[j].callcost) + Number(response[j].brandcost) + Number(response[j].rent) + Number(response[j].other);
//支出合計
                  response[j].costtotal = response[j].peocost + response[j].outcost + Number(response[j].inwetuo) + Number(response[j].researchcost) + response[j].departmentcom
                      + Number(response[j].yuanqincost) + Number(response[j].travalcost) + Number(response[j].concost) + Number(response[j].callcost) + Number(response[j].brandcost)
                      + Number(response[j].rent) + Number(response[j].other) + Number(response[j].concost) + response[j].departmenttotal + response[j].allocation
//仕掛品処理
                  response[j].process = this.$t('label.PFANS1042FORMVIEW_OUTANDIN')
//限界利益
                  response[j].marginal = (response[j].inst + response[j].outst1) - (response[j].peocost + response[j].outcost + response[j].researchcost);
//営業利益 = 限界利益 - 所有和项目有关的费用
                  response[j].Operating = response[j].marginal - response[j].costtotal;


                  tabledate.push({
                      pj1: response[j].pj1,
                      pj: response[j].pj,
                      outst1: response[j].outst1,
                      outst2: response[j].outst2,
                      outst3: response[j].outst3,
                      tax: response[j].tax,
                      inst: response[j].inst,
                      intotal: response[j].intotal,
                      emhours: response[j].emhours,
                      outhours: response[j].outhours,
                      peocost: response[j].peocost,
                      outcost: response[j].outcost,
                      inwetuo: response[j].inwetuo,
                      researchcost: response[j].researchcost,
                      departmentcom: response[j].departmentcom,
                      yuanqincost: response[j].yuanqincost,
                      travalcost: response[j].travalcost,
                      concost: response[j].concost,
                      callcost: response[j].callcost,
                      brandcost: response[j].brandcost,
                      rent: response[j].rent,
                      other: response[j].other,
                      departmenttotal: response[j].departmenttotal,
                      allocation: response[j].allocation,
                      costtotal: response[j].costtotal,
                      process: response[j].process,
                      marginal: response[j].marginal,
                      Operating: response[j].Operating,
                })
            }

            this.tableData = tabledate;
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


      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      buttonClick(val) {
        // if (val === 'save') {
        //   this.loading = true;
        //   this.$store
        //     .dispatch('PFANS6006Store/updateDeleginformation', this.multipleSelection)
        //     .then(response => {
        //       this.data = response;
        //       this.getList(this.year);
        //       Message({
        //         message: this.$t("normal.success_02"),
        //         type: "success",
        //         duration: 5 * 1000
        //       });
        //       this.$router.push({
        //         name: 'PFANS6006View',
        //       });
        //       this.loading = false;
        //     })
        //     .catch(error => {
        //       Message({
        //         message: error,
        //         type: 'error',
        //         duration: 5 * 1000,
        //       });
        //       this.loading = false;
        //     });
        // }
      },


    },

  }
</script>

<style scoped>

</style>
