<template>
  <div style="float: left">
      <el-button v-for="item  in buttonData" :key="item.key"
                 :icon="item.icon"
                 :disabled="disabledfunc(item)"
                 @click="buttonClick(item.key)" size="mini" type="primary" plain>{{$t(item.name)}}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        buttonData: []
      };
    },
    //注入缓存修改 20210317 ztc start
    inject:['reload'],
    //注入缓存修改 20210317 ztc end
    props: {
      data: {
        type: Array,
        default: function () {
          return [
            {"key": "new", "name": 'button.insert', "disabled": false, "icon": "el-icon-plus"},
            {"key": "update", "name": 'button.update', "disabled": false, "icon": "el-icon-edit"},
            {"key": "delete", "name": 'button.delete', "disabled": false, "icon": "el-icon-delete"}
          ];
        }
      },
      systembutton:{
        type:Array,
        default: function () {
          return [];
        }
      }
    },
    methods: {
      buttonClick(key) {
        //注入缓存修改 20210317 ztc start
        if(key == 'reload'){
          this.reload();
        }else if("new" === key) {
          this.$store.commit("global/SET_HISTORYURL", this.$route.path);
        }
        this.$emit("buttonClick", key);
        //注入缓存修改 20210317 ztc end
      },
      disabledfunc(item){
        if(item.key === "new"){
          return this.systembutton[0] || item.disabled ;
        }else  if(item.key === "update"){
          return this.systembutton[1] || item.disabled;
        }else  if(item.key === "delete"){
          return this.systembutton[2] || item.disabled;
        }else{
          return item.disabled;
        }
      }
    },
    mounted() {
      this.buttonData = this.data;
    },
    watch: {
      data(val) {
        this.buttonData = val;
      }
    }
  }
</script>

<style scoped>

</style>
