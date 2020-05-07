<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :noback="true" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize" style="width: 100%">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px" :rules="rules">

          <el-form-item>
            <el-row style="padding-top: 30px">
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year" :error="erroryear">
                  <div class="block">
                    <el-date-picker
                      type="year"
                      @change="changeYear"
                      :disabled="false"
                      style="width: 18vw"
                      v-model="form.year">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="7" >-->
              <!--                <el-form-item :label="$t('label.PFANS1039FORMVIEW_GROUP')" :error="errorgroup"  prop="group">-->
              <!--                  <div class="block">-->
              <!--                    <org :disabled="false" :error="errorgroup" :orglist="form.group_id" @getOrgids="getGroupId"-->
              <!--                         orgtype="2" style="width:20vw"></org>-->
              <!--                  </div>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS5009FORMVIEW_MONTH')" :error="errormonth" prop="month">
                  <div class="block">
                    <el-select v-model="form.region" @change="changeRegion">
                      <el-option :label="$t('label.January')" value="01"></el-option>
                      <el-option :label="$t('label.February')" value="02"></el-option>
                      <el-option :label="$t('label.March')" value="03"></el-option>
                      <el-option :label="$t('label.April')" value="04"></el-option>
                      <el-option :label="$t('label.May')" value="05"></el-option>
                      <el-option :label="$t('label.June')" value="06"></el-option>
                      <el-option :label="$t('label.July')" value="07"></el-option>
                      <el-option :label="$t('label.August')" value="08"></el-option>
                      <el-option :label="$t('label.September')" value="09"></el-option>
                      <el-option :label="$t('label.October')" value="10"></el-option>
                      <el-option :label="$t('label.November')" value="11"></el-option>
                      <el-option :label="$t('label.December')" value="12"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1039FORMVIEW_GROUP')" :error="errorgroup" prop="group">
                  <el-select v-model="form.group_id" style="width: 20vw"
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
            <!--            <el-row style="padding-top: 30px">-->
            <!--              <el-table :data="tableData" @selection-change="handleSelectionChange()"-->
            <!--                        header-cell-class-name="sub_bg_color_blue" stripe-->
            <!--                        style="width: 100%;height: calc(100vh - 200px - 2rem)"-->
            <!--                        border>-->
            <!--              </el-table>-->
            <!--            </el-row>-->
          </el-form-item>
        </el-form>

        <pl-table
          :datas="tableData" @selection-change="handleSelectionChange()"
          border ref="plx"
          stripe use-virtual :pagination-show="paginationShow"
          style="width: 100%;height: calc(100vh - 200px - 2rem)"
          tooltip-effect="dark" cell-class-name="row_height_left"
          header-cell-class-name="sub_bg_color_blue" header-row-class-name="height"
          big-data-checkbox highlight-current-row
        >
          <!-- 序号-->
          <pl-table-column
            :label="$t('label.PFANS2026FORMVIEW_ORDERNUMBER')"
            align="center"
            type="index"
            fixed
            width="50"
          ></pl-table-column>
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_MONERTYPE')"
            align="center">
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_DETAILS')"
              align="center"
              show-overflow-tooltip
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.pj}}</span>
              </template>
            </pl-table-column>

            <!--                  <pl-table-column-->
            <!--                    :label="$t('label.PFANS1042FORMVIEW_COMMONPJ')"-->
            <!--                    align="center"-->
            <!--                    width="160">-->
            <!--                    <template slot-scope="scope">-->
            <!--                      <span>{{scope.row.pj1}}</span>-->
            <!--                    </template>-->

            <!--                  </pl-table-column>-->
          </pl-table-column>
          <!--          売上-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_INCOME')"
            align="center">
            <!--            技術開発・海外役務-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTST')"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.outst1}}</span>
              </template>

            </pl-table-column>

            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_TAX')"-->
            <!--              align="center"-->
            <!--              width="110">-->

            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.tax}}</span>-->
            <!--              </template>-->

            <!--            </pl-table-column>-->

            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TAXYW')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.outst2}}</span>
              </template>
            </pl-table-column>

            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TAXSA')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.outst3}}</span>
              </template>
            </pl-table-column>
            <!--            内部受託-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INST')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.inst}}</span>
              </template>

            </pl-table-column>
            <!--            部門売上合計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_CENTERINTOTAL')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.centerintotal}}</span>
              </template>
            </pl-table-column>
            <!--            売上合計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INTOTAL')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.intotal}}</span>
              </template>
            </pl-table-column>
          </pl-table-column>

          <!--          一般管理販売費-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_EXPENDITURE')"
            align="center">
            <!--            人件費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PEOCOST')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.peocost}}</span>
              </template>

            </pl-table-column>
            <!--            厚生費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TWOCOST')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.twocost}}</span>
              </template>

            </pl-table-column>
            <!--            人件費小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PEOCOSTSUM')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.peocostsum}}</span>
              </template>

            </pl-table-column>
            <!--            減価償却費（設備）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_DEPRECIATIONSOFT')"
              align="center"
              width="150"
              prop="depreciationsoft">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="0" :precision="2"
                  :max="9999999"
                  controls-position="right"
                  :no="scope.row"
                  :step="1"
                  v-model="scope.row.depreciationsoft"
                  style="width: 100%">
                </el-input-number>
                <!--                <span>{{scope.row.depreciationsoft}}</span>-->
              </template>
            </pl-table-column>
            <!--            減価償却費（ソフト）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_DEPRECIATIONEQUIPMENT')"
              align="center"
              width="160"
              prop="depreciationequipment">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="0" :precision="2"
                  :max="9999999"
                  controls-position="right"
                  :no="scope.row"
                  :step="1"
                  v-model="scope.row.depreciationequipment"
                  style="width: 100%">
                </el-input-number>
                <!--                <span>{{scope.row.depreciationequipment}}</span>-->
              </template>
            </pl-table-column>
            <!--            オフィス家賃-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_RENT')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.rent}}</span>
              </template>
            </pl-table-column>
            <!--            リース費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_LEASECOST')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.leasecost}}</span>
              </template>
            </pl-table-column>
            <!--            出向者賃借料-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TEMPORARYRENT')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.temporaryrent}}</span>
              </template>
            </pl-table-column>
            <!--            その他(固定費)-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHER')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.other}}</span>
              </template>
            </pl-table-column>
            <!--            固定資産費用小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_COSTSUBTOTAL')"
              align="center"
              width="150">
              <template slot-scope="scope">
                <span>{{scope.row.costsubtotal}}</span>
              </template>
            </pl-table-column>
            <!--            研究材料費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_RESEARCHCOST')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.researchcost}}</span>
              </template>
            </pl-table-column>
            <!--            調査費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_SURVEYFEE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.surveyfee}}</span>
              </template>
            </pl-table-column>
            <!--            内部委託支出-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INWEITUO')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.inwetuo}}</span>
              </template>
            </pl-table-column>
            <!--            外注費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTCOST')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.outcost}}</span>
              </template>

            </pl-table-column>
            <!--            その他(ソフト費)-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHERSOFTWAREFREE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.othersoftwarefree}}</span>
              </template>
            </pl-table-column>
            <!--            研究開発費・ソフト費用小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXPENSESSUBTOTAL')"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.departmenttotal}}</span>
              </template>
            </pl-table-column>
            <!--            管理・共通部門配賦-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_MANCOMMONDEPT')"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.expensessubtotal}}</span>
              </template>
            </pl-table-column>
            <!--            DEL_FJL-->
            <!--            &lt;!&ndash;            振替１&ndash;&gt;-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_TRANSFERONE')"-->
            <!--              align="center"-->
            <!--              width="110">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.transferone}}</span>-->
            <!--              </template>-->
            <!--            </pl-table-column>-->
            <!--            &lt;!&ndash;            振替２&ndash;&gt;-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_TRANSFERTWO')"-->
            <!--              align="center"-->
            <!--              width="110">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.transfertwo}}</span>-->
            <!--              </template>-->
            <!--            </pl-table-column>-->
            <!--            DEL_FJL-->
            <!--            配賦部門費小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_ALLOCATIONSUM')"
              align="center"
              width="150">
              <template slot-scope="scope">
                <span>{{scope.row.allocationsum}}</span>
              </template>
            </pl-table-column>
            <!--            部門共通費用合計-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_DEPARTMENTTOTAL')"-->
            <!--              align="center"-->
            <!--              width="170">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.departmenttotal}}</span>-->
            <!--              </template>-->
            <!--            </pl-table-column>-->
            <!--            原動費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_YUANQINCOST')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.yuanqincost}}</span>
              </template>
            </pl-table-column>
            <!--            旅費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TRAVALCOST')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.travalcost}}</span>
              </template>

            </pl-table-column>
            <!--            消耗費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_CALLCOST')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.callcost}}</span>
              </template>

            </pl-table-column>
            <!--            通信費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_CONCOST')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.concost}}</span>
              </template>

            </pl-table-column>
            <!--            会議費/交際費/研修費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_THREEFREE')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.threefree}}</span>
              </template>
            </pl-table-column>
            <!--            共同事務費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_COMMONFEE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.commonfee}}</span>
              </template>
            </pl-table-column>

            <!--            ブランド使用料-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_BRANDCOST')"
              align="center"
              width="150">

              <template slot-scope="scope">
                <span>{{scope.row.brandcost}}</span>
              </template>

            </pl-table-column>
            <!--            その他経費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHEREXPENSES')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.otherexpenses}}</span>
              </template>
            </pl-table-column>
            <!--            仕掛品-->

            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PRO')"
              align="center"
              width="110">

              <template slot-scope="scope">
                <span>{{scope.row.process}}</span>
              </template>

            </pl-table-column>
            <!--            その他利益-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHERINCOME')"
              align="center"
              width="200"
              prop="otherincome">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="0" :precision="2"
                  :max="9999999"
                  controls-position="right"
                  :no="scope.row"
                  :step="1"
                  v-model="scope.row.otherincome"
                  @change="changeOtherincome(scope.row)"
                  style="width: 100%">
                </el-input-number>
              </template>
            </pl-table-column>

            <!--            その他諸経費小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHEREXPENTOTAL')"
              align="center"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.otherexpentotal}}</span>
              </template>
            </pl-table-column>
            <!--            部門共通按分-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_DEPARTMENTCOST')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.departmentcom}}</span>
              </template>
            </pl-table-column>
            <!--            配賦費用-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_ALLOCATION')"-->
            <!--              align="center"-->
            <!--              width="110">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.allocation}}</span>-->
            <!--              </template>-->
            <!--            </pl-table-column>-->
            <!--            合計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_COSTTOTAL')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.costtotal}}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          営業利益-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_OPERATION')"
            align="center"
            width="110">
            <template slot-scope="scope">
              <span>{{scope.row.Operating}}</span>
            </template>
          </pl-table-column>
          <!--          損--マイナス-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_LOSSMINUS')">
            <!--            金利-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INTERESTRATE')"
              align="center"
              width="200"
              prop="interestrate">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="0" :precision="2"
                  :max="9999999"
                  controls-position="right"
                  :no="scope.row"
                  :step="1"
                  v-model="scope.row.interestrate"
                  @change="changeIntere(scope.row)"
                  style="width: 100%">
                </el-input-number>
              </template>
            </pl-table-column>
            <!--            為替-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXCHANGE')"
              align="center"
              width="200"
              prop="exchanges">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="0" :precision="2"
                  :max="9999999"
                  controls-position="right"
                  :no="scope.row"
                  :step="1"
                  v-model="scope.row.exchanges"
                  @change="changeIntere(scope.row)"
                  style="width: 100%">
                </el-input-number>
              </template>
            </pl-table-column>
            <!--            営業外損益-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OPERATINGPROFIT')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.operatingprofit}}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          税引前利益-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_PRETAXPROFIT')"
            align="center"
            width="110">
            <template slot-scope="scope">
              <span>{{scope.row.pretaxprofit}}</span>
            </template>
          </pl-table-column>
          <!--          税金引当金-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_TAXALLOWANCE')"
            align="center"
            width="200"
            prop="taxallowance">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                :min="0" :precision="2"
                :max="9999999"
                controls-position="right"
                :no="scope.row"
                :step="1"
                @change="changeTaxallowance(scope.row)"
                v-model="scope.row.taxallowance"
                style="width: 100%">
              </el-input-number>
            </template>
          </pl-table-column>
          <!--          税引後利益-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_POSTTAXBENEFIT')"
            align="center"
            width="110">
            <template slot-scope="scope">
              <span>{{scope.row.posttaxbenefit}}</span>
            </template>
          </pl-table-column>
          <!--          営業利益率-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_OPERATINGMARGIN')"
            align="center"
            width="110">
            <template slot-scope="scope">
              <span>{{scope.row.operatingmargin}}</span>
            </template>
          </pl-table-column>
          <!--          人員（名）-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_PERSONNAME')">
            <!--            社員工数-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_EMHOURS')"-->
            <!--              align="center"-->
            <!--              width="110">-->

            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.emhours}}</span>-->
            <!--              </template>-->

            <!--            </pl-table-column>-->
            <!--            外注工数-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_OUTHOURS')"-->
            <!--              align="center"-->
            <!--              width="110">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.outhours}}</span>-->
            <!--              </template>-->

            <!--            </pl-table-column>-->
            <!--            構外外注(工数)-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCINGHOURS')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.outsourcinghours}}</span>
              </template>
            </pl-table-column>
            <!--            構内外注（名）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCINGNAME')"
              align="center"
              width="130">
              <template slot-scope="scope">
                <span>{{scope.row.outsourcingname}}</span>
              </template>
            </pl-table-column>
            <!--            社員（名）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EMPLOYEENAME')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.employeename}}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          工数(人月)-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_EFFORTMONTH')">
            <!--            外注（構外∔構内）PJ工数-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCINGPJHOURS')"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.outsourcingpjhours}}</span>
              </template>
            </pl-table-column>
            <!--            外注（構外∔構内）稼働工数-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCING')"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.outsourcing}}</span>
              </template>
            </pl-table-column>
            <!--            社員PJ工数  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EMPLOYEEPJHOURS')"
              align="center"
              width="130">
              <template slot-scope="scope">
                <!--                <span>{{scope.row.employeepjhours}}</span>-->
                <span>{{scope.row.emhours}}</span>
              </template>
            </pl-table-column>
            <!--            社員稼働工数  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EMPLOYEEUPTIME')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.employeeuptime}}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          稼働率（%）-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_CROPPINGRATE')">
            <!--            外注PJ稼働率-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXTERNALPJRATE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.externalpjrate}}</span>
              </template>
            </pl-table-column>
            <!--            外注稼働率-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXTERNALINJECTIONRATE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.externalinjectionrate}}</span>
              </template>
            </pl-table-column>
            <!--            社員PJ稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_MEMBERPJRATE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.memberpjrate}}</span>
              </template>
            </pl-table-column>
            <!--            社員稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_MEMBERSHIPRATE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.membershiprate}}</span>
              </template>
            </pl-table-column>
            <!--            全員PJ稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PJRATEEMPLOYEES')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.pjrateemployees}}</span>
              </template>
            </pl-table-column>
            <!--            全員稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_STAFFINGRATE')"
              align="center"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.staffingrate}}</span>
              </template>
            </pl-table-column>
          </pl-table-column>

          <!--          <pl-table-column-->
          <!--            :label="$t('label.PFANS1042FORMVIEW_PROFIT')"-->
          <!--            align="center">-->

          <!--            <pl-table-column-->
          <!--              :label="$t('label.PFANS1042FORMVIEW_ARGINAL')"-->
          <!--              align="center"-->
          <!--              width="110">-->
          <!--              <template slot-scope="scope">-->
          <!--                <span>{{scope.row.marginal}}</span>-->
          <!--              </template>-->
          <!--            </pl-table-column>-->


          <!--          </pl-table-column>-->

        </pl-table>

      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import moment from 'moment';
    import {Message} from 'element-ui';
    import user from '../../../components/user.vue';
    import org from '../../../components/org';
    import {getDictionaryInfo} from '@/utils/customize';
    import {getOrgInfoByUserId} from '../../../../utils/customize';
    import {getDownOrgInfo, getCurrentRole, getCurrentRole3} from '@/utils/customize';

    export default {
        name: 'PFANS1042View',
        components: {
            EasyNormalContainer,
            user,
            org,
        },
        data() {
            var years = (rule, value, callback) => {
                if (!this.form.year || this.form.year === '' || this.form.year === 'undefined') {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')));
                    this.error = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                } else {
                    callback();
                    this.error = '';
                }
            };

            var groups = (rule, value, callback) => {

                if (!this.form.group_id || this.form.group_id === '' || this.form.group_id === 'undefined') {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP')));
                    this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                } else {
                    callback();
                    this.errorgroup = '';
                }
            };

            var months = (rule, value, callback) => {
                if (!this.form.region || this.form.region === '' || this.form.region === 'undefined') {
                    callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH')));
                    this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                } else {
                    callback();
                    this.errormonth = '';
                }
            };
            return {
                paginationShow: false,
                errormonth: '',
                errorgroup: '',
                erroryear: '',
                loading: false,
                baseInfo: {},
                scope: '',
                optionsdata: [],
                row: '',
                form: {
                    year: '',
                    group_id: '',
                    region: '',

                },

                rules: {

                    year: [{
                        required: true,
                        validator: years,
                        trigger: 'change',
                    }],
                    group: [{
                        required: true,
                        validator: groups,
                        trigger: 'change',
                    }],
                    month: [{
                        required: true,
                        validator: months,
                        trigger: 'change',
                    }],

                },

                tableData: [],
                data: [],
                multipleSelection: [],
                userlist: '',
                title: 'title.PFANS1042VIEW',
                disabled: false,
                disable: true,
                buttonList: [],
            };
        },
        //add-ws-5/7-财务部长可用保存
        created() {
            let role1 = getCurrentRole3();
            if (role1 === '0') {
                this.buttonList = [{
                    'key': 'save',
                    'name': 'button.save',
                    'disabled': false,
                }];
            } else {
                this.buttonList = [];
            }
        },
        //add-ws-5/7-财务部长可用保存
        mounted() {
            // this.getList();
            this.getById();
            // this.getOrgInformation();

        },
        methods: {
            //add_fjl --start
            changeIntere(val) {
                //--(営業外損益)自动计算
                val.operatingprofit = (val.interestrate + val.exchanges).toFixed(2);
                //--(税引前利益)自动计算
                val.pretaxprofit = (Number(val.operatingprofit) + Number(val.Operating)).toFixed(2);
            },
            changeTaxallowance(val) {
                //--(税引後利益)自动计算
                val.posttaxbenefit = (Number(val.pretaxprofit) - Number(val.taxallowance)).toFixed(2);
            },
            changeOtherincome(val) {
                //--その他諸経費小計
                val.otherexpentotal = (Number(val.yuanqincost) + Number(val.travalcost) + Number(val.callcost)
                    + Number(val.concost) + Number(val.threefree) + Number(val.commonfee) + Number(val.brandcost)
                    + Number(val.otherexpenses) + Number(val.otherincome) + Number(val.process)).toFixed(2);
                //--営業利益
                val.Operating = (Number(val.intotal) - Number(val.peocostsum) - Number(val.costsubtotal) - Number(val.departmenttotal) - Number(val.allocationsum) - Number(val.otherexpentotal)).toFixed(2);
                //--営業利益率 = 営業利益 / 売上合計
                if (Number(val.intotal) > 0) {
                    val.operatingmargin = ((Number(val.Operating) / Number(val.intotal)) * 100).toFixed(2) + '%';
                } else {
                    val.operatingmargin = 0;
                }

            },
            //add_fjl --end
            changeRegion(val) {
                this.form.region = val;
                if (this.form.group_id && this.form.year && this.form.region) {
                    this.getList(this.form.group_id, this.form.year, this.form.region);
                } else {
                    if (!this.form.group_id || this.form.group_id === '' || !this.form.year || this.form.year === '') {
                        if (!this.form.group_id) {
                            this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                        }
                        if (!this.form.year) {
                            this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                        }

                    } else {
                        this.errorgroup = '';
                    }
                }

            },

            changeYear(val) {
                this.form.year = moment(val).format('YYYY');
                if (this.form.group_id && this.form.region) {
                    if (val) {
                        this.getList(this.form.group_id, this.form.year, this.form.region);
                    }
                } else {
                    if (!this.form.group_id || this.form.group_id === '' || val === 'undefined' || !this.form.region || this.form.region === '') {
                        if (!this.form.group_id) {
                            this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
                        }
                        if (!this.form.region) {
                            this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                        }
                    } else {
                        this.errorgroup = '';
                    }
                }

            },

            // getGroupId(val) {
            //   this.form.group_id = val;
            //   this.getOrgInformation(val);
            //   debugger;
            //   // this.form.group_id = '807C39FFD200D8A9826FD14AF50B5D112468';
            //   if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
            //     this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1039FORMVIEW_GROUP');
            //   } else {
            //     this.errorgroup = '';
            //   }
            //   if (this.form.year && this.form.region && this.form.group_id) {
            //     this.getList(this.form.group_id, this.form.year, this.form.region);
            //   } else {
            //     // this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
            //     // this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
            //     if (!this.form.region) {
            //       this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
            //     }
            //     if (!this.form.year) {
            //       this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
            //     }
            //
            //   }
            //
            //
            // },
            //
            // getOrgInformation(id) {
            //   let org = {};
            //   let treeCom = this.$store.getters.orgs;
            //
            //   if (id && treeCom.getNode(id)) {
            //     let node = id;
            //     let type = treeCom.getNode(id).data.type || 0;
            //     for (let index = parseInt(type); index >= 1; index--) {
            //       if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
            //         org.teamname = treeCom.getNode(node).data.departmentname;
            //
            //
            //         org.team_id = treeCom.getNode(node).data._id;
            //       }
            //       if (index === 2) {
            //         org.groupname = treeCom.getNode(node).data.departmentname;
            //         org.group_id = treeCom.getNode(node).data._id;
            //       }
            //       if (index === 1) {
            //         org.centername = treeCom.getNode(node).data.companyname;
            //         org.center_id = treeCom.getNode(node).data._id;
            //       }
            //       node = treeCom.getNode(node).parent.data._id;
            //     }
            //     ({
            //       centername: this.form.centername,
            //       groupname: this.form.groupname,
            //       teamname: this.form.teamname,
            //       center_id: this.form.center_id,
            //       group_id: this.form.group_id,
            //       team_id: this.form.team_id,
            //     } = org);
            //   }
            // },
            changeGroup(val) {

                this.form.group_id = val;
                if (this.form.group_id && this.form.year && this.form.region) {
                    this.getList(this.form.group_id, this.form.year, this.form.region);
                } else {
                    if (!this.form.region || this.form.region === '' || !this.form.year || this.form.year === '') {
                        if (!this.form.region) {
                            this.errormonth = this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_MONTH');
                        }
                        if (!this.form.year) {
                            this.erroryear = this.$t('normal.error_08') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR');
                        }
                        this.errorgroup = '';
                    } else {
                        this.errorgroup = '';
                    }
                }

            },
            getById() {

                this.loading = true;
                let role = getCurrentRole();
                const vote = [];
                if (role === '3') {
                    vote.push(
                        {
                            value: this.$store.getters.userinfo.userinfo.groupid,
                            lable: this.$store.getters.userinfo.userinfo.groupname,
                        },
                    );
                } else if (role === '2') {
                    let centerId = this.$store.getters.userinfo.userinfo.centerid;
                    let orgs = getDownOrgInfo(centerId);
                    if (orgs) {
                        for (let org of orgs) {
                            vote.push(
                                {
                                    value: org._id,
                                    lable: org.companyname,
                                },
                            );
                        }
                    }

                } else if (role === '1') {
                    let centerId = this.$store.getters.userinfo.userinfo.centerid;
                    let orgs = getDownOrgInfo(centerId);
                    if (orgs) {
                        for (let center of orgs) {
                            let centers = getDownOrgInfo(center._id);
                            if (centers) {
                                for (let group of centers) {
                                    vote.push(
                                        {
                                            value: group._id,
                                            lable: group.companyname,
                                        },
                                    );
                                }
                            }

                        }
                    }

                }
                this.optionsdata = vote;
                //add_fjl 添加默认值
                this.form.group_id = this.optionsdata[0].value;
                this.form.year = moment(new Date()).format('YYYY');
                this.form.region = moment(new Date()).format('MM');
                this.getList(this.optionsdata[0].value, this.form.year, this.form.region);
                //add_fjl
                this.loading = false;
            },
            getList(groupid, year, month) {
                //upd-ws-5/7-根据groupid，year，month去本表查询数据有数据的话拿本表的数据，没有数据的时候根据sql查询
                this.loading = true;
                this.$store
                    .dispatch('PFANS1042Store/getCostList', {'groupid': groupid, 'year': year, 'month': month})
                    .then(response => {
                        if (response.length === 0) {
                            this.$store
                                .dispatch('PFANS1042Store/getPltab', {'groupid': groupid, 'year': year, 'month': month})
                                .then(response => {
                                    let tabledate = [];
                                    let date1 = getDictionaryInfo('PJ086002').value2; // --国内役務（6%税込み）
                                    let date2 = getDictionaryInfo('PJ086003').value2;  // --国内販売（13%税込み）
                                    let wai = getDictionaryInfo('PJ110001').value2;//0.4
                                    let nei = getDictionaryInfo('PJ110002').value2;//1
                                    let she = getDictionaryInfo('PJ110003').value2;//3
                                    let aaa = getDictionaryInfo('PP024001').value1;
                                    let sum = 0;
                                    let sumouthours = 0;
                                    let suminhours = 0;
                                    let sumoutsourcingpjhours = 0;
                                    //计算工数
                                    let numFlg = 160;
                                    //add-ws-5/6-报销金额统计为sumpublic，外注的费用统计的金额累计为sumcoststa
                                    let sumcoststa = Number(response[0].unpublice) + Number(response[0].unevec);
                                    let sumpublic = Number(response[0].uncoststa);
                                    let sumplpublice = Number(response[0].unplpublice);
                                    //add-ws-5/6-报销金额统计为sumpublic，外注的费用统计的金额累计为sumcoststa

                                    for (let i = 0; i < response.length; i++) {
                                        //add-ws-5/6-本社工数累加
                                        sum += Number(response[i].emhours);
                                        //add-ws-5/6-本社工数累加
                                        //add-ws-5/6-配赋费计算添加
                                        sumouthours += Number(response[i].outhours);
                                        suminhours += Number(response[i].inhours);
                                        //add-ws-5/6-配赋费计算添加
                                        //add-ws-5/6-外注工数累加
                                        response[i].outsourcingpjhours = ((Number(response[i].inhours) + Number(response[i].outhours) + Number(response[0].unworktimeei) + Number(response[0].unworktimeex)) / Number(numFlg)).toFixed(2);
                                        sumoutsourcingpjhours += Number(response[i].outsourcingpjhours);
                                        //add-ws-5/6-外注工数累加
                                    }
                                    for (let j = 0; j < response.length; j++) {
                                        //共通PJ（研修会议等）
                                        //add_fjl
                                        if (response[j].plmoneyflg == 'plmoneyflg') {
                                            // response[j].pj1 = aaa
                                            response[j].pj = aaa;
                                        }
                                        //add_fjl
                                        //ADD_FJL  start
                                        //その他(ソフト費)
                                        if (response[j].inst !== '' && response[j].inst !== null) {
                                            response[j].othersoftwarefree = (Number('-' + response[j].inst)).toFixed(2);
                                        }
                                        //部門売上合計
                                        response[j].centerintotal = (Number(response[j].inst) + Number(response[j].outst3) + Number(response[j].outst2) + Number(response[j].outst1)).toFixed(2);
                                        //技術開発・海外役務-
                                        response[j].outst1 = (Number(response[j].outst1)).toFixed(2);
                                        // --国内役務（6%税込み）
                                        response[j].outst2 = (Number(response[j].outst2)).toFixed(2);
                                        // --国内販売（13%税込み）
                                        response[j].outst3 = (Number(response[j].outst3)).toFixed(2);
                                        //売上合計
                                        response[j].intotal = ((Number(response[j].outst1) + Number(response[j].outst3) + Number(response[j].outst2))
                                            - (Number(response[j].outst2) / (1 + Number(date1)) * Number(date1) + Number(response[j].outst3) / (1 + Number(date2)) * Number(date2))).toFixed(2);
                                        //ADD_FJL  end
                                        //外注（構外∔構内）PJ工数
                                        response[j].outsourcingpjhours = ((Number(response[j].inhours) + Number(response[j].outhours) + Number(response[0].unworktimeei) + Number(response[0].unworktimeex)) / Number(numFlg)).toFixed(2);
                                        if (sum == 0) {
                                            response[j].twocost = 0;
                                            response[j].peocost = 0;
                                            response[j].departmentcom = 0;
                                            response[j].allocation = 0;
                                        } else {
//upd -ws-5/5-人件费修改
                                            //人件费计算（給料）
                                            response[j].peocost = (Number(response[j].emhours) / Number(sum)).toFixed(2);
//upd -ws-5/5-人件费修改
//add -ws-5/7-厚生费修改
                                            response[j].twocost = (Number(response[j].emhours) / Number(sum) * Number(sumplpublice)).toFixed(2);
//add -ws-5/7-厚生费修改
//upd -ws-5/5-部門共通按分修改
                                            //部門共通按分
                                            response[j].departmentcom = (Number(response[j].emhours) / Number(sum) * Number(sumcoststa)).toFixed(2);
//upd -ws-5/5-部門共通按分修改
                                            //配賦費用
                                            response[j].allocation = ((Number(response[j].emhours) / Number(sum)) * ((Number(response[j].emhours) * Number(she) * 1000 + Number(response[j].outhours) * Number(nei) * 1000 + Number(response[j].outhours) * Number(wai) * 1000))).toFixed(2);
                                        }
                                        //人件費小計
                                        response[j].peocostsum = (Number(response[j].peocost) + Number(response[j].twocost)).toFixed(2);
                                        //upd -ws-5/5-外注费修改
                                        //外注費计算
                                        if (sumoutsourcingpjhours == 0) {
                                            response[j].outcost = 0;
                                        } else {
                                            response[j].outcost = (Number(response[j].outsourcingpjhours) / Number(sumoutsourcingpjhours) * Number(sumpublic)).toFixed(2);
                                        }
                                        //upd -ws-5/5-外注费修改
                                        //固定資産費用小計
                                        response[j].costsubtotal = (Number(response[j].depreciationsoft) + Number(response[j].depreciationequipment) + Number(response[j].rent) +
                                            Number(response[j].leasecost) + Number(response[j].temporaryrent) + Number(response[j].other)).toFixed(2);
                                        //研究開発費・ソフト費用小計
                                        response[j].departmenttotal = (Number(response[j].researchcost) + Number(response[j].surveyfee) + Number(response[j].inwetuo) +
                                            Number(response[j].outcost) + Number(response[j].othersoftwarefree)).toFixed(2);

                                        // 部門共通費用合計
                                        // response[j].departmenttotal = (Number(response[j].yuanqincost) + Number(response[j].travalcost) + Number(response[j].concost) + Number(response[j].callcost) + Number(response[j].brandcost) + Number(response[j].rent) + Number(response[j].other)).toFixed(2);
                                        //仕掛品
                                        response[j].process = (Number('-' + response[j].centerintotal) + Number(response[j].inwetuo)).toFixed(2);
                                        //その他諸経費小計
                                        response[j].otherexpentotal = (Number(response[j].yuanqincost) + Number(response[j].travalcost) + Number(response[j].callcost)
                                            + Number(response[j].concost) + Number(response[j].threefree) + Number(response[j].commonfee) + Number(response[j].brandcost)
                                            + Number(response[j].otherexpenses) + Number(response[j].otherincome) + Number(response[j].process)).toFixed(2);


                                        //限界利益
                                        // response[j].marginal = (Number(response[j].inst) + Number(response[j].outst1) - Number(response[j].peocost) - Number(response[j].outcost) - Number(response[j].researchcost)).toFixed(2);

                                        //営業利益 = 限界利益 - 所有和项目有关的费用
                                        // response[j].Operating = (Number(response[j].marginal) - Number(response[j].costtotal)).toFixed(2);
                                        //add-ws-5/6-配赋费计算添加W
                                        //構外外注配赋费
                                        let outsour = getDictionaryInfo('CW001003').value2;
                                        let outsourcinghours = response[j].outsourcinghours * outsour;
                                        //構内外注配赋费
                                        let outsourcing = getDictionaryInfo('CW001002').value2;
                                        let outsourcingname = response[j].outsourcingname * outsourcing;
                                        //社员配赋费
                                        let employee = getDictionaryInfo('CW001001').value2;
                                        let employeename = response[j].employeename * employee;
                                        //構外工数百分比*構外外注配赋费
                                        let sumoutsourcinghours = 0;
                                        if (sumouthours == 0) {
                                            sumoutsourcinghours = 0;
                                        } else {
                                            sumoutsourcinghours = (Number(response[j].outhours) / Number(sumouthours)).toFixed(2);
                                        }
                                        //構内工数百分比*構内外注配赋费
                                        let sumoutsourcingname = 0;
                                        if (suminhours == 0) {
                                            sumoutsourcingname = 0;
                                        } else {
                                            sumoutsourcingname = (Number(response[j].outhours) / Number(suminhours)).toFixed(2);
                                        }
                                        //设员工数百分比*社员配赋费
                                        let sumemployeename = 0;
                                        if (sum == 0) {
                                            sumemployeename = 0;
                                        } else {
                                            sumemployeename = (Number(response[j].emhours) / Number(sum)).toFixed(2);
                                        }
                                        //合计
                                        response[j].expensessubtotal = (Number(sumoutsourcinghours) + Number(sumoutsourcingname) + Number(sumemployeename)).toFixed(2);
                                        //add-ws-5/6-配赋费计算添加
                                        //         UPD_FJL --start
                                        //配賦部門費小計
                                        // response[j].allocationsum = (Number(response[j].expensessubtotal) + Number(response[j].transferone) + Number(response[j].transfertwo)).toFixed(2);
                                        response[j].allocationsum = (Number(response[j].expensessubtotal)).toFixed(2);
                                        //         UPD_FJL --end

// add_fjl
                                        //社員PJ工数
                                        response[j].emhours = ((Number(response[j].emhours) + Number(response[0].unworktime)) / Number(numFlg)).toFixed(2);

                                        //外注（構外∔構内）稼働工数
                                        response[j].outsourcing = (Number(response[j].outsourcingpjhours)).toFixed(2);

                                        //社員稼働工数
                                        response[j].employeeuptime = (Number(response[j].emhours)).toFixed(2);

                                        //外注PJ稼働率
                                        if (Number(response[j].outsourcinghours) + Number(response[j].outsourcingname) > 0) {
                                            response[j].externalpjrate = ((Number(response[j].outsourcingpjhours) / (Number(response[j].outsourcinghours) + Number(response[j].outsourcingname))) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].externalpjrate = 0;
                                        }

                                        //外注稼働率
                                        if (Number(response[j].outsourcinghours) + Number(response[j].outsourcingname) > 0) {
                                            response[j].externalinjectionrate = ((Number(response[j].outsourcing) / (Number(response[j].outsourcinghours) + Number(response[j].outsourcingname))) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].externalinjectionrate = 0;
                                        }

                                        //社員PJ稼働率
                                        if (Number(response[j].employeename) > 0) {
                                            response[j].memberpjrate = ((Number(response[j].emhours) / Number(response[j].employeename)) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].memberpjrate = 0;
                                        }

                                        //社員稼働率
                                        if (Number(response[j].employeename) > 0) {
                                            response[j].membershiprate = ((Number(response[j].employeeuptime) / Number(response[j].employeename)) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].membershiprate = 0;
                                        }

                                        //全員PJ稼働率
                                        if (Number(response[j].outsourcinghours) + Number(response[j].outsourcingname) + Number(response[j].employeename) > 0) {
                                            response[j].pjrateemployees = (((Number(response[j].outsourcingpjhours) + Number(response[j].emhours)) / ((Number(response[j].outsourcinghours) + Number(response[j].outsourcingname) + Number(response[j].employeename)))) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].pjrateemployees = 0;
                                        }

                                        //全員稼働率
                                        if (Number(response[j].outsourcinghours) + Number(response[j].outsourcingname) + Number(response[j].employeename) > 0) {
                                            response[j].staffingrate = (((Number(response[j].outsourcing) + Number(response[j].employeeuptime)) / ((Number(response[j].outsourcinghours) + Number(response[j].outsourcingname) + Number(response[j].employeename)))) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].staffingrate = 0;
                                        }
                                        //合計
                                        response[j].costtotal = (Number(response[j].peocostsum) + Number(response[j].costsubtotal) + Number(response[j].expensessubtotal) + Number(response[j].allocationsum) + Number(response[j].otherexpentotal)
                                            + Number(response[j].departmentcom)).toFixed(2);
                                        //営業利益
                                        response[j].Operating = (Number(response[j].intotal) - Number(response[j].costtotal)).toFixed(2);
                                        //営業外損益 = 金利（損--マイナス） + 為替（損--マイナス） --初始默認為0
                                        response[j].operatingprofit = 0;
                                        //税引前利益 = 営業利益 + 営業外損益
                                        response[j].pretaxprofit = Number(response[j].Operating) + Number(response[j].operatingprofit);
                                        //税引後利益 = 税引前利益 + 税金引当金
                                        response[j].posttaxbenefit = Number(response[j].pretaxprofit) - Number(response[j].taxallowance);
                                        //営業利益率
                                        alert(Number(response[j].Operating))
                                        if (Number(response[j].intotal) > 0) {
                                            response[j].operatingmargin = ((Number(response[j].Operating) / Number(response[j].intotal)) * 100).toFixed(2) + '%';
                                        } else {
                                            response[j].operatingmargin = 0
                                        }


// add_fjl
                                        tabledate.push({
                                            pj1: response[j].pj1,
                                            pj: response[j].pj,
                                            outst1: response[j].outst1,
                                            outst2: response[j].outst2,
                                            outst3: response[j].outst3,
                                            // tax: response[j].tax,
                                            // taxyw: response[j].taxyw,
                                            // taxsa: response[j].taxsa,
                                            inst: response[j].inst,
                                            intotal: response[j].intotal,
                                            centerintotal: response[j].centerintotal,
                                            emhours: response[j].emhours,
                                            outhours: response[j].outhours,
                                            peocost: response[j].peocost,
                                            outcost: response[j].outcost,
                                            inwetuo: response[j].inwetuo,
                                            researchcost: response[j].researchcost,
                                            departmentcom: response[j].departmentcom,
                                            yuanqincost: response[j].yuanqincost,
                                            travalcost: response[j].travalcost,
                                            concost: response[j].concost,
                                            callcost: response[j].callcost,
                                            brandcost: response[j].brandcost,
                                            rent: response[j].rent,
                                            other: response[j].other,
                                            departmenttotal: response[j].departmenttotal,
                                            allocation: response[j].allocation,
                                            costtotal: response[j].costtotal,
                                            process: response[j].process,
                                            marginal: response[j].marginal,
                                            Operating: response[j].Operating,
                                            twocost: response[j].twocost,
                                            peocostsum: response[j].peocostsum,
                                            depreciationsoft: response[j].depreciationsoft,
                                            depreciationequipment: response[j].depreciationequipment,
                                            leasecost: response[j].leasecost,
                                            temporaryrent: response[j].temporaryrent,
                                            costsubtotal: response[j].costsubtotal,
                                            surveyfee: response[j].surveyfee,
                                            othersoftwarefree: response[j].othersoftwarefree,
                                            expensessubtotal: response[j].expensessubtotal,
                                            // transferone: response[j].transferone,
                                            // transfertwo: response[j].transfertwo,
                                            allocationsum: response[j].allocationsum,
                                            threefree: response[j].threefree,
                                            commonfee: response[j].commonfee,
                                            otherexpenses: response[j].otherexpenses,
                                            otherincome: response[j].otherincome,
                                            otherexpentotal: response[j].otherexpentotal,
                                            interestrate: response[j].interestrate,
                                            exchanges: response[j].exchanges,
                                            operatingprofit: response[j].operatingprofit,
                                            pretaxprofit: response[j].pretaxprofit,
                                            taxallowance: response[j].taxallowance,
                                            posttaxbenefit: response[j].posttaxbenefit,
                                            operatingmargin: response[j].operatingmargin,
                                            outsourcinghours: response[j].outsourcinghours,
                                            outsourcing: response[j].outsourcing,
                                            outsourcingname: response[j].outsourcingname,
                                            employeename: response[j].employeename,
                                            outsourcingpjhours: response[j].outsourcingpjhours,
                                            employeepjhours: response[j].employeepjhours,
                                            employeeuptime: response[j].employeeuptime,
                                            externalpjrate: response[j].externalpjrate,
                                            externalinjectionrate: response[j].externalinjectionrate,
                                            memberpjrate: response[j].memberpjrate,
                                            membershiprate: response[j].membershiprate,
                                            pjrateemployees: response[j].pjrateemployees,
                                            staffingrate: response[j].staffingrate,
                                        });
                                    }

                                    this.tableData = tabledate;
                                    this.loading = false;
                                })
                                .catch(error => {
                                    Message({
                                        message: error,
                                        type: 'error',
                                        duration: 5 * 1000,
                                    });
                                    this.loading = false;
                                });
                        } else {
                            this.tableData = response
                            this.loading = false;
                        }
                    }).catch(error => {
                    Message({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000,
                    });
                    this.loading = false;
                });
                //upd-ws-5/7-根据groupid，year，month去本表查询数据有数据的话拿本表的数据，没有数据的时候根据sql查询
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //add-ws-5/7-保存PL数据，先根据group ，year，month删除再插入
            buttonClick(val) {
                this.loading = true;
                this.costcarryforward = [];
                for (let i = 0; i < this.tableData.length; i++) {
                    this.costcarryforward.push({
                        year: this.form.year,
                        region: this.form.region,
                        group_id: this.form.group_id,
                        pj: this.tableData[i].pj,
                        outst1: this.tableData[i].outst1,
                        taxyw: this.tableData[i].taxyw,
                        taxsa: this.tableData[i].taxsa,
                        inst: this.tableData[i].inst,
                        centerintotal: this.tableData[i].centerintotal,
                        intotal: this.tableData[i].intotal,
                        peocost: this.tableData[i].peocost,
                        twocost: this.tableData[i].twocost,
                        peocostsum: this.tableData[i].peocostsum,
                        depreciationsoft: this.tableData[i].depreciationsoft,
                        depreciationequipment: this.tableData[i].depreciationequipment,
                        rent: this.tableData[i].rent,
                        leasecost: this.tableData[i].leasecost,
                        temporaryrent: this.tableData[i].temporaryrent,
                        other: this.tableData[i].other,
                        costsubtotal: this.tableData[i].costsubtotal,
                        researchcost: this.tableData[i].researchcost,
                        surveyfee: this.tableData[i].surveyfee,
                        inwetuo: this.tableData[i].inwetuo,
                        outcost: this.tableData[i].outcost,
                        othersoftwarefree: this.tableData[i].othersoftwarefree,
                        departmenttotal: this.tableData[i].departmenttotal,
                        expensessubtotal: this.tableData[i].expensessubtotal,
                        // transferone: this.tableData[i].transferone,
                        // transfertwo: this.tableData[i].transfertwo,
                        allocationsum: this.tableData[i].allocationsum,
                        yuanqincost: this.tableData[i].yuanqincost,
                        travalcost: this.tableData[i].travalcost,
                        callcost: this.tableData[i].callcost,
                        concost: this.tableData[i].concost,
                        threefree: this.tableData[i].threefree,
                        commonfee: this.tableData[i].commonfee,
                        brandcost: this.tableData[i].brandcost,
                        otherexpenses: this.tableData[i].otherexpenses,
                        process: this.tableData[i].process,
                        otherincome: this.tableData[i].otherincome,
                        otherexpentotal: this.tableData[i].otherexpentotal,
                        departmentcom: this.tableData[i].departmentcom,
                        costtotal: this.tableData[i].costtotal,
                        Operating: this.tableData[i].Operating,
                        interestrate: this.tableData[i].interestrate,
                        exchanges: this.tableData[i].exchanges,
                        operatingprofit: this.tableData[i].operatingprofit,
                        pretaxprofit: this.tableData[i].pretaxprofit,
                        taxallowance: this.tableData[i].taxallowance,
                        posttaxbenefit: this.tableData[i].posttaxbenefit,
                        operatingmargin: this.tableData[i].operatingmargin,
                        outsourcinghours: this.tableData[i].outsourcinghours,
                        outsourcingname: this.tableData[i].outsourcingname,
                        employeename: this.tableData[i].employeename,
                        outsourcingpjhours: this.tableData[i].outsourcingpjhours,
                        outsourcing: this.tableData[i].outsourcing,
                        emhours: this.tableData[i].emhours,
                        employeeuptime: this.tableData[i].employeeuptime,
                        externalpjrate: this.tableData[i].externalpjrate,
                        externalinjectionrate: this.tableData[i].externalinjectionrate,
                        memberpjrate: this.tableData[i].memberpjrate,
                        membershiprate: this.tableData[i].membershiprate,
                        pjrateemployees: this.tableData[i].pjrateemployees,
                        staffingrate: this.tableData[i].staffingrate,
                    });
                }
                this.$store
                    .dispatch('PFANS1042Store/insert', this.costcarryforward)
                    .then(response => {
                        Message({
                            message: this.$t('normal.success_02'),
                            type: 'success',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    });
            },
            //add-ws-5/7-保存PL数据，先根据group ，year，month删除再插入

        },

    };
</script>

<style lang="scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }

  .el-table /deep/ .current-row {
    background-color: #BDD8EE;
  }
</style>
