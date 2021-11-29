<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading"
                         @workflowState="workflowState" @start="start" @end="end" :workflowCode="workflowCode"
    >
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
                      :disabled="!disable"
                      style="width: 18vw"
                      v-model="form.year">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2009VIEW_JUNE')" :error="errormonth" prop="month">
                  <div class="block">
                    <el-date-picker
                      type="month"
                      @change="changeRegion"
                      :disabled="!disable"
                      style="width: 20vw"
                      v-model="form.region">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1039FORMVIEW_GROUP')" :error="errorgroup" prop="group">
                  <el-select v-model="form.group_id" style="width: 20vw" :disabled="!disable"
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
          </el-form-item>
        </el-form>

        <pl-table
          :datas="tableData" @selection-change="handleSelectionChange()"
          border ref="plx" show-summary :summary-method="getSummaries"
          stripe use-virtual
          style="width: 100%;height: calc(100vh - 200px - 2rem)"
          tooltip-effect="dark" cell-class-name="row_height_left" header-row-class-name="height"
          big-data-checkbox highlight-current-row :header-cell-style="getRowClass"
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
                <span>{{ scope.row.pj }}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          売上-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_INCOME')"
            align="center">
            <!--            技術開発・海外役務-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTST')"
              align="center"
              width="150"
              prop="outst1">
              <template slot-scope="scope">
                <span>{{ scope.row.outst1 }}</span>
              </template>

            </pl-table-column>
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TAXYW')"
              align="center"
              width="78"
              prop="outst2">
              <template slot-scope="scope">
                <span>{{ scope.row.taxyw }}</span>
              </template>
            </pl-table-column>

            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TAXSA')"
              align="center"
              width="78"
              prop="outst3">
              <template slot-scope="scope">
                <span>{{ scope.row.taxsa }}</span>
              </template>
            </pl-table-column>
            <!--            内部受託-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INST')"
              align="center"
              width="78"
              prop="inst">
              <template slot-scope="scope">
                <span>{{ scope.row.inst }}</span>
              </template>

            </pl-table-column>
            <!--            部門売上合計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_CENTERINTOTAL')"
              align="center"
              width="108"
              prop="centerintotal">
              <template slot-scope="scope">
                <span>{{ scope.row.centerintotal }}</span>
              </template>
            </pl-table-column>
            <!--            売上合計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INTOTAL')"
              align="center"
              width="78"
              prop="intotal">
              <template slot-scope="scope">
                <span>{{ scope.row.intotal }}</span>
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
              width="64"
              prop="peocost">
              <template slot-scope="scope">
                <span>{{ scope.row.peocost }}</span>
              </template>
            </pl-table-column>
            <!--            厚生費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TWOCOST')"
              align="center"
              width="64"
              prop="twocost">
              <template slot-scope="scope">
                <span>{{ scope.row.twocost }}</span>
              </template>
            </pl-table-column>
            <!--            人件費小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PEOCOSTSUM')"
              align="center"
              width="92"
              prop="peocostsum">
              <template slot-scope="scope">
                <span>{{ scope.row.peocostsum }}</span>
              </template>
            </pl-table-column>
            <!--   asdadasda         減価償却費（設備）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_DEPRECIATIONSOFT')"
              align="center"
              width="148"
              prop="depreciationsoft">
              <template slot-scope="scope">
                <span>{{ scope.row.depreciationsoft }}</span>
              </template>
            </pl-table-column>
            <!--       asdadasda     減価償却費（ソフト）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_DEPRECIATIONEQUIPMENT')"
              align="center"
              width="162"
              prop="depreciationequipment">
              <template slot-scope="scope">
                <span>{{ scope.row.depreciationequipment }}</span>
              </template>
            </pl-table-column>
            <!--            オフィス家賃-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_RENT')"
              align="center"
              width="108"
              prop="rent">
              <template slot-scope="scope">
                <span>{{ scope.row.rent }}</span>
              </template>
            </pl-table-column>
            <!--            リース費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_LEASECOST')"
              align="center"
              width="78"
              prop="leasecost">
              <template slot-scope="scope">
                <span>{{ scope.row.leasecost }}</span>
              </template>
            </pl-table-column>
            <!--            出向者賃借料-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TEMPORARYRENT')"
              align="center"
              width="108"
              prop="temporaryrent">
              <template slot-scope="scope">
                <span>{{ scope.row.temporaryrent }}</span>
              </template>
            </pl-table-column>
            <!--            その他(固定費)-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHER')"
              align="center"
              width="116"
              prop="other">
              <template slot-scope="scope">
                <span>{{ scope.row.other }}</span>
              </template>
            </pl-table-column>
            <!--            固定資産費用小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_COSTSUBTOTAL')"
              align="center"
              width="134"
              prop="costsubtotal">
              <template slot-scope="scope">
                <span>{{ scope.row.costsubtotal }}</span>
              </template>
            </pl-table-column>
            <!--            研究材料費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_RESEARCHCOST')"
              align="center"
              width="92"
              prop="researchcost">
              <template slot-scope="scope">
                <span>{{ scope.row.researchcost }}</span>
              </template>
            </pl-table-column>
            <!--            調査費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_SURVEYFEE')"
              align="center"
              width="64"
              prop="surveyfee">
              <template slot-scope="scope">
                <span>{{ scope.row.surveyfee }}</span>
              </template>
            </pl-table-column>
            <!--            内部委託支出-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INWEITUO')"
              align="center"
              width="108"
              prop="inwetuo">
              <template slot-scope="scope">
                <span>{{ scope.row.inwetuo }}</span>
              </template>
            </pl-table-column>
            <!--            外注費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTCOST')"
              align="center"
              width="64"
              prop="outcost">
              <template slot-scope="scope">
                <span>{{ scope.row.outcost }}</span>
              </template>

            </pl-table-column>
            <!--            その他(ソフト費)-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHERSOFTWAREFREE')"
              align="center"
              width="130"
              prop="othersoftwarefree">
              <template slot-scope="scope">
                <span>{{ scope.row.othersoftwarefree }}</span>
              </template>
            </pl-table-column>
            <!--            研究開発費・ソフト費用小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXPENSESSUBTOTAL')"
              align="center"
              width="204"
              prop="departmenttotal">
              <template slot-scope="scope">
                <span>{{ scope.row.departmenttotal }}</span>
              </template>
            </pl-table-column>
            <!--            管理・共通部門配賦-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_MANCOMMONDEPT')"
              align="center"
              width="148"
              prop="expensessubtotal">
              <template slot-scope="scope">
                <span>{{ scope.row.expensessubtotal }}</span>
              </template>
            </pl-table-column>
            <!--            振替１-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TRANSFERONE')"
              align="center"
              width="64"
              prop="transferone">
              <template slot-scope="scope">
                <span>{{ scope.row.transferone }}</span>
              </template>
            </pl-table-column>
            <!--            振替２-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TRANSFERTWO')"
              align="center"
              width="64"
              prop="transfertwo">
              <template slot-scope="scope">
                <span>{{ scope.row.transfertwo }}</span>
              </template>
            </pl-table-column>
            <!--            配賦部門費小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_ALLOCATIONSUM')"
              align="center"
              width="120"
              prop="allocationsum">
              <template slot-scope="scope">
                <span>{{ scope.row.allocationsum }}</span>
              </template>
            </pl-table-column>

            <!--            原動費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_YUANQINCOST')"
              align="center"
              width="110"
              prop="yuanqincost">
              <template slot-scope="scope">
                <span>{{ scope.row.yuanqincost }}</span>
              </template>
            </pl-table-column>
            <!--            旅費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TRAVALCOST')"
              align="center"
              width="50"
              prop="travalcost">
              <template slot-scope="scope">
                <span>{{ scope.row.travalcost }}</span>
              </template>
            </pl-table-column>
            <!--            &lt;!&ndash;            通信費&ndash;&gt;-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_CONCOST')"
              align="center"
              width="110"
              prop="concost">
              <template slot-scope="scope">
                <span>{{ scope.row.concost }}</span>
              </template>
            </pl-table-column>
            <!--            消耗費-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_CALLCOST')"
              align="center"
              width="110"
              prop="callcost">
              <template slot-scope="scope">
                <span>{{ scope.row.callcost }}</span>
              </template>
            </pl-table-column>

            <!--            &lt;!&ndash;            会議費/交際費/研修費&ndash;&gt;-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_THREEFREE')"
              align="center"
              width="200"
              prop="threefree">
              <template slot-scope="scope">
                <span>{{ scope.row.threefree }}</span>
              </template>
            </pl-table-column>
            <!--            &lt;!&ndash;            共同事務費&ndash;&gt;-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_COMMONFEE')"
              align="center"
              width="110"
              prop="commonfee">
              <template slot-scope="scope">
                <span>{{ scope.row.commonfee }}</span>
              </template>
            </pl-table-column>

            <!--            &lt;!&ndash;            ブランド使用料&ndash;&gt;-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_BRANDCOST')"
              align="center"
              width="150"
              prop="brandcost">
              <template slot-scope="scope">
                <span>{{ scope.row.brandcost }}</span>
              </template>

            </pl-table-column>
            <!--            &lt;!&ndash;            その他経費&ndash;&gt;-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHEREXPENSES')"
              align="center"
              width="110"
              prop="otherexpenses">
              <template slot-scope="scope">
                <span>{{ scope.row.otherexpenses }}</span>
              </template>
            </pl-table-column>
            <!--            累计仕掛品-->

            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_TOTALPRO')"
              align="center"
              width="92"
              prop="totalpro">
              <template slot-scope="scope">
                <span>{{ scope.row.totalpro }}</span>
              </template>

            </pl-table-column>
            <!--            仕掛品-->

            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PRO')"
              align="center"
              width="64"
              prop="process">
              <template slot-scope="scope">
                <span>{{ scope.row.process }}</span>
              </template>

            </pl-table-column>
            <!--            その他利益-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHERINCOME')"
              align="center"
              width="140"
              prop="otherincome">

              <template slot-scope="scope">
                <el-input-number
                  @change="changeotherincome(scope.row)"
                  :disabled="!disable"
                  :max="1000000000"
                  :min="0"
                  :no="scope.row"
                  :precision="2"
                  controls-position="right"
                  style="width: 100%"
                  v-model="scope.row.otherincome"
                ></el-input-number>
              </template>
            </pl-table-column>

            <!--            その他諸経費小計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OTHEREXPENTOTAL')"
              align="center"
              width="150"
              prop="otherexpentotal">
              <template slot-scope="scope">
                <span>{{ scope.row.otherexpentotal }}</span>
              </template>
            </pl-table-column>
            <!--            部門共通按分-->
            <!--            <pl-table-column-->
            <!--              :label="$t('label.PFANS1042FORMVIEW_DEPARTMENTCOST')"-->
            <!--              align="center"-->
            <!--              width="108"-->
            <!--              prop="departmentcom">-->
            <!--              <template slot-scope="scope">-->
            <!--                <span>{{scope.row.departmentcom}}</span>-->
            <!--              </template>-->
            <!--            </pl-table-column>-->
            <!--            合計-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_COSTTOTAL')"
              align="center"
              width="50"
              prop="costtotal">
              <template slot-scope="scope">
                <span>{{ scope.row.costtotal }}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          界限利益率-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_BENEFITRATE')"
            align="center"
            width="92"
            prop="benefitrate">
            <template slot-scope="scope">
              <span v-if="scope.row.benefitrate ==='---'">{{ scope.row.benefitrate }}</span>
              <span v-else>{{ scope.row.benefitrate }}%</span>
            </template>
          </pl-table-column>
          <!--          営業利益-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_OPERATION')"
            align="center"
            width="78"
            prop="Operating">
            <template slot-scope="scope">
              <span>{{ scope.row.operating }}</span>
            </template>
          </pl-table-column>
          <!--          損--マイナス-->
          <pl-table-column
            align="center"
            :label="$t('label.PFANS1042FORMVIEW_LOSSMINUS')">
            <!--            金利-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_INTERESTRATE')"
              align="center"
              width="120"
              prop="interestrate">
              <template slot-scope="scope">
                <el-input-number
                  @change="changeoperatingprofit(scope.row)"
                  :disabled="!disable"
                  :max="1000000000"
                  :min="0"
                  :no="scope.row"
                  :precision="2"
                  controls-position="right"
                  style="width: 100%"
                  v-model="scope.row.interestrate"
                ></el-input-number>
              </template>
            </pl-table-column>
            <!--            為替-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXCHANGE')"
              align="center"
              width="120"
              prop="exchanges">
              <template slot-scope="scope">
                <el-input-number
                  @change="changeoperatingprofit(scope.row)"
                  :disabled="!disable"
                  :max="1000000000"
                  :min="0"
                  :no="scope.row"
                  :precision="2"
                  controls-position="right"
                  style="width: 100%"
                  v-model="scope.row.exchanges"
                ></el-input-number>
              </template>
            </pl-table-column>
            <!--            営業外損益-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OPERATINGPROFIT')"
              align="center"
              width="92"
              prop="operatingprofit">
              <template slot-scope="scope">
                <span>{{ scope.row.operatingprofit }}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          税引前利益-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_PRETAXPROFIT')"
            align="center"
            width="92"
            prop="pretaxprofit">
            <template slot-scope="scope">
              <span>{{ scope.row.pretaxprofit }}</span>
            </template>
          </pl-table-column>
          <!--          税金引当金-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_TAXALLOWANCE')"
            align="center"
            width="120"
            prop="taxallowance">
            <template slot-scope="scope">
              <el-input-number
                @change="changetaxallowance(scope.row)"
                :disabled="!disable"
                :max="1000000000"
                :min="0"
                :no="scope.row"
                :precision="2"
                controls-position="right"
                style="width: 100%"
                v-model="scope.row.taxallowance"
              ></el-input-number>
            </template>
          </pl-table-column>
          <!--          税引後利益-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_POSTTAXBENEFIT')"
            align="center"
            width="120"
            prop="posttaxbenefit">
            <template slot-scope="scope">
              <span>{{ scope.row.posttaxbenefit }}</span>
            </template>
          </pl-table-column>
          <!--          営業利益率-->
          <pl-table-column
            :label="$t('label.PFANS1042FORMVIEW_OPERATINGMARGIN')"
            align="center"
            width="92"
            prop="operatingmargin">
            <template slot-scope="scope">
              <span>{{ scope.row.operatingmargin }}%</span>
            </template>
          </pl-table-column>
          <!--          人員（名）-->
          <pl-table-column
            align="center"
            :label="$t('label.PFANS1042FORMVIEW_PERSONNAME')">
            <!--            構外外注(工数)-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCINGHOURS')"
              align="center"
              width="108"
              prop="outsourcinghours">
              <template slot-scope="scope">
                <span>{{ scope.row.outsourcinghours }}</span>
              </template>
            </pl-table-column>
            <!--            構内外注（名）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCINGNAME')"
              align="center"
              width="124"
              prop="outsourcingname">
              <template slot-scope="scope">
                <span>{{ scope.row.outsourcingname }}</span>
              </template>
            </pl-table-column>
            <!--            社員（名）-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EMPLOYEENAME')"
              align="center"
              width="92"
              prop="employeename">
              <template slot-scope="scope">
                <span>{{ scope.row.employeename }}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          工数(人月)-->
          <pl-table-column
            align="center"
            :label="$t('label.PFANS1042FORMVIEW_EFFORTMONTH')">
            <!--            外注（構外∔構内）PJ工数-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCINGPJHOURS')"
              align="center"
              width="104"
              prop="outsourcingpjhours">
              <template slot-scope="scope">
                <span>{{ scope.row.outsourcingpjhours }}</span>
              </template>
            </pl-table-column>
            <!--            外注（構外∔構内）稼働工数-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_OUTSOURCING')"
              align="center"
              width="108"
              prop="outsourcing">
              <template slot-scope="scope">
                <span>{{ scope.row.outsourcing }}</span>
              </template>
            </pl-table-column>
            <!--            社員PJ工数  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EMPLOYEEPJHOURS')"
              align="center"
              width="104"
              prop="emhours">
              <template slot-scope="scope">
                <!--                <span>{{scope.row.employeepjhours}}</span>-->
                <span>{{ scope.row.emhours }}</span>
              </template>
            </pl-table-column>
            <!--            社員稼働工数  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EMPLOYEEUPTIME')"
              align="center"
              width="108"
              prop="employeeuptime">
              <template slot-scope="scope">
                <span>{{ scope.row.employeeuptime }}</span>
              </template>
            </pl-table-column>
          </pl-table-column>
          <!--          稼働率（%）-->
          <pl-table-column
            align="center"
            :label="$t('label.PFANS1042FORMVIEW_CROPPINGRATE')">
            <!--            外注PJ稼働率-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXTERNALPJRATE')"
              align="center"
              width="110"
              prop="externalpjrate">
              <template slot-scope="scope">
                <span>{{ scope.row.externalpjrate }}%</span>
              </template>
            </pl-table-column>
            <!--            外注稼働率-->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_EXTERNALINJECTIONRATE')"
              align="center"
              width="92"
              prop="externalinjectionrate">
              <template slot-scope="scope">
                <span>{{ scope.row.externalinjectionrate }}%</span>
              </template>
            </pl-table-column>
            <!--            社員PJ稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_MEMBERPJRATE')"
              align="center"
              width="110"
              prop="memberpjrate">
              <template slot-scope="scope">
                <span>{{ scope.row.memberpjrate }}%</span>
              </template>
            </pl-table-column>
            <!--            社員稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_MEMBERSHIPRATE')"
              align="center"
              width="92"
              prop="membershiprate">
              <template slot-scope="scope">
                <span>{{ scope.row.membershiprate }}%</span>
              </template>
            </pl-table-column>
            <!--            全員PJ稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_PJRATEEMPLOYEES')"
              align="center"
              width="110"
              prop="pjrateemployees">
              <template slot-scope="scope">
                <span>{{ scope.row.pjrateemployees }}%</span>
              </template>
            </pl-table-column>
            <!--            全員稼働率  -->
            <pl-table-column
              :label="$t('label.PFANS1042FORMVIEW_STAFFINGRATE')"
              align="center"
              width="92"
              prop="staffingrate">
              <template slot-scope="scope">
                <span>{{ scope.row.staffingrate }}%</span>
              </template>
            </pl-table-column>
          </pl-table-column>
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
import {getOrgInfo, getCurrentRole, getCurrentRole3,getCurrentRoleNew} from '@/utils/customize';

