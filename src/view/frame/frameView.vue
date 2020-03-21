<template>
  <div>
    <el-container>
      <el-header class="main_bg_color" style="padding: 0">
        <el-col :span="4">
          <EasyLogo :logo="basselogo" maxheight="4rem" title></EasyLogo>
        </el-col>
        <el-col :span="20">
          <EasyHeader maxheight="4rem">
            <div slot="customize" style="display: table-cell;vertical-align: middle;">
              <el-col :span="24" style="text-align: right;padding-right: 20px">
                <EasyAvatar>
                  <el-dropdown-menu slot="dropdown">
                    <router-link to="/PFANS8001View"><el-dropdown-item icon="el-icon-edit">{{$t('title.PFANS8001VIEW')}}</el-dropdown-item></router-link>
                    <router-link to="/PFANS8002View"><el-dropdown-item icon="el-icon-bell">{{$t('notice.name')}}</el-dropdown-item></router-link>
                    <router-link to="/"><el-dropdown-item icon="el-icon-switch-button">{{$t('logout.name')}}</el-dropdown-item></router-link>
                  </el-dropdown-menu>
                </EasyAvatar>
              </el-col>
            </div>
          </EasyHeader>
        </el-col>
      </el-header>

      <el-container>
        <el-col :span="3" class="main_bg_color">
          <el-aside style="width:auto;height: 100%" class="main_bg_color">
            <EasySider element-loading-spinner="el-icon-loading" siderHeight="6rem"
                       siderWidth="100%" v-loading="menuLoading" class="main_bg_color">
              <!--<EasyAvatar slot="avatar" :mainPage="userPage" :avatarDep="avatarDep"></EasyAvatar>-->
              <vertical
                :activeIndex="vactiveIndex"
                :data="menudata"
                :handleSelect="vhandleSelect"
                slot="content"
              ></vertical>
            </EasySider>
          </el-aside>
        </el-col>
        <el-col :span="21">
          <el-main class="sub_bg_color_grey" style="padding: 1rem;overflow-x: hidden">
            <!--<transition name="el-fade-in">-->
            <router-view/>
            <!--</transition>-->
          </el-main>
        </el-col>
      </el-container>
      <el-aside width="20rem" style="overflow: hidden"   v-show="false">
        <EasyTree
          :defaultlist="data"
          :defaultProps="defaultProps"
          :showFilter="true"
          :showCheckbox="false"
          maxheight="20rem"
          minheight="100%"
          ref="treeCom"
        ></EasyTree>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  /* eslint-disable no-lone-blocks */

  import EasyTree from "@/components/EasyTree";
  import EasyHeader from "@/components/EasyHeader";
  import EasySider from "@/components/EasySider/index";
  import basselogo from "@/assets/png/panasonic_logo.png";
  import pfans from "@/assets/svg/pfans.svg";
  import EasyLogo from "@/components/EasyLogo";
  import EasyNotice from "@/components/EasyNotice";
  import EasyHelp from "@/components/EasyHelp";
  import EasyLogout from "@/components/EasyLogout";
  import horizontal from "@/components/EasyMenu/horizontal.vue";
  import vertical from "@/components/EasyMenu/vertical.vue";
  import EasyAvatar from "@/components/EasyAvatar/iconAvatar.vue";
  import easynormaltable from "@/components/EasyNormalTable/index.vue";
  import moment from "moment";
  import {app, menu} from "@/utils/menu";
  import {Message} from "element-ui";
  import EasyLocale from "@/components/EasyLocale";
  import {getToken, removeToken} from '@/utils/auth'
  import Stomp from "stompjs";

  export default {
    name: "frameView",
    components: {
      EasyTree,
      EasyHeader,
      EasySider,
      EasyLogo,
      horizontal,
      vertical,
      EasyAvatar,
      EasyNotice,
      EasyHelp,
      EasyLogout,
      easynormaltable,
      EasyLocale
    },
    data() {
      return {
        menuLoading: false,
        userPage: "/personalCenter",
        defaultcount: 0, //消息条数
        messageData: null, //消息列表
        responseData: null, //接最原始数据
        selectedlist: [], //多选list
        buttonList: [{key: "update", name: "label.information_done", disabled: false, icon: ""},
          {key: "open", name: "button.open", disabled: false, icon: ""}], //消息功能按钮
        //消息列表字段
        columns: [
          {
            code: "title",
            label: "label.information_title",
            width: 200,
            fix: false,
            filter: false
          },
          {
            code: "content",
            label: "label.information_content",
            width: 250,
            fix: false,
            filter: false
          },
          {
            code: "createon",
            label: "label.information_start",
            width: 150,
            fix: false,
            filter: false
          }
        ],
        data: [],
        defaultProps: {
          label: "title",
          children: "orgs"
        },
        departmentData: {},
        activeIndex: "1",
        activeIndex2: "1",
        basselogo: basselogo,
        pfans: pfans,
        appdata: [],
        menudata: [],
        avatarDep: "",
        hactiveIndex: "",
        vactiveIndex: "",
        row: ""
      };
    },
    methods: {
      //消息列表按钮事件
      buttonClick(val) {
        if (val === "update") {
          if (
            this.$refs.easyNormalTable.selectedList == undefined ||
            this.$refs.easyNormalTable.selectedList.length == 0
          ) {
            this.$message({
              message: this.$t("normal.info_01"),
              type: 'info',
              duration: 2 * 1000
            });
          } else {
            this.$refs.easyNormalTable.loading = true;
            this.selectedlist = this.$refs.easyNormalTable.selectedList;

            for (let j = 0; j < this.selectedlist.length; j++) {
              this.selectedlist[j].status = "1";
            }
            //更新已阅
            this.$store
              .dispatch("frameStore/updateNoticesStatus", this.selectedlist)
              .then(response => {
                this.getMessageData();
                this.$refs.easyNormalTable.$refs.eltable.clearSelection();
                Message({
                  message: this.$t("normal.success_02"),
                  type: 'success',
                  duration: 5 * 1000
                });
                this.$refs.easyNormalTable.loading = false;
              })
              .catch(err => {
                this.$refs.easyNormalTable.loading = false;
                Message({
                  message: err,
                  type: "error",
                  duration: 5 * 1000
                });
              });
          }
        } else if (val === "open") {
          if (!this.row || this.row.noticeid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$refs.notice.dialogVisible = false;
          this.$store.commit("global/SET_WORKFLOWURL", this.row.workflowurl);
          let name = this.row.url.replace("/", "");
          this.$router.push({
            name: name,
            params: {
              _id: this.row.dataid,
              disabled: false
            }
          })
        }
      },
      rowClick(row) {
        this.row = row;
      },
      //获取消息列表信息
      getMessageData() {
        this.$store
          .dispatch("frameStore/getMessage", {status: "0"})
          .then(response => {
            this.responseData = Object.assign({}, response);
            if (response && response.length > 0) {
              this.messageData = response;
              //只显示未阅的数据
              let Olist = this.messageData.filter(Oitem => Oitem.status === "0");
              this.messageData = Olist;
              this.defaultcount = this.messageData.length;
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
      //获取个人信息
      InitUser() {
        this.$store
          .dispatch("personalCenterStore/getPersonalCenter")
          .then(response => {
            this.custominfo = response.customerInfo;
            if (response.customerInfo) {
              this.$store.commit(
                "global/SET_USERINFO",
                response.customerInfo
              );
            }

            let roles = response.userAccount.roles; //系统角色
            let rolename = "";
            if (roles && roles.length > 0) {
              roles.map(item => {
                rolename = rolename + item.rolename + ",";
              });
              if (rolename.endsWith(",")) {
                rolename = rolename.substring(0, rolename.length - 2);
              }
            }
            this.avatarDep = rolename;
          })
          .catch(err => {
            Message({
              message: err,
              type: "error",
              duration: 5 * 1000
            });
          });
      },
      //格式化列表字段
      formatter(row, column) {
        //标题
        if (column.property === "title") {
          return row.title;
        }
        //内容
        if (column.property === "content") {
          return row.content;
        }
        // 创建时间
        if (column.property === "createon") {
          return moment(new Date(row.createon)).format("YYYY-MM-DD HH:mm:ss");
        }
      },
      openNew(row) {
      },
      getAppData() {
        this.$store
          .dispatch("frameStore/getAppData")
          .then(response => {
            this.appdata = menu().filter(
              item => response.appids.indexOf(item._id) > -1
            );
            if (this.appdata && this.appdata.length > 0) {
              this.hactiveIndex = "0";
            }
          })
          .catch(err => {
            this.appdata = [];
          });
      },
      handleSelect(appid) {
        this.menuLoading = true;
        let tempdata = [];
        let menus = menu().filter(item => item._id === appid)[0].menus;
        this.$store
          .dispatch("frameStore/getAppData")
          .then(response => {
            menus.map(menu => {
              if (response.menuids.indexOf(menu._id) > -1) {
                let temp = Object.assign({}, menu);
                this.$set(temp, "children", []);
                for(let index1 = 0 ;index1<menu.children.length;index1++){
                  if (response.menuids.indexOf(menu.children[index1]._id) > -1) {
                    if(menu.children[index1].children.length > 0){
                      temp.children.push([]);
                      Object.assign(temp.children[temp.children.length - 1], menu.children[index1])
                      this.$set(temp.children[temp.children.length - 1], "children", []);
                      for(let index2 = 0 ;index2<menu.children[index1].children.length;index2++){
                        if (response.menuids.indexOf(menu.children[index1].children[index2]._id) > -1) {
                          if(menu.children[index1].children[index2].children.length > 0){
                            temp.children[temp.children.length - 1].children.push([]);
                            Object.assign(temp.children[temp.children.length - 1].children[temp.children[temp.children.length - 1].children.length - 1], menu.children[index1].children[index2])
                            this.$set(temp.children[temp.children.length - 1].children[temp.children[temp.children.length - 1].children.length - 1], "children", []);
                            for(let index3 = 0 ;index3<menu.children[index1].children[index2].children.length;index3++){
                              if (response.menuids.indexOf(menu.children[index1].children[index2].children[index3]._id) > -1) {
                                temp.children[temp.children.length - 1].children[temp.children[temp.children.length - 1].children.length - 1].children.push(menu.children[index1].children[index2].children[index3]);
                              }
                            }
                          }else{
                            temp.children[temp.children.length - 1].children.push(menu.children[index1].children[index2]);
                          }
                        }
                      }
                    }else{
                      temp.children.push(menu.children[index1]);
                    }
                  }
                }
                tempdata.push(temp);
              }
            });
            this.menudata = tempdata;
            if (this.menudata && this.menudata.length > 0) {
              if(this.menudata[0].children.length > 0){
                if(this.menudata[0].children[0].children.length > 0){
                  this.vactiveIndex = this.menudata[0].children[0].children[0].menuurl;
                }else{
                  this.vactiveIndex = this.menudata[0].children[0].menuurl;
                }
              }else{
                this.vactiveIndex = this.menudata[0].menuurl;
              }

              this.$store.commit("global/SET_CURRENTURL", this.vactiveIndex);
            }

            this.menuLoading = false;
          })
          .catch(err => {
            this.menudata = [];
            this.menuLoading = false;
          });
      },
      vhandleSelect(appid) {
        this.$store.commit("global/SET_CURRENTURL", appid);
        this.$store.commit("global/SET_WORKFLOWURL", appid);
      },
      //连接websocket--获取重复登录
      loginconnect() {
        this.loginclient = Stomp.client(process.env.WS_API + "endpointLogin/websocket");
        let token = getToken();
        this.loginclient.connect({login: token}, this.loginConnected, this.loginonFailed);
      },
      //连接成功进行订阅
      loginConnected(loginframe) {
        let topic = "/topicLogin/subscribe";
        this.loginclient.subscribe(topic, this.loginCallback, this.loginonFailed);
      },
      loginonFailed(loginframe) {
        console.log("Failed---: " + loginframe);
        this.loginconnect();
      },
      //断开连接
      disconnect() {
        this.loginclient.disconnect(function () {
        });
        this.client.disconnect(function () {
        });
      },
      //连接成功回掉函数
      loginCallback(loginframe) {
        console.log("Connected: " + loginframe);
        if (loginframe.body === getToken()) {
          this.disconnect();
          this.$alert(this.$t('normal.info_07'), '', {
            confirmButtonText: this.$t('button.confirm'),
            showClose: false,
            callback: action => {
              removeToken();
              this.$router.push('/');
            }
          });
        }
      },
      //连接websocket--获取消息列表
      messageconnect() {
        this.client = Stomp.client(process.env.WS_API + "endpointMessage/websocket");
        let token = getToken();
        this.client.connect({login: token}, this.onConnected, this.onFailed);
      },
      //连接成功进行订阅
      onConnected(frame) {
        console.log("Connected: " + frame);
        let topic = "/user/topicMessage/subscribe";
        this.client.subscribe(topic, this.responseCallback, this.onFailed);
      },
      onFailed(frame) {
        this.messageconnect();
        console.log("Failed: " + frame);
      },
      //连接成功回掉函数
      responseCallback(frame) {
        if (JSON.parse(frame.body).length > this.messageData.length) {
          //只显示未阅的数据
          Message({
            message: this.$t('normal.info_08'),
            type: "info",
            duration: 5 * 1000
          });
        }
        this.messageData = JSON.parse(frame.body);
        let Olist = this.messageData.filter(Oitem => Oitem.status === "0");
        this.messageData = Olist;
        this.defaultcount = this.messageData.length;
      },
      getUserList() {
        let params = {
          orgtype: "1"
        };
        this.$store.dispatch('usersStore/getUserTableList', params).then(response => {
          this.$store.commit("global/SET_USERLIST", response);
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
        })
      },
      getOrgList() {
        this.$store
          .dispatch('orgTreeStore/getOrgTree')
          .then(response => {
            if (response) {
              this.$store.commit("global/SET_ORGLIST", [response]);
              this.data = [response];
              this.departmentData = {};
              this.buildDepartmentData(this.data);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
          })
      },
      getDictionaryList() {
        this.$store
          .dispatch('dictionaryStore/getAll')
          .then(response => {
            if (response) {
              this.$store.commit("global/SET_DICTIONARYLIST", response);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
          })
      },
      getDay() {
        this.$store
          .dispatch('PFANS8007Store/getList', {})
          .then(response => {
            this.$store.commit("global/SET_DAYS", response);
          })
      },
      getFileToken() {
        this.$store
          .dispatch('dictionaryStore/getFileToken', {})
          .then(response => {
            this.$store.commit("global/SET_FILETOKEN", response.data);
            console.log(response.data)
          })
      },
      //协力人员
      getCooperinterviewList() {
          this.$store.dispatch('PFANS6004Store/getWithoutAuth').then(response => {
              this.$store.commit("global/SET_COOPERINTERVIEWLIST", response);
          }).catch(err => {
              Message({
                  message: err,
                  type: 'error',
                  duration: 5 * 1000
              })
          })
      },
      //获取供应商列表
      getSupplierinfor() {
        this.$store.dispatch('PFANS1038Store/getExternal').then(response => {
          this.$store.commit("global/SET_SUPPLIERINFOR", response);
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
        })
      },
      buildDepartmentData(data) {
        for (var i in data) {
          this.departmentData[data[i]._id] = data[i].title;
          if (data[i].hasOwnProperty("orgs")) {
            this.buildDepartmentData(data[i].orgs);
          }
        }
      },
    },
    mounted() {
      this.handleSelect("homePage");
      //获取消息
      this.getMessageData();
      //获取个人信息
      this.InitUser();

      this.getUserList();
      this.getOrgList();
      this.$store.commit("usersStore/SET_ORGS",this.$refs.treeCom.$refs.treeCom);
      this.getDictionaryList();
      this.getDay();
      this.getFileToken();
      this.getCooperinterviewList();
      this.getSupplierinfor();
    },
    created() {
      this.messageconnect();
      this.loginconnect();
    },
    watch: {
      appdata(val) {
        if (val && val[0]) {
          this.handleSelect(val[0]._id);
        } else {
          this.menudata = [];
        }
      }
    }
  };
</script>

<style>
  /*.appView {*/
    /*position: relative;*/
    /*width:100%;*/
    /*transition: transform 0.7s ease-out;*/
  /*}*/
  /*.slide-left-enter-active{*/
       /*transform: translate(102%, 0%);*/
     /*}*/
  /*.slide-left-leave-active{*/
    /*transform: translate(-100%, 0%);*/
  /*}*/
</style>
