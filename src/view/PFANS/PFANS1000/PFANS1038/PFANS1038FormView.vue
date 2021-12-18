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

        <el-tabs v-model="activeName"  type="border-card">
          <!--现时点人员-->
          <el-tab-pane
            :label="$t('label.PFANS1038VIEW_REALISTIC')"
            name="first"
          >
            <!--            外驻计划-->
            <el-table
              :data="tableData"
              border stripe
              :style="{width:(this.$route.params.type === 0?'80VW':'75VW'),marginLeft:'0%',marginTop: '1%'}"
              header-cell-class-name="sub_bg_color_blue">
              <!--            NO.-->
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <!--            外驻先-->
              <el-table-column
                prop="suppliername"
                :label="$t('label.PFANS1038VIEW_STATIONED')"
                width="180"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
              </el-table-column>
              <!--            社员名前-->
              <el-table-column
                prop="name"
                :label="$t('label.PFANS1038VIEW_MEMBER')"
                width="180"
                align="center">
              </el-table-column>
              <!--            当前年度RANK-->
              <el-table-column
                prop="thisyear"
                :label="getThisYearLevel"
                width="180"
                align="center"
                :formatter="formatterDic">
              </el-table-column>
              <!--本社员 下一年度RANK-->
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180"
                align="center"
                :formatter="formatterDic"
                v-if="this.$route.params.type === 0 ? true : false"
              >
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code1"
                    :data="scope.row.nextyear"
                    :disabled="disabled"
                    :multiple="multiple"
                    @change="changeRank"
                    style="width: 6vw"
                    size="small"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--外注社员 下一年度RANK-->
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180"
                align="center"
                v-if="this.$route.params.type === 1 ? true : false"
              >
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code1"
                    :data="scope.row.nextyear"
                    :disabled="disabled"
                    :multiple="multiple"
                    @change="changeRankBP"
                    style="width: 6vw"
                    size="small"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--              社内计划 人件费-->
              <el-table-column
                prop="summerplanpc"
                :label="$t('label.PFANS2036VIEW_APTOJUCOST')"
                width="180"
                v-if="false"
                align="center">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS2036VIEW_APTOJUCOST')"
                width="180"
                align="center">
              </el-table-column>
              <!--              外驻计划 单价-->
              <el-table-column
                prop="unitprice"
                :label="$t('label.PFANS1038VIEW_UNITPRICE')"
                width="180"
                v-if="this.$route.params.type === 1 ? true : false"
                align="center">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.unitprice"
                                   controls-position="right"
                                   style="width: 100%"
                                   :disabled="disabled"
                                   :min="0" :max="10000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
              <!--操作-->
<!--              人员计划添加删除按钮 ztc fr-->
              <el-table-column :label="$t('label.operation')" width="80" align="left">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteXsRow(scope.$index, tableData)"
                    type="danger"
                    size="small"
                    :disabled="disabled"
                    plain
                  >{{$t('button.delete')}}
                  </el-button>
<!--                  <el-button-->
<!--                    @click="addRowXs"-->
<!--                    type="primary"-->
<!--                    size="small"-->
<!--                    :disabled="disabled"-->
<!--                    plain-->
<!--                  >{{$t('button.insert')}}-->
<!--                  </el-button>-->
                </template>
              </el-table-column>
