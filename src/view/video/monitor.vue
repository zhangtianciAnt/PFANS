<template>
  <div>
    <player @onPlayerPlay="onPlayerPlay"></player>
  </div>
</template>

<script>
  import player from './player.vue'
  export default {
    name: 'monitor',
    components: {
      player
    },
    data(){
      return{
        client:{}
      }
    },
    mounted(){
      var AipFaceClient = require("baidu-aip-sdk").face;

      var APP_ID = "15803618";
      var API_KEY = "nb2MrGnjcixsONmnjTz4P325";
      var SECRET_KEY = "rEKXaxVDvouhQqeqI6ejcsOrNlUOt8nj";

      this.client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
    },
    methods :{
      detectFace(image){
        var imageType = "BASE64";

        var options = {};
        options["face_field"] = "age";
        options["max_face_num"] = "2";
        options["face_type"] = "LIVE";

        this.client.detect(image, imageType, options).then(function(result) {
          console.log(JSON.stringify(result));
        }).catch(function(err) {
          // 如果发生网络错误
          console.log(err);
        });
      },
      onPlayerPlay(player){
      }
    }
  }
</script>

<style scoped>

</style>
