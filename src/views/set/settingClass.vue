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
              <ol :style="{'height': classList.cost.length * listItemHeight + 'px'}">
                <li v-for="(item, index) in classList.cost" :key="index" :ref="`li${index}`" 
                    :style="{'top': listItemHeight * index + 'px'}">
                  <div class="delete" @click="deleteClass('cost', item._id)"></div>
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
              <ol :style="{'height': classList.income.length * listItemHeight + 'px'}">
                <li v-for="(item, index) in classList.income" :key="index"
                    :style="{'top': listItemHeight * index + 'px'}">
                  <div class="delete" @click="deleteClass('income', item._id)"></div>
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
      classList: {
        income: [],
        cost: []
      },
      deleteTarget: {
        type: '',
        id: '',
        order: -1,
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
    this.init();
  },
  mounted(){
    this.listItemHeight = this.$refs.li0 ? this.$refs.li0.clientHeight : 0;
  },
  methods: {
    init(){
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          _this.classList.income = _this.classListcost = [];
          res.forEach(item => {
            _this.classList[item.typeIsIncome ? 'income' : 'cost'].push(item);
          });
          _this.classList.income =  _this.classList.income.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
          _this.classList.cost =  _this.classList.cost.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
          });
        }
      };
      xhr.open('post', '/api/readClass', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
      }));
    },
    moveToTop(isIncome, directionIsTop, itemIndex){
      let siblingIndex = itemIndex + (directionIsTop ? -1 : 1);
      let list = this.classList[isIncome ? 'income' : 'cost'];
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
    deleteClass(itemType, itemId){
      let order = this.classList[itemType].filter(function(item){
        return item._id == itemId;
      })[0].order;
      this.deleteTarget = {
        type: itemType,
        id: itemId,
        order: order,
        warn: true,
      }
    },
    confirmDelete(){
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          if(JSON.parse(xhr.response).isSuccess){
            _this.classList.income = _this.classList.cost = [];
            _this.init();
            _this.deleteTarget.warn = false;
          }
        }
      };
      xhr.open('post', '/api/deleteClass', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        classId: this.deleteTarget.id,
        isIncome: this.deleteTarget.type == 'income' ? true : false,
        order: this. deleteTarget.order,
      }));
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