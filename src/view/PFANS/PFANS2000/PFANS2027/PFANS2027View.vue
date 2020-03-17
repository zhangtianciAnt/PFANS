<template>
  <div>
    <div>
      <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw"
               ref="refform">
      <el-container>
        <el-dialog   :visible.sync="dialogFormVisible">
          <el-form-item :label="$t('label.PFANS2007VIEW_YEAR')" >
            <el-date-picker type="year" style="width: 10rem" v-model="form.evaluationday"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('label.PFANS2027VIEW_COMMENTARYMONTHS')">
            <dicselect
              :code="code14"
              :data="form.subjectmon"
              @change="changecommentarymonths"
              style="width: 10rem"
              >
            </dicselect>
          </el-form-item>

          <el-form-item :label="$t('label.PFANS2027VIEW_EVALUATIONTIME')">
            <dicselect
              :code="code15"
              :data="form.evaluatenum"
              @change="changeevaluationtime"
              style="width: 10rem"
              >
            </dicselect>
            <el-form-item :label="$t('label.PFANS2027VIEW_CATEGORY')">
                <!--<dicselect
                  :data="form.examinationobject_id"
                  style="width: 10rem"
                  :disabled="disabled">
                  <el-option v-for="(item,index) in examinationobjects" :key="index" :value="item.name">
                    {{item.name}}
                  </el-option>
                </dicselect>-->

              <el-select v-model="name" style="width: 10rem" @change="changeExamination">
                <el-option v-for="(item,index) in examinationobjects" :key="index" :value="item.name">
                  {{item.name}}
                </el-option>
              </el-select>

            </el-form-item>

          <div  class="dialog-footer" align="center">
                      <span slot="footer" class="dialog-footer">
                                  <el-button type="primary" @click="click">{{$t('button.confirm')}}</el-button>
                      </span>
          </div>
          </el-form-item>
        </el-dialog>
      </el-container>
      </el-form>
    </div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
 </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable'
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getStatus, getUserInfo,getDictionaryInfo,getOrgInfoByUserId} from '@/utils/customize'
    import dicselect from '../../../components/dicselect';
    export default {
        name: "PFANS2027View",
        components: {
            EasyNormalTable,
            dicselect
        },
        data() {
            return {
                loading: false,
                dialogFormVisible: false,
                title: 'title.PFANS2027VIEW',
                data: [],
                code14: 'PJ103',
                code15: 'PJ104',
                disabled: false,
                name:'',
                examinationobjects: [],
                form:{
                    evaluationday: new Date(),
                    evaluatenum:'',
                    subjectmon:'',
                    subject:'',
                    examinationobject_id: '',
                    user_id: this.$store.getters.userinfo.userid,
                },
                columns: [
                    {
                        code: 'group_id',
                        label: 'label.PFANS2027VIEW_GROUP',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'evaluationday',
                        label: 'label.PFANS2027VIEW_COMMENTARYDATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'subjectmon',
                        label: 'label.PFANS2027VIEW_COMMENTARYMONTHS',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'subject',
                        label: 'label.PFANS2027VIEW_COMMENTARY',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'evaluatenum',
                        label: 'label.PFANS2027VIEW_EVALUATIONTIME',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'user_id',
                        label: 'label.PFANS2027VIEW_EVALUATIONMEN',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'status',
                        label: 'label.PFANS5005VIEW_STATUS',
                        width: 150,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, "icon": "el-icon-plus"},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
                ],
                rowid: '',
                row_id: 'lunarbonus_id'
            };
        },

        mounted() {
            this.loading = true;

            this.get();
            let month = new Date().getMonth() + 1;
            if(month >= 1 && month <=3){
                this.form.subjectmon = getDictionaryInfo('PJ103004').value1;
                this.form.subject = getDictionaryInfo('PJ103004').value2;
            }
            if(month >= 4 && month <=6){
                this.form.subjectmon = getDictionaryInfo('PJ103001').value1;
                this.form.subject = getDictionaryInfo('PJ103001').value2;
            }
            if(month >= 7 && month <=9){
                this.form.subjectmon = getDictionaryInfo('PJ103002').value1;
                this.form.subject = getDictionaryInfo('PJ103002').value2;
            }
            if(month >= 10 && month <=12){
                this.form.subjectmon = getDictionaryInfo('PJ103003').value1;
                this.form.subject = getDictionaryInfo('PJ103003').value2;
            }
            let user = getUserInfo(this.form.user_id);
            //获取本用户的职位
            let postcode = user.userinfo.post;
            if(postcode === 'PJ105005'){
                this.form.evaluatenum = getDictionaryInfo('PJ104001').value1;
            }
            if(postcode === 'PJ105003'){
                this.form.evaluatenum = getDictionaryInfo('PJ104002').value1;
            }
            if(postcode === 'PJ105002'){
                this.form.evaluatenum = getDictionaryInfo('PJ104003').value1;
            }

            this.$store
                .dispatch("PFANS2027Store/getExaminationobject")
                .then(response => {
                    for(let i = 0;i<response.length;i++){
                        this.examinationobjects.push(response[i]);
                    }
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

        /*beforeUpdate(){
            this.get();
        },*/
        methods: {
            rowClick(row) {
                this.rowid = row.lunarbonus_id;
            },
            click(){
                console.log("aaa",this.form);
                this.loading = true;
                this.$store
                    .dispatch("PFANS2027Store/insertLunarbonus", this.form)
                    .then(response => {
                        this.loading = false;
                        this.$message({
                            message: this.$t("normal.success_01"),
                            type: "success"
                        });
                        if (this.$store.getters.historyUrl) {
                            this.$router.push(this.$store.getters.historyUrl);
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
                this.dialogFormVisible = false;
                this.get();
            },
            changeExamination(val){
                for(let i=0;i<this.examinationobjects.length;i++)
                {
                    if(val === this.examinationobjects[i].name){
                        this.form.examinationobject_id = this.examinationobjects[i].examinationobject_id;
                    }
                }
                console.log(this.form.examinationobject_id);
            },
            get(){
                this.$store
                    .dispatch('PFANS2027Store/getLunarbonus', {})
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if (response[j].user_id !== null && response[j].user_id !== "") {

                                let lst = getOrgInfoByUserId(response[j].user_id);
                                if(lst){
                                    response[j].group_id = lst.groupNmae;
                                }
                                let rst = getUserInfo(response[j].user_id);
                                if (rst) {
                                    response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                                }
                                if (response[j].subjectmon !== null && response[j].subjectmon !== "") {
                                    let letUsetype = getDictionaryInfo(response[j].subjectmon);
                                    if (letUsetype != null) {
                                        response[j].subjectmon = letUsetype.value1;
                                    }
                                }
                                if (response[j].subject !== null && response[j].subject !== "") {
                                    let letUsetype = getDictionaryInfo(response[j].subject);
                                    if (letUsetype != null) {
                                        response[j].subject = letUsetype.value2;
                                    }
                                }

                                if (response[j].evaluatenum !== null && response[j].evaluatenum !== "") {
                                    let letUsetype = getDictionaryInfo(response[j].evaluatenum);
                                    if (letUsetype != null) {
                                        response[j].evaluatenum = letUsetype.value1;
                                    }
                                }

                                if (response[j].evaluationday !== null && response[j].evaluationday !== "") {
                                    response[j].evaluationday = moment(response[j].evaluationday).format("YYYY-MM-DD");
                                }
                                if (response[j].status !== null && response[j].status !== "") {
                                    response[j].status = getStatus(response[j].status);
                                }
                            }
                        }
                        this.data = response;
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false;
                    });
            },
            changeevaluationtime(val){
                this.form.evaluatenum = val;
            },
            changecommentarymonths(val){
                this.form.subjectmon = val;
                this.form.subject = val;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === "view") {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2027FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false,
                            show: true
                        }
                    })
                } else if (val === "insert") {
                    this.dialogFormVisible = true;
                } else if (val === "update") {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2027FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true,
                            show: false
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
