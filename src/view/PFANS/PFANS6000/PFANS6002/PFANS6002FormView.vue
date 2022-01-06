<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" @disabled="setdisabled">
      <div slot="customize">
        <el-form ref="refform" :model="form" :rules="rules" label-position="top" label-width="8vw"
                 style="padding: 2vw">
          <!--          <el-collapse>-->
          <!--            <el-collapse-item>-->
          <template slot="title">
            <span class="collapse_Title">{{ $t('label.PFANS5001FORMVIEW_CUSTOMERNAME') }}</span>
          </template>
          <!--            第一行-->
          <el-row>
            <!--            中文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="custchinese">
                <el-input v-model="form.custchinese" :disabled="!disabled" maxlength='255'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            日文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="custjapanese">
                <el-input v-model="form.custjapanese" :disabled="!disabled" maxlength='255'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            英文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="custenglish">
                <el-input v-model="form.custenglish" :disabled="!disabled" maxlength='255'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            简称-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_ABBREVIATION')" prop="abbreviation">
                <el-input v-model="form.abbreviation" :disabled="!disabled" maxlength='255'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            负责人-->
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1002VIEW_USERID')" prop="liableperson">
                <el-input v-model="form.liableperson" :disabled="!disabled" maxlength='20'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            所属公司-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" prop="thecompany">
                <el-input v-model="form.thecompany" :disabled="!disabled" maxlength='50'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--            人员规模-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_PERSCALE')" prop="perscale">
                <dicselect
                  :code="code1"
                  :data="form.perscale"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changeperscale">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--        事业场编码-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" prop="causecode">
                <el-input v-model="form.causecode" :disabled="!disabled" maxlength='20'
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            人员规模-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_REGINDIFF')" prop="regindiff">
                <dicselect
                  :code="code2"
                  :data="form.regindiff"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changeregindiff">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            </el-collapse-item>-->
          <!--          </el-collapse>-->
          <!--            第三行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{ $t('label.PFANS6002FORMVIEW_PROJECTPERSON') }}</span>
              </template>
              <!--            第四行-->
              <el-row>
                <!--            中文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="prochinese">
                    <el-input v-model="form.prochinese" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--            日文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="projapanese">
                    <el-input v-model="form.projapanese" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--            英文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="proenglish">
                    <el-input v-model="form.proenglish" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第五行-->
              <el-row>
                <!--        联系电话-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="protelephone">
                    <el-input v-model="form.protelephone" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--        邮箱地址-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="protemail">
                    <el-input v-model="form.protemail" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--          第六行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{ $t('label.PFANS6002VIEW_COMMONTPERSON') }}</span>
              </template>
              <el-row>
                <!--            共通事务联络人-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002VIEW_COMMONTPERSON')" prop="commontperson">
                    <el-input v-model="form.commontperson" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--        联系电话-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="comtelephone">
                    <el-input v-model="form.comtelephone" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--        电子邮箱-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="comnemail">
                    <el-input v-model="form.comnemail" :disabled="!disabled" maxlength='100'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--          第七行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{ $t('label.PFANS6002VIEW_ADDRESS') }}</span>
              </template>
              <!--          第八行-->
              <el-row>
                <!--            中文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="addchinese">
                    <el-input v-model="form.addchinese" :disabled="!disabled" maxlength='255'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--            日文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="addjapanese">
                    <el-input v-model="form.addjapanese" :disabled="!disabled" maxlength="255"
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <!--            英文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="addenglish">
                    <el-input v-model="form.addenglish" :disabled="!disabled" maxlength='255'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第九行-->
              <el-row>
                <!--            网址-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_WEBSITE')">
                    <el-input v-model="form.website" :disabled="!disabled" maxlength='50'
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第十行-->
              <el-row>
                <!--            备注-->
                <el-col :span="24">
                  <el-form-item :label="$t('label.remarks')">
                    <el-input v-model="form.remarks" :disabled="!disabled" :rows="2" style="width: 71vw"
                              type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--            附件-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent">
                    <el-upload
                      ref="upload"
                      :action="upload"
                      :disabled="!disabled"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
                      class="upload-demo"
                      drag>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{ $t('label.enclosurecontent') }}<em>{{ $t('normal.info_09') }}</em>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import PFANS6002View from '../PFANS6002/PFANS6002View.vue';
