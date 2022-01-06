<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      v-loading="loading"
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick">
      <div slot="customize">
        <el-form ref="reff" label-position="top" label-width="8vw" style="padding-top: 30px">
          <el-form-item>
            <div id="eagleMapContainer" @scroll="hanldeScroll">
              <div id="table_list">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                  <el-tab-pane v-if="this.rolesshow1" :label="$t('label.PFANS2036VIEW_RBSYJH')" name="show_first">
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
                            :code="code2"
                            :data="form.allotmentAnt"
                            :multiple="multiple"
                            style="width: 8vw"
                            @change="changeAllotmentAnt"
                          ></dicselect>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')">
                          <el-select v-model="form.group_id"
                                     clearable
                                     style="width: 12vw">
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
                        <el-form-item>
                          <el-button plain
                                     style="width:5vw;margin-top: 2.2rem"
                                     type="primary"
                                     @click="SearchBar">{{ $t('button.search') }}
                          </el-button>
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
                      border header-cell-class-name="sub_bg_color_blue"
                      highlight-current-row
                      stripe
                      style="width: 100%;height: calc(100vh - 260px - 2rem)"
                      use-virtual>
                      <!--姓名-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_USERID')"
                        align="center"
                        prop="userid"
                        width="100">
                        <template slot-scope="scope">
                          <el-input
                            v-show="false"
                            v-model="scope.row.userid"
                            :no="scope.row"
                          >
                          </el-input>
                          <el-input
                            v-model="scope.row.username"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <!--部门简称-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BMJC')"
                        align="center"
                        prop="departshort"
                        width="90">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.departshort"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <!--配付与否-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_PFYF')"
                        align="center"
                        prop="allotment"
                        width="110">
                        <template slot-scope="scope">
                          <dicselect
                            :code="code2"
                            :data="scope.row.allotment"
                            :disabled="!disabled"
                            :multiple="multiple"
                            :no="scope.row"
                            size="mini"
                            style="width: 6vw"
                            @change="changeAllotmentAntRow"
                          ></dicselect>
                        </template>
                      </plx-table-column>
                      <!--新人入社预定月-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_NEWPERSONALDATE')"
                        align="center"
                        prop="newpersonaldate"
                        width="150">
                        <template slot-scope="scope">
                          <el-date-picker
                            v-model="scope.row.newpersonaldate"
                            format="yyyy-MM"
                            size="mini"
                            style="width: 20vw"
                            type="date"
                          ></el-date-picker>
                        </template>
                      </plx-table-column>
                      <!--升格前Rn-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_EXRANK')"
                        align="center"
                        prop="exrank"
                        width="90">
                        <template slot-scope="scope">
                          <el-input
                            v-show="false"
                            v-model="scope.row.exrank"
                            :no="scope.row"
                          >
                          </el-input>
                          <el-input
                            v-model="scope.row.exrankshow"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--是否升格升号-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_CHANGERANK')"
                        align="center"
                        prop="changerank"
                        width="120">
                        <template slot-scope="scope">
                          <dicselect
                            :code="code3"
                            :data="scope.row.changerank"
                            :disabled="!disabled"
                            :multiple="multiple"
                            :no="scope.row"
                            size="mini"
                            style="width: 6vw"
                            @change="changeRank"
                          ></dicselect>
                        </template>
                      </plx-table-column>
                      <!--升格后Rn-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_LTRANK')"
                        align="center"
                        prop="ltrank"
                        width="90">
                        <template slot-scope="scope">
                          <el-input
                            v-show="false"
                            v-model="scope.row.ltrank"
                            :no="scope.row"
                          >
                          </el-input>
                          <el-input
                            v-model="scope.row.ltrankshow"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--基本给-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBG')"
                        align="center"
                        prop="basicallyant"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.basicallyant"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--职责给-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_ZZG')"
                        align="center"
                        prop="responsibilityant"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.responsibilityant"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YGZ')"
                        align="center"
                        prop="monthlysalary"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthlysalary"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--一括补贴-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YKBT')"
                        align="center"
                        prop="allowanceant"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.allowanceant"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--拓展项补贴1（备份）-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_TZXBTY')"
                        align="center"
                        prop="otherantone"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.otherantone"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--拓展项补贴2（备份）-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_TZXBTE')"
                        align="center"
                        prop="otheranttwo"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.otheranttwo"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--独生子女费-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_DSZNF')"
                        align="center"
                        prop="onlychild"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.onlychild"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--取暖补贴-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_QNBUAJ')"
                        align="center"
                        prop="qnbt"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.qnbt"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--补贴总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        align="center"
                        prop="totalsubsidies"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalsubsidies"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月度奖金月数-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YDJJYS')"
                        align="center"
                        prop="monthlybonusmonths"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthlybonusmonths"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月度奖金-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YDJJ')"
                        align="center"
                        prop="monthlybonus"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthlybonus"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--年度奖金月数-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_NDJJYS')"
                        align="center"
                        prop="annualbonusmonths"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.annualbonusmonths"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--年度奖金-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_NDJJ')"
                        align="center"
                        prop="annualbonus"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.annualbonus"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工资总额-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GZZE')"
                        align="center"
                        prop="totalwages"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalwages"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工会经费-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GHJF')"
                        align="center"
                        prop="tradeunionfunds"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.tradeunionfunds"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--加班费时给-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBFSG')"
                        align="center"
                        prop="overtimepay"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.overtimepay"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--是否大连户籍-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_SFDLHJ')"
                        align="center"
                        prop="indalian"
                        width="155">
                        <template slot-scope="scope">
                          <el-input
                            v-show='false'
                            v-model="scope.row.indalian"
                            :disabled="true"
                            :no="scope.row"
                          >
                          </el-input>
                          <el-input
                            v-model="scope.row.indalianShow"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <plx-table-column :label="$t('label.PFANS2036VIEW_MONTHAPTOJU')"
                                        width="150">
                        <!--养老保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJAJ')"
                          align="center"
                          prop="oldylbxjaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.oldylbxjaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--失业保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJAJ')"
                          align="center"
                          prop="lossybxjaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.lossybxjaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--工伤保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GSBXJAJ')"
                          align="center"
                          prop="gsbxjaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gsbxjaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--医疗保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_YLBXJAJ')"
                          align="center"
                          prop="ylbxjaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.ylbxjaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--生育保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SYBXJAJ')"
                          align="center"
                          prop="sybxjaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sybxjaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金基数-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GJJJSAJ')"
                          align="center"
                          prop="gjjjsaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gjjjsaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保企业-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SBQYAJ')"
                          align="center"
                          prop="sbqyaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sbqyaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--大病险-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_DBXAJ')"
                          align="center"
                          prop="dbxaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.dbxaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保公司-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SBGSAJ')"
                          align="center"
                          prop="sbgsaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sbgsaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金公司负担-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GJJGSFDAJ')"
                          align="center"
                          prop="gjjgsfdaj"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gjjgsfdaj"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--4月-6月-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_APTOJU')"
                          align="center"
                          prop="aptoju"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.aptoju"
                              :disabled="true"
                              :no="scope.row"
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
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJJM')"
                          align="center"
                          prop="oldylbxjjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.oldylbxjjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--失业保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJJM')"
                          align="center"
                          prop="lossybxjjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.lossybxjjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--工伤保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GSBXJJM')"
                          align="center"
                          prop="gsbxjjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gsbxjjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--医疗保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_YLBXJJM')"
                          align="center"
                          prop="ylbxjjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.ylbxjjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--生育保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SYBXJJM')"
                          align="center"
                          prop="sybxjjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sybxjjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金基数-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GJJJSJM')"
                          align="center"
                          prop="gjjjsjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gjjjsjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保企业-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SBQYJM')"
                          align="center"
                          prop="sbqyjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sbqyjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--大病险-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_DBXJM')"
                          align="center"
                          prop="dbxjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.dbxjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--社保公司-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SBGSJM')"
                          align="center"
                          prop="sbgsjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sbgsjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金公司负担-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GJJGSFDJM')"
                          align="center"
                          prop="gjjgsfdjm"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gjjgsfdjm"
                              :disabled="true"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--7月-3月-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_JUTOMA')"
                          align="center"
                          prop="jutoma"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.jutoma"
                              :disabled="true"
                              :no="scope.row"
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
                            plain
                            size="small"
                            type="danger"
                            @click="deleteRow(scope.$rowIndex, tableData)"
                          >{{ $t('button.delete') }}
                          </el-button>
                          <el-button
                            :disabled="!disabled"
                            plain
                            size="small"
                            type="primary"
                            @click="addRow()"
                          >{{ $t('button.insert') }}
                          </el-button>
                        </template>
                      </plx-table-column>
                    </plx-table-grid>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start-->
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageData" :page-size="listQuery.limitData"
                                     :page-sizes="[5,10,20,30,100]" :total="total" layout="slot,sizes, ->,prev, pager, next, jumper"
                                     @current-change="handleCurrentChange" @size-change="handleSizeChange">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end-->
                  </el-tab-pane>

                  <!--部门汇总-->
                  <el-tab-pane v-if="this.rolesshow2" :label="$t('label.PFANS2036VIEW_BMHZSYJH')" name="show_second">
                    <plx-table-grid
                      :datas="tableBm"
                      :height-change="false"
                      :pagination-show="false"
                      :row-height="40"
                      border header-cell-class-name="sub_bg_color_blue"
                      highlight-current-row
                      stripe
                      style="width: 100%;height: calc(100vh - 260px - 2rem)"
                      use-virtual>
                      <!--部门简称-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BMJC')"
                        :span-method="arraySpanMethod"
                        align="center"
                        prop="departshortBmSum"
                        width="180">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.departshortBmSum"
                            :disabled="true"
                            :index="indexFun"
                            :no="scope.row"
                            size="mini"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <!--Rn-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_RN')"
                        align="center"
                        prop="exrankBmSum"
                        width="180">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.exrankBmSum"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--人数-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_RS')"
                        align="center"
                        prop="peopleBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.peopleBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YGZ')"
                        align="center"
                        prop="monthBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--基本工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBGZ')"
                        align="center"
                        prop="basicBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.basicBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--职责工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_ZZGZ')"
                        align="center"
                        prop="balityBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.balityBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--补贴总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        align="center"
                        prop="totalsubsidiesBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalsubsidiesBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月度奖金-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YDJJ')"
                        align="center"
                        prop="monthlybonusBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthlybonusBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--年度奖金-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_NDJJ')"
                        align="center"
                        prop="annualbonusBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.annualbonusBmSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工资总额-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GZZE')"
                        align="center"
                        prop="tradeunionfundsBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalwagesBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工会经费-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GHJF')"
                        align="center"
                        prop="sbgsajBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.tradeunionfundsBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--（4-6）社保公司负担总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_APTOJUSBGSFDZJ')"
                        align="center"
                        prop="gjjgsfdajBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.sbgsajBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--（4-6）公积金公司负担总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_APTOJUGJJGSFDZJ')"
                        align="center"
                        prop="gjjgsfdajBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.gjjgsfdajBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--（4-6）人件费总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_APTOJURJFZJ')"
                        align="center"
                        prop="aptojuBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.aptojuBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--（7-3）社保公司负担总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JUTOMASBGSFDZJ')"
                        align="center"
                        prop="gjjgsfdajBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.sbgsjmBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--（7-3）公积金公司负担总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JUTOMAGJJGSFDZJ')"
                        align="center"
                        prop="gjjgsfdajBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.gjjgsfdjmBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--（7-3）人件费总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JUTOMARJFZJ')"
                        align="center"
                        prop="aptojuBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.jutomaBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--加班费时给-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBFSG')"
                        align="center"
                        prop="overtimepayBmSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.overtimepayBmSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                    </plx-table-grid>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start-->
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageBm" :page-size="listQuery.limitBm"
                                     :page-sizes="[5,10,20,30,100]" :total="total"
                                     layout="slot,sizes, ->,prev, pager, next, jumper"
                                     @current-change="handleCurrentChangeBm"
                                     @size-change="handleSizeChangeBm">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end-->
                  </el-tab-pane>

                  <!--公司汇总-->
                  <el-tab-pane v-if="this.rolesshow3" :label="$t('label.PFANS2036VIEW_GSHZSYJH')" name="show_third">
                    <plx-table-grid
                      :datas="tableGs"
                      :height-change="false"
                      :pagination-show="false"
                      :row-height="40"
                      border header-cell-class-name="sub_bg_color_blue"
                      highlight-current-row
                      stripe
                      style="width: 100%;height: calc(100vh - 260px - 2rem)"
                      use-virtual>
                      <!--Rn-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_RN')"
                        align="center"
                        prop="exrankGsSum"
                        width="180">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.exrankGsSum"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--人数-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_RS')"
                        align="center"
                        prop="peopleGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.peopleGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YGZ')"
                        align="center"
                        prop="monthGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--基本工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBGZ')"
                        align="center"
                        prop="basicGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.basicGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--职责工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_ZZGZ')"
                        align="center"
                        prop="balityGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.balityGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--职责工资-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        align="center"
                        prop="totalsubsidiesGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalsubsidiesGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--补贴总计-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BTZJ')"
                        align="center"
                        prop="totalsubsidiesGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalsubsidiesGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--月度奖金-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_YDJJ')"
                        align="center"
                        prop="monthlybonusGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.monthlybonusGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--年度奖金-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_NDJJ')"
                        align="center"
                        prop="annualbonusGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.annualbonusGsSum"
                            :disabled="true"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--工会经费1212-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GHJF')"
                        align="center"
                        prop="tradeunionfundsGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.tradeunionfundsGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--社保公司-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_SBGSAJ')"
                        align="center"
                        prop="sbgsajGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.sbgsajGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--公积金公司负担-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GJJGSFDAJ')"
                        align="center"
                        prop="gjjgsfdajGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.gjjgsfdajGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--4月-6月-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_APTOJU')"
                        align="center"
                        prop="aptojuGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.aptojuGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--社保公司-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_SBGSJM')"
                        align="center"
                        prop="sbgsjmGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.sbgsjmGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--公积金公司负担-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GJJGSFDJM')"
                        align="center"
                        prop="gjjgsfdjmGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.gjjgsfdjmGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--7月-3月-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JUTOMA')"
                        align="center"
                        prop="jutomaGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.jutomaGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--加班费时给-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBFSG')"
                        align="center"
                        prop="overtimepayGsSum"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.overtimepayGsSum"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                    </plx-table-grid>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start-->
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageGs" :page-size="listQuery.limitGs"
                                     :page-sizes="[5,10,20,30,100]" :total="total"
                                     layout="slot,sizes, ->,prev, pager, next, jumper"
                                     @current-change="handleCurrentChangeGs"
                                     @size-change="handleSizeChangeGs">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
                    <!--add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end-->
                  </el-tab-pane>

                  <!--人别-->
                  <el-tab-pane v-if="this.rolesshow4" :label="$t('label.PFANS2036VIEW_RB')" name="show_fourth">
                    <plx-table-grid
                      :datas="tableRb"
                      :height-change="false"
                      :pagination-show="false"
                      :row-height="40"
                      border header-cell-class-name="sub_bg_color_blue"
                      highlight-current-row
                      stripe
                      style="width: 100%;height: calc(100vh - 260px - 2rem)"
                      use-virtual>
                      <!--姓名-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_USERID')"
                        align="center"
                        prop="useridRb"
                        width="120">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.useridRb"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--部门简称-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BMJC')"
                        align="center"
                        prop="departshortRb"
                        width="100">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.departshortRb"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          >
                          </el-input>
                        </template>
                      </plx-table-column>
                      <!--RN-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_RN')"
                        align="center"
                        prop="ltrankRb"
                        width="80">
                        <template slot-scope="scope">
                          <el-input
                            v-show="false"
                            v-model="scope.row.ltrankRb"
                            :no="scope.row"
                          >
                          </el-input>
                          <el-input
                            v-model="scope.row.ltrankRbshow"
                            :disabled="true"
                            :no="scope.row"
                            size="mini"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <!--工资总额-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_GZZE')"
                        align="center"
                        prop="totalwagesRb"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.totalwagesRb"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>
                      <!--加班费-->
                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_JBF')"
                        align="center"
                        prop="overtimepayRb"
                        width="155">
                        <template slot-scope="scope">
                          <el-input-number
                            v-model="scope.row.overtimepayRb"
                            :disabled="!disabled"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right" size="mini">
                          </el-input-number>
                        </template>
                      </plx-table-column>

                      <plx-table-column
                        :label="$t('label.PFANS2036VIEW_BASMONTHAPTOJU')"
                        width="150">
                        <!--养老保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJAJ')"
                          align="center"
                          prop="oldylbxjajRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.oldylbxjajRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--失业保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJAJ')"
                          align="center"
                          prop="lossybxjajRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.lossybxjajRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--工伤保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GSBXJAJ')"
                          align="center"
                          prop="gsbxjajRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gsbxjajRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--医疗保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_YLBXJAJ')"
                          align="center"
                          prop="ylbxjajRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.ylbxjajRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--生育保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SYBXJAJ')"
                          align="center"
                          prop="sybxjajRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sybxjajRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金基数-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GJJJSAJ')"
                          align="center"
                          prop="gjjjsajRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gjjjsajRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                      </plx-table-column>

                      <plx-table-column :label="$t('label.PFANS2036VIEW_BASMONTHJUTOMA')"
                                        width="150">
                        <!--养老保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_OLDYLBXJJM')"
                          align="center"
                          prop="oldylbxjjmRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.oldylbxjjmRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--失业保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_LOSSYBXJJM')"
                          align="center"
                          prop="lossybxjjmRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.lossybxjjmRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--工伤保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GSBXJJM')"
                          align="center"
                          prop="gsbxjjmRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gsbxjjmRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--医疗保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_YLBXJJM')"
                          align="center"
                          prop="ylbxjjmRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.ylbxjjmRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--生育保险基-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_SYBXJJM')"
                          align="center"
                          prop="sybxjjmRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.sybxjjmRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                        <!--公积金基数-->
                        <plx-table-column
                          :label="$t('label.PFANS2036VIEW_GJJJSJM')"
                          align="center"
                          prop="gjjjsjmRb"
                          width="155">
                          <template slot-scope="scope">
                            <el-input-number
                              v-model="scope.row.gjjjsjmRb"
                              :disabled="!disabled"
                              :no="scope.row"
                              :precision="2"
                              controls-position="right" size="mini">
                            </el-input-number>
                          </template>
                        </plx-table-column>
                      </plx-table-column>
                      <plx-table-column :label="$t('label.PFANS2036VIEW_PERSONALCOST')"
                                        width="150">
                        <!--四月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_SY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="aprilPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.aprilPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="aprilTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.aprilTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--五月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_WY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="mayPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.mayPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="mayTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.mayTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--六月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_LY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="junePlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.junePlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="juneTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.juneTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--七月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_QY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="julyPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.julyPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="julyTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.julyTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--八月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_BY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="augPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.augPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="augTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.augTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--九月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_JY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="sepPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.sepPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="sepTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.sepTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--十月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_TY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="octPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.octPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="octTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.octTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--十一月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_SYY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="novePlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.novePlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="noveTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.noveTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--十二月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_SEY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="decePlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.decePlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="deceTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.deceTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--一月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_YY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="janPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.janPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="janTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.janTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--二月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_EY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="febPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.febPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="febTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.febTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                        <!--三月-->
                        <plx-table-column :label="$t('label.PFANS2036VIEW_STY')"
                                          width="150">
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_PLAN')"
                            align="center"
                            prop="marPlan"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.marPlan"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                          <plx-table-column
                            :label="$t('label.PFANS2036VIEW_TRUE')"
                            align="center"
                            prop="marTrue"
                            width="155">
                            <template slot-scope="scope">
                              <el-input-number
                                v-model="scope.row.marTrue"
                                :disabled="!disabled"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right" size="mini">
                              </el-input-number>
                            </template>
                          </plx-table-column>
                        </plx-table-column>
                      </plx-table-column>
                      <!--操作-->
                      <plx-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disabled"
                            plain
                            size="small"
                            type="danger"
                            @click.native.prevent="deleteRowRb(scope.$rowIndex, tableRb)"
                          >{{ $t('button.delete') }}
                          </el-button>
                          <el-button
                            :disabled="!disabled"
                            plain
                            size="small"
                            type="primary"
                            @click="addRowRb()"
                          >{{ $t('button.insert') }}
                          </el-button>
                        </template>
                      </plx-table-column>
                    </plx-table-grid>
                    <div class="pagination-container" style="padding-top: 2rem">
                      <el-pagination :current-page.sync="listQuery.pageRb" :page-size="listQuery.limitRb"
                                     :page-sizes="[5,10,20,30,50]" :total="total"
                                     layout="slot,sizes, ->,prev, pager, next, jumper"
                                     @current-change="handleCurrentChangeRb"
                                     @size-change="handleSizeChangeRb">
                        <slot><span class="front Content_front"
                                    style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                      </el-pagination>
                    </div>
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
import {
  getCurrentRole,
  getCurrentRole14,
  getCurrentRole19,
  getCurrentRole3,
  getDictionaryInfo,
  getOrgInfo,
} from '../../../../utils/customize';
import EasyNormalContainer from '@/components/EasyNormalContainer';
import dicselect from '../../../components/dicselect';
import EasyNormalTable from '@/components/EasyNormalTable';
import user from '../../../components/user.vue';
import {Message} from 'element-ui';
import moment from 'moment';

