<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">

            <el-tab-pane :label="$t('label.PFANS5004VIEW_CLOSEAPPLICAT')" name="first"  >
              <div>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span  class="collapse_Title">{{$t('label.PFANS5004VIEW_CLOSEAPPLICAT')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')" >
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.projectnamw"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')">
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.projecttype"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNUMBER')">
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.projectnumber"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_CONFIDENTIAL')" >
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.secret"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_MANAGERID')" >
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.mananger"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_DATETIME')" >
                          <el-date-picker unlink-panels
                                          v-model="datetime"
                                          type="daterange"
                                          :end-placeholder="$t('label.enddate')"
                                          :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                          :start-placeholder="$t('label.startdate')"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span  class="collapse_Title">{{$t('label.PFANS5004VIEW_RESULT')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_PREDICTDATE')" >
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.predictdate"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_REALDATE')" >
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.realdate"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_TESTDATE')" >
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.testdate"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_REALPEOPEL')" >
                          <el-input :disabled="true" style="width:20vw" v-model="form.realpeopel"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_REPORTNUMBER')">
                          <el-input :disabled="true" style="width:20vw" v-model="form.reportnumber"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXPLAIN')" >
                          <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.explan"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_ADVISE')" >
                          <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.advise"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.remarks')" >
                          <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.note"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_MESSAGE')" >
                          <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.message"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_UPLOADFILE')" >
                          <el-upload
                            v-model="form.uploadfile"
                            :action="upload"
                            :file-list="fileList"
                            :on-remove="fileRemove"
                            :on-preview="fileDownload"
                            :on-success="fileSuccess"
                            :on-error="fileError"
                            class="upload-demo"
                            drag
                            ref="upload">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS5004VIEW_PROJECTSECORE')" name="second"  >
              <el-table :data="source"
                        header-cell-class-name="sub_bg_color_blue"
                        show-summary stripe border >
                <el-table-column :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.number"></el-input>
                  </template>
                </el-table-column>
                <!--姓名-->
                <el-table-column :label="$t('label.user_name')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.name"></el-input>
                  </template>
                </el-table-column>
                <!--社员外协-->
                <el-table-column :label="$t('label.PFANS5004VIEW_COMMUNE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.commune"></el-input>
                  </template>
                  <!--稼働率-->
                </el-table-column> <el-table-column :label="$t('label.PFANS5004VIEW_CROPRATE')" align="center" width="100">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.croprate"></el-input>
                </template>
              </el-table-column>
                <!--PJ稼働率-->
                <el-table-column :label="$t('label.PFANS5004VIEW_PJCROPRATE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.pjcroprate"></el-input>
                  </template>
                </el-table-column>
                <!--直接稼働率-->
                <el-table-column :label="$t('label.PFANS5004VIEW_DICROPRATE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.dicroprate"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, source)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>



            <el-tab-pane :label="$t('label.PFANS5004VIEW_STAGENEWS')" name="third"  >
              <el-table :data="stage"
                        header-cell-class-name="sub_bg_color_blue"
                        show-summary stripe border style="width: 70vw">
                <!--工作阶段-->
                <el-table-column :label="$t('label.PFANS5004VIEW_WORKSTAGE')" align="center" width="150">
                  <template slot-scope="scope">
                    <dicselect :code="code1"
                               :data="scope.row.workstage"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="getworkstage" style="width: 100%">
                    </dicselect>
                  </template>
                </el-table-column>
                <!--阶段成果物-->
                <el-table-column :label="$t('label.PFANS5004VIEW_STAGETHING')" align="center" width="150">
                  <template slot-scope="scope">
                    <dicselect :code="code2"
                               :data="scope.row.stagething"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="setstagething"
                               style="width: 100%" v-show="scope.row.showrow1">
                    </dicselect>
                    <dicselect :code="code3"
                               :data="scope.row.stagething"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="setstagething"
                               style="width: 100%" v-show="scope.row.showrow2">
                    </dicselect>
                    <dicselect :code="code4"
                               :data="scope.row.stagething"
                               :disabled="!disable"
                               :multiple="multiple"
                               :no="scope.row"
                               @change="setstagething"
                               style="width: 100%" v-show="scope.row.showrow3">
                    </dicselect>
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.stagething"></el-input>
                  </template>
                </el-table-column>
                <!--预计工数（人月）-->
                <el-table-column :label="$t('label.PFANS5004VIEW_PREDICTNUKMBER')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.commune"></el-input>
                  </template>
                  <!--起止时间-->
                </el-table-column> <el-table-column :label="$t('label.PFANS5004VIEW_DATETIME2')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.stdatetime"></el-input>
                </template>
              </el-table-column>
                <!--备注-->
                <el-table-column :label="$t('label.PFANS5004VIEW_NOTE')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.note1"></el-input>
                  </template>
                </el-table-column>
                <!--完成时间-->
                <el-table-column :label="$t('label.PFANS5004VIEW_FINSHTIME')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.finshtime"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow2(scope.$index, stage)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow2()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>

          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {getToken} from '@/utils/auth'
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getOrgInfoByUserId} from '@/utils/customize';
  import dicselect from "../../../components/dicselect";
  import {getDictionaryInfo} from "../../../../utils/customize";
  export default {
    name: "PFANS5004FormView",
    components: {
      EasyNormalContainer,
      dicselect
    },
    data(){
      return{
        title: "title.PFANS5004VIEW",
        loading: false,
        activeName:'first',
        disabled: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          }
        ],
        baseInfo: {},
        form:{
          projectnumber:'',
          projectname:'',
          projectstype:'',
          startdate:'',
          secret:'',
          datetime:'',
          manager:'',
          predictdate:'',
          realdate:'',
          testdate:'',
          realpeopel:'',
          reportnumber:'',
          assetaddress:'',
          explan:'',
          exprence:'',
          advise:'',
          note:'',
          message:'',
          uploadfile:'',

        },
        source:[{
          projectsecoreid:'',
          closeapplicatid:'',
          number:'',
          name:'',
          commune:'',
          croprate:'',
          pjcroprate:'',
          dicroprate:'',
          rowindex: "",
        }],
        stage:[{
          stagenews_id:'',
          closeapplicatid:'',
          workstage:'',
          stagething:'',
          predictnukmber:'',
          datetime:'',
          note1:'',
          finshtime:'',
          rowindex: "",
        }],
        rules: {},
        fileList: [],
        //upload: uploadUrl(),
        code1:'PP012',
        code2: 'PP013',
        code3: 'PP014',
        code4: 'PP015',
        showrow1: true,
        showrow2: false,
        showrow3: false,
        canStart: false
      }
    },
    mounted(){
      if(this.$route.params._id){
        this.loading = true;
        this.$store
          .dispatch('PFANS5004Store/selectById', {'closeapplicatid': this.$route.params._id})
          .then(response => {
            this.form=response.closeApplicat;
            if(response.projectSecore.length>0){
              this.source=response.projectSecore;
            }
            if(response.stageNews.length>0){
              this.stage=response.stageNews;
              for (var i = 0; i < this.stage.length; i++) {
                if(this.stage[i].workstage==='PP012001'){
                  this.stage[i].showrow1=true;
                  this.stage[i].showrow2 = false;
                  this.stage[i].showrow3 = false;
                }else if(this.stage[i].workstage==='PP012002'){
                  this.stage[i].showrow1=false;
                  this.stage[i].showrow2 = true;
                  this.stage[i].showrow3 = false;
                }else if(this.stage[i].workstage==='PP012003'){
                  this.stage[i].showrow1=false;
                  this.stage[i].showrow2 = false;
                  this.stage[i].showrow3 = true;
                }
              }
            }
            this.baseInfo.closeApplicat=JSON.parse(JSON.stringify(this.form));
            this.baseInfo.projectSecore=JSON.parse(JSON.stringify(this.source));
            this.baseInfo.stageNews=JSON.parse(JSON.stringify(this.stage));
          })
          .catch(error=>{
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          })
      }else {

      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods:{
      addRow() {
        this.source.push({
          number:'',
          name:'',
          commune:'',
          croprate:'',
          pjcroprate:'',
          dicroprate:'',
        });
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.source=[{
            number:'',
            name:'',
            commune:'',
            croprate:'',
            pjcroprate:'',
            dicroprate:'',
          }]
        }
      },
      addRow2() {
        this.stage.push({
          workstage:'',
          stagething:'',
          predictnukmber:'',
          datetime:'',
          note:'',
          finshtime:'',
          showrow1: true,
          showrow2: false,
          showrow3: false,
        });
      },
      deleteRow2(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.stage=[{
            workstage:'',
            stagething:'',
            predictnukmber:'',
            datetime:'',
            note:'',
            finshtime:'',
          }]
        }
      },
      getworkstage(val,row){
        row.workstage=val;
        if(val==='PP012001'){
          this.stage[i].showrow1=true;
          this.stage[i].showrow2 = false;
          this.stage[i].showrow3 = false;
        }else if(val==='PP012002'){
          this.stage[i].showrow1=false;
          this.stage[i].showrow2 = true;
          this.stage[i].showrow3 = false;
        }else if(val==='PP012003'){
          this.stage[i].showrow1=false;
          this.stage[i].showrow2 = false;
          this.stage[i].showrow3 = true;
        }
      },
      setstagething(val,row){
        row.stagething=val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      fileError(err, file, fileList){
        Message({
          message: this.$t("normal.error_04"),
          type: 'error',
          duration: 5 * 1000
        });
      },
      fileRemove(file, fileList){
        this.fileList = [];
        this.form.uploadfile = "";
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + "," + item.url + ";"
        }
      },
      fileDownload(file) {
        if (file.url) {
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      fileSuccess(response, file, fileList) {
        this.fileList = [];
        this.form.uploadfile = "";
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + "," + o.url + ";"
        }
      },
    },
    buttonClick(val) {
      if(val==="save"){
        this.$refs["reff"].validate(valid => {
          if(valid){
            this.baseInfo={};
            this.baseInfo.closeApplicat=JSON.parse(JSON.stringify(this.form));
            this.baseInfo.projectSecore=[];
            this.baseInfo.stageNews=[];
            for(let i=0;i<this.source.length;i++){
              if(this.source[i].number !== "" || this.source[i].name !== "" || this.source[i].commune !== "" || this.source[i].croprate !== ""
                || this.source[i].pjcroprate !== "" ||  this.source[i].dicroprate !== "" ){
                this.baseInfo.projectSecore.push(
                  {
                    closeapplicatid: this.source[i].closeapplicatid,
                    projectsecoreid: this.source[i].projectsecoreid,
                    number: this.source[i].number,
                    name: this.source[i].name,
                    commune: this.source[i].commune,
                    croprate: this.source[i].croprate ,
                    pjcroprate: this.source[i].pjcroprate,
                    dicroprate: this.source[i].dicroprate,
                  }
                );
              }
            }
            for(let i=0;i<this.stage.length;i++){
              if(this.stage[i].workstage !== "" || this.stage[i].stagething !== "" || this.stage[i].predictnukmber !== "" || this.stage[i].projectnumber !== ""
                || this.stage[i].stdatetime !== "" ||  this.stage[i].note1 !== "" ||  this.stage[i].finshtime !== ""){
                this.baseInfo.stageNews.push(
                  {
                    stagenews_id: this.stage[i].stagenews_id,
                    closeapplicatid: this.stage[i].closeapplicatid,
                    workstage: this.stage[i].workstage,
                    stagething: this.stage[i].stagething,
                    predictnukmber: this.stage[i].predictnukmber,
                    projectnumber: this.stage[i].projectnumber ,
                    stdatetime: this.stage[i].stdatetime,
                    note1: this.stage[i].note1,
                    finshtime: this.stage[i].finshtime,
                  }
                );
              }
            }
            if (this.$route.params._id) {
              //this.baseInfo.closeApplicat.closeApplicatid = this.$route.params._id;
              this.$store
                .dispatch('PFANS5004Store/update', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== "update") {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
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
                  });
                  this.loading = false;
                })
            }else {
              this.$store
                .dispatch('PFANS5004Store/insert', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  this.$message({
                    message: this.$t("normal.success_01"),
                    type: "success",
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
                });
            }

          }
        })
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {
    overflow: visible;
  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: visible;
  }
</style>

