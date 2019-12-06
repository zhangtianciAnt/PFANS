<template>
  <div>
    <el-row>
      <el-col :span="12" style="padding: 5px">
        <el-row style="height: 120px;max-height: 120px">
          <el-card class="box-card" shadow="hover">
            <div @click="clickDSP" style="width: 100%;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              float: left;
              padding: 1rem 0rem;
              cursor: pointer;
              line-height: 1.8rem">{{$t('label.INDEX_NY')}}
              <span style="font-size:5rem;color: #fb6e52">{{this.DSPSX}}</span>
              {{$t('label.INDEX_DSPSX')}}
            </div>
          </el-card>
        </el-row>
        <el-row style="padding-top: 5px;height: 380px;max-height: 380px">
          <el-card class="box-card" shadow="hover">
            <el-row>
              <el-col :span="12">
                <span style="float:left;color: #5d9cec;">{{$t('label.INDEX_GSDT')}}</span>
              </el-col>
              <el-col :span="12">
                <el-link :underline="false" @click="Clickckgd" style="margin-left: 73%;color: #5d9cec"
                         target="_blank" type="primary">
                  <span>{{$t('label.INDEX_CKGD')}}</span>
                </el-link>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row style="height:260px;max-height: 260px;overflow: hidden">
              <div class="DataListStyle">
                <el-table
                  :data="DataList2" @row-click="rowclickDataList2">
                  <el-table-column
                    prop="title"
                    width="370">
                  </el-table-column>
                  <el-table-column
                    prop="creaton"
                    width="220">
                  </el-table-column>
                </el-table>
              </div>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12" style="padding: 5px">
        <el-row style="height: 498px;max-height: 498px">
          <full-calendar :first-day="firstDay" :header='header'
                         :locale='locale' :plugins="calendarPlugins"
                         @dateClick="handleDateClick" defaultView="dayGridMonth"
                         height="parent"/>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding: 5px">
        <el-card class="box-card" shadow="hover">
          <span style="padding: 0 0 0 1rem;color: #5d9cec">{{$t('label.INDEX_KJFW')}}</span>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="3">
              <div>
                <div @click="submitForm(1)" style="
 background-color: #CD96CD;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>
                </div>
                <div style="margin-top:1rem;margin-left: 2.1rem">
                  <span>{{$t('title.PFANS5008VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(2)" style="
background-color: #5d9cec;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 0.5rem">
                  <span>{{$t('title.PFANS2005VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(3)" style="
background-color: #4e86f8;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 1.2rem">
                  <span>{{$t('title.PFANS2017VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(4)" style="
background-color: #9E9E9E;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 1.2rem">
                  <span>{{$t('title.PFANS4001VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(5)" style="
background-color: green;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>
                </div>
                <div style="margin-top:1rem;margin-left: 1.2rem">
                  <span>{{$t('title.PFANS5001VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(6)" style="
background-color: #8a6d3b;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem">
                  <span>{{$t('title.PFANS2020VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(7)" style="
background-color: red;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>
                </div>
                <div style="margin-top:1rem;margin-left: 1.2rem">
                  <span>{{$t('title.PFANS2023VIEW')}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div @click="submitForm(8)" style="
background-color: yellow;
          width: 6.8rem;
          height: 6.8rem;
          border-radius: 5rem; ">
                  <img style="height: 2rem">
                  <div style="    float: right;
color: red;
padding: 0 0.8rem;">&nbsp;
                  </div>

                </div>
                <div style="margin-top:1rem;margin-left: 0.7rem">
                  <span>{{$t('title.PFANS2022VIEW')}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import FullCalendar from '@fullcalendar/vue';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import moment from 'moment';
  import EasyNumBar from '@/components/EasyNumBar';
  import {Message} from 'element-ui';

  export default {
    name: 'indexView',
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
          limit: 10,
        },
        header: {
          right: 'prev,next today',
          center: 'title',
          left: 'month,agendaWeek,agendaDay',
        },
        firstDay: 1,
        showNonCurrentDates: false,
        activeName: 'first',
      };
    },
    components: {
      FullCalendar,
      EasyNumBar,
    },
    methods: {
      submitForm(val) {
        if (val === 1) {
          this.$router.push({
            name: 'PFANS5008View',
          });
        }
        if (val === 2) {
          this.$router.push({
            name: 'PFANS2005View',
          });
        }
        if (val === 3) {
          this.$router.push({
            name: 'PFANS2017View',
          });
        }
        if (val === 4) {
          this.$router.push({
            name: 'PFANS4001View',
          });
        }
        if (val === 5) {
          this.$router.push({
            name: 'PFANS5001View',
          });
        }
        if (val === 6) {
          this.$router.push({
            name: 'PFANS2020View',
          });
        }
        if (val === 7) {
          this.$router.push({
            name: 'PFANS2023View',
          });
        }
        if (val === 8) {
          this.$router.push({
            name: 'PFANS2022View',
          });
        }
      },
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
          },
        });

      },
      rowclickDataList2(row, event, column) {
        this._id = row.informationid;
        this.$router.push({
          name: 'PFANS8003View',
          params: {
            _id: this._id,
            readonly: 1,
          },
        });
      },
      handleDateClick: function (info) {
        this.day = moment(info.date).format('YYYY-MM-DD');
        this.$router.push({
          name: 'PFANS5008FormView',
          params: {
            date: this.day,
            disabled: true,
          },
        });
      },
      getGSDT() {
        this.$store.dispatch('PFANS8008Store/getInformation').then(response => {
          let data = [];
          for (let j = 0; j < response.length; j++) {
            if (response[j].creaton !== null && response[j].creaton !== '') {
              response[j].creaton = moment(response[j].creaton).format('YYYY-MM-DD');
            }
            let obj = {};
            obj.title = response[j].title;
            obj.url = response[j].url;
            obj.creaton = response[j].creaton;
            obj.informationid = response[j].informationid;
            obj.availablestate = response[j].availablestate;
            data[j] = obj;
          }
          this.DataList2 = data.slice(0, 5);
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
      },
      getMessageData() {
        this.$store
          .dispatch('indexStore/get', {})
          .then(response => {
            let sum = 0;
            for (let i = 0; i < response.length; i++) {
              if (response[i].status === '0') {
                sum = sum + 1;
                this.DSPSX = sum;
              }
            }
          })
          .catch(err => {
            Message({
              message: err,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
    },
    mounted() {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      this.getMessageData();
      this.getGSDT();
    },
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