export default {
  name: 'PFANS1042FormView',
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
      workflowCode: 'W0142',
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
        year: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
        group_id: '',
        status: '',
        region: moment(new Date()).format('YYYY-MM'),
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
      disable: true,
      buttonList: [],
      tabtotal: [],
    };
  },
  created() {
    this.disable = this.$route.params.disabled;
    this.buttonList = [{
      'key': 'save',
      'name': 'button.save',
      'disabled': false,
    }];
  },
  mounted() {
    this.getById();
  },
  methods: {
    workflowState(val) {
      if (val.state === '0') {
        this.form.status = '2';
      } else if (val.state === '1') {
        this.form.status = '3';
      } else if (val.state === '2') {
        this.form.status = '4';
      }
      this.buttonClick();
    },
    start(val) {
      if (val.state === '0') {
        this.form.status = '2';
      } else if (val.state === '2') {
        this.form.status = '4';
      }
      this.buttonClick();
    },
    end() {
      this.form.status = '0';
      this.buttonClick();
    },
    changeotherincome(row) {
      row.otherexpentotal = parseFloat(Number(row.travalcost) + Number(row.totalpro) + Number(row.process) + Number(row.otherincome)).toFixed(2);
    },
    changeoperatingprofit(row) {
      row.operatingprofit = parseFloat(Number(row.interestrate) + Number(row.exchanges)).toFixed(2);
      row.pretaxprofit = parseFloat(Number(row.operatingprofit) + Number(row.Operating)).toFixed(2);
    },
    changetaxallowance(row) {
      row.posttaxbenefit = parseFloat(Number(row.pretaxprofit) + Number(row.taxallowance)).toFixed(2);
    },
    changeRegion(value) {
      this.form.region = moment(value).format('YYYY-MM');
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
      //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 start
      // let role = getCurrentRole();
      // let roleFin = getCurrentRole3();
      // const vote = [];
      // if (role === '1' || roleFin === '0') {
      //     let centerId = '';
      //     if (roleFin === '0') {
      //         //update gbb 20210329 2021组织架构变更 start
      //         //centerId = '5e7858a08f4316308435112c';
      //         centerId = this.$store.getters.orgtreeId;
      //         //update gbb 20210329 2021组织架构变更 end
      //     } else {
      //         centerId = this.$store.getters.userinfo.userinfo.centerid;
      //     }
      //     let orgs = getOrgInfo(centerId);
      //     if (orgs) {
      //         for (let center of orgs) {
      //             let centers = getOrgInfo(center._id);
      //             if (centers) {
      //                 for (let group of centers) {
      //                     vote.push(
      //                         {
      //                             value: group._id,
      //                             lable: group.companyname,
      //                         },
      //                     );
      //                 }
      //             }
      //
      //         }
      //     }
      //
      // } else if (role === '2') {
      //     let centerId = this.$store.getters.userinfo.userinfo.centerid;
      //     let orgs = getOrgInfo(centerId);
      //     if (orgs) {
      //         for (let org of orgs) {
      //             vote.push(
      //                 {
      //                     value: org._id,
      //                     lable: org.companyname,
      //                 },
      //             );
      //         }
      //     }
      //
      // } else if (role === '3') {
      //     vote.push(
      //         {
      //             value: this.$store.getters.userinfo.userinfo.groupid,
      //             lable: this.$store.getters.userinfo.userinfo.groupname,
      //         },
      //     );
      // }
      // this.optionsdata = vote;
      // this.form.group_id = this.optionsdata[0].value;
      let role = getCurrentRoleNew();
      const vote = [];
      if (role === '3') {//CENTER
          vote.push(
              {
                  value: this.$store.getters.userinfo.userinfo.centerid,
                  lable: this.$store.getters.userinfo.userinfo.centername,
              },
          );
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
              for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
              {
                  if (others.centerid)
                  {
                      this.$store.getters.orgGroupList.filter((item) => {
                          if (item.centerid === others.centerid) {
                              vote.push(
                                  {
                                      value: item.centerid,
                                      lable: item.centername,
                                  },
                              );
                          }
                      })
                  }
              }
          }
          //add ccm 0112 兼职部门
      } else if (role === '2') {//副总经理
          this.$store.getters.orgGroupList.filter((item) => {
              if (item.virtualuser === this.$store.getters.userinfo.userid) {
                  vote.push(
                      {
                          value: item.centerid,
                          lable: item.centername,
                      },
                  );
              }
          })
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
              for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
              {
                  if (others.centerid)
                  {
                      this.$store.getters.orgGroupList.filter((item) => {
                          if (item.centerid === others.centerid) {
                              vote.push(
                                  {
                                      value: item.centerid,
                                      lable: item.centername,
                                  },
                              );
                          }
                      })
                  }
              }
          }
          //add ccm 0112 兼职部门
      }
      const vote1 = [];
      if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
          || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1) //财务部长
      {
          this.$store.getters.orgGroupList.filter((item) => {
              vote1.push(
                  {
                      value: item.centerid,
                      lable: item.centername,
                  },
              );
          })
          this.optionsdata = vote1;
      }
      else
      {
          this.optionsdata = vote;
      }
      //去重
      let letoptionsdata = [];
      let arrId = [];
      for(var item of this.optionsdata){
          if(arrId.indexOf(item['lable']) == -1){
              arrId.push(item['lable']);
              letoptionsdata.push(item);
          }
      }
      this.optionsdata = letoptionsdata;
      if(this.optionsdata.length > 0){
          this.form.group_id = this.optionsdata[0].value;
      }
      //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
      if (this.$route.params.year) {
        this.getList(this.$route.params.group_id, this.$route.params.year, this.$route.params.region);
      } else {
        this.getList(this.optionsdata[0].value, this.form.year, this.form.region);
      }
    },
    getList(groupid, year, month) {
      this.loading = true;
      this.$store
        .dispatch('PFANS1042Store/getPltab', {'groupid': groupid, 'year': year, 'month': month})
        .then(response => {
          this.tableData = response;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    getRowClass({row, column, rowIndex, columnIndex}) {
      if (column.level === 2 && (columnIndex === 5 || columnIndex === 6 || columnIndex === 9
        || columnIndex === 16 || columnIndex === 22 || columnIndex === 26 || columnIndex === 31 || columnIndex === 33)) {
        return {
          color: 'white',
          background: '#778899',
          border: '1px solid white',
        };
      } else {
        return {
          color: 'white',
          background: '#005BAA',
          border: '1px solid white',
        };
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      //行数
      let a = param.data.length;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
              // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return Math.round(prev * 100) / 100;
            }
              // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          sums[index] = Math.round((sums[index]) * 100) / 100;
        } else {
          sums[index] = '--';
        }
      });
      sums[41] = (Math.round((sums[35]) * 100) / 100 / a).toFixed(2) + '%';
      sums[49] = (Math.round((sums[43]) * 100) / 100 / a).toFixed(2) + '%';
      sums[57] = (Math.round((sums[51]) * 100) / 100 / a).toFixed(2) + '%';
      sums[58] = (Math.round((sums[52]) * 100) / 100 / a).toFixed(2) + '%';
      sums[59] = (Math.round((sums[53]) * 100) / 100 / a).toFixed(2) + '%';
      sums[60] = (Math.round((sums[54]) * 100) / 100 / a).toFixed(2) + '%';
      sums[61] = (Math.round((sums[55]) * 100) / 100 / a).toFixed(2) + '%';
      sums[62] = (Math.round((sums[56]) * 100) / 100 / a).toFixed(2) + '%';
      return sums;
    },
    buttonClick() {
      this.loading = true;
      this.costcarryforward = [];
      for (let i = 0; i < this.tableData.length; i++) {
        this.costcarryforward.push({
          status: this.form.status,
          year: this.form.year,
          region: this.form.region,
          group_id: this.form.group_id,
          totalpro: this.tableData[i].totalpro,
          costcarryforward_id: this.tableData[i].costcarryforward_id,
          pj: this.tableData[i].pj,
          pj1: this.tableData[i].pj1,
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
          transferone: this.tableData[i].transferone,
          transfertwo: this.tableData[i].transfertwo,
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
          operating: this.tableData[i].operating,
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
          benefitrate: this.tableData[i].benefitrate,
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
          this.$router.push({
            name: 'PFANS1042View',
          });
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
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
