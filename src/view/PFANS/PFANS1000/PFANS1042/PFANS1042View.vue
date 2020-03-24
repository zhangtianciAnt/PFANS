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
                      <el-option label="1月" value="1"></el-option>
                      <el-option label="2月" value="2"></el-option>
                      <el-option label="3月" value="3"></el-option>
                      <el-option label="4月" value="4"></el-option>
                      <el-option label="5月" value="5"></el-option>
                      <el-option label="6月" value="6"></el-option>
                      <el-option label="7月" value="7"></el-option>
                      <el-option label="8月" value="8"></el-option>
                      <el-option label="9月" value="9"></el-option>
                      <el-option label="10月" value="10"></el-option>
                      <el-option label="11月" value="11"></el-option>
                      <el-option label="12月" value="12"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="padding-top: 30px">
              <el-table :data="tableData"  border
                        header-cell-class-name="sub_bg_color_blue" stripe height="400"
                        @selection-change="handleSelectionChange()" @row-click="handleRowClick"
                        style="width: 100%">

                <el-table-column
                  :label="$t('費用種別')"
                  align="center">
                  <el-table-column
                    :label="$t('詳細')"
                    align="center"
                    width="160">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.project_name">
                      </el-input>
                    </template>
                  </el-table-column>

                  <el-table-column
                    :label="$t('共通PJ（研修会议等）')"
                    align="center"
                    width="160">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.managerid">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>

                  <el-table-column
                    :label="$t('収入')"
                    align="center">

                    <el-table-column
                      :label="$t('外部受託')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('税金')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('内部受託')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('収入合計')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>

                  <!--                BP名前-->
                  <el-table-column
                    :label="$t('支出')"
                    align="center">

                    <el-table-column
                      :label="$t('社員工数')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('外注工数')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('人件費')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('外注費')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('内部委託')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('研究材料費')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('部門共通按分（A是共通费用）')"
                      align="center"
                      width="200">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('研究材料費')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('部門共通費用')"
                      align="center">

                      <el-table-column
                        :label="$t('原動費')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('旅費')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('原動費')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('消耗費')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('通信費')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('ブランド料')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('家賃')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('その他')"
                        align="center"
                        width="110">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('部門共通費用合計')"
                        align="center"
                        width="170">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disabled"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.project_name">
                          </el-input>
                        </template>
                      </el-table-column>
                    </el-table-column>

                    <el-table-column
                      :label="$t('配賦費用')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>

                    <el-table-column
                      :label="$t('支出合計')"
                      align="center"
                      width="110">
                      <template slot-scope="scope">
                        <el-input
                          :disabled="!disabled"
                          :no="scope.row"
                          style="width: 100%"
                          v-model="scope.row.project_name">
                        </el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>


                <el-table-column
                  :label="$t('仕掛品')"
                  align="center">

                  <el-table-column
                    :label="$t('仕掛品処理')"
                    align="center"
                    width="110">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.project_name">
                      </el-input>
                    </template>
                  </el-table-column>

                </el-table-column>

                <el-table-column
                  :label="$t('利益')"
                  align="center">

                  <el-table-column
                    :label="$t('限界利益')"
                    align="center"
                    width="110">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.project_name">
                      </el-input>
                    </template>
                  </el-table-column>

                  <el-table-column
                    :label="$t('営業利益')"
                    align="center"
                    width="110">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.project_name">
                      </el-input>
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
  import {getDictionaryInfo, getSupplierinfor, getUserInfo} from '../../../../utils/customize';
  import org from '../../../components/org';

  export default {
    name: "PFANS1042View",
    components: {
      EasyNormalContainer,
      user,
      org,
    },
    data() {
        var years = (rule, value, callback) => {
            debugger
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

        tableData: [{
          type: '',
          project_name: '',
          managerid: '',
          expname: '',
          suppliernameid: '',
          admissiontime: '',
          exitime: '',
          operationform: '',
          jobclassification: '',
          distriobjects: '',
          venuetarget: '',
          january: '',
          february: '',
          march: '',
          april: '',
          may: '',
          june: '',
          july: '',
          august: '',
          september: '',
          october: '',
          november: '',
          december: '',
          monthlength: '',
          remarks: '',
          alltechnology: '',
          sitevaluation: '',
          exitreason: '',
          businessimpact: '',
          countermeasure: '',
        }],
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
    methods: {
        changeRegion(val){
            debugger
            this.form.region = val;
            if(this.form.group_id !="" && this.form.group_id!=null && this.form.year !="" && this.form.year!=null){
                if(this.form.year){
                    if(val){

                    }
                }

            }else {
                if (!this.form.group_id || this.form.group_id === '' || !this.form.year || this.form.year === '') {
                    if(this.form.group_id){
                        this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                    }
                    if(this.form.year){
                        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                    }
                    else{
                        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                        this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                    }

                } else {
                    this.errorgroup = '';
                }
            }

        },

        changeYear(val){
            debugger
            this.form.year = moment(val).format("YYYY");
            if(this.form.group_id !="" && this.form.group_id!=null){
                if(val){

                }
            }else {
                if (!this.form.group_id || this.form.group_id === '' || val === 'undefined' || !this.form.region || this.form.region === '') {
                    if(this.form.group_id){
                        this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                    }
                    if(this.form.region){
                        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                    }
                    else {
                        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                        this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                    }

                } else {
                    this.errorgroup = '';
                }
            }

        },

        getGroupId(val) {
            debugger
            this.form.group_id = val
            this.getOrgInformation(val);
            if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
                this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
            } else {
                this.errorgroup = '';
            }

            if(this.form.year!=null && this.form.year!="" || this.form.region!=null && this.form.region!=""){
                if(this.form.group_id){

                }
            }else{
                this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');

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


      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6006Store/getYears', {'year': this.year})
          .then(response => {
              let tabledate = [];
            for (let j = 0; j < response.length; j++) {
              if (response[j].managerid !== null && response[j].managerid !== '') {
                let rst = getUserInfo(response[j].managerid)
                if (rst) {
                  response[j].managerid = rst.userinfo.customername;
                }
              }
              if (response[j].supplierinfor_id !== null && response[j].supplierinfor_id !== '') {
                let supplierInfo = getSupplierinfor(response[j].supplierinfor_id);
                if (supplierInfo) {
                  response[j].suppliernameid = supplierInfo.supchinese;
                }
              }
              if (response[j].admissiontime !== null && response[j].admissiontime !== '') {
                response[j].admissiontime = moment(response[j].admissiontime).format('YYYY-MM-DD');
              }
              if (response[j].exitime !== null && response[j].exitime !== '') {
                response[j].exitime = moment(response[j].exitime).format('YYYY-MM-DD');
              }
              if (response[j].jobclassification !== null && response[j].jobclassification !== '') {
                let letStage = getDictionaryInfo(response[j].jobclassification);
                if (letStage != null) {
                  response[j].jobclassification = letStage.value1;
                }
              }
              if (response[j].operationform !== null && response[j].operationform !== '') {
                let letStage = getDictionaryInfo(response[j].operationform);
                if (letStage != null) {
                  response[j].operationform = letStage.value1;
                }
              }
              if (response[j].alltechnology !== null && response[j].alltechnology !== '') {
                let letStage = getDictionaryInfo(response[j].alltechnology);
                if (letStage != null) {
                  response[j].alltechnology = letStage.value1;
                }
              }
              if (response[j].sitevaluation !== null && response[j].sitevaluation !== '') {
                let letStage = getDictionaryInfo(response[j].sitevaluation);
                if (letStage != null) {
                  response[j].sitevaluation = letStage.value1;
                }
              }
              if (response[j].exitreason !== null && response[j].exitreason !== '') {
                let letStage = getDictionaryInfo(response[j].exitreason);
                if (letStage != null) {
                  response[j].exitreason = letStage.value1;
                }
              }
              if (response[j].businessimpact !== null && response[j].businessimpact !== '') {
                let letStage = getDictionaryInfo(response[j].businessimpact);
                if (letStage != null) {
                  response[j].businessimpact = letStage.value1;
                }
              }
              if (response[j].countermeasure !== null && response[j].countermeasure !== '') {
                let letStage = getDictionaryInfo(response[j].countermeasure);
                if (letStage != null) {
                  response[j].countermeasure = letStage.value1;
                }
              }
              if (response[j].venuetarget == "是") {
                let arr = [
                  response[j].april,
                  response[j].may,
                  response[j].june,
                  response[j].july,
                  response[j].august,
                  response[j].september,
                  response[j].october,
                  response[j].november,
                  response[j].december,
                  response[j].january,
                  response[j].february,
                  response[j].march
                ];
                var h = 0;
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i] != null && arr[i] != "0.00" && arr[i] != "0") {
                    h++;
                  }
                }
                response[j].monthlength = h;
              }
                tabledate.push({
                    type: 0,
                    project_name: response[j].project_name,
                    managerid: response[j].managerid,
                    expname: response[j].expname,
                    suppliernameid: response[j].suppliernameid,
                    admissiontime: response[j].admissiontime,
                    exitime: response[j].exitime,
                    operationform: response[j].operationform,
                    jobclassification: response[j].jobclassification,
                    distriobjects: response[j].distriobjects,
                    venuetarget: response[j].venuetarget,
                    january: response[j].january,
                    february: response[j].february,
                    march: response[j].march,
                    april: response[j].april,
                    may: response[j].may,
                    june: response[j].june,
                    july: response[j].july,
                    august: response[j].august,
                    september: response[j].september,
                    october: response[j].october,
                    november: response[j].november,
                    december: response[j].december,
                    monthlength: response[j].monthlength,
                    remarks: response[j].remarks,
                    alltechnology: response[j].alltechnology,
                    sitevaluation: response[j].sitevaluation,
                    exitreason: response[j].exitreason,
                    businessimpact:response[j].businessimpact,
                    countermeasure: response[j].countermeasure,
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
      handleRowClick(row) {
         row.type='1'
      },
      yearChange(value) {
        this.year = moment(value).format('YYYY');
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      buttonClick(val) {
        if (val === 'save') {
          this.loading = true;
          this.$store
            .dispatch('PFANS6006Store/updateDeleginformation', this.multipleSelection)
            .then(response => {
              this.data = response;
              this.getList(this.year);
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
              });
              this.$router.push({
                name: 'PFANS6006View',
              });
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
        }
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (column.level === 2 && columnIndex >= 0 && columnIndex < 10) {
          return {
            color: 'white',
            background: '#99CCFF !important',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >= 4 && columnIndex < 24) {
          return {
            color: 'white',
            background: '#99CC99 !important',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 24 && columnIndex < 29) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 25) {
          return {
            color: 'white',
            background: '#005BAA !important',
          };
        }
      },

    },
    mounted() {
      // this.getList();
    },
  }
</script>

<style scoped>

</style>
