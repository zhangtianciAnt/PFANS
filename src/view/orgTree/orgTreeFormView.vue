<template>
  <div>
    <EasyNormalContainer :title="type==='1'?$t('button.newCom'):$t('button.newDep')" ref="container" @buttonClick="buttonClick" :buttonList="buttonList">
      <div slot="customize">
        <el-form :model="companyform" status-icon ref="companyform"
               label-width="8rem" style="width:80%;margin:5% auto" class="demo-ruleForm"
               v-show="type === '1'">
          <el-form-item label="公司名称" prop="companyname" :rules="[
              { required: true, message: '请输入公司名称', trigger: 'blur' }]">
            <el-input v-model="companyform.companyname" auto-complete="off" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="公司简称" prop="companyshortname" :rules="[
              { required: true, message: '请输入公司简称', trigger: 'blur' }]">
            <el-input v-model="companyform.companyshortname" auto-complete="off" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="英文缩写" prop="companyen" :rules="[
              { required: true, message: '请输入英文缩写', trigger: 'blur' },
              { validator: engnameCheck, trigger: 'blur' }]">
            <el-input v-model="companyform.companyen" auto-complete="off" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="上级公司" prop="upcompany">
            <span>{{currentNode.companyshortname}}</span>
          </el-form-item>
        </el-form>

        <el-form :model="companyform" status-icon ref="depform"
               label-width="8rem" style="width:80%;margin:5% auto" class="demo-ruleForm"
               v-show="type !== '1'">
          <el-form-item label="部门名称" prop="departmentname" :rules="[
              { required: true, message: '请输入部门名称', trigger: 'blur' }]">
            <el-input v-model="companyform.departmentname" auto-complete="off" placeholder="部门名称"></el-input>
          </el-form-item>
          <el-form-item label="上级组织" prop="upcompany">
            <span>{{upcompany}}</span>
          </el-form-item>
          <el-form-item
                prop="status"
                label="状态"
            >
                <el-switch
                  v-model="companyform.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="0"
                  inactive-value = "1"
                  :width="50">
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
import { validatAlphabets, validateNumber } from '@/utils/validate';
import { getUUID } from '@/utils/customize';
export default {
  name: "orgTreeFormView",
  components: {
    EasyNormalContainer,
    EasyButtonBar
  },
  data() {
    return {
      type: this.$route.params.type,
      currentNode: this.$route.params.currentNode,
      orgTree: this.$route.params.orgTree,
      companyform: {
        _id: getUUID(36, 16),
        status: '0'
      },
      upcompany: this.$route.params.currentNode.type==='1' ?
                  this.$route.params.currentNode.companyshortname :
                   this.$route.params.currentNode.departmentname,
      buttonList: [
        { key: 'btnSave', name: 'button.confirm' }
      ]
    };
  },
  methods: {
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
      this.$emit('changeLoading',true);
      this.companyform.type = this.type;
      this.companyform.title = formName === "companyform" ? this.companyform.companyshortname : this.companyform.departmentname;
      this.companyform.upcompany = this.upcompany;
      if (!this.currentNode.orgs) {
        this.$set(this.currentNode, 'orgs', []);
      }
      this.currentNode.orgs.push(this.companyform);
      let data = this.orgTree.data;
      if(data.length === 0){
        data = this.currentNode.orgs;
      }

      this.$store
        .dispatch("orgTreeStore/saveTree", data[0])
        .then(() => {
          this.$emit('changeLoading',false);
          this.$refs.container.buttonClick("back");
        })
        .catch((error) => {
          this.$emit('changeLoading',false);
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
    buttonClick (val) {
      if (val === 'btnSave') {
        if(this.type === '1') {
          this.submitForm('companyform');
        }else {
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
