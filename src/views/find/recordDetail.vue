<template>
  <div class="recordDetail">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          詳情
        </div>
        <div class="right" v-clickStyle @click="openLightbox">
          <cssIcon_delete></cssIcon_delete>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <div class="title">
            <div class="iconBox">
              <div class="icon" :class="['icon_' + iconImg, 'color_' + iconColor]"></div>
            </div>
            <h2>{{ className }}</h2>
          </div>
          <ul>
            <li>
              <span>收支</span>
              <span>{{ isIncome?'收入':'支出' }}</span>
            </li>
            <li>
              <span>金額</span>
              <span>{{ number }}</span>
            </li>
            <li>
              <span>日期</span>
              <span>{{ year }}/{{ month }}/{{ day }} 週{{ dayOfTheWeek }}</span>
            </li>
            <li>
              <span>備註</span>
              <span>{{ description }}</span>
            </li>
          </ul>
          <router-link :to="{path: 'addRecord', query: {id: $route.query.id}}">
            <div class="cssIcon">
              <cssIcon_edit></cssIcon_edit>
            </div>
          </router-link>
        </div>
      </div>
    </main>
    <div class="fixbox" :class="{'open': lightboxIsOpen}">
      <div class="lightbox">
        <h3>刪除</h3>
        <p>你確定要刪除這筆交易嗎?</p>
        <div>
          <div class="btn" @click="closeLightbox">取消</div>
          <div class="btn" @click="deleteRecord">確定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import moment from 'moment'
import cssIcon_arrowLeft from '@/components/public/cssIcon_arrowLeft.vue'
import cssIcon_delete from '@/components/public/cssIcon_delete.vue'
import cssIcon_edit from '@/components/public/cssIcon_edit.vue'

export default {
  name: 'recordDetail',
  components: {
    cssIcon_arrowLeft, cssIcon_delete, cssIcon_edit
  },
  data() {
    return {
      classList: [],
      className: '正餐',
      classId: '',
      isIncome: false,
      iconImg: 0,
      iconColor: -0,
      description: '',
      number: 0,
      year: 0,
      month: 0,
      day: 0,
      lightboxIsOpen: false,
    }
  },
  beforeMount() {
    // 載入收支類別
    let _this = this;
    let xhrClass = new XMLHttpRequest();
    xhrClass.onreadystatechange = function(){
      if(xhrClass.readyState === 4 && xhrClass.status === 200){
        _this.classList = JSON.parse(xhrClass.response);
      }
    };
    xhrClass.open('post', '/api/readClass', false);
    xhrClass.setRequestHeader('Content-type', 'application/json');
    xhrClass.send(JSON.stringify({
      email: localStorage.getItem('email'),
      loginCodeName: localStorage.getItem('loginCodeName'),
    }));

    // 載入帳目資料
    let xhrRecord = new XMLHttpRequest();
    xhrRecord.onreadystatechange = function(){
      if(xhrRecord.readyState === 4 && xhrRecord.status === 200){
        let res = JSON.parse(xhrRecord.response);
        _this.isIncome = res.isIncome;
        _this.class = res.className;
        _this.classId = res.classId;
        _this.description = res.description;
        _this.number = res.value;
        _this.year = res.year;
        _this.month = res.month;
        _this.day = res.day;
      }
    };
    xhrRecord.open('post', '/api/readRecord_findOne', false);
    xhrRecord.setRequestHeader('Content-type', 'application/json');
    xhrRecord.send(JSON.stringify({
      email: localStorage.getItem('email'),
      loginCodeName: localStorage.getItem('loginCodeName'),
      id: this.$route.query.id,
    }));

    // 顯示收支類別
    let _class = this.classList.filter(function(item){
      return item._id == _this.classId;
    })[0];
    this.className = _class.className;
    this.iconImg = _class.iconImg;
    this.iconColor = _class.iconColor;
  },
  computed: {
    dayOfTheWeek(){
      let dayOfTheWeekChart = ['日', '一', '二', '三', '四', '五', '六'];
      let dayOfTheWeek = moment(this.year + '/' + this.month + '/' + this.day).weekday();
      dayOfTheWeek = dayOfTheWeekChart[dayOfTheWeek];
      return dayOfTheWeek;
    },
  },
  methods: {
    openLightbox(){
      this.lightboxIsOpen = true;
    },
    closeLightbox(){
      this.lightboxIsOpen = false;
    },
    deleteRecord(){
      this.back();
    },
    back(){
      router.go(-1);
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/find/recordDetail.scss"></style>