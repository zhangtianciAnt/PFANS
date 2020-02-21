<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :title="type==='1'?$t('button.newCom'):$t('button.newDep')"
                         @buttonClick="buttonClick" ref="container">
      <div slot="customize">
        <el-form :model="companyform" class="demo-ruleForm" label-width="8vw"
                 ref="companyform" status-icon style="width:80%;margin:5% auto" label-position="top"
                 v-show="type === '1'">
          <el-form-item :rules="[
              { required: true, message: '请输入名称', trigger: 'blur' }]" label="名称" prop="companyname">
            <el-input auto-complete="off" placeholder="" v-model="companyform.companyname" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item :rules="[
              { required: true, message: '请输司简称', trigger: 'blur' }]" label="简称" prop="companyshortname">
            <el-input auto-complete="off" placeholder="" v-model="companyform.companyshortname" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item :rules="[
              { required: true, message: '请输入英文缩写', trigger: 'blur' },
              { validator: engnameCheck, trigger: 'blur' }]" label="英文缩写" prop="companyen">
            <el-input auto-complete="off" placeholder="" v-model="companyform.companyen" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item label="组织番号">
            <el-input auto-complete="off" placeholder="" v-model="companyform.orgname" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item label="上级组织" prop="upcompany">
            <span>{{currentNode.companyshortname}}</span>
          </el-form-item>
          <el-form-item label="组织负责人" prop="user">
            <user selectType="Single" @getUserids="getUserids"  style="width:20vw" :userlist="userlist"></user>
          </el-form-item>
        </el-form>

        <el-form :model="companyform" class="demo-ruleForm" label-width="8vw"
                 ref="depform" status-icon style="width:80%;margin:5% auto" label-position="top"
                 v-show="type !== '1'">
          <el-form-item :rules="[
              { required: true, message: '请输入名称', trigger: 'blur' }]" label="名称" prop="departmentname">
            <el-input auto-complete="off" placeholder="部门名称" v-model="companyform.departmentname" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item :rules="[
               { required: true, message: '请输入英文缩写', trigger: 'blur' },
               { validator: engnameCheck, trigger: 'blur' }]" label="英文缩写" prop="companyen">
            <el-input auto-complete="off" placeholder="英文缩写" v-model="companyform.companyen" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item label="组织番号" v-show="type === '2'">
            <el-input auto-complete="off" placeholder="" v-model="companyform.orgname" style="width:20vw"></el-input>
          </el-form-item>
          <el-form-item label="上级组织" prop="upcompany">
            <span>{{upcompany}}</span>
          </el-form-item>
          <el-form-item label="组织负责人" prop="user">
            <user selectType="Single" @getUserids="getUserids"  style="width:20vw" :userlist="userlist"></user>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status"
          >
            <el-switch
              :width="50"
              active-color="#13ce66"
              active-value="0"
              inactive-color="#ff4949"
              inactive-value="1"
              v-model="companyform.status">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import EasyButtonBar from '@/components/EasyButtonBar';
  import {validatAlphabets, validateNumber} from '@/utils/validate';
  import {getUUID} from '@/utils/customize';
  import user from "../components/user.vue";

  export default {
    name: "orgTreeFormView",
    components: {
      EasyNormalContainer,
      EasyButtonBar,
      user
    },
    data() {
      return {
        userlist:"",
        type: this.$route.params.type,
        currentNode: this.$route.params.currentNode,
        orgTree: this.$route.params.orgTree,
        companyform: {
          _id: getUUID(36, 16),
          status: '0'
        },
        upcompany: this.$route.params.currentNode.type === '1' ?
          this.$route.params.currentNode.companyshortname :
          this.$route.params.currentNode.departmentname,
        buttonList: [
          {key: 'btnSave', name: 'button.confirm'}
        ]
      };
    },
    methods: {
      getUserids(val){
        this.companyform.user = val;
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.insertOrg(formName);
          } else {
            return false;
          }
        });
      },
      insertOrg(formName) {
        this.$emit('changeLoading', true);
        this.companyform.type = this.type;
        this.companyform.title = formName === "companyform" ? this.companyform.companyshortname : this.companyform.departmentname;
        this.companyform.upcompany = this.upcompany;
        if (!this.currentNode.orgs) {
          this.$set(this.currentNode, 'orgs', []);
        }
        this.currentNode.orgs.push(this.companyform);
        let data = this.orgTree.data;
        if (data.length === 0) {
          data = this.currentNode.orgs;
        }

        this.$store
          .dispatch("orgTreeStore/saveTree", data[0])
          .then(() => {
            this.$emit('changeLoading', false);
            this.$refs.container.buttonClick("back");
          })
          .catch((error) => {
            this.$emit('changeLoading', false);
          });
      },
      engnameCheck(rule, value, callback) {
        if (validatAlphabets(value)) {
          callback();
        } else {
          callback(new Error("只可以输入英文字符!"));
        }
      },
      cancelForm() {
        this.$refs.container.buttonClick("back");
      },
      // 保存
      buttonClick(val) {
        if (val === 'btnSave') {
          if (this.type === '1') {
            this.submitForm('companyform');
          } else {
            this.submitForm('depform');
          }
        } else {
          this.cancelForm();
        }
      }
    }
  };
</script>
<style lang='scss'>
</style>
