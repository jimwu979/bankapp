<template>
  <div class="addClass" @click="toggleTypeMenu(false)">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          添加新類別
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="newClass">
          <div :class="['icon', 'icon_'+ iconStyle.icon, 'color_'+ iconStyle.color]"></div>
          <input type="text" placeholder="類別名稱" v-model="className">
          <div class="type" :class="{'open': type.isOpen}" v-clickStyle @click.stop="toggleTypeMenu()">
            <span>{{ type.isIncome ? '收入' : '支出' }}</span>
            <ul>
              <li @click="selectIncome(false)" :class="{'now': !type.isIncome}">支出</li>
              <li @click="selectIncome(true)" :class="{'now': type.isIncome}">收入</li>
            </ul>
          </div>
        </div>
        <div class="setIcon">
          <div>
            <h2>選擇icon</h2>
            <ul>
              <li v-for="(item, index) in 16" 
                  :key="index" 
                  :class="{'now': index == iconStyle.icon}" 
                  @click="selectIcon(index)">
                <div class="icon" :class="'icon_'+ index"></div>
                <span></span>
              </li>
            </ul>
          </div>
          <div>
            <h2>選擇顏色</h2>
            <ul>
              <li v-for="(item, index) in 8" 
                  :key="index" 
                  :class="{'now': index == iconStyle.color}"
                  @click="selectColor(index)">
                <div class="icon" :class="'color_'+ index"></div>
                <span></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="submit" @click="submit">確定</div>
      </div>
    </main>
    <div class="fixbox" :class="{'open': errorMessageIsOpen}">
      <div class="lightbox">
        <p>請填寫類別名稱</p>
        <div @click="toggleLightbox(false)">確定</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import cssIcon_arrowLeft from '@/components/public/cssIcon_arrowLeft.vue'

export default {
  name: 'addClass',
  components: {
    cssIcon_arrowLeft
  },
  data() {
    return {
      iconStyle: {
        icon: 0,
        color: 0
      },
      className: '',
      type: {
        isOpen: false,
        isIncome: false
      },
      errorMessageIsOpen: false,
    }
  },
  methods: {
    toggleTypeMenu(toggleDirection){
        this.type.isOpen = (toggleDirection != undefined) ? toggleDirection : !this.type.isOpen;
    },
    selectIncome(selectIncome){
      this.type.isIncome = selectIncome;
    },
    selectIcon(iconIndex){
      this.iconStyle.icon = iconIndex;
    },
    selectColor(colorIndex){
      this.iconStyle.color = colorIndex;
    },
    back(){
      router.go(-1);
    },
    submit(){
      if(this.className.length > 0){
        this.back();
      } else {
        this.toggleLightbox(true);
      }
    },
    toggleLightbox(toggleDirection){
      this.errorMessageIsOpen = toggleDirection;
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/set/addClass.scss"></style>