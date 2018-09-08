<template>
  <div class="temple-list-wrapper">
    <lm-search></lm-search>
    <lm-temple-list></lm-temple-list>
  </div>
</template>
<script>
import { LmSearch, LmTempleList } from '../components'
export default {
  name: 'TempleList',
  components: {
    LmSearch,
    LmTempleList
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>
<style lang="less">
</style>
<style rel="stylesheet/less" lang="less" scoped>
</style>