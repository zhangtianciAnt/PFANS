<template>
  <div>
    <EasyNormalContainer :title="type==='1'?'添加银行帐户':'编辑银行帐户'" ref="container">
      <div slot="customize">
        <el-form :model="bankform" status-icon ref="bankform" label-width="8rem" style="width:80%;margin:5% auto" class="demo-ruleForm" v-loading="bankformloading">
          <el-form-item label="公司名称">
            <span>{{currentNode.companyname}}</span>
          </el-form-item>
          <el-form-item label="银行名称" prop="bankname" :rules="[
              { required: true, message: '请输入银行名称', trigger: 'blur' }]">
            <el-input v-model="bankform.bankname" auto-complete="off" placeholder="银行名称"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="bankbranch" :rules="[
              { required: true, message: '请输入开户行', trigger: 'blur' }]">
            <el-input v-model="bankform.bankbranch" auto-complete="off" placeholder="开户行"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="banknumber" :rules="[
              { required: true, message: '请输入银行账号', trigger: 'blur' },
              { validator: dutynumberCheck, trigger: 'blur'}]">
            <el-input v-model="bankform.banknumber" auto-complete="off" placeholder="银行账号"></el-input>
          </el-form-item>
          <el-form-item>
            <easy-button-bar @buttonClick="buttonClick" :data="buttonList"></easy-button-bar>
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
      bankform: this.$route.params.bank,
      bankformloading: false,
      buttonList: [
        { key: 'btnSave', name: '保存' },
        { key: 'btnCancel', name: '取消' }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.insertBank();
        } else {
          return false;
        }
      });
    },
    insertBank() {
      this.bankformloading = true;
      if (this.type === '1') {
        if (!this.currentNode.bankinfo) {
          this.$set(this.currentNode, 'bankinfo', []);
        }
        this.bankform._id = getUUID(36, 16);
        this.currentNode.bankinfo.push(this.bankform);
      }
      let data = this.orgTree.data;

      this.$store
        .dispatch("orgTreeStore/saveTree", data[0])
        .then(() => {
          this.bankformloading = false;
          this.$refs.container.buttonClick("back");
        })
        .catch(() => {
          this.bankformloading = false;
        });
    },
    dutynumberCheck(rule, value, callback) {
      if (validateNumber(value)) {
        callback()
      } else {
        callback(new Error('只可以输入数字！'))
      }
    },
    cancelForm() {
      this.$refs.container.buttonClick("back");
    },
    buttonClick (val) {
      if (val === 'btnSave') {
        this.submitForm('bankform');
      } else {
        this.cancelForm();
      }
    },
  }
};
</script>
<style lang='scss'>
</style>

