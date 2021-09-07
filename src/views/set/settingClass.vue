<template>
  <div class="settingClass">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          類別設置
        </div>
      </div>
    </header>
    <main :class="{'showIncome': showIncome}">
      <div class="container">
        <div class="tabs">
          <div @click="toggleIncome(false)">支出</div>
          <div @click="toggleIncome(true)">收入</div>
        </div>
        <div class="listbox">
          <div>
            <div class="olbox">
              <ol :style="{'height': classList[0].list.length * listItemHeight + 'px'}">
                <li v-for="(item, index) in classList[0].list" :key="index" :ref="`li${index}`" 
                    :style="{'top': listItemHeight * index + 'px'}">
                  <div class="delete" @click="deleteClass(false, index)"></div>
                  <div class="icon" :class="['color_' + item.color, 'icon_' + item.icon]"></div>
                  <div class="className">{{ item.name }}</div>
                  <div class="move">
                    <span @click="moveToTop(false, true, index)"></span>
                    <span @click="moveToTop(false, false, index)"></span>
                  </div>
                </li>
              </ol>
            </div>
            <div class="olbox">
              <ol :style="{'height': classList[1].list.length * listItemHeight + 'px'}">
                <li v-for="(item, index) in classList[1].list" :key="index"
                    :style="{'top': listItemHeight * index + 'px'}">
                  <div class="delete" @click="deleteClass(true, index)"></div>
                  <div class="icon" :class="['color_' + item.color, 'icon_' + item.icon]"></div>
                  <div class="className">{{ item.name }}</div>
                  <div class="move">
                    <span @click="moveToTop(true, true, index)"></span>
                    <span @click="moveToTop(true, false, index)"></span>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <router-link to="addClass">+添加新類別</router-link>
      </div>
    </main>
    <div class="fixbox" :class="{'open': deleteTarget.warn}">
      <div class="lightbox">
        <h2>警告</h2>
        <p>刪除此類別也會將此類別中的所有紀錄一併刪除</p>
        <div>
          <span @click="cancelDelete">取消</span>
          <span @click="confirmDelete">確定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import cssIcon_arrowLeft from '@/components/public/cssIcon_arrowLeft.vue'

export default {
  name: 'settingClass',
  components: {
    cssIcon_arrowLeft
  },
  data() {
    return {
      showIncome: false,
      listItemHeight: null,
      classList: [
        {
          isIncome: false,
          list: [
            {id: 'aa', name: '正餐', icon: 0, color: 7},
            {id: 'bb', name: '電話費', icon: 1, color: 6},
            {id: 'cc', name: '水電費', icon: 2, color: 5},
            {id: 'dd', name: '酒精', icon: 3, color: 4},
            {id: 'ee', name: '儲糧', icon: 4, color: 3},
            {id: 'ff', name: '交通', icon: 5, color: 2},
            {id: 'gg', name: '零食', icon: 6, color: 1},
            {id: 'hh', name: '其他', icon: 7, color: 0},
            {id: 'cc', name: '水電費', icon: 2, color: 5},
            {id: 'dd', name: '酒精', icon: 3, color: 4},
            {id: 'ee', name: '儲糧', icon: 4, color: 3},
            {id: 'ff', name: '交通', icon: 5, color: 2},
            {id: 'gg', name: '零食', icon: 6, color: 1},
            {id: 'hh', name: '其他', icon: 7, color: 0},
            {id: 'ee', name: '儲糧', icon: 4, color: 3},
            {id: 'ff', name: '交通', icon: 5, color: 2},
            {id: 'gg', name: '零食', icon: 6, color: 1},
            {id: 'hh', name: '其他', icon: 7, color: 0},
          ]
        },
        {
          isIncome: true,
          list: [
            {id: 'aa', name: '生活費', icon: 0, color: 7},
            {id: 'bb', name: '加班費', icon: 1, color: 6},
            {id: 'cc', name: '中獎', icon: 2, color: 5},
            {id: 'ff', name: '其他', icon: 5, color: 2},
          ]
        }
      ],
      deleteTarget: {
        targetInformation: {
          isIncome: false,
          id: 'ABC',
        },
        warn: false,
      },
      dragClass: {
        mouseDown: false,
        start: 0,
        moveTo: 0
      }
    }
  },
  mounted() {
    this.listItemHeight = this.$refs.li0.clientHeight;

  },
  methods: {
    moveToTop(isIncome, directionIsTop, itemIndex){
      let siblingIndex = itemIndex + (directionIsTop ? -1 : 1);
      let list = this.classList[isIncome ? 1 : 0].list;
      [list[itemIndex], list[siblingIndex]] = [list[siblingIndex], list[itemIndex]];
    },
    toggleIncome(showIncome){
      this.showIncome = showIncome;
    },
    deleteClass(isIncome, index){
      this.deleteTarget = {
        targetInformation: {
          isIncome: isIncome,
          index: index,
        },
        warn: true,
      }
    },
    confirmDelete(){
      let targetInformation = this.deleteTarget.targetInformation;
      this.classList[targetInformation.isIncome ? 1 : 0].list.splice([targetInformation.index], 1);
      this.deleteTarget.warn = false;
    },
    cancelDelete(){
      this.deleteTarget.warn = false;
    },
    back(){
      router.go(-1);
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/set/settingClass.scss"></style>