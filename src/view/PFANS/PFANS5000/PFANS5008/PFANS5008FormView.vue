<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" :buttonList="buttonList"
                         v-loading="loading">
      <div slot="customize" style="margin-top: 4rem;">
        <el-form ref="form" label-width="8rem" label-position="left" style="padding: 2rem">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS5008VIEW_PROGRAM')" name="first">
              <el-form :model="companyform" ref="companyform" label-width="7.5rem"
                       class="demo-ruleForm" :rules="rules">
                <el-container>
                  <el-aside style="width: 58%;height: 30rem">
                    <el-form-item :label="$t('label.PFANS5008VIEW_RIQI')"
                                  style="width: 5%" prop="log_date">
                      <el-date-picker
                        @change="clickdata"
                        v-model="companyform.log_date"
                        :disabled="!disable"
                        type="date"
                        style="width:  8.5rem"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-row>
                      <el-col :span="11">
                        <el-form-item :label="$t('label.start')"
                                      prop="time_start">
                          <el-time-picker
                            v-model="companyform.time_start"
                            :disabled="!disable"
                            format='HH:mm'
                            style="width:  8.5rem">
                          </el-time-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item :label="$t('label.end')"
                                      prop="time_end">
                          <el-time-picker
                            v-model="companyform.time_end"
                            :disabled="!disable"
                            format='HH:mm'
                            style="width:  8.5rem">
                          </el-time-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <div v-show="isShow">
                        <el-col :span="6">
                          <el-form-item :label="$t('label.PFANS5008VIEW_XZPROGRAM')" style="width: 16rem"
                                        prop="project_id">
                            <el-select v-model="companyform.project_id" :disabled="!disable">
                              <el-option
                                v-for="item in optionsdata"
                                :key="item.value"
                                :label="item.lable"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item>
                            <el-link style="width: 9rem;color: #5d9cec" target="_blank" :underline="false"
                                     @click="program=true" type="primary">
                              <span>{{$t('label.PFANS5008FORMVIEW_BIANJI')}}</span>
                            </el-link>
                            <el-dialog :visible.sync="program" width="50%">
                              <table border="0" cellspacing="0" cellpadding="0" width="800rem">
                                <div style="text-align: center">
                                  <el-transfer
                                    style="text-align: left; display: inline-block"
                                    @change="handleChange"
                                    v-model="determine.project_name"
                                    :titles="[$t('label.PFANS5008FORMVIEW_BMXM'),$t('label.PFANS5008FORMVIEW_GRXM')]"
                                    :button-texts="[$t('label.PFANS5008FORMVIEW_LEFT'),$t('label.PFANS5008FORMVIEW_RIGHT')]"
                                    :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
                                    :data="transfer">
                                  </el-transfer>
                                  <el-form-item>
                                    <el-button type="primary" @click="submitForm(determine)">{{$t('button.confirm')}}
                                    </el-button>
                                  </el-form-item>
                                </div>
                              </table>
                            </el-dialog>
                          </el-form-item>
                        </el-col>
                      </div>
                    </el-row>
                    <el-row>
                      <el-col :span="11">
                        <el-form-item :label="$t('label.PFANS5008VIEW_JDJOBS')" style="width: 16rem" prop="work_phase">
                          <dicselect
                            :disabled="!disable"
                            :code="code2"
                            :multiple="multiple2"
                            :data="companyform.work_phase"
                            @change="JDjobs">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item :label="$t('label.PFANS5008VIEW_XWXF')" style="width: 16rem"
                                      prop="behavior_breakdown">
                          <dicselect
                            :disabled="!disable"
                            :code="code3"
                            :multiple="multiple3"
                            :data="companyform.behavior_breakdown"
                            @change="XWXF">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item :label="$t('label.PFANS5008VIEW_GZBZ')" style="width: 79%" prop="work_memo">
                      <el-input
                        type="textarea"
                        :rows="7"
                        v-model="companyform.work_memo" :disabled="!disable">
                      </el-input>
                    </el-form-item>
                  </el-aside>
                  <el-main>
                    <el-calendar v-model="companyform.log_date" :disabled="!disable" class="appManage">
                    <template
                      slot="dateCell"
                      slot-scope="{date, data}">
                      <p :class="data.isSelected ? 'is-selected' : ''" @click="riqi">
                        {{ data.day.split('-').slice(1).join('-') | moment('DD') }}
                      </p>
                    </template>
                  </el-calendar>
                    <div align="center">
                      <span> {{ this.companyform.log_date | moment('YYYY-MM-DD')}}</span>
                      <span>{{$t('label.PFANS5008FORMVIEW_JL')}}</span>
                    </div>
                    <el-table
                      :data="DataList"
                      v-show="xsTable"
                      @row-click="rowclick"
                    >
                      <el-table-column
                        prop="starttime"
                        :label="$t('label.start')"
                        width="80%">
                      </el-table-column>
                      <el-table-column
                        prop="endtime"
                        :label="$t('label.end')"
                        width="80%">
                      </el-table-column>
                      <el-table-column
                        prop="shicha"
                        :label="$t('label.PFANS5008FORMVIEW_SC')"
                        width="70%">
                      </el-table-column>
                      <el-table-column
                        prop="program"
                        :label="$t('label.PFANS5008FORMVIEW_GZPROGRAM')"
                        width="120%">
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5008VIEW_NOPROGRAM')" name="second">
              <el-form :model="companyform2" ref="companyform2" label-width="7.5rem"
                       class="demo-ruleForm" :rules="rules">
                <el-container>
                  <el-aside style="width: 58%;height: 30rem">
                    <el-form-item :label="$t('label.PFANS5008VIEW_RIQI')" style="width: 5%"
                                  prop="log_date">
                      <el-date-picker
                        @change="clickdata"
                        v-model="companyform2.log_date"
                        :disabled="!disable"
                        type="date"
                        style="width: 8.5rem">
                      </el-date-picker>
                    </el-form-item>
                    <el-row>
                      <el-col :span="11">
                        <el-form-item :label="$t('label.start')" style="width: 8.5rem"
                                      prop="time_start">
                          <el-time-picker
                            v-model="companyform2.time_start"
                            :disabled="!disable"
                            format='HH:mm'
                            style="width:  8.5rem">
                          </el-time-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item :label="$t('label.end')"
                                      prop="time_end">
                          <el-time-picker
                            v-model="companyform2.time_end"
                            :disabled="!disable"
                            format='HH:mm'
                            style="width:  8.5rem">
                          </el-time-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="11">
                        <el-form-item :label="$t('label.PFANS5008VIEW_JDJOBS')" style="width: 16rem" prop="work_phase">
                          <dicselect
                            :disabled="!disable"
                            :code="code4"
                            :multiple="multiple4"
                            :data="companyform2.work_phase"
                            @change="JDjobs2">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item :label="$t('label.PFANS5008VIEW_XWXF')" style="width:16rem"
                                      prop="behavior_breakdown">
                          <dicselect
                            :disabled="!disable"
                            :code="code5"
                            :multiple="multiple5"
                            :data="companyform2.behavior_breakdown"
                            @change="XWXF2">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item :label="$t('label.PFANS5008VIEW_GZBZ')" style="width: 79%" prop="work_memo"
                    >
                      <el-input
                        :disabled="!disable"
                        type="textarea"
                        :rows="7"
                        v-model="companyform2.work_memo">
                      </el-input>
                    </el-form-item>
                  </el-aside>
                  <el-main>
                    <el-calendar v-model="companyform2.log_date" :disabled="!disable" class="appManage">
                      <template
                        slot="dateCell"
                        slot-scope="{date, data}">
                        <p :class="data.isSelected ? 'is-selected' : ''" @click="riqi">
                          {{ data.day.split('-').slice(1).join('-') | moment('DD') }}
                        </p>
                      </template>
                    </el-calendar>
                    <div align="center">
                      <span> {{ this.companyform2.log_date | moment('YYYY-MM-DD')}}</span>
                      <span>{{$t('label.PFANS5008FORMVIEW_JL')}}</span>
                    </div>
                    <el-table
                      :data="DataList2"
                      v-show="xsTable2" @row-click="rowclick"
                    >
                      <el-table-column
                        prop="starttime2"
                        :label="$t('label.start')"
                        width="100%">
                      </el-table-column>
                      <el-table-column
                        prop="endtime2"
                        :label="$t('label.end')"
                        width="100%">
                      </el-table-column>
                      <el-table-column
                        prop="shicha2"
                        :label="$t('label.PFANS5008FORMVIEW_SC')"
                        width="120%">
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import dicselect from "../../../components/dicselect.vue";
    import PFANS5008View from "../PFANS5008/PFANS5008View.vue";
    import {Message} from 'element-ui'
    import moment from "moment";

    export default {
        name: 'PFANS5008FormView',
        components: {
            EasyNormalContainer,
            dicselect,
            PFANS5008View
        },
        data() {
            var validatetimestart = (rule, value, callback) => {
                if (this.companyform.time_start !== '' && this.companyform.time_start !== null && this.companyform.time_end !== '' && this.companyform.time_end !== null) {
                    if (moment(this.companyform.time_end).format("HH:mm") <= moment(this.companyform.time_start).format("HH:mm")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    }
                }
                if (this.companyform2.time_start !== '' && this.companyform2.time_start !== null && this.companyform2.time_end !== '' && this.companyform2.time_end !== null) {
                    if (moment(this.companyform2.time_end).format("HH:mm") <= moment(this.companyform2.time_start).format("HH:mm")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    }
                }
                callback()
            };
            var validatetimeend = (rule, value, callback) => {
                if (this.companyform.time_start !== '' && this.companyform.time_start !== null && this.companyform.time_end !== '' && this.companyform.time_end !== null) {
                    if (moment(this.companyform.time_end).format("HH:mm") <= moment(this.companyform.time_start).format("HH:mm")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    }
                }
                if (this.companyform2.time_start !== '' && this.companyform2.time_start !== null && this.companyform2.time_end !== '' && this.companyform2.time_end !== null) {
                    if (moment(this.companyform2.time_end).format("HH:mm") <= moment(this.companyform2.time_start).format("HH:mm")) {
                        callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
                    }
                }
                callback()
            };
            return {
                loading: false,
                DataList: [{
                    starttime: '',
                    endtime: '',
                    shicha: '',
                    program: '',
                }],
                DataList2: [{
                    starttime2: '',
                    endtime2: '',
                    shicha2: '',
                }],
                transferData: [],
                transfer: [],
                optionsdata: [],
                optionsdate: [],
                optiondate: [],
                buttonList: [],
                disable: false,
                PFANS5008: this.$route.params.PFANS5008,
                companyform: {
                    project_id: '',
                    project_name: '',
                    time_start: '',
                    time_end: '',
                    log_date: '',
                    work_phase: '',
                    behavior_breakdown: '',
                    work_memo: '',
                    has_project: '',
                },
                companyform2: {
                    time_start: '',
                    time_end: '',
                    log_date: '',
                    work_phase: '',
                    behavior_breakdown: '',
                    work_memo: '',
                    has_project: '',
                },
                determine: {
                    user_id: '',
                    project_id: '',
                    project_name: [],
                },
                xsTable: false,
                xsTable2: false,
                program: false,
                code2: 'PP008',
                multiple2: false,
                data2: '',
                code3: 'PP009',
                multiple3: false,
                data3: '',
                code4: 'PP010',
                multiple4: false,
                data4: '',
                code5: 'PP011',
                multiple5: false,
                data5: '',
                activeName: 'first',
                isShow: true,
                title: "title.PFANS5008",
                rules: {
                    log_date: [{
                        required: true,
                    }
                    ],
                    time_start: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.start'),
                            trigger: 'blur',
                        },
                        {validator: validatetimestart, trigger: 'change'}
                    ],
                    time_end: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.end'),
                            trigger: 'blur'
                        },
                        {validator: validatetimeend, trigger: 'change'}
                    ],
                    project_id: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5008VIEW_XZPROGRAM'),
                            trigger: 'change'
                        }
                    ],
                },
            }
        },
        created() {
            this.companyform.log_date = this.$route.params.date;
            this.companyform2.log_date = this.$route.params.date;
            this.buttonList = [
                {
                    key: "btnSave",
                    name: "button.confirm",
                },
                {
                    key: "mingtian",
                    name: "button.mingtian",
                },
            ];
            this.loading = true;
            this.$store
                .dispatch('PFANS5008Store/getProjectList', {})
                .then(response => {
                    const data = [];
                    for (let i = 0; i < response.length; i++) {
                        data.push({
                            key: response[i].project_id,
                            label: response[i].project_name,
                        });
                    }
                    this.transferData = data;
                    let log_date = this.companyform.log_date;
                    this.$store
                        .dispatch('PFANS5008Store/getDataList', {})
                        .then(response => {
                            const data = [];
                            let datalist = [];
                            for (let k = 0; k < response.length; k++) {
                                if (response[k].has_project === '01') {
                                    let log_date3 = moment(response[k].log_date).format("YYYY-MM-DD");
                                    if (log_date3 === log_date) {
                                        for (let i = 0; i < this.transferData.length; i++) {
                                            if (this.transferData[i].key === response[k].project_id) {
                                                response[k].project_id = this.transferData[i].label;
                                            }
                                        }
                                        let obj = {};
                                        let d = new Date(response[k].time_start);
                                        let Housd = d.getHours() + d.getMinutes() / 60;
                                        let time = d.getHours() + ':' + d.getMinutes();
                                        obj.starttime = time;
                                        let a = new Date(response[k].time_end);
                                        let Housa = a.getHours() + a.getMinutes() / 60;
                                        let time2 = a.getHours() + ':' + a.getMinutes();
                                        obj.endtime = time2;
                                        let e = Housa - Housd;
                                        let realVal = parseFloat(e).toFixed(2);
                                        obj.shicha = realVal;
                                        obj.program = response[k].project_id;
                                        obj.logmanagementid = response[k].logmanagement_id;
                                        this.xsTable = true;
                                        datalist[k] = obj;
                                    }
                                }
                            }
                            this.DataList = datalist;
                        });
                    let log_date2 = this.companyform2.log_date;
                    this.$store
                        .dispatch('PFANS5008Store/getDataList', {})
                        .then(response => {
                            let datalist2 = [];
                            const data2 = [];
                            for (let k = 0; k < response.length; k++) {
                                if (response[k].has_project === '02') {
                                    let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                    if (log_date4 === log_date2) {
                                        let obj = {};
                                        let d = new Date(response[k].time_start);
                                        let Housd = d.getHours() + d.getMinutes() / 60;
                                        let time = d.getHours() + ':' + d.getMinutes();
                                        obj.starttime2 = time;
                                        let a = new Date(response[k].time_end);
                                        let Housa = a.getHours() + a.getMinutes() / 60;
                                        let time2 = a.getHours() + ':' + a.getMinutes();
                                        obj.endtime2 = time2;
                                        let e = Housa - Housd;
                                        let realVal = parseFloat(e).toFixed(2);
                                        obj.shicha2 = realVal;
                                        this.xsTable2 = true;
                                        obj.logmanagementid = response[k].logmanagement_id;
                                        datalist2[k] = obj;
                                    }
                                }
                            }
                            this.DataList2 = datalist2;
                        })
                });
            this.loading = false;
            this.disable = this.$route.params.disabled;
            let c = this.$route.params._id;
            if (c === "") {
                if (this.disable) {
                    this.companyform.log_date = new Date();
                    this.companyform2.log_date = new Date();
                    this.buttonList = [
                        {
                            key: "btnSave",
                            name: "button.confirm",
                        },
                        {
                            key: "mingtian",
                            name: "button.mingtian",
                        },
                    ];
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS5008Store/getProjectList', {})
                        .then(response => {
                            const data = [];
                            for (let i = 0; i < response.length; i++) {
                                data.push({
                                    key: response[i].project_id,
                                    label: response[i].project_name,
                                });
                            }
                            this.transferData = data;
                            this.$store
                                .dispatch('PFANS5008Store/getDataList', {})
                                .then(response => {
                                    const data = [];
                                    let datalist = [];
                                    for (let k = 0; k < response.length; k++) {
                                        if (response[k].has_project === '01') {
                                            if (moment(response[k].log_date).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")) {
                                                for (let i = 0; i < this.transferData.length; i++) {
                                                    if (this.transferData[i].key === response[k].project_id) {
                                                        response[k].project_id = this.transferData[i].label;
                                                    }
                                                }
                                                let obj = {};
                                                let d = new Date(response[k].time_start);
                                                let Housd = d.getHours() + d.getMinutes() / 60;
                                                let time = d.getHours() + ':' + d.getMinutes();
                                                obj.starttime = time;
                                                let a = new Date(response[k].time_end);
                                                let Housa = a.getHours() + a.getMinutes() / 60;
                                                let time2 = a.getHours() + ':' + a.getMinutes();
                                                obj.endtime = time2;
                                                let e = Housa - Housd;
                                                let realVal = parseFloat(e).toFixed(2);
                                                obj.shicha = realVal;
                                                obj.program = response[k].project_id;
                                                obj.logmanagementid = response[k].logmanagement_id;
                                                this.xsTable = true;
                                                datalist[k] = obj;
                                            }
                                        }
                                    }
                                    this.DataList = datalist;
                                });
                            this.$store
                                .dispatch('PFANS5008Store/getDataList', {})
                                .then(response => {
                                    let datalist2 = [];
                                    const data2 = [];
                                    for (let k = 0; k < response.length; k++) {
                                        if (response[k].has_project === '02') {
                                            if (moment(response[k].log_date).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")) {
                                                let obj = {};
                                                let d = new Date(response[k].time_start);
                                                let Housd = d.getHours() + d.getMinutes() / 60;
                                                let time = d.getHours() + ':' + d.getMinutes();
                                                obj.starttime2 = time;
                                                let a = new Date(response[k].time_end);
                                                let Housa = a.getHours() + a.getMinutes() / 60;
                                                let time2 = a.getHours() + ':' + a.getMinutes();
                                                obj.endtime2 = time2;
                                                let e = Housa - Housd;
                                                let realVal = parseFloat(e).toFixed(2);
                                                obj.shicha2 = realVal;
                                                this.xsTable2 = true;
                                                obj.logmanagementid = response[k].logmanagement_id;
                                                datalist2[k] = obj;
                                            }
                                        }
                                    }
                                    this.DataList2 = datalist2;
                                })
                        });
                    this.loading = false;
                }
            }
        },
        mounted() {
            this.getCompanyProjectList();
            this.loading = true;
            this.$store
                .dispatch('PFANS5008Store/getProjectList', {})
                .then(response => {
                    this.optionsdata = [];
                    let user_id = this.$store.getters.userinfo.userid;
                    for (let i = 0; i < response.length; i++) {
                        if (user_id === response[i].user_id) {
                            var vote = {};
                            vote.value = response[i].project_id,
                                vote.lable = response[i].project_name,
                                this.optionsdata.push(vote)
                        }
                    }
                    this.loading = false;
                })
                .catch(error => {
                    Message({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    this.loading = false;
                });
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS5008Store/getDataOne', {"logmanagement_id": this.$route.params._id})
                    .then(response => {
                        this.data = response;
                        if (this.data.has_project === '01') {
                            this.companyform = this.data;
                            this.$store
                                .dispatch('PFANS5008Store/getProjectList', {})
                                .then(response => {
                                    const data = [];
                                    for (let i = 0; i < response.length; i++) {
                                        data.push({
                                            key: response[i].project_id,
                                            label: response[i].project_name,
                                        });
                                    }
                                    this.transferData = data;
                                    let log_date = moment(this.data.log_date).format("YYYY-MM-DD");
                                    this.$store
                                        .dispatch('PFANS5008Store/getDataList', {})
                                        .then(response => {
                                            const data = [];
                                            let datalist = [];
                                            for (let k = 0; k < response.length; k++) {
                                                if (response[k].has_project === '01') {
                                                    let log_date3 = moment(response[k].log_date).format("YYYY-MM-DD");
                                                    if (log_date3 === log_date) {
                                                        for (let i = 0; i < this.transferData.length; i++) {
                                                            if (this.transferData[i].key === response[k].project_id) {
                                                                response[k].project_id = this.transferData[i].label;
                                                            }
                                                        }
                                                        let obj = {};
                                                        let d = new Date(response[k].time_start);
                                                        let Housd = d.getHours() + d.getMinutes() / 60;
                                                        let time = d.getHours() + ':' + d.getMinutes();
                                                        obj.starttime = time;
                                                        let a = new Date(response[k].time_end);
                                                        let Housa = a.getHours() + a.getMinutes() / 60;
                                                        let time2 = a.getHours() + ':' + a.getMinutes();
                                                        obj.endtime = time2;
                                                        let e = Housa - Housd;
                                                        let realVal = parseFloat(e).toFixed(2);
                                                        obj.shicha = realVal;
                                                        obj.program = response[k].project_id;
                                                        obj.logmanagementid = response[k].logmanagement_id;
                                                        this.xsTable = true;
                                                        datalist[k] = obj;
                                                    }
                                                }
                                            }
                                            this.DataList = datalist;
                                        })
                                })
                        } else if (this.data.has_project === '02') {
                            this.companyform2 = this.data;
                            let log_date2 = moment(this.data.log_date).format("YYYY-MM-DD");
                            this.$store
                                .dispatch('PFANS5008Store/getDataList', {})
                                .then(response => {
                                    let datalist2 = [];
                                    const data2 = [];
                                    for (let k = 0; k < response.length; k++) {
                                        if (response[k].has_project === '02') {
                                            let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                            if (log_date4 === log_date2) {
                                                let obj = {};
                                                let d = new Date(response[k].time_start);
                                                let Housd = d.getHours() + d.getMinutes() / 60;
                                                let time = d.getHours() + ':' + d.getMinutes();
                                                obj.starttime2 = time;
                                                let a = new Date(response[k].time_end);
                                                let Housa = a.getHours() + a.getMinutes() / 60;
                                                let time2 = a.getHours() + ':' + a.getMinutes();
                                                obj.endtime2 = time2;
                                                let e = Housa - Housd;
                                                let realVal = parseFloat(e).toFixed(2);
                                                obj.shicha2 = realVal;
                                                this.xsTable2 = true;
                                                obj.logmanagementid = response[k].logmanagement_id;
                                                datalist2[k] = obj;
                                            }
                                        }
                                    }
                                    this.DataList2 = datalist2;
                                })
                        }
                        this.loading = false;
                    })
            }
        },
        methods: {
            rowclick(row, event, column) {
                this.row = row.logmanagementid;
                this.loading = true;
                this.$store
                    .dispatch('PFANS5008Store/getDataOne', {"logmanagement_id": this.row})
                    .then(response => {
                        this.data = response;
                        if (this.data.has_project === '01') {
                            this.companyform = this.data;
                        } else if (this.data.has_project === '02') {
                            this.companyform2 = this.data;
                        }
                        this.loading = false;
                    })
            },
            riqi() {
                this.xsTable = false;
                this.xsTable2 = false;
                this.loading = true;
                this.$store
                    .dispatch('PFANS5008Store/getDataList', {})
                    .then(response => {
                        const data = [];
                        let datalist = [];
                        let log_date = moment(this.companyform.log_date).format("YYYY-MM-DD");
                        for (let k = 0; k < response.length; k++) {
                            if (response[k].has_project === '01') {
                                let log_date3 = moment(response[k].log_date).format("YYYY-MM-DD");
                                if (log_date3 === log_date) {
                                    for (let i = 0; i < this.transferData.length; i++) {
                                        if (this.transferData[i].key === response[k].project_id) {
                                            response[k].project_id = this.transferData[i].label;
                                        }
                                    }
                                    let obj = {};
                                    let d = new Date(response[k].time_start);
                                    let Housd = d.getHours() + d.getMinutes() / 60;
                                    let time = d.getHours() + ':' + d.getMinutes();
                                    obj.starttime = time;
                                    let a = new Date(response[k].time_end);
                                    let Housa = a.getHours() + a.getMinutes() / 60;
                                    let time2 = a.getHours() + ':' + a.getMinutes();
                                    obj.endtime = time2;
                                    let e = Housa - Housd;
                                    let realVal = parseFloat(e).toFixed(2);
                                    obj.shicha = realVal;
                                    obj.program = response[k].project_id;
                                    this.xsTable = true;
                                    obj.logmanagementid = response[k].logmanagement_id;
                                    datalist[k] = obj;
                                }
                            }
                        }
                        this.DataList = datalist;
                        this.loading = false;
                    });
                this.$store
                    .dispatch('PFANS5008Store/getDataList', {})
                    .then(response => {
                        let log_date2 = moment(this.companyform2.log_date).format("YYYY-MM-DD");
                        let datalist2 = [];
                        const data2 = [];
                        for (let k = 0; k < response.length; k++) {
                            if (response[k].has_project === '02') {
                                let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                if (log_date4 === log_date2) {
                                    let obj = {};
                                    let d = new Date(response[k].time_start);
                                    let Housd = d.getHours() + d.getMinutes() / 60;
                                    let time = d.getHours() + ':' + d.getMinutes();
                                    obj.starttime2 = time;
                                    let a = new Date(response[k].time_end);
                                    let Housa = a.getHours() + a.getMinutes() / 60;
                                    let time2 = a.getHours() + ':' + a.getMinutes();
                                    obj.endtime2 = time2;
                                    let e = Housa - Housd;
                                    let realVal = parseFloat(e).toFixed(2);
                                    obj.shicha2 = realVal;
                                    this.xsTable2 = true;
                                    obj.logmanagementid = response[k].logmanagement_id;
                                    datalist2[k] = obj;
                                }
                            }
                        }
                        this.DataList2 = datalist2;
                        this.loading = false;
                    })
            },
            handleChange(value, direction, movedKeys) {
                this.optionsdate = [];
                if (direction === "right") {
                    for (var k = 0; k < movedKeys.length; k++) {
                        var vote = {};
                        vote.value = movedKeys[k];
                        this.optionsdate.push(vote)
                    }
                    this.determine.project_id = this.optionsdate;
                }
            },
            submitForm(determine) {
                determine.user_id = this.$store.getters.userinfo.userid;
                const data = [];
                for (let i = 0; i < this.transfer.length; i++) {
                    for (var m = 0; m < determine.project_id.length; m++) {
                        if (this.transfer[i].key === determine.project_id[m].value) {
                            data.push({
                                project_id: determine.project_id[m].value,
                                project_name: this.transfer[i].label,
                                user_id: determine.user_id,
                            });
                        }
                    }
                }
                this.optiondate = data;
                this.loading = true;
                for (let i = 0; i < this.optiondate.length; i++) {
                    this.$store
                        .dispatch('PFANS5008Store/createProject', this.optiondate[i])
                        .then(response => {
                            this.List = response;
                            this.$store
                                .dispatch('PFANS5008Store/getProjectList', {})
                                .then(response => {
                                    this.optionsdata = [];
                                    let user_id = this.$store.getters.userinfo.userid;
                                    for (let i = 0; i < response.length; i++) {
                                        if (user_id === response[i].user_id) {

                                            var vote = {};
                                            vote.value = response[i].project_id,
                                                vote.lable = response[i].project_name,
                                                this.optionsdata.push(vote)
                                        }
                                    }
                                    this.loading = false;
                                })
                                .catch(error => {
                                    Message({
                                        message: error,
                                        type: 'error',
                                        duration: 5 * 1000
                                    });
                                    this.loading = false;
                                });
                            this.data = response;
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
                }
                this.program = false;
            },
            getCompanyProjectList() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS5008Store/getCompanyProjectList', {})
                    .then(response => {
                        const data = [];
                        for (let i = 0; i < response.length; i++) {
                            data.push({
                                key: response[i].companyprojects_id,
                                label: response[i].project_name,
                            });
                        }
                        this.transfer = data;
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
            buttonClick(val) {
                if (val === 'mingtian') {
                    this.xsTable = false;
                    this.xsTable2 = false;
                    if (this.activeName === 'first') {
                        this.companyform.log_date = moment(this.companyform.log_date).add(1, 'days').format("YYYY-MM-DD");
                        this.companyform.time_start = '';
                        this.companyform.time_end = '';
                        this.companyform.behavior_breakdown = '';
                        this.companyform.work_phase = '';
                        this.companyform.work_memo = '';
                    } else if (this.activeName === 'second') {
                        this.companyform2.log_date = moment(this.companyform2.log_date).add(1, 'days').format("YYYY-MM-DD");
                        this.companyform2.time_start = '';
                        this.companyform2.time_end = '';
                        this.companyform2.behavior_breakdown = '';
                        this.companyform2.work_phase = '';
                        this.companyform2.work_memo = '';
                    }
                    this.loading = true;
                    let log_date = moment(this.companyform.log_date).format("YYYY-MM-DD");
                    this.$store
                        .dispatch('PFANS5008Store/getDataList', {})
                        .then(response => {
                            const data = [];
                            let datalist = [];
                            for (let k = 0; k < response.length; k++) {
                                if (response[k].has_project === '01') {
                                    let log_date3 = moment(response[k].log_date).format("YYYY-MM-DD");
                                    if (log_date3 === log_date) {
                                        for (let i = 0; i < this.transferData.length; i++) {
                                            if (this.transferData[i].key === response[k].project_id) {
                                                response[k].project_id = this.transferData[i].label;
                                            }
                                        }
                                        let obj = {};
                                        let d = new Date(response[k].time_start);
                                        let Housd = d.getHours() + d.getMinutes() / 60;
                                        let time = d.getHours() + ':' + d.getMinutes();
                                        obj.starttime = time;
                                        let a = new Date(response[k].time_end);
                                        let Housa = a.getHours() + a.getMinutes() / 60;
                                        let time2 = a.getHours() + ':' + a.getMinutes();
                                        obj.endtime = time2;
                                        let e = Housa - Housd;
                                        let realVal = parseFloat(e).toFixed(2);
                                        obj.shicha = realVal;
                                        obj.program = response[k].project_id;
                                        this.xsTable = true;
                                        obj.logmanagementid = response[k].logmanagement_id;
                                        datalist[k] = obj;
                                    }
                                }
                            }
                            this.DataList = datalist;
                            this.loading = false;
                        });
                    this.loading = true;
                    let log_date2 = moment(this.companyform2.log_date).format("YYYY-MM-DD");
                    this.$store
                        .dispatch('PFANS5008Store/getDataList', {})
                        .then(response => {
                            let datalist2 = [];
                            const data2 = [];
                            for (let k = 0; k < response.length; k++) {
                                if (response[k].has_project === '02') {
                                    let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                    if (log_date4 === log_date2) {
                                        let obj = {};
                                        let d = new Date(response[k].time_start);
                                        let Housd = d.getHours() + d.getMinutes() / 60;
                                        let time = d.getHours() + ':' + d.getMinutes();
                                        obj.starttime2 = time;
                                        let a = new Date(response[k].time_end);
                                        let Housa = a.getHours() + a.getMinutes() / 60;
                                        let time2 = a.getHours() + ':' + a.getMinutes();
                                        obj.endtime2 = time2;
                                        let e = Housa - Housd;
                                        let realVal = parseFloat(e).toFixed(2);
                                        obj.shicha2 = realVal;
                                        this.xsTable2 = true;
                                        obj.logmanagementid = response[k].logmanagement_id;
                                        datalist2[k] = obj;
                                    }
                                }
                            }
                            this.DataList2 = datalist2;
                            this.loading = false;
                        })
                }
                if (val === 'btnSave') {
                    if (this.$route.params._id) {
                        this.companyform.logmanagement_id = this.$route.params._id;
                        if (this.companyform.has_project === '01') {
                            this.loading = true;
                            this.$refs["companyform"].validate(valid => {
                                if (valid) {
                                    this.$store
                                        .dispatch('PFANS5008Store/updateNewUser', this.companyform)
                                        .then(response => {
                                            this.data = response;
                                            Message({
                                                message: this.$t("normal.success_02"),
                                                type: 'success',
                                                duration: 5 * 1000
                                            });
                                            this.$store
                                                .dispatch('PFANS5008Store/getDataList', {})
                                                .then(response => {
                                                    let datalist = [];
                                                    const data = [];
                                                    let log_date = moment(this.companyform.log_date).format("YYYY-MM-DD");
                                                    for (let k = 0; k < response.length; k++) {
                                                        for (let i = 0; i < this.transferData.length; i++) {
                                                            if (this.transferData[i].key === response[k].project_id) {
                                                                response[k].project_id = this.transferData[i].label;
                                                            }
                                                        }
                                                        if (response[k].has_project === '01') {
                                                            let log_date2 = moment(response[k].log_date).format("YYYY-MM-DD");
                                                            if (log_date2 === log_date) {
                                                                let obj = {};
                                                                let d = new Date(response[k].time_start);
                                                                let Housd = d.getHours() + d.getMinutes() / 60;
                                                                let time = d.getHours() + ':' + d.getMinutes();
                                                                obj.starttime = time;
                                                                let a = new Date(response[k].time_end);
                                                                let Housa = a.getHours() + a.getMinutes() / 60;
                                                                let time2 = a.getHours() + ':' + a.getMinutes();
                                                                obj.endtime = time2;
                                                                let e = Housa - Housd;
                                                                let realVal = parseFloat(e).toFixed(2);
                                                                obj.shicha = realVal;
                                                                obj.program = response[k].project_id;
                                                                datalist[k] = obj;
                                                                obj.logmanagementid = response[k].logmanagement_id;
                                                                this.xsTable = true;
                                                            }
                                                        }
                                                    }
                                                    this.DataList = datalist;
                                                    this.loading = false;
                                                })
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
                            });
                        } else if (this.companyform2.has_project === '02') {
                            this.companyform2.logmanagement_id = this.$route.params._id;
                            this.$refs["companyform2"].validate(valid => {
                                if (valid) {
                                    this.$store
                                        .dispatch('PFANS5008Store/updateNewUser', this.companyform2)
                                        .then(response => {
                                            this.data = response;
                                            Message({
                                                message: this.$t("normal.success_02"),
                                                type: 'success',
                                                duration: 5 * 1000
                                            });
                                            let log_date3 = moment(this.companyform2.log_date).format("YYYY-MM-DD");
                                            this.$store
                                                .dispatch('PFANS5008Store/getDataList', {})
                                                .then(response => {
                                                    let datalist = [];
                                                    const data2 = [];
                                                    for (let k = 0; k < response.length; k++) {
                                                        if (response[k].has_project === '02') {
                                                            let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                                            if (log_date4 === log_date3) {
                                                                let obj = {};
                                                                let d = new Date(response[k].time_start);
                                                                let Housd = d.getHours() + d.getMinutes() / 60;
                                                                let time = d.getHours() + ':' + d.getMinutes();
                                                                obj.starttime2 = time;
                                                                let a = new Date(response[k].time_end);
                                                                let Housa = a.getHours() + a.getMinutes() / 60;
                                                                let time2 = a.getHours() + ':' + a.getMinutes();
                                                                obj.endtime2 = time2;
                                                                let e = Housa - Housd;
                                                                let realVal = parseFloat(e).toFixed(2);
                                                                obj.shicha2 = realVal;
                                                                datalist[k] = obj;
                                                                obj.logmanagementid = response[k].logmanagement_id;
                                                                this.xsTable2 = true;
                                                            }
                                                        }
                                                    }
                                                    this.DataList2 = datalist;
                                                    this.loading = false;
                                                })
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
                            });
                        }
                    } else if (this.activeName === 'first') {
                        this.companyform.has_project = '01';
                        this.$refs["companyform"].validate(valid => {
                            if (valid) {
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS5008Store/createNewUser', this.companyform)
                                    .then(response => {
                                        this.data = response;
                                        Message({
                                            message: this.$t("normal.success_01"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        this.$store
                                            .dispatch('PFANS5008Store/getDataList', {})
                                            .then(response => {
                                                let datalist = [];
                                                const data = [];
                                                let log_date = moment(this.companyform.log_date).format("YYYY-MM-DD");
                                                for (let k = 0; k < response.length; k++) {
                                                    for (let i = 0; i < this.transferData.length; i++) {
                                                        if (this.transferData[i].key === response[k].project_id) {
                                                            response[k].project_id = this.transferData[i].label;
                                                        }
                                                    }
                                                    if (response[k].has_project === '01') {
                                                        let log_date2 = moment(response[k].log_date).format("YYYY-MM-DD");
                                                        if (log_date2 === log_date) {
                                                            let obj = {};
                                                            let d = new Date(response[k].time_start);
                                                            let Housd = d.getHours() + d.getMinutes() / 60;
                                                            let time = d.getHours() + ':' + d.getMinutes();
                                                            obj.starttime = time;
                                                            let a = new Date(response[k].time_end);
                                                            let Housa = a.getHours() + a.getMinutes() / 60;
                                                            let time2 = a.getHours() + ':' + a.getMinutes();
                                                            obj.endtime = time2;
                                                            let e = Housa - Housd;
                                                            let realVal = parseFloat(e).toFixed(2);
                                                            obj.shicha = realVal;
                                                            obj.program = response[k].project_id;
                                                            datalist[k] = obj;
                                                            obj.logmanagementid = response[k].logmanagement_id;
                                                            this.xsTable = true;
                                                        }
                                                    }
                                                }
                                                this.DataList = datalist;
                                                this.loading = false;
                                            })
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
                        });
                    } else if (this.activeName === 'second') {
                        this.companyform2.has_project = '02';
                        this.$refs["companyform2"].validate(valid => {
                            if (valid) {
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS5008Store/createNewUser', this.companyform2)
                                    .then(response => {
                                        this.data = response;
                                        Message({
                                            message: this.$t("normal.success_01"),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        let log_date3 = moment(this.companyform2.log_date).format("YYYY-MM-DD");
                                        this.$store
                                            .dispatch('PFANS5008Store/getDataList', {})
                                            .then(response => {
                                                let datalist = [];
                                                const data2 = [];
                                                for (let k = 0; k < response.length; k++) {
                                                    if (response[k].has_project === '02') {
                                                        let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                                        if (log_date4 === log_date3) {
                                                            let obj = {};
                                                            let d = new Date(response[k].time_start);
                                                            let Housd = d.getHours() + d.getMinutes() / 60;
                                                            let time = d.getHours() + ':' + d.getMinutes();
                                                            obj.starttime2 = time;
                                                            let a = new Date(response[k].time_end);
                                                            let Housa = a.getHours() + a.getMinutes() / 60;
                                                            let time2 = a.getHours() + ':' + a.getMinutes();
                                                            obj.endtime2 = time2;
                                                            let e = Housa - Housd;
                                                            let realVal = parseFloat(e).toFixed(2);
                                                            obj.shicha2 = realVal;
                                                            datalist[k] = obj;
                                                            obj.logmanagementid = response[k].logmanagement_id;
                                                            this.xsTable2 = true;
                                                        }
                                                    }
                                                }
                                                this.DataList2 = datalist;
                                                this.loading = false;
                                            })
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
                        });
                    }
                }
            },
            JDjobs(value1) {
                this.companyform.work_phase = value1;
            },
            XWXF(value3) {
                this.companyform.behavior_breakdown = value3;
            },
            XWXF2(value4) {
                this.companyform2.behavior_breakdown = value4;
            },
            JDjobs2(value5) {
                this.companyform2.work_phase = value5;
            },
            clickdata() {
                this.xsTable2 = false;
                this.xsTable = false;
                this.loading = true;
                this.$store
                    .dispatch('PFANS5008Store/getProjectList', {})
                    .then(response => {
                        const data = [];
                        for (let i = 0; i < response.length; i++) {
                            data.push({
                                key: response[i].project_id,
                                label: response[i].project_name,
                            });
                        }
                        this.transferData = data;
                        let log_date = moment(this.companyform.log_date).format("YYYY-MM-DD");
                        this.$store
                            .dispatch('PFANS5008Store/getDataList', {})
                            .then(response => {
                                const data = [];
                                let datalist = [];
                                for (let k = 0; k < response.length; k++) {
                                    if (response[k].has_project === '01') {
                                        let log_date3 = moment(response[k].log_date).format("YYYY-MM-DD");
                                        if (log_date3 === log_date) {
                                            for (let i = 0; i < this.transferData.length; i++) {
                                                if (this.transferData[i].key === response[k].project_id) {
                                                    response[k].project_id = this.transferData[i].label;
                                                }
                                            }
                                            let obj = {};
                                            let d = new Date(response[k].time_start);
                                            let Housd = d.getHours() + d.getMinutes() / 60;
                                            let time = d.getHours() + ':' + d.getMinutes();
                                            obj.starttime = time;
                                            let a = new Date(response[k].time_end);
                                            let Housa = a.getHours() + a.getMinutes() / 60;
                                            let time2 = a.getHours() + ':' + a.getMinutes();
                                            obj.endtime = time2;
                                            let e = Housa - Housd;
                                            let realVal = parseFloat(e).toFixed(2);
                                            obj.shicha = realVal;
                                            obj.program = response[k].project_id;
                                            obj.logmanagementid = response[k].logmanagement_id;
                                            this.xsTable = true;
                                            datalist[k] = obj;
                                        }
                                    }
                                }
                                this.DataList = datalist;
                            });
                        let log_date2 = moment(this.companyform2.log_date).format("YYYY-MM-DD");
                        this.$store
                            .dispatch('PFANS5008Store/getDataList', {})
                            .then(response => {
                                let datalist2 = [];
                                const data2 = [];
                                for (let k = 0; k < response.length; k++) {
                                    if (response[k].has_project === '02') {
                                        let log_date4 = moment(response[k].log_date).format("YYYY-MM-DD");
                                        if (log_date4 === log_date2) {
                                            let obj = {};
                                            let d = new Date(response[k].time_start);
                                            let Housd = d.getHours() + d.getMinutes() / 60;
                                            let time = d.getHours() + ':' + d.getMinutes();
                                            obj.starttime2 = time;
                                            let a = new Date(response[k].time_end);
                                            let Housa = a.getHours() + a.getMinutes() / 60;
                                            let time2 = a.getHours() + ':' + a.getMinutes();
                                            obj.endtime2 = time2;
                                            let e = Housa - Housd;
                                            let realVal = parseFloat(e).toFixed(2);
                                            obj.shicha2 = realVal;
                                            this.xsTable2 = true;
                                            obj.logmanagementid = response[k].logmanagement_id;
                                            datalist2[k] = obj;
                                        }
                                    }
                                }
                                this.DataList2 = datalist2;
                            })
                    });
                this.loading = false;
            },
        }
    }
</script>
<style lang="scss">
  .appManage {
    .el-calendar-day {
      height: 3rem;
    }
  }
  .el-form-item__error {
    width: 15rem;
  }
</style>
