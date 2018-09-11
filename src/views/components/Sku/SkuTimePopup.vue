<template>
    <div class="check-button">
       <van-field
        v-model="count"
        center
        clearable
      />
      <van-field
        v-model="unit"
        required
        icon="question"
        @click-icon="$toast('question')"
      />
      <van-picker :columns="columns" @change="handleChange" />
    </div>
</template>
<script>
import { Field,Picker } from "vant";
export default {
  name: "sku-time-popup",
  props: {
    size: String,
    text: String,
    id:String,
  },
  components: {
     [Field.name]:Field,
     [Picker.name]:Picker
  },
  data() {
    return {
      type: 'default',
      count:1,
      unit:'月',
      columns: ['年', '月', '周', '日']
    };
  },
  methods: {
    handleChange(picker, value, index) {
      console.log(picker, value, index)
    }
  }
};
</script>
<style lang='less'>
</style>