<template>
  <div class="calendar fixbox" :class="{'open': isOpenFromParent}">
    <div class="lightbox">
      <div class="title">
        <span>{{ today.year }}年</span>
        <h2>{{ today.month }}月{{ today.day }}日 週{{ ['日', '一', '二', '三', '四', '五', '六'][today.dayOfTheWeek] }}</h2>
      </div>
      <div class="content">
        <div class="selectMonth">
          <span @click="selectMonth(-1)"></span>
          <div>{{ year }}年{{ month }}月</div>
          <span @click="selectMonth(1)"></span>
        </div>
        <div class="selectDay">
          <ol>
            <li v-for="d in ['日', '一', '二', '三', '四', '五', '六']">{{ d }}</li>
          </ol>
          <ol>
            <li v-for="(n, index) in firstDayOfTheWeek" :key="n"></li>
            <li v-for="(d, index) in NumberOfDays     " :key="d" 
                :class="{'select': (index + 1 == selectDate.day) && 
                                    (year == selectDate.year) && 
                                    (month == selectDate.month)}"
                @click.stop="selectDay(d)">{{ d }}</li>
          </ol>
        </div>
        <div class="action">
          <div @click="cancelSelect">取消</div>
          <div @click="checkedDate">確定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  props: ['dateInformation', 'isOpenFromParent'],
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      NumberOfDays: 0,
      firstDayOfTheWeek: 0,
      selectDate: {
        year: 0,
        month: 0,
        day: 0
      },
      isOpen: false,
    }
  },
  mounted() {
    this.initCalendar();
  },
  computed: {
    today(){
      let today = new Date();
      return {
        year:   today.getFullYear(),
        month:  today.getMonth() + 1,
        day:    today.getDate(),
        dayOfTheWeek: today.getDay()
      }
    },
  },
  methods: {
    initCalendar(){
      this.isOpen = this.isOpenFromParent;
      let formY = this.dateInformation.year;
      let formM = this.dateInformation.month;
      this.NumberOfDays = new Date(formY, formM, 0).getDate();
      this.firstDayOfTheWeek = new Date(formY + "/"+ formM +"/1").getDay();
      this.year = this.dateInformation.year;
      this.month = this.dateInformation.month;
      this.day = this.dateInformation.day;
      this.selectDate.year = this.dateInformation.year;
      this.selectDate.month = this.dateInformation.month;
      this.selectDate.day = this.dateInformation.day;
    },
    selectDay(day){
      this.selectDate = {
        year: this.year,
        month: this.month,
        day: day
      }
    },
    selectMonth(selectDirection){
      this.month += selectDirection;
      if(this.month >= 13){
        this.month = 1;
        this.year++;
      } 
      else if (this.month <= 0){
        this.month = 12;
        this.year--;
      }
      this.NumberOfDays = new Date(this.year, this.month, 0).getDate();
      this.firstDayOfTheWeek = new Date(this.year + "/"+ this.month +"/1").getDay();
      this.day = 0;
    },
    cancelSelect(){
      this.isOpen = false;
      this.$emit('cancelSelect');
    },
    checkedDate(){
      this.isOpen = false;
      this.$emit('checkedDate', this.selectDate);
    },
  },
}
</script>

<style scoped lang="scss" src="@/scss/record/calendar.scss"></style>