<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"  ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-row>
            <!--1-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PJNAME')" prop="pjname">
                <el-input :disabled="!disabled" style="width: 11rem" v-model="form.pjname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')">
                <el-input :disabled="!disabled" style="width: 11rem" v-model="form.psdcdwindow"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--2-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_BPCLUBNAME')" prop="bpclubname">
                <el-input :disabled="!disabled" style="width: 11rem" v-model="form.bpclubname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_BPPLAYER')">
                <el-input :disabled="!disabled" style="width: 11rem" v-model="form.bpplayer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--3-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2023VIEW_YEARS')" prop="year">
                <el-date-picker
                  :disabled="!disabled"
                  @change="getYear"
                  style="width: 11rem"
                  type="year"
                  v-model="form.year">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PLMONTHPLAN')" prop="plmonthplan">
                <dicselect
                  :disabled="!disabled"
                  :code="code2"
                  :data="form.plmonthplan"
                  :multiple="multiple"
                  @change="getPlmonthplan"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <!--4-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_TYPEOFFEES')" prop="typeoffees">
                <dicselect
                  :disabled="!disabled"
                  :code="code3"
                  :data="form.typeoffees"
                  :multiple="multiple"
                  @change="getTypeoffees"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6007VIEW_PAYMENT')" prop="payment">
                <el-input :disabled="!disabled" style="width: 11rem" v-model="form.payment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--5-->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS6007VIEW_REMARKS')">
                <el-input :disabled="!disabled" :rows="2" style="width: 93%" type="textarea"
                          v-model="form.remarks"></el-input>
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
  import PFANS6007View from "../PFANS6007/PFANS6007View.vue";
  import dicselect from "../../../components/dicselect.vue";
  import {Message} from 'element-ui'
  import moment from "moment";
  import {valfloat} from '@/utils/validate';
  export default {
    name: 'PFANS6007FormView',
    components: {
      EasyNormalContainer,
      PFANS6007View,
      dicselect
    },
    data() {
      var checkpjname = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_pjname = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PJNAME');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PJNAME')));
        } else {
          this.error_pjname = "";
          return callback();
        }
      };
      var checkbpclubname = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_bpclubname = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_BPCLUBNAME');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_BPCLUBNAME')));
        } else {
          this.error_bpclubname = "";
          return callback();
        }
      };
      var checkyear = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_year = this.$t('normal.error_09') + this.$t('label.PFANS2007VIEW_YEAR');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2007VIEW_YEAR')));
        } else {
          this.error_year = "";
          return callback();
        }
      };
      var checkplmonthplan = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_plmonthplan = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PLMONTHPLAN');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PLMONTHPLAN')));
        } else {
          this.error_plmonthplan = "";
          return callback();
        }
      };
      var checktypeoffees = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error_typeoffees = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_TYPEOFFEES');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_TYPEOFFEES')));
        } else {
          this.error_typeoffees = "";
          return callback();
        }
      };
      var checkpayment = (rule, value, callback) => {
        if (this.form.payment !== null && this.form.payment !== '') {
          if (valfloat(value)) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_09') + this.$t('label.effective') + this.$t('label.PFANS6007VIEW_PAYMENT')));
          }
        } else {
          this.error_typeoffees = this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PAYMENT');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6007VIEW_PAYMENT')));
        }
      };
      return {
        loading: false,
        error_pjname: '',
        error_bpclubname:'',
        error_year:'',
        error_plmonthplan:'',
        error_typeoffees:'',
        error_payment:'',
        selectType: "Single",
        title: "title.PFANS6007VIEW_TITLE",
        buttonList: [],
        multiple: false,
        form: {
          variousfunds_id:'',
          pjname:'华夏',
          psdcdwindow:'ndsss',
          bpclubname:'newserch',
          bpplayer:'汪峰',
          plmonthplan:'',
          typeoffees:'',
          payment:'',
          remarks:'',
          year:'',
        },
        code2: 'BP013',
        code3: 'BP014',
        rules: {
          pjname: [
            {
              required: true,
              validator: checkpjname,
              trigger: 'change'
            },
          ],
          bpclubname: [
            {
              required: true,
              validator: checkbpclubname,
              trigger: 'change'
            },
          ],
          year: [
            {
              required: true,
              validator: checkyear,
              trigger: 'change'
            },
          ],
          plmonthplan: [
            {
              required: true,
              validator: checkplmonthplan,
              trigger: 'change'
            },
          ],
          typeoffees: [
            {
              required: true,
              validator: checktypeoffees,
              trigger: 'change'
            },
          ],
          payment: [
            {
              required: true,
              validator: checkpayment,
              trigger: 'change'
            },
          ]
        },
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS6007Store/getvariousfundsApplyOne', {"variousfunds_id": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.loading = false;
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
      getYear(val) {
        this.form.year = val;
      },
      getPlmonthplan(val) {
        this.form.plmonthplan = val;
      },
      getTypeoffees(val) {
        this.form.typeoffees = val;
      },

      buttonClick(val) {
        this.$refs["refform"].validate(valid => {
          if (valid) {
            this.form.variousfunds_id = this.$route.params._id;
            this.form.year = moment(this.form.year).format('YYYY-MM-DD');
            this.loading = true;
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS6007Store/updatevariousfundsApply', this.form)
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
              this.form.year = moment(this.form.year).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS6007Store/createvariousfundsApply', this.form)
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
