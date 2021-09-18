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
          {{ month }}月
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
                path: 'recordDetail', 
                query: {
                  year: year,
                  month: month,
                  isIncome: this.$route.query.isIncome,
                  class: item.class
                }
              }"
              v-clickStyle 
              v-for="(item, index) in recordList"
            >
              <div :class="['icon', 'color_' + iconColor, 'icon_' + iconImg]"></div>
              <div class="information">
                <div class="text">
                  <div class="class">
                    {{ className }}
                    <span>{{ item.description }}</span>
                    <span>{{ calculatePercentage[index] }}%</span>
                  </div>
                  <div class="number">{{ item.value }}</div>
                </div>
                <hr class="lineChart" :style="{width: calculatePercentage[index] + '%'}">
                <div class="date">{{ year +'/'+ month +'/'+ item.day }}</div>
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
      year: this.$route.query.year,
      month: this.$route.query.month,
      className: this.$route.query.className,
      iconImg: this.$route.query.iconImg,
      iconColor: this.$route.query.iconColor,
      recordList: [],
      isIncome: JSON.parse(this.$route.query.isIncome),
    }
  },
  created(){
    let _this = this;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        let res = JSON.parse(xhr.response);
        res.sort((a, b) => {
          return b.value - a.value;
        })
        _this.recordList = res;
      }
    };
    xhr.open('post', '/api/readRecord_aClasswithinAMonth', false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
      email: localStorage.getItem('email'),
      loginCodeName: localStorage.getItem('loginCodeName'),
      classId: this.$route.query.classId,
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
      this.recordList.forEach(item => {
        totalCost += item.value;
      });
      return totalCost;
    },
    calculatePercentage(){
      let costPercentage = [];
      this.recordList.forEach(item => {
        let percentage = (item.value / this.totalCost) * 100;
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
<style scoped lang="scss" src="@/scss/find/classDetail.scss"></style>