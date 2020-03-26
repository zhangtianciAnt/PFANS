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
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-row >
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002FORMVIEW_NAME')" prop="name">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002FORMVIEW_NAMEROME')" prop="namerome">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                          v-model="form.namerome"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002VIEW_HOTEL')" prop="hotel">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.hotel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3002VIEW_CHECKIN')" prop="checkin">
                  <div class="block">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:20vw"
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
                      style="width:20vw"
                      type="date"
                      v-model="form.checkout">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3002VIEW_CHECKINDAYS')" prop="checkindays">
                <el-input :disabled="true" style="width:20vw" v-model="form.checkindays"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
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
          <el-row >
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.remarks"></el-input>
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
                centerid: '',
                groupid: '',
                teamid: '',
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
                        let rst = getOrgInfoByUserId(response.userid);
                        if(rst){
                            this.centerid = rst.centerNmae;
                            this.groupid= rst.groupNmae;
                            this.teamid= rst.teamNmae;
                        }
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
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    if(rst) {
                        this.centerid = rst.centerNmae;
                        this.groupid= rst.groupNmae;
                        this.teamid= rst.teamNmae;
                        this.form.centerid = rst.centerId;
                        this.form.groupid = rst.groupId;
                        this.form.teamid = rst.teamId;
                    }
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
                let rst = getOrgInfoByUserId(val);
                if(rst){
                    this.centerid = rst.centerNmae;
                    this.groupid = rst.groupNmae;
                    this.teamid = rst.teamNmae;
                    this.form.centerid = rst.centerId;
                    this.form.groupid = rst.groupId;
                    this.form.teamid = rst.teamId;
                }else{
                    this.centerid =  '';
                    this.groupid =  '';
                    this.teamid =  '';
                    this.form.centerid = '';
                    this.form.groupid =  '';
                    this.form.teamid =  '';
                }
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
                    else{
                        Message({
                            message: this.$t("normal.error_12"),
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
