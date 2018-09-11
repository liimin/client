 
 <template>
  <div>
    <van-popup v-model="show" position="bottom" class="van-sku-container" :close-on-click-overlay="closeOnClickOverlay" :get-container="getContainer">
        <!-- sku-header -->
        <slot name="sku-header" :sku-event-bus="skuEventBus" :selected-sku="selectedSku" :selected-sku-comb="selectedSkuComb">
            <sku-header :sku-event-bus="skuEventBus" :selected-sku="selectedSku" :goods="goods" :sku="sku">
                <slot name="sku-header-price" :price="price" :selected-sku-comb="selectedSkuComb">
                    <div class="van-sku__goods-price">
                        <span class="van-sku__price-symbol">￥</span>
                        <span class="van-sku__price-num">{{ price }}</span>
                    </div>
                </slot>
            </sku-header>
        </slot>
        <div class="van-sku-body" :style="bodyStyle">
            <!-- sku-body-top -->
            <slot name="sku-body-top" :selected-sku="selectedSku" :sku-event-bus="skuEventBus" />
            <!-- sku-group -->
            <slot name="sku-group" :selected-sku="selectedSku" :sku-event-bus="skuEventBus">
                <div v-if="hasSku" class="van-sku-group-container">
                    <sku-row v-for="(skuTreeItem, index) in skuTree" :key="index" :sku-row="skuTreeItem">
                        <sku-row-item v-for="(skuValue, index) in skuTreeItem.v" :key="index" :sku-key-str="skuTreeItem.k_s" :sku-value="skuValue" :sku-event-bus="skuEventBus" :selected-sku="selectedSku" :sku-list="sku.list" />
                    </sku-row>
                </div>
            </slot>
            <!-- extra-sku-group -->
            <slot name="sku-choose-position" :sku-event-bus="skuEventBus" >
                <van-cell-group>
                   <van-cell title="选择供灯位置" is-link value="10-616"  @click="showPosition=!showPosition"/>
                </van-cell-group>
            </slot>
            <!-- sku-stepper -->
            <slot name="sku-stepper" :sku-event-bus="skuEventBus" :selected-sku="selectedSku" :selected-sku-comb="selectedSkuComb" :selected-num="selectedNum">
                <sku-stepper ref="skuStepper" :sku-event-bus="skuEventBus" :selected-sku="selectedSku" :selected-sku-comb="selectedSkuComb" :selected-num="selectedNum" :stepper-title="stepperTitle" :sku-stock-num="sku.stock_num" :quota="quota" :quota-used="quotaUsed" :disable-stepper-input="disableStepperInput" :hide-stock="hideStock" :custom-stepper-config="customStepperConfig" @change="$emit('stepper-change', $event)" />
            </slot>
            <!-- sku-messages -->
            <slot name="sku-messages">
                <sku-messages ref="skuMessages" :goods-id="goodsId" :message-config="messageConfig" :messages="sku.messages" />
            </slot>
        </div>
        <!-- sku-actions -->
        <slot name="sku-actions" :sku-event-bus="skuEventBus">
            <sku-actions :sku-event-bus="skuEventBus" :buy-text="buyText" :show-add-cart-btn="showAddCartBtn" />
        </slot>
    </van-popup>
    <van-popup v-model="showPosition" position="right"   class="van-sku-container" :close-on-click-overlay="closeOnClickOverlay" :get-container="getContainer">
      <sku-lamps></sku-lamps>
    </van-popup>
    </div>
</template>

