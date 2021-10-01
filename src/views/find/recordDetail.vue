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
        <div class="right" v-clickStyle @click="openLightbox(true)">
          <cssIcon_delete></cssIcon_delete>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <div class="title">
            <div class="iconBox">
              <div class="icon" :class="['icon_' + targetClass.iconImg, 'color_' + targetClass.iconColor]"></div>
            </div>
            <h2>{{ targetClass.className }}</h2>
          </div>
          <ul>
            <li>
              <span>收支</span>
              <span>{{ targetRecord.typeIsIncome?'收入':'支出' }}</span>
            </li>
            <li>
              <span>金額</span>
              <span>{{ targetRecord.value }}</span>
            </li>
            <li>
              <span>日期</span>
              <span>{{ targetRecord.year }}/{{ targetRecord.month }}/{{ targetRecord.day }} 週{{ dayOfTheWeek }}</span>
            </li>
            <li>
              <span>備註</span>
              <span>{{ targetRecord.description }}</span>
            </li>
          </ul>
          <router-link :to="{path: 'addRecord', query: {id: recordId}}">
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
          <div class="btn" @click="openLightbox(false)">取消</div>
          <div class="btn" @click="deleteRecord">確定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
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
      lightboxIsOpen: false,
    }
  },
  computed: {
    dayOfTheWeek(){
      let dayOfTheWeekChart = ['日', '一', '二', '三', '四', '五', '六'];
      let date = new Date(this.targetRecord.year, this.targetRecord.month - 1, this.targetRecord.day).getDay();
      let dayOfTheWeek = dayOfTheWeekChart[date];
      return dayOfTheWeek;
    },
    recordId(){
      return this.$route.query.id;
    },
    targetRecord(){
      return this.$store.state.recordList.find(item => {
        return item._id == this.recordId;
      })
    },
    targetClass(){
      return this.$store.getters.allClass.find(item => {
        return item._id == this.targetRecord.classId;
      });
    },
  },
  methods: {
    openLightbox(direction){
      this.lightboxIsOpen = direction;
    },
    deleteRecord(){
      this.$store.commit('deleteRecord', this.recordId);
      this.back();
    },
    back(){
      router.go(-1);
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/find/recordDetail.scss"></style>