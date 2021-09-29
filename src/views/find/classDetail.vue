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
          <h2>{{ isIncome ? '收入' : '支出' }}列表</h2>
          <div class="list">
            <router-link v-clickStyle v-for="(item, index) in recordList"
              :to="{ path: 'recordDetail', query: { id: item._id}}">
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
      className: this.$route.query.className,
      iconImg: this.$route.query.iconImg,
      iconColor: this.$route.query.iconColor,
      recordList: [],
      isIncome: JSON.parse(this.$route.query.isIncome),
    }
  },
  computed: {
    year(){
      return this.$store.state.selectMonth.year;
    },
    month(){
      return this.$store.state.selectMonth.month;
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
  created(){
    this.recordList = this.$store.state.recordList.filter((item) => {
      return item.classId == this.$route.query.classId;
    });
    this.recordList.sort((a, b) => {
      return b.value - a.value;
    });
  },
  methods: {
    back(){
      router.go(-1);
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/find/classDetail.scss"></style>