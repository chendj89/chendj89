<script setup>
import { ref, computed, getCurrentInstance, onMounted } from "vue";
import { getRoute } from "@docs/.vuepress/utils/route";
let ins = getCurrentInstance();
let menu = ref([]);
onMounted(() => {
  menu.value = getRoute(ins);
});
const isActive = (item) => {
  let $route = ins.proxy.$route;
  let path = $route.path;
  let active = false;
  item.children.map((cell) => {
    if (cell.link == path) {
      active = true;
    }
  });
  return active;
};
function pushRoute(item) {
  ins.proxy.$router.push(decodeURI(item.children[0].link));
}
</script>

<template>
  <div class="navbar-wrapper">
    <div class="header-container">
      <div class="logo-container">
        <router-link :to="'/'">
          <div class="site-name">{{ ins.proxy.$siteTitle }}</div>
        </router-link>
      </div>
      <div class="content">
        <nav class="navbar-menu menu">
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="link link-item is-menu-link"
            :class="{ active: isActive(item) }"
            @click="pushRoute(item)"
          >
            {{ item.text }}
          </div>
        </nav>
        <vp-social-links class="social-links" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);

  > a {
    width: 128px;
  }

  .logo {
    position: relative;
    height: 100%;
  }
}

.is-menu-link {
  display: block;
  padding: 0 12px;
  line-height: calc(var(--nav-height) - 3px);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  transition: color var(--el-transition-duration);
  border-bottom: 2px solid transparent;
  cursor: pointer;

  &.active {
    border-bottom-color: var(--brand-color);
  }

  &:hover {
    color: var(--brand-color);
  }
}
</style>
