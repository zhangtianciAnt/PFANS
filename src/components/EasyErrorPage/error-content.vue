<template>
  <div class="EasyNormalTable" element-loading-spinner="el-icon-loading" style="height: calc(100vh - 60px - 2rem)">
    <el-card class="box-card">
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code" style="width: 100%;height: calc(100vh - 60px - 5rem)">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
    </div>
  </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'error_content',
    components: {
    },
    props: {
      code: String,
      desc: String,
      src: String
    }
  }
</script>
<style type="less">
  .error-page{
    width: 100%;
    height: calc(100vh - 60px - 5rem);
    position: relative;
    background: #f8f8f9;
    .content-con{
      width: 100%;
      height: calc(100vh - 60px - 5rem);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      img{
        display: block;
        width: 100%;
        height: calc(100vh - 60px - 5rem);
      }
      .text-con{
        position: absolute;
        left: 0px;
        top: 0px;
        h4{
          position: absolute;
          left: 0px;
          top: 0px;
          font-size: 80px;
          font-weight: 700;
          color: #348EED;
        }
        h5{
          position: absolute;
          width: 700px;
          left: 0px;
          top: 100px;
          font-size: 20px;
          font-weight: 700;
          color: #67647D;
        }
      }
      .back-btn-group{
        position: absolute;
        right: 0px;
        bottom: 20px;
      }
    }
  }

</style>
