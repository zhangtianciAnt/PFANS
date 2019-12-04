<template>
  <div>
    <el-form :model="signIn" ref="workorder" label-width="13rem" style="width:80%;margin:5% auto" >

      <el-form-item label="培训课程" prop="class" >
        <el-input v-model="signIn.classname"></el-input>
      </el-form-item>
      <el-form-item label="培训主题" prop="theme" >
        <el-input v-model="signIn.theme"></el-input>
      </el-form-item>
      <el-form-item label="组织方" prop="zuzhi" >
        <el-input v-model="signIn.zuzhi"></el-input>
      </el-form-item>
      <el-form-item label="培训地点" prop="place" >
        <el-input v-model="signIn.place"></el-input>
      </el-form-item>
      <el-form-item label="学时" prop="long" >
        <el-input v-model="signIn.time"></el-input>
      </el-form-item>
      <el-form-item label="讲师" prop="people" >
        <el-input v-model="signIn.people"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  export default {
    name: 'signIn',
    data () {
      return{
        signIn:{
          classname:"",
          theme:"",
          zuzhi:"",
          place:"",
          time:"",
          people:"",
        },
      }
    },
    methods: {
      onSubmit(){
        this.$store
          .dispatch("signInStore/exportExcel", this.signIn)
          .then(response => {
            this.download(response)
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 2 * 1000
            })
          });
      },
      download (data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '培训记录登记.xls')

        document.body.appendChild(link)
        link.click()
      }
    }
  }
</script>

<style scoped>

</style>
