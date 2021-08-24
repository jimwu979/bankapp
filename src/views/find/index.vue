<template>
  <div class="index">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="openNav">
          <hr>
          <hr>
          <hr>
        </div>
        <div class="center">
          <div class="month"
               @click="toggleCalendar()"
               v-clickStyle
               :class="{'mousedown': false, 'open': CalendarIsOpen}">
            <div @click="toggleCalendar(false)" v-stopPropagation class="backgroundCover"></div>
            <span>8月</span>
            <!-- <monthlyCalendar></monthlyCalendar> -->
            <div class="monthlyCalendar" @click.stop="toggleCalendar()">
              <div class="container">
                <div class="year">
                  <div @click.stop="toggleYear(-1)" v-clickStyle></div>
                  <span>{{nowYear}}</span>
                  <div @click.stop="toggleYear(1)" v-clickStyle></div>
                </div>
                <ol>
                  <li v-for="m in 12" 
                      :key="m" 
                      :class="{'now': m == nowMonth}"
                      @click="toggleMonth(m)"
                  >{{m}}月</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="total board">
          <router-link class="totalType"
            :to="{ path: '/record/addRecord', query: { year: nowYear, month: nowMonth, type: 'income'}}">
            <span>收入</span>
            <span>{{ total.income }}</span>
          </router-link>
          <router-link class="totalType"
            :to="{ path: '/record/addRecord', query: { year: nowYear, month: nowMonth, type: 'cost'}}">
            <span>支出</span>
            <span>{{ total.cost }}</span>
          </router-link>
          <div class="totalType">
            <span>結餘</span>
            <span>{{ total.balance }}</span>
          </div>
        </div>
        <div class="day board" v-for="(day, day_index) in costList" :key="day_index">
          <div class="title">
            <div>{{nowMonth}}/{{costList[day_index]['date']}} 週四</div>
            <div>支出: <span>{{dailyCost[day_index]}}</span></div>
          </div>
          <div class="cost_list">
            <router-link class="cost_item" v-clickStyle
              v-for="(items, i_index) in costList[day_index]['items']"
              :key="i_index"
              :to="{ path: '/record/addRecord', query: { year: nowYear, month: nowMonth, day: day.date}}"
            >
              <div :class="['icon', 'color_' + i_index, 'icon_' + i_index]"></div>
              <div class="class">{{items.class}}<span>{{items.description}}</span></div>
              <div class="number">{{items.number}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </main>
    <router-link class="add_record" to="/record/addRecord"></router-link>
  </div>
</template>

<script>
import monthlyCalendar from '@/components/find/monthlyCalendar.vue'

export default {
  name: 'index',
  components: {
    monthlyCalendar
  },
  data() {
    return {
      costList: [
        {
          date: 1,
          items: [
            { class: '生活費',  icon: 2, color: 6, income: true,  description: '', number: 20000 },
            { class: '主餐',    icon: 2, color: 6, income: false, description: '', number: -120 },
            { class: '其他',    icon: 2, color: 6, income: false, description: '備註備註備註備註備註', number: -15 },
            { class: '零食',    icon: 3, color: 6, income: false, description: '', number: -15 },
          ]
        },
        {
          date: 6,
          items: [
            { class: '主餐',    icon: 2, color: 6, income: false, description: '備註備註備註', number: -210 },
            { class: '零食',    icon: 3, color: 6, income: false, description: '', number: -135 },
            { class: '其他',    icon: 2, color: 6, income: false, description: '', number: -657 },
          ]
        },
        {
          date: 12,
          items: [
            { class: '零食',    icon: 3, color: 6, income: false, description: '', number: -12 },
            { class: '主餐',    icon: 2, color: 6, income: false, description: '', number: -20 },
            { class: '其他',    icon: 2, color: 6, income: false, description: '', number: -65 },
          ]
        },
        {
          date: 14,
          items: [
            { class: '主餐',    icon: 2, color: 6, income: false, description: '', number: -210 },
            { class: '其他',    icon: 2, color: 6, income: false, description: '', number: -65 },
            { class: '其他',    icon: 2, color: 6, income: false, description: '備註備註備註備註備註備註備註備註備註備註備註備註備註備註備註', number: -600 },
            { class: '其他',    icon: 2, color: 6, income: false, description: '', number: -10 },
            { class: '零食',    icon: 3, color: 6, income: false, description: '', number: -35 },
          ]
        },
      ],
      nowYear: 2021,
      nowMonth: 8,
      CalendarIsOpen: false,
      clickItemsIndex: [null, null]
    }
  },
  computed: {
    total(){
      let dayLength = this.costList.length;
      let income = 0;
      let cost = 0;
      for(let m = 0; m < dayLength; m++){
        let constItemsLength = this.costList[m].items.length;
        for(let n = 0; n < constItemsLength; n++){
          let costItems = this.costList[m].items[n];
          if(costItems.income){
            income += costItems.number;
          } else {
            cost += costItems.number;
          }
        }
      }
      cost = Math.abs(cost);
      let balance = income - cost;
      return {income, cost, balance}
    },
    dailyCost(){
      const dayLength = this.costList.length;
      let dailyCost = [];
      for(let i = 0; i < dayLength; i++){
        let costTotal = 0;
        this.costList[i].items.forEach(element => {
          costTotal += element.number;
        });
        dailyCost.push(costTotal);
      }
      return dailyCost;
    },
  },
  methods: {
    toggleCalendar(toggleDirection){
      if(toggleDirection != undefined){
        this.CalendarIsOpen = toggleDirection;
      } else {
        this.CalendarIsOpen = !this.CalendarIsOpen;
      }
      event.stopPropagation();
    },
    toggleYear(toggleDirection){
      this.nowYear = this.nowYear + toggleDirection;
    },
    toggleMonth(selectMonth){
      this.nowMonth = selectMonth;
    },
    openNav(){
      this.$emit('openNav');
    },
  },
}
</script>
<style lang="scss" src="@/scss/index.scss"></style>