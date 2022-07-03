<template>
  <div>
    <p class="sm" v-html="decodedDescription" />
    <div class="example">
      <div class="example-showcase">
        <component :is="props.path" v-bind="$attrs" :key="props.path" />
      </div>
      <ElDivider class="m-0" />
      <div class="op-btns">
        <el-tooltip :content="'在 Playground 中编辑'" placement="top">
          <div class="op-btn">
            <el-icon>
              <i-ri-flask-line />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip :content="'在 GitHub 中编辑'" placement="top">
          <div class="op-btn">
            <el-icon>
              <i-ri-github-line />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip :content="'复制代码'" placement="top">
          <div class="op-btn" @click="copyCode">
            <el-icon>
              <i-ri-file-copy-line />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip :content="'查看源代码'" placement="top">
          <div class="op-btn" @click="toggleSourceVisible()">
            <el-icon>
              <i-ri-code-line />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <ElCollapseTransition>
        <vp-source-code v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
          <el-icon :size="16">
            <i-ep-caret-top />
          </el-icon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import IRiGithubLine from '~icons/ri/github-line';
import IRiCodeLine from '~icons/ri/code-line';
import IRiFileCopyLine from '~icons/ri/file-copy-line';
import IRiFlaskLine from '~icons/ri/flask-line';
import IEpCaretTop from "~icons/ep/caret-top";
import IEpSearch from "~icons/ep/search";
const props = defineProps({
  source: String,
  path: String,
  description: String
});

const decodedDescription = computed(() =>
  decodeURIComponent(props.description || '')
)

const copyCode = () => {

}
let sourceVisible = ref(false);
function toggleSourceVisible(value) {
  if (value == undefined) {
    sourceVisible.value = !sourceVisible.value;
  } else {
    sourceVisible.value = value;
  }

}

let elto = ref(false);
onMounted(() => {
  elto.value = true;
})

</script>


<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;
      vertical-align: middle;
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
