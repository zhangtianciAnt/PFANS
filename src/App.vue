<template>
  <div class="theme_panasonic">
    <transition name="el-fade-in">
      <router-view style="font-family: 'Helvetica Neue', 'Arial'"/>
    </transition>
  </div>
</template>

<script>

  import {Message} from 'element-ui';

  export default {
    name: 'App',
    created() {
      document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];

        if (e && e.keyCode == 123) {
          Message({
            message: '👀~再看就把你吃掉~'
          });
          e.returnValue = false;
          return (false);
        }
      },
        document.onkeyup = function (event) {
          var e = event || window.event || arguments.callee.caller.arguments[0];

          if (e && e.keyCode == 123) {
            e.returnValue = false;
            return (false);
          }
        },
        document.onkeypress = function (event) {
          var e = event || window.event || arguments.callee.caller.arguments[0];

          if (e && e.keyCode == 123) {
            Message({
              message: '👀~再看就把你吃掉~'
            });
            e.returnValue = false;
            return (false);
          }
        },
        document.oncontextmenu = function (event) {
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if (e.button == 2 || e.button == 3) {
            Message({
              message: '👀~再看就把你吃掉~'
            });
            e.returnValue = false;
            return (false);
          }
        }
    }
  }
</script>
<style>
  #nprogress .bar {
    background: #81b2ec !important;
  }
</style>
