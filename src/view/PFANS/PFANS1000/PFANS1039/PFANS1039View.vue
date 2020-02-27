<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-table :data="tableF" header-cell-class-name="sub_bg_color_blue" stripe border>
            <el-table-column :label="$t('label.PFANS1039FORMVIEW_THEME')" align="center" width="150">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" style="width: 100%"
                          v-model.trim="scope.row.theme"></el-input>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_CENTER')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code1"
                  :data="scope.row.center"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getcenter"
                ></dicselect>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_GROUP')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code2"
                  :data="scope.row.group"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getgroup"
                ></dicselect>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_TEAM')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code3"
                  :data="scope.row.team"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getteam"
                ></dicselect>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code4"
                  :data="scope.row.kind"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getkind"
                ></dicselect>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_CONTRACTFORM')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code5"
                  :data="scope.row.contractform"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getcontractform"
                ></dicselect>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_CURRENCYTYPE')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code6"
                  :data="scope.row.currencytype"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getcurrencytype"
                ></dicselect>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS1039FORMVIEW_COMMISSION')" align="center" width="150">
              <template slot-scope="scope">
                <dicselect
                  :code="code7"
                  :data="scope.row.commission"
                  :disabled="!disabled"
                  :no="scope.row"
                  @change="getcommission"
                ></dicselect>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1039FORMVIEW_19January')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel191"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount191" controls-position="right"
                                   style="width: 100%" :disabled="!disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1039FORMVIEW_19February')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel192"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount192" controls-position="right"
                                   style="width: 100%" :disabled="!disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS1039FORMVIEW_19March')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel193"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount193" controls-position="right"
                                   style="width: 100%" :disabled="!disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column :label="$t('label.April')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[0].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel4"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount4" controls-position="right"
                                   style="width: 100%" :disabled="arrays[0].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.May')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[1].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel5"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount5" controls-position="right"
                                   style="width: 100%" :disabled="arrays[1].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.June')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[2].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel6"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount6" controls-position="right"
                                   style="width: 100%" :disabled="arrays[2].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.July')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[3].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel7"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount7" controls-position="right"
                                   style="width: 100%" :disabled="arrays[3].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.August')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[4].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel8"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount8" controls-position="right"
                                   style="width: 100%" :disabled="arrays[4].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.September')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[5].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel9"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount9" controls-position="right"
                                   style="width: 100%" :disabled="arrays[5].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.October')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[6].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel10"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount10" controls-position="right"
                                   style="width: 100%" :disabled="arrays[6].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.November')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[7].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel11"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount11" controls-position="right"
                                   style="width: 100%" :disabled="arrays[7].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.December')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[8].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel12"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount12" controls-position="right"
                                   style="width: 100%" :disabled="arrays[8].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.January')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[9].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel1"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount1" controls-position="right"
                                   style="width: 100%" :disabled="arrays[9].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.February')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[10].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel2"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount2" controls-position="right"
                                   style="width: 100%" :disabled="arrays[10].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.March')" align="center" width="150">
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="arrays[11].disabled" maxlength="20" style="width: 100%"
                            v-model.trim="scope.row.personnel3"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount3" controls-position="right"
                                   style="width: 100%" :disabled="arrays[11].disabled"
                                   :min="0" :max="1000000000" :precision="2">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('label.operation')" align="center" width="200">
              <template slot-scope="scope">
                <el-button
                  :disabled="!disabled"
                  @click.native.prevent="deleteRowF(scope.$index, tableF)"
                  plain
                  size="small"
                  type="danger"
                >{{$t('button.delete')}}
                </el-button>
                <el-button
                  :disabled="!disabled"
                  @click="addRowF()"
                  plain
                  size="small"
                  type="primary"
                >{{$t('button.insert')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';

  export default {
    name: 'PFANS1039FormView',
    components: {
      dicselect,
      EasyNormalContainer,
    },
    data() {
      return {
        title: 'title.PFANS1039VIEW',
        loading: false,
        disabled: false,
        buttonList: [],
        disablecurr: false,
        arrays: [
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
          {disabled: true},
        ],


        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableF: [
          {
            theme: '',
            center: '',
            group: '',
            team: '',
            kind: '',
            contractform: '',
            currencytype: '',
            commission: '',
            personnel191: '',
            amount191: '',
            personnel192: '',
            amount192: '',
            personnel193: '',
            amount193: '',
            personnel4: '',
            amount4: '',
            personnel5: '',
            amount5: '',
            personnel6: '',
            amount6: '',
            personnel7: '',
            amount7: '',
            personnel8: '',
            amount8: '',
            personnel9: '',
            amount9: '',
            personnel10: '',
            amount10: '',
            personnel11: '',
            amount11: '',
            personnel12: '',
            amount12: '',
            personnel1: '',
            amount1: '',
            personnel2: '',
            amount2: '',
            personnel3: '',
            amount3: '',
          },
        ],
        baseInfo: {},
        code1: 'PJ061',
        code2: 'PJ062',
        code3: 'PJ063',
        code4: 'PJ064',
        code5: 'PJ065',
        code6: 'PJ066',
        code7: 'PJ067',
        multiple: false,
        canStart: false,
      };
    },
    mounted() {
      var date=new Date();
      var monthCurrent = date.getMonth() + 1;

      for(var i = 0; i<12; i++) {
        if(monthCurrent >= 4) {
          if(i > monthCurrent) {
            this.arrays[i].disabled = false;
          }
        }else {
          if(i > 9) {
            this.arrays[i].disabled = false;
          }
        }
      }

      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1039Store/selectById', {'businessplanid': this.$route.params._id})
          .then(response => {
            this.form = response.businessplan;
            if (response.totalplan.length > 0) {
              this.tableA = response.totalplan;
            }
            if (response.pieceworktotal.length > 0) {
              this.tableB = response.pieceworktotal;
            }
            this.userlist = this.form.user_id;
            this.baseInfo.businessplan = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.totalplan = JSON.parse(JSON.stringify(this.tableA));
            this.baseInfo.pieceworktotal = JSON.parse(JSON.stringify(this.tableB));
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
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = rst.centerNmae;
          this.form.groupid = rst.groupNmae;
          this.form.teamid = rst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    methods: {
      getcenter(val, row) {
        row.center = val;
      },
      getgroup(val, row) {
        row.group = val;
      },
      getteam(val, row) {
        row.team = val;
      },
      getkind(val, row) {
        row.kind = val;
      },
      getcontractform(val, row) {
        row.contractform = val;
      },
      getcurrencytype(val, row) {
        row.currencytype = val;
      },
      getcommission(val, row) {
        row.commission = val;
      },
      getSummaries(table) {
        let totalExpect = {};
        let totalActual = {};
        table.forEach(
          row =>{
            debugger
            let sum = 0;
            for (let i = 1;i <= 12; i++){
              if(row.assetstype1 === "1"){
                sum =  Math.round((row["money" + i]||0) / 12 * 100000) / 100000;
              }else if(row.assetstype1 === "2"){
                sum =  Math.round((row["money" + i]||0) / 36 * 100000) / 100000;
              }else if(row.assetstype1 === "3"){
                sum =  Math.round((row["money" + i]||0) / 60 * 100000) / 100000;
              }
              if(row.assetstype === "0" ){
                totalExpect["money" + i] =  sum + (totalExpect["money" + i]||0);
              }else{
                totalActual["money" + i] =  sum + (totalActual["money" + i]||0);
              }
            }
            if(row.assetstype1 === "0" ){
              totalExpect.numberfirsthalf+= row.numberfirsthalf;
              totalExpect.numbersecondhalf+= row.numbersecondhalf;
              totalExpect.numberAnnual+= row.numberAnnual;
            }else{
              totalActual.numberfirsthalf += row.numberfirsthalf;
              totalActual.numbersecondhalf += row.numbersecondhalf;
              totalActual.numberAnnual += row.numberAnnual;
            }
          }
        )
        for(let i = 4;i <= 12; i++){
          totalActual["money"+ i] += totalActual["money"+ (i - 1)];
          totalExpect["money"+ i] += totalExpect["money"+ (i - 1)];
        }
        totalActual.money1 += totalActual.money12;
        totalExpect.money1 += totalExpect.money12;
        totalActual.money2 += totalActual.money1;
        totalExpect.money2 += totalExpect.money1;
        totalActual.money3 += totalActual.money2;
        totalExpect.money3 += totalExpect.money2;

        totalExpect.moneyfirsthalf = (totalExpect.money4 + totalExpect.money5 + totalExpect.money6 + totalExpect.money7 + totalExpect.money8 + totalExpect.money9).toFixed(5);
        totalActual.moneyfirsthalf = (totalActual.money4 + totalActual.money5 + totalActual.money6 + totalActual.money7 + totalActual.money8 + totalActual.money9).toFixed(5);
        totalExpect.moneysecondhalf = (totalExpect.money10 + totalExpect.money11 + totalExpect.money12 + totalExpect.money1 + totalExpect.money2 + totalExpect.money3).toFixed(5);
        totalActual.moneysecondhalf = (totalActual.money10 + totalActual.money11 + totalActual.money12 + totalActual.money1 + totalActual.money2 + totalActual.money3).toFixed(5);
        totalExpect.moneyAnnual = (parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf)).toFixed(5);
        totalActual.moneyAnnual = (parseFloat(totalActual.moneyfirsthalf) + parseFloat(totalActual.moneysecondhalf)).toFixed(5);
        debugger
        this.tableG2 = [totalExpect,totalActual];
      },
      handleChange(scope,index){
        debugger
        if(scope.prices > 0 ){
          scope["money" + index] = scope.prices * scope["number" + index];
          if(index >= 4 && index <= 9){
            scope.numberfirsthalf = (scope.number4||0) + (scope.number5||0) + (scope.number6||0) + (scope.number7||0) + (scope.number8||0) + (scope.number9||0);
            scope.moneyfirsthalf = (scope.money4||0) + (scope.money5||0) + (scope.money6||0) + (scope.money7||0) + (scope.money8||0) + (scope.money9||0);
          } if((index >= 9 && index <= 12) || (index >= 1 && index <= 3)){
            scope.numbersecondhalf = (scope.number10||0) + (scope.number1||0) + (scope.number12||0) + (scope.number1||0) + (scope.number2||0) + (scope.number3||0);
            scope.moneysecondhalf = (scope.money10||0) + (scope.money11||0) + (scope.money12||0) + (scope.money1||0) + (scope.money2||0) + (scope.money3||0);
          }
          scope.numberAnnual = scope.numberfirsthalf +  scope.numbersecondhalf;
          scope.moneyAnnual = scope.moneyfirsthalf +  scope.moneysecondhalf;
        }
        this.getSummaries(this.tableF2);
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 34) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      formatterColumn(row,column,cellValue, index){
        debugger
        if(column.property === "type"){
          if(index === 0){
            return this.$t('label.PFANS1013FORMVIEW_CHUXIANGZHE');
          }else if(index === 2){
            return this.$t('label.PFANSUSERVIEW_MEMBERS');
          }
        }else if(column.property === "level"){
          if(index === 0){
            return "参事以上";
          }else if(index === 1){
            return "主事以下";
          }else if(index === 2){
            return "R10";
          }else if(index === 3){
            return "R9A";
          }else if(index === 4){
            return "R9B";
          }else if(index === 5){
            return "R8A";
          }else if(index === 6){
            return "R8B";
          }else if(index === 7){
            return "R8C";
          }else if(index === 8){
            return "R7";
          }else if(index === 9){
            return "R6";
          }else if(index === 10){
            return "R5";
          }else if(index === 11){
            return "R4";
          }else if(index === 12){
            return "R3";
          }
        }
      },
      getCSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getDSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getLSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getMSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getNSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getOSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getQSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        this.form.centerid = rst.centerNmae;
        this.form.groupid = rst.groupNmae;
        this.form.teamid = rst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('save');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('save');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },
      deleteRowF(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowF() {
        this.tableF.push({});
      },
      deleteRowF2(index, rows) {
        if (rows.length > 2) {
          rows.splice(index, 2);
        }
      },
      addRowF2() {
        this.tableF2.push({assetstype:"0"});
        this.tableF2.push({assetstype:"1"});
      },
      deleteRowL(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowL() {
        this.tableL.push({});
      },
      deleteRowM(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowM() {
        this.tableM.push({});
      },
      deleteRowN(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowN() {
        this.tableN.push({});
      },
      deleteRowO(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowO() {
        this.tableO.push({});
      },
      deleteRowP(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowP() {
        this.tableP.push({});
      },
      deleteRowQ(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRowQ() {
        this.tableQ.push({});
      },
      buttonClick(val) {
        if (val === 'back') {
          this.$router.push({
            name: 'PFANS1036View',
            params: {},
          });
        }
        if (val === 'save') {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.baseInfo = {};
              this.form.user_id = this.userlist;
              this.baseInfo.businessplan = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.totalplan = [];
              this.baseInfo.pieceworktotal = [];
              // for (let i = 0; i < this.tableT.length; i++) {
              //   if (this.tableT[i].trafficdate !== '' || this.tableT[i].region !== '' || this.tableT[i].vehicle !== '' || this.tableT[i].startingpoint !== ''
              //     || this.tableT[i].rmb !== '' || this.tableT[i].foreigncurrency !== '' || this.tableT[i].annexno !== '') {
              //     this.baseInfo.trafficdetails.push(
              //       {
              //         trafficdetails_id: this.tableT[i].trafficdetails_id,
              //         publicexpenseid: this.tableT[i].publicexpenseid,
              //         trafficdate: this.tableT[i].trafficdate,
              //         region: this.tableT[i].region,
              //         vehicle: this.tableT[i].vehicle,
              //         startingpoint: this.tableT[i].startingpoint,
              //         rmb: this.tableT[i].rmb,
              //         foreigncurrency: this.tableT[i].foreigncurrency,
              //         annexno: this.tableT[i].annexno,
              //       },
              //     );
              //   }
              // }
              // for (let i = 0; i < this.tableP.length; i++) {
              //   if (this.tableP[i].purchasedetailsdate !== '' || this.tableP[i].procurementdetails !== '' || this.tableP[i].procurementproject !== ''
              //     || this.tableP[i].rmb !== '' || this.tableP[i].foreigncurrency !== '' || this.tableP[i].annexno !== '') {
              //     if (this.tableP[i].procurementdetails === ' ') {
              //       this.tableP[i].procurementdetails = '';
              //     }
              //     this.baseInfo.purchasedetails.push(
              //       {
              //         purchasedetails_id: this.tableP[i].purchasedetails_id,
              //         publicexpenseid: this.tableP[i].publicexpenseid,
              //         purchasedetailsdate: this.tableP[i].purchasedetailsdate,
              //         procurementdetails: this.tableP[i].procurementdetails,
              //         procurementproject: this.tableP[i].procurementproject,
              //         rmb: this.tableP[i].rmb,
              //         foreigncurrency: this.tableP[i].foreigncurrency,
              //         annexno: this.tableP[i].annexno,
              //       },
              //     );
              //   }
              // }
              // for (let i = 0; i < this.tableR.length; i++) {
              //   if (this.tableR[i].otherdetailsdate !== '' || this.tableR[i].costitem !== '' || this.tableR[i].remarks !== ''
              //     || this.tableR[i].rmb !== '' || this.tableR[i].foreigncurrency !== '' || this.tableR[i].annexno !== '') {
              //     this.baseInfo.otherdetails.push(
              //       {
              //         otherdetails_id: this.tableR[i].otherdetails_id,
              //         publicexpenseid: this.tableR[i].publicexpenseid,
              //         otherdetailsdate: this.tableR[i].otherdetailsdate,
              //         costitem: this.tableR[i].costitem,
              //         remarks: this.tableR[i].remarks,
              //         rmb: this.tableR[i].rmb,
              //         foreigncurrency: this.tableR[i].foreigncurrency,
              //         annexno: this.tableR[i].annexno,
              //       },
              //     );
              //   }
              // }
              if (this.$route.params._id) {
                this.baseInfo.businessplan.businessplanid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1036Store/updateBusinessplan', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      this.$router.push({
                        name: 'PFANS1036View',
                      });
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  });
              } else {
                this.$store
                  .dispatch('PFANS1036Store/createBusinessplan', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.$router.push({
                      name: 'PFANS1036View',
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
            }
          });
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {

  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {

  }

  .tableClass {
    .el-table__fixed-right {
      height: 100% !important;
    }
  }

  /*.el-table tbody tr:hover>td { background-color: #fafafa }*/

  /*.el-table__fixed-right tbody tr:hover>td {*/
  /*  background-color: #fafafa;*/
  /*}*/

  .el-table__body .el-table__row.hover-row td{
    background-color: #fafafa;
  }
</style>