<script>
/* eslint-disable camelcase */
import Vue from "vue";
import SkuHeader from "./SkuHeader";
import SkuRow from "./SkuRow";
import SkuRowItem from "./SkuRowItem";
import SkuStepper from "./SkuStepper";
import SkuActions from "./SkuAction";
import skuMessages from "./SkuMessages";
import SkuLamps from './SkuLamps'
import {Popup,Toast,Cell, CellGroup} from 'vant';
import {
  isAllSelected,
  isSkuChoosable,
  getSkuComb,
  getSelectedSkuValues
} from './utils/skuHelper';
import { LIMIT_TYPE, UNSELECTED_SKU_VALUE_ID } from './constants';
export default {
  name: "sku",
  components: {
    [Popup.name]:Popup,
    [Toast.name]:Toast,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    SkuHeader,
    SkuRow,
    SkuRowItem,
    SkuStepper,
    SkuActions,
    skuMessages,
    SkuLamps
  },
  props: {
    sku: Object,
    goods: Object,
    value: Boolean,
    buyText: String,
    goodsId: [Number, String],
    stepperTitle: String,
    hideStock: Boolean,
    getContainer: Function,
    resetStepperOnHide: Boolean,
    resetSelectedSkuOnHide: Boolean,
    disableStepperInput: Boolean,
    closeOnClickOverlay: Boolean,
    initialSku: {
      type: Object,
      default: () => ({})
    },
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    showAddCartBtn: {
      type: Boolean,
      default: true
    },
    bodyOffsetTop: {
      type: Number,
      default: 200
    },
    messageConfig: {
      type: Object,
      default: () => ({
        placeholderMap: {},
        uploadImg: () => Promise.resolve(),
        uploadMaxSize: 5
      })
    },
    customStepperConfig: {
      type: Object,
      default: () => ({})
    },
    customSkuValidator: Function
  },
  data() {
    return {
      selectedSku: {},
      selectedNum: 1,
      show: this.value,
      showPosition:false
    };
  },
  watch: {
    show(val) {
      this.$emit("input", val);
      if (!val) {
        const selectedSkuValues = getSelectedSkuValues(
          this.sku.tree,
          this.selectedSku
        );
        this.$emit("sku-close", {
          selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb
        });
        if (this.resetStepperOnHide) {
          this.$refs.skuStepper && this.$refs.skuStepper.setCurrentNum(1);
        }
        if (this.resetSelectedSkuOnHide) {
          this.resetSelectedSku(this.skuTree);
        }
      }
    },
    value(val) {
      this.show = val;
    },
    skuTree(val) {
      this.resetSelectedSku(val);
    }
  },
  computed: {
    bodyStyle() {
      if (this.$isServer) {
        return;
      }
      // header高度82px, sku actions高度50px，如果改动了样式自己传下bodyOffsetTop调整下
      const maxHeight = window.innerHeight - this.bodyOffsetTop;
      return {
        maxHeight: maxHeight + "px"
      };
    },
    isSkuCombSelected() {
      return isAllSelected(this.sku.tree, this.selectedSku);
    },
    isSkuEmpty() {
      return Object.keys(this.sku).length === 0;
    },
    hasSku() {
      return !this.sku.none_sku;
    },
    selectedSkuComb() {
      if (!this.hasSku) {
        return {
          id: this.sku.collection_id,
          price: Math.round(this.sku.price * 100),
          stock_num: this.sku.stock_num
        };
      } else if (this.isSkuCombSelected) {
        return getSkuComb(this.sku.list, this.selectedSku);
      }
      return null;
    },
    price() {
      if (this.selectedSkuComb) {
        return (this.selectedSkuComb.price / 100).toFixed(2);
      }
      // sku.price是一个格式化好的价格区间
      return this.sku.price;
    },
    skuTree() {
      return this.sku.tree || [];
    }
  },
  created() {
    const skuEventBus = new Vue();
    this.skuEventBus = skuEventBus;
    skuEventBus.$on("sku:close", this.onClose);
    skuEventBus.$on("sku:select", this.onSelect);
    skuEventBus.$on("sku:numChange", this.onNumChange);
    skuEventBus.$on("sku:overLimit", this.onOverLimit);
    skuEventBus.$on("sku:addCart", this.onAddCart);
    skuEventBus.$on("sku:buy", this.onBuy);
    this.resetSelectedSku(this.skuTree);
    // 组件初始化后的钩子，抛出skuEventBus
    this.$emit("after-sku-create", skuEventBus);
  },
  methods: {
    resetSelectedSku(skuTree) {
      this.selectedSku = {};
      // 重置selectedSku
      skuTree.forEach(item => {
        this.selectedSku[item.k_s] =
          this.initialSku[item.k_s] || UNSELECTED_SKU_VALUE_ID;
      });
      // 只有一个sku规格值时默认选中
      skuTree.forEach(item => {
        const key = item.k_s;
        const valueId = item.v[0].id;
        if (
          item.v.length === 1 &&
          isSkuChoosable(this.sku.list, this.selectedSku, { key, valueId })
        ) {
          this.selectedSku[key] = valueId;
        }
      });
    },
    getSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getMessages() : {};
    },
    getSkuCartMessages() {
      return this.$refs.skuMessages
        ? this.$refs.skuMessages.getCartMessages()
        : {};
    },
    validateSkuMessages() {
      return this.$refs.skuMessages
        ? this.$refs.skuMessages.validateMessages()
        : "";
    },
    validateSku() {
      if (this.selectedNum === 0) {
        return "商品已经无法购买啦";
      }
      if (this.isSkuCombSelected) {
        return this.validateSkuMessages();
      }
      // 自定义sku校验
      if (this.customSkuValidator) {
        const err = this.customSkuValidator(this);
        if (err) return err;
      }
      return "请先选择商品规格";
    },
    onClose() {
      this.show = false;
    },
    onSelect(skuValue) {
      // 点击已选中的sku时则取消选中
      this.selectedSku =
        this.selectedSku[skuValue.skuKeyStr] === skuValue.id
          ? {
              ...this.selectedSku,
              [skuValue.skuKeyStr]: UNSELECTED_SKU_VALUE_ID
            }
          : { ...this.selectedSku, [skuValue.skuKeyStr]: skuValue.id };
      this.$emit("sku-selected", {
        skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    onNumChange(num) {
      this.selectedNum = num;
    },
    onOverLimit(data) {
      const { action, limitType, quota, quotaUsed } = data;
      const { handleOverLimit } = this.customStepperConfig;
      if (handleOverLimit) {
        handleOverLimit(data);
        return;
      }
      if (action === "minus") {
        Toast("至少选择一件");
      } else if (action === "plus") {
        if (limitType === QUOTA_LIMIT) {
          let msg = `限购${quota}件`;
          if (quotaUsed > 0) msg += `，${`您已购买${quotaUsed}件`}`;
          Toast(msg);
        } else {
          Toast("库存不足");
        }
      }
    },
    onAddCart() {
      this.onBuyOrAddCart("add-cart");
    },
    onBuy() {
      this.onBuyOrAddCart("buy-clicked");
    },
    onBuyOrAddCart(type) {
      const error = this.validateSku();
      if (error) {
        Toast(error);
      } else {
        this.$emit(type, this.getSkuData());
      }
    },
    getSkuData() {
      return {
        goodsId: this.goodsId,
        selectedNum: this.selectedNum,
        selectedSkuComb: this.selectedSkuComb,
        messages: this.getSkuMessages(),
        cartMessages: this.getSkuCartMessages()
      };
    }
  }
};
</script>
<style lang="less" scoped>
    .van-sku-container{
        font-size: 14px;
        background: #fff;
        overflow-y: visible;
        width: calc( 100% + 1px ) !important;
    }
</style>
