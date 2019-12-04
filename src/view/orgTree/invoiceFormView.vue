<template>
  <div>
    <EasyNormalContainer :title="type==='1'?'创建开票信息':'编辑开票信息'" ref="container">
      <div slot="customize">
        <el-form :model="invoiceform" status-icon ref="invoiceform" label-width="8rem" style="width:80%;margin:5% auto" class="demo-ruleForm" v-loading="invoiceformloading">
          <el-form-item label="公司名称" prop="companyname">
            <span>{{currentNode.companyname}}</span>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="dutynumber" :rules="[
              { required: true, message: '请输入纳税人识别号', trigger: 'blur' },
              { validator: dutynumberCheck, trigger: 'blur'}]">
            <el-input v-model="invoiceform.dutynumber" auto-complete="off" placeholder="纳税人识别号"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="bankbranch" :rules="[
              { required: true, message: '请输入开户行', trigger: 'blur' }]">
            <el-input v-model="invoiceform.bankbranch" auto-complete="off" placeholder="开户行"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="banknumber" :rules="[
              { required: true, message: '请输入银行账号', trigger: 'blur' },
               { validator: dutynumberCheck, trigger: 'blur'}]">
            <el-input v-model="invoiceform.banknumber" auto-complete="off" placeholder="银行账号"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="companyaddress" :rules="[
              { required: true, message: '请输入地址', trigger: 'blur' }]">
            <el-input v-model="invoiceform.companyaddress" auto-complete="off" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone" :rules="[
              { required: true, message: '请输入电话', trigger: 'blur' },
              { validator: dutynumberCheck, trigger: 'blur'}]">
            <el-input v-model="invoiceform.phone" auto-complete="off" placeholder="电话"></el-input>
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
      invoiceform: this.$route.params.invoice,
      invoiceformloading: false,
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
          this.insertInvoice();
        } else {
          return false;
        }
      });
    },
    insertInvoice() {
      this.invoiceformloading = true;
      if (!this.currentNode.invoiceinfo) {
        this.$set(this.currentNode, 'invoiceinfo', {});
      }
      if (this.type === '1') {
        this.invoiceform._id = getUUID(36, 16);
      }
      this.currentNode.invoiceinfo = this.invoiceform;
      let data = this.orgTree.data;
      this.$store
        .dispatch("orgTreeStore/saveTree", data[0])
        .then(() => {
          this.invoiceformloading = false;
          this.$refs.container.buttonClick("back");
        })
        .catch(() => {
          this.invoiceformloading = false;
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
        this.submitForm('invoiceform');
      } else {
        this.cancelForm();
      }
    },
  }
};
</script>
<style lang='scss'>
</style>

