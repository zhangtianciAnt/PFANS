<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title" @disabled="setdisabled"
      @buttonClick="buttonClick"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form :rules="rules" label-width="8vw" label-position="top" ref="reff">
          <el-row>
            <el-form-item :label="$t(this.$route.params.codename)">
              <el-table :data="tableD" header-cell-class-name="sub_bg_color_blue" border stripe>
                <el-table-column :label="$t('label.PFANS8009VIEW_CODE')" align="center" fixed width="130">
                  <template slot-scope="scope">
                    <el-input :disabled="true" v-model="scope.row.code">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE1')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value1">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE2')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value2">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE3')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value3">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE4')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value4">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE5')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value5">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE6')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value6">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE7')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value7">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE8')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value8">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE9')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value9">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableD)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
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
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import {Message} from "element-ui";

    export default {
        name: "PFANS8009FormView",
        components: {
            EasyNormalContainer,
        },
        data() {
            return {
                loading: false,
                title: '',
                letcode: '',
                disable: false,
                buttonList: [],
                tableD: [
                    {
                        code: "",
                        type: "",
                        valie1: "",
                        valie2: "",
                        valie3: "",
                        valie4: "",
                        valie5: "",
                        valie6: "",
                        valie7: "",
                        valie8: "",
                        valie9: "",
                        pcode: "",
                        status: "",
                    }
                ],
                rules: {
                    // value1: [{
                    //     required: true,
                    //     message: this.$t('normal.error_09') + this.$t('label.start'),
                    //     trigger: 'change',
                    // }],
                    // value2: [{
                    //     required: true,
                    //     message: this.$t('normal.error_09') + this.$t('label.start'),
                    //     trigger: 'change',
                    // }],
                }
            };
        },
        mounted() {
            this.disable = this.$route.params.disabled;
            if (this.disable) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        disabled: false,
                        icon: "el-icon-check"
                    }
                ];
            }
            if (this.$route.params.code) {
                this.data = [];
                this.loading = true;
                this.$store
                    .dispatch('PFANS8009Store/getDictionary', {"pcode": this.$route.params.code})
                    .then(response => {
                        if (response.length > 0) {
                            this.letcode = response[response.length - 1].code;
                            this.tableD = response;
                        }
                        this.loading = false;
                    });
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
          setdisabled(val){
            if(this.$route.params.disabled){
              this.disabled = val;
            }
          },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableD = [
                        {
                            code: this.letcode.substring(0, 5) + '001',
                            type: "",
                            valie1: "",
                            valie2: "",
                            valie3: "",
                            valie4: "",
                            valie5: "",
                            valie6: "",
                            valie7: "",
                            valie8: "",
                            valie9: "",
                            pcode: "",
                            status: "",
                        }
                    ]
                }
            },
            addRow() {
                let code = parseInt(this.letcode.substring(5, this.letcode.length)) + 1;
                if (code.toString().length === 1) {
                    this.letcode = this.letcode.substring(0, 5) + '00' + code.toString();
                } else if (code.toString().length === 2) {
                    this.letcode = this.letcode.substring(0, 5) + '0' + code.toString();
                }
                this.tableD.push({
                    code: this.letcode,
                    type: "",
                    valie1: "",
                    valie2: "",
                    valie3: "",
                    valie4: "",
                    valie5: "",
                    valie6: "",
                    valie7: "",
                    valie8: "",
                    valie9: "",
                    pcode: "",
                    status: "",
                });
            },
            buttonClick(val) {
                if (val === 'back') {
                    this.$router.push({
                        name: 'PFANS8009View',
                        params: {
                            codetype: this.$route.params.codetype,
                        },
                    });
                }
                if (val === "save") {
                    // this.$refs['reff'].validate(valid => {
                    //     alert(3);
                    //     if (valid) {
                    //         alert(4);
                    //
                    //     }
                    // });

                    this.dictionarylist = [];
                    for (let i = 0; i < this.tableD.length; i++) {
                        this.dictionarylist.push({
                            code: this.tableD[i].code,
                            type: this.tableD[i].type,
                            value1: this.tableD[i].value1,
                            value2: this.tableD[i].value2,
                            value3: this.tableD[i].value3,
                            value4: this.tableD[i].value4,
                            value5: this.tableD[i].value5,
                            value6: this.tableD[i].value6,
                            value7: this.tableD[i].value7,
                            value8: this.tableD[i].value8,
                            value9: this.tableD[i].value9,
                            pcode: this.tableD[i].pcode,
                            status: this.tableD[i].status,
                        });
                    }
                    if (this.$route.params.code) {
                        this.$store
                            .dispatch('PFANS8009Store/upDictionary', this.dictionarylist)
                            .then(response => {
                                this.data = response;
                                this.loading = false;
                                Message({
                                    message: this.$t('normal.success_02'),
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


            }
        }

    }
</script>

<style scoped>

</style>
