<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container"
                         :title="title"
                         @buttonClick="buttonClick"
                         v-loading="loading"
                         :buttonList="buttonList">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw"
                 ref="refform">

          <span>{{this.titleType}}</span>

          <el-form-item>
            <!--<dicselect
              :code=""
              :data=""
              :no=""
              :multiple=""
              @change=""
              style="width: 11rem"
              :disabled="!disabled">
            </dicselect>
            -->
          </el-form-item>
          <el-table :data="form.tabledata" stripe header-cell-class-name="sub_bg_color_grey height" :header-cell-style="getRowClass1">
            <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                             type="index" width="50"></el-table-column>
            <!--氏名-->
            <el-table-column :label="$t('label.PFANS2027VIEW_NAME')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--RN-->
            <el-table-column :label="$t('label.PFANS2027VIEW_RN')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--入社日-->
            <el-table-column :label="$t('label.PFANS2027VIEW_DATE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--グループ-->
            <el-table-column :label="$t('label.PFANS2027VIEW_GROUP2')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--チーム-->
            <el-table-column :label="$t('label.PFANS2027VIEW_TEAM')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--入社形式-->
            <el-table-column :label="$t('label.PFANS2027VIEW_FORM')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--基本給-->
            <el-table-column :label="$t('label.PFANS2027VIEW_GIVE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--出勤率-->
            <el-table-column :label="$t('label.PFANS2027VIEW_ATTENDANCE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
           <!-- 2018年-->
            <el-table-column :label="$t('label.PFANS2027VIEW_2018YEAR')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--前回-->
            <el-table-column :label="$t('label.PFANS2027VIEW_LASTMONTHS')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.department" :disabled="!disabled3" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
<!-- 経営・運営成果-->
            <el-table-column :label="$t('label.PFANS2027VIEW_RESULT')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_PLAN')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_SECURITY')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_CREATE')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TALENT')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center">
              </el-table-column>
            </el-table-column>
<!-- PJ成果-->
            <el-table-column :label="$t('label.PFANS2027VIEW_PJRESULT')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_DIFFICULTYLEVEL')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ISSUE')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_QCD')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_NANYI')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center">
              </el-table-column>
            </el-table-column>
<!--意欲-->
            <el-table-column :label="$t('label.PFANS2027VIEW_MEAN')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_KETI')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TEAMWORK')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RENCAI')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_MICROWAVE')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.deliverycondition"
                      :no="scope.row"
                      :multiple="multiple"
                      @change="getDeliverycondition"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center">
              </el-table-column>
            </el-table-column>
<!--評価-->
            <el-table-column :label="$t('label.PFANS2027VIEW_EVALUATION')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITESCORES')" align="center">
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ONE')" align="center">
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TOW')" align="center">
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RESULTEVALUATION')" align="center">
              </el-table-column>
            </el-table-column>
<!--総合所見【1】-->
            <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE1')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITEEVALUATION')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!-- 総合所見【2】-->
            <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE2')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_FIRSTEVALUATION')" align="center">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>

          </el-table>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    export default {
        name: "PFANS2027FormView"
    }
</script>

<style scoped>

</style>
