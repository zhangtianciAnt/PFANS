<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      @buttonClick="buttonClick"
      ref="container"
      :title="title"
      v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 30px">
          <el-form-item>
            <div id="eagleMapContainer" @scroll="hanldeScroll">
              <div id="table_list">
                <el-tabs @tab-click="handleClick" v-model="activeName" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS2036VIEW_RBSYJH')" name="show_first" v-if="this.rolesshow1">
                    <!--add-lyt-21/1/25-禅道任务645 -start-->
                    <el-row>
                      <el-col :span="4">
                        <el-form-item :label="$t('label.PFANS2036VIEW_YEARS')">
                          <el-input v-model="years"
                                    :disabled="true"
                                    style="width: 8vw">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item :label="$t('label.PFANS2036VIEW_PFYF')">
                          <dicselect
                            clearable
                            :code="code2"
                            :multiple="multiple"
                            :data="form.allotmentAnt"
                            @change="changeAllotmentAnt"
                            style="width: 8vw"
                          ></dicselect>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')">
                          <el-select v-model="form.group_id"
                                     style="width: 12vw"
                                     clearable>
                            <el-option
                              v-for="item in optionsGroupdata"
                              :key="item.value"
                              :label="item.lable"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item :label="$t('label.PFANS2036VIEW_NAME')">
<!--                          add-lyt-1/22-禅道任务645-start-->
                          <el-input v-model="form.username"
                                    style="width: 8vw">
                          </el-input>
