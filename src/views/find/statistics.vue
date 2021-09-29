<template>
  <div class="statistics">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          <monthlyCalendar @selectOtherMonth="init"></monthlyCalendar>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <h2>{{ isIncome ? '收入':'支出' }}列表</h2>
          <div class="list">
            <router-link 
              v-for="(item, index) in statisticsList"
              :key="index"
              v-clickStyle
              :to="{
                path: 'classDetail', 
                query: { 
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
      isIncome: false,
    }
  },
  created(){
    this.init();
  },
  computed: {
    totalCost(){
      let totalCost = 0;
      this.statisticsList.forEach(item => {
        totalCost += item.number;
      });
      return totalCost;
    },
    calculatePercentage(){
      let _this = this;
      let costPercentage = [];
      this.statisticsList.forEach(item => {
        let percentage = _this.totalCost !== 0 ? (item.number / _this.totalCost) * 100 : 0;
        percentage = Math.round(percentage);
        costPercentage.push(percentage);
      });
      return costPercentage;
    },
  },
  methods: {
    init(){
      let routeQuery = this.$route.query;
      if(routeQuery.isIncome) this.isIncome = JSON.parse(routeQuery.isIncome);
      let _this = this;
      let storeClassList = this.$store.state.classList;
      this.classList = storeClassList.income.concat(storeClassList.cost).filter(item => {
        return item.typeIsIncome == _this.isIncome;
      });
      this.recordList = this.$store.state.recordList.filter(item => {
        return item.typeIsIncome == _this.isIncome;
      });
      this.statisticsList = [];
      this.classList.forEach(item => {
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
    },
    back(){
      router.go(-1);
    },
  },
}
</script>
<style lang="scss" src="@/scss/find/statistics.scss"></style>