<template>
    <div class="img-gallery"
      @keyup.enter="nextScreen"
      :style="{width: (viewBoxWidth + arrayWidth * 2) + 'px', height: imgHeight + 'px'}"
    >
      <div class="array-left-box" @click="preScreen" :style="{width: arrayWidth + 'px', height: arrayHeight + 'px'}">
        <slot name="array-left">
          <div class="array-left">
            <i class="el-icon-arrow-left"></i>
          </div>
        </slot>
      </div>
      <div class="array-right-box" @click="nextScreen" :style="{width: arrayWidth + 'px', height: arrayHeight + 'px'}">
        <slot name="array-right">
          <div class="array-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </slot>
      </div>
      <div class="view-box">
        <div class="real-content-box"
          :style="{width: realBoxWidth, transform: 'translateX(' + transformX +'px)'}"
        >
          <div class="image-gallery-item"
            :class="{'active-image-item': index === selectItemIndex}"
            v-for="(item, index) in imgs"
            :style="{width: imgWidth + 'px', height: imgHeight + 'px'}"
            @click="selectItem(index)"
          >
             <slot name="img-item" :item="item">
               <img classs :src="item.img">
             </slot>
          </div>
          <div class="empty-content" v-if="imgs.length ===0">
            数据生成中...
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      transformX: 0,
      nowImgIndex: 0,
      selectItemIndex: 0
    };
  },
  props: {
    viewBoxWidth: {
      type: Number,
      default: 900
    },
    imgWidth: {
      type: Number,
      default: 100
    },
    imgHeight: {
      type: Number,
      default: 150
    },
    imgs: {
      type: Array,
      default: function () {
        return [];
      }
    },
    arrayWidth: {
      type: Number,
      default: 30
    },
    arrayHeight: {
      type: Number,
      default: 100
    },
    defaultSelectIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    realBoxWidth () {
      return this.imgs.length * this.imgWidth + 'px';
    }
  },
  methods: {
    forceInit () {
      this.nowImgIndex = 0;
      this.selectItemIndex = 0;
      this.transformX = 0;
    },
    moveToItemByIndex (index) {
      if (index >= this.imgs.length) {
        return;
      }

      if (index < 0) {
        index = 0;
      }
      var nextPos = (index) * this.imgWidth;
      console.log(-nextPos);
      this.transformX = -nextPos;
      this.nowImgIndex = index;
    },
    next () {
      var nextIndex = this.nowImgIndex + 1;
      if (nextIndex >= this.imgs.length) {
        this.$emit('last-img', this.imgs[this.imgs.length - 1]);
      }

      this.moveToItemByIndex(nextIndex);
    },
    pre () {
      var nextIndex = this.nowImgIndex - 1;
      if (nextIndex <= 0) {
        this.$emit('first-img', this.imgs[this.imgs.length - 1]);
      }
      this.moveToItemByIndex(nextIndex);
    },
    nextScreen () {
      /* 计算下一屏应该在的位置 */
      var screenWidth = this.viewBoxWidth;
      var showItems = parseInt(screenWidth / this.imgWidth);
      var nextIndex = this.nowImgIndex + showItems;
      this.emitLastScreenEvent(nextIndex);
      this.moveToItemByIndex(nextIndex);
    },
    preScreen () {
      /* 计算上一屏应该在的位置 */
      var screenWidth = this.viewBoxWidth;
      var showItems = parseInt(screenWidth / this.imgWidth);
      var nextIndex = this.nowImgIndex - showItems;
      this.moveToItemByIndex(nextIndex);
    },
    emitLastScreenEvent (index) {
      var screenWidth = this.viewBoxWidth;
      var showItems = parseInt(screenWidth / this.imgWidth);

      var allPages = Math.ceil(this.imgs.length / showItems);
      var nowPage = Math.ceil((index + 1) / showItems);
      if (nowPage === (allPages - 1)) {
        /* 数据快显示完了 */
        this.$emit('will-last-screen');
      }
      if (nowPage === allPages) {
        this.$emit('last-screen');
      }
    },
    selectItem (index) {
      this.selectItemIndex = index;
      this.$emit('select-item', this.imgs[index]);
    },
    emitKeyboardEvent () {

    }
  },
  created () {
    /* 初始化默认选择元素 */
    this.selectItemIndex = this.defaultSelectIndex;
    this.emitLastScreenEvent(0);
  }
};
</script>

<style lang="less" scoped>
  .img-gallery {
    margin: 0 auto;
    border-radius: 4px;
    .image-gallery-item {
      padding-right: 8px;
      overflow-x: hidden;
    }

    .array-left-box, .array-right-box {
      height: 100%;
      overflow: hidden;
    }

    .array-left-box {
      float: left;
    }
    .array-right-box {
      float: right;
    }
    @radius: 2px;
    .array-left {
      border-top-left-radius: @radius;
      border-bottom-left-radius: @radius;
    }
    .array-right {
      border-top-right-radius: @radius;
      border-bottom-right-radius: @radius;
    }
    .array-left, .array-right {
      height: 100%;
      background-color: #bad3ff;
      position: relative;
      cursor: pointer;

      i {
        font-size: 26px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .real-content-box {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateX(0);
      transition: all .5s;
    }

    .image-gallery-item {
      float: left;
    }
    .view-box {
      overflow: hidden;
      position: relative;
      height: 100%;
    }

    .empty-content {
      width: 200px;
      text-align: center;
      font-size: 20px;
      color: #d6d6d6;
      height: 100%;
      line-height: 5;      
    }
  }
</style>