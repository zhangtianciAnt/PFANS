<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading" @disabled="setdisabled">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6001VIEW_SUPPLIERNAME')}}</span>
              </template>
              <!--            第一行-->
              <el-row>
                <!--            中文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="supchinese">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.supchinese"></el-input>
                  </el-form-item>
                </el-col>
                <!--            日文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="supjapanese">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.supjapanese"></el-input>
                  </el-form-item>
                </el-col>
                <!--            英文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="supenglish">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.supenglish"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--            第二行-->
              <el-row>
                <!--            简称-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_ABBREVIATION')" prop="abbreviation">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.abbreviation"></el-input>
                  </el-form-item>
                </el-col>
                <!--            负责人-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1002VIEW_USERID')" prop="liableperson">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.liableperson"></el-input>
                  </el-form-item>
                </el-col>

                <!--           供应商编码（合同用）-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6003FORMVIEW_VENDORNUM')" prop="suppliercode">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.suppliercode"></el-input>
                  </el-form-item>
                </el-col>


              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--            银行账户信息-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6003FORMVIEW_BANKACCINFORMATION')}}</span>
              </template>
              <el-row>
                <!--                  收款方全称-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEENAME')" prop="payeename">
                    <el-input :disabled="!disabled" maxlength="20" style="width:20vw"
                              v-model="form.payeename"></el-input>
                  </el-form-item>
                </el-col>
                <!--                  收款方编码-->
                <!--<el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" prop="vendornum">
                    <el-input :disabled="!disabled" maxlength="20" style="width:20vw" type="email"
                              v-model="form.vendornum"></el-input>
                  </el-form-item>
                </el-col>-->
                <!--                  收款方银行账号-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                prop="payeebankaccountnumber">
                    <el-input :disabled="!disabled" maxlength="20" style="width:20vw"
                              v-model="form.payeebankaccountnumber"></el-input>
                  </el-form-item>
                </el-col>
                <!--                收款方开户行-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                prop="payeebankaccount">
                    <el-input :disabled="!disabled" maxlength="20" style="width:20vw"
                              v-model="form.payeebankaccount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!--           收款方编码-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')" prop="suppliercode">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.suppliercode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--                收款方开户行-->
             <!-- <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                prop="payeebankaccount">
                    <el-input :disabled="!disabled" maxlength="20" style="width:20vw"
                              v-model="form.payeebankaccount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->
            </el-collapse-item>
          </el-collapse>

          <!--            第三行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6002FORMVIEW_PROJECTPERSON')}}</span>
              </template>
              <!--            第四行-->
              <el-row>
                <!--            中文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="prochinese">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.prochinese"></el-input>
                  </el-form-item>
                </el-col>
                <!--            日文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="projapanese">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.projapanese"></el-input>
                  </el-form-item>
                </el-col>
                <!--            英文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="proenglish">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.proenglish"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第五行-->
              <el-row>
                <!--        联系电话-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="protelephone">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.protelephone"></el-input>
                  </el-form-item>
                </el-col>
                <!--        邮箱地址-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="protemail">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.protemail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--          第六行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6002VIEW_COMMONTPERSON')}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002VIEW_COMMONTPERSON')" prop="commontperson">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.commontperson"></el-input>
                  </el-form-item>
                </el-col>
                <!--        联系电话-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="comtelephone">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.comtelephone"></el-input>
                  </el-form-item>
                </el-col>
                <!--        电子邮箱-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="comnemail">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.comnemail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--          第七行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6002VIEW_ADDRESS')}}</span>
              </template>
              <!--          第八行-->
              <el-row>
                <!--            中文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="addchinese">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.addchinese"></el-input>
                  </el-form-item>
                </el-col>
                <!--            日文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="comjapanese">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.addjapanese"></el-input>
                  </el-form-item>
                </el-col>
                <!--            英文-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="comenglish">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.addenglish"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第九行-->
              <el-row>
                <!--            人员规模-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002VIEW_PERSCALE')" prop="perscale">
                    <dicselect
                      :code="code1"
                      :data="form.perscale"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="changeperscale"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            网址-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6002FORMVIEW_WEBSITE')">
                    <el-input :disabled="!disabled" style="width:20vw"
                              v-model="form.website"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第十行-->
              <el-row>
                <!--            备注-->
                <el-col :span="24">
                  <el-form-item :label="$t('label.remarks')">
                    <el-input :disabled="!disabled" :rows="2" style="width:71vw" type="textarea"
                              v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--            附件-->
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent">
                    <el-upload
                      v-model="form.uploadfile"
                      :disabled="!disabled"
                      :action="upload"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
                      class="upload-demo"
                      drag
                      ref="upload">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
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
  import PFANS6003View from '../PFANS6003/PFANS6003View.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import {downLoadUrl, uploadUrl} from '../../../../utils/customize';
  import {isvalidPhone} from '@/utils/validate';
  import {validateEmail} from '../../../../utils/validate';

  export default {
    name: 'PFANS6003FormView',
    components: {
      EasyNormalContainer,
      PFANS6003View,
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
      return {
        loading: false,
        selectType: 'Single',
        title: 'title.PFANS6003VIEW',
        disabled: false,
        buttonList: [],
        multiple: false,
        form: {
          supplierinfor_id: '',
          type: this.$t('menu.PFANS6002'),
          supchinese: '',
          supjapanese: '',
          supenglish: '',
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
          address: '',
          addchinese: '',
          addjapanese: '',
          addenglish: '',
          perscale: '',
          website: '',
          remarks: '',
          uploadfile: '',
          payeename: '',
          /*vendornum: '',*/
          payeebankaccountnumber: '',
          payeebankaccount: '',
          suppliercode:'',
          // vendorcode:'',
        },
        //人员规模
        code1: 'BP007',
        disabled: true,
        rules: {
          // 中文（供应商名称）
          supchinese: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
              trigger: 'change',
            }],
          // 日文（供应商名称）
          supjapanese: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
              trigger: 'change',
            },
          ],
          // 英文（供应商名称）
          supenglish: [
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
          liableperson: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.ASSETS1002VIEW_USERID'),
              trigger: 'change',
            },
          ],
            // 收款方编码
            suppliercode: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE'),
                    trigger: 'change',
                },
            ],
          // 供应商编码（合同用）
            suppliercode: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6003FORMVIEW_VENDORNUM'),
              trigger: 'blur',
            },
          ],
          // 中文(项目联络人)
          prochinese: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
              trigger: 'change',
            }],
          // 日文(项目联络人)
          projapanese: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
              trigger: 'change',
            },
          ],
          // 英文(项目联络人)
          proenglish: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
              trigger: 'change',
            },
          ],
          // 联系电话
          protelephone: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
              trigger: 'blur',
            },
            {validator: validateTel, trigger: 'blur'}],
          // 邮箱地址
          protemail: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              trigger: 'blur',
            },
            {validator: checkemail, trigger: 'blur'}],
          //共通事务联络人
          commontperson: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6002VIEW_COMMONTPERSON'),
              trigger: 'change',
            }],
          // 联系电话
          comtelephone: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
              trigger: 'blur',
            },
            {validator: validateTel, trigger: 'blur'}],
          // 电子邮箱
          comnemail: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              trigger: 'blur',
            },
            {validator: checkemail, trigger: 'blur'}],
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
          payeename: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEENAME'),
              trigger: 'blur',
            },
          ],
          /*vendornum: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_FOREIGNPAYEECODE'),
              trigger: 'blur',
            },
          ],*/
          payeebankaccountnumber: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKNUMBER'),
              trigger: 'blur',
            },
          ],
          payeebankaccount: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT'),
              trigger: 'blur',
            },
          ],
          // 人员规模
          perscale: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS6002VIEW_PERSCALE'),
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
          .dispatch('PFANS6003Store/getsupplierinforApplyOne', {'supplierinfor_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.loading = false;
            if (this.form.uploadfile != '') {
              let uploadfile = (this.form.uploadfile || ' ').split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
                }
              }
            }
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
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      changeperscale(val) {
        this.form.perscale = val;
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
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      fileSuccess(response, file, fileList) {
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
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.form.supplierinfor_id = this.$route.params._id;
            this.loading = true;
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS6003Store/updatesupplierinforApply', this.form)
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
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            } else {
              this.loading = true;
              this.$store
                .dispatch('PFANS6003Store/createsupplierinforApply', this.form)
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
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            }
          }
          else{
              Message({
                  message: this.$t("normal.error_12"),
                  type: 'error',
                  duration: 5 * 1000
              });
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
