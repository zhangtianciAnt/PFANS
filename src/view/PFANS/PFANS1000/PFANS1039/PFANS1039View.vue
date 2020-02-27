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
                    <el-table :data="tableF" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center"
                                         width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowF(scope.$index, tableF)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
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
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import {telephoneNumber} from '@/utils/validate';
  import dicselect from '../../../components/dicselect';

  export default {
    name: 'PFANS1012FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = '';
          return callback();
        }
      };
      var checktele = (rule, value, callback) => {
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1036VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        month:"",
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', ["社外"]);
            }
          }]
        },
        options1: [{
          value: '1',
          label: '1年'
        }, {
          value: '2',
          label: '3年'
        }, {
          value: '3',
          label: '5年'
        }],
        tableTValue: '',
        tablePValue: '',
        tableZValue: '',
        tableYValue: '',
        error: '',
        options: [],
        selectType: 'Single',
        title: 'title.PFANS1036VIEW',
        userlist: '',
        activeName: 'first',
        activeName2: 'first',
        activeName3: 'first',
        activeName4: 'first',
        activeName5: 'first',
        activeName6: 'first',
        activeName7: 'first',
        activeName8: 'first',
        loading: false,
        disable: false,
        disablecurr: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableA: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALPLAN'),
            totalplan_id: '',
            businessplanid: '',
            number4: '',
            workinghours4: '',
            number5: '',
            workinghours5: '',
            number6: '',
            workinghours6: '',
            number7: '',
            workinghours7: '',
            number8: '',
            workinghours8: '',
            number9: '',
            workinghours9: '',
            number10: '',
            workinghours10: '',
            number11: '',
            workinghours11: '',
            number12: '',
            workinghours12: '',
            number1: '',
            workinghours1: '',
            number2: '',
            workinghours2: '',
            number3: '',
            workinghours3: '',
            numberfirsthalf: '',
            workinghoursfirsthalf: '',
            numbersecondhalf: '',
            workinghourssecondhalf: '',
            numberannual: '',
            workinghoursannual: '',
            rowindex: '',

          },
        ],
        tableB: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALPLAN'),
            pay4: '',
            overtimepay4: '',
            pay5: '',
            overtimepay5: '',
            pay6: '',
            overtimepay6: '',
            pay7: '',
            overtimepay7: '',
            pay8: '',
            overtimepay8: '',
            pay9: '',
            overtimepay9: '',
            pay10: '',
            overtimepay10: '',
            pay11: '',
            overtimepay11: '',
            pay12: '',
            overtimepay12: '',
            pay1: '',
            overtimepay1: '',
            pay2: '',
            overtimepay2: '',
            pay3: '',
            overtimepay3: '',
            payupper: '',
            overtimepayupper: '',
            paylower: '',
            overtimelower: '',
            payyear: '',
            overtimepayyear: '',
            rowindex: '',
          },
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTAL'),
          },
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALTHOUSAND'),
          },
        ],
        tableC: [
          {},{},{},{},{},{},{},{},{},{},{},{},{}
        ],
        tableD: [
        ],
        tableE: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableE2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableF: [

        ],
        tableF2: [
          {assetstype:"0"},
          {assetstype:"1"}
        ],
        tableG: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableG2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableH: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableH2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableI: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableI2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableJ: [
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_DOMESTICTRAVEL'),
            jjj2: '3.15',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_JAPANBUSINESSTRAVEL'),
            jjj2: '11.1',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_BUSINESSTRAVEL'),
            jjj2: '18.9',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
          {
            jjj: this.$t('label.PFANS1036FORMVIEW_TOTAL'),
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            jjj: '',
            jjj2: '',
            jjj3: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableK: [
          {
            kkk: this.$t('label.PFANS1036FORMVIEW_B1'),
          },
          {
            kkk: this.$t('label.PFANS1036FORMVIEW_B2'),
          },
          {
            kkk: this.$t('label.PFANS1036FORMVIEW_B3'),
          },
        ],
        tableL: [
          {},
        ],
        tableM: [
          {},
        ],
        tableN: [
          {},
        ],
        tableO: [
          {},
        ],
        tableP: [
        ],
        tableQ: [
        ],
        tableR: [
          {},
          {},
          {},
        ],
        baseInfo: {},
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
        },
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
        code7: '',
        code8: '',
        multiple: false,
        canStart: false,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1036Store/selectById', {'businessplanid': this.$route.params._id})
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
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
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
