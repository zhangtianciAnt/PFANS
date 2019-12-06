<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 20px">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PERSONNELPLAN')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                      <el-input :disabled="true" style="width:11rem" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                      <el-input :disabled="true" style="width:11rem" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1036FORMVIEW_TEAM')">
                      <el-input :disabled="true" style="width:11rem" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 9.2rem" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-tabs v-model="activeName">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">

                    <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
                      <el-table-column :label="$t('label.人員計画合計')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.4月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.5月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.6月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.7月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.8月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.9月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.上期')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.10月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.11月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.12月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.1月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.2月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.3月')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.下期')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.年間合计')" align="center" width="300">
                        <el-table-column :label="$t('label.人数')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業工数')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                    <el-table :data="tableE" header-cell-class-name="sub_bg_color_grey height">
                      <el-table-column align="center" width="200">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disable"
                            maxlength="20"
                            style="width: 100%;"
                            v-model.trim="scope.row.place"
                            :no="scope.row"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" width="200">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disable"
                            maxlength="20"
                            style="width: 100%;"
                            v-model.trim="scope.row.place"
                            :no="scope.row"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.4月')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disable"
                            maxlength="20"
                            style="width: 100%;"
                            v-model.trim="scope.row.place"
                            :no="scope.row"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.4月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.5月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.6月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.7月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.8月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.9月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.上期')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.10月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.11月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.12月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.1月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.2月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.3月')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.下期')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.年間合计')" align="center" width="300">
                        <el-table-column :label="$t('label.給与')" align="center" width="300">
                          <template slot-scope="scope">
                            <div class="block">
                              <el-date-picker
                                :disabled="!disable"
                                style="width:100%"
                                type="date"
                                v-model="scope.row.travelcontentdate">
                              </el-date-picker>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.残業費')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.place"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>

                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CURRENTPERSONNEL')" name="second">
                    <el-table :data="tableP" header-cell-class-name="sub_bg_color_grey height">
                      <el-table-column :label="$t('label.PFANS1002VIEW_TRAVELCONTENTDATE1')" align="center" width="300">
                        <template slot-scope="scope">
                          <div class="block">
                            <el-date-picker
                              :disabled="!disable"
                              style="width:100%"
                              type="date"
                              v-model="scope.row.travelcontentdate">
                            </el-date-picker>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1002VIEW_PLACE1')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1002VIEW_CONTENT1')" align="center" width="300">
                        <template slot-scope="scope">
                          <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.content"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableP)"
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
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CAREER')" name="third">
                    <el-table :data="tableT" header-cell-class-name="sub_bg_color_grey height">
                      <el-table-column :label="$t('label.PFANS1002VIEW_TRAVELCONTENTDATE1')" align="center" width="300">
                        <template slot-scope="scope">
                          <div class="block">
                            <el-date-picker
                              :disabled="!disable"
                              style="width:100%"
                              type="date"
                              v-model="scope.row.travelcontentdate">
                            </el-date-picker>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1002VIEW_PLACE1')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.place"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1002VIEW_CONTENT1')" align="center" width="300">
                        <template slot-scope="scope">
                          <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.content"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableP)"
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
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import user from "../../../components/user.vue";
    import {Message} from 'element-ui';
    import moment from "moment";
    import {getOrgInfoByUserId} from '@/utils/customize';
    import {telephoneNumber} from '@/utils/validate';
    import dicselect from "../../../components/dicselect";
    import {getDictionaryInfo} from "../../../../utils/customize";

    export default {
        name: 'PFANS1012FormView',
        components: {
            dicselect,
            EasyNormalContainer,
            user,
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.error = "";
                    return callback();
                }
            };
            var checktele = (rule, value, callback) => {
                if (this.form.telephone !== null && this.form.telephone !== '') {
                    if (telephoneNumber(value)) {
                        callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1036VIEW_TELEPHONE')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                tableTValue: "",
                tablePValue: "",
                tableRValue: "",
                error: '',
                options: [],
                selectType: "Single",
                title: "title.PFANS1036VIEW",
                userlist: "",
                activeName: 'first',
                loading: false,
                disabled: false,
                disablecurr: false,
                buttonList: [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ],
                tableData: [{
                    abstract: this.$t('label.PFANS1036VIEW_TRAFFICEXPENSEC'),
                    subjectnumber: "",
                    subjectname: "",
                    budgetunit: "",
                    debitamount: "",
                    creditamount: "",
                    remarks: "",
                },
                    {
                        abstract: this.$t('label.PFANS1036VIEW_PURCHASEEXPENSEC'),
                        subjectnumber: "",
                        subjectname: "",
                        budgetunit: "",
                        debitamount: "",
                        creditamount: "",
                        remarks: "",
                    },
                    {
                        abstract: this.$t('label.PFANS1036VIEW_OTHEREXPENSEC'),
                        subjectnumber: "",
                        subjectname: "",
                        budgetunit: "",
                        debitamount: "",
                        creditamount: "",
                        remarks: "",
                    },
                ],
                tableData2: [{
                    abstract: this.$t('label.PFANS1036VIEW_TRAFFICEXPENSEC'),
                    subjectnumber: "",
                    subjectname: "",
                    budgetunit: "",
                    debitamount: "",
                    creditamount: "",
                    remarks: "",
                }],
                tableT: [{
                    publicexpenseid: "",
                    trafficdetails_id: "",
                    trafficdate: "",
                    region: "",
                    vehicle: "",
                    startingpoint: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true,
                }],
                tableP: [{
                    publicexpenseid: "",
                    purchasedetails_id: "",
                    purchasedetailsdate: "",
                    procurementdetails: "",
                    procurementproject: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    showrow: true,
                    showrow1: false,
                    showrow2: false,
                    showrow3: false,
                    display: true
                }],
                tableR: [{
                    publicexpenseid: "",
                    otherdetails_id: "",
                    otherdetailsdate: "",
                    costitem: "",
                    remarks: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true
                }],
                baseInfo: {},
                form: {
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    user_id: '',
                    telephone: '',
                    budgetunit: '',
                    moduleid: '',
                    accountnumber: '',
                    reimbursementdate: moment(new Date()).format("YYYY-MM-DD"),
                    moneys: '',
                    currency: '',
                    foreigncurrency: '',
                    rmbexpenditure: '',
                    currencyrate: '',
                    tormb: '',
                    remark: '',
                    paymentmethod: '',
                    payeename: '',
                    payeecode: '',
                    payeebankaccountnumber: '',
                    payeebankaccount: '',
                    name: '',
                    code: '',
                    type: '',
                    judgement: '',
                    receivables: '',
                    loan: '',
                    fullname: '',
                    subjectnumber: "",
                    subjectname: "",
                    remarks: '',
                    purchasesubjectnumber: "",
                    purchasesubjectname: "",
                    purchaseremarks: '',
                    othersubjectnumber: "",
                    othersubjectname: "",
                    otherremarks: '',
                },
                rules: {
                    user_id: [{
                        required: true,
                        validator: checkuser,
                        trigger: 'change'
                    }],
                    telephone: [{
                        validator: checktele,
                        trigger: 'change'
                    }],
                    budgetunit: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
                        trigger: 'change',
                    }],
                    paymentmethod: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS1036VIEW_PAYMENTMETHOD'),
                        trigger: 'change',
                    }],
                    accountnumber: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS1036VIEW_ACCOUNT_NUMBER'),
                        trigger: 'blur',
                    }],
                },
                code1: 'PG002',
                code2: 'PJ002',
                code3: 'PJ004',
                code4: 'PJ003',
                code5: 'PJ005',
                code6: 'PJ006',
                code7: 'PJ007',
                code8: 'PJ008',
                multiple: false,
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                show5: false,
                show6: false,
                show: false,
                showrow: true,
                showrow1: false,
                showrow2: false,
                showrow3: false,
                showdata: false,
                showdata2: false,
                canStart: false
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1036Store/selectById', {'publicexpenseid': this.$route.params._id})
                    .then(response => {
                        this.form = response.publicexpense;
                        if (response.trafficdetails.length > 0) {
                            this.tableT = response.trafficdetails;
                        }
                        if (response.purchasedetails.length > 0) {
                            this.tableP = response.purchasedetails;
                            for (var i = 0; i < this.tableP.length; i++) {
                                if (this.tableP[i].procurementproject === 'PJ005001' || this.tableP[i].procurementproject === 'PJ005002' || this.tableP[i].procurementproject === 'PJ005006') {
                                    this.tableP[i].showrow = true;
                                    this.tableP[i].showrow1 = false;
                                    this.tableP[i].showrow2 = false;
                                    this.tableP[i].showrow3 = false;
                                } else if (this.tableP[i].procurementproject === 'PJ005003') {
                                    this.tableP[i].showrow = false;
                                    this.tableP[i].showrow1 = true;
                                    this.tableP[i].showrow2 = false;
                                    this.tableP[i].showrow3 = false;
                                } else if (this.tableP[i].procurementproject === 'PJ005004') {
                                    this.tableP[i].showrow = false;
                                    this.tableP[i].showrow1 = false;
                                    this.tableP[i].showrow2 = true;
                                    this.tableP[i].showrow3 = false;
                                } else if (this.tableP[i].procurementproject === 'PJ005005') {
                                    this.tableP[i].showrow = false;
                                    this.tableP[i].showrow1 = false;
                                    this.tableP[i].showrow2 = false;
                                    this.tableP[i].showrow3 = true;
                                }
                            }
                        }
                        if (response.otherdetails.length > 0) {
                            this.tableR = response.otherdetails;
                        }
                        this.userlist = this.form.user_id;
                        this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
                        this.baseInfo.purchasedetails = JSON.parse(JSON.stringify(this.tableP));
                        this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
                        this.getPayment(this.form.paymentmethod);
                        if (this.form.paymentmethod === 'PJ004001') {
                            this.show1 = true;
                        } else if (this.form.paymentmethod === 'PJ004002') {
                            this.show2 = true;
                        } else if (this.form.paymentmethod === 'PJ004003') {
                            this.show3 = true;
                        } else if (this.form.paymentmethod === 'PJ004004') {
                            this.show4 = true;
                        } else if (this.form.paymentmethod === 'PJ004005') {
                            this.show5 = true;
                        }
                        if (this.form.type === 'PJ001001') {
                            this.show6 = false;
                            this.showdata2 = true;
                            this.showdata = false;
                            this.tableData2[0].subjectname = this.form.subjectname;
                            this.tableData2[0].subjectnumber = this.form.subjectnumber;
                            this.tableData2[0].remarks = this.form.remarks;
                        } else {
                            this.show6 = true;
                            this.showdata = true;
                            this.showdata2 = false;
                            this.tableData[0].subjectname = this.form.subjectname;
                            this.tableData[0].subjectnumber = this.form.subjectnumber;
                            this.tableData[0].remarks = this.form.remarks;
                            this.tableData[1].subjectname = this.form.purchasesubjectname;
                            this.tableData[1].subjectnumber = this.form.purchasesubjectnumber;
                            this.tableData[1].remarks = this.form.purchaseremarks;
                            this.tableData[2].subjectname = this.form.othersubjectname;
                            this.tableData[2].subjectnumber = this.form.othersubjectnumber;
                            this.tableData[2].remarks = this.form.otherremarks;
                        }
                        this.form.currencyrate = getDictionaryInfo(this.form.currency).value2;
                        this.tableData2[0].budgetunit = getDictionaryInfo(this.form.budgetunit).value1;
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].budgetunit = getDictionaryInfo(this.form.budgetunit).value1;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false;
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== "") {
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.centerid = rst.centerNmae;
                    this.form.groupid = rst.groupNmae;
                    this.form.teamid = rst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
                this.form.judgement = this.$route.params._name.join(",");
                this.form.type = this.$route.params._type;
                if (this.form.type === 'PJ001001') {
                    this.show6 = false;
                    this.showdata2 = true;
                    this.showdata = false;
                    this.form.subjectname = this.tableData2[0].subjectname;
                    this.form.subjectnumber = this.tableData2[0].subjectnumber;
                    this.form.remarks = this.tableData2[0].remarks;
                } else {
                    this.show6 = true;
                    this.showdata2 = false;
                    this.showdata = true;
                }
            }
            this.$store
                .dispatch('PFANS1036Store/getLoanApplication', {})
                .then(response => {
                    for (let i = 0; i < response.length; i++) {
                        var vote = {};
                        vote.value = response[i].loanapplication_id;
                        vote.label = moment(response[i].application_date).format('YYYY-MM-DD');
                        this.options.push(vote)
                    }
                })
        },
        created() {
            if (!this.$route.params.disabled) {
                this.buttonList = [];
            }
            this.disable = this.$route.params.disabled;
        },
        computed: {
            foreigncurrency: {
                get() {
                    return this.form.foreigncurrency;
                },
                set(val) {
                    this.form.foreigncurrency = val;
                }
            }
        },
        watch: {
            foreigncurrency(val) {
                this.form.tormb = (val * this.form.currencyrate).toFixed(2);
            }
        },
        methods: {
            getUserids(val) {
                this.userlist = val;
                this.form.user_id = val;
                let rst = getOrgInfoByUserId(val);
                this.form.centerid = rst.centerNmae;
                this.form.groupid = rst.groupNmae;
                this.form.teamid = rst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || typeof val == "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            workflowState(val) {
                if (val.state === '1') {
                    this.form.status = '3';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                this.buttonClick("save");
            },
            start() {
                this.form.status = '2';
                this.buttonClick("save");
            },
            end() {
                this.form.status = '0';
                this.buttonClick("save");
            },
            getPayment(val) {
                this.form.paymentmethod = val;
                if (val === 'PJ004001') {
                    this.show1 = true;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                    this.show5 = false;
                } else if (val === 'PJ004002') {
                    this.show1 = false;
                    this.show2 = true;
                    this.show3 = false;
                    this.show4 = false;
                    this.show5 = false;
                } else if (val === 'PJ004003') {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = true;
                    this.show4 = false;
                    this.show5 = false;
                } else if (val === 'PJ004004') {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = true;
                    this.show5 = false;
                } else {
                    this.show1 = false;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                    this.show5 = true;
                }
            },
            getBudge(val) {
                this.form.budgetunit = val;
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].budgetunit = getDictionaryInfo(val).value1;
                }
                for (let i = 0; i < this.tableData2.length; i++) {
                    this.tableData2[i].budgetunit = getDictionaryInfo(val).value1;
                }
            },
            getmodule(val) {
                this.form.moduleid = val;
            },
            getCurrency(val) {
                this.form.currency = val;
                if (val === 'PJ003001') {
                    this.disablecurr = false;
                    let dictionaryInfo = getDictionaryInfo(val);
                    if (dictionaryInfo) {
                        this.form.currencyrate = dictionaryInfo.value2;
                    }
                    this.form.tormb = (this.form.foreigncurrency * this.form.currencyrate).toFixed(2);
                } else if (val === 'PJ003002') {
                    this.disablecurr = false;
                    let dictionaryInfo = getDictionaryInfo(val);
                    if (dictionaryInfo) {
                        this.form.currencyrate = dictionaryInfo.value2;
                    }
                    this.form.tormb = (this.form.foreigncurrency * this.form.currencyrate).toFixed(2);
                } else if (val === 'PJ003003') {
                    this.form.currencyrate = '';
                    this.disablecurr = true;
                    this.form.tormb = (this.form.foreigncurrency * this.form.currencyrate).toFixed(2);
                }
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            deleteRow3(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            deleteRow4(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            addRow() {
                this.tableT.push({
                    trafficdetails_id: "",
                    publicexpenseid: "",
                    trafficdate: "",
                    region: "",
                    vehicle: "",
                    startingpoint: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true
                });
            },
            addRow3() {
                this.tableP.push({
                    publicexpenseid: "",
                    purchasedetails_id: "",
                    purchasedetailsdate: "",
                    procurementdetails: "",
                    procurementproject: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true,
                    showrow: true,
                    showrow1: false,
                    showrow2: false,
                    showrow3: false,
                });
            },
            addRow4() {
                this.tableR.push({
                    publicexpenseid: "",
                    otherdetails_id: "",
                    otherdetailsdate: "",
                    costitem: "",
                    remarks: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true,
                });
            },
            getprocurementproject(val, row) {
                row.procurementproject = val;
                row.procurementdetails = ' ';
                if (val === 'PJ005001' || val === 'PJ005002' || val === 'PJ005006') {
                    row.showrow = true;
                    row.showrow1 = false;
                    row.showrow2 = false;
                    row.showrow3 = false;
                } else if (val === 'PJ005003') {
                    row.showrow = false;
                    row.showrow1 = true;
                    row.showrow2 = false;
                    row.showrow3 = false;
                } else if (val === 'PJ005004') {
                    row.showrow = false;
                    row.showrow1 = false;
                    row.showrow2 = true;
                    row.showrow3 = false;
                } else if (val === 'PJ005005') {
                    row.showrow = false;
                    row.showrow1 = false;
                    row.showrow2 = false;
                    row.showrow3 = true;
                }
            },
            setprocurementdetails(val, row) {
                row.procurementdetails = val;
            },
            getTsummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1036VIEW_ACCOUNT');
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '--'
                    }
                });
                this.getMoney(sums);
                this.getforeigncurrency(sums);
                this.getValue(sums);
                return sums;
            },
            getPsummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1036VIEW_ACCOUNT');
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '--'
                    }
                });
                this.tablePValue = sums;
                return sums;
            },
            getRsummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1036VIEW_ACCOUNT');
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '--'
                    }
                });
                this.tableRValue = sums;
                return sums;
            },
            getDsummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1036VIEW_ACCOUNT');
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        if (index == 4) {
                            sums[index] = sums[index].toFixed(2);
                        }
                        if (index == 5) {
                            sums[index] = sums[index].toFixed(2);
                        }
                    } else {
                        sums[index] = '--'
                    }
                });
                return sums;
            },
            getMoney(sums) {
                if (this.form.type === 'PJ001001') {
                    this.form.rmbexpenditure = sums[4];
                } else {
                    this.form.rmbexpenditure = sums[4] + this.tablePValue[3] + this.tableRValue[3];
                }
            },
            getforeigncurrency(sums) {
                if (this.form.type === 'PJ001001') {
                    this.form.foreigncurrency = sums[5];
                } else {
                    this.form.foreigncurrency = sums[5] + this.tablePValue[4] + this.tableRValue[4];
                }
            },
            getValue(sums) {
                if (this.form.type === 'PJ001001') {
                    this.tableData2[0].creditamount = (sums[4] + sums[5] * this.form.currencyrate);
                } else {
                    this.tableData[0].creditamount = (sums[4] + sums[5] * this.form.currencyrate);
                    this.tableData[1].creditamount = (this.tablePValue[3] + this.tablePValue[4] * this.form.currencyrate);
                    this.tableData[2].creditamount = (this.tableRValue[3] + this.tableRValue[4] * this.form.currencyrate);
                }
            },
            changeRMB(newValue) {
                if (newValue.rmb > 0) {
                    newValue.foreigncurrency = "";
                    newValue.display = false;
                    this.$nextTick(() => {
                        newValue.display = true
                    })
                }
            },
            changeForeigncurrency(newValue) {
                if (newValue.foreigncurrency > 0) {
                    newValue.rmb = "";
                    newValue.display = false;
                    this.$nextTick(() => {
                        newValue.display = true
                    })
                }
            },
            buttonClick(val) {
                if (val === "back") {
                    this.$router.push({
                        name: 'PFANS1036View',
                        params: {}
                    })
                }
                if (val === "save") {
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            if (this.form.type === 'PJ001001') {
                                this.form.subjectnumber = this.tableData2[0].subjectnumber;
                                this.form.subjectname = this.tableData2[0].subjectname;
                                this.form.remarks = this.tableData2[0].remarks;
                            } else {
                                this.form.subjectnumber = this.tableData[0].subjectnumber;
                                this.form.subjectname = this.tableData[0].subjectname;
                                this.form.remarks = this.tableData[0].remarks;
                                this.form.purchasesubjectnumber = this.tableData[1].subjectnumber;
                                this.form.purchasesubjectname = this.tableData[1].subjectname;
                                this.form.purchaseremarks = this.tableData[1].remarks;
                                this.form.othersubjectnumber = this.tableData[2].subjectnumber;
                                this.form.othersubjectname = this.tableData[2].subjectname;
                                this.form.otherremarks = this.tableData[2].remarks;
                            }
                            this.baseInfo = {};
                            this.form.user_id = this.userlist;
                            this.form.moneys = (this.form.rmbexpenditure + this.form.tormb).toFixed(2);
                            this.form.reimbursementdate = moment(this.form.reimbursementdate).format('YYYY-MM-DD');
                            this.baseInfo.publicexpense = JSON.parse(JSON.stringify(this.form));
                            this.baseInfo.trafficdetails = [];
                            this.baseInfo.purchasedetails = [];
                            this.baseInfo.otherdetails = [];
                            for (let i = 0; i < this.tableT.length; i++) {
                                if (this.tableT[i].trafficdate !== "" || this.tableT[i].region !== "" || this.tableT[i].vehicle !== "" || this.tableT[i].startingpoint !== ""
                                    || this.tableT[i].rmb !== "" || this.tableT[i].foreigncurrency !== "" || this.tableT[i].annexno !== "") {
                                    this.baseInfo.trafficdetails.push(
                                        {
                                            trafficdetails_id: this.tableT[i].trafficdetails_id,
                                            publicexpenseid: this.tableT[i].publicexpenseid,
                                            trafficdate: this.tableT[i].trafficdate,
                                            region: this.tableT[i].region,
                                            vehicle: this.tableT[i].vehicle,
                                            startingpoint: this.tableT[i].startingpoint,
                                            rmb: this.tableT[i].rmb,
                                            foreigncurrency: this.tableT[i].foreigncurrency,
                                            annexno: this.tableT[i].annexno,
                                        }
                                    );
                                }
                            }
                            for (let i = 0; i < this.tableP.length; i++) {
                                if (this.tableP[i].purchasedetailsdate !== "" || this.tableP[i].procurementdetails !== "" || this.tableP[i].procurementproject !== ""
                                    || this.tableP[i].rmb !== "" || this.tableP[i].foreigncurrency !== "" || this.tableP[i].annexno !== "") {
                                    if (this.tableP[i].procurementdetails === ' ') {
                                        this.tableP[i].procurementdetails = '';
                                    }
                                    this.baseInfo.purchasedetails.push(
                                        {
                                            purchasedetails_id: this.tableP[i].purchasedetails_id,
                                            publicexpenseid: this.tableP[i].publicexpenseid,
                                            purchasedetailsdate: this.tableP[i].purchasedetailsdate,
                                            procurementdetails: this.tableP[i].procurementdetails,
                                            procurementproject: this.tableP[i].procurementproject,
                                            rmb: this.tableP[i].rmb,
                                            foreigncurrency: this.tableP[i].foreigncurrency,
                                            annexno: this.tableP[i].annexno,
                                        }
                                    );
                                }
                            }
                            for (let i = 0; i < this.tableR.length; i++) {
                                if (this.tableR[i].otherdetailsdate !== "" || this.tableR[i].costitem !== "" || this.tableR[i].remarks !== ""
                                    || this.tableR[i].rmb !== "" || this.tableR[i].foreigncurrency !== "" || this.tableR[i].annexno !== "") {
                                    this.baseInfo.otherdetails.push(
                                        {
                                            otherdetails_id: this.tableR[i].otherdetails_id,
                                            publicexpenseid: this.tableR[i].publicexpenseid,
                                            otherdetailsdate: this.tableR[i].otherdetailsdate,
                                            costitem: this.tableR[i].costitem,
                                            remarks: this.tableR[i].remarks,
                                            rmb: this.tableR[i].rmb,
                                            foreigncurrency: this.tableR[i].foreigncurrency,
                                            annexno: this.tableR[i].annexno,
                                        }
                                    );
                                }
                            }
                            if (this.$route.params._id) {
                                this.baseInfo.publicexpense.publicexpenseid = this.$route.params._id;
                                this.$store
                                    .dispatch('PFANS1036Store/update', this.baseInfo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        if (val !== "update") {
                                            Message({
                                                message: this.$t('normal.success_02'),
                                                type: 'success',
                                                duration: 5 * 1000
                                            });
                                            this.$router.push({
                                                name: 'PFANS1036View',
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        Message({
                                            message: error,
                                            type: 'error',
                                            duration: 5 * 1000
                                        });
                                        this.loading = false;
                                    })
                            } else {
                                this.$store
                                    .dispatch('PFANS1036Store/insert', this.baseInfo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        Message({
                                            message: this.$t('normal.success_01'),
                                            type: 'success',
                                            duration: 5 * 1000
                                        });
                                        this.$router.push({
                                            name: 'PFANS1036View',
                                        });
                                    })
                                    .catch(error => {
                                        Message({
                                            message: error,
                                            type: 'error',
                                            duration: 5 * 1000
                                        });
                                        this.loading = false;
                                    })
                            }
                        }
                    })
                }
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
