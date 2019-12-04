<template>
  <div style="background-color: white">
    <el-row>
      <el-col :span="12">
        <el-row>
        <div>
          <div style="  border: 0.1rem solid #e0e0e0;
cursor: pointer;
width: 50%;
height: 6rem;
" @click="clickDSP">
            <img style="height: 2rem">
            <div style="width: 16rem;
margin-left: 5rem;
margin-top: 1rem;
text-overflow: ellipsis;
overflow: hidden;
float: left;
padding: 1rem 0rem;
height: 5rem;
line-height: 1.8rem" @click="clickDSP">{{$t('label.INDEX_NY')}}
              <span style="font-size:5rem;color: #fb6e52">{{this.DSPSX}}</span>
              {{$t('label.INDEX_DSPSX')}}
            </div>
          </div>
        </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span style="padding: 0 0 0 1rem;color: #5d9cec;">{{$t('label.INDEX_GSDT')}}</span>
          </el-col>
          <el-col :span="12">
            <el-link style="margin-left: 73%;color: #5d9cec" target="_blank" :underline="false"
                     @click="Clickckgd" type="primary">
              <span>{{$t('label.INDEX_CKGD')}}</span>
            </el-link>
          </el-col>
        </el-row>
        <el-tabs
          style="padding: 0 1rem 0 1rem"
          v-model="activeName"
        >
          <el-tab-pane :disabled=true></el-tab-pane>
          <el-tab-pane :disabled=true></el-tab-pane>
          <el-tab-pane :disabled=true></el-tab-pane>
          <el-tab-pane :disabled=true></el-tab-pane>
          <el-tab-pane name="first">
            <div class="DataListStyle">
              <el-table
                :data="DataList2"
                @row-click="rowclickDataList2"
              >
                <el-table-column
                  prop="title"
                  width="540%">
                </el-table-column>
                <el-table-column
                  prop="creaton"
                  width="130%"
                >
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-col>
      <el-col :span="12">

        <span style="width:80%;margin-top:4rem;font-size:1.8rem">{{$t('label.INDEX_RLRC')}}</span>
        <div id='three_dot_view'>
          <label class="gray_line"></label>
        </div>
        <div style="margin-top: 3rem;margin-left: 5rem">
          <el-row>
            <el-col :span="22">
          <full-calendar :first-day="firstDay" :header='header'
                         :locale='locale' :plugins="calendarPlugins"
                         @dateClick="handleDateClick"
                         defaultView="dayGridMonth"
          />
            </el-col>
          </el-row>
        </div>

      </el-col>
    </el-row>
    <el-row style="padding-top: 0.5rem;border-top: 0.5rem solid #f7f8fd;">
      <span style="padding: 0 0 0 1rem;color: #5d9cec">{{$t('label.INDEX_KJFW')}}</span>
      <el-tabs
        style="padding: 0 1rem 0 1rem"
        v-model="activeName"
      >
        <el-tab-pane :disabled=true></el-tab-pane>
        <el-tab-pane :disabled=true></el-tab-pane>
        <el-tab-pane :disabled=true></el-tab-pane>
        <el-tab-pane :disabled=true></el-tab-pane>
        <el-tab-pane name="first">
          <el-row>
            <el-col :span="3">
              <div>
                <div style="
 background-color: #CD96CD;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="GRZX">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>
                </div>
                <div style="margin-top:1rem;margin-left: 1.3rem">
                  <span>{{$t('label.INDEX_GRZX')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
background-color: #5d9cec;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="SJFX">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 1.3rem">
                  <span>{{$t('label.INDEX_SJFX')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
background-color: #4e86f8;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="SZ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 2.1rem">
                  <span>{{$t('label.INDEX_SZ')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
background-color: #9E9E9E;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="GD">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 2.1rem">
                  <span>{{$t('label.INDEX_GD')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
 background-color: #CD96CD;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="GRZX">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>
                </div>
                <div style="margin-top:1rem;margin-left: 1.3rem">
                  <span>{{$t('label.INDEX_GRZX')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
background-color: #5d9cec;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="SJFX">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 1.3rem">
                  <span>{{$t('label.INDEX_SJFX')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
background-color: #4e86f8;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="SZ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 2.1rem">
                  <span>{{$t('label.INDEX_SZ')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div style="
background-color: #9E9E9E;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; " @click="GD">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 2.1rem">
                  <span>{{$t('label.INDEX_GD')}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import moment from 'moment'
    import EasyNumBar from "@/components/EasyNumBar";
    import {Message} from 'element-ui'

    export default {
        name: "indexView",
        data() {
            return {
                _id: '',
                DSPSX: '',
                YSPSX: '',
                YBHSX: '',
                availablestate: '',
                DataList2: [{}],
                calendarPlugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin],
                locale: 'cn',
                listQuery: {
                    page: 1,
                    limit: 10
                },
                header: {
                    right: 'prev,next today',
                    center: 'title',
                    left: 'month,agendaWeek,agendaDay'
                },
                firstDay: 1,
                showNonCurrentDates: false,
                activeName: "first",
            };
        },
        components: {
            FullCalendar,
            EasyNumBar
        },
        methods: {
            clickDSP() {
                this.$router.push({
                    name: 'PFANS8002View',
                });
            },
            Clickckgd() {
                this.$router.push({
                    name: 'PFANS8008',
                    params: {
                        availablestate: '0',
                    }
                });

            },
            GRZX() {
                this.$router.push({
                    name: 'PFANS4001View',
                });
            },
            SJFX() {
                this.$router.push({
                    name: '',
                });
            },
            SZ() {
                this.$router.push({
                    name: '',
                });
            },
            GD() {
                this.$router.push({
                    name: '',
                });
            },
            rowclickDataList2(row, event, column) {
                this._id = row.informationid;
                this.$router.push({
                    name: 'PFANS8003View',
                    params: {
                        _id: this._id,
                        readonly: 1
                    }
                });
            },
            handleDateClick: function (info) {
                this.day = moment(info.date).format('YYYY-MM-DD')
                this._id = row.informationid;
                this.$router.push({
                    name: 'PFANS5008FormView',
                    params: {
                        date: this.day,
                        disabled: true
                    }
                });
            },
            getGSDT() {
                this.$store.dispatch("PFANS8008Store/getInformation").then(response => {
                    let data = [];
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].creaton !== null && response[j].creaton !== "") {
                            response[j].creaton = moment(response[j].creaton).format("YYYY-MM-DD");
                        }
                        let obj = {};
                        obj.title = response[j].title;
                        obj.url = response[j].url
                        obj.creaton = response[j].creaton
                        obj.informationid = response[j].informationid
                        obj.availablestate = response[j].availablestate
                        data[j] = obj;
                    }
                    this.DataList2 = data.slice(0, 7);
                }).catch(err => {
                    Message({
                        message: err,
                        type: 'error',
                        duration: 5 * 1000
                    })
                });
            },
            getMessageData() {
                this.$store
                    .dispatch('indexStore/get', {})
                    .then(response => {
                        let sum = 0;
                        for (let i = 0; i < response.length; i++) {
                            if (response[i].status === '0') {
                                sum = sum + 1
                                this.DSPSX = sum;
                            }
                        }
                    })
                    .catch(err => {
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },
        },
        mounted() {
            this.$store.commit('global/SET_HISTORYURL', this.$route.path)
            this.getMessageData();
            this.getGSDT();
        }
    };
</script>
<style lang="scss">
  .DataListStyle {
    .el-table thead {
      color: #909399;
      font-weight: 500;
      display: none;
    }
  }

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

  .fc-toolbar h2 {
    font-size: 1.75em;
    color: white;
    margin: 0;
  }

</style>

