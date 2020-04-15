<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2vw">
      <el-form :model="form" label-position="top" label-width="8vw" ref="form">
        <div class="block">
          <el-date-picker
            v-model="form.years"
            type="year"
            @change="yearChange"
            format="yyyy"
            :placeholder="$t('normal.error_09')">
          </el-date-picker>
        </div>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane
            :label="$t('label.PFANS1038VIEW_REALISTIC')"
            name="first"
          >
            <!--            111-->
            <el-table
              :data="tableData"
              border stripe
              :style="{width:(this.$route.params.type === 0?'621px':'801px'),marginLeft:(this.$route.params.type === 0?'11%':'6%'),marginTop: '1%'}"
              header-cell-class-name="sub_bg_color_blue">
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="suppliername"
                :label="$t('label.PFANS1038VIEW_STATIONED')"
                width="180"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="$t('label.PFANS1038VIEW_MEMBER')"
                width="180"
                align="center">
              </el-table-column>
              <el-table-column
                prop="thisyear"
                :label="getThisYearLevel"
                width="180"
                align="center"
                :formatter="formatterDic">
              </el-table-column>
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="180"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select size="small"
                             clearable
                             v-model="scope.row.nextyear"
                             :disabled="disabled"
                             :placeholder="$t('normal.error_09')">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"

                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="entermouth"
                :label="$t('label.PFANS1038VIEW_ADOPTED')"
                width="240"
                align="center"
                v-if="show"
                :formatter="formatterDic">
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane :label="$t('label.PFANS1038VIEW_NEWHIRES')" name="second">
            <el-table
              :data="newTableData"
              border stripe
              :style="{width:(this.$route.params.type === 0?'51vw':'69vw'),marginLeft:(this.$route.params.type === 0?'5%':'0%'),marginTop: '1%'}"
              header-cell-class-name="sub_bg_color_blue">
              <el-table-column
                label="No."
                type="index"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="supchinese"
                :label="$t('label.PFANS1038VIEW_STATIONED')"
                width="160"
                v-if="this.$route.params.type === 0 ? false : true"
                align="center">
                <template slot-scope="scope">
                  <el-select clearable size="small" v-model="scope.row.supchinese" :disabled="disabled"
                             :placeholder="$t('normal.error_09')">
                    <el-option
                      v-for="item in externalOption"
                      :key="item.supplierinfor_id"
                      :label="item.supchinese"
                      :value="item.supplierinfor_id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                :label="$t('label.PFANS1038VIEW_MEMBER')"
                width="180"
                align="center"
                v-if="show1">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.name" :disabled="disabled"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="thisyear"
                :label="getThisYearLevel"
                width="180"
                align="center"
                v-if="show1">
                <template slot-scope="scope">
                  <el-select
                    clearable
                    size="small"
                    v-model="scope.row.thisyear"
                    :placeholder="$t('normal.error_09')"
                    :disabled="true"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="nextyear"
                :label="getNextYearLevel"
                width="200"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select clearable size="small" v-model="scope.row.nextyear" :disabled="disabled"
                             :placeholder="$t('normal.error_09')">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="entermouth"
                :label="$t('label.PFANS1038VIEW_ADOPTED')"
                width="220"
                align="center"
              >
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.entermouth"
                    type="month"
                    style="width:10vw"
                    :disabled="disabled"
                    size="small"
                    v-if="!scope.row.isoutside">
                  </el-date-picker>
                  <span v-else>{{$t('label.PFANS1038VIEW_OUTSIDE')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="isoutside"
                :label="$t('label.PFANS1038VIEW_WHETHER')"
                width="100"
                align="center"
                v-if="this.$route.params.type === 0 ? false : true">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isoutside"
                    :disabled="disabled"
                    @change="val => changeOption(val,scope.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, newTableData)"
                    type="danger"
                    size="small"
                    :disabled="disabled"
                    plain
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow"
                    type="primary"
                    size="small"
                    :disabled="disabled"
                    plain
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import {Message} from 'element-ui';
    import {getOrgInfoByUserId} from '@/utils/customize';
    import moment from "moment";
    import {getDictionaryInfo} from "../../../../utils/customize";

    export default {
        name: 'PFANS1038FormView',
        components: {
            EasyNormalContainer
        },
        data() {
            return {
                enterMouth: "",
                disabled: "true",
                options: [{
                    value: 'PR021001',
                    label: 'R3'
                }, {
                    value: 'PR021002',
                    label: 'R4'
                }, {
                    value: 'PR021003',
                    label: 'R5'
                }, {
                    value: 'PR021004',
                    label: 'R6'
                }, {
                    value: 'PR021005',
                    label: 'R7'
                }, {
                    value: 'PR021006',
                    label: 'R8C'
                }, {
                    value: 'PR021007',
                    label: 'R8B'
                }, {
                    value: 'PR021008',
                    label: 'R8A'
                }, {
                    value: 'PR021009',
                    label: 'R9A'
                }, {
                    value: 'PR021010',
                    label: 'R9B'
                }, {
                    value: 'PR021011',
                    label: 'R10'
                }, {
                    value: 'PR021012',
                    label: 'R11A'
                }, {
                    value: 'PR021013',
                    label: 'R11B'
                }, {
                    value: 'PJ053001',
                    label: this.$t("label.PFANS1036FORMVIEW_COUNSELORUP")
                }, {
                    value: 'PJ053002',
                    label: this.$t("label.PFANS1036FORMVIEW_CHANCELLORDOWN")
                }],

                loading: false,
                externalOption: "",
                newTableData: [{"name": "", "isoutside": false, "entermouth": null}],
                tableData: [],
                activeName: "first",
                buttonList: [],
                show: false,
                show1: false,
                titles: this.$route.params.type === 0 ? "label.PFANS1038VIEW_MEMBERSHIP" : "label.PFANS1038VIEW_OUTOFHOME",
                form: {
                    //years: parseInt(moment(new Date()).format("YYYY"))+1+ "",
                  years:parseInt(moment(new Date()).format("MM")) >=  4 ? parseInt(moment(new Date()).format("YYYY"))+1+ "" : moment(new Date()).format("YYYY"),
                  //,"YYYY-MM-DD").valueOf() >= moment(moment(new Date(),"YYYY") + "04-01").valueOf() ? parseInt(moment(new Date(),"YYYY")) +1+"" : moment(new Date(),"YYYY")+"",
                }
            };
        },
        computed: {

            getThisYearLevel: function () {
                // if (this.form.years) {
                     return parseInt(this.form.years)-1 + "";
                // } else {
                //     this.form.years = moment().subtract(3, 'M').format('YYYY');
                //     return parseInt(this.form.years)-1 + "";
                // }
            },
            getNextYearLevel: function () {
                return (parseInt(this.form.years)) + "";
            }
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (!this.disabled) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        icon: "el-icon-check"
                    }
                ];
            }
        },
        mounted() {
            this.getExternal();
            if (this.$route.params.type === 0) {
                this.show = false;
            } else if (this.$route.params.type !== 0) {
                this.show = false;
            }
            if (this.$route.params._id) {
                this.getOne(this.$route.params._id);
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.$route.params.type === 0 ? this.getCustomerInfo(rst.groupId || "") : this.getExpatriatesinfor(rst.groupId || "");
                }
            }
        },
        methods: {
            yearChange(value) {
                this.form.years = moment(value).format('YYYY');
                this.newTableData[0].entermouth =  moment(value).format('YYYY')+'-'+moment(new Date()).format('MM');
                this.enterMouth =  moment(value).format('YYYY')+'-'+moment(new Date()).format('MM');
            },
            checkRequire() {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].nextyear === undefined) {
                        this.activeName = "first";
                    }
                }
            },
            getCustomerInfo(id) {
                this.$store
                    .dispatch('PFANS1038Store/getCustomerInfo', id)
                    .then(response => {
                        if (response.length > 0) {
                            this.tableData = response.map(
                                res => {
                                    return {
                                        name: res.userinfo.customername,
                                        userid: res.userid,
                                        thisyear: res.userinfo.rank,
                                        nextyear:res.userinfo.rank
                                    };
                                }
                            )
                          // for(let i =0;i<this.tableData.length;i++){
                          //   this.tableData[i].nextyear = this.tableData[i].thisyear;
                          // }
                        }
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    })
            },
            getExpatriatesinfor(id) {
                this.$store
                    .dispatch('PFANS1038Store/getExpatriatesinfor', id)
                    .then(response => {
                        if (response.length > 0) {
                            this.tableData = response;
                        }
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    })
            },
            getExternal() {
                this.$store
                    .dispatch('PFANS1038Store/getExternal')
                    .then(response => {
                        this.$store.commit("global/SET_SUPPLIERINFOR", response);
                        if (response.length > 0) {
                            this.externalOption = response;
                        }
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    })
            },
            getOne(id) {
                this.loading = true;
                this.$store
                    .dispatch("PFANS1038Store/getOne", id)
                    .then(response => {
                        this.loading = false;
                        this.form = response;
                        this.form.years = response.years+ "";
                        this.tableData = JSON.parse(this.form.employed);
                        this.newTableData = JSON.parse(this.form.newentry);
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: "error",
                            duration: 5 * 1000
                        });
                        this.loading = false;
                    });
            },
            formatterDic(row, column) {
                if (column.property === "thisyear") {
                    if (row[column.property]) {
                        let dic = getDictionaryInfo(row[column.property]);
                        return dic === null ? "-" : dic.value1;
                    } else {
                        return "-";
                    }
                } else if (column.property === "entermouth") {
                    if (row[column.property] === "BP025004") {
                        if (this.i18n) {
                            return this.$t('label.PFANS1038VIEW_OUTSIDE')
                        }
                    }
                    return "-";
                } else {
                    return row[column.property];
                }
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            addRow() {
                this.newTableData.push({"name": "", "isoutside": false, "entermouth": this.enterMouth});
            },
            changeOption(val, row) {
                if (val) {
                    if (this.i18n) {
                        row.entermouth = this.$t('label.PFANS1038VIEW_OUTSIDE');
                    }
                } else {
                    row.entermouth = null;
                }
            },
            buttonClick(val) {
                this.checkRequire();
                this.form.employed = JSON.stringify(this.tableData);
                this.form.newentry = JSON.stringify(this.newTableData);
                this.form.type = this.$route.params.type;
                if (this.userlist !== null && this.userlist !== '') {
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.centerid = rst.centerId;
                    this.form.groupid = rst.groupId;
                }
                let error = false;
                let error1 = false;
                if (this.$route.params.type === 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].nextyear == undefined) {
                            error = true;
                        }
                    }
                    for (let i = 0; i < this.newTableData.length; i++) {
                        if (this.newTableData[i].nextyear === undefined || this.newTableData[i].nextyear === "" || this.newTableData[i].entermouth === "" || this.newTableData[i].entermouth === undefined) {
                            error1 = true;
                        }
                    }
                }
                if (this.$route.params.type !== 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].nextyear == undefined) {
                            error = true;
                        }
                    }
                    for (let i = 0; i < this.newTableData.length; i++) {
                        if (this.newTableData[i].nextyear === undefined || this.newTableData[i].nextyear === "" || this.newTableData[i].entermouth === "" || this.newTableData[i].entermouth === undefined || this.newTableData[i].supchinese === "") {
                            error1 = true;
                        }
                    }
                }

                if (error) {
                    Message({
                        message: this.$t('normal.error_08') +
                            this.$t('label.PFANS1038VIEW_REALISTIC') +
                            this.$t('label.PFANS1038VIEW_NEWHIRES2'),
                        type: 'error',
                        duration: 5 * 1000,
                    });
                } else if (error1) {
                    Message({
                        message: this.$t('label.PFANS1038VIEW_INFORMATIONSUCCESS'),
                        type: 'error',
                        duration: 5 * 1000,
                    });
                } else if (!this.$route.params._id) {
                    this.loading = true;
                    this.$store
                        .dispatch("PFANS1038Store/insert", this.form)
                        .then(response => {
                            this.loading = false;
                            this.$message({
                                message: this.$t("normal.success_01"),
                                type: "success"
                            });
                            if (this.$store.getters.historyUrl) {
                                this.$router.push(this.$store.getters.historyUrl);
                            }
                        })
                        .catch(err => {
                            this.loading = false;
                            Message({
                                message: err,
                                type: "error",
                                duration: 5 * 1000
                            });
                        });
                } else {
                    this.loading = true;
                    this.$store
                        .dispatch("PFANS1038Store/update", this.form)
                        .then(response => {
                            this.loading = false;
                            this.$message({
                                message: this.$t("normal.success_02"),
                                type: "success"
                            });
                            if (val !== "update") {
                                if (this.$store.getters.historyUrl) {
                                    this.$router.push(this.$store.getters.historyUrl);
                                }
                            }
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
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
