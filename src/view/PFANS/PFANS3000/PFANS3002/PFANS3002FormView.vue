<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="10rem" ref="refform"
                 style="padding: 2rem">
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width: 11rem" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width: 11rem" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width: 11rem" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 9.2rem"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002FORMVIEW_NAME')" prop="name">
                <el-input :disabled="!disable" maxlength="20" style="width: 11rem" v-model.trim="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002FORMVIEW_NAMEROME')" prop="namerome">
                <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                          v-model.trim="form.namerome"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002VIEW_HOTEL')" prop="hotel">
                <el-input :disabled="!disable" maxlength="20" style="width: 11rem" v-model.trim="form.hotel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3002VIEW_CHECKIN')" prop="checkin">
                  <div class="block">
                    <el-date-picker
                      :disabled="!disable"
                      style="width: 11rem"
                      type="date"
                      v-model="form.checkin">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3002VIEW_CHECKOUT')" prop="checkout">
                  <div class="block">
                    <el-date-picker
                      :disabled="!disable"
                      style="width: 11rem"
                      type="date"
                      v-model="form.checkout">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002VIEW_CHECKINDAYS')" prop="checkindays">
                <el-input :disabled="true" style="width: 11rem" v-model="form.checkindays"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002VIEW_SMOKE')" prop="smoke">
                <span style="margin-right: 1rem ">{{$t('label.no')}}</span>
                <el-switch
                  :disabled="!disable"
                  v-model="form.smoke"
                  active-value="1"
                  inactive-value="0"
                >
                </el-switch>
                <span style="margin-left: 1rem ">{{$t('label.yes')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input :disabled="!disable" style="width: 100%" type="textarea" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer'
    import moment from 'moment'
    import {Message} from 'element-ui'
    import user from '../../../components/user.vue'
    import {getOrgInfoByUserId} from '@/utils/customize'

    export default {
        name: 'PFANS3002FormView',
        components: {
            EasyNormalContainer,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            var validateStartdate = (rule, value, callback) => {
                if (this.form.checkin !== null && this.form.checkin !== '' && this.form.checkout !== '' && this.form.checkout !== null) {
                    if (moment(this.form.checkout).format("YYYY-MM-DD") < moment(this.form.checkin).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS3002FORMVIEW_ERROR")))
                    } else {
                        this.form.checkindays = moment(this.form.checkout).diff(moment(this.form.checkin), 'days') + 1;
                        callback()
                    }
                } else {
                    this.form.checkindays = 0
                    callback()
                }
            };
            var validateEnddate = (rule, value, callback) => {
                if (this.form.checkin !== '' && this.form.checkin !== null && this.form.checkout !== '' && this.form.checkout !== null) {
                    if (moment(this.form.checkout).format("YYYY-MM-DD") < moment(this.form.checkin).format("YYYY-MM-DD")) {
                        callback(new Error(this.$t("label.PFANS3002FORMVIEW_ERROR")))
                    } else {
                        this.form.checkindays = moment(this.form.checkout).diff(moment(this.form.checkin), 'days') + 1;
                        callback()
                    }
                } else {
                    this.form.checkindays = 0
                    callback()
                }
            };
            return {
                loading: false,
                selectType: 'Single',
                userlist: '',
                title: 'title.PFANS3002VIEW',
                buttonList: [],
                form: {
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    userid: '',
                    name: '',
                    namerome: '',
                    hotel: '',
                    checkin: moment(new Date()).format('YYYY-MM-DD'),
                    checkout: '',
                    checkindays: 0,
                    remarks: '',
                    smoke: true,
                },
                rules: {
                    userid: [
                        {
                            required: true,
                            validator: validateUserid,
                            trigger: 'change'
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3002VIEW_GUESTNAME') + '(' + this.$t('label.PFANS3002VIEW_NAME') + ')',
                            trigger: 'blur'
                        }
                    ],
                    namerome: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3002VIEW_GUESTNAME') + '(' + this.$t('label.PFANS3002VIEW_NAMEROME') + ')',
                            trigger: 'blur'
                        }
                    ],
                    hotel: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3002VIEW_HOTEL'),
                            trigger: 'blur'
                        }
                    ],
                    checkin: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS3007VIEW_CONTRACTSTARTDATE'),
                            trigger: 'change'
                        },
                        {validator: validateStartdate, trigger: 'change'}
                    ],
                    checkout: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.PFANS3007VIEW_CONTRACTENDDATE'),
                            trigger: 'change'
                        },
                        {validator: validateEnddate, trigger: 'change'}
                    ],
                },
                disable: false,
                error: ''
            }
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3002Store/getHotelReservationOne', {'hotelreservationid': this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.loading = false;
                        this.userlist = this.form.userid
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        })
                        this.loading = false
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.centerid = lst.centerNmae;
                    this.form.groupid = lst.groupNmae;
                    this.form.teamid = lst.teamNmae;
                    this.form.userid = this.$store.getters.userinfo.userid;
                }
            }
        },
        created() {
            this.disable = this.$route.params.disabled
            if (this.disable) {
                this.buttonList = [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check'
                    }
                ]
            }
        },
        methods: {
            getUserids(val) {
                this.form.userid = val;
                this.userlist = val;
                let lst = getOrgInfoByUserId(val);
                this.form.centerid = lst.centerNmae;
                this.form.groupid = lst.groupNmae;
                this.form.teamid = lst.teamNmae;
                if (!this.form.userid || this.form.userid === '' || val === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            buttonClick(val) {
                this.$refs['refform'].validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.form.userid = this.userlist
                        if (this.$route.params._id) {
                            this.form.checkin = moment(this.form.checkin).format('YYYY-MM-DD')
                            this.form.checkout = moment(this.form.checkout).format('YYYY-MM-DD')
                            this.$store
                                .dispatch('PFANS3002Store/updateHotelReservation', this.form)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    Message({
                                        message: this.$t('normal.success_02'),
                                        type: 'success',
                                        duration: 5 * 1000
                                    })
                                    if (this.$store.getters.historyUrl) {
                                        this.$router.push(this.$store.getters.historyUrl);
                                    }
                                })
                                .catch(error => {
                                    Message({
                                        message: error,
                                        type: 'error',
                                        duration: 5 * 1000
                                    })
                                    this.loading = false;
                                })

                        } else {
                            this.form.checkin = moment(this.form.checkin).format('YYYY-MM-DD')
                            this.form.checkout = moment(this.form.checkout).format('YYYY-MM-DD')
                            this.loading = true
                            this.$store
                                .dispatch('PFANS3002Store/createHotelReservation', this.form)
                                .then(response => {
                                    this.data = response
                                    this.loading = false;
                                    Message({
                                        message: this.$t('normal.success_01'),
                                        type: 'success',
                                        duration: 5 * 1000
                                    })
                                    if (this.$store.getters.historyUrl) {
                                        this.$router.push(this.$store.getters.historyUrl);
                                    }
                                })
                                .catch(error => {
                                    Message({
                                        message: error,
                                        type: 'error',
                                        duration: 5 * 1000
                                    })
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
