<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading"
                         :buttonList="buttonList" :noback="noback" :title="title" @buttonClick="buttonClick">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" style="padding-top: 25px">
          <el-row>
            <el-table :data="table" border
                      header-cell-class-name="sub_bg_color_blue"
                      stripe style="width: 100%">
              <el-table-column :label="$t('label.user_name')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2003VIEW_SCHOOL')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.school" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2002VIEW_BIRTHDAY')" align="center" width="200">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.birthday"
                                  style="width: 100%"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2003VIEW_ACCEPTDATE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.accept_date"
                                  style="width: 100%"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.sex')" align="center" width="200">
                <template slot-scope="scope">
                  <dicselect
                    :code="code1"
                    :data="scope.row.sex"
                    :multiple="multiple"
                    :no="scope.row"
                    style="width: 100%"
                    @change="getsex">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2003FORMVIEW_SUPPLEMENT')" align="center" width="200">
                <template slot-scope="scope">
                  <dicselect
                    :code="code3"
                    :data="scope.row.supplement"
                    :multiple="multiple"
                    :no="scope.row"
                    style="width: 100%"
                    @change="getsupplement"
                  >
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    plain
                    size="small"
                    type="danger"
                    @click.native.prevent="deleteRow(scope.$index, table)"
                  >{{ $t('button.delete') }}
                  </el-button>
                  <el-button
                    plain
                    size="small"
                    type="primary"
                    @click="addRow()"
                  >{{ $t('button.insert') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {Message} from 'element-ui';
import dicselect from '../../../components/dicselect';

export default {
  name: 'PFANS2035View',
  components: {
    dicselect,
    EasyNormalContainer,
  },
  data() {
    return {
      multiple: false,
      noback: true,
      loading: false,
      title: 'title.PFANS2035VIEW',
      data: [],
      table: [
        {

          name: '',
          school: '',
          birthday: '',
          accept_date: '',
          sex: '',
          supplement: '',
        },
      ],
      code1: 'PR019',
      code3: 'PR022',
      buttonList: [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ],
    };
  },
  methods: {
    getsupplement(val, row) {
      row.supplement = val;
    },
    getsex(val, row) {
      row.sex = val;
    },
    addRow() {
      this.table.push({
        name: '',
        school: '',
        birthday: '',
        accept_date: '',
        sex: '',
        supplement: '',
      });
    },
    deleteRow(index, rows, row) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        this.table = [{
          name: '',
          school: '',
          birthday: '',
          accept_date: '',
          sex: '',
          supplement: '',
        }];
      }
    },
    buttonClick(val) {
      let error = 0;
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i].name === '') {
          error = error + 1;
          Message({
            message: this.$t('normal.error_08') + this.$t('label.user_name'),
            type: 'error',
            duration: 5 * 1000,
          });
          break;
        }
        if (this.table[i].school === '') {
          error = error + 1;
          Message({
            message: this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_SCHOOL'),
            type: 'error',
            duration: 5 * 1000,
          });
          break;
        }
        if (this.table[i].birthday === '') {
          error = error + 1;
          Message({
            message: this.$t('normal.error_08') + this.$t('label.PFANS2002VIEW_BIRTHDAY'),
            type: 'error',
            duration: 5 * 1000,
          });
          break;
        }
        if (this.table[i].accept_date === '') {
          error = error + 1;
          Message({
            message: this.$t('normal.error_08') + this.$t('label.PFANS2003VIEW_ACCEPTDATE'),
            type: 'error',
            duration: 5 * 1000,
          });
          break;
        }
        if (this.table[i].sex === '') {

          error = error + 1;
          Message({
            message: this.$t('normal.error_08') + this.$t('label.sex'),
            type: 'error',
            duration: 5 * 1000,
          });
          break;
        }
        if (this.table[i].supplement === '') {
          error = error + 1;
          Message({
            message: this.$t('normal.error_08') + this.$t('label.PFANS2003FORMVIEW_SUPPLEMENT'),
            type: 'error',
            duration: 5 * 1000,
          });
          break;
        }
      }
      this.baseInfo = {};
      this.baseInfo.interviewrecord = [];
      for (let i = 0; i < this.table.length; i++) {
        this.baseInfo.interviewrecord.push(
          {
            recruit_id: this.$route.params._id,
            name: this.table[i].name,
            school: this.table[i].school,
            birthday: this.table[i].birthday,
            accept_date: this.table[i].accept_date,
            sex: this.table[i].sex,
            supplement: this.table[i].supplement,
          },
        );
      }
      if (error === 0) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2003Store/createinterviewrecord2', this.baseInfo.interviewrecord)
          .then(response => {
            this.data = response;
            this.loading = false;
            Message({
              message: this.$t('normal.success_01'),
              type: 'success',
              duration: 5 * 1000,
            });
            this.$router.push({
              name: 'PFANS2003View',
            });
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
  },
  mounted() {

  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.row_height_left {
  font-size: 0.75rem;
  padding: 0px;
  text-align: left;
  background-color: transparent !important;
}
</style>
