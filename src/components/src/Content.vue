<template>
  <div :class="['van-doc-content', `van-doc-content--${currentPage}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'van-doc-content',
  computed: {
    currentPage() {
      const { path } = this.$route;
      if (path) {
        return path.split('/').slice(-1)[0];
      }
      return this.$route.name;
    }
  }
};
</script>

<style lang="less">
@import '~@/assets/style/variable.less';
.van-doc-content {
  flex: 1;
  position: relative;
  padding: 0 0 4.6875rem;
  a {
    color: @van-doc-blue;
  }
  section {
    padding: .625rem @van-doc-padding;
    overflow: hidden;
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      line-height: 1.5;
      font-weight: normal;
      margin: 1.25rem 0 .625rem;
      color: @van-doc-black;
    }
    > h1 {
      font-size: 2.25rem;
    }
    > h2 {
      font-size: 1.875rem;
      margin-bottom: 1.5625rem;
    }
    > h3 {
      font-size: 1.375rem;
      margin-top: 2.8125rem;
    }
    > h2 + h3 {
      margin-top: 1.5625rem;
    }
    > h4 {
      font-size: 1rem;
      margin-bottom: .9375rem;
    }
    > h5 {
      font-size: .875rem
    }
    > h6 {
      font-size: .875rem;
      color: @van-doc-dark-grey;
    }
    > p {
      margin: .9375rem 0;
      font-size: .875rem;
      line-height: 1.625rem;
      color: @van-doc-text-color;
    }
    > ul,
    > ol {
      padding: .9375rem 0;
      background-color: #f5f7fa;
    }
    > ul li,
    > ol li {
      color: @van-doc-text-color;
      font-size: .875rem;
      line-height: 1.375rem;
      margin: .3125rem 0 .3125rem 1.25rem;
      padding-left: .9375rem;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: .375rem;
        height: .375rem;
        margin-top: .5rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: .0625rem solid @van-doc-dark-grey;
      }
      li {
        margin-left: 0;
      }
    }
    > hr {
      border: 0rem none;
      border-top: .0625rem solid #eee;
    }
    p > code,
    li > code,
    table code {
      margin: .125rem;
      padding: .125rem .4375rem;
      display: inline;
    }
  }
  blockquote {
    padding: 1rem;
    margin: 1.25rem 0;
    font-size: .875rem;
    border-radius: .25rem;
    background-color: #ecf9ff;
    color: rgba(52, 73, 94, .8);
    border-left: .3125rem solid #50bfff;
  }
  table {
    width: 100%;
    font-size: .8125rem;
    line-height: 1.5;
    margin-bottom: 2.8125rem;
    background-color: #fff;
    border-collapse: collapse;
    color: @van-doc-text-color;
    th {
      padding: .5rem .625rem;
      text-align: left;
      font-weight: normal;
      background-color: #f5f7fa;
      border: .0625rem solid @van-doc-border-color;
      &:first-child {
        padding-left: .625rem;
      }
    }
    td {
      padding: .5rem;
      border: .0625rem solid @van-doc-border-color;
    }
    code {
      font-size: .8125rem;
      padding: 0 .5rem;
      font-family: inherit;
      word-break: keep-all;
    }
  }
  &--changelog {
    section {
      padding-bottom: 1.875rem;
      > h3 {
        + p {
          margin: 0;
          code {
            margin: 0;
          }
        }
        a {
          color: inherit;
          font-size: 1.5rem;
          -webkit-font-smoothing: auto;
        }
        &:not(:first-of-type) {
          margin-top: 3.125rem;
        }
      }
    }
  }
}
</style>