<!--                            add-lyt-1/22-禅道任务645-end-->
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item :label="$t('label.PFANS2036VIEW_RN')">
                          <dicselect
                                     v-model="form.rnAnt"
                                     :code="code1"
                                     style="width: 8vw"
                                     @change="changeRnAnt">
                          </dicselect>
                        </el-form-item>
                      </el-col>
                      <!--                          add-lyt-1/22-禅道任务645-start-->
                      <el-col :span="2">
                        <el-form-item >
                          <el-button type="primary"
                                     plain
                                     style="width:5vw;margin-top: 2.2rem"
                                     @click="SearchBar">{{$t('button.search')}}</el-button>
                        </el-form-item>
                      </el-col>
                      <!--                            add-lyt-1/22-禅道任务645-end-->
                    </el-row>
                    <!--add-lyt-21/1/25-禅道任务645 -end-->
                    <plx-table-grid
                      :datas="tableData"
                      :height-change="false"
                      :pagination-show="false"
                      :row-height="40"
                      border stripe
                      header-cell-class-name="sub_bg_color_blue"
                      highlight-current-row
                      style="width: 100%;height: calc(100vh - 260px - 2rem)"
                      use-virtual>
                      <!--姓名-->
                      <plx-table-column
                        prop="userid"
                        :label="$t('label.PFANS2036VIEW_USERID')"
                        width="100"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            v-show="false"
                            v-model="scope.row.userid"
                          >
                          </el-input>
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.username"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <!--部门简称-->
                      <plx-table-column
                        prop="departshort"
                        :label="$t('label.PFANS2036VIEW_BMJC')"
                        width="90"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.departshort"
                            size="mini"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <!--配付与否-->
                      <plx-table-column
                        prop="allotment"
                        :label="$t('label.PFANS2036VIEW_PFYF')"
                        width="110"
                        align="center">
                        <template slot-scope="scope">
                          <dicselect
                            :no="scope.row"
                            :code="code2"
                            :data="scope.row.allotment"
                            :disabled="!disabled"
                            :multiple="multiple"
                            style="width: 6vw"
                            size="mini"
                            @change="changeAllotmentAntRow"
                          ></dicselect>
                        </template>
                      </plx-table-column>
                      <!--新人入社预定月-->
                      <plx-table-column
                        prop="newpersonaldate"
                        :label="$t('label.PFANS2036VIEW_NEWPERSONALDATE')"
                        width="150"
                        align="center">
                        <template slot-scope="scope">
                          <el-date-picker
                            style="width: 20vw"
                            type="date"
                            format="yyyy-MM"
                            v-model="scope.row.newpersonaldate"
                            size="mini"
                          ></el-date-picker>
                        </template>
                      </plx-table-column>
                      <!--升格前Rn-->
                      <plx-table-column
                        prop="exrank"
                        :label="$t('label.PFANS2036VIEW_EXRANK')"
                        width="90"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.exrank"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--是否升格升号-->
                      <plx-table-column
                        prop="changerank"
                        :label="$t('label.PFANS2036VIEW_CHANGERANK')"
                        width="120"
                        align="center">
                        <template slot-scope="scope">
                          <dicselect
                            :no="scope.row"
                            :code="code3"
                            :data="scope.row.changerank"
                            :disabled="!disabled"
                            :multiple="multiple"
                            style="width: 6vw"
                            size="mini"
                            @change="changeRank"
                          ></dicselect>
                        </template>
                      </plx-table-column>
                      <!--升格后Rn-->
                      <plx-table-column
                        prop="ltrank"
                        :label="$t('label.PFANS2036VIEW_LTRANK')"
                        width="90"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.ltrank"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--基本给-->
                      <plx-table-column
                        prop="basicallyant"
                        :label="$t('label.PFANS2036VIEW_JBG')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.basicallyant"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--职责给-->
                      <plx-table-column
                        prop="responsibilityant"
                        :label="$t('label.PFANS2036VIEW_ZZG')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.responsibilityant"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月工资-->
                      <plx-table-column
                        prop="monthlysalary"
                        :label="$t('label.PFANS2036VIEW_YGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthlysalary"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--一括补贴-->
                      <plx-table-column
                        prop="allowanceant"
                        :label="$t('label.PFANS2036VIEW_YKBT')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.allowanceant"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--拓展项补贴1（备份）-->
                      <plx-table-column
                        prop="otherantone"
                        :label="$t('label.PFANS2036VIEW_TZXBTY')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.otherantone"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--拓展项补贴2（备份）-->
                      <plx-table-column
                        prop="otheranttwo"
                        :label="$t('label.PFANS2036VIEW_TZXBTE')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.otheranttwo"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--独生子女费-->
                      <plx-table-column
                        prop="onlychild"
                        :label="$t('label.PFANS2036VIEW_DSZNF')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.onlychild"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--取暖补贴-->
                      <plx-table-column
                        prop="qnbt"
                        :label="$t('label.PFANS2036VIEW_QNBUAJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.qnbt"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--补贴总计-->
                      <plx-table-column
                        prop="totalsubsidies"
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.totalsubsidies"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月度奖金月数-->
                      <plx-table-column
                        prop="monthlybonusmonths"
                        :label="$t('label.PFANS2036VIEW_YDJJYS')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthlybonusmonths"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月度奖金-->
                      <plx-table-column
                        prop="monthlybonus"
                        :label="$t('label.PFANS2036VIEW_YDJJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthlybonus"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--年度奖金月数-->
                      <plx-table-column
                        prop="annualbonusmonths"
                        :label="$t('label.PFANS2036VIEW_NDJJYS')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.annualbonusmonths"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--年度奖金-->
                      <plx-table-column
                        prop="annualbonus"
                        :label="$t('label.PFANS2036VIEW_NDJJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.annualbonus"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工资总额-->
                      <plx-table-column
                        prop="totalwages"
                        :label="$t('label.PFANS2036VIEW_GZZE')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.totalwages"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工会经费-->
                      <plx-table-column
                        prop="tradeunionfunds"
                        :label="$t('label.PFANS2036VIEW_GHJF')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.tradeunionfunds"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--加班费时给-->
                      <plx-table-column
                        prop="overtimepay"
                        :label="$t('label.PFANS2036VIEW_JBFSG')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.overtimepay"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--是否大连户籍-->
                      <plx-table-column
                        prop="indalian"
                        :label="$t('label.PFANS2036VIEW_SFDLHJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.indalian"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <plx-table-column :label="$t('label.PFANS2036VIEW_MONTHAPTOJU')"
                                        width="150">
                        <!--养老保险基-->
                        <plx-table-column
                          prop="oldylbxjaj"
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.oldylbxjaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--失业保险基-->
                        <plx-table-column
                          prop="lossybxjaj"
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.lossybxjaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--工伤保险基-->
                        <plx-table-column
                          prop="gsbxjaj"
                          :label="$t('label.PFANS2036VIEW_GSBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.gsbxjaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--医疗保险基-->
                        <plx-table-column
                          prop="ylbxjaj"
                          :label="$t('label.PFANS2036VIEW_YLBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.ylbxjaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--生育保险基-->
                        <plx-table-column
                          prop="sybxjaj"
                          :label="$t('label.PFANS2036VIEW_SYBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.sybxjaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金基数-->
                        <plx-table-column
                          prop="gjjjsaj"
                          :label="$t('label.PFANS2036VIEW_GJJJSAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.gjjjsaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保企业-->
                        <plx-table-column
                          prop="sbqyaj"
                          :label="$t('label.PFANS2036VIEW_SBQYAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.sbqyaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--大病险-->
                        <plx-table-column
                          prop="dbxaj"
                          :label="$t('label.PFANS2036VIEW_DBXAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.dbxaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保公司-->
                        <plx-table-column
                          prop="sbgsaj"
                          :label="$t('label.PFANS2036VIEW_SBGSAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.sbgsaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金公司负担-->
                        <plx-table-column
                          prop="gjjgsfdaj"
                          :label="$t('label.PFANS2036VIEW_GJJGSFDAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.gjjgsfdaj"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--4月-6月-->
                        <plx-table-column
                          prop="aptoju"
                          :label="$t('label.PFANS2036VIEW_APTOJU')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.aptoju"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                      </plx-table-column>
                      <plx-table-column :label="$t('label.PFANS2036VIEW_MONTHJUTOMA')"
                                        width="150">
                        <!--养老保险基-->
                        <plx-table-column
                          prop="oldylbxjjm"
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.oldylbxjjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--失业保险基-->
                        <plx-table-column
                          prop="lossybxjjm"
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.lossybxjjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--工伤保险基-->
                        <plx-table-column
                          prop="gsbxjjm"
                          :label="$t('label.PFANS2036VIEW_GSBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.gsbxjjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--医疗保险基-->
                        <plx-table-column
                          prop="ylbxjjm"
                          :label="$t('label.PFANS2036VIEW_YLBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.ylbxjjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--生育保险基-->
                        <plx-table-column
                          prop="sybxjjm"
                          :label="$t('label.PFANS2036VIEW_SYBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.sybxjjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金基数-->
                        <plx-table-column
                          prop="gjjjsjm"
                          :label="$t('label.PFANS2036VIEW_GJJJSJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.gjjjsjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保企业-->
                        <plx-table-column
                          prop="sbqyjm"
                          :label="$t('label.PFANS2036VIEW_SBQYJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.sbqyjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--大病险-->
                        <plx-table-column
                          prop="dbxjm"
                          :label="$t('label.PFANS2036VIEW_DBXJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.dbxjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保公司-->
                        <plx-table-column
                          prop="sbgsjm"
                          :label="$t('label.PFANS2036VIEW_SBGSJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.sbgsjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金公司负担-->
                        <plx-table-column
                          prop="gjjgsfdjm"
                          :label="$t('label.PFANS2036VIEW_GJJGSFDJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.gjjgsfdjm"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--7月-3月-->
                        <plx-table-column
                          prop="jutoma"
                          :label="$t('label.PFANS2036VIEW_JUTOMA')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="true"
                              :no="scope.row"
                              v-model="scope.row.jutoma"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                      </plx-table-column>
                      <!--操作-->
                      <plx-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disabled"
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disabled"
                            @click="addRow()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </plx-table-column>
                    </plx-table-grid>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start-->
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageData" :page-size="listQuery.limitData"
                                     :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                                     @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end-->
                  </el-tab-pane>

                  <!--部门汇总-->
                  <el-tab-pane :label="$t('label.PFANS2036VIEW_BMHZSYJH')" name="show_second" v-if="this.rolesshow2">
                    <el-table
                      :data="tableBm"
                      border stripe
                      header-cell-class-name="sub_bg_color_blue">
                     <!--部门简称-->
                      <el-table-column
                        prop="departshortBmSum"
                        :label="$t('label.PFANS2036VIEW_BMJC')"
                        width="180"
                        align="center"
                        :span-method="arraySpanMethod">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            :index="indexFun"
                            v-model="scope.row.departshortBmSum"
                          >
                          </el-input>
                        </template>
                      </el-table-column>
                      <!--Rn-->
                      <el-table-column
                        prop="exrankBmSum"
                        :label="$t('label.PFANS2036VIEW_RN')"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.exrankBmSum"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <!--人数-->
                      <el-table-column
                        prop="peopleBmSum"
                        :label="$t('label.PFANS2036VIEW_RS')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.peopleBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--月工资-->
                      <el-table-column
                        prop="monthBmSum"
                        :label="$t('label.PFANS2036VIEW_YGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--基本工资-->
                      <el-table-column
                        prop="basicBmSum"
                        :label="$t('label.PFANS2036VIEW_JBGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.basicBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--职责工资-->
                      <el-table-column
                        prop="balityBmSum"
                        :label="$t('label.PFANS2036VIEW_ZZGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.balityBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--补贴总计-->
                      <el-table-column
                        prop="totalsubsidiesBmSum"
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.totalsubsidiesBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--月度奖金-->
                      <el-table-column
                        prop="monthlybonusBmSum"
                        :label="$t('label.PFANS2036VIEW_YDJJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthlybonusBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--年度奖金-->
                      <el-table-column
                        prop="annualbonusBmSum"
                        :label="$t('label.PFANS2036VIEW_NDJJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.annualbonusBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--工资总额-->
                      <el-table-column
                        prop="tradeunionfundsBmSum"
                        :label="$t('label.PFANS2036VIEW_GZZE')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.totalwagesBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--工会经费-->
                      <el-table-column
                        prop="sbgsajBmSum"
                        :label="$t('label.PFANS2036VIEW_GHJF')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.tradeunionfundsBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--（4-6）社保公司负担总计-->
                      <el-table-column
                        prop="gjjgsfdajBmSum"
                        :label="$t('label.PFANS2036VIEW_APTOJUSBGSFDZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.sbgsajBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--（4-6）公积金公司负担总计-->
                      <el-table-column
                        prop="gjjgsfdajBmSum"
                        :label="$t('label.PFANS2036VIEW_APTOJUGJJGSFDZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.gjjgsfdajBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--（4-6）人件费总计-->
                      <el-table-column
                        prop="aptojuBmSum"
                        :label="$t('label.PFANS2036VIEW_APTOJURJFZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.aptojuBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--（7-3）社保公司负担总计-->
                      <el-table-column
                        prop="gjjgsfdajBmSum"
                        :label="$t('label.PFANS2036VIEW_JUTOMASBGSFDZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.sbgsjmBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--（7-3）公积金公司负担总计-->
                      <el-table-column
                        prop="gjjgsfdajBmSum"
                        :label="$t('label.PFANS2036VIEW_JUTOMAGJJGSFDZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.gjjgsfdjmBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--（7-3）人件费总计-->
                      <el-table-column
                        prop="aptojuBmSum"
                        :label="$t('label.PFANS2036VIEW_JUTOMARJFZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.jutomaBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--加班费时给-->
                      <el-table-column
                        prop="overtimepayBmSum"
                        :label="$t('label.PFANS2036VIEW_JBFSG')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.overtimepayBmSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start-->
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageBm" :page-size="listQuery.limitBm"
                                     :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChangeBm"
                                     @size-change="handleSizeChangeBm" layout="slot,sizes, ->,prev, pager, next, jumper">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end-->
                  </el-tab-pane>

                  <!--公司汇总-->
                  <el-tab-pane :label="$t('label.PFANS2036VIEW_GSHZSYJH')" name="show_third" v-if="this.rolesshow3">
                    <el-table
                      :data="tableGs"
                      border stripe
                      header-cell-class-name="sub_bg_color_blue">
                      <!--Rn-->
                      <el-table-column
                        prop="exrankGsSum"
                        :label="$t('label.PFANS2036VIEW_RN')"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.exrankGsSum"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <!--人数-->
                      <el-table-column
                        prop="peopleGsSum"
                        :label="$t('label.PFANS2036VIEW_RS')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.peopleGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--月工资-->
                      <el-table-column
                        prop="monthGsSum"
                        :label="$t('label.PFANS2036VIEW_YGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--基本工资-->
                      <el-table-column
                        prop="basicGsSum"
                        :label="$t('label.PFANS2036VIEW_JBGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.basicGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--职责工资-->
                      <el-table-column
                        prop="balityGsSum"
                        :label="$t('label.PFANS2036VIEW_ZZGZ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.balityGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--职责工资-->
                      <el-table-column
                        prop="totalsubsidiesGsSum"
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.totalsubsidiesGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--补贴总计-->
                      <el-table-column
                        prop="totalsubsidiesGsSum"
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.totalsubsidiesGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--月度奖金-->
                      <el-table-column
                        prop="monthlybonusGsSum"
                        :label="$t('label.PFANS2036VIEW_YDJJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.monthlybonusGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--年度奖金-->
                      <el-table-column
                        prop="annualbonusGsSum"
                        :label="$t('label.PFANS2036VIEW_NDJJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="true"
                            :no="scope.row"
                            v-model="scope.row.annualbonusGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--工会经费1212-->
                      <el-table-column
                        prop="tradeunionfundsGsSum"
                        :label="$t('label.PFANS2036VIEW_GHJF')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.tradeunionfundsGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--社保公司-->
                      <el-table-column
                        prop="sbgsajGsSum"
                        :label="$t('label.PFANS2036VIEW_SBGSAJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.sbgsajGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--公积金公司负担-->
                      <el-table-column
                        prop="gjjgsfdajGsSum"
                        :label="$t('label.PFANS2036VIEW_GJJGSFDAJ')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.gjjgsfdajGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--4月-6月-->
                      <el-table-column
                        prop="aptojuGsSum"
                        :label="$t('label.PFANS2036VIEW_APTOJU')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.aptojuGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--社保公司-->
                      <el-table-column
                        prop="sbgsjmGsSum"
                        :label="$t('label.PFANS2036VIEW_SBGSJM')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.sbgsjmGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--公积金公司负担-->
                      <el-table-column
                        prop="gjjgsfdjmGsSum"
                        :label="$t('label.PFANS2036VIEW_GJJGSFDJM')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.gjjgsfdjmGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--7月-3月-->
                      <el-table-column
                        prop="jutomaGsSum"
                        :label="$t('label.PFANS2036VIEW_JUTOMA')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.jutomaGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--加班费时给-->
                      <el-table-column
                        prop="overtimepayGsSum"
                        :label="$t('label.PFANS2036VIEW_JBFSG')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.overtimepayGsSum"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start-->
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageGs" :page-size="listQuery.limitGs"
                                     :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChangeGs"
                                     @size-change="handleSizeChangeGs" layout="slot,sizes, ->,prev, pager, next, jumper">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end-->
                  </el-tab-pane>

                  <!--人别-->
                  <el-tab-pane :label="$t('label.PFANS2036VIEW_RB')" name="show_fourth" v-if="this.rolesshow4">
                    <el-table
                      :data="tableRb"
                      border stripe
                      header-cell-class-name="sub_bg_color_blue">
                      <!--姓名-->
                      <el-table-column
                        prop="useridRb"
                        :label="$t('label.PFANS2036VIEW_USERID')"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                          <user
                            :disabled="!disabled"
                            :no="scope.row"
                            :userlist="scope.row.useridRb"
                            @getUserids="getCitationUserid"
                            :multiple="multiple"
                            style="width: 18vw"
                          ></user>
                        </template>
                      </el-table-column>
                      <!--部门简称-->
                      <el-table-column
                        prop="departshortRb"
                        :label="$t('label.PFANS2036VIEW_BMJC')"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.departshortRb"
                          >
                          </el-input>
                        </template>
                      </el-table-column>
                      <!--RN-->
                      <el-table-column
                        prop="ltrankRb"
                        :label="$t('label.PFANS2036VIEW_RN')"
                        width="180"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="true"
                            v-model="scope.row.ltrankRb"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <!--工资总额-->
                      <el-table-column
                        prop="totalwagesRb"
                        :label="$t('label.PFANS2036VIEW_GZZE')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.totalwagesRb"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <!--加班费-->
                      <el-table-column
                        prop="overtimepayRb"
                        :label="$t('label.PFANS2036VIEW_JBF')"
                        width="155"
                        align="center">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disabled"
                            :no="scope.row"
                            v-model="scope.row.overtimepayRb"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </el-table-column>

                      <el-table-column :label="$t('label.PFANS2036VIEW_BASMONTHAPTOJU')"
                                       width="150">
                        <!--养老保险基-->
                        <el-table-column
                          prop="oldylbxjajRb"
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.oldylbxjajRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--失业保险基-->
                        <el-table-column
                          prop="lossybxjajRb"
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.lossybxjajRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--工伤保险基-->
                        <el-table-column
                          prop="gsbxjajRb"
                          :label="$t('label.PFANS2036VIEW_GSBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.gsbxjajRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--医疗保险基-->
                        <el-table-column
                          prop="ylbxjajRb"
                          :label="$t('label.PFANS2036VIEW_YLBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.ylbxjajRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--生育保险基-->
                        <el-table-column
                          prop="sybxjajRb"
                          :label="$t('label.PFANS2036VIEW_SYBXJAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.sybxjajRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--公积金基数-->
                        <el-table-column
                          prop="gjjjsajRb"
                          :label="$t('label.PFANS2036VIEW_GJJJSAJ')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.gjjjsajRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>

                      <el-table-column :label="$t('label.PFANS2036VIEW_BASMONTHJUTOMA')"
                                       width="150">
                        <!--养老保险基-->
                        <el-table-column
                          prop="oldylbxjjmRb"
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.oldylbxjjmRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--失业保险基-->
                        <el-table-column
                          prop="lossybxjjmRb"
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.lossybxjjmRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--工伤保险基-->
                        <el-table-column
                          prop="gsbxjjmRb"
                          :label="$t('label.PFANS2036VIEW_GSBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.gsbxjjmRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--医疗保险基-->
                        <el-table-column
                          prop="ylbxjjmRb"
                          :label="$t('label.PFANS2036VIEW_YLBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.ylbxjjmRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--生育保险基-->
                        <el-table-column
                          prop="sybxjjmRb"
                          :label="$t('label.PFANS2036VIEW_SYBXJJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.sybxjjmRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <!--公积金基数-->
                        <el-table-column
                          prop="gjjjsjmRb"
                          :label="$t('label.PFANS2036VIEW_GJJJSJM')"
                          width="155"
                          align="center">
                          <template slot-scope="scope">
                            <el-input-number
                              :disabled="!disabled"
                              :no="scope.row"
                              v-model="scope.row.gjjjsjmRb"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS2036VIEW_PERSONALCOST')"
                                       width="150">
                        <!--四月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_SY')"
                                         width="150">
                          <el-table-column
                            prop="aprilPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.aprilPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="aprilTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.aprilTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--五月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_WY')"
                                         width="150">
                          <el-table-column
                            prop="mayPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.mayPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="mayTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.mayTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--六月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_LY')"
                                         width="150">
                          <el-table-column
                            prop="junePlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.junePlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="juneTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.juneTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--七月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_QY')"
                                         width="150">
                          <el-table-column
                            prop="julyPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.julyPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="julyTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.julyTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--八月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_BY')"
                                         width="150">
                          <el-table-column
                            prop="augPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.augPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="augTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.augTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--九月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_JY')"
                                         width="150">
                          <el-table-column
                            prop="sepPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.sepPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="sepTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.sepTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--十月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_TY')"
                                         width="150">
                          <el-table-column
                            prop="octPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.octPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="octTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.octTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--十一月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_SYY')"
                                         width="150">
                          <el-table-column
                            prop="novePlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.novePlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="noveTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.noveTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--十二月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_SEY')"
                                         width="150">
                          <el-table-column
                            prop="decePlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.decePlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="deceTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.deceTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--一月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_YY')"
                                         width="150">
                          <el-table-column
                            prop="janPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.janPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="janTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.janTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--二月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_EY')"
                                         width="150">
                          <el-table-column
                            prop="febPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.febPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="febTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.febTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <!--三月-->
                        <el-table-column :label="$t('label.PFANS2036VIEW_STY')"
                                         width="150">
                          <el-table-column
                            prop="marPlan"
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.marPlan"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="marTrue"
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            width="155"
                            align="center">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disabled"
                                :no="scope.row"
                                v-model="scope.row.marTrue"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <!--操作-->
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disabled"
                            @click.native.prevent="deleteRowRb(scope.$index, tableRb)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disabled"
                            @click="addRowRb()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import {getDictionaryInfo, getDownOrgInfo, getOrgInfo, getUserInfo,getCurrentRole,getCurrentRole3,getCurrentRole14} from '../../../../utils/customize';
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect";
  import EasyNormalTable from "@/components/EasyNormalTable";
  import user from "../../../components/user.vue";
  import {Message} from "element-ui";
  import moment from "moment";

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
        // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
        listQuery: {
          pageData: 1,
          limitData: 5,
          pageBm: 1,
          limitBm: 5,
          pageGs: 1,
          limitGs: 5,
        },
        total: 0,
        // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
        title: 'title.PFANS2036FormView',
        loading: false,
        activeName: 'show_first',
        group_id: '',
        group_idAnt: '',
        allotmentAnt: '',
        username: '',
        rnAnt: '',
        dateAnt: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y') : moment(new Date()),
        buttonList: [],
        optionsGroupdata: [],
        optionsNamedata: [],
        optionsRnAntdata: [],
        disabled: false,
        code1: 'PR021',
        code2: 'PR068',
        code3: 'PR069',
        code4: '',
        tableData: [],
        tableRb: [],
        tableBm: [],
        tableGs: [],
        // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
        tableDataCopy:[],
        tableGsCopy:[],
        tableBmCopy:[],
        // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
        ranksList: {},
        multiple: false,
        selectType: "Single",
        //add-lyt-21/1/22-禅道任务645-start
        rolesshow1: true,
        rolesshow2: true,
        rolesshow3: true,
        rolesshow4: true,
        form:{
          yearsantid: '',
          allotmentAnt: '',
          username: '',
          rnAnt: '',
          group_id: '',
        },
        //add-lyt-21/1/22-禅道任务645-end
      };
    },
    created() {
      this.years = this.$route.params.years;
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          },
          {
            key: "recalculation",
            name: "button.recalculation",
            disabled: true,
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      this.form.yearsantid = this.$route.params._id;
      this.getById();
      //add-lyt-21/1/22-禅道任务645-start
      let role = getCurrentRole();
      let role3 = getCurrentRole3();
      let role14 = getCurrentRole14();
      if(role3 === '0' ){   //财务部长
        this.rolesshow1=false;
        this.rolesshow2=false;
        this.rolesshow3=false;
      }
      else if (role14 === '0' ){  //人事总务部长
        this.rolesshow1=true;
        this.rolesshow2=true;
        this.rolesshow3=true;
        this.rolesshow4=true;
      }
      else if(role === '3') {  //GM
        this.rolesshow1=false;
        this.rolesshow3=false;
        this.rolesshow4=false;
      }
      //add-lyt-21/1/22-禅道任务645-end
    },
    methods: {
      // getGroupId() {
      //   if (this.$route.params._id) {
      //     this.loading = true;
      //     this.$store
      //       .dispatch("PFANS2036Store/getGroupId", {'yearsantid': this.$route.params._id})
      //       .then(response => {
      //         this.optionsGroupdata.push(
      //           {
      //             value: '全部',
      //             lable: '全部',
      //           }
      //         );
      //         for (let h = 0; h < response.length; h++) {
      //           this.optionsGroupdata.push(
      //             {
      //               value: response[h],
      //               lable: getOrgInfo(response[h]).companyen,
      //             },
      //           );
      //         }
      //         this.loading = false;
      //       })
      //       .catch(err => {
      //         this.loading = false;
      //         Message({
      //           message: err,
      //           type: "error",
      //           duration: 5 * 1000
      //         });
      //       });
      //   }
      //   this.getChangeRanks();
      // },
      // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
      handleSizeChange(val){
        this.listQuery.limitData = val;
        this.cutList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageData = val;
        this.cutList();
      },
      handleSizeChangeGs(val){
        this.listQuery.limitGs = val;
        this.cutList()
      },
      handleCurrentChangeGs(val) {
        this.listQuery.pageGs = val;
        this.cutList()
      },
      handleSizeChangeBm(val){
        this.listQuery.limitBm = val;
        this.cutList()
      },
      handleCurrentChangeBm(val) {
        this.listQuery.pageBm = val;
        this.cutList()
      },
      cutList() {
        this.loading = true;
        if (this.activeName === 'show_first' && this.tableData) {
          let start = (this.listQuery.pageData - 1) * this.listQuery.limitData;
          let end = this.listQuery.pageData * this.listQuery.limitData;
          let pList = this.tableDataCopy.slice(start, end);
          this.tableData = pList;
          this.total = this.tableDataCopy.length
        }
        else if (this.activeName === 'show_second' && this.tableBm){
          let start = (this.listQuery.pageBm - 1) * this.listQuery.limitBm;
          let end = this.listQuery.pageBm * this.listQuery.limitBm;
          let pList = this.tableBmCopy.slice(start, end);
          this.tableBm = pList;
          this.total = this.tableBmCopy.length
        }
        else if (this.activeName === 'show_third' && this.tableGs) {
          let start = (this.listQuery.pageGs - 1) * this.listQuery.limitGs;
          let end = this.listQuery.pageGs * this.listQuery.limitGs;
          let pList = this.tableGsCopy.slice(start, end);
          this.tableGs = pList;
          this.total = this.tableGsCopy.length
        }
        this.loading = false
      },
      // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
      getChangeRanks(){
        this.loading = true;
        this.$store
          .dispatch("PFANS2036Store/getChangeRanks")
          .then(response => {
            this.ranksList = response;
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
      getPersonalCost() {
        let groupid = this.group_id;
        this.loading = true;
        let params = {
          groupid: groupid,
          yearsantid: this.$route.params._id
        };
        this.$store
          .dispatch("PFANS2036Store/getPersonalCost", params)
          .then(response => {
            for (let u = 0; u < response.length; u++) {
              let exrankinfo = getDictionaryInfo(response[u].exrank);
              if (exrankinfo != null) {
                response[u].exrank = exrankinfo.value1;
              }
            }
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
        let vote1 = [];
        vote1.push(
          {
            value: '全部',
            lable: '全部',
          }
        );
        if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7'
          || this.$store.getters.userinfo.userid === '5e78b22c4e3b194874180f5f') {
          let centerId = '5e7858a08f4316308435112c';
          let orgs = getDownOrgInfo(centerId);
          if (orgs) {
            if (orgs.length > 0) {
              if (getDownOrgInfo(orgs[0]._id).length > 0) {
                this.group_idAnt = getDownOrgInfo(orgs[0]._id)[0]._id;
              }
            }

            for (let center of orgs) {
              let centers = getDownOrgInfo(center._id);
              if (centers) {
                for (let group of centers) {
                  vote1.push(
                    {
                      value: group._id,
                      lable: group.companyen,
                    },
                  );
                }
              }
            }
          }
          this.optionsGroupdata = vote1;
        }
        this.loading = false;
      },
      hanldeScroll(e) {
        // 获取eagleMapContainer的真实高度
        const boxHeight = document.getElementById('eagleMapContainer').offsetHeight
        // 获取table_list的真实高度（浮动内容的真实高度）
        const tableHeight = document.getElementById('table_list').offsetHeight
        // boxHeight和滑块浮动的高度相差小于50 && 不在加载中 && 不是最后一页
        alert(this.tableList.length)
        if (tableHeight - (e.target.scrollTop + boxHeight) < 50 && !this.loading && this.listPage < (this.tableList.length / 300)) {
          // 第一次触发时，记录滑块高度
          // data里scrollTop，listPage默认为0
          if (!this.scrollTop) {
            this.scrollTop = e.target.scrollTop
          }
          // 触发下拉加载更多
          this.queryMoreStat(true, tableHeight, boxHeight)
        } else if (e.target.scrollTop === 0 && !this.loading) {
          // 如果滑块上拉到顶部，则向上加载300条
          this.queryMoreStat(false, tableHeight, boxHeight)
        }
      },
      queryMoreStat(type, tableHeight, boxHeight) {
        this.loading = true
        // 触底加载
        if (type) {
          this.listPage = this.listPage + 1
          const centerPage = this.listPage * 300
          const startPage = centerPage >= 300 ? centerPage - 300 : centerPage
          const endPage = centerPage + 600
          const newList = this.tableList.slice(startPage, endPage)
          if (this.listPage > 0) {
            const box = document.getElementById('eagleMapContainer')
            // 视图跳到触发的数据，补回50的高度差值
            box.scrollTop = this.scrollTop + 50
          }
          this.list = newList
        } else {
          // 置顶加载
          if (this.listPage > 0) {
            this.listPage = this.listPage - 1
            const centerPage = this.listPage * 300
            const startPage = centerPage >= 300 ? centerPage - 300 : centerPage
            const endPage = centerPage + 600
            const newList = this.tableList.slice(startPage, endPage)
            if (this.listPage > 0) {
              const box = document.getElementById('eagleMapContainer')
              box.scrollTop = tableHeight - this.scrollTop - boxHeight
            }
            this.list = newList
          } else {
            this.list = this.tableList.slice(0, 300)
          }
        }
        this.$nextTick(() => {
          this.loading = false
        })
      },
      // 合并合计第一行
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          if (columnIndex === 0) {
            return [0, 0];
          } else if (columnIndex === 1) {
            return [1, 2];
          }
        }
      },
      indexFun (index) {
        return index;
      },
      handleClick() {
        if (this.activeName === 'show_fourth') {
          this.gettableRb();
          this.buttonList[1].disabled = false;
        }else if(this.activeName === 'show_second'){
          this.gettableBm();
          this.buttonList[1].disabled = true;
        }else if(this.activeName === 'show_third'){
          this.gettableGs();
          this.buttonList[1].disabled = true;
        }
      },
      gettableBm(){
        this.loading = true;
        this.$store
          .dispatch("PFANS2036Store/gettableBm", {yearsantid: this.$route.params._id})
          .then(response => {
            console.log(response)
            for(let u = 0; u < response.length;u ++) {
              let exrankinfo = getDictionaryInfo(response[u].exrankBmSum);
              if (exrankinfo != null) {
                response[u].exrankBmSum = exrankinfo.value1;
              }
            }
            this.tableBm = response;
            // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-Start
            this.tableBmCopy = response;
            this.cutList();
            // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
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
      gettableGs(){
        this.loading = true;
        this.$store
          .dispatch("PFANS2036Store/gettableGs", {yearsantid: this.$route.params._id})
          .then(response => {
            for(let i = 0; i < response.length;i ++){
              let exrankinfo = getDictionaryInfo(response[i].exrankGsSum);
              if (exrankinfo != null) {
                response[i].exrankGsSum = exrankinfo.value1;
              }
            }
            this.tableGs = response;
            // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
            this.tableGsCopy = response;
            this.cutList();
            // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
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
      gettableRb(){
        this.loading = true;
        this.$store
          .dispatch("PFANS2036Store/gettableRb", {yearsantid: this.$route.params._id})
          .then(response => {
            // this.tableRb = response;
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

      changeGroup(val) {
        this.group_id = val;
        if (this.group_id) {
          this.getPersonalCost();
        }
      },
      changeName(val) {
        this.username = val;
      },
      changeRnAnt(val) {
        this.form.rnAnt = val;
      },
      changeAllotmentAnt(val) {
        this.form.allotmentAnt = val;
      },
      changeAllotmentAntRow(val, row) {
        row.allotment = val;
      },
      changeDateAnt(val) {
        this.dateAnt = moment(val).format('YYYY');
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableData = [{
            userid: '',
            username: '',
            departshort: '',
            allotment: '',
            newpersonaldate: '',
            exrank: '',
            changerank: '',
            ltrank: '',
            basicallyant: '',
            responsibilityant: '',
            monthlysalary: '',
            allowanceant: '',
            otherantone: '',
            otheranttwo: '',
            onlychild: '',
            qnbt: '',
            totalsubsidies: '',
            monthlybonusmonths: '',
            monthlybonus: '',
            annualbonusmonths: '',
            annualbonus: '',
            totalwages: '',
            tradeunionfunds: '',
            overtimepay: '',
            indalian: '',
            oldylbxjaj: '',
            lossybxjaj: '',
            gsbxjaj: '',
            ylbxjaj: '',
            sybxjaj: '',
            gjjjsaj: '',
            sbqyaj: '',
            dbxaj: '',
            sbgsaj: '',
            gjjgsfdaj: '',
            aptoju: '',
            oldylbxjjm: '',
            lossybxjjm: '',
            gsbxjjm: '',
            ylbxjjm: '',
            sybxjjm: '',
            gjjjsjm: '',
            sbqyjm: '',
            dbxjm: '',
            sbgsjm: '',
            gjjgsfdjm: '',
            jutoma: '',
          }]
        }
      },
      addRow() {
        this.tableData.push({
          userid: '',
          username: '',
          departshort: '',
          allotment: '',
          newpersonaldate: '',
          exrank: '',
          changerank: '',
          ltrank: '',
          basicallyant: '',
          responsibilityant: '',
          monthlysalary: '',
          allowanceant: '',
          otherantone: '',
          otheranttwo: '',
          onlychild: '',
          qnbt: '',
          totalsubsidies: '',
          monthlybonusmonths: '',
          monthlybonus: '',
          annualbonusmonths: '',
          annualbonus: '',
          totalwages: '',
          tradeunionfunds: '',
          overtimepay: '',
          indalian: '',
          oldylbxjaj: '',
          lossybxjaj: '',
          gsbxjaj: '',
          ylbxjaj: '',
          sybxjaj: '',
          gjjjsaj: '',
          sbqyaj: '',
          dbxaj: '',
          sbgsaj: '',
          gjjgsfdaj: '',
          aptoju: '',
          oldylbxjjm: '',
          lossybxjjm: '',
          gsbxjjm: '',
          ylbxjjm: '',
          sybxjjm: '',
          gjjjsjm: '',
          sbqyjm: '',
          dbxjm: '',
          sbgsjm: '',
          gjjgsfdjm: '',
          jutoma: '',
        });
      },
 // add-lyt-1/22-禅道任务645-start
      SearchBar(){
        this.loading = true;
          let params = {
          yearsantid: this.form.yearsantid,
          username:this.form.username,
          rnAnt:this.form.rnAnt,
          allotmentAnt:this.form.allotmentAnt,
          group_id:this.form.group_id,
        };
        this.$store
          .dispatch('PFANS2036Store/getFuzzyQuery', params)
          .then(response =>{
            for (let u = 0; u < response.length; u++) {
              let ltrankinfo = getDictionaryInfo(response[u].ltrank);
              if (ltrankinfo != null) {
                response[u].ltrank = ltrankinfo.value1;
              }
              let exrankinfo = getDictionaryInfo(response[u].exrank);
              if (exrankinfo != null) {
                response[u].exrank = exrankinfo.value1;
              }
            }
            this.tableData = response;
            // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
            this.tableDataCopy = response;
            this.cutList();
            // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
            this.loading = false;
          })
      },
      // add-lyt-1/22-禅道任务645-end
      deleteRowRb(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableRb = [{
            useridRb: '',
            departshortRb: '',
            ltrankRb: '',
            totalwagesRb: '',
            overtimepayRb: '',
            oldylbxjajRb: '',
            lossybxjajRb: '',
            gsbxjajRb: '',
            ylbxjajRb: '',
            sybxjajRb: '',
            gjjjsajRb: '',
            oldylbxjjmRb: '',
            lossybxjjmRb: '',
            gsbxjjmRb: '',
            ylbxjjmRb: '',
            sybxjjmRb: '',
            gjjjsjmRb: '',
            aprilPlan: '',
            aprilTrue: '',
            mayPlan: '',
            mayTrue: '',
            junePlan: '',
            juneTrue: '',
            julyPlan: '',
            julyTrue: '',
            augPlan: '',
            augTrue: '',
            sepPlan: '',
            sepTrue: '',
            octPlan: '',
            octTrue: '',
            novePlan: '',
            noveTrue: '',
            decePlan: '',
            deceTrue: '',
            janPlan: '',
            janTrue: '',
            febPlan: '',
            febTrue: '',
            marPlan: '',
            marTrue: '',
          }]
        }
      },
      addRowRb() {
        this.tableRb.push({
          useridRb: '',
          departshortRb: '',
          ltrankRb: '',
          totalwagesRb: '',
          overtimepayRb: '',
          oldylbxjajRb: '',
          lossybxjajRb: '',
          gsbxjajRb: '',
          ylbxjajRb: '',
          sybxjajRb: '',
          gjjjsajRb: '',
          oldylbxjjmRb: '',
          lossybxjjmRb: '',
          gsbxjjmRb: '',
          ylbxjjmRb: '',
          sybxjjmRb: '',
          gjjjsjmRb: '',
          aprilPlan: '',
          aprilTrue: '',
          mayPlan: '',
          mayTrue: '',
          junePlan: '',
          juneTrue: '',
          julyPlan: '',
          julyTrue: '',
          augPlan: '',
          augTrue: '',
          sepPlan: '',
          sepTrue: '',
          octPlan: '',
          octTrue: '',
          novePlan: '',
          noveTrue: '',
          decePlan: '',
          deceTrue: '',
          janPlan: '',
          janTrue: '',
          febPlan: '',
          febTrue: '',
          marPlan: '',
          marTrue: '',
        });
      },
      getCitationUserid(userlist, row) {
        row.useridRb = userlist;
        if (row.useridRb != null && row.useridRb !== '') {
          let lst = getUserInfo(row.useridRb);
          row.ltrankRb = lst.userinfo.rank;
          let orglst = getOrgInfo(lst.userinfo.groupid)
          row.departshortRb = orglst.companyen;
        }
      },
      changeRank(val, row) {
        row.changerank = val;
        if(val === 'PR069002'){
          // let ltrankant = '';
          // for(row.exrank in this.ranksMap){
          //   ltrankant = this.ranksMap[]; //注意是 [  ]
          // }
          let ranksListAnt = this.ranksList.filter(item => item.value1 == row.exrank);
          row.ltrank = getDictionaryInfo(ranksListAnt[0].value12).value1;
        }else{
          row.ltrank = '';
        }
      },
      buttonClick(val) {
        if (val === "save") {
          this.loading = true;
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
        }else if(val === "recalculation"){
          this.loading = true;
          this.$store
            .dispatch("PFANS2036Store/upPersonalCostRb")
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
  #eagleMapContainer {
    overflow-y: auto;
    margin-top: 10px;
    min-height: 150px;
    max-height: 600px;
  }

  #eagleMapContainer::-webkit-scrollbar {
    width: 6px; /*对垂直流动条有效*/
    height: 6px;
  }

  #eagleMapContainer::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }

  #eagleMapContainer::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  /*定义右下角汇合处的样式*/
  #eagleMapContainer::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0.2);
  }
</style>
