<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading" @disabled="setdisabled">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <!--            第一行-->
          <el-row>
            <!--            中文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_CUSTOMERNAMEC')" prop="custchinese">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='255'
                          v-model="form.custchinese" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--            日文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_CUSTOMERNAMEJ')" prop="custjapanese">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='255'
                          v-model="form.custjapanese" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--            英文-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_CUSTOMERNAMEE')" prop="custenglish">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='255'
                          v-model="form.custenglish" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            简称-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_ABBREVIATION')" prop="abbreviation">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='255'
                          v-model="form.abbreviation" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--            公司法人-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002FORMVIEW_LIABLEPERSON')" prop="liableperson">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='20'
                          v-model="form.liableperson" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--            所属公司-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" prop="thecompany">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='50'
                          v-model="form.thecompany" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
<!--            &lt;!&ndash;        事业场编码&ndash;&gt;-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_BUSINESSCODE')" prop="causecode">
                <el-input :disabled="!disabled" style="width:20vw" maxlength='20'
                          v-model="form.causecode" clearable></el-input>
              </el-form-item>
            </el-col>
            <!--            地域区分-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6002VIEW_REGINDIFF')" prop="regindiff">
                <dicselect
                  :code="code2"
                  :data="form.regindiff"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="changeregindiff"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS6002FORMVIEW_BELONG')}}</span>
              </template>
              <el-form-item>
            <el-table :data="tableA" stripe border header-cell-class-name="sub_bg_color_blue"
                      style="width: 90vw" >
              <!--序号-->
              <el-table-column type="index" width="50" :label="$t('label.PFANS2007VIEW_NUMBER')" align="center" fixed prop="content">
              </el-table-column>
              <!--所属部门(中)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_THEDEPC')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='50'
                            v-model="scope.row.thedepC" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--所属部门(英)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_THEDEPE')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='50'
                            v-model="scope.row.thedepE" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--所属部门(日)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_THEDEPJ')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='50'
                            v-model="scope.row.thedepJ" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--联系人(中)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_PROJECTNAMEC')" align="center" width="200%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:8vw" maxlength='100'
                            v-model="scope.row.prochinese" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--联系人(英)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_PROJECTNAMEE')" align="center" width="200%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:8vw" maxlength='100'
                            v-model="scope.row.proenglish" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--联系人(日)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_PROJECTNAMEJ')" align="center" width="200%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:8vw" maxlength='100'
                            v-model="scope.row.projapanese" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--联系电话-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_PROTELEPHONE')" align="center" width="200%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:8vw" maxlength='100'
                            v-model="scope.row.protelephone" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--邮箱地址-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_PROTEMAIL')" align="center" width="220%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='100'
                            v-model="scope.row.protemail" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--公司地址(中)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_ADDCHINESE')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='255'
                            v-model="scope.row.addchinese" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--公司地址(英)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_ADDENGLISH')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='255'
                            v-model="scope.row.addenglish" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--公司地址(日)-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_ADDJAPANESE')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input maxlength="255" :disabled="!disabled" style="width:10vw"
                            v-model="scope.row.addjapanese" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--人员规模-->
              <el-table-column :label="$t('label.PFANS6002VIEW_PERSCALE')" align="center" width="120%">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code1"
                    :data="scope.row.perscale"
                    :disabled="!disabled"
                    :multiple="multiple"
                    @change="changeperscale"
                    style="width:8vm"
                    size="small">
                  </dicselect>
                </template>
              </el-table-column>
              <!--公司网址-->
              <el-table-column :label="$t('label.PFANS6002FORMVIEW_WEBSITE')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" style="width:10vw" maxlength='50'
                            v-model="scope.website" size="small" :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--备注-->
              <el-table-column :label="$t('label.PFANS6007VIEW_REMARKS')" align="center" width="230%">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" :rows="1" style="width: 10vw" type="textarea"
                            v-model="scope.remarks"  :no="scope.row" clearable></el-input>
                </template>
              </el-table-column>
              <!--操作-->
              <el-table-column :label="$t('label.operation')" align="center" width="220" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    :disabled="scope.row.customerinfor_id == '' || scope.row.customerinfor_id == null ? !disabled : true"
                    @click.native.prevent="deleteRow(scope.$index, tableA)"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    :disabled="!disabled"
                    @click.native.prevent="copyRow(scope.$index, tableA)"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.copyup')}}
                  </el-button>
                  <el-button
                    :disabled="!disabled"
                    @click="addRow()"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
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
          customerinforprimary_id:'',
          custchinese: '',
          custjapanese: '',
          custenglish: '',
          abbreviation: '',
          liableperson: '',
          thecompany: '',
          causecode: '',
          regindiff: '',
        },
        tableA: [
          {
            //基本信息 fr
            custchinese: '',
            custjapanese: '',
            custenglish: '',
            abbreviation: '',
            liableperson: '',
            thecompany: '',
            causecode: '',
            regindiff: '',
            //基本信息 to

            customerinfor_id: '',
            customerinforprimary_id: '',
            thedepC: '',
            thedepE: '',
            thedepJ: '',
            prochinese: '',
            proenglish: '',
            projapanese: '',
            protelephone: '',
            protemail: '',
            addchinese: '',
            addenglish: '',
            addjapanese: '',
            perscale: '',
            website: '',
            remarks: '',
          }
        ],
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
          liableperson: [
              {
                  required: true,
                  message: this.$t('normal.error_08') + this.$t('label.ASSETS1002VIEW_USERID'),
                  trigger: 'change'
              },
          ],
          // 所属公司
          thecompany: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS6003FORMVIEW_THECOMPANY'),
              trigger: 'change',
            },
          ],
          // // 中文(地址)
          // addchinese: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_CHINESE'),
          //     trigger: 'change',
          //   }],
          // // 日文(地址)
          // addjapanese: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS6002FORMVIEW_JAPANESE'),
          //     trigger: 'change',
          //   },
          // ],
          // // 英文(地址)
          // addenglish: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_ENGLISH'),
          //     trigger: 'change',
          //   },
          // ],
          // 事业场编码
          causecode: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1024VIEW_BUSINESSCODE'),
              trigger: 'change',
            },
          ],
          //地域区分
            regindiff: [
                {
                    required: true,
                    validator: checkregindiff,
                    trigger: 'change'
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
          .dispatch('PFANS6002Store/getcustomerinforApplyOne', {'customerinforprimary_id': this.$route.params._id})
          .then(response => {
              if (response !== undefined) {
                  this.form.customerinforprimary_id = response[0].customerinforprimary_id;
                  this.form.custchinese = response[0].custchinese;
                  this.form.custjapanese = response[0].custjapanese;
                  this.form.custenglish = response[0].custenglish;
                  this.form.abbreviation = response[0].abbreviation;
                  this.form.liableperson = response[0].liableperson;
                  this.form.thecompany = response[0].thecompany;
                  this.form.causecode = response[0].causecode;
                  this.form.regindiff = response[0].regindiff;
                  this.tableA = response;
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
          this.disabled =  val;
        }
      },
      changeperscale(val, row) {
        row.perscale = val;
      },
        changeregindiff(val) {
            this.form.regindiff = val;
        },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableA = [
            {
              //基本信息 fr
              customerinforprimary_id:'',
              custchinese:  '',
              custjapanese:  '',
              custenglish:  '',
              abbreviation:  '',
              liableperson:  '',
              thecompany:  '',
              causecode:  '',
              regindiff:  '',
              //基本信息 to
              customerinfor_id:  '',
              thedepC: '',
              thedepE: '',
              thedepJ: '',
              prochinese: '',
              proenglish: '',
              projapanese: '',
              protelephone: '',
              protemail: '',
              addchinese: '',
              addenglish: '',
              addjapanese: '',
              perscale: '',
              website: '',
              remarks: '',
            }
          ]
        }
      },
      copyRow(index, rows) {
        this.tableA .push({
              //基本信息 fr
              custchinese:  rows[index].custchinese,
              custjapanese:  rows[index].custjapanese,
              custenglish:  rows[index].custenglish,
              abbreviation:  rows[index].abbreviation,
              liableperson:  rows[index].liableperson,
              thecompany:  rows[index].thecompany,
              causecode:  rows[index].causecode,
              regindiff:  rows[index].regindiff,
              //基本信息 to
              customerinforprimary_id: rows[index].customerinforprimary_id,
              customerinfor_id: '',
              thedepC: rows[index].thedepC,
              thedepE: rows[index].thedepE,
              thedepJ: rows[index].thedepJ,
              prochinese: rows[index].prochinese,
              proenglish: rows[index].proenglish,
              projapanese: rows[index].projapanese,
              protelephone: rows[index].protelephone,
              protemail: rows[index].protemail,
              addchinese: rows[index].addchinese,
              addenglish: rows[index].addenglish,
              addjapanese: rows[index].addjapanese,
              perscale: rows[index].perscale,
              website: rows[index].website,
              remarks: rows[index].remarks,
        });
      },
      addRow() {
        this.tableA.push({
          //基本信息 fr
          custchinese:  '',
          custjapanese:  '',
          custenglish:  '',
          abbreviation:  '',
          liableperson:  '',
          thecompany:  '',
          causecode:  '',
          regindiff:  '',
          //基本信息 to
          customerinforprimary_id:'',
          customerinfor_id:  '',
          thedepC: '',
          thedepE: '',
          thedepJ: '',
          prochinese: '',
          proenglish: '',
          projapanese: '',
          protelephone: '',
          protemail: '',
          addchinese: '',
          addenglish: '',
          addjapanese: '',
          perscale: '',
          website: '',
          remarks: '',
        });
      },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.form.customerinfor_id = this.$route.params._id;
            this.loading = true;
            for (let i = 0; i < this.tableA.length; i++)
            {
              if (this.tableA[i].addchinese === '' || this.tableA[i].addchinese === null
                || this.tableA[i].addjapanese === '' || this.tableA[i].addjapanese === null
                || this.tableA[i].addjapanese === '' || this.tableA[i].addjapanese === null)
              {
                Message({
                  message: this.$t('normal.error_30'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
                return ;
              }
              this.tableA[i].customerinforprimary_id = this.form.customerinforprimary_id;
              this.tableA[i].custchinese = this.form.custchinese;
              this.tableA[i].custjapanese = this.form.custjapanese;
              this.tableA[i].custenglish = this.form.custenglish;
              this.tableA[i].abbreviation = this.form.abbreviation;
              this.tableA[i].liableperson = this.form.liableperson;
              this.tableA[i].thecompany = this.form.thecompany;
              this.tableA[i].causecode = this.form.causecode;
              this.tableA[i].regindiff = this.form.regindiff;
            }
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS6002Store/updatecustomerinforApply', this.tableA)
                .then(response => {
                  // this.data = response;
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
                .dispatch('PFANS6002Store/createcustomerinforApply', this.tableA)
                .then(response => {
                  // this.data = response;
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
