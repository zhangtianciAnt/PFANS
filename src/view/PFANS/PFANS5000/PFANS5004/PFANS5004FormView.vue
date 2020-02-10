<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">

            <el-tab-pane :label="$t('label.PFANS5004VIEW_CLOSEAPPLICAT')" name="first"  >
              <div>
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
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS5004VIEW_PROJECTSECORE')" name="second"  >
              <div>
                <el-table :data="source"
                          header-cell-class-name="sub_bg_color_blue"
                          show-summary stripe border style="width: 70vw">
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.numbers"></el-input>
                    </template>
                  </el-table-column>
                  <!--姓名-->
                  <el-table-column :label="$t('label.user_name')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <!--社员外协-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_COMMUNE')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.commune"></el-input>
                    </template>
                    <!--稼働率-->
                  </el-table-column> <el-table-column :label="$t('label.PFANS5004VIEW_CROPRATE')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.croprate"></el-input>
                  </template>
                </el-table-column>
                  <!--PJ稼働率-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_PJCROPRATE')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.pjcroprate"></el-input>
                    </template>
                  </el-table-column>
                  <!--直接稼働率-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_DICROPRATE')" align="center" width="150">
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
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS5004VIEW_STAGENEWS')" name="third"  >
              <div>
                <el-table :data="stage"
                          header-cell-class-name="sub_bg_color_blue"
                          show-summary stripe border style="width: 70vw">
                  <!--工作阶段-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_WORKSTAGE')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.numbers"></el-input>
                    </template>
                  </el-table-column>
                  <!--阶段成果物-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_STAGETHING')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <!--预计工数（人月）-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_PREDICTNUKMBER')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.commune"></el-input>
                    </template>
                    <!--起止时间-->
                  </el-table-column> <el-table-column :label="$t('label.PFANS5004VIEW_DATETIME')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.croprate"></el-input>
                  </template>
                </el-table-column>
                  <!--备注-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_NOTE')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.pjcroprate"></el-input>
                    </template>
                  </el-table-column>
                  <!--完成时间-->
                  <el-table-column :label="$t('label.PFANS5004VIEW_FINSHTIME')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="20"  v-model="scope.row.dicroprate"></el-input>
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
              </div>
            </el-tab-pane>

          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";

    export default {
        name: "PFANS5004FormView",
      components: {
        EasyNormalContainer
      },
      data(){
          return{
            title: "title.PFANS1012VIEW",
            loading: false,
            activeName:'first',
            disable: false,
            buttonList: [
              {
                key: 'save',
                name: 'button.save',
                disabled: false,
                icon: 'el-icon-check',
              }
            ],
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
            source:{
              number:'',
              name:'',
              commune:'',
              croprate:'',
              pjcroprate:'',
              dicroprate:'',
            },
            stage:{
              workstage:'',
              stagething:'',
              predictnukmber:'',
              datetime:'',
              note:'',
              finshtime:'',

            },
            rules: {},
            fileList: [],
            //upload: uploadUrl(),
            canStart: false
          }
      },
      methods:{
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

        }
    }
</script>

<style scoped>

</style>
