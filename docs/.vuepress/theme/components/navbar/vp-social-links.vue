<script setup>
import GitHubIcon from '~icons/ri/github-fill';
import ZhihuLineIcon from '~icons/ri/zhihu-line';
import WeiBoIcon from '~icons/ri/weibo-fill';
import JueJinIcon from '~icons/ci/chevron-duo-down';

const useSocialLinks = () => {
  return [
    {
      link: 'https://juejin.cn/pins',
      icon: JueJinIcon,
      text: '掘金',
    },
    {
      link: 'https://weibo.com/u/5963931367/home?wvr=5',
      icon: WeiBoIcon,
      text: '微博',
    },
    {
      link: 'https://www.zhihu.com/hot',
      icon: ZhihuLineIcon,
      text: '知乎',
    },
    {
      link: 'https://github.com',
      icon: GitHubIcon,
      text: 'GitHub',
    },
  ]
}
const links = useSocialLinks()
</script>

<template>
  <div class="social-links">
    <vp-social-link v-for="link in links" :key="link.text" v-bind="link" />
  </div>
</template>

<style scoped lang="scss">
.social-links {
  height: 24px;
  padding: 0 12px;
}
</style>
