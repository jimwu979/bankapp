<template>
  <div class="index">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="openNav">
          <cssIcon_hamburger></cssIcon_hamburger>
        </div>
        <div class="center">
          <monthlyCalendar @selectOtherMonth="switchMonth" :parentYear="selectYear" :parentMonth="selectMonth"></monthlyCalendar>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="total board">
          <router-link class="totalType"
            :to="{ path: '/statistics', query: { year: selectYear, month: selectMonth, isIncome: true}}">
            <span>收入</span>
            <span>{{ total.income }}</span>
          </router-link>
          <router-link class="totalType"
            :to="{ path: '/statistics', query: { year: selectYear, month: selectMonth, isIncome: false}}">
            <span>支出</span>
            <span>{{ total.cost }}</span>
          </router-link>
          <div class="totalType">
            <span>結餘</span>
            <span>{{ total.balance }}</span>
          </div>
        </div>
        <div class="day board" v-for="(day, day_index) in costList" v-show="day.length > 0" :key="day_index">
          <div class="title">
            <div>{{selectMonth}}/{{ day_index + 1 }} 週{{ dayOfTheWeek[day_index] }}</div>
            <div>收支: <span>{{dailyCost[day_index]}}</span></div>
          </div>
          <div class="cost_list">
            <router-link class="cost_item" v-clickStyle
              v-for="(item, i_index) in costList[day_index]"
              :key="i_index"
              :to="{ path: 'recordDetail', query: { year: selectYear, month: selectMonth, day: day.date}}"
            >
              <div :class="['icon', 'color_' + item.iconColor, 'icon_' + item.iconImg]"></div>
              <div class="class">{{item.className}}<span>{{item.description}}</span></div>
              <div class="number">{{item.value}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </main>
    <router-link class="add_record" to="/addRecord">
      <cssIcon_add></cssIcon_add>
    </router-link>
  </div>
</template>
<script>
import monthlyCalendar from '@/components/find/monthlyCalendar.vue'
import cssIcon_hamburger from '@/components/public/cssIcon_hamburger.vue'
import cssIcon_add from '@/components/public/cssIcon_add.vue'
import moment from 'moment'
export default {
  name: 'index',
  components: {
    monthlyCalendar, cssIcon_hamburger, cssIcon_add
  },
  data() {
    return {
      classList: [
        // {_id: '', className: '', iconImg: 0, iconColor: 0, typeIsIncome: false},
      ],
      costList: [
        // { 
        //   classId: 'abcd1234', 
        //   className: '生活費', 
        //   iconImg: 2, 
        //   iconColor: 6, 
        //   typeIsIncome: true, 
        //   description: '', 
        //   value: 20000, 
        //   year: 2021,
        //   month: 9,
        //   day: 2 
        // },
      ],
      selectYear: 2021,
      selectMonth: 9,
      CalendarIsOpen: false,
      clickItemsIndex: [null, null],
    }
  },
  beforeMount(){
    this.init();
  },
  computed: {
    total(){
      let dayLength = this.costList.length;
      let income = 0;
      let cost = 0;
      for(let d = 0; d < dayLength; d++){
        let costItemsLength = this.costList[d].length;
        for(let n = 0; n < costItemsLength; n++){
          let costItems = this.costList[d][n];
          if(costItems.typeIsIncome){
            income += costItems.value;
          } else {
            cost += costItems.value;
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
        this.costList[i].forEach(element => {
          costTotal += element.value;
        });
        dailyCost.push(costTotal);
      }
      return dailyCost;
    },
    dayOfTheWeek(){
      let year = this.selectYear;
      let month = this.selectMonth;
      let numberOfDays = new Date(year, month, 0).getDate();
      let dayOfTheWeek = [];
      for(let d=1; d<=numberOfDays; d++){
        let day = new Date(year + '/'+ month +'/' + d).getDay();
        dayOfTheWeek.push(['日', '一', '二', '三', '四', '五', '六'][day]);
      }
      return dayOfTheWeek;
    }
  },
  methods: {
    openNav(){
      this.$emit('openNav');
    },
    switchMonth(newTime){
      this.selectYear = newTime.selectYear;
      this.selectMonth = newTime.selectMonth;
      this.init();
    },
    init(){
      // 初始化 天數
      this.costList = [];
      let numberOfDays = new Date(this.selectYear, this.selectMonth, 0).getDate();
      for(let d = 0; d < numberOfDays; d++){
        this.costList.push([]);
      }

      // 載入帳目資料
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          let res = JSON.parse(xhr.response);
          _this.classList = res.classList;
          res.record.forEach(function(item){
            let classItem = _this.classList.filter(function(_class){
              return _class._id == item.classId;
            });
            item.iconColor = classItem[0].iconColor;
            item.iconImg = classItem[0].iconImg;
            item.className = classItem[0].className;
            item.value = (item.typeIsIncome) ? item.value : item.value * -1;
            _this.costList[item.day - 1].push(item);
          });
        }
      };
      xhr.open('post', '/api/readRecord', false);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        year: this.selectYear,
        month: this.selectMonth,
      }));
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/find/index.scss"></style>