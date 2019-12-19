<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize" style="margin-top: 2rem;">
        <el-form :model="addForm" :rules="rules" label-position="top" ref="addForm"
                 v-show="pigeType=='insert'?true:false">
          <el-row justify="center" type="flex">
            <el-col :span="20">
              <el-row :gutter="18">
                <el-col :span="8">
                  <el-form-item :label="$t('label.BASF10110FORMVIEW_CODE')" prop="icode">
                    <el-input ref="icode" v-model="addForm.icode" maxlength="3">
                      <template slot="prepend">{{bigCode}}</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.BASF10110VIEW_VALUE1')">
                    <el-input ref="ivalue1" v-model="addForm.ivalue1" maxlength="255">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('label.BASF10110FORMVIEW_SMALLCODE')" prop="ivalue2">
                    <el-input ref="ivaluel2" v-model="addForm.ivalue2" maxlength="8">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('label.BASF10110FORMVIEW_FUNCTION')">
                    <el-button @click="addCode(addForm.icode,addForm.ivalue1,addForm.ivalue2)" type="primary">{{$t('label.BASF10110FORMVIEW_ADD')}}
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
        <el-form label-position="top" :model="formData" :rules="rules2" ref="formData">
          <el-row justify="center" type="flex">
            <el-col :span="20">
              <el-row :gutter="18" :key="index" v-for="(f,index) in formData.data">
                <el-col :span="8">
                  <el-form-item :label="index==0?$t('label.BASF10110FORMVIEW_CODE'):''">
                    <el-input :disabled="true" v-model="f.code">
                      <template slot="prepend">{{bigCode}}</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="index==0?$t('label.BASF10110VIEW_VALUE1'):''">
                    <el-input :disabled="readOnly||pigeType=='insert'" v-model="f.value1" maxlength="255">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="index==0?$t('label.BASF10110FORMVIEW_SMALLCODE'):''" :prop="`data.${index}.value2`" :rules="rules2.datavalue2">
                    <el-input :disabled="readOnly||pigeType=='insert'" v-model="f.value2" maxlength="5">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4" v-show="pigeType!='view'?true:false">
                  <el-form-item :label="index==0?$t('label.BASF10110FORMVIEW_FUNCTION'):''">
                    <el-button :disabled="readOnly" @click="deleteCode(index,f)" type="primary">{{$t('button.delete')}}</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import {Message} from "element-ui";

    export default {
        name: "BASF10110FormView",
        components: {
            EasyNormalContainer,
        },
        data() {
            var digitalAuthentication = (rule, value, callback) => {
                if (/\D/.test(value)) {
                    callback(new Error(this.$t('label.BASF10110FORMVIEW_NUMBER')));
                } else {
                    callback();
                }
            };
            var checkData = (rule, value, callback) => {
                for(var i=0;i<this.dataCheck.length;i++){
                    if (value==this.dataCheck[i].code){
                        callback(new Error(this.$t('label.BASF10110FORMVIEW_SAMECODE')));
                        break;
                    }
                }
                for(var i=0;i<this.formData.data.length;i++){
                    if (value==this.formData.data[i].code){
                        callback(new Error(this.$t('label.BASF10110FORMVIEW_SAMECODE2')));
                        break;
                    }
                }
                callback();
            };
            var valu2Check = (rule, value, callback) => {
                console.log(value);
                debugger;
                if (/[B][C][0-9]{3}/.test(value)||value==''||value==null) {
                    callback();
                } else {
                    callback(new Error(this.$t('label.BASF10110FORMVIEW_BCNUMBER')));
                }
            };
            return {
                //新增绑定所需的值
                addForm: {
                    icode: '',
                    ivalue1: '',
                    ivalue2: ''
                },
                //新增时检测是否已经存在的校验数据
                dataCheck: [],
                //页面类型
                pigeType: '',
                loading: false,
                title: '',
                //大CODE
                bigCode: '',
                readOnly: false,
                //获取到的该大分类下的小分类
                formData: {
                    data:[]
                },
                //存储新增或更改后的数据
                upData: [],
                //存储删除后的数据
                delData: [],
                buttonList: [
                    {
                        //保存按钮
                        key: "save",
                        name: "button.save",
                        visible: true
                    }
                ],
                rules: {
                    icode: [
                        {required: true, message: this.$t('normal.error_08')+'CODE', trigger: 'blur'},
                        {validator: digitalAuthentication, trigger: 'blur'},
                        {validator: checkData, trigger: 'blur'},
                        {min: 3, max: 3, message: this.$t('label.BASF10110FORMVIEW_LENGTHTHREE'), trigger: 'blur'}
                    ],
                    ivalue2:[
                        {required: false, message: this.$t('normal.error_08')+'CODE', trigger: 'blur'},
                        {min: 5, max: 5, message: this.$t('label.BASF10110FORMVIEW_LENGTHFIVE'), trigger: 'blur'},
                        {validator: valu2Check, trigger: 'blur'}

                    ]
                },
                rules2:{
                    datavalue2:[
                        {required: false, message: this.$t('normal.error_08')+"CODE", trigger: 'blur'},
                        {min: 5, max: 5, message: this.$t('label.BASF10110FORMVIEW_LENGTHFIVE'), trigger: 'blur'},
                        {validator: valu2Check, trigger: 'blur'}
                    ]
                }


            };
        },
        mounted() {
            this.loading = true;
            //设置显示模式
            this.pigeType = this.$route.params.type;
            //设置标题
            this.title = this.$route.params.type == 'view' ? this.$t("button.view")+this.$t("menu.BASF10110"): this.$route.params.type == 'insert' ? this.$t("button.insert")+this.$t("menu.BASF10110") : this.$t("button.update")+this.$t("menu.BASF10110") ;
            //获取大字典CODE
            this.bigCode = this.$route.params._id;
            //根据传来的主键获取数据
            if (this.$route.params.type != 'insert') {
                if (this.$route.params._id) {
                    this.getselectById(this.$route.params._id);
                }
            } else {
                if (this.$route.params._id) {
                    this.getselectById(this.$route.params._id, "insert");
                }
            }
            this.loading = false;
        },
        created() {
            this.readOnly = this.$route.params.readOnly;
            //如果为查看模式
            if (this.readOnly == true) {
                this.buttonList = [];
            }
        },
        methods: {
            //查询字典大分类中的小分类
            getselectById(id, type) {
                this.$store
                    .dispatch('PFANS8009Store/smallAtbig', id)
                    .then(response => {
                        response.map(item => {
                            item.code = item.code.substring(item.code.length - 3, item.code.length);
                        });
                        if (type == 'insert')
                            this.dataCheck = response;
                        else
                            this.formData.data = response;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                        });
                    });
            },
            //数据新增(带表单验证)
            addCode(code, value1, value2) {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.formData.data.unshift({
                            code: code,
                            value1: value1,
                            value2: value2,
                            pcode: this.bigCode
                        });
                        this.upData.unshift({
                            code: this.bigCode + code,
                            value1: value1,
                            value2: (value2 == '' ? null : value2),
                            pcode: this.bigCode
                        });
                    } else {
                        return false;
                    }
                });
            },
            //数据删除
            deleteCode(index, f) {
                //新建模式下的操作
                if (this.pigeType == 'insert') {
                    this.formData.data.splice(index, 1);
                    this.upData.splice(index, 1);
                }
                //编辑模式模式下的操作
                if (this.pigeType == 'update') {
                    f.code = this.bigCode + f.code;
                    this.delData.push(f);
                    console.log(this.delData);
                    this.formData.data.splice(index, 1);
                }

            },
            //大code的添加
            addbidcode() {
                this.upData = this.formData.data;
                for (var i = 0; i < this.upData.length; i++) {
                    this.upData[i].code = this.bigCode + this.upData[i].code;
                }
                return this.upData;
            },
            //按钮们的处理
            buttonClick(val) {
                if (val === "save") {
                    if (this.pigeType == 'insert') {
                        this.$refs['formData'].validate((valid) => {
                            if (valid) {
                                if (this)
                                    if (this.upData != null) {
                                        this.$store
                                            .dispatch("PFANS8009Store/insertCodes", this.upData)
                                            .then(response => {
                                                Message({
                                                    message: this.$t("normal.success_03"),
                                                    type: "success"
                                                });
                                                this.loading = false;
                                                if (this.$store.getters.historyUrl) {
                                                    this.$router.push(this.$store.getters.historyUrl);
                                                }
                                            })
                                            .catch(error => {
                                                Message({
                                                    message: error,
                                                    type: "error",
                                                    duration: 5 * 1000
                                                });
                                                this.loading = false;
                                            });
                                    } else {
                                        Message({
                                            message: error,
                                            type: "error",
                                            duration: 5 * 1000
                                        });
                                    }
                            }
                            else {
                                return false;
                            }
                        });
                    }
                    if (this.pigeType == 'update') {
                        if (this)
                            if (this.formData.data != null) {
                                //删除处理
                                if (this.delData.length != 0) {
                                    this.$store
                                        .dispatch("PFANS8009Store/deleteCodes", this.delData)
                                        .then(response => {
                                            Message({
                                                message: this.$t("normal.success_03"),
                                                type: "success"
                                            });
                                        })
                                        .catch(error => {
                                            Message({
                                                message: error,
                                                type: "error",
                                                duration: 5 * 1000
                                            });
                                        });
                                }
                                //更新处理
                                this.$refs['formData'].validate((valid) => {
                                    if (valid) {
                                        this.$store
                                            .dispatch("PFANS8009Store/updataCodes", this.addbidcode())
                                            .then(response => {
                                                Message({
                                                    message: this.$t("normal.success_03"),
                                                    type: "success"
                                                });
                                                this.loading = false;
                                                if (this.$store.getters.historyUrl) {
                                                    this.$router.push(this.$store.getters.historyUrl);
                                                }
                                            })
                                            .catch(error => {
                                                Message({
                                                    message: error,
                                                    type: "error",
                                                    duration: 5 * 1000
                                                });
                                                this.loading = false;
                                            });
                                    }
                                    else {
                                        return false;
                                    }
                                });
                            } else {
                                Message({
                                    message: error,
                                    type: "error",
                                    duration: 5 * 1000
                                });
                            }

                    }

                }


            }
        }

    }
</script>

<style scoped>

</style>
