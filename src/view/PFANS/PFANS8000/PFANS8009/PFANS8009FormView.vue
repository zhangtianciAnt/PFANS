<template>
  <div>
    <EasyNormalContainer
      ref="container"
      v-loading="loading" :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      @disabled="setdisabled"
    >
      <div slot="customize">
        <el-form ref="reff" :rules="rules" label-position="top" label-width="8vw">
          <el-row>
            <el-form-item :label="$t(this.$route.params.codename)">
              <el-table :data="tableD" border header-cell-class-name="sub_bg_color_blue" stripe>
                <el-table-column :label="$t('label.PFANS8009VIEW_CODE')" align="center" fixed width="130">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.code" :disabled="true">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE1')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value1" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE2')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value2" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE3')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value3" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE4')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value4" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE5')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value5" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE6')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value6" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE7')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value7" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE8')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value8" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE9')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value9" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <!--       人件费 需要添加 1228 ccm         -->
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE10')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value10" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <!--       人件费 需要添加 1228 ccm         -->
                <!--       事业计划 需要添加 1011 ztc         -->
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE11')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value11" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE12')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value12" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE13')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value13" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE14')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value14" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE15')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value15" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE16')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value16" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE17')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value17" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE18')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value18" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE19')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value19" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS8009VIEW_VALUE20')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value20" :disabled="!disable">
                    </el-input>
                  </template>
                </el-table-column>
                <!--       事业计划 需要添加 1011 ztc          -->


                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <!--数据字典编辑首页，类别说明行删除按钮禁用 scc-->
                    <el-button
                      :disabled="scope.row.isdis == true"
                      plain
                      size="small"
                      type="danger"
                      @click.native.prevent="deleteRow(scope.$index, tableD)"
                    >{{ $t('button.delete') }}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      plain
                      size="small"
                      type="primary"
                      @click="addRow(scope.$index, tableD)"
                    >{{ $t('button.insert') }}
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
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {Message} from 'element-ui';

export default {
  name: 'PFANS8009FormView',
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
          code: '',
          type: '',
          valie1: '',
          valie2: '',
          valie3: '',
          valie4: '',
          valie5: '',
          valie6: '',
          valie7: '',
          valie8: '',
          valie9: '',
          valie10: '',
          pcode: '',
          status: '',
          isdis: '',
        },
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
      },
    };
  },
  mounted() {
    this.disable = this.$route.params.disabled;
    if (this.disable) {
      this.buttonList = [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ];
    }
    if (this.$route.params.code) {
      this.data = [];
      this.loading = true;
      this.$store
        // .dispatch('PFANS8009Store/getDictionary', {"pcode": this.$route.params.code})
        //新增数据字典编辑页面的首行类别信息介绍 scc
        .dispatch('PFANS8009Store/getDictionary', {'code': this.$route.params.code, 'pcode': this.$route.params.code})
        .then(response => {
          //region scc add 9/8 初始化页面数据标记 from
          for (let i = 0; i < response.length; i++) {
            response[i].isdis = true;
          }
          //endregion scc add 9/8 初始化页面数据标记 to
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
        this.disabled = val;
      }
    },
    deleteRow(index, rows) {
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
            type: '',
            valie1: '',
            valie2: '',
            valie3: '',
            valie4: '',
            valie5: '',
            valie6: '',
            valie7: '',
            valie8: '',
            valie9: '',
            valie10: '',
            pcode: '',
            status: '',
          },
        ];
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
      if (rows.length === 1) {//如果只有一条记录，必定是行信息介绍
        this.letcode = this.letcode.substring(0, 5) + '001';
      }
      if (rows.length > 1) {
        this.letcode = rows[rows.length - 1].code;//每次新增取当前页面最后一条记录的letcode
        let num = parseInt(this.letcode.substr(this.letcode.length - 3, 3));//获取后三位数字类型最大值，新增记录使用
        if (num < 9) {
          this.letcode = this.letcode.substring(0, 5) + '00' + (num + 1);
        } else {
          this.letcode = this.letcode.substring(0, 5) + '0' + (num + 1);
        }
      }
      //scc
      this.tableD.push({
        code: this.letcode,
        type: '',
        valie1: '',
        valie2: '',
        valie3: '',
        valie4: '',
        valie5: '',
        valie6: '',
        valie7: '',
        valie8: '',
        valie9: '',
        valie10: '',
        pcode: '',
        status: '',
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
      if (val === 'save') {
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
            value11: this.tableD[i].value11,
            value12: this.tableD[i].value12,
            value13: this.tableD[i].value13,
            value14: this.tableD[i].value14,
            value15: this.tableD[i].value15,
            value16: this.tableD[i].value16,
            value17: this.tableD[i].value17,
            value18: this.tableD[i].value18,
            value19: this.tableD[i].value19,
            value20: this.tableD[i].value20,
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
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
      }


    },
  },

};
</script>

<style scoped>

</style>

