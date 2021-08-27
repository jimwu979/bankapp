<template>
  <div class="classDetail">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <hr>
          <hr>
          <hr>
        </div>
        <div class="center headerTitle">
          {{ nowMonth }}月
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="board">
          <h2>{{ IncomeOrCost }}列表</h2>
          <div class="list">
            <router-link
              :to="{
                path: 'record', 
                query: {
                  year: nowYear,
                  month: nowMonth,
                  isIncome: this.$route.query.isIncome,
                  class: item.class
                }
              }"
              v-clickStyle 
              v-for="(item, index) in costList"
            >
              <div :class="['icon', 'color_' + item.color, 'icon_' + item.icon]"></div>
              <div class="information">
                <div class="text">
                  <div class="class">
                    {{ nowClass }}
                    <span>{{ item.description }}</span>
                    <span>{{ calculatePercentage[index] }}%</span>
                  </div>
                  <div class="number">{{ item.number }}</div>
                </div>
                <hr class="lineChart" :style="{width: calculatePercentage[index] + '%'}">
                <div class="date">{{ nowYear +'/'+ nowMonth +'/'+ item.day }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'classDetail',
  components: {
    // board, header, nav
  },
  data() {
    return {
      nowYear: 2021,
      nowMonth: 8,
      nowClass: '正餐',
      costList: [
        { day: 1,  icon: 2, color: 4, number: 4820, description: '備註備註' },
        { day: 5,  icon: 2, color: 4, number: 2749, description: null },
        { day: 12, icon: 2, color: 4, number: 2522, description: null },
        { day: 16, icon: 2, color: 4, number: 1240, description: '備註備註備註備註備註備註' },
        { day: 17, icon: 2, color: 4, number: 962,  description: null },
        { day: 18, icon: 2, color: 4, number: 609,  description: null },
        { day: 27, icon: 2, color: 4, number: 508,  description: null },
        { day: 29, icon: 2, color: 4, number: 465,  description: null },
      ],
      isIncome: JSON.parse(this.$route.query.isIncome),
    }
  },
  computed: {
    IncomeOrCost(){
      return this.isIncome ? '收入' : '支出';
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
      router.go(-1);
    },
  },
}
</script>
<style lang="scss" src="@/scss/find/classDetail.scss"></style>