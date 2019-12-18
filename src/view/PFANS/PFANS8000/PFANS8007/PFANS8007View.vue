<template>
  <div style="min-height: 100%">
    <EasyNormalContainer v-loading="loading" :title="title" ref="container" :noback="noback"
    >
      <div slot="customize">
        <el-container style="margin-top: 1rem">
          <el-aside style="width: 80%;">
            <el-row>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate4" :first-day="firstDay" :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar1"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate5" :first-day="firstDay" :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar2"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate6" :first-day="firstDay" :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar3"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate7" :first-day="firstDay" :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar4"/>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate8" :first-day="firstDay" :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar5"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate9" :first-day="firstDay" :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar6"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate10" :first-day="firstDay"
                               :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar7"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate11" :first-day="firstDay"
                               :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar8"/>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate12" :first-day="firstDay"
                               :header='header'
                               weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar9"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate1" :first-day="firstDay"
                               :header='header' weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar10"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate2" :first-day="firstDay"
                               :header='header' weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar11"/>
              </el-col>
              <el-col :span="6">
                <full-calendar :dayRender="dayRender" :defaultDate="defaultDate3" :first-day="firstDay"
                               :header='header' weekMode="fixed"
                               :locale='locale' :plugins="calendarPlugins" :showNonCurrentDates="showNonCurrentDates"
                               @dateClick="handleDateClick"
                               defaultView="dayGridMonth"
                               ref="fullCalendar12"/>
              </el-col>
            </el-row>
          </el-aside>
          <el-main>
            <el-row>
              <el-select @change="dateChange(1)" style="width:7rem;" v-model="yearsModel">
                <el-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in years">
                </el-option>
              </el-select>
            </el-row>
            <div>&nbsp;</div>
            <el-row>
              <el-col :span="2">
                <el-tag effect="dark" type="danger" style="width: 7rem">{{$t('label.PFANS8007VIEW_FD')}}</el-tag>
              </el-col>
            </el-row>
            <div>&nbsp;</div>
            <el-row>
              <el-col :span="2">
                <el-tag effect="dark" type="info" style="width: 7rem">{{$t('label.PFANS8007VIEW_GX')}}</el-tag>
              </el-col>
            </el-row>
            <div>&nbsp;</div>
            <el-row>
              <el-col :span="2">
                <el-tag effect="dark" style="width: 7rem">{{$t('label.PFANS8007VIEW_ZT')}}</el-tag>
              </el-col>
            </el-row>
            <div>&nbsp;</div>
            <el-row>
              <el-col :span="2">
                <el-tag effect="dark" type="warning" style="width: 7rem;">{{$t('label.PFANS8007VIEW_ZTC')}}</el-tag>
              </el-col>
            </el-row>
            <div>&nbsp;</div>
            <el-row>
              <el-col :span="2">
                <el-tag effect="dark" style="width: 7rem;background-color:magenta;border-color:magenta ">
                  {{$t('label.PFANS8007VIEW_HS')}}
                </el-tag>
              </el-col>
            </el-row>
            <div>&nbsp;</div>
            <el-row>
              <el-col :span="2">
                <el-tag effect="dark" style="width: 7rem;background-color: green;border-color:green">
                  {{$t('label.PFANS8007VIEW_YQ')}}
                </el-tag>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-dialog :visible.sync="tanchang" width="40rem">
          <table border="0" cellpadding="0" cellspacing="0" style="margin-left: 14.5rem">
            <tr>
              <el-radio @change="setClick('1')" border label="1"
                        style="width: 8rem;background-color:#df4848;color: white "
                        v-model="radio1">{{$t('label.PFANS8007VIEW_FD')}}
              </el-radio>
            </tr>
            <tr>
              <el-radio @change="setClick('2')" border label="2"
                        style="width: 8rem;background-color:#999;color: white"
                        v-model="radio1">{{$t('label.PFANS8007VIEW_GX')}}
              </el-radio>
            </tr>
            <tr>
              <el-radio @change="setClick('3')" border label="3"
                        style="width: 8rem;background-color:#005baa;color: white"
                        v-model="radio1">{{$t('label.PFANS8007VIEW_ZT')}}
              </el-radio>
            </tr>
            <tr>
              <el-radio @change="setClick('4')" border label="4"
                        style="width: 8rem;background-color:#f9e30e;color: white"
                        v-model="radio1">{{$t('label.PFANS8007VIEW_ZTC')}}
              </el-radio>
            </tr>
            <tr>
              <el-radio @change="setClick('5')" border label="5"
                        style="width: 8rem;background-color:magenta;color: white"
                        v-model="radio1">{{$t('label.PFANS8007VIEW_HS')}}
              </el-radio>
            </tr>
            <tr>
              <el-radio @change="setClick('6')" border label="6"
                        style="width: 8rem;background-color:green;color: white"
                        v-model="radio1">{{$t('label.PFANS8007VIEW_YQ')}}
              </el-radio>
            </tr>
          </table>
          <div style="margin-top: 1rem;margin-left: 13rem">
            <el-button @click="submitForm('ruleFormNew')" type="primary">
              {{$t('button.confirm')}}
            </el-button>
            <el-button @click="resetForm('ruleFormNew')">{{$t('label.PFANS8007VIEW_QC')}}</el-button>
          </div>
        </el-dialog>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer'
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import moment from 'moment'
    import {Message} from 'element-ui'

    export default {
        name: 'PFANS8007View.vue',
        components: {
            FullCalendar,
            EasyNormalContainer,
        },
        data() {
            return {
                noback: true,
                showNonCurrentDates: false,
                defaultDate1: moment().years() + 1 + '-01-01',
                defaultDate2: moment().years() + 1 + '-02-01',
                defaultDate3: moment().years() + 1 + '-03-01',
                defaultDate4: moment().years() + '-04-01',
                defaultDate5: moment().years() + '-05-01',
                defaultDate6: moment().years() + '-06-01',
                defaultDate7: moment().years() + '-07-01',
                defaultDate8: moment().years() + '-08-01',
                defaultDate9: moment().years() + '-09-01',
                defaultDate10: moment().years() + '-10-01',
                defaultDate11: moment().years() + '-11-01',
                defaultDate12: moment().years() + '-12-01',

                method: '$(\'#calendar\').fullCalendar(\'prev\')',
                tanchang: false,
                title: 'title.PFANS8007VIEW',
                firstDay: 1,
                loading: false,
                radio1: '',
                day: '',
                Clickday: '',
                List1: [],
                List2: [],
                List3: [],
                List4: [],
                List5: [],
                List6: [],
                year: [],
                yearsModel: null,
                years: [],
                one: 1,
                dada: [],
                header: {
                    left: '',
                    center: 'title',
                    right: ''
                },
                params: {
                    years: '',
                    workingdate: '',
                    type: '',
                },
                calendarPlugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin],
                locale: 'cn'
            }
        },
        mounted() {
            this.getDay();
            this.init()
            this.locale = this.$i18n.locale === 'zh_CN' ? 'ja' : 'ja'
        },
        methods: {
            getDay() {
                this.$store
                    .dispatch('PFANS8007Store/getList', {})
                    .then(response => {
                        this.$store.commit("global/SET_DAYS", response);
                    })
            },
            dayRender: function (info) {
                if (this.$store.getters.days != null) {
                    this.loading = true;
                    let response = this.$store.getters.days
                    for (let c = 0; c < response.length; c++) {
                        if (response[c].type == 1) {
                            if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                                info.el.bgColor = '#df4848'
                            }
                        }
                        if (response[c].type == 2) {
                            if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                                info.el.bgColor = '#999'
                            }
                        }
                        if (response[c].type == 3) {
                            if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                                info.el.bgColor = '#005baa'
                            }
                        }
                        if (response[c].type == 4) {
                            if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                                info.el.bgColor = '#f9e30e'
                            }
                        }
                        if (response[c].type == 5) {
                            if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                                info.el.bgColor = 'magenta'
                            }
                        }
                        if (response[c].type == 6) {
                            if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                                info.el.bgColor = 'green'
                            }
                        }
                    }
                    this.loading = false;
                }

            },
            submitForm(ruleFormNew) {
                if (this.params.type == "") {
                    Message({
                        message: this.$t('label.PFANS8007VIEW_YS'),
                        type: 'error',
                        duration: 5 * 1000
                    })
                } else {
                    this.params.workingdate = moment(this.day).format('YYYY-MM-DD');
                    this.params.years = moment(this.day).format('YYYY');
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS8007Store/deleteUser', {workingdate: this.params.workingdate})
                        .then(response => {
                                this.$store
                                    .dispatch('PFANS8007Store/createNewUser', this.params)
                                    .then(response => {
                                        if (this.params.type == '1') {
                                            this.data.style.backgroundColor = '#df4848'
                                        }
                                        if (this.params.type == '2') {
                                            this.data.style.backgroundColor = '#999'
                                        }
                                        if (this.params.type == '3') {
                                            this.data.style.backgroundColor = '#005baa'
                                        }
                                        if (this.params.type == '4') {
                                            this.data.style.backgroundColor = '#f9e30e'
                                        }
                                        if (this.params.type == '5') {
                                            this.data.style.backgroundColor = 'magenta'
                                        }
                                        if (this.params.type == '6') {
                                            this.data.style.backgroundColor = 'green'
                                        }
                                        Message({
                                            message: this.$t('normal.success_01'),
                                            type: 'success',
                                            duration: 5 * 1000
                                        })
                                        this.loading = false;
                                        this.getDay();
                                    })
                                    .catch(error => {
                                        Message({
                                            message: error,
                                            type: 'error',
                                            duration: 5 * 1000
                                        })
                                        this.loading = false;
                                    })
                                this.tanchang = false
                                this.radio1 = []
                            }
                        )
                }
            }
            ,
            resetForm(ruleFormNew) {
                this.params.workingdate = moment(this.day).format('YYYY-MM-DD');
                this.loading = true;
                this.$store
                    .dispatch('PFANS8007Store/deleteUser', {workingdate: this.params.workingdate})
                    .then(response => {
                        this.getDay();
                        if (this.params.type == '1') {
                            this.data.style.backgroundColor = ' rgb(255, 255, 204)'
                        }
                        if (this.params.type == '2') {
                            this.data.style.backgroundColor = ' rgb(255, 255, 204)'
                        }
                        if (this.params.type == '3') {
                            this.data.style.backgroundColor = ' rgb(255, 255, 204)'
                        }
                        if (this.params.type == '4') {
                            this.data.style.backgroundColor = ' rgb(255, 255, 204)'
                        }
                        if (this.params.type == '5') {
                            this.data.style.backgroundColor = ' rgb(255, 255, 204)'
                        }
                        if (this.params.type == '6') {
                            this.data.style.backgroundColor = ' rgb(255, 255, 204)'
                        }
                        Message({
                            message: this.$t('normal.info_03'),
                            type: 'success',
                            duration: 5 * 1000
                        })
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
                this.tanchang = false
                if (this.Clickday === 6 || this.Clickday === 0) {
                    this.data.style.backgroundColor = '#999'
                } else if (moment(this.day).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
                    this.data.style.backgroundColor = '#fcf8e3'
                } else {
                    this.data.style.backgroundColor = 'rgb(255, 255, 204)'
                }

                this.radio1 = []
            }
            ,
            setClick(type) {
                this.params.type = type
            }
            ,
            handleDateClick: function (info) {
                this.params.type = '';
                this.radio1 = '';
                this.Clickday = info.date.getDay();
                this.day = moment(info.date).format('YYYY-MM-DD')
                this.data = info.dayEl
                this.loading = true
                this.$store
                    .dispatch('PFANS8007Store/getList', {})
                    .then(response => {
                        const data1 = []
                        for (let c = 0; c < response.length; c++) {
                            data1.push({
                                date: response[c].workingdate,
                                type: response[c].type,
                            })
                            this.list1 = data1
                        }
                        for (let a = 0; a < this.list1.length; a++) {
                            if (this.day === moment(this.list1[a].date).format('YYYY-MM-DD')) {
                                if (this.list1[a].type == 1) {
                                    this.radio1 = '1';
                                }
                                if (this.list1[a].type == 2) {
                                    this.radio1 = '2';
                                }
                                if (this.list1[a].type == 3) {
                                    this.radio1 = '3';
                                }
                                if (this.list1[a].type == 4) {
                                    this.radio1 = '4';
                                }
                                if (this.list1[a].type == 5) {
                                    this.radio1 = '5';
                                }
                                if (this.list1[a].type == 6) {
                                    this.radio1 = '6';
                                }
                            }
                        }
                        this.tanchang = true
                    })
                this.loading = false
            }
            ,
            init() {
                var myDate = new Date
                var year = myDate.getFullYear() + 1
                this.initSelectYear(year)
                this.yearsModel = year - 1
                let obj = {year: this.yearsModel}
            }
            ,
            initSelectYear(year) {
                this.years = []
                for (let i = 0; i < 5; i++) {
                    this.years.push({value: (year - i), label: (year - i) + '年'})
                }
            }
            ,
            dateChange() {
                this.year = this.yearsModel
                this.defaultDate1 = this.year + 1 + '-01-01'
                this.defaultDate2 = this.year + 1 + '-02-01'
                this.defaultDate3 = this.year + 1 + '-03-01'
                this.defaultDate4 = this.year + '-04-01'
                this.defaultDate5 = this.year + '-05-01'
                this.defaultDate6 = this.year + '-06-01'
                this.defaultDate7 = this.year + '-07-01'
                this.defaultDate8 = this.year + '-08-01'
                this.defaultDate9 = this.year + '-09-01'
                this.defaultDate10 = this.year + '-10-01'
                this.defaultDate11 = this.year + '-11-01'
                this.defaultDate12 = this.year + '-12-01'
                let calendarApi1 = this.$refs.fullCalendar1.getApi()
                calendarApi1.gotoDate(this.defaultDate4)
                let calendarApi2 = this.$refs.fullCalendar2.getApi()
                calendarApi2.gotoDate(this.defaultDate5)
                let calendarApi3 = this.$refs.fullCalendar3.getApi()
                calendarApi3.gotoDate(this.defaultDate6)
                let calendarApi4 = this.$refs.fullCalendar4.getApi()
                calendarApi4.gotoDate(this.defaultDate7)
                let calendarApi5 = this.$refs.fullCalendar5.getApi()
                calendarApi5.gotoDate(this.defaultDate8)
                let calendarApi6 = this.$refs.fullCalendar6.getApi()
                calendarApi6.gotoDate(this.defaultDate9)
                let calendarApi7 = this.$refs.fullCalendar7.getApi()
                calendarApi7.gotoDate(this.defaultDate10)
                let calendarApi8 = this.$refs.fullCalendar8.getApi()
                calendarApi8.gotoDate(this.defaultDate11)
                let calendarApi9 = this.$refs.fullCalendar9.getApi()
                calendarApi9.gotoDate(this.defaultDate12)
                let calendarApi10 = this.$refs.fullCalendar10.getApi()
                calendarApi10.gotoDate(this.defaultDate1)
                let calendarApi11 = this.$refs.fullCalendar11.getApi()
                calendarApi11.gotoDate(this.defaultDate2)
                let calendarApi12 = this.$refs.fullCalendar12.getApi()
                calendarApi12.gotoDate(this.defaultDate3)
            }
            ,
            getMaxDay(year, month) {
                var new_year = year
                var new_month = month++
                if (month > 12) {
                    new_month -= 12
                    new_year++
                }
                var new_date = new Date(new_year, new_month, 1)
                return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate()
            }
            ,
        }
    }
</script>
<style lang="scss" scoped>
  .fc-unthemed td.fc-sat {
    background: #999;
  }

  .fc-unthemed td.fc-sun {
    background: #999;
  }

  .fc-row.fc-widget-header {
    background-color: rgb(255, 204, 102);
  }

  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 1.5em;
    background-color: rgb(153, 0, 0);
  }

  .fc-scroller > .fc-day-grid, .fc-scroller > .fc-time-grid {
    position: relative;
    width: 100%;
    background-color: rgb(255, 255, 204);
  }

  .fc-dayGrid-view .fc-body .fc-row {
    min-height: 0.5em;
  }

  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0.2em;
    background-color: rgb(153, 0, 0);
  }

  body .fc {
    font-size: 0.3em;
  }

  .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number {
    float: left;
    width: 2.5rem;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: white;
  }

  .fc-toolbar h2 {
    font-size: 1.75em;
    color: white;
    margin: 0;
  }
</style>
