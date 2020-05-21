<template>
  <div style="height: calc(100vh - 60px - 2rem)">
    <el-row>
      <el-col :span="12" style="padding: 5px">
        <el-row style="height: 120px;max-height: 120px">
          <el-card class="box-card" shadow="hover">
            <div
              @click="clickDSP"
              style="width: 100%;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              float: left;
              padding: 1rem 0rem;
              cursor: pointer;
              line-height: 1.8rem"
            >
              {{$t('label.INDEX_NY')}}
              <span style="font-size:4.5rem;color: #fb6e52">{{this.DSPSX}}</span>
              {{$t('label.INDEX_DSPSX')}}
            </div>
          </el-card>
        </el-row>
        <el-row style="padding-top: 2px;height: 290px;max-height: 290px">
          <el-card class="box-card" shadow="hover">
            <el-row>
              <el-col :span="12">
                <span
                  style="float:left;color: #5d9cec;font-size: 0.85rem;margin-left: 3%"
                >{{$t('label.INDEX_GSDT')}}</span>
              </el-col>
              <el-col :span="12">
                <el-link
                  :underline="false"
                  @click="Clickckgd"
                  style="margin-left: 75%;color: #5d9cec"
                  target="_blank"
                  type="primary"
                >
                  <span style="font-size: 0.85rem">{{$t('label.INDEX_CKGD')}}</span>
                </el-link>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row style="height:185px;max-height: 185px;overflow: hidden">
              <el-table :show-header="false" :data="DataList2" @row-click="rowclickDataList2">
                <el-table-column prop="title" width="500"></el-table-column>
                <el-table-column prop="creaton" width="95"></el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12" style="padding: 5px">
        <el-row>
          <el-col>
            <el-link
              :underline="false"
              @click="clickrilicheck"
              style="margin-left: 75%;color: #5d9cec"
              target="_blank"
              type="primary"
            >
              <span style="font-size: 0.85rem">{{$t('label.INDEX_RILICHECK')}}</span>
            </el-link>
          </el-col>
        </el-row>
        <el-row style="height: 400px;max-height: 400px">
          <full-calendar
            :dayRender="dayRender"
            :first-day="firstDay"
            :header="header"
            :locale="locale"
            :plugins="calendarPlugins"
            @dateClick="handleDateClick"
            defaultView="dayGridMonth"
            height="parent"
          />
        </el-row>
      </el-col>
    </el-row>
    <el-row v-show="Object.keys(userinfo).length > 0">
      <!--<el-row v-show="false">-->
      <el-col :span="24" style="padding: 5px">
        <el-card class="box-card" shadow="hover">
          <span
            style="padding: 0 0 0 1rem;color: #5d9cec;font-size: 0.85rem"
          >{{$t('label.INDEX_KJFW')}}</span>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png1" style="width: 50%" @click="submitForm(1)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS5008VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png2" style="width: 50%" @click="submitForm(2)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS2006VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png3" style="width: 50%" @click="submitForm(3)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS2017VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png4" style="width: 50%" @click="submitForm(4)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS4001VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png5" style="width: 50%" @click="submitForm(5)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS2010VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png6" style="width: 50%" @click="submitForm(6)">
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS2016VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png7" style="width: 50%" @click="submitForm(7)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS2023VIEW')}}</span>
              </el-row>
            </el-col>
            <el-col :span="3" style="cursor: pointer">
              <el-row style="text-align: center">
                <img :src="png8" style="width: 50%" @click="submitForm(8)"/>
              </el-row>
              <el-row style="text-align: center">
                <span style="font-size: 0.85rem">{{$t('title.PFANS2022VIEW')}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--    add-ws-5/21-No.46-首页颜色区分-->
    <el-dialog :visible.sync="checkriqi" width="50%">
      <div style="margin-top: 1rem;margin-left: 4rem">
        <el-row>
          <el-col :span="8">
            <el-tag effect="dark" type="danger" style="width: 7rem">{{$t('label.PFANS8007VIEW_FD')}}</el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag effect="dark" type="info" style="width: 7rem">{{$t('label.PFANS8007VIEW_GX')}}</el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag effect="dark" style="width: 7rem">{{$t('label.PFANS8007VIEW_ZT')}}</el-tag>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 1rem;margin-left: 4rem">
        <el-row>
          <el-col :span="8">
            <el-tag effect="dark" type="warning" style="width: 7rem;">{{$t('label.PFANS8007VIEW_ZTC')}}</el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag effect="dark" style="width: 7rem;background-color:magenta;border-color:magenta ">
              {{$t('label.PFANS8007VIEW_HS')}}
            </el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag effect="dark" style="width: 7rem;background-color: green;border-color:green">
              {{$t('label.PFANS8007VIEW_YQ')}}
            </el-tag>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 1rem;margin-left: 14.5rem">
        <el-button @click="checklist" type="primary">
          {{$t('button.index')}}
        </el-button>
      </div>
    </el-dialog>
    <!--    add-ws-5/21-No.46-首页颜色区分-->
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
  import png1 from '@/assets/png/日志.png';
  import png2 from '@/assets/png/工资日志.png';
  import png3 from '@/assets/png/打卡记录.png';
  import png4 from '@/assets/png/印章申请.png';
  import png5 from '@/assets/png/立项申请.png';
  import png6 from '@/assets/png/不定时人员考勤.png';
  import png7 from '@/assets/png/目标管理.png';
  import png8 from '@/assets/png/礼金申请.png';

  export default {
    name: 'indexView',
    data() {
      return {
        checkriqi: false,
        userinfo: {},
        png1: png1,
        png2: png2,
        png3: png3,
        png4: png4,
        png5: png5,
        png6: png6,
        png7: png7,
        png8: png8,
        _id: '',
        DSPSX: '0',
        YSPSX: '',
        YBHSX: '',
        availablestate: '',
        DataList2: [{}],
        calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
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
      //add-ws-5/21-No.46-首页颜色区分
      clickrilicheck() {
        this.checkriqi = true;
      },
      checklist() {
        this.checkriqi = false;
      },
      //add-ws-5/21-No.46-首页颜色区分
      //ADD-WS-修改首页日历节假日颜色
      getDay() {
        this.$store
          .dispatch('PFANS8007Store/getList', {})
          .then(response => {
            this.$store.commit('global/SET_DAYS', response);
          });
      },
      dayRender: function(info) {
        // add-ws-工作日设置周末为其他休假颜色覆盖问题修改
        if (info.date.getDay() === 6 || info.date.getDay() === 0) {
          info.el.bgColor = '#999';
        }
        // add-ws-工作日设置周末为其他休假颜色覆盖问题修改
        if (this.$store.getters.days != null) {
          this.loading = true;
          let response = this.$store.getters.days;
          for (let c = 0; c < response.length; c++) {
            if (response[c].type == 1) {
              if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                info.el.bgColor = '#df4848';
              }
            }
            if (response[c].type == 2) {
              if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                info.el.bgColor = '#999';
              }
            }
            if (response[c].type == 3) {
              if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                info.el.bgColor = '#005baa';
              }
            }
            if (response[c].type == 4) {
              if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                info.el.bgColor = '#f9e30e';
              }
            }
            if (response[c].type == 5) {
              if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                info.el.bgColor = 'magenta';
              }
            }
            if (response[c].type == 6) {
              if (moment(response[c].workingdate).format('YYYY-MM-DD') === moment(info.date).format('YYYY-MM-DD')) {
                info.el.bgColor = 'green';
              }
            }
          }
          this.loading = false;
        }
      },
      //ADD-WS-修改首页日历节假日颜色
      submitForm(val) {
        let url = '';
        if (val === 1) {
          url = 'PFANS5008View';
        }
        if (val === 2) {
          url = 'PFANS2028View';
        }
        if (val === 3) {
          url = 'PFANS2017View';
        }
        if (val === 4) {
          url = 'PFANS4001View';
        }
        if (val === 5) {
          url = 'PFANS2010View';
        }
        if (val === 6) {
          url = 'PFANS2016View';
        }
        if (val === 7) {
          url = 'PFANS2023View';
        }
        if (val === 8) {
          url = 'PFANS2022View';
        }
        this.$store.commit('global/SET_CURRENTURL', '/' + url);
        this.$store.commit('global/SET_WORKFLOWURL', '/' + url);
        this.$router.push({
          name: url,
        });
        this.$emit('changeMenu');
      },
      clickDSP() {
        // if(this.DSPSX==='0'){
        //   this.$router.push({
        //     name: 'index',
        //   });
        // }else if(this.DSPSX!='0'){
        this.$router.push({
          name: 'PFANS8002View',
        });
        this.$emit('changeMenu');
        // }
      },
      Clickckgd() {
        this.$router.push({
          name: 'PFANS8003View',
        });
        this.$emit('changeMenu');
      },
      rowclickDataList2(row, event, column) {
        this._id = row.informationid;
        this.$store.commit('global/SET_WORKFLOWURL', '/PFANS8003View');
        this.$router.push({
          name: 'PFANS8003FormView',
          params: {
            _id: this._id,
            readonly: 1,
          },
        });
        this.$emit('changeMenu');
      },
      handleDateClick: function(info) {
        this.day = moment(info.date).format('YYYY-MM-DD');
        this.$router.push({
          name: 'PFANS5008FormView',
          params: {
            date: this.day,
            disabled: true,
          },
        });
        this.$emit('changeMenu');
      },
      getGSDT() {
        this.$store
          .dispatch('PFANS8008Store/getInformation')
          .then(response => {
            let data = [];
            for (let j = 0; j < response.length; j++) {
              if (response[j].availablestate === '0') {
                if (response[j].createon !== null && response[j].createon !== '') {
                  response[j].createon = moment(response[j].createon).format(
                    'YYYY-MM-DD',
                  );
                }
                let obj = {};
                obj.title = response[j].title;
                obj.url = response[j].url;
                obj.creaton = response[j].createon;
                obj.informationid = response[j].informationid;
                obj.availablestate = response[j].availablestate;
                data[j] = obj;
              }
            }
            this.DataList2 = data.slice(0, 5);
          })
          .catch(err => {
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
      //获取个人信息
      InitUser() {
        this.$store
          .dispatch('personalCenterStore/getPersonalCenter')
          .then(response => {
            this.custominfo = response.customerInfo;
            if (response.customerInfo) {
              this.userinfo = response.customerInfo;
              this.$store.commit('global/SET_USERINFO', response.customerInfo);
              this.$emit('showPersonCenter');
            } else {
              this.$store.commit('global/SET_USERINFO', {});
              this.$emit('showPersonCenter');
            }

            if (response.userAccount) {
              this.$store.commit('global/SET_USERACCOUNT', response.userAccount);
            }
            let roles = response.userAccount.roles; //系统角色
            let rolename = '';
            if (roles && roles.length > 0) {
              roles.map(item => {
                rolename = rolename + item.rolename + ',';
              });
              if (rolename.endsWith(',')) {
                rolename = rolename.substring(0, rolename.length - 2);
              }
            }
            this.avatarDep = rolename;
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
      //获取个人信息
      this.InitUser();
      //ADD-WS-修改首页日历节假日颜色
      this.getDay();
      //ADD-WS-修改首页日历节假日颜色
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      this.getMessageData();
      this.getGSDT();
    },
  };
</script>
<style lang="scss">


  .fc-row.fc-widget-header {
    /*background-color: rgb(255, 204, 102);*/
    background-color: #005baa;
    font-size: 0.4em;
    color: white;
  }

  .fc-toolbar.fc-header-toolbar {
    /*margin-bottom: 1.5em;*/
    /*background-color: rgb(153, 0, 0);*/
    font-size: 0.4em;
    background-color: #005baa;
  }

  .fc-scroller > .fc-day-grid,
  .fc-scroller > .fc-time-grid {
    position: relative;
    width: 100%;
    /*background-color: rgb(255, 255, 204);*/
    background-color: white;
  }

  .fc-dayGrid-view .fc-body .fc-row {
    min-height: 0.5em !important;
  }

  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0em !important;
    /*background-color: rgb(153, 0, 0);*/
    background-color: #005baa;
  }

  body .fc {
    font-size: 0.3em;
  }

  .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number {
    float: left !important;
    width: 2.5rem;
    font-size: 0.6em;
  }

  .fc-toolbar h2 {
    font-size: 1.75em;
    color: white;
    margin: 0;
  }

  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 12px !important;
    margin-right: 0px !important;
    margin-bottom: 12px !important;
    margin-left: 0px !important;
  }

  //ADD-WS-修改工作日设置日历当天颜色
  .fc-unthemed td.fc-today {
    background: cornsilk;
  }

  //ADD-WS-修改工作日设置日历当天颜色
</style>

