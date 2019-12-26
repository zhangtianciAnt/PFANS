<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title"
                         ref="container" style="min-height: 100%">
      <div slot="customize">
        <el-form :model="form" label-position="left" label-width="8rem" ref="ruleForm"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.ASSETS1003VIEW_FILEADDRESS')" prop="fileaddress">
                <el-input v-model="form.fileaddress" @change="getAddre"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="center">
              <div id="qrcode"></div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import QRCode from 'qrcodejs2';
  import {getToken} from '@/utils/auth'

  export default {
    name: 'ASSETS1003View',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        loading: false,
        title: 'title.ASSETS1003VIEW',
        buttonList: [],
        form: {
          fileaddress: '',
        },
        qrcodeC: '',
      };
    },
    mounted() {
    },
    created() {
    },
    methods: {
      getAddre() {
        debugger;
        console.log({'x-auth-token': getToken()});
        document.getElementById('qrcode').innerHTML = '';
        this.qrcodeC = new QRCode('qrcode', {
          width: 132,
          height: 132,
          text: this.form.fileaddress +";"+ getToken() ,
          colorDark: '#000',
          colorLight: '#fff',
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #qrcode {
    display: inline-block;
    img {
      width: 132px;
      height: 132px;
      background-color: #fff;
      padding: 6px;
    }
  }
</style>