<!--              人员计划添加删除按钮 ztc to-->
            </el-table>
          </el-tab-pane>

          <!--新入职人员-->
          <el-tab-pane :label="$t('label.PFANS1038VIEW_NEWHIRES')" name="second">
            <el-table
              :data="newTableData"
              border stripe
              :style="{width:(this.$route.params.type === 0?'80vw':'75vw'),marginLeft:'0%',marginTop: '1%'}"
              header-cell-class-name="sub_bg_color_blue">
              <!--            NO.-->
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <!--            外驻先-->
              <el-table-column
                :label="$t('label.PFANS1038VIEW_STATIONED')"
                width="210"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
                <template slot-scope="scope">
                  <el-col :span="8">
                    <div class="dpSupIndex" style="width:16vw" prop="supchinese">
                      <el-container>
                        <input class="content bg" v-model="scope.row.supchinese"
                               :disabled="disabled" style="min-width: 50%;width: 50%"></input>
                        <el-button :disabled="disabled" icon="el-icon-search" @click="dialogone(scope.row)"
                                   size="small"></el-button>
                        <el-dialog :visible.sync="dialogVisibleE" center
                                   size="50%"
                                   top="8vh" lock-scroll
                                   append-to-body>
                          <div style="text-align: center">
                            <el-row style="text-align: center;height: 90%;overflow: hidden">
                              <el-table
                                :data="externalOption.filter(data => !search || data.supchinese.toLowerCase().includes(search.toLowerCase()))"
                                height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                @row-click="rowClickE">
                                <el-table-column property="supchinese" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                 width="150"></el-table-column>
                                  <el-table-column property="abbreviation" :label="$t('label.PFANS6001VIEW_ABBREVIATION')"
                                                   width="120"></el-table-column>
                                  <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')"
                                                   width="80"></el-table-column>
                                  <el-table-column property="protelephone" :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                                   width="120"></el-table-column>
                                  <el-table-column
                                    align="right" width="230">
                                    <template slot="header" slot-scope="scope">
                                      <el-input
                                        v-model="search"
                                        size="mini"
                                        :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                    </template>
                                  </el-table-column>
                              </el-table>
                            </el-row>
                            <span slot="footer" class="dialog-footer">
                                  <el-button type="primary"
                                             @click="submit()">{{$t('button.confirm')}}</el-button>
                                </span>
                          </div>
                        </el-dialog>
                      </el-container>
                    </div>
                  </el-col>
                </template>
              </el-table-column>
              <!--      社内下一年度RANK-->
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180"
                align="center"
                v-if="this.$route.params.type === 0 ? true : false">
              >
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code1"
                    :data="scope.row.nextyear"
                    :disabled="disabled"
                    :multiple="multiple"
                    @change="changeRank"
                    style="width: 6vw"
                    size="small"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--      外驻下一年度RANK-->
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="200"
                align="center"
                v-if="this.$route.params.type === 0 ? false : true">
              >
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code1"
                    :data="scope.row.nextyear"
                    :disabled="disabled"
                    :multiple="multiple"
                    @change="changeRankBP"
                    style="width: 6vw"
                    size="small"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--新规采用入社预定日-->
              <el-table-column
                prop="entermouth"
                :label="$t('label.PFANS1038VIEW_ADOPTED')"
                width="220"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.entermouth"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width:10vw"
                    :disabled="disabled"
                    size="small">
                  </el-date-picker>
                </template>
              </el-table-column>
              <!--         是否构外-->
              <el-table-column
                prop="isoutside"
                :label="$t('label.PFANS1038VIEW_WHETHER')"
                width="100"
                align="center"
                v-if="this.$route.params.type === 0 ? false : true">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isoutside"
                    :disabled="disabled"
                    >
                  </el-switch>
                </template>
              </el-table-column>
              <!--              人件费-->
