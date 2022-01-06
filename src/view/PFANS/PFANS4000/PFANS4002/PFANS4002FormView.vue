<template>
  <div class="user_form" style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      v-loading="loading"
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
    >
      <div slot="customize" style="margin-top:30px">
        <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="8vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane
              :label="$t('label.PFANSUSERFORMVIEW_BASICPERSONALINFORMATION')"
              name="first"
              style="padding-left:0.5%"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                    prop="customername"
                  >
                    <el-input
                      v-model="form.customername"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.sex')" prop="sex">
                    <dicselect :data="form.sex" :disabled="true" code="PR019"
                               style="width:20vw"></dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADFIELD')" prop="adfield">
                    <el-input
                      v-model="form.adfield"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_IDNUMBER')" prop="idnumber">
                    <el-input
                      v-model="form.idnumber"
                      :disabled="true"
                      class="width"
                      maxlength="18"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_BIRTHDAY')" prop="birthday">
                    <el-date-picker
                      v-model="form.birthday"
                      :disabled="true"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                      type="date"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                    <el-input v-model="age" :disabled="true" class="width" disabled style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERVIEW_NATIONALITY')" prop="nationality">
                    <el-input
                      v-model="form.nationality"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_NATION')" prop="nation">
                    <el-input v-model="form.nation" :disabled="true" class="width" maxlength="20"
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CHILDDALIAN')">
                    <span style="margin-right: 1vw ">{{ $t('label.no') }}</span>
                    <el-switch v-model="form.dlnation" :disabled="true" active-value="1" inactive-value="0"></el-switch>
                    <span style="margin-left: 1vw ">{{ $t('label.yes') }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_REGISTER')" prop="register">
                    <el-input
                      v-model="form.register"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PASSPORT')">
                    <el-input
                      v-model="form.passport"
                      :disabled="true"
                      class="width"
                      maxlength="10"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1012VIEW_CAIWUPERSONALCODE')">
                    <el-input
                      v-model="form.caiwupersonalcode"
                      class="width"
                      maxlength="10"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_SECURITY')">
                    <el-input
                      v-model="form.security"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_HOUSEFUND')">
                    <el-input
                      v-model="form.housefund"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_MARITAL')" prop="marital">
                    <el-select
                      v-model="form.marital"
                      :disabled="true"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      style="width:20vw"
                    >
                      <el-option
                        v-for="item in marital_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_MARRYDAY')">
                    <el-date-picker
                      v-model="form.marryday"
                      :disabled="true"
                      :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                      style="width:20vw"
                      type="date"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_CHILDREN')">
                    <span style="margin-right: 1vw ">{{ $t('label.no') }}</span>
                    <el-switch v-model="form.children" :disabled="true" active-value="1" inactive-value="0"></el-switch>
                    <span style="margin-left: 1vw ">{{ $t('label.yes') }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXPERIENCE')" prop="experience">
                    <el-select
                      v-model="form.experience"
                      :disabled="true"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      style="width:20vw"
                    >
                      <el-option
                        v-for="item in experience_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADDRESS')" prop="address">
                    <el-input
                      v-model="form.address"
                      :disabled="true"
                      class="width"
                      maxlength="50"
                      style="width:20vw"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAIL')" prop="email">
                    <el-input v-model="form.email" :disabled="true" class="width" maxlength="100" style="width:20vw"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANSUSERFORMVIEW_MOBILENUMBER')"
                    prop="mobilenumber"
                  >
                    <el-input v-model="form.mobilenumber" :disabled="true" class="width" maxlength="20"
                              style="width:20vw"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PHONE')" prop="phone">
                    <el-input
                      v-model.number="form.phone"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXTENSION')" prop="extension">
                    <el-input
                      v-model.number="form.extension"
                      :disabled="true"
                      class="width"
                      maxlength="20"
                      style="width:20vw"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>


          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import org from '@/view/components/org';
import dicselect from '../../../components/dicselect.vue';
import moment from 'moment';
import {getDictionaryInfo} from '@/utils/customize';

export default {
  name: 'PFANS4002FormView',
  components: {
    EasyNormalContainer,
    org,
    dicselect,
  },
  data() {
    var validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('label.PFANSUSERFORMVIEW_TRUEMOBILE')));
      } else if (!isvalidPhone(value)) {
        callback(new Error(this.$t('label.PFANSUSERFORMVIEW_EFFECTIVEMOBILE')));
      } else {
        let params = {
          id: this.$route.params._id,
          mobilenumber: value,
        };
        this.$store
          .dispatch('usersStore/mobileCheck', params)
          .then(response => {
            if (response.code != 0) {
              callback(new Error(response.message));
            } else {
              callback();
            }
          })
          .catch(err => {
            callback(new Error(err));
          });
      }
    };

    var validateId = (rule, value, callback) => {
      if (
        !/^\d{2}(0[1-9]|[1-9][0-9])\d{2}((((1[6-9]|[2-9]\d)\d{2})(0[13578]|1[02])(0[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(0[13456789]|1[012])(0[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})02(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0229))\d{3}(\d|x|X)$/i.test(
          value,
        )
      ) {
        callback(new Error(this.$t('label.PFANSUSERFORMVIEW_TRUEIDNUMBER')));
      } else {
        callback();
      }
    };

    var centerId = (rule, value, callback) => {
      if (!this.form.centerid || this.form.centerid === '') {
        callback(new Error(this.$t('normal.error_08') + 'center'));
        this.error = this.$t('normal.error_08') + 'center';
      } else {
        callback();
      }
    };

    return {
      //ws-8/14-禅道任务450
      roles: '',
      //ws-8/14-禅道任务450
      age: '',
      code: '',
      code1: 'PG021',
      occupationtypecode: '',
      occupationtypedis: true,
      display: true,
      occupationtypedisplay: true,
      oldageData: null,
      otherOrgs: null,
      houseData: null,
      // add_fjl
      syeData: null,
      syuData: null,
      rankData: null,
      postData: null,
      gsData: null,
      // add_fjl
      medicalData: null,
      gridData: null,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      dialogTableVisible5: false,
      // add_fjl
      dialogTableVisible6: false,
      dialogTableVisible7: false,
      dialogTableVisible8: false,
      dialogTableVisible9: false,
      dialogTableVisible10: false,
      // add_fjl
      loading: false,
      error: '',
      educationTable: [
        {
          time: [],
          school: '',
          notes: '',
        },
      ],
      skillTable: [
        {
          name: '',
          ability: '',
          notes: '',
        },
      ],
      languageTable: [
        {
          programme: '',
          level: '',
          notes: '',
        },
      ],
      beforeWorkTable: [
        {
          time: [],
          company: '',
          postion: '',
          notes: '',
        },
      ],
      workAfterTable: [
        {
          time: [],
          programme: '',
          notes: '',
        },
      ],
      trainTable: [
        {
          time: [],
          programme: '',
          notes: '',
        },
      ],
      rewardTable: [
        {
          programme: '',
          rewardTime: '',
          notes: '',
        },
      ],

      activeName: 'first',
      difference_options: [
        {value: '1', label: this.$t('label.PFANSUSERFORMVIEW_NEWSTAFF')},
        {
          value: '2',
          label: this.$t('label.PFANSUSERFORMVIEW_OLDSTAFF'),
        },
      ],
      rank_options: [
        {value: '0', label: this.$t('label.PFANSUSERVIEW_MEMBERS')},
        {
          value: '1',
          label: this.$t('label.PFANSUSERVIEW_OUTGOING'),
        },
      ],
      laborcontracttype: [
        {value: '0', label: this.$t('label.PFANSUSERFORMVIEW_FIXEDTIME')},
        {
          value: '1',
          label: this.$t('label.PFANSUSERFORMVIEW_NOFIXEDTIME'),
        },
      ],
      marital_options: [
        {value: '0', label: this.$t('label.PFANSUSERFORMVIEW_UNMARRIED')},
        {
          value: '1',
          label: this.$t('label.PFANSUSERFORMVIEW_MARRIED'),
        },
      ],
      experience_options: [
        {value: '0', label: this.$t('label.PFANSUSERFORMVIEW_YES')},
        {
          value: '1',
          label: this.$t('label.PFANSUSERFORMVIEW_NO'),
        },
      ],
      form: {
        //        ws-6/28-禅道141任务
        wheretoleave: '',
        wheretoleave2: '',
        classification: '',
        transfercompany: '',
        other: '',
        //        ws-6/28-禅道141任务
        type: '',
        centername: '',
        groupname: '',
        teamname: '',
        customername: '',
        sex: '',
        adfield: '',
        birthday: '',
        otherorgs: [
          {
            centername: '',
            groupname: '',
            teamname: '',
            centerid: '',
            groupid: '',
            teamid: '',
          },
        ],
        // age: "",
        nationality: '',
        nation: '',
        dlnation: '',
        register: '',
        idnumber: '',
        passport: '',
        security: '',
        housefund: '',
        marital: '0',
        children: '',
        experience: '',
        address: '',
        email: '',
        mobilenumber: '',
        phone: '',
        extension: '',
        graduation: '',
        degree: '',
        educational: '',
        specialty: '',
        graduationday: '',
        workday: '',
        departmentid: [],
        centerid: '',
        groupid: '',
        teamid: '',
        budgetunit: '',
        userid: '',
        jobnumber: '',
        personalcode: '',
        difference: '1',
        post: '',
        rank: '',
        occupationtype: '',
        laborcontracttype: '',
        fixedate: '',
        laborcontractday: '',
        enterday: '',
        upgraded: '',
        annualyear: '',
        annuallastyear: '',
        welfareyear: '',
        welfarelastyear: '',
        restyear: '',
        restlastyear: '',
        seatnumber: '',
        salary: '',
        duty: '',
        basic: '',
        caution: '',
        resignation_date: '',
        reason2: '',
        staffexitprocedure: '',
        oldageinsurance: '',
        houseinsurance: '',
        medicalinsurance: '',
        informationid: '',
        title: '',
        availablestate: '0',
        // ADD-LXX
        yanglaoinsurance: '',
        yiliaoinsurance: '',
        shiyeinsurance: '',
        gongshanginsurance: '',
        shengyuinsurance: '',
        // ADD-LXX
      },
      //add_fjl
      feedingchangeday: '',
      //add_fjl
      disable: false,
      userToRoleId: '',
      userInfo: {
        userAccount: {},
        customerInfo: {},
      },
      baseInfoForm: {
        email: '',
        departmentid: [],
      },
      title: 'title.PFANS4002FORMVIEW',
      isEdit: false,
      status: '0',
      buttonList: [
        {key: 'userSave', name: this.$t('button.save')},
        // {
        //   key: "userSaveToRole",
        //   name: this.$t("label.PFANSUSERFORMVIEW_SAVEANDROLE")
        // }
      ],
      rules: {
        adfield: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_ADFIELD'),
            trigger: 'blur',
          },
        ],
        customername: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME'),
            trigger: 'blur',
          },
        ],
        sex: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.sex'),
            trigger: 'change',
          },
        ],
        birthday: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERVIEW_BIRTHDAY'),
            trigger: 'blur',
          },
        ],
        nation: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_NATION'),
            trigger: 'blur',
          },
        ],
        nationality: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERVIEW_NATIONALITY'),
            trigger: 'blur',
          },
        ],
        register: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_REGISTER'),
            trigger: 'blur',
          },
        ],
        centerid: [
          {
            required: true,
            validator: centerId,
            trigger: 'blur',
          },
        ],
        idnumber: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_IDNUMBER'),
            trigger: 'blur',
          },
          {
            validator: validateId,
            trigger: 'blur',
          },
        ],
        graduation: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_GRADUATION'),
            trigger: 'blur',
          },
        ],
        degree: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_DEGREE'),
            trigger: 'change',
          },
        ],
        educational: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_EDUCATIONAL'),
            trigger: 'change',
          },
        ],
        specialty: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_SPECIALTY'),
            trigger: 'blur',
          },
        ],
        graduationday: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_GRADUATIONDAY'),
            trigger: 'blur',
          },
        ],
        workday: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_WORKDAY'),
            trigger: 'blur',
          },
        ],
        jobnumber: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_JOBNUMBER'),
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.type'),
            trigger: 'change',
          },
        ],
        rank: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_RANK'),
            trigger: 'change',
          },
        ],
        occupationtype: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_OCCUPATIONTYPE'),
            trigger: 'change',
          },
        ],
        post: [
          {
            required: true,
            message:
              this.$t('normal.error_08') + this.$t('label.PFANSUSERVIEW_POST'),
            trigger: 'change',
          },
        ],
        laborcontractday: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_LABORCONTRACTDAY'),
            trigger: 'blur',
          },
        ],
        enterday: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_ENTERDAY'),
            trigger: 'blur',
          },
        ],
        seatnumber: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_SEATNUMBER'),
            trigger: 'blur',
          },
        ],
        basic: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_BASIC'),
            trigger: 'blur',
          },
        ],
        duty: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_DUTY'),
            trigger: 'blur',
          },
        ],
        houseinsurance: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_HOUSEINSURANCE'),
            trigger: 'blur',
          },
        ],
        yanglaoinsurance: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_YANGLAOINSURANCE'),
            trigger: 'blur',
          },
        ],
        yiliaoinsurance: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_YILIAOINSURANCE'),
            trigger: 'blur',
          },
        ],
        shiyeinsurance: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_SHIYEINSURANCE'),
            trigger: 'blur',
          },
        ],
        gongshanginsurance: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_GONGSHANGINSURANCE'),
            trigger: 'blur',
          },
        ],
        shengyuinsurance: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_SHENGYUINSURANCE'),
            trigger: 'blur',
          },
        ],

        email: [
          {
            type: 'email',
            message: this.$t('label.PFANSUSERFORMVIEW_TRUEEMAILADDRESS'),
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  watch: {
    form: {
      handler: function() {
        this.form.salary = this.form.duty + this.form.basic;
      },
      deep: true,
    },
    userToRoleId(val) {
      if (val) {
        this.$router.push({
          name: 'usersToRoleView',
          params: {
            _id: val,
          },
        });
      }
    },
    // birthday(val) {
    //     if (val) {
    //         this.form.age =
    //             moment().format("YYYY") - moment(val).format("YYYY") > 0
    //                 ? moment().format("YYYY") - moment(val).format("YYYY")
    //                 : 0;
    //     }
    // }
  },
  mounted() {

    if (this.$route.params._id) {
      this.getById(this.$route.params._id);
    }
  },
  methods: {
    changeRank(val) {
      if (val) {
        this.display = false;
        this.$nextTick(() => {
          this.form.rank = '';
          if (this.form.type === '0') {
            this.code = 'PR021';
            this.occupationtypecode = 'PR055';
            this.rules.occupationtype[0].required = true;
          } else if (this.form.type === '1') {
            // add_fjl-0604 --修改出向者赋值 start
            // this.code = 'PJ053';
            this.code = '';
            if (this.$i18n) {
              this.form.rank = this.$t('label.PFANS1028VIEW_OTHER');
            }
            this.rules.occupationtype[0].required = false;
            // add_fjl-0604 --修改出向者赋值 end
          }
          this.form.occupationtype = '';
          this.occupationtypedisplay = true;
          this.display = true;
        });
      } else {
        if (this.form.type === '0') {
          this.code = 'PR021';
          this.occupationtypecode = 'PR055';
          this.rules.occupationtype[0].required = true;
          if (
            this.form.rank === 'PR021001' ||
            this.form.rank === 'PR021002' ||
            this.form.rank === 'PR021003' ||
            this.form.rank === 'PR021004'
          ) {
            this.occupationtypedis = true;
            this.form.occupationtype = 'PR055001';
          } else {
            this.occupationtypedis = false;
          }
        } else if (this.form.type === '1') {
          this.form.occupationtype = '';
          // add_fjl-0604 --修改出向者赋值 start
          // this.code = 'PJ053';
          this.code = '';
          if (this.$i18n) {
            this.form.rank = this.$t('label.PFANS1028VIEW_OTHER');
          }
          this.rules.occupationtype[0].required = false;
          // add_fjl-0604 --修改出向者赋值 end
        }
      }
    },
    getById(_id) {
      this.loading = true;
      let params = {
        userid: _id,
      };
      this.$store
        .dispatch('usersStore/getById', params)
        .then(response => {
          this.form = response.customerInfo.userinfo;
          //add-ws-7/10-禅道141问提修改
          if (response.customerInfo.userinfo.resignation_date != null && response.customerInfo.userinfo.resignation_date != '') {
            this.form.resignation_date = moment(response.customerInfo.userinfo.resignation_date).format('YYYY-MM-DD');
          }
          //add-ws-7/10-禅道141问提修改
          if (response.customerInfo.userinfo.birthday != '' && response.customerInfo.userinfo.birthday != null) {
            let birthdays = new Date(
              response.customerInfo.userinfo.birthday.replace(/-/g, '/'),
            );
            let d = new Date();
            let age = 0;
            let agenew = 0;
            age = d.getFullYear() - birthdays.getFullYear();
            agenew = d.getFullYear() - birthdays.getFullYear();
            if (
              d.getMonth() > birthdays.getMonth() ||
              (d.getMonth() == birthdays.getMonth() &&
                d.getDate() > birthdays.getDate())
            ) {
              agenew = age;
            } else {
              agenew = age - 1;
            }
            this.age = agenew;
          } else {
            this.age = 0;
          }
          this.status = response.customerInfo.status;
          this.userInfo.userAccount = response.userAccount;
          this.userInfo.customerInfo = response.customerInfo;
          this.educationTable = this.userInfo.customerInfo.userinfo.educationTable;
          if (this.educationTable == null) {
            this.educationTable = [
              {
                time: [],
                school: '',
                notes: '',
              },
            ];
          }
          this.skillTable = this.userInfo.customerInfo.userinfo.skillTable;
          if (this.skillTable == null) {
            this.skillTable = [
              {
                name: '',
                ability: '',
                notes: '',
              },
            ];
          }
          this.languageTable = this.userInfo.customerInfo.userinfo.languageTable;
          if (this.languageTable == null) {
            this.languageTable = [
              {
                programme: '',
                level: '',
                notes: '',
              },
            ];
          }
          this.beforeWorkTable = this.userInfo.customerInfo.userinfo.beforeWorkTable;
          if (this.beforeWorkTable == null) {
            this.beforeWorkTable = [
              {
                time: [],
                company: '',
                postion: '',
                notes: '',
              },
            ];
          }
          this.workAfterTable = this.userInfo.customerInfo.userinfo.workAfterTable;
          if (this.workAfterTable == null) {
            this.workAfterTable = [
              {
                time: [],
                programme: '',
                notes: '',
              },
            ];
          }
          this.trainTable = this.userInfo.customerInfo.userinfo.trainTable;
          if (this.trainTable == null) {
            this.trainTable = [
              {
                time: [],
                programme: '',
                notes: '',
              },
            ];
          }
          this.rewardTable = this.userInfo.customerInfo.userinfo.rewardTable;
          if (this.rewardTable == null) {
            this.rewardTable = [
              {
                programme: '',
                rewardTime: '',
                notes: '',
              },
            ];
          }
          // this.gridData = this.userInfo.customerInfo.userinfo.gridData;
          // this.oldageData = this.userInfo.customerInfo.userinfo.oldageData;
          // this.houseData = this.userInfo.customerInfo.userinfo.houseData;
          // this.medicalData = this.userInfo.customerInfo.userinfo.medicalData;
          // add_fjl_05/21   --添加履历的处理
          //给料履历
          let letgridData = this.userInfo.customerInfo.userinfo.gridData;
          if (letgridData !== null && letgridData !== '' && letgridData !== undefined) {
            this.gridData = [];
            for (let g = 0; g < letgridData.length; g++) {
              //最后一次的变更日期
              if (letgridData[g].date !== null && letgridData[g].date !== '') {
                if ((letgridData[g].basic !== null || letgridData[g].basic !== '')
                  && (letgridData[g].duty !== null || letgridData[g].duty !== '')) {
                  this.feedingchangeday = letgridData[0].date;
                  let gridData = {};
                  gridData.basic = letgridData[g].basic;
                  gridData.duty = letgridData[g].duty;
                  if (letgridData[g].date.length != 10) {
                    gridData.date = moment(letgridData[g].date).format('YYYY-MM-DD');
                  } else {
                    gridData.date = letgridData[g].date;
                  }
                  this.gridData.push(gridData);
                }
              }
            }
          }
          //养老保险基数履历
          let oldageData = this.userInfo.customerInfo.userinfo.oldageData;
          if (oldageData !== null && oldageData !== '' && oldageData !== undefined) {
            this.oldageData = [];
            for (let g = 0; g < oldageData.length; g++) {
              if (oldageData[g].date !== null && oldageData[g].date !== '' &&
                oldageData[g].basic !== null && oldageData[g].basic !== '') {
                let letoldageData = {};
                letoldageData.basic = oldageData[g].basic;
                if (oldageData[g].date.length != 10) {
                  letoldageData.date = moment(oldageData[g].date).format('YYYY-MM-DD');
                } else {
                  letoldageData.date = oldageData[g].date;
                }
                this.oldageData.push(letoldageData);
              }
            }
          }
          //住房保险基数履历
          let houseData = this.userInfo.customerInfo.userinfo.houseData;
          if (houseData !== null && houseData !== '' && houseData !== undefined) {
            this.houseData = [];
            for (let g = 0; g < houseData.length; g++) {
              if (houseData[g].date !== null && houseData[g].date !== '' &&
                houseData[g].basic !== null && houseData[g].basic !== '') {
                let lethouseData = {};
                lethouseData.basic = houseData[g].basic;
                if (houseData[g].date.length != 10) {
                  lethouseData.date = moment(houseData[g].date).format('YYYY-MM-DD');
                } else {
                  lethouseData.date = houseData[g].date;
                }
                this.houseData.push(lethouseData);
              }
            }
          }
          //医疗保险基数履历
          let medicalData = this.userInfo.customerInfo.userinfo.medicalData;
          if (medicalData !== null && medicalData !== '' && medicalData !== undefined) {
            this.medicalData = [];
            for (let g = 0; g < medicalData.length; g++) {
              if (medicalData[g].date !== null && medicalData[g].date !== '' &&
                medicalData[g].basic !== null && medicalData[g].basic !== '') {
                let letmedicalData = {};
                letmedicalData.basic = medicalData[g].basic;
                if (medicalData[g].date.length != 10) {
                  letmedicalData.date = moment(medicalData[g].date).format('YYYY-MM-DD');
                } else {
                  letmedicalData.date = medicalData[g].date;
                }
                this.medicalData.push(letmedicalData);
              }
            }
          }
          //失业保险基数履历
          let syeData = this.userInfo.customerInfo.userinfo.syeData;
          if (syeData !== null && syeData !== '' && syeData !== undefined) {
            this.syeData = [];
            for (let g = 0; g < syeData.length; g++) {
              if (syeData[g].date !== null && syeData[g].date !== '' &&
                syeData[g].basic !== null && syeData[g].basic !== '') {
                let letsyeData = {};
                letsyeData.basic = syeData[g].basic;
                if (syeData[g].date.length != 10) {
                  letsyeData.date = moment(syeData[g].date).format('YYYY-MM-DD');
                } else {
                  letsyeData.date = syeData[g].date;
                }
                this.syeData.push(letsyeData);
              }
            }
          }
          //生育保险基数履历
          let syuData = this.userInfo.customerInfo.userinfo.syuData;
          if (syuData !== null && syuData !== '' && syuData !== undefined) {
            this.syuData = [];
            for (let g = 0; g < syuData.length; g++) {
              if (syuData[g].date !== null && syuData[g].date !== '' &&
                syuData[g].basic !== null && syuData[g].basic !== '') {
                let letsyuData = {};
                letsyuData.basic = syuData[g].basic;
                if (syuData[g].date.length != 10) {
                  letsyuData.date = moment(syuData[g].date).format('YYYY-MM-DD');
                } else {
                  letsyuData.date = syuData[g].date;
                }
                this.syuData.push(letsyuData);
              }
            }
          }
          //工伤保险基数履历
          let gsData = this.userInfo.customerInfo.userinfo.gsData;
          if (gsData !== null && gsData !== '' && gsData !== undefined) {
            this.gsData = [];
            for (let g = 0; g < gsData.length; g++) {
              if (gsData[g].date !== null && gsData[g].date !== '' &&
                gsData[g].basic !== null && gsData[g].basic !== '') {
                let letgsData = {};
                letgsData.basic = gsData[g].basic;
                if (gsData[g].date.length != 10) {
                  letgsData.date = moment(gsData[g].date).format('YYYY-MM-DD');
                } else {
                  letgsData.date = gsData[g].date;
                }
                this.gsData.push(letgsData);
              }
            }
          }
          //rank
          let rankData = this.userInfo.customerInfo.userinfo.rankData;
          if (rankData !== null && rankData !== '' && rankData !== undefined) {
            this.rankData = [];
            for (let g = 0; g < rankData.length; g++) {
              if (rankData[g].date !== null && rankData[g].date !== '' &&
                rankData[g].basic !== null && rankData[g].basic !== '') {
                let letrankData = {};
                if (rankData[g].basic.length >= 8) {
                  letrankData.basic = getDictionaryInfo(rankData[g].basic).value1;
                } else {
                  letrankData.basic = rankData[g].basic;
                }
                if (rankData[g].date.length != 10) {
                  letrankData.date = moment(rankData[g].date).format('YYYY-MM-DD');
                } else {
                  letrankData.date = rankData[g].date;
                }
                this.rankData.push(letrankData);
              }
            }
          }
          //职务
          let postData = this.userInfo.customerInfo.userinfo.postData;
          if (postData !== null && postData !== '' && postData !== undefined) {
            this.postData = [];
            for (let g = 0; g < postData.length; g++) {
              if (postData[g].date !== null && postData[g].date !== '' &&
                postData[g].basic !== null && postData[g].basic !== '') {
                let letpostData = {};
                if (postData[g].basic.length >= 8) {
                  letpostData.basic = getDictionaryInfo(postData[g].basic).value1;
                } else {
                  letpostData.basic = postData[g].basic;
                }
                if (postData[g].date.length != 10) {
                  letpostData.date = moment(postData[g].date).format('YYYY-MM-DD');
                } else {
                  letpostData.date = postData[g].date;
                }
                this.postData.push(letpostData);
              }
            }
          }
          // add_fjl_05/21   --添加履历的处理
          this.changeRank();
          this.loading = false;
        })
        .catch(err => {
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },

    cancelForm() {
      this.$refs.container.buttonClick('back');
    },

    buttonClick(val) {
      this.loading = true;
      if (val === 'userSave') {
        this.userSave('userSave');
      }
    },
    userSave(btnkey) {
      this.$refs['form'].validate((valid, obj) => {
        if (valid) {
          this.userInfo.userAccount.account = this.form.adfield;
          // this.userInfo.userAccount.password = this.form.adfield;
          this.userInfo.userAccount.usertype = '0';
          // add_fjl_05/22  --去除间接部门空的数据
          if (this.form.otherorgs != null) {
            if (this.form.otherorgs.length > 0) {
              this.form.otherorgs = this.form.otherorgs.filter(item => {
                return ((item.centerid !== '' && item.centerid !== null)
                  || (item.groupid !== '' && item.groupid !== null)
                  || (item.teamid !== '' && item.teamid !== null));
              });
            }
          }
          // add_fjl_05/22  --去除间接部门空的数据
          this.userInfo.customerInfo.userinfo = this.form;
          this.userInfo.customerInfo.userinfo.educationTable = this.educationTable;
          this.userInfo.customerInfo.userinfo.skillTable = this.skillTable;
          this.userInfo.customerInfo.userinfo.languageTable = this.languageTable;
          this.userInfo.customerInfo.userinfo.beforeWorkTable = this.beforeWorkTable;
          this.userInfo.customerInfo.userinfo.workAfterTable = this.workAfterTable;
          this.userInfo.customerInfo.userinfo.trainTable = this.trainTable;
          this.userInfo.customerInfo.userinfo.rewardTable = this.rewardTable;
          this.userInfo.customerInfo.type = '1';
          this.userInfo.customerInfo.userinfo.status = this.status;
          this.userInfo.customerInfo.status = this.status;
          this.userInfo.userAccount.status = this.status;
          if (this.form.teamid) {
            this.userInfo.customerInfo.userinfo.companyid = [this.form.teamid];
          } else if (this.form.groupid) {
            this.userInfo.customerInfo.userinfo.companyid = [this.form.groupid];
          } else if (this.form.centerid) {
            this.userInfo.customerInfo.userinfo.companyid = [
              this.form.centerid,
            ];
          }
          this.$store
            .dispatch('usersStore/userSave', this.userInfo)
            .then(response => {
              this.$refs.container.buttonClick('back');
              this.loading = false;
              this.$message.success({
                message: this.$t('label.PFANSUSERFORMVIEW_SUBMITSUCCESSFULLY'),
                type: 'success',
              });
              this.getUserList();
            })
            .catch(err => {
              this.$message.error({
                message: err,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
      });
    },
    getUserList() {
      let params = {
        orgtype: '1',
      };
      this.$store
        .dispatch('usersStore/getUserTableList', params)
        .then(response => {
          this.$store.commit('global/SET_USERLIST', response);
        })
        .catch(err => {
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.el-dialog__title {
  color: #75a7ef;
}

.el-dialog__body {
  padding-top: 0px;
}

.width {
  width: 10.7rem;
}

.user_form {
  .el-input--medium .el-input__inner {
    border: none;
  }

  a {
    cursor: pointer;
    background: transparent;
    color: #5d9cec;
    text-decoration: none;
  }

  a:hover {
    color: #fb6e52;
    text-decoration: underline;
  }
}
</style>

