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
                  <div class="icon" :class="['color_' + item.iconColor, 'icon_' + item.iconImg]"></div>
                  <div class="className">{{ item.className }}</div>
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
                  <div class="icon" :class="['color_' + item.iconColor, 'icon_' + item.iconImg]"></div>
                  <div class="className">{{ item.className }}</div>
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
        { isIncome: false, list: [] },
        { isIncome: true,  list: [] }
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
  beforeMount(){
    let res;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        res = JSON.parse(xhr.response);
      }
    };
    xhr.open('post', '/api/readClass', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
      email: localStorage.getItem('email'),
      loginCodeName: localStorage.getItem('loginCodeName'),
    }));
    res.forEach(item => {
      let type = item.typeIsIncome ? 1 : 0;
      this.classList[type].list.push(item);
    });
    this.classList[0].list = this.classList[0].list.sort(function (a, b) {
      return a.order > b.order ? 1 : -1;
    });
    this.classList[1].list = this.classList[1].list.sort(function (a, b) {
      return a.order > b.order ? 1 : -1;
    });
  },
  mounted(){
    this.listItemHeight = this.$refs.li0 ? this.$refs.li0.clientHeight : 0;
  },
  methods: {
    moveToTop(isIncome, directionIsTop, itemIndex){
      let siblingIndex = itemIndex + (directionIsTop ? -1 : 1);
      let list = this.classList[isIncome ? 1 : 0].list;
      [list[itemIndex].order, list[siblingIndex].order] = [list[siblingIndex].order, list[itemIndex].order];
      [list[itemIndex], list[siblingIndex]] = [list[siblingIndex], list[itemIndex]];
      let res = false;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          res = JSON.parse(xhr.response).isSuccess;
        }
      };
      xhr.open('post', '/api/updateClass', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        targetClass: {
          order: list[siblingIndex].order, 
          _id: list[siblingIndex]._id
        },
        siblingClass: {
          order: list[itemIndex].order, 
          _id: list[itemIndex]._id
        },
      }));
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