<template>
      <li  :class=" type?'active check-button':'check-button'" @click="handleClick">{{text}}</li>
</template>
<script>
export default {
  name: "LmCheckButton",
  props: {
    size: String,
    text: [String,Number],
    id:[String,Number]
  },
  data() {
    return {
      type: ''
    };
  },
  methods: {
    handleClick() {
      this.type={'active':'','':'active'}[this.type]
      this.$emit("timeChange", this.id);
    }
  }
};
</script>
<style lang="less" scoped>
  .check-button{
    margin: 1px;
    .van-button{
      width: 50px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAFK0lEQVRoQ93ZaWwUZRgH8P+zR2lLWrfuzC5sO9Nq5ZCKSvH6YDVaibYSLcRIDRExxlrFEhJjRGNI/KLWhEMRbDQgCdWEfhBJDdBjt63iB48IYgqUpCQelYSWhmKAtN2dx7zv9qbHlO5ud3a+bGb3vX77vMdkHsLA1aTqmw1wxeC9FT4JCDHhMhjdBJwEcaDrwj+HngVCg+OnkZCAR6tixitWwE0yxnYbaP0jnX8dE2VGARmggKrtBbDe4sheGEZx4cWOwCigQNUAdreqVQMotTKSGX/bu+wLrwMKVBPgMFStBsAqKyOJee24wIFIJrlV/SDAxZZFElVPCAxHMieZPaFaZjxmTSQdnxQoUL/6fKk9/fajAAosiOyYEihQxxQlrY9S6hl4wEpIAi6ZAsrp6spxGc6QH0C+VZAE+s80UKAa0zLdlGxrArB0tpCODBeW7P4YrvvuRfv7H6Fjz74JhzJtoER6PF4bJzUzaHGskXMyfbjrwH7MXXCb7Lqvqws/5i2PLDC8JjVfL+F7ALmxQqYuXCBxyb75Q11eOXMWPz+8IvJA0aLfNT8bDnsLiLJvBOlw3QS16AlcPn4CV860TdpE+j35uLP6SzgzXMO4trP4vXQdev89Hx2gRHq0XDBaAGROF7n86CGkL7sbRl8/Wss2oOtI3bhNuFc8irwvdsOekjL0+6WffsEfz7+EYE/PpN3e0Boc22JAuWURU1AgvdNBPnj6BJw3Z8gq3B9E66sV6Kw9PKqJeWueweJtlSCHY+j7zsN1OFVeAaO3d8ruIgKUR4hXu8MwxCMslCl7HSjgWfUUluzaAbLbw8hgEKc2bMKFb2vlvf56OXLf3QzQ8EbfsW8/zr69BTAMU91EDCinq5KdDxh+EIYXyhTD8K4uwe2fbhtGhkI4vfENpC3Ng1b+8nBtZpyr3Io/t+80BRssFFGgaDTgzbqfDTQAlGZ2JJ6nV8pzbeQ0HFlXRLbtzXdw/usDZpscKhdxoGi5WdUKQsARAHPNjkhdWYy8qp0g5/BaE3VDV6+htew1XGwImG1qVLmoAGUk3Xoh2/g7AMlmR6YUPY68z3fBluSUVfq7u3Fy7Yu4/NsJs01cVy5qQIlUs4oNpoNESDI7QnEkLNpaKc82seFcaz9ntuq45aIKFD02ebQSNlDDhHBYYnxFHSg8jYpWSsTVAIXPgxheMQHKSKr6CyHwXgJsMfQhZkC5JhW9jImrxr6qjCY4psDwxqNvBHiHeP8aTdhg2zEHio79qv4WwB8mLDC88WRtIaL3oo2clQgOovxq1gcAbY4mclaB4emqbQewKVrIWQdKpKJ9BkJ5NJBxAYxmRisugCJyDNiaPFo1M56LZCTjBiifdgAHq9oBBlZHChlXQIGqAZIUVf+GwU9GAhl3wHAkc5JZCdUyzTyjFZdAgaz1+VJT++3ircBDM4lk3AIF6pCipM2llHqaQUYrroFyurpyXOwMNTIwcQJikhDHPVA+t84go2UJoEDWeb0eh+FswTQzWpYBCmS9ovkchBYGwrkzE5elgMLTkOHTbSKjBeSY8MX2lYWZAZkp84NXv7XPYJGbnDKjZbkIDv4BIqMFCjYzMG+yP8WyQHmEmMhoWRoo16TqW2Znu58J4UTjmMvyQOEJZ7SoHkB6QgLlw4CqFdA4Ga2EiODQxuPWC2HjWgaGkvkJBRRQv5pVBNBBAHPEfcIB5e7q0UoMAzUgOBMSOLAm1xD4K4LtakxyBGaeUCJdJuDR1zHjk4QFyumqaKX/AxfcjYq957xIAAAAAElFTkSuQmCC) no-repeat 100% 0;
        background-size: .56rem auto
    }
  }
  .check-button {
        list-style-type:none;
        float: left;
        border-radius: 4px;
        border: 1px solid #e0e0e0;
        height: .88rem;
        width: .88rem;
        margin-bottom: .2rem;
        margin-right: .24rem;
        &.active {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAFK0lEQVRoQ93ZaWwUZRgH8P+zR2lLWrfuzC5sO9Nq5ZCKSvH6YDVaibYSLcRIDRExxlrFEhJjRGNI/KLWhEMRbDQgCdWEfhBJDdBjt63iB48IYgqUpCQelYSWhmKAtN2dx7zv9qbHlO5ud3a+bGb3vX77vMdkHsLA1aTqmw1wxeC9FT4JCDHhMhjdBJwEcaDrwj+HngVCg+OnkZCAR6tixitWwE0yxnYbaP0jnX8dE2VGARmggKrtBbDe4sheGEZx4cWOwCigQNUAdreqVQMotTKSGX/bu+wLrwMKVBPgMFStBsAqKyOJee24wIFIJrlV/SDAxZZFElVPCAxHMieZPaFaZjxmTSQdnxQoUL/6fKk9/fajAAosiOyYEihQxxQlrY9S6hl4wEpIAi6ZAsrp6spxGc6QH0C+VZAE+s80UKAa0zLdlGxrArB0tpCODBeW7P4YrvvuRfv7H6Fjz74JhzJtoER6PF4bJzUzaHGskXMyfbjrwH7MXXCb7Lqvqws/5i2PLDC8JjVfL+F7ALmxQqYuXCBxyb75Q11eOXMWPz+8IvJA0aLfNT8bDnsLiLJvBOlw3QS16AlcPn4CV860TdpE+j35uLP6SzgzXMO4trP4vXQdev89Hx2gRHq0XDBaAGROF7n86CGkL7sbRl8/Wss2oOtI3bhNuFc8irwvdsOekjL0+6WffsEfz7+EYE/PpN3e0Boc22JAuWURU1AgvdNBPnj6BJw3Z8gq3B9E66sV6Kw9PKqJeWueweJtlSCHY+j7zsN1OFVeAaO3d8ruIgKUR4hXu8MwxCMslCl7HSjgWfUUluzaAbLbw8hgEKc2bMKFb2vlvf56OXLf3QzQ8EbfsW8/zr69BTAMU91EDCinq5KdDxh+EIYXyhTD8K4uwe2fbhtGhkI4vfENpC3Ng1b+8nBtZpyr3Io/t+80BRssFFGgaDTgzbqfDTQAlGZ2JJ6nV8pzbeQ0HFlXRLbtzXdw/usDZpscKhdxoGi5WdUKQsARAHPNjkhdWYy8qp0g5/BaE3VDV6+htew1XGwImG1qVLmoAGUk3Xoh2/g7AMlmR6YUPY68z3fBluSUVfq7u3Fy7Yu4/NsJs01cVy5qQIlUs4oNpoNESDI7QnEkLNpaKc82seFcaz9ntuq45aIKFD02ebQSNlDDhHBYYnxFHSg8jYpWSsTVAIXPgxheMQHKSKr6CyHwXgJsMfQhZkC5JhW9jImrxr6qjCY4psDwxqNvBHiHeP8aTdhg2zEHio79qv4WwB8mLDC88WRtIaL3oo2clQgOovxq1gcAbY4mclaB4emqbQewKVrIWQdKpKJ9BkJ5NJBxAYxmRisugCJyDNiaPFo1M56LZCTjBiifdgAHq9oBBlZHChlXQIGqAZIUVf+GwU9GAhl3wHAkc5JZCdUyzTyjFZdAgaz1+VJT++3ircBDM4lk3AIF6pCipM2llHqaQUYrroFyurpyXOwMNTIwcQJikhDHPVA+t84go2UJoEDWeb0eh+FswTQzWpYBCmS9ovkchBYGwrkzE5elgMLTkOHTbSKjBeSY8MX2lYWZAZkp84NXv7XPYJGbnDKjZbkIDv4BIqMFCjYzMG+yP8WyQHmEmMhoWRoo16TqW2Znu58J4UTjmMvyQOEJZ7SoHkB6QgLlw4CqFdA4Ga2EiODQxuPWC2HjWgaGkvkJBRRQv5pVBNBBAHPEfcIB5e7q0UoMAzUgOBMSOLAm1xD4K4LtakxyBGaeUCJdJuDR1zHjk4QFyumqaKX/AxfcjYq957xIAAAAAElFTkSuQmCC) no-repeat 100% 0;
            background-size: .4rem auto;
            border: 1px solid #bd151d;
            color: #bd151d;
        }
        &.mr-none{
            margin-right: 0;
        }
    }
</style>

