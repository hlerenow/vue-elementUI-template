/**
 * @description:一个列表选择组件
 * 
 * @event:
 *    select:当选中一个列表元素时，会触发这个事件，并返回当前元素item，以及当前元素的数组索引index,支持单选，以及选择取消
 */
<template>
  <div class="h-list-wrap">
    <ul class="list-container">
      <li @click="select(item,index)" v-for="(item,index) in list" :class="{'h-list-active':selectIndex==index}">
        <slot name="listItem" :item="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'hList',

  data () {
    return {
      selectIndex: -1
    }
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return [1]
      }
    },
    selectItemIndex: {
      default: -1
    }
  },
  watch: {
    selectItemIndex: function (newVal) {
      this.selectIndex = newVal
    },
    list: function (val) {
      /* 重置内部状态 */
      this.selectIndex = -1
      this.$emit('select', {
        item: null,
        index: -1
      })
    }
  },
  methods: {
    select (item, index) {
      if (this.selectIndex === index) {
        this.selectIndex = -1
        item = null
        index = -1
      } else {
        this.selectIndex = index
      }
      this.$emit('select', {
        item,
        index
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .h-list-wrap{
    width:100%;
    .h-list-active{
      background-color: #2db7f5;
      color: white !important;
    }
    
  }
</style>