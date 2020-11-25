<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      @buttonClick="buttonClick"
      ref="container"
      :title="title"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px">
          <el-form-item>
            <el-row style="margin-top: 20px">
              <el-col :span="10">
                <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')">
                  <el-select v-model="group_id" style="width: 20vw"
                             @change="changeGroup">
                    <el-option
                      v-for="item in optionsdata"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-table
              :data="tableData"
              border stripe
              header-cell-class-name="sub_bg_color_blue">
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="userid"
                :label="$t('label.PFANS2036VIEW_USERID')"
                width="180"
                align="center">
                <template slot-scope="scope">
                  <user
                    :no="scope.row"
                    :disabled="true"
                    :selectType="selectType"
                    :userlist="scope.row.userid"
                    @getUserids="getCitationUserid">
                  </user>
                </template>
              </el-table-column>
              <el-table-column
                prop="prank"
                :label="$t('label.PFANS2036VIEW_RANKS')"
                width="180"
                align="center">
                <template slot-scope="scope">
                  <dicselect
                    :code="code1"
                    :data="scope.row.prank"
                    :disabled="!disabled"
                    :multiple="multiple"
                    :no="scope.row"
                    @change="changePrank"
                    style="width: 100%">
                  </dicselect>
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="onjob"-->
                <!--:label="$t('label.PFANS2036VIEW_ONJOB')"-->
                <!--width="180"-->
                <!--align="center">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-input-->
                    <!--v-model="scope.row.onjob"-->
                    <!--style="width:10vw"-->
                    <!--:disabled="true"-->
                    <!--size="small">-->
                  <!--</el-input>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                prop="aptojucost"
                :label="$t('label.PFANS2036VIEW_APTOJUCOST')"
                width="210"
                align="center">
                <template slot-scope="scope">
                  <el-input-number
                    :disabled="!disabled"
                    maxlength="20"
                    :no="scope.row"
                    v-model="scope.row.aptojucost"
                    :precision="2"
                    controls-position="right">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                prop="jutomacost"
                :label="$t('label.PFANS2036VIEW_JUTOMACOST')"
                width="210"
                align="center">
                <template slot-scope="scope">
                  <el-input-number
                    :disabled="!disabled"
                    maxlength="20"
                    :no="scope.row"
                    v-model="scope.row.jutomacost"
                    :precision="2"
                    controls-position="right">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                prop="remarks"
                :label="$t('label.PFANS2036VIEW_REMARKS')"
                width="300"
                align="center">
                <template slot-scope="scope">
                  <el-input
                    :disabled="!disabled"
                    :no="scope.row"
                    v-model="scope.row.remarks"
                    >
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import {getDictionaryInfo, getDownOrgInfo, getOrgInfo, getUserInfo} from '../../../../utils/customize';
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect";
  import EasyNormalTable from "@/components/EasyNormalTable";
  import user from "../../../components/user.vue";
  import moment from "moment";
  import {Message} from "element-ui";

  export default {
    name: "PFANS2036FormView",
    components: {
      dicselect,
      EasyNormalContainer,
      EasyNormalTable,
      user
    },
    data() {
      return {
        title: 'title.PFANS2036FormView',
        loading: false,
        group_id: '',
        buttonList: [],
        optionsdata: [],
        disabled: false,
        code1: 'PR021',
        years: 2020,
        tableData: [],
        multiple: false,
        selectType: "Single",
      };
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
    mounted() {
      this.getById();
      this.getPersonalCost();
    },
    methods: {
      getPersonalCost() {
        let groupid = '';
        this.loading = true;
        if (this.group_id) {
          groupid = this.group_id;
        }
        let params = {
          groupid: groupid,
          yearsantid: this.$route.params._id
        }
        this.$store
          .dispatch("PFANS2036Store/getPersonalCost", params)
          .then(response => {
            this.tableData = response;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            Message({
              message: err,
              type: "error",
              duration: 5 * 1000
            });
          });
      },
      getById() {
        this.loading = true;
        const vote1 = [];
        if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7'
          || this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'
          || this.$store.getters.userinfo.userid === '5e78b2254e3b194874180f31'
          || this.$store.getters.userinfo.userid === '5e78b2004e3b194874180e21'
          || this.$store.getters.userinfo.userid === '5e78b2064e3b194874180e4d') {
          let centerId = '5e7858a08f4316308435112c';
          let orgs = getDownOrgInfo(centerId);
          if (orgs) {
            if (orgs.length > 0) {
              if (getDownOrgInfo(orgs[0]._id).length > 0) {
                this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
              }
            }
            for (let center of orgs) {
              let centers = getDownOrgInfo(center._id);
              if (centers) {
                for (let group of centers) {
                  vote1.push(
                    {
                      value: group._id,
                      lable: group.companyname,
                    },
                  );
                }
              }
            }
          }
          this.optionsdata = vote1;
        }
        this.loading = false;
      },
      changeGroup(val) {
        this.group_id = val;
        if (this.group_id) {
          this.getPersonalCost();
        }
      },
      changePrank(val, row) {
        row.prank = val;
      },
      getCitationUserid(val, row) {
        row.userid = val;
      },
      buttonClick(val) {
        if (val === "save") {
          alert(111)
          this.loading = true;
          console.log(this.tableData)
          this.$store
            .dispatch("PFANS2036Store/upPersonalCost", this.tableData)
            .then(response => {
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
              });
              this.loading = false;
              this.getPersonalCost();
            })
            .catch(err => {
              this.loading = false;
              Message({
                message: err,
                type: "error",
                duration: 5 * 1000
              });
            });
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
