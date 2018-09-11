<template>
  <van-cell-group>
    <template v-for="(message, index) in messages">
      <van-field
        v-model="messageValues[index].value"
        maxlength="200"
        :key="`${goodsId}-${index}`"
        :required="message.required == '1'"
        :label="message.name"
        :placeholder="getPlaceholder(message)"
        :type="getType(message)"
      />
    </template>
  </van-cell-group>
</template>

<script>
import { Field,Uploader,Cell, CellGroup  } from 'vant';
import validateNumber from '@/utils/validate/number';
const PLACEHOLDER = {
  name: '选填姓名',
  tel: '选填手机号码',
};
export default {
  name: 'sku-messages',
  components: {
    [Uploader.name]:Uploader,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Cell.name]:Cell
  },
  props: {
    messages: Array,
    messageConfig: Object,
    goodsId: [Number, String]
  },
  data() {
    return {
      messageValues: this.resetMessageValues(this.messages)
    };
  },
  watch: {
    messages(val) {
      this.messageValues = this.resetMessageValues(val);
    }
  },
  computed: {
    messagePlaceholderMap() {
      return this.messageConfig.placeholderMap || {};
    }
  },
  methods: {
    resetMessageValues(messages) {
      return (messages || []).map(() => ({ value: '' }));
    },
    getType(message) {
      if (+message.multiple === 1) {
        return 'textarea';
      }
      if (message.type === 'id_no') {
        return 'text';
      }
      return message.datetime > 0 ? 'datetime-local' : message.type;
    },
    getMessages() {
      const messages = {};
      this.messageValues.forEach((item, index) => {
        let value = item.value;
        if (this.messages[index].datetime > 0) {
          value = value.replace(/T/g, ' ');
        }
        messages[`message_${index}`] = value;
      });
      return messages;
    },
    getCartMessages() {
      const messages = {};
      this.messageValues.forEach((item, index) => {
        let value = item.value;
        const message = this.messages[index];
        if (message.datetime > 0) {
          value = value.replace(/T/g, ' ');
        }
        messages[message.name] = value;
      });
      return messages;
    },
    getPlaceholder(message) {
      const type = +message.multiple === 1 ? 'textarea' : message.type;
      return this.messagePlaceholderMap[type] || PLACEHOLDER[type];
    },
    validateMessages() {
      const values = this.messageValues;
      for (let i = 0; i < values.length; i++) {
        const value = values[i].value;
        const message = this.messages[i];
        if (value === '') {
          // 必填字段的校验
          if (message.required == '1') { // eslint-disable-line
            return `请填写 ${message.name}`
          }
        } else {
          if (message.type === 'tel' && !validateNumber(value)) {
            return '请填写正确的数字格式留言';
          }
          if (message.type === 'mobile' && !/^\d{6,20}$/.test(value)) {
            return '手机号长度为6-20位数字';
          }
        }
      }
    }
  }
};
</script>