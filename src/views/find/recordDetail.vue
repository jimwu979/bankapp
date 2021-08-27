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
              <div class="icon icon_2 color_3"></div>
            </div>
            <h2>正餐</h2>
          </div>
          <ul>
            <li>
              <span>類別</span>
              <span>支出</span>
            </li>
            <li>
              <span>金額</span>
              <span>290</span>
            </li>
            <li>
              <span>日期</span>
              <span>{{ year }}/{{ month }}/{{ day }} 週{{ dayOfTheWeek }}~~</span>
            </li>
            <li>
              <span>備註</span>
              <span>一二三一二三一二三一二三一二三一二三一二三一二三一二三一二三一二三</span>
            </li>
          </ul>
          <router-link :to="{path: 'addRecord'}">
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
      class: '正餐',
      isIncome: false,
      icon: 2,
      color: 3,
      description: '一二三一二三一二三一二三一二三一二三一二三一二三一二三一二三一二三',
      number: 290,
      year: 2021,
      month: 8,
      day: 13,
      lightboxIsOpen: false,
    }
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
<style lang="scss" src="@/scss/find/recordDetail.scss"></style>