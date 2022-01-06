<template>
  <div :style="{height:avatarHeight,width:avatarWidth,cursor:'pointer'}" class="easy_avatar" @click="redirect">
    <div class="avatar_image">
      <img :src="avatarImage" alt="avatar" style="width:90%">
    </div>
    <div class="avatar_dep">
      {{ avatarDep }}
    </div>
    <div class="avatar_name">
      {{ avatarName === '' ? $store.getters.name : avatarName }}
    </div>
  </div>
</template>

<script>
import basselogo from '@/assets/svg/user.svg';

export default {
  name: 'Avatar',
  components: {},
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$store.commit('global/SET_HISTORYURL', '/index');
      this.$router.push(this.mainPage);
      this.$emit('changeMenu');
    },
  },
  props: {
    avatarImage: {
      type: String,
      default: basselogo,
    },
    avatarName: {
      type: String,
      default: '',
    },
    avatarDep: {
      type: String,
      default: '',
    },
    avatarHeight: {
      type: String,
      default: '90%',
    },
    avatarWidth: {
      type: String,
      default: '100%',
    },
    mainPage: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #fff;
.easy_avatar {
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  // border-bottom: solid 2px #e6e6e6;
  .avatar_image {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 1 / 3;
    padding-left: 8px;
    justify-self: center;
    align-self: center;
  }

  .avatar_name {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 2;
    font-size: 12px;
    text-align: left;
    justify-self: center;
    align-self: start;
    color: white;
  }

  .avatar_dep {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row: 1;
    font-size: 14px;
    text-align: left;
    justify-self: center;
    align-self: end;
    color: white;
    font-weight: bold;
  }
}
</style>