<!--              <el-table-column-->
<!--                prop="summerplanpc"-->
<!--                :label="$t('label.PFANS2036VIEW_APTOJUCOST')"-->
<!--                width="180"-->
<!--                v-if="this.$route.params.type === 0 ? true : false"-->
<!--                align="center">-->
<!--              </el-table-column>-->
              <el-table-column
                prop="summerplanpc"
                :label="$t('label.PFANS2036VIEW_APTOJUCOST')"
                width="180"
                v-if="false"
                align="center">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS2036VIEW_APTOJUCOST')"
                width="180"
                align="center">
              </el-table-column>
              <!--              单价-->
              <el-table-column
                prop="unitprice"
                :label="$t('label.PFANS3005VIEW_UNITPRICE')"
                width="180"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.unitprice"
                                   controls-position="right"
                                   style="width: 100%"
                                   :disabled="disabled"
                                   :min="0" :max="10000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
              <!--              操作-->
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, newTableData)"
                    type="danger"
                    size="small"
                    :disabled="disabled"
                    plain
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow"
                    type="primary"
                    size="small"
                    :disabled="disabled"
                    plain
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import {Message} from 'element-ui';
    import {getOrgInfoByUserId,getCurrentRoleNew,getDepartmentById,getUserInfo} from '@/utils/customize';
    import moment from "moment";
    import dicselect from "../../../components/dicselect";
    import {getDictionaryInfo, getOrgInfo} from "../../../../utils/customize";
    import user from "../../../components/user";

    export default {
        name: 'PFANS1038FormView',
        components: {
          dicselect,
            EasyNormalContainer
        },
        data() {
            return {
              grp_options: [],
              enterMouth: "",
              disabled: true,
              rowindextag: '',
              disabledC:false,
              multiple: false,
              tableDataRankPrice:[],
              code1: 'PR021',
                options: [
                //   {
                //     value: 'PR021001',
                //     label: 'R3'
                // }, {
                //     value: 'PR021002',
                //     label: 'R4'
                // }, {
                //     value: 'PR021003',
                //     label: 'R5'
                // }, {
                //     value: 'PR021004',
                //     label: 'R6'
                // }, {
                //     value: 'PR021005',
                //     label: 'R7'
                // }, {
                //     value: 'PR021006',
                //     label: 'R8C'
                // }, {
                //     value: 'PR021007',
                //     label: 'R8B'
                // }, {
                //     value: 'PR021008',
                //     label: 'R8A'
                // }, {
                //     value: 'PR021009',
                //     label: 'R9A'
                // }, {
                //     value: 'PR021010',
                //     label: 'R9B'
                // }, {
                //     value: 'PR021011',
                //     label: 'R10'
                // }, {
                //     value: 'PR021012',
                //     label: 'R11A'
                // }, {
                //     value: 'PR021013',
                //     label: 'R11B'
                // }, {
                //     value: 'PJ053001',
                //     label: this.$t("label.PFANS1036FORMVIEW_COUNSELORUP")
                // }, {
                //     value: 'PJ053002',
                //     label: this.$t("label.PFANS1036FORMVIEW_CHANCELLORDOWN")
                // }
                  ],

                loading: false,
                externalOption: [],
                // newTableData: [{"name": "","supchinese":"","nextyear":"", "isoutside": false, "entermouth": null,"summerplanpc":"","unitprice":""}],
              newTableData:[
                {
                  rowindex:'',
                  suppliernameid:'',
                  supchinese:'',
                  thisyear:'',
                  nextyear:'',
                  entermouth:null,
                  isoutside:false,
                  summerplanpc:'',
                  unitprice:''
                }
              ],
              tableData: [
                  {
                    name:'',
                    thisyear:'',
                    nextyear:'',
                    summerplanpc:'',

                    suppliername:'',
                    unitprice:''
                  }
                ],
                activeName: "first",
                buttonList: [],
                show: false,
                show1: false,
                dialogVisibleE: false,
                search:'',
                currentRow1: '',
                currentRow2: '',
                currentRow3: '',
                currentRow4: '',
                // add-lyt-21/1/29-禅道任务648-start
                show2:false,
                show3:false,
                //add-lyt-21/1/29-禅道任务648-end
                titles: this.$route.params.type === 0 ? "label.PFANS1038VIEW_MEMBERSHIP" : "label.PFANS1038VIEW_OUTOFHOME",
                form: {
                    //years: parseInt(moment(new Date()).format("YYYY"))+1+ "",
                  years:parseInt(moment(new Date()).format("MM")) >=  4 ? parseInt(moment(new Date()).format("YYYY"))+1+ "" : moment(new Date()).format("YYYY"),
                  //,"YYYY-MM-DD").valueOf() >= moment(moment(new Date(),"YYYY") + "04-01").valueOf() ? parseInt(moment(new Date(),"YYYY")) +1+"" : moment(new Date(),"YYYY")+"",
                  // years:'2021',
                  centerid:'',
                },
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
            };
        },
        computed: {

            getThisYearLevel: function () {
                if (this.form.years) {
                     return parseInt(this.form.years)-1 + "";
                } else {
                    this.form.years = moment().subtract(3, 'M').format('YYYY');
                    return parseInt(this.form.years)-1 + "";
                }
            },
            getNextYearLevel: function () {
                return (parseInt(this.form.years)) + "";
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
            this.getExternal();
            if (this.$route.params.type === 0) {
                this.show = false;
            } else if (this.$route.params.type !== 0) {
                this.show = false;
            }
            if (this.$route.params._id) {
                this.disabledC = true;
                this.getOne(this.$route.params._id);
            } else {
                this.buttonList[0].disabled = true;
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                  this.disabledC = false;
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    //UPD CCM 20210422
                    // this.$route.params.type === 0 ? this.getPersonalCost(rst.centerId || "") : this.getExpatriatesinfor(rst.centerId || "")
                  this.getorglistname();
                  if (this.form.centerid)
                  {
                    this.$route.params.type === 0 ? this.getPersonalCost() : this.getExpatriatesinfor()
                  }
                    //UPD CCM 20210422
                }
            }
        },
        methods: {
          dialogone(val){
            this.dialogVisibleE = true;
            this.rowindextag = val.rowindex;
          },
          rowClickE(val) {
            this.currentRow = val.supplierinfor_id;
            this.currentRow1 = val.supchinese;
          },
          submit() {
            for(let i = 0; i < this.newTableData.length; i++){
              if(this.newTableData[i].rowindex === this.rowindextag || this.newTableData[i].rowindex === Number(this.rowindextag)){
                this.newTableData[i].supplierinfor_id = this.currentRow;
                this.newTableData[i].supchinese = this.currentRow1;
              }
            }
            this.dialogVisibleE = false;
          },
            // yearChange(value) {
            //     this.form.years = moment(value).format('YYYY');
            //     this.newTableData[0].entermouth =  moment(value).format('YYYY')+'-'+moment(new Date()).format('MM');
            //     this.enterMouth =  moment(value).format('YYYY')+'-'+moment(new Date()).format('MM');
            // },
          groupChange(val) {
            this.buttonList[0].disabled = true;
            this.form.centerid = val;
            this.$route.params.type === 0 ? this.getPersonalCost() : this.getExpatriatesinfor()
          },
          checkRequire() {
              for (let i = 0; i < this.tableData.length; i++) {
                  if (this.tableData[i].nextyear === undefined) {
                      this.activeName = "first";
                  }
              }
          },
          // add-lyt-21/1/29-禅道任务648-start
          getorglistname()
          {
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
              this.getRANK();
            }

            //UPD CCM 20210422
          },
          //UPD CCM 20210422
          // getPersonalCost(id) {
          getPersonalCost() {
            this.show2=true;
            let params={
              groupid : this.form.centerid,
              years : this.form.years,
            };
            this.tableData = [];
            this.$store
              .dispatch('PFANS1038Store/getPersonalCost',params)
              .then(response => {
                if (response.length>0)
                {
                  for (var i = 0; i < response.length; i++){
                    if(response[i].ltrank == "" || response[i].ltrank == null || response[i].ltrank == undefined){
                      response[i].ltrank = response[i].exrank;
                    }
                    this.tableData.push({
                      name: response[i].username,
                      thisyear: response[i].exrank,
                      nextyear: response[i].ltrank,
                      summerplanpc: response[i].aptoju,
                      suppliername:'',
                      unitprice:''
                    });
                  }
                }
                this.buttonList[0].disabled = false;
                })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                });
              })
          },
            getExpatriatesinfor() {
              let id = this.form.centerid;
              this.tableData = [];
                this.show3=true;
                this.$store
                    .dispatch('PFANS1038Store/getExpatriatesinfor', id)
                    .then(response => {

                        if (response.length > 0) {
                          for (let i=0;i < response.length;i++)
                          {
                              response[i].nextyear = response[i].thisyear;
                              this.tableData.push({
                                name: response[i].name,
                                thisyear: response[i].thisyear,
                                nextyear: response[i].nextyear,
                                summerplanpc: '',
                                suppliername:response[i].suppliername,
                                unitprice:response[i].unitprice,
                            });
                          }
                          this.buttonList[0].disabled = false;
                        }
                        else
                        {
                          this.buttonList[0].disabled = true;
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    })
            },
            getExternal() {
                this.$store
                    .dispatch('PFANS1038Store/getExternal')
                    .then(response => {
                        // this.$store.commit("global/SET_SUPPLIERINFOR", response);
                        if (response.length > 0) {
                          for (let j = 0; j < response.length; j++)
                          {
                            if (response[j].liableperson !== null && response[j].liableperson !== '') {
                              let liableperson = getUserInfo(response[j].liableperson);
                              if (liableperson) {
                                response[j].liableperson = user.userinfo.customername;
                              }
                            }
                            if (response[j].protelephone !== null && response[j].protelephone !== '') {
                              let protelephone = getUserInfo(response[j].protelephone);
                              if (protelephone) {
                                response[j].protelephone = user.userinfo.customername;
                              }
                            }
                          }
                          this.externalOption = response;
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    })
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
                            this.getRANK();
                          }
                        }
                        // this.form.center_id = response.center_id;
                        this.tableData = JSON.parse(this.form.employed);
                        if (this.form.newentry)
                        {
                          this.newTableData = JSON.parse(this.form.newentry);
                          if (this.newTableData =='')
                          {
                            // this.newTableData.push({"name": "", "isoutside": false, "entermouth": this.enterMouth});
                            this.newTableData.push({"rowindex":"","name": "","supchinese":"","nextyear":"", "isoutside": false, "entermouth": this.enterMouth,"summerplanpc":"","unitprice":""});
                          }
                        }
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error,
                            type: "error",
                            duration: 5 * 1000
                        });
                        this.loading = false;
                    });
            },
            formatterDic(row, column) {
                if (column.property === "thisyear" || column.property === "nextyear") {
                    if (row[column.property]) {
                        let dic = getDictionaryInfo(row[column.property]);
                        return dic === null ? "-" : dic.value1;
                    } else {
                        return "-";
                    }
                } else if (column.property === "entermouth") {
                    if (row[column.property] === "BP025004") {
                        if (this.i18n) {
                            return this.$t('label.PFANS1038VIEW_OUTSIDE')
                        }
                    }
                    return "-";
                } else {
                    return row[column.property];
                }
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
                else {
                  this.newTableData = [
                    {
                      rowindex:'',
                      name: '',
                      supchinese: '',
                      nextyear: null,
                      isoutside: false,
                      entermouth: null,
                      summerplanpc: '',
                      unitprice: '',
                    },
                  ]
                }
            },
            addRow() {
              let num = this.newTableData[this.newTableData.length - 1].rowindex;
              this.newTableData.push({
                "rowindex":num+1,
                "name": "",
                "supchinese":"",
                "nextyear":"",
                "isoutside": false,
                "entermouth": null,
                "summerplanpc":"",
                "unitprice":""
              });
            },
          // 人员计划添加删除按钮 ztc fr
            deleteXsRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
                else {
                  this.tableData = [
                    {
                      rowindex:'',
                      name: '',
                      thisyear: '',
                      nextyear: '',
                      summerplanpc: '',
                      suppliername: '',
                      unitprice: '',
                    },
                  ]
                }
            },
            // addRowXs() {
            //   let num = this.tableData[this.tableData.length - 1].rowindex;
            //   this.tableData.push({
            //     "rowindex":num+1,
            //     "name": "",
            //     "thisyear":"",
            //     "nextyear":"",
            //     "summerplanpc": "",
            //     "suppliername": "",
            //     "unitprice":"",
            //   });
            // },
          // 人员计划添加删除按钮 ztc to
            changeOption(val, row) {
                if (val) {
                    if (this.i18n) {
                        row.entermouth = this.$t('label.PFANS1038VIEW_OUTSIDE');
                    }
                } else {
                    row.entermouth = null;
                }
            },
            buttonClick(val) {
              this.$refs['form'].validate(valid => {
                if (valid) {
                  this.checkRequire();
                  this.form.employed = JSON.stringify(this.tableData);
                  let newTableDatalinshi = [];


                  this.form.type = this.$route.params.type;
                  // if (this.userlist !== null && this.userlist !== '') {
                  //     let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                  //     this.form.centerid = rst.centerId;
                  //     this.form.groupid = rst.groupId;
                  // }
                  let error = false;
                  let error1 = false;
                  if (this.$route.params.type === 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].nextyear == undefined) {
                        error = true;
                      }
                    }
                    for (let i = 0; i < this.newTableData.length; i++) {
                        if (this.newTableData[i].nextyear === undefined || this.newTableData[i].nextyear === "" || this.newTableData[i].entermouth === "" || this.newTableData[i].entermouth === undefined) {
                            // error1 = true;
                        }
                    }
                  }
                  if (this.$route.params.type !== 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].nextyear == undefined) {
                        error = true;
                      }
                    }
                    for (let i = 0; i < this.newTableData.length; i++) {
                        if (this.newTableData[i].nextyear === undefined || this.newTableData[i].nextyear === "" || this.newTableData[i].entermouth === "" || this.newTableData[i].entermouth === undefined || this.newTableData[i].supchinese === "") {
                            // error1 = true;
                        }
                    }
                  }

                  if (this.newTableData)
                  {
                    for (let i=0;i<this.newTableData.length;i++)
                    {
                      if (this.newTableData[i].nextyear!=null && this.newTableData[i].nextyear!='' && this.newTableData[i].nextyear != undefined)
                      {
                        newTableDatalinshi.push(this.newTableData[i]);
                      }
                    }
                  }
                  if (newTableDatalinshi !=[])
                  {
                    this.form.newentry = JSON.stringify(newTableDatalinshi);
                  }
                  else
                  {
                    this.form.newentry = newTableDatalinshi;
                  }

                  if (error) {
                    this.activeName = 'first';
                    Message({
                      message: this.$t('normal.error_08') +
                        this.$t('label.PFANS1038VIEW_REALISTIC') +
                        this.$t('label.PFANS1038VIEW_NEWHIRES2'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    } else if (error1) {
                      this.activeName = 'second';
                        Message({
                            message: this.$t('label.PFANS1038VIEW_INFORMATIONSUCCESS'),
                            type: 'error',
                            duration: 5 * 1000,
                        });
                  } else if (!this.$route.params._id) {
                    //region scc add 9/29 新规采用入社预定日非空check from
                    let flag = false;
                    this.newTableData.forEach(item =>{
                      if(!item.entermouth && (item.supchinese || item.nextyear || item.unitprice)){
                        this.$message.error({
                          message: this.$t("label.PFANS1038VIEW_ADOPTEDCHECK"),
                          type: "error"
                        });
                        flag = true;
                      }
                    })
                    if(flag){
                      return;
                    }
                    //endregion scc add 9/29 新规采用入社预定日非空check to
                    this.loading = true;
                    this.$store
                      .dispatch("PFANS1038Store/insert", this.form)
                      .then(response => {
                        this.loading = false;
                        this.$message.success({
                          message: this.$t("normal.success_01"),
                          type: "success"
                        });
                        if (this.$store.getters.historyUrl) {
                          this.$router.push(this.$store.getters.historyUrl);
                        }
                      })
                      .catch(err => {
                        this.loading = false;
                        this.$message.error({
                          message: err,
                          type: "error",
                          duration: 5 * 1000
                        });
                      });
                  } else {
                    //region scc add 9/29 新规采用入社预定日非空check from
                    let flag = false;
                    this.newTableData.forEach(item =>{
                      if(!item.entermouth && (item.supchinese || item.nextyear || item.unitprice)){
                        this.$message.error({
                          message: this.$t("label.PFANS1038VIEW_ADOPTEDCHECK"),
                          type: "error"
                        });
                        flag = true;
                      }
                    })
                    if(flag){
                      return;
                    }
                    //endregion scc add 9/29 新规采用入社预定日非空check to
                    this.loading = true;
                    this.$store
                      .dispatch("PFANS1038Store/update", this.form)
                      .then(response => {
                        this.loading = false;
                        this.$message.success({
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
                        this.$message.error({
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
            getRANK(){
              this.tableDataRankPrice =[];
              this.loading = true;
              let parameter = {
                year : this.form.years,
                groupid : this.form.centerid,
              };
              this.$store
                .dispatch('PFANS4003Store/getpeoplewareList',parameter)
                .then(res => {
                  if(res.length > 0){
                    this.tableDataRankPrice = res;
                  }
                })
                .catch(error => {
                  this.$message.error({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                  });
                  this.loading = false
                })
              this.loading = false
            },
            changeRank(val, row){
              row.nextyear = val;
              if (this.tableDataRankPrice.length>0)
              {
                let dic = getDictionaryInfo(val);
                if (dic!=null)
                {
                  let rankprice = this.tableDataRankPrice.filter(item=> item.ranks === dic.value1)
                  if (rankprice.length>0)
                  {
                    row.summerplanpc = rankprice[0].ageprice;
                  }
                  else
                  {
                    row.summerplanpc = 0;
                  }
                }
              }
            },
          changeRankBP(val, row){
            row.nextyear = val;
          },
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