import dicselect from '../../../components/dicselect.vue';
import {Message} from 'element-ui';
import {isvalidPhone} from '@/utils/validate';
import {validateEmail} from '../../../../utils/validate';
import {downLoadUrl, uploadUrl} from '../../../../utils/customize';

export default {
  name: 'PFANS6002FormView',
  components: {
    EasyNormalContainer,
    PFANS6002View,
    dicselect,
  },
  data() {
    var validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('label.PFANSUSERFORMVIEW_TRUEMOBILE')));
      } else if (!isvalidPhone(value)) {
        callback(new Error(this.$t('label.PFANSUSERFORMVIEW_EFFECTIVEMOBILE')));
      } else {
        callback();
      }

    };
    var checkemail = (rule, value, callback) => {
      if (this.form.email !== null && this.form.email !== '') {
        if (!validateEmail(value)) {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.email')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var checkregindiff = (rule, value, callback) => {
      if (this.form.regindiff === null || this.form.regindiff === '' || this.form.regindiff === undefined) {
        callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6002VIEW_REGINDIFF')));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      selectType: 'Single',
      title: 'title.PFANS6002VIEW',
      disabled: false,
      buttonList: [],
      multiple: false,
      form: {
        customerinfor_id: '',
        type: this.$t('menu.PFANS6002'),
        custchinese: '',
        custjapanese: '',
        custenglish: '',
        abbreviation: '',
        liableperson: '',
        prochinese: '',
        projapanese: '',
        proenglish: '',
        protelephone: '',
        protemail: '',
        commontperson: '',
        comtelephone: '',
        comnemail: '',
        addchinese: '',
        addjapanese: '',
        addenglish: '',
        perscale: '',
        website: '',
        remarks: '',
        uploadfile: '',
        thecompany: '',
        causecode: '',
        regindiff: '',
      },
      //人员规模
      code1: 'BP007',
      code2: 'BP028',
      disabled: true,
      rules: {
        // 中文（客户名称）
        custchinese: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
            trigger: 'change',
          }],
        // 日文（客户名称）
        custjapanese: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
            trigger: 'change',
          },
        ],
        // 英文（客户名称）
        custenglish: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
            trigger: 'change',
          }],
        // 简称（客户名称）
        abbreviation: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_ABBREVIATION'),
            trigger: 'change',
          },
        ],
        // 负责人（客户名称）
        // liableperson: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_08') + this.$t('label.ASSETS1002VIEW_USERID'),
        //         trigger: 'change'
        //     },
        // ],
        // 所属公司
        thecompany: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS6003FORMVIEW_THECOMPANY'),
            trigger: 'change',
          },
        ],
        // 中文(项目联络人)
        // prochinese: [
        //     {
        //         required: false,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
        //         trigger: 'change'
        //     }],
        // 日文(项目联络人)
        // projapanese: [
        //     {
        //         required: false,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
        //         trigger: 'change'
        //     },
        // ],
        // 英文(项目联络人)
        // proenglish: [
        //     {
        //         required: false,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
        //         trigger: 'change'
        //     },
        // ],
        // 联系电话
        // protelephone: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
        //         trigger: 'blur'
        //     },
        //     {validator: validateTel, trigger: 'blur'}],
        // // 邮箱地址
        // protemail: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
        //         trigger: 'blur'
        //     },
        //     {validator: checkemail, trigger: 'blur'}],
        //共通事务联络人
        // commontperson: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANS6002VIEW_COMMONTPERSON'),
        //         trigger: 'change'
        //     }],
        // // 联系电话
        // comtelephone: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
        //         trigger: 'blur'
        //     },
        //     {validator: validateTel, trigger: 'blur'}],
        // // 电子邮箱
        // comnemail: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
        //         trigger: 'blur'
        //     },
        //     {validator: checkemail, trigger: 'blur'}],
        // 中文(地址)
        addchinese: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
            trigger: 'change',
          }],
        // 日文(地址)
        addjapanese: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
            trigger: 'change',
          },
        ],
        // 英文(地址)
        addenglish: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
            trigger: 'change',
          },
        ],
        // 人员规模
        // perscale: [
        //     {
        //         required: true,
        //         message: this.$t('normal.error_09') + this.$t('label.PFANS6002VIEW_PERSCALE'),
        //         trigger: 'change'
        //     },
        // ],
        // 事业场编码
        causecode: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_BUSINESSCODE'),
            trigger: 'change',
          },
        ],
        // prochinese: [
        //   {
        //     required: true,
        //     message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
        //     trigger: 'change'
        //   },
        // ],
        // projapanese: [
        //   {
        //     required: true,
        //     message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
        //     trigger: 'change'
        //   },
        // ],
        // proenglish: [
        //   {
        //     required: true,
        //     message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
        //     trigger: 'change'
        //   },
        // ],
        regindiff: [
          {
            required: true,
            validator: checkregindiff,
            // message: this.$t('normal.error_09') + this.$t('label.PFANS6002VIEW_REGINDIFF'),
            trigger: 'change',
          },
        ],
      },
      fileList: [],
      upload: uploadUrl(),
    };
  },
  mounted() {
    if (this.$route.params._id) {
      this.loading = true;
      this.$store
        .dispatch('PFANS6002Store/getcustomerinforApplyOne', {'customerinfor_id': this.$route.params._id})
        .then(response => {
          if (response !== undefined) {
            this.form = response;
            if (this.form.uploadfile != '' && this.form.uploadfile != null) {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
                }
              }
            }
          }
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    }
  },
  created() {
    this.disabled = this.$route.params.disabled;
    if (this.disabled) {
      this.buttonList = [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ];
    }
  },
  methods: {
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disabled = val;
      }
    },
    changeperscale(val) {
      this.form.perscale = val;
    },
    changeregindiff(val) {
      this.form.regindiff = val;
    },
    fileError(err, file, fileList) {
      Message({
        message: this.$t('normal.error_04'),
        type: 'error',
        duration: 5 * 1000,
      });
    },
    fileRemove(file, fileList) {
      this.fileList = [];
      this.form.uploadfile = '';
      for (var item of fileList) {
        let o = {};
        o.name = item.name;
        o.url = item.url;
        this.fileList.push(o);
        this.form.uploadfile += item.name + ',' + item.url + ';';
      }
    },
    fileDownload(file) {
      if (file.url) {
        file.url = file.url.replace('%', '%25');
        file.url = file.url.replace('#', '%23');
        file.url = file.url.replace('&', '%26');
        file.url = file.url.replace('+', '%2B');
        file.url = file.url.replace('=', '%3D');
        file.url = file.url.replace('?', '%3F');
        var url = downLoadUrl(file.url);
        window.open(url);
      }

    },
    fileSuccess(response, file, fileList) {
      if (response.data == 'upload_success') {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + ',' + o.url + ';';
        }
      } else {
        Message({
          message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
          type: 'error',
          duration: 5 * 1000,
        });
        this.form.uploadfile = '';
        this.$refs.upload.clearFiles();
      }
    },
    buttonClick(val) {
      this.$refs['refform'].validate(valid => {
        if (valid) {
          this.form.customerinfor_id = this.$route.params._id;
          this.loading = true;
          if (this.$route.params._id) {
            this.$store
              .dispatch('PFANS6002Store/updatecustomerinforApply', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                if (val !== 'update') {
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
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          } else {
            this.loading = true;
            this.$store
              .dispatch('PFANS6002Store/createcustomerinforApply', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                if (this.$store.getters.historyUrl) {
                  this.$router.push(this.$store.getters.historyUrl);
                }
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          }
        } else {
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
