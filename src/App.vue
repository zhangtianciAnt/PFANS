<template>
  <div class="theme_panasonic" @mousedown="mousedown($event)">
    <transition name="el-fade-in">
    <router-view style="font-family: 'Helvetica Neue', 'Arial'"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    document.onkeydown = function(event) {
      debugger
      var e = event || window.event || arguments.callee.caller.arguments[0];

      if (e && e.keyCode == 123) {
        alert("不要看我，我会害羞！~");
        e.returnValue = false;
        return (false);
      }
    },
    document.onkeyup = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];

      if (e && e.keyCode == 123) {
        alert("不要看我，我会害羞！~");
        e.returnValue = false;
        return (false);
      }
    },
    document.onkeypress = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];

      if (e && e.keyCode == 123) {
        alert("不要看我，我会害羞！~");
        e.returnValue = false;
        return (false);
      }
    }
  },
  methods: {
    mousedown :function mdClick(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e.button == 2 || e.button == 3) {
        this.mAlert();
      }
    },

    mAlert() {

      alert("不要看我，我会害羞！~");
    }
  }
}
</script>
<style>
  #nprogress .bar {
    background: #81b2ec !important;
  }
</style>
