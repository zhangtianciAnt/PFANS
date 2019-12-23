<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" @end="end"
                         @start="start"
                         @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-row>
            <!--            客户名称-->
            <el-col :span="8">
              <div class="sub_color_black">{{$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')}}</div>
            </el-col>
          </el-row>
          <!--            第一行-->
          <el-row>
            <!--            中文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="custchinese">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.custchinese"></el-input>
              </el-form-item>
            </el-col>
            <!--            日文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="custjapanese">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.custjapanese"></el-input>
              </el-form-item>
            </el-col>
            <!--            英文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="custenglish">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.custenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            简称-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_ABBREVIATION')" prop="contactinformation">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem"
                          v-model="form.abbreviation"></el-input>
              </el-form-item>
            </el-col>
            <!--            负责人-->
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1002VIEW_USERID')" prop="liableperson">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem"
                          v-model="form.liableperson"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第三行-->
          <el-row>
            <!--            项目联络人-->
            <el-col :span="8">
              <div class="sub_color_black">{{$t('label.PFANS6002FORMVIEW_PROJECTPERSON')}}</div>
            </el-col>
          </el-row>
          <!--            第四行-->
          <el-row>
            <!--            中文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="prochinese">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem"
                          v-model="form.prochinese"></el-input>
              </el-form-item>
            </el-col>
            <!--            日文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="projapanese">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem"
                          v-model="form.projapanese"></el-input>
              </el-form-item>
            </el-col>
            <!--            英文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="contactinformation">
                <el-input :disabled="disabled" maxlength='36' style="width: 11rem"
                          v-model="form.proenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第五行-->
          <el-row>
            <!--        联系电话-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="protelephone">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.protelephone"></el-input>
              </el-form-item>
            </el-col>
            <!--        邮箱地址-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="protemail">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.protemail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第六行-->
          <el-row>
            <!--            共通事务联络人-->
            <el-col :span="8">
              <div class="sub_color_black">{{$t('label.PFANS6002VIEW_COMMONTPERSON')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <!--            共通事务联络人-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_COMMONTPERSON')" prop="commontperson">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.commontperson"></el-input>
              </el-form-item>
            </el-col>
            <!--        联系电话-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')" prop="comtelephone">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.comtelephone"></el-input>
              </el-form-item>
            </el-col>
            <!--        电子邮箱-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')" prop="comnemail">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.comnemail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第七行-->
          <el-row>
            <!--            地址-->
            <el-col :span="8">
              <div class="sub_color_black">{{$t('label.PFANS6002VIEW_ADDRESS')}}</div>
            </el-col>
          </el-row>
          <!--          第八行-->
          <el-row>
            <!--            中文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CHINESE')" prop="addchinese">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.addchinese"></el-input>
              </el-form-item>
            </el-col>
            <!--            日文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_JAPANESE')" prop="comjapanese">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.addjapanese"></el-input>
              </el-form-item>
            </el-col>
            <!--            英文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_ENGLISH')" prop="comenglish">
                <el-input :disabled="disabled" style="width: 11rem"
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
                  :disabled="disabled"
                  :multiple="multiple"
                  @change="changeperscale"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            网址-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_WEBSITE')" prop="website">
                <el-input :disabled="disabled" style="width: 11rem"
                          v-model="form.website"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第十行-->
          <el-row>
            <!--            备注-->
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="disabled" :rows="2" style="width: 93%" type="textarea"
                          v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            附件-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')">
                <el-upload
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
                  <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import PFANS6002View from "../PFANS6002/PFANS6002View.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui';
    import {telephoneNumber} from '@/utils/validate';
    import {validateEmail} from "../../../../utils/validate";

    export default {
        name: 'PFANS6002FormView',
        components: {
            EasyNormalContainer,
            PFANS6002View,
            dicselect,
        },
        data() {
            var validateTel = (rule, value, callback) => {
                if (this.form.contactinformation !== null && this.form.contactinformation !== '') {
                    if (telephoneNumber(value)) {
                        callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS6001VIEW_CONTACTINFORMATION')));
                    } else {
                        callback();
                    }
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
                selectType: "Single",
                title: "title.PFANS6002FORMVIEW",
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
                    address: '',
                    addchinese: '',
                    addjapanese: '',
                    addenglish: '',
                    perscale: '',
                    website: '',
                    remarks: '',
                },
                //人员规模
                code1: 'BP007',
                rules: {
                    // 中文（客户名称）
                    custchinese: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
                            trigger: 'change'
                        }],
                    // 日文（客户名称）
                    custjapanese: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
                            trigger: 'change'
                        },
                    ],
                    // 英文（客户名称）
                    custenglish: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
                            trigger: 'change'
                        }],
                    // 简称（客户名称）
                    contactinformation: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_ABBREVIATION'),
                            trigger: 'change'
                        },
                    ],
                    // 负责人（客户名称）
                    liableperson: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.ASSETS1002VIEW_USERID'),
                            trigger: 'change'
                        },
                    ],
                    // 中文(项目联络人)
                    prochinese: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
                            trigger: 'change'
                        }],
                    // 日文(项目联络人)
                    projapanese: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
                            trigger: 'change'
                        },
                    ],
                    // 英文(项目联络人)
                    education: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
                            trigger: 'change'
                        },
                    ],
                    // 联系电话
                    protelephone: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
                            trigger: 'blur'
                        },
                        {validator: validateTel, trigger: 'blur'}],
                    // 邮箱地址
                    protemail: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
                            trigger: 'blur'
                        },
                        {validator: checkemail, trigger: 'blur'}],
                    //共通事务联络人
                    commontperson: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6002VIEW_COMMONTPERSON'),
                            trigger: 'change'
                        }],
                    // 联系电话
                    comtelephone: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
                            trigger: 'blur'
                        },
                        {validator: validateTel, trigger: 'blur'}],
                    // 电子邮箱
                    comnemail: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
                            trigger: 'blur'
                        },
                        {validator: checkemail, trigger: 'blur'}],
                    // 中文(地址)
                    addchinese: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
                            trigger: 'change'
                        }],
                    // 日文(地址)
                    addjapanese: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
                            trigger: 'change'
                        },
                    ],
                    // 英文(地址)
                    addenglish: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
                            trigger: 'change'
                        },
                    ],
                    // 人员规模
                    perscale: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS6002VIEW_PERSCALE'),
                            trigger: 'change'
                        },
                    ],
                    // 网址
                    website: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_WEBSITE'),
                            trigger: 'change'
                        },
                    ],
                },
            };
        },
        mounted() {

        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (this.disabled) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        disabled: false,
                        icon: "el-icon-check"
                    }
                ];
            }
        },
        methods: {
            changeperscale(val) {
                this.form.perscale = val;
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.form.customerinfor_id = this.$route.params._id;
                        this.loading = true;
                        if (this.$route.params._id) {
                            this.$store
                                .dispatch('PFANS6002Store/updatecooperinterviewApply', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    if (val !== "update") {
                                        Message({
                                            message: this.$t("normal.success_02"),
                                            type: 'success',
                                            duration: 5 * 1000
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
                        } else {
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS6002Store/createcooperinterviewApply', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    Message({
                                        message: this.$t("normal.success_01"),
                                        type: 'success',
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
                                })
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
