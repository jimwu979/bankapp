<template>
  <div class="statistics">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          <monthlyCalendar :parentYear="year" :parentMonth="month"></monthlyCalendar>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <h2>{{ IncomeOrCost }}列表</h2>
          <div class="list">
            <router-link 
              v-for="(item, index) in statisticsList"
              :key="index"
              v-clickStyle
              :to="{
                path: 'classDetail', 
                query: { 
                  year: year, 
                  month: month, 
                  isIncome: isIncome, 
                  classId: item.classId,
                  className: item.className,
                  iconImg: item.icon,
                  iconColor: item.color
                }
              }">
              <div :class="['icon', 'color_' + item.color, 'icon_' + item.icon]"></div>
              <div class="information">
                <div class="text">
                  <div class="class">{{ item.className }}<span>{{ calculatePercentage[index] }}%</span></div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <hr class="lineChart" :style="{width: calculatePercentage[index] + '%'}">
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import monthlyCalendar from '@/components/find/monthlyCalendar.vue'
import cssIcon_arrowLeft from '@/components/public/cssIcon_arrowLeft.vue';
import router from '@/router'

export default {
  name: 'statistics',
  components: {
    monthlyCalendar, cssIcon_arrowLeft
  },
  data() {
    return {
      classList: [],
      recordList: [],
      statisticsList: [
        // { id: 'zxc123', class: '正餐', icon: 0, color: 0, number: 2000 },
      ],
      year: 0,
      month: 0,
      isIncome: false,
    }
  },
  created(){
    let routeQuery = this.$route.query;
    this.year     = routeQuery.year? Number(routeQuery.year) : new Date().getFullYear();
    this.month    = routeQuery.month? Number(routeQuery.month) : new Date().getMonth() + 1;
    this.isIncome = routeQuery.isIncome? routeQuery.isIncome : this.isIncome;
    let xhr = new XMLHttpRequest();
    let _this = this;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        let res = JSON.parse(xhr.response);
        _this.classList = res.classList.filter(item => {
          return item.typeIsIncome == _this.isIncome;
        });
        _this.recordList = res.record.filter(item => {
          return item.typeIsIncome == _this.isIncome;
        });
        _this.classList.forEach(item => {
          let sum = 0;
          _this.recordList.forEach(recordItem => {
            if(recordItem.classId == item._id) sum += recordItem.value;
          })
          _this.statisticsList.push({
            classId: item._id,
            className: item.className,
            icon: item.iconImg,
            color: item.iconColor,
            number: sum,
          });
        });
        _this.statisticsList.sort((a, b) => {
          return b.number - a.number;
        });
      } 
    };
    xhr.open('post', '/api/readRecord_aMonth', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
      email: localStorage.getItem('email'),
      loginCodeName: localStorage.getItem('loginCodeName'),
      isIncome: this.isIncome,
      year: this.year,
      month: this.month,
    }));
  },
  computed: {
    IncomeOrCost(){
      return this.isIncome ? '收入' : '支出';
    },
    totalCost(){
      let totalCost = 0;
      this.statisticsList.forEach(item => {
        totalCost += item.number;
      });
      return totalCost;
    },
    calculatePercentage(){
      let costPercentage = [];
      this.statisticsList.forEach(item => {
        let percentage = (item.number / this.totalCost) * 100;
        percentage = Math.round(percentage);
        costPercentage.push(percentage);
      });
      return costPercentage;
    },
  },
  beforeMount() {
    if(this.$route.query.isIncome){
      this.isIncome = this.$route.query.isIncome;
    }
  },
  mounted() {
  },
  methods: {
    back(){
      router.go(-1);
    },
  },
}
</script>
<style lang="scss" src="@/scss/find/statistics.scss"></style>