export default {
  name: 'PFANS2036FormView',
  components: {
    dicselect,
    EasyNormalContainer,
    EasyNormalTable,
    user,
  },
  data() {
    return {
      roles: '',
      // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
      listQuery: {
        pageData: 1,
        limitData: 10,
        pageBm: 1,
        limitBm: 10,
        pageGs: 1,
        limitGs: 10,
        pageRb: 1,
        limitRb: 10,
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
      tableDataCopy: [],
      tableGsCopy: [],
      tableBmCopy: [],
      tableRbCopy: [],
      // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
      ranksList: {},
      multiple: false,
      selectType: 'Single',
      //add-lyt-21/1/22-禅道任务645-start
      rolesshow1: false,
      rolesshow2: false,
      rolesshow3: false,
      rolesshow4: false,
      form: {
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
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
        {
          key: 'recalculation',
          name: 'button.recalculation',
          disabled: true,
          icon: 'el-icon-check',
        },
      ];
    }
  },
  mounted() {
    this.roles = getCurrentRole19();
    this.form.yearsantid = this.$route.params._id;
    this.getById();
    this.getChangeRanks();
    //add-lyt-21/1/22-禅道任务645-start
    let role = getCurrentRole();
    let role3 = getCurrentRole3();
    let role14 = getCurrentRole14();
    if (role3 === '0') {   //财务部长
      this.rolesshow2 = true;
    } else if (role14 === '0') {  //人事总务部长
      this.rolesshow1 = true;
      this.rolesshow2 = true;
      this.rolesshow3 = true;
      this.rolesshow4 = true;
    } else if (role === '3' || role === '2') {  //GM
      this.rolesshow4 = true;
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
    //         this.$message.error({
    //           message: err,
    //           type: "error",
    //           duration: 5 * 1000
    //         });
    //       });
    //   }
    //   this.getChangeRanks();
    // },
    // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
    handleSizeChange(val) {
      this.listQuery.limitData = val;
      this.cutList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageData = val;
      this.cutList();
    },
    handleSizeChangeGs(val) {
      this.listQuery.limitGs = val;
      this.cutList();
    },
    handleCurrentChangeGs(val) {
      this.listQuery.pageGs = val;
      this.cutList();
    },
    handleSizeChangeBm(val) {
      this.listQuery.limitBm = val;
      this.cutList();
    },
    handleCurrentChangeBm(val) {
      this.listQuery.pageBm = val;
      this.cutList();
    },
    handleSizeChangeRb(val) {
      this.listQuery.limitRb = val;
      this.cutList();
    },
    handleCurrentChangeRb(val) {
      this.listQuery.pageRb = val;
      this.cutList();
    },
    cutList() {
      this.loading = true;
      if (this.activeName === 'show_first' && this.tableData) {
        let start = (this.listQuery.pageData - 1) * this.listQuery.limitData;
        let end = this.listQuery.pageData * this.listQuery.limitData;
        let pList = this.tableDataCopy.slice(start, end);
        this.tableData = pList;
        this.total = this.tableDataCopy.length;
      } else if (this.activeName === 'show_second' && this.tableBm) {
        let start = (this.listQuery.pageBm - 1) * this.listQuery.limitBm;
        let end = this.listQuery.pageBm * this.listQuery.limitBm;
        let pList = this.tableBmCopy.slice(start, end);
        this.tableBm = pList;
        this.total = this.tableBmCopy.length;
      } else if (this.activeName === 'show_third' && this.tableGs) {
        let start = (this.listQuery.pageGs - 1) * this.listQuery.limitGs;
        let end = this.listQuery.pageGs * this.listQuery.limitGs;
        let pList = this.tableGsCopy.slice(start, end);
        this.tableGs = pList;
        this.total = this.tableGsCopy.length;
      } else if (this.activeName === 'show_fourth' && this.tableRb) {
        let start = (this.listQuery.pageRb - 1) * this.listQuery.limitRb;
        let end = this.listQuery.pageRb * this.listQuery.limitRb;
        let pList = this.tableRbCopy.slice(start, end);
        this.tableRb = pList;
        this.total = this.tableRbCopy.length;
      }
      this.loading = false;
    },
    // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
    getChangeRanks() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2036Store/getChangeRanks')
        .then(response => {
          this.ranksList = response;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },
    // getPersonalCost() {
    //   let groupid = this.group_id;
    //   this.loading = true;
    //   let params = {
    //     groupid: groupid,
    //     yearsantid: this.$route.params._id
    //   };
    //   this.$store
    //     .dispatch("PFANS2036Store/getPersonalCost", params)
    //     .then(response => {
    //       for (let u = 0; u < response.length; u++) {
    //         let exrankinfo = getDictionaryInfo(response[u].exrank);
    //         if (exrankinfo != null) {
    //           response[u].exrank = exrankinfo.value1;
    //         }
    //       }
    //       this.tableData = response;
    //       this.loading = false;
    //     })
    //     .catch(err => {
    //       this.loading = false;
    //       this.$message.error({
    //         message: err,
    //         type: "error",
    //         duration: 5 * 1000
    //       });
    //     });
    // },
    getById() {
      this.loading = true;
      // if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7'
      //   || this.$store.getters.userinfo.userid === '5e78b22c4e3b194874180f5f') {
      if (this.roles === '0') {
        let vote1 = [];
        vote1.push(
          {
            value: '全部',
            lable: '全部',
          },
        );
        let letoptionsdata = [];
        this.$store.getters.orgGroupList.filter((item) => {
          letoptionsdata.push(
            {
              value: item.centerid,
              lable: item.companyen,
            },
          );
        });
        let incfmyList = [];
        for (let item of letoptionsdata) {
          if (getOrgInfo(item.value).encoding == '') {
            incfmyList.push(item.value);
          }
        }
        if (incfmyList.length > 0) {
          for (let item of incfmyList) {
            letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item);
          }
          let orgInfo = [];
          for (let item of incfmyList) {
            if (item) {
              if (getOrgInfo(item).orgs.length != 0) {
                orgInfo.push(getOrgInfo(item).orgs);
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for (let item of groInfo) {
            letoptionsdata.push(
              {
                value: item._id,
                lable: item.companyen,
              },
            );
          }
        }
        this.optionsGroupdata = vote1.concat(letoptionsdata);
      }
      this.loading = false;
    },
    hanldeScroll(e) {
      // 获取eagleMapContainer的真实高度
      const boxHeight = document.getElementById('eagleMapContainer').offsetHeight;
      // 获取table_list的真实高度（浮动内容的真实高度）
      const tableHeight = document.getElementById('table_list').offsetHeight;
      // boxHeight和滑块浮动的高度相差小于50 && 不在加载中 && 不是最后一页
      alert(this.tableList.length);
      if (tableHeight - (e.target.scrollTop + boxHeight) < 50 && !this.loading && this.listPage < (this.tableList.length / 300)) {
        // 第一次触发时，记录滑块高度
        // data里scrollTop，listPage默认为0
        if (!this.scrollTop) {
          this.scrollTop = e.target.scrollTop;
        }
        // 触发下拉加载更多
        this.queryMoreStat(true, tableHeight, boxHeight);
      } else if (e.target.scrollTop === 0 && !this.loading) {
        // 如果滑块上拉到顶部，则向上加载300条
        this.queryMoreStat(false, tableHeight, boxHeight);
      }
    },
    queryMoreStat(type, tableHeight, boxHeight) {
      this.loading = true;
      // 触底加载
      if (type) {
        this.listPage = this.listPage + 1;
        const centerPage = this.listPage * 300;
        const startPage = centerPage >= 300 ? centerPage - 300 : centerPage;
        const endPage = centerPage + 600;
        const newList = this.tableList.slice(startPage, endPage);
        if (this.listPage > 0) {
          const box = document.getElementById('eagleMapContainer');
          // 视图跳到触发的数据，补回50的高度差值
          box.scrollTop = this.scrollTop + 50;
        }
        this.list = newList;
      } else {
        // 置顶加载
        if (this.listPage > 0) {
          this.listPage = this.listPage - 1;
          const centerPage = this.listPage * 300;
          const startPage = centerPage >= 300 ? centerPage - 300 : centerPage;
          const endPage = centerPage + 600;
          const newList = this.tableList.slice(startPage, endPage);
          if (this.listPage > 0) {
            const box = document.getElementById('eagleMapContainer');
            box.scrollTop = tableHeight - this.scrollTop - boxHeight;
          }
          this.list = newList;
        } else {
          this.list = this.tableList.slice(0, 300);
        }
      }
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    // 合并合计第一行
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          return [0, 0];
        } else if (columnIndex === 1) {
          return [1, 2];
        }
      }
    },
    indexFun(index) {
      return index;
    },
    handleClick() {
      if (this.activeName === 'show_fourth') {
        this.gettableRb();
        let role14 = getCurrentRole14();
        if (role14 === '0') {
          this.buttonList[1].disabled = false;
        }
      } else if (this.activeName === 'show_second') {
        this.gettableBm();
        this.buttonList[1].disabled = true;
      } else if (this.activeName === 'show_third') {
        this.gettableGs();
        this.buttonList[1].disabled = true;
      }
    },
    gettableBm() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2036Store/gettableBm', {yearsantid: this.$route.params._id})
        .then(response => {
          for (let u = 0; u < response.length; u++) {
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
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },
    gettableGs() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2036Store/gettableGs', {yearsantid: this.$route.params._id})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
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
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },
    gettableRb() {
      this.loading = true;
      this.$store
        .dispatch('PFANS2036Store/gettableRb', {yearsantid: this.$route.params._id})
        .then(response => {
          for (let u = 0; u < response.length; u++) {
            let ltrankinfo = getDictionaryInfo(response[u].ltrankRb);
            if (ltrankinfo != null) {
              response[u].ltrankRbshow = ltrankinfo.value1;
            }
          }
          let sortAnt = this.$store.getters.userinfo.userinfo.budgetunit;
          let rbList = response.filter(item => item.departshortRb == sortAnt);
          this.tableRb = rbList;
          this.tableRbCopy = rbList;
          this.cutList();
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },

    // changeGroup(val) {
    //   this.group_id = val;
    //   if (this.group_id) {
    //     this.getPersonalCost();
    //   }
    // },
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
        }];
      }
    },
    addRow() {
      this.tableData.push({
        userid: '',
        username: '新人',
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
    SearchBar() {
      this.loading = true;
      let params = {
        yearsantid: this.form.yearsantid,
        username: this.form.username,
        rnAnt: this.form.rnAnt,
        allotmentAnt: this.form.allotmentAnt,
        group_id: this.form.group_id,
      };
      this.$store
        .dispatch('PFANS2036Store/getFuzzyQuery', params)
        .then(response => {
          for (let u = 0; u < response.length; u++) {
            let ltrankinfo = getDictionaryInfo(response[u].ltrank);
            if (ltrankinfo != null) {
              response[u].ltrankshow = ltrankinfo.value1;
            }
            let exrankinfo = getDictionaryInfo(response[u].exrank);
            if (exrankinfo != null) {
              response[u].exrankshow = exrankinfo.value1;
            }
            let changerankinfo = getDictionaryInfo(response[u].changerank);
            if (changerankinfo != null) {
              response[u].changerank = changerankinfo.value1;
            }
            let allotmentinfo = getDictionaryInfo(response[u].allotment);
            if (allotmentinfo != null) {
              response[u].allotment = allotmentinfo.value1;
            }
            if (response[u].indalian != null && response[u].indalian != '' && response[u].indalian != undefined) {
              if (response[u].indalian === '0') {
                response[u].indalianShow = '否';
              } else {
                response[u].indalianShow = '是';
              }
            } else {
              response[u].indalianShow = '否';
            }
          }
          this.tableData = response;
          // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-start
          this.tableDataCopy = response;
          this.cutList();
          // add-lyt-21/02/22-NT_PFANS_20210222_BUG_022-end
          this.loading = false;
        });
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
        }];
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
    changeRank(val, row) {
      row.changerank = val;
      if (val === 'PR069002') {
        // let ltrankant = '';
        // for(row.exrank in this.ranksMap){
        //   ltrankant = this.ranksMap[]; //注意是 [  ]
        // }
        let ranksListAnt = this.ranksList.filter(item => item.value1 == row.exrankshow);
        row.ltrankshow = getDictionaryInfo(ranksListAnt[0].value11).value1;
        row.ltrank = ranksListAnt[0].value11;
      } else {
        row.ltrankshow = row.exrankshow;
        row.ltrank = row.exrank;
      }
    },
    buttonClick(val) {
      if (val === 'save') {
        this.loading = true;
        this.$store
          .dispatch('PFANS2036Store/upPersonalCost', this.tableData)
          .then(response => {
            Message({
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 5 * 1000,
            });
            this.loading = false;
            this.SearchBar();
          })
          .catch(err => {
            this.loading = false;
            this.$message.error({
              message: err,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      } else if (val === 'recalculation') {
        this.loading = true;
        this.$store
          .dispatch('PFANS2036Store/upPersonalCostRb')
          .then(response => {
            Message({
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 5 * 1000,
            });
            this.loading = false;
            this.SearchBar();
          })
          .catch(err => {
            this.loading = false;
            this.$message.error({
              message: err,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
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
