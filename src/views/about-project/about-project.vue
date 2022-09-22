<template>
  <div class="about-project">
    <n-card title="接口文档" hoverable>
      <a
        href="https://www.apifox.cn/apidoc/shared-5d89b045-0ad0-4911-9793-44e49eab39f3"
        target="_blank"
        >接口文档:
        https://www.apifox.cn/apidoc/shared-5d89b045-0ad0-4911-9793-44e49eab39f3</a
      >
    </n-card>
    <n-card title="生产依赖" hoverable>
      <HFTable :dataList="dependencies" />
    </n-card>
    <n-card class="dev" title="开发依赖" hoverable>
      <HFTable :dataList="devDependencies" />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import HFTable from '@/common/hf-table'
import packageJson from '../../../package.json'
// 生产依赖
const dependencies = packageJson.dependencies

// 开发时依赖
const devDependencies = packageJson.devDependencies
</script>

<style lang="less" scoped>
.about-project {
  padding: 20px;
  .dev {
    margin-top: 20px;
  }
}
</style>
