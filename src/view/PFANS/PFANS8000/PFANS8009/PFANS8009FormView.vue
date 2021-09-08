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
                <!--       人件费 需要添加 1228 ccm         -->
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE10')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.value10">
                    </el-input>
                  </template>
                </el-table-column>
                <!--       人件费 需要添加 1228 ccm         -->
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <!--数据字典编辑首页，类别说明行删除按钮禁用 scc-->
                    <el-button
                      :disabled="scope.row.code.toString().length < 6 ? true : !disable"
                      @click.native.prevent="deleteRow(scope.$index, tableD)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow(scope.$index, tableD)"
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
        //region scc add 9/8 页面初始化以及该存在的code from
        prohibitDictionary: [],
        //endregion scc add 9/8 页面初始化以及该存在的code to
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
            valie10: "",
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
          // .dispatch('PFANS8009Store/getDictionary', {"pcode": this.$route.params.code})
          //新增数据字典编辑页面的首行类别信息介绍 scc
          .dispatch('PFANS8009Store/getDictionary', {"code": this.$route.params.code,"pcode":this.$route.params.code})
          .then(response => {
            //region scc add 9/8 初始化获取页面所有code from
            for(let i = 0; i < response.length; i++){
              this.prohibitDictionary.push(response[i].code);
            }
            //endregion scc add 9/8 初始化获取页面所有code to
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
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      deleteRow(index, rows) {
        //region scc add 9/8 删除时判断code在数据库是否存在，存在不能删除 from
        if(this.prohibitDictionary.indexOf(rows[index].code) !== -1){
          Message({
            message: this.$t('label.PFANS8009FORMVIEW_PROMPT'),
            type: 'error',
            duration: 5 * 1000
          });
          return;
        }
        //endregion scc add 9/8 删除时判断code在数据库是否存在，存在不能删除 to
        if (rows.length > 1) {
          rows.splice(index, 1);
          // NT_PFANS_20210308_BUG_159  编码根据数据情况实时递增
          // for (let i = 0; i < rows.length; i++) {
          //   if (i < 9) {
          //     this.tableD[i].code = this.letcode.substring(0, 5) + "00" + (i + 1);
          //   } else if (i >= 9) {
          //     this.tableD[i].code = this.letcode.substring(0, 5) + "0" + (i + 1);
          //   }
          // }
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
              valie10: "",
              pcode: "",
              status: "",
            }
          ]
        }
      },
      // NT_PFANS_20210308_BUG_159  编码根据数据情况实时递增
      addRow(index, rows) {
        // if (rows.length < 9) {
        //   //新增行，编码显示修正 scc
        //   this.letcode = this.letcode.substring(0, 5) + "00" + (rows.length );
        // } else if (rows.length >= 9) {
        //   this.letcode = this.letcode.substring(0, 5) + "0" + (rows.length );
        //   // NT_PFANS_20210308_BUG_159  编码根据数据情况实时递增
        // }
        //scc
        if(rows.length === 1){//如果只有一条记录，必定是行信息介绍
          this.letcode = this.letcode.substring(0, 5) + "001";
        }
        if(rows.length > 1) {
          this.letcode = rows[rows.length - 1].code;//每次新增取当前页面最后一条记录的letcode
          let num = parseInt(this.letcode.substr(this.letcode.length - 3, 3));//获取后三位数字类型最大值，新增记录使用
          if (num < 9) {
            this.letcode = this.letcode.substring(0, 5) + "00" + (num + 1);
          } else {
            this.letcode = this.letcode.substring(0, 5) + "0" + (num + 1);
          }
        }
        //scc
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
          valie10: "",
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
          //ztc 解决修改字典，其余字典被清空 BUG fr
          for (let i = 1; i < this.tableD.length; i++) {
            //ztc 解决修改字典，其余字典被清空 BUG to
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
              value10: this.tableD[i].value10,
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

