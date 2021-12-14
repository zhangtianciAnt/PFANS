<template>
  <div>
    <EasyNormalContainer :title="title" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 3vw">
          <el-row>
            <el-col :span="4">
              <el-form-item :label="$t('label.PFANSPERCALEVIEW_NAME')" prop="reportpeople">
                <el-input :disabled="true" style="width:6vw" v-model="form.user_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANSPERCALEVIEW_DEPARTC')">
                <el-input :disabled="true" style="width:16vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANSPERCALEVIEW_DEPARTG')">
                <el-input :disabled="true" style="width:16vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :label="$t('label.PFANSPERCALEVIEW_RANKS')">
                <el-input :disabled="true" style="width:6vw" v-model="form.ranks"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :label="$t('label.PFANSPERCALEVIEW_PERSONUMBER')">
                <el-input :disabled="true" style="width:6vw" v-model="form.mangernumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <plx-table-grid :datas="tableA" use-virtual stripe border header-cell-class-name="sub_bg_color_blue" header-row-class-name="height"
                              style="width: 100%;height: calc(100vh - 200px - 2rem)" highlight-current-row height="400" :row-height="40" :pagination-show="false">
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_NAME')"
                                 align="center" width="70" prop="reportpeople"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_DEPARTC')"
                                 align="left" width="220" prop="center_id"/>

                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_DEPARTG')"
                                 align="left" width="220" prop="group_id"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_TYPE')"
                                 align="center" width="100" prop="type"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_RANKS')"
                                 align="center" width="80" prop="ranks"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_PROUJECTS')"
                                 align="left" width="340" prop="project_name"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_PROPORTIONS')"
                                 align="center" width="70" prop="proportions"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <plx-table-column :label="$t('label.PFANSPERCALEVIEW_REPORTERS')"
                                 align="center" width="70" prop="reporters"/>
<!--                  <template slot-scope="scope">-->
<!--                    <el-input-->
<!--                      :no="scope.row"-->
<!--                      :disabled="!disable"-->
<!--                      v-model="scope.row.remarks"-->
<!--                      style="width: 100%">-->
<!--                    </el-input>-->
<!--                  </template>-->
<!--                </el-table-column>-->

              </plx-table-grid>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {getDepartmentById, getUserInfo,getDictionaryInfo,getCooperinterviewListByAccount} from '@/utils/customize';

export default {
  name: "personScaleFormView",
  components: {
    EasyNormalContainer,
  },
  data(){
    return{
      loading: false,
      title: 'title.personScaleView',
      form: {
        user_id: '',
        center_id: '',
        group_id: '',
        ranks: '',
        mangernumber: '',
      },
      tableA:[],
    }
  },
  mounted() {
    this.getPeopleInfo();
  },
  methods: {
    getPeopleInfo(){
      this.loading = true;
      this.$store
        .dispatch('scaleStore/getPeopleInfo', {'personScaleMee_id': this.$route.params._id,'yearMonth': this.$route.params._yearMonth})
        .then(response => {
          if(response.personScaleMee){
            let ppscale = response.personScaleMee;
            if(ppscale.user_id){
              let naem = getUserInfo(ppscale.user_id);
              if(naem){
                ppscale.user_id = naem.userinfo.customername
              }
            }
            if(ppscale.center_id){
              ppscale.center_id = getDepartmentById(ppscale.center_id);
            }
            if(ppscale.group_id){
              ppscale.group_id = getDepartmentById(ppscale.group_id);
            }
            if(ppscale.ranks){
              ppscale.ranks = getDictionaryInfo(ppscale.ranks).value1;
            }
            this.form = ppscale;
          }
          if(response.personScaleList.length > 0){
            for(let scle of response.personScaleList){
              if(scle.type === '2'){
                this.tableA.push({
                  // reportpeople: getUserInfo(scle.reportpeople) === null
                  //   ? getCooperinterviewListByAccount(scle.reportpeople).expname : getUserInfo(scle.reportpeople).userinfo.customername,
                  // center_id: getDepartmentById(scle.center_id),
                  // group_id: getDepartmentById(scle.group_id),
                  reportpeople: scle.reportpeople,
                  type: '外注_构外',
                  // ranks: getDictionaryInfo(scle.ranks).value1,
                  project_name: scle.project_name,
                  proportions: scle.proportions,
                  reporters: getUserInfo(scle.reporters).userinfo.customername,
                })
              }else{
                this.tableA.push({
                  reportpeople: getUserInfo(scle.reportpeople) === null
                    ? getCooperinterviewListByAccount(scle.reportpeople).expname : getUserInfo(scle.reportpeople).userinfo.customername,
                  center_id: getDepartmentById(scle.center_id),
                  group_id: getDepartmentById(scle.group_id),
                  type: scle.type === '0' ? '社内' : '外注_构内',
                  ranks: getDictionaryInfo(scle.ranks).value1,
                  project_name: scle.project_name,
                  proportions: scle.proportions,
                  reporters: getUserInfo(scle.reporters).userinfo.customername,
                })
              }
            }
          }
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
}
</script>

<style scoped>

</style>
