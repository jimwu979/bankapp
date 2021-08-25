<template>
  <div class="statistics">
    <header>
      <div class="container">
        <div class="left" @click="back">
          <hr>
          <hr>
          <hr>
        </div>
        <div class="center">
          <monthlyCalendar></monthlyCalendar>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <h2>{{ IncomeOrCost }}列表</h2>
          <div class="list">
            <a href="#" v-for="(item, index) in costList">
              <div :class="['icon', 'color_' + item.color, 'icon_' + item.icon]"></div>
              <div class="information">
                <div class="text">
                  <div class="class">{{ item.class }}<span>{{ calculatePercentage[index] }}%</span></div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <hr class="lineChart" :style="{width: calculatePercentage[index] + '%'}">
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import monthlyCalendar from '@/components/find/monthlyCalendar.vue'

export default {
  name: 'statistics',
  components: {
    monthlyCalendar
  },
  data() {
    return {
      costList: [
        { class: '正餐',    icon: 0, color: 0, number: 4820 },
        { class: '生活費',  icon: 1, color: 1, number: 2749 },
        { class: '其他',    icon: 2, color: 2, number: 2522 },
        { class: '酒精',    icon: 3, color: 3, number: 1240 },
        { class: '儲糧',    icon: 4, color: 4, number: 962 },
        { class: '電話費',  icon: 5, color: 5, number: 609 },
        { class: '飲料',    icon: 6, color: 6, number: 508 },
        { class: '零時',    icon: 7, color: 7, number: 465 },
      ],
      year: 2021,
      month: 8,
      typeIsIncome: false,
    }
  },
  computed: {
    IncomeOrCost(){
      return this.typeIsIncome ? '收入' : '支出'
    },
    totalCost(){
      let totalCost = 0;
      this.costList.forEach(item => {
        totalCost += item.number;
      });
      return totalCost;
    },
    calculatePercentage(){
      let costPercentage = [];
      this.costList.forEach(item => {
        let percentage = (item.number / this.totalCost) * 100;
        percentage = Math.round(percentage);
        costPercentage.push(percentage);
      });
      return costPercentage;
    },
  },
  methods: {
    back(){
      window.history.go(-1);
    },
  },
}
</script>
<style lang="scss" src="@/scss/statistics.scss"></style>