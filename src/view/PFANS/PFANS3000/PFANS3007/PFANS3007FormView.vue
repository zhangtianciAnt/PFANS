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
                 style="padding:2vw">
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_BUSINESSCITY')" prop="businesscity">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model.trim="form.businesscity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_TRAVELCLUBPLACE')" prop="travelclubplace">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model.trim="form.travelclubplace"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                <dicselect
                  :code="code"
                  :data="form.budgetunit"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getbudgetunit"
                  style="width:20vw"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_CONDOMINIUMCOMPANY')" prop="condominiumcompany">
                <dicselect
                  :code="code2"
                  :data="form.condominiumcompany"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getcondominiumcompany"
                  style="width:20vw"
                >
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_APARTMENTPLACE')" prop="apartmentplace" v-if="show">
                <dicselect
                  :data="form.apartmentplace"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getapartmentplace"
                  style="width:20vw"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_APARTMENTPLACE')" prop="apartmentplace" v-if="show2">
                <dicselect
                  :code="code3"
                  :data="form.apartmentplace"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getapartmentplace"
                  style="width:20vw"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_APARTMENTPLACE')" prop="apartmentplace" v-if="show3">
                <dicselect
                  :code="code5"
                  :data="form.apartmentplace"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getapartmentplace"
                  style="width:20vw"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_HOUSENUMBER')" prop="housenumber">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model.trim="form.housenumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007VIEW_CONTRACTSTARTDATE')" prop="contractstartdate">
                  <div class="block">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:20vw"
                      type="date"
                      v-model="form.contractstartdate">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_CONTRACTENDDATE')" prop="contractenddate">
                <div class="block">
                  <el-date-picker
                    :disabled="!disable"
                    style="width:20vw"
                    type="date"
                    v-model="form.contractenddate">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_CONTRACTDATENUMBER')" prop="contractdatenumber">
                <el-input :disabled="true" style="width:20vw" v-model="form.contractdatenumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007VIEW_BUSINESSSTARTDATE')" prop="businessstartdate">
                  <div class="block">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:20vw"
                      type="date"
                      v-model="form.businessstartdate">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_BUSINESSENDDATE')" prop="businessenddate">
                <div class="block">
                  <el-date-picker
                    :disabled="!disable"
                    style="width:20vw"
                    type="date"
                    v-model="form.businessenddate">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_BUSINESSDATENUMBER')" prop="businessdatenumber">
                <el-input :disabled="true" style="width:20vw" v-model="form.businessdatenumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007VIEW_CONTRACTTIME')" prop="contracttime">
                  <div class="block">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:20vw"
                      type="date"
                      v-model="form.contracttime">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007VIEW_TOTALCOST')" prop="totalcost">
                  <el-input-number :disabled="!disable" @change="changetotalcost" maxlength='20' style="width:20vw"
                                   controls-position="right" :max="9999999999" :precision="2"
                                   v-model.trim="form.totalcost"></el-input-number>
                  {{$t('label.PFANS3007FORMVIEW_YEN')}}
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3007VIEW_DAILYCOST')" prop="dailycost">
                <el-input :disabled="true" style="width:20vw" v-model="form.dailycost"></el-input>
                {{$t('label.PFANS3007FORMVIEW_YEN')}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="24">
              <template>
                <el-form-item :label="$t('label.PFANS3007VIEW_USECOUPON')">
                  <el-table :data="tableD" header-cell-class-name="sub_bg_color_blue" v-if="showdata" stripe="true" border="true">
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNTYPE')" align="center" fixed
                                     prop="copuntype">
                      <template slot-scope="scope">
                        <el-input :disabled="true" :no="scope.row" style="width: 100%" v-model="scope.row.copuntype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNNUMBER')" align="center"
                                     prop="copunnumber">
                      <template slot-scope="scope">
                        <el-input-number :disabled="true" :no="scope.row" style="width: 100%"
                                         @change="changecopunnumber" :min="0"
                                         v-model="scope.row.copunnumber">
                        </el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNVALUE')" align="center" prop="copunvalue">
                      <template slot-scope="scope">
                        <el-input :disabled="true" :no="scope.row" style="width: 100%" v-model="scope.row.copunvalue">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNUSENUMBER')" align="center"
                                     prop="copunusenumber">
                      <template slot-scope="scope">
                        <el-input-number :disabled="!disable" :no="scope.row" :precision="0" :step="1" :min="0"
                                         style="width: 100%"
                                         v-model="scope.row.copunusenumber">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table :data="tableD2" header-cell-class-name="sub_bg_color_blue height" v-if="showdata2" stripe="true" border="true">
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNTYPE')" align="center" fixed
                                     prop="copuntype">
                      <template slot-scope="scope">
                        <el-input :disabled="true" :no="scope.row" style="width: 100%" v-model="scope.row.copuntype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNNUMBER')" align="center"
                                     prop="copunnumber">
                      <template slot-scope="scope">
                        <el-input-number :disabled="true" :no="scope.row" style="width: 100%"
                                         @change="changecopunnumber" :min="0"
                                         v-model="scope.row.copunnumber">
                        </el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNVALUE')" align="center" prop="copunvalue">
                      <template slot-scope="scope">
                        <el-input :disabled="true" :no="scope.row" style="width: 100%" v-model="scope.row.copunvalue">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNUSENUMBER')" align="center"
                                     prop="copunusenumber">
                      <template slot-scope="scope">
                        <el-input-number :disabled="!disable" :no="scope.row" :precision="0" :step="1" :min="0"
                                         :max="Number(scope.row.copunnumbermax)"
                                         style="width: 100%" @change="getcopunusenumber"
                                         v-model="scope.row.copunusenumber">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table :data="tableD3" header-cell-class-name="sub_bg_color_blue" v-if="showdata3" stripe="true" border="true">
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNTYPE')" align="center" fixed
                                     prop="copuntype">
                      <template slot-scope="scope">
                        <el-input :disabled="true" :no="scope.row" style="width: 100%" v-model="scope.row.copuntype">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNNUMBER')" align="center"
                                     prop="copunnumber">
                      <template slot-scope="scope">
                        <el-input-number :disabled="true" :no="scope.row" style="width: 100%"
                                         @change="changecopunnumber" :min="0"
                                         v-model="scope.row.copunnumber">
                        </el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNVALUE')" align="center" prop="copunvalue">
                      <template slot-scope="scope">
                        <el-input :disabled="true" :no="scope.row" style="width: 100%" v-model="scope.row.copunvalue">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS3007FORMVIEW_COPUNUSENUMBER')" align="center"
                                     prop="copunusenumber">
                      <template slot-scope="scope">
                        <el-input-number :disabled="!disable" :no="scope.row" :precision="0" :step="1" :min="0"
                                         :max="Number(scope.row.copunnumbermax)"
                                         style="width: 100%" @change="getcopunusenumber"
                                         v-model="scope.row.copunusenumber">
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007FORMVIEW_MONEYS')" prop="moneys">
                  <el-input :disabled="true" style="width:20vw" v-model="form.moneys"></el-input>
                  {{$t('label.PFANS3007FORMVIEW_YEN')}}
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007FORMVIEW_USEMONEY')" prop="usemoney">
                  <el-input-number :disabled="!disable" controls-position="right" :min="0" :max="9999999999"
                                   @change="changeusemoneys" style="width:20vw"
                                   v-model.trim="form.usemoney"></el-input-number>
                  {{$t('label.PFANS3007FORMVIEW_YEN')}}
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3007FORMVIEW_PAYMONEY')" prop="paymoney">
                  <el-input-number :disabled="true" controls-position="right" :precision="0" :step="1" :min="0"
                                   :max="9999999999" style="width:20vw"
                                   v-model.trim="form.paymoney"></el-input-number>
                  {{$t('label.PFANS3007FORMVIEW_YEN')}}
                </el-form-item>
              </template>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS3007VIEW_REMARKS')" prop="remarks">
                <el-input :disabled="!disable" style="width: 73vw" type="textarea" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import dicselect from "../../../components/dicselect.vue";
    import moment from "moment";
    import {Message} from 'element-ui';
    import user from "../../../components/user.vue";
    import {getDictionaryInfo, getOrgInfoByUserId} from '@/utils/customize';

    export default {
        name: "PFANS3007FormView",
        components: {
            EasyNormalContainer,
            dicselect,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            var validatecontractstartdate = (rule, value, callback) => {
                if (this.form.contractstartdate !== '' && this.form.contractstartdate !== null && this.form.contractenddate !== '' && this.form.contractenddate !== null) {
                    if (moment(this.form.contractenddate).format("YYYY-MM-DD") < moment(this.form.contractstartdate).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    } else {
                        this.form.contractdatenumber = moment(this.form.contractenddate).diff(moment(this.form.contractstartdate), 'days') + 1;
                        this.form.dailycost = Math.floor(this.form.totalcost / this.form.contractdatenumber);
                        callback()
                    }
                } else {
                    this.form.contractdatenumber = 0;
                    this.form.dailycost = Math.floor(this.form.totalcost / this.form.contractdatenumber);
                    callback()
                }
            }
            var validatecontractenddate = (rule, value, callback) => {
                if (this.form.contractstartdate !== '' && this.form.contractstartdate !== null && this.form.contractenddate !== '' && this.form.contractenddate !== null) {
                    if (moment(this.form.contractenddate).format("YYYY-MM-DD") < moment(this.form.contractstartdate).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    } else {
                        this.form.contractdatenumber = moment(this.form.contractenddate).diff(moment(this.form.contractstartdate), 'days') + 1;
                        this.form.dailycost = Math.floor(this.form.totalcost / this.form.contractdatenumber);
                        callback()
                    }
                } else {
                    this.form.contractdatenumber = 0;
                    this.form.dailycost = Math.floor(this.form.totalcost / this.form.contractdatenumber);
                    callback()
                }
            }
            var validatebusinessstartdate = (rule, value, callback) => {
                if (this.form.businessstartdate !== '' && this.form.businessstartdate !== null && this.form.businessenddate !== '' && this.form.businessenddate !== null) {
                    if (moment(this.form.businessenddate).format("YYYY-MM-DD") < moment(this.form.businessstartdate).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    } else {
                        this.form.businessdatenumber = moment(this.form.businessenddate).diff(moment(this.form.businessstartdate), 'days') + 1;
                        callback()
                    }
                } else {
                    this.form.businessdatenumber = 0;
                    callback()
                }
            }
            var validatebusinessenddate = (rule, value, callback) => {
                if (this.form.businessstartdate !== '' && this.form.businessstartdate !== null && this.form.businessenddate !== '' && this.form.businessenddate !== null) {
                    if (moment(this.form.businessenddate).format("YYYY-MM-DD") < moment(this.form.businessstartdate).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    } else {
                        this.form.businessdatenumber = moment(this.form.businessenddate).diff(moment(this.form.businessstartdate), 'days') + 1;
                        callback()
                    }
                } else {
                    this.form.businessdatenumber = 0;
                    callback()
                }
            }
            return {
                moneys1: '',
                moneys2: '',
                error: '',
                loading: false,
                canStart: false,
                selectType: "Single",
                userlist: "",
                title: "title.PFANS3007VIEW",
                buttonList: [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ],
                tableD: [
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: "",
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                ],
                tableD2: [
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: this.$t('label.PFANS3007FORMVIEW_G'),
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: this.$t('label.PFANS3007FORMVIEW_M'),
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: this.$t('label.PFANS3007FORMVIEW_Q'),
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                ],
                tableD3: [
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: this.$t('label.PFANS3007FORMVIEW_H'),
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: this.$t('label.PFANS3007FORMVIEW_F'),
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                    {
                        usecouponid: "",
                        japancondominiumid: "",
                        copuntype: this.$t('label.PFANS3007FORMVIEW_P'),
                        copunnumber: "",
                        copunvalue: "",
                        copunusenumber: "",
                        rowindex: "",
                        copunnumbermax: "",
                    },
                ],
                baseInfo: {},
                form: {
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    userid: '',
                    budgetunit: '',
                    businesscity: '',
                    travelclubplace: '',
                    condominiumcompany: '',
                    apartmentplace: '',
                    housenumber: '',
                    contractstartdate: '',
                    contractenddate: '',
                    contractdatenumber: '',
                    businessstartdate: '',
                    businessenddate: '',
                    businessdatenumber: '',
                    contracttime: '',
                    totalcost: '',
                    dailycost: '',
                    moneys: '',
                    usemoney: '',
                    paymoney: '',
                    remarks: '',
                },
                rules: {
                    userid: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change'
                    }],
                    budgetunit: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
                        trigger: 'change'
                    }],
                    businesscity: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3007VIEW_BUSINESSCITY'),
                        trigger: 'blur'
                    }],
                    travelclubplace: [{
                        required: true,
                        message: this.$t("normal.error_08") + this.$t("label.PFANS3007VIEW_TRAVELCLUBPLACE"),
                        trigger: "blur"
                    }],
                    condominiumcompany: [{
                        required: true,
                        message: this.$t("normal.error_09") + this.$t("label.PFANS3007VIEW_CONDOMINIUMCOMPANY"),
                        trigger: "change"
                    }],
                    apartmentplace: [{
                        required: true,
                        message: this.$t("normal.error_09") + this.$t("label.PFANS3007VIEW_APARTMENTPLACE"),
                        trigger: "change"
                    }],
                    housenumber: [{
                        required: true,
                        message: this.$t("normal.error_08") + this.$t("label.PFANS3007VIEW_HOUSENUMBER"),
                        trigger: "blur"
                    }],
                    contractstartdate: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS3007VIEW_CONTRACTSTARTDATE'),
                        trigger: 'change'
                    },
                        {validator: validatecontractstartdate, trigger: 'change'},
                    ],
                    contractenddate: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS3007VIEW_CONTRACTENDDATE'),
                        trigger: 'change'
                    },
                        {validator: validatecontractenddate, trigger: 'change'},
                    ],
                    businessstartdate: [{
                        validator: validatebusinessstartdate,
                        trigger: 'change'
                    }],
                    businessenddate: [{
                        validator: validatebusinessenddate,
                        trigger: 'change'
                    }],
                    contracttime: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS3007VIEW_CONTRACTTIME'),
                        trigger: 'change'
                    },],
                    totalcost: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3007VIEW_TOTALCOST'),
                        trigger: 'blur'
                    }],
                    usemoney: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3007FORMVIEW_USEMONEY'),
                        trigger: 'blur'
                    }],
                    paymoney: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3007FORMVIEW_PAYMONEY'),
                        trigger: 'blur'
                    }],
                },
                show: true,
                show2: false,
                show3: false,
                code: 'PG002',
                code2: 'PR007',
                code3: 'PR008',
                code4: 'PR010',
                code5: 'PR009',
                code6: 'PR011',
                showdata: true,
                showdata2: false,
                showdata3: false,
                multiple: false,
                disable: false,
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3007Store/selectById', {'japancondominiumid': this.$route.params._id})
                    .then(response => {
                        this.form = response.japancondominium;
                        if (response.usecoupon.length > 0) {
                            if (this.form.condominiumcompany === "PR007001") {
                                this.tableD2 = response.usecoupon;
                                for (let i = 0; i < this.tableD2.length; i++) {
                                    if (this.tableD2[i].copuntype === "PR010001") {
                                        this.tableD2[i].copuntype = "G劵";
                                    }
                                    if (this.tableD2[i].copuntype === "PR010002") {
                                        this.tableD2[i].copuntype = "M劵";
                                    }
                                    if (this.tableD2[i].copuntype === "PR010003") {
                                        this.tableD2[i].copuntype = "Q劵";
                                    }
                                }
                            }
                            if (this.form.condominiumcompany === "PR007002") {
                                this.tableD3 = response.usecoupon;
                                for (let i = 0; i < this.tableD2.length; i++) {
                                    if (this.tableD3[i].copuntype === "H劵") {
                                        this.tableD3[i].copuntype = "PR011001";
                                    }
                                    if (this.tableD3[i].copuntype === "F劵") {
                                        this.tableD3[i].copuntype = "PR011002";
                                    }
                                    if (this.tableD3[i].copuntype === "P劵") {
                                        this.tableD3[i].copuntype = "PR011003";
                                    }
                                }
                            }
                        }
                        this.userlist = this.form.userid;
                        this.baseInfo.japancondominium = JSON.parse(JSON.stringify(this.form));
                        if (this.form.condominiumcompany === "PR007001") {
                            this.baseInfo.usecoupon = JSON.parse(JSON.stringify(this.tableD2));
                        }
                        if (this.form.condominiumcompany === "PR007002") {
                            this.baseInfo.usecoupon = JSON.parse(JSON.stringify(this.tableD3));
                        }
                        if (this.form.condominiumcompany === 'PR007001') {
                            this.show2 = true;
                            this.show3 = false;
                            this.show = false;
                            this.showdata2 = true;
                            this.showdata3 = false;
                            this.showdata = false;
                            let dictionaryInfo = getDictionaryInfo('PR010001');
                            if (dictionaryInfo) {
                                this.tableD2[0].copunnumber = dictionaryInfo.value2;
                                this.tableD2[0].copunnumbermax = dictionaryInfo.value2;
                                this.tableD2[0].copunvalue = dictionaryInfo.value3;
                            }
                            ;
                            dictionaryInfo = getDictionaryInfo('PR010002');
                            if (dictionaryInfo) {
                                this.tableD2[1].copunnumber = dictionaryInfo.value2;
                                this.tableD2[1].copunnumbermax = dictionaryInfo.value2;
                                this.tableD2[1].copunvalue = dictionaryInfo.value3;
                            }
                            ;
                            dictionaryInfo = getDictionaryInfo('PR010003');
                            if (dictionaryInfo) {
                                this.tableD2[2].copunnumber = dictionaryInfo.value2;
                                this.tableD2[2].copunnumbermax = dictionaryInfo.value2;
                                this.tableD2[2].copunvalue = dictionaryInfo.value3;
                            }
                            ;
                            dictionaryInfo = getDictionaryInfo('PR007001');
                            if (dictionaryInfo) {
                                this.form.moneys = dictionaryInfo.value2;
                                this.moneys1 = dictionaryInfo.value2;
                            }
                            ;
                        }
                        if (this.form.condominiumcompany === 'PR007002') {
                            this.show3 = true;
                            this.show2 = false;
                            this.show = false;
                            this.showdata3 = true;
                            this.showdata2 = false;
                            this.showdata = false;
                            let dictionaryInfo = getDictionaryInfo('PR011001');
                            if (dictionaryInfo) {
                                this.tableD3[0].copunnumber = dictionaryInfo.value2;
                                this.tableD3[0].copunnumbermax = dictionaryInfo.value2;
                                this.tableD3[0].copunvalue = dictionaryInfo.value3;
                            }
                            ;
                            dictionaryInfo = getDictionaryInfo('PR011002');
                            if (dictionaryInfo) {
                                this.tableD3[1].copunnumber = dictionaryInfo.value2;
                                this.tableD3[1].copunnumbermax = dictionaryInfo.value2;
                                this.tableD3[1].copunvalue = dictionaryInfo.value3;
                            }
                            ;
                            dictionaryInfo = getDictionaryInfo('PR011003');
                            if (dictionaryInfo) {
                                this.tableD3[2].copunnumber = dictionaryInfo.value2;
                                this.tableD3[2].copunnumbermax = dictionaryInfo.value2;
                                this.tableD3[2].copunvalue = dictionaryInfo.value3;
                            }
                            ;
                            dictionaryInfo = getDictionaryInfo('PR007002');
                            if (dictionaryInfo) {
                                this.form.moneys = dictionaryInfo.value2;
                                this.moneys2 = dictionaryInfo.value2;
                            }
                            ;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        })
                        this.loading = false;
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.centerid = lst.centerNmae;
                    this.form.groupid = lst.groupNmae;
                    this.form.teamid = lst.teamNmae;
                    this.form.userid = this.$store.getters.userinfo.userid;
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
            getUserids(val) {
                this.form.userid = val;
                this.userlist = val;
                let lst = getOrgInfoByUserId(val);
                this.form.centerid = lst.centerNmae;
                this.form.groupid = lst.groupNmae;
                this.form.teamid = lst.teamNmae;
                if (!this.form.userid || this.form.userid === '' || val === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            workflowState(val) {
                if (val.state === '1') {
                    this.form.status = '3';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                this.buttonClick("update");
            },
            start(val) {
                this.form.status = '2';
                this.buttonClick("update");
            },
            end(val) {
                this.form.status = '0';
                this.buttonClick("update");
            },
            getcopunusenumber(val) {
                if (this.form.condominiumcompany === "PR007001") {
                    this.tableD2.copunusenumber = val;
                    this.tableD2[0].copunnumber = (this.tableD2[0].copunnumbermax) - (this.tableD2[0].copunusenumber);
                    this.tableD2[1].copunnumber = (this.tableD2[1].copunnumbermax) - (this.tableD2[1].copunusenumber);
                    this.tableD2[2].copunnumber = (this.tableD2[2].copunnumbermax) - (this.tableD2[2].copunusenumber);
                    this.form.moneys = (this.moneys1) - (this.form.usemoney);
                    this.form.paymoney = this.form.totalcost - this.form.usemoney - (this.tableD2[0].copunvalue) * (this.tableD2[0].copunusenumber) - (this.tableD2[1].copunvalue) * (this.tableD2[1].copunusenumber) - (this.tableD2[2].copunvalue) * (this.tableD2[2].copunusenumber)

                }
                if (this.form.condominiumcompany === "PR007002") {
                    this.tableD3.copunusenumber = val;
                    this.tableD3[0].copunnumber = (this.tableD3[0].copunnumbermax) - (this.tableD3[0].copunusenumber);
                    this.tableD3[1].copunnumber = (this.tableD3[1].copunnumbermax) - (this.tableD3[1].copunusenumber);
                    this.tableD3[2].copunnumber = (this.tableD3[2].copunnumbermax) - (this.tableD3[2].copunusenumber);
                    this.form.moneys = (this.moneys2) - (this.form.usemoney);
                    this.form.paymoney = this.form.totalcost - this.form.usemoney - (this.tableD3[0].copunvalue) * (this.tableD3[0].copunusenumber) - (this.tableD3[1].copunvalue) * (this.tableD3[1].copunusenumber) - (this.tableD3[2].copunvalue) * (this.tableD3[2].copunusenumber)

                }
            },
            changeusemoneys(val) {
                this.form.usemoney = val;
                if (this.form.condominiumcompany === "PR007001") {
                    this.form.moneys = (this.moneys1) - (this.form.usemoney);
                    this.form.paymoney = this.form.totalcost - this.form.usemoney - (this.tableD2[0].copunvalue) * (this.tableD2[0].copunusenumber) - (this.tableD2[1].copunvalue) * (this.tableD2[1].copunusenumber) - (this.tableD2[2].copunvalue) * (this.tableD2[2].copunusenumber)
                }
                if (this.form.condominiumcompany === "PR007002") {
                    this.form.moneys = (this.moneys2) - (this.form.usemoney);
                    this.form.paymoney = this.form.totalcost - this.form.usemoney - (this.tableD3[0].copunvalue) * (this.tableD3[0].copunusenumber) - (this.tableD3[1].copunvalue) * (this.tableD3[1].copunusenumber) - (this.tableD3[2].copunvalue) * (this.tableD3[2].copunusenumber)
                }
            },
            getbudgetunit(val) {
                this.form.budgetunit = val;
            },
            getcondominiumcompany(val) {
                this.form.condominiumcompany = val;
                let dictionaryInfo = getDictionaryInfo(val);
                if (dictionaryInfo) {
                    this.form.moneys = dictionaryInfo.value2;
                }
                if (val === "PR007001") {
                    this.moneys1 = '';
                    this.moneys1 = '';
                    this.show2 = true;
                    this.show3 = false;
                    this.show = false;
                    this.form.apartmentplace = null;
                    this.showdata2 = true;
                    this.showdata3 = false;
                    this.showdata = false;
                    let dictionaryInfo = getDictionaryInfo('PR010001');
                    if (dictionaryInfo) {
                        this.tableD2[0].copunnumber = dictionaryInfo.value2;
                        this.tableD2[0].copunnumbermax = dictionaryInfo.value2;
                        this.tableD2[0].copunvalue = dictionaryInfo.value3;
                    }
                    ;
                    dictionaryInfo = getDictionaryInfo('PR010002');
                    if (dictionaryInfo) {
                        this.tableD2[1].copunnumber = dictionaryInfo.value2;
                        this.tableD2[1].copunnumbermax = dictionaryInfo.value2;
                        this.tableD2[1].copunvalue = dictionaryInfo.value3;
                    }
                    ;
                    dictionaryInfo = getDictionaryInfo('PR010003');
                    if (dictionaryInfo) {
                        this.tableD2[2].copunnumber = dictionaryInfo.value2;
                        this.tableD2[2].copunnumbermax = dictionaryInfo.value2;
                        this.tableD2[2].copunvalue = dictionaryInfo.value3;
                    }
                    dictionaryInfo = getDictionaryInfo('PR007001');
                    if (dictionaryInfo) {
                        this.form.moneys = dictionaryInfo.value2;
                        this.moneys1 = dictionaryInfo.value2;
                    }
                    ;
                }
                if (val === "PR007002") {
                    this.show3 = true;
                    this.show2 = false;
                    this.show = false;
                    this.form.apartmentplace = null;
                    this.showdata3 = true;
                    this.showdata2 = false;
                    this.showdata = false;
                    let dictionaryInfo = getDictionaryInfo('PR011001');
                    if (dictionaryInfo) {
                        this.tableD3[0].copunnumber = dictionaryInfo.value2;
                        this.tableD3[0].copunnumbermax = dictionaryInfo.value2;
                        this.tableD3[0].copunvalue = dictionaryInfo.value3;
                    }
                    ;
                    dictionaryInfo = getDictionaryInfo('PR011002');
                    if (dictionaryInfo) {
                        this.tableD3[1].copunnumber = dictionaryInfo.value2;
                        this.tableD3[1].copunnumbermax = dictionaryInfo.value2;
                        this.tableD3[1].copunvalue = dictionaryInfo.value3;
                    }
                    ;
                    dictionaryInfo = getDictionaryInfo('PR011003');
                    if (dictionaryInfo) {
                        this.tableD3[2].copunnumber = dictionaryInfo.value2;
                        this.tableD3[2].copunnumbermax = dictionaryInfo.value2;
                        this.tableD3[2].copunvalue = dictionaryInfo.value3;
                    }
                    ;
                    dictionaryInfo = getDictionaryInfo('PR007002');
                    if (dictionaryInfo) {
                        this.form.moneys = dictionaryInfo.value2;
                        this.moneys2 = dictionaryInfo.value2;
                    }
                    ;
                }
            }
            ,
            getapartmentplace(val) {
                this.form.apartmentplace = val;
            }
            ,
            changetotalcost(val) {
                this.form.totalcost = val;
                this.form.dailycost = Math.floor(val / this.form.contractdatenumber);
                if (this.form.condominiumcompany === "PR007001") {
                    this.form.moneys = (this.moneys1) - (this.form.usemoney);
                    this.form.paymoney = this.form.totalcost - this.form.usemoney - (this.tableD2[0].copunvalue) * (this.tableD2[0].copunusenumber) - (this.tableD2[1].copunvalue) * (this.tableD2[1].copunusenumber) - (this.tableD2[2].copunvalue) * (this.tableD2[2].copunusenumber)
                }
                if (this.form.condominiumcompany === "PR007002") {
                    this.form.moneys = (this.moneys2) - (this.form.usemoney);
                    this.form.paymoney = this.form.totalcost - this.form.usemoney - (this.tableD3[0].copunvalue) * (this.tableD3[0].copunusenumber) - (this.tableD3[1].copunvalue) * (this.tableD3[1].copunusenumber) - (this.tableD3[2].copunvalue) * (this.tableD3[2].copunusenumber)
                }
            }
            ,
            changecopunnumber(val, row) {
                row.copunnumber = val;
                val = val - row.copunusenumber;
            }
            ,
            buttonClick(val) {
                this.tableD2;
                if (val === "back") {
                    this.paramsTitle();
                } else {
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true;
                            this.form.userid = this.userlist;
                            this.baseInfo.japancondominium = JSON.parse(JSON.stringify(this.form));
                            this.baseInfo.usecoupon = [];
                            if (this.form.condominiumcompany === "PR007001") {
                                for (let i = 0; i < this.tableD2.length; i++) {
                                    if (this.tableD2[i].copuntype !== "" || this.tableD2[i].copunnumber !== "" || this.tableD2[i].copunvalue !== "" || this.tableD2[i].copunusenumber !== "") {
                                        if (this.tableD2[i].copuntype === "G劵") {
                                            this.tableD2[i].copuntype = "PR010001";
                                        }
                                        if (this.tableD2[i].copuntype === "M劵") {
                                            this.tableD2[i].copuntype = "PR010002";
                                        }
                                        if (this.tableD2[i].copuntype === "Q劵") {
                                            this.tableD2[i].copuntype = "PR010003";
                                        }
                                        this.baseInfo.usecoupon.push(
                                            {
                                                usecouponid: this.tableD2[i].usecouponid,
                                                japancondominiumid: this.tableD2[i].japancondominiumid,
                                                copuntype: this.tableD2[i].copuntype,
                                                copunnumber: this.tableD2[i].copunnumber,
                                                copunvalue: this.tableD2[i].copunvalue,
                                                copunusenumber: this.tableD2[i].copunusenumber,
                                            }
                                        );
                                    }
                                }
                            }
                            if (this.form.condominiumcompany === "PR007002") {
                                for (let i = 0; i < this.tableD3.length; i++) {
                                    if (this.tableD3[i].copuntype !== "" || this.tableD3[i].copunnumber !== "" || this.tableD3[i].copunvalue !== "" || this.tableD3[i].copunusenumber !== "") {
                                        if (this.tableD3[i].copuntype === "H劵") {
                                            this.tableD3[i].copuntype = "PR011001";
                                        }
                                        if (this.tableD3[i].copuntype === "F劵") {
                                            this.tableD3[i].copuntype = "PR011002";
                                        }
                                        if (this.tableD3[i].copuntype === "P劵") {
                                            this.tableD3[i].copuntype = "PR011003";
                                        }
                                        this.baseInfo.usecoupon.push(
                                            {
                                                usecouponid: this.tableD3[i].usecouponid,
                                                japancondominiumid: this.tableD3[i].japancondominiumid,
                                                copuntype: this.tableD3[i].copuntype,
                                                copunnumber: this.tableD3[i].copunnumber,
                                                copunvalue: this.tableD3[i].copunvalue,
                                                copunusenumber: this.tableD3[i].copunusenumber,
                                            }
                                        );
                                    }
                                }
                            }
                            if (this.$route.params._id) {
                                this.baseInfo.japancondominium.japancondominiumid = this.$route.params._id;
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS3007Store/updateJapanCondominium', this.baseInfo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        if (val !== "update") {
                                            Message({
                                                message: this.$t("normal.success_02"),
                                                type: 'success',
                                                duration: 5 * 1000
                                            });
                                            if (this.$store.getters.historyUrl) {
                                                this.$router.push(this.$store.getters.historyUrl);
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        Message({
                                            message: error,
                                            type: 'error',
                                            duration: 5 * 1000
                                        })
                                        this.loading = false;
                                    })
                            } else {
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS3007Store/createJapanCondominium', this.baseInfo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        Message({
                                            message: this.$t("normal.success_01"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        if (this.$store.getters.historyUrl) {
                                            this.$router.push(this.$store.getters.historyUrl);
                                        }
                                    })
                                    .catch(error => {
                                        Message({
                                            message: error,
                                            type: 'error',
                                            duration: 5 * 1000
                                        });
                                        this.loading = false;
                                    })
                            }
                        }
                    });
                }
            }
        }
    }

</script>


<style scoped>

</style>
