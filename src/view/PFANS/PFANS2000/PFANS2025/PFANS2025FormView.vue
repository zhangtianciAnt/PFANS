<template>
  <EasyNormalContainer
    :title="titles"
    ref="container"
    :buttonList="buttonList"
    @buttonClick="buttonClick"
  >

  </EasyNormalContainer>
</template>

<script>
import EasyNormalContainer from "@/components/EasyNormalContainer";
import { debug } from "util";
import dicselect from "../../../components/dicselect";
import user from "../../../components/user"
export default {
  name: "PFANS2025FormView",
  components: { EasyNormalContainer, dicselect,user },

  data() {
    return {
      titles: "人员信息",
      activeName: "second",
      form: {
        userid:"",
        informationid: "",
        title: "",
        address: "",
        availablestate: "0"
      },
      options: [
        { value: "选项1", label: "男" },
        {
          value: "选项2",
          label: "女"
        }
      ],


      disable: false,
      buttonList: []
    };
  },

  created() {
  },
  methods: {
    change: val => {
      console.log(val);
    },
    getUserids:userid => {
      this.form.userid = userid;
    }
  }
};
</script>

<style scoped>
.width {
  width: 12rem;
}

</style>
