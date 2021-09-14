<template>
  <div class="monthlyCalendar"
        @click="toggleCalendar()"
        v-clickStyle
        :class="{'mousedown': false, 'open': calendarIsOpen}">
    <div @click="toggleCalendar(false)" v-stopPropagation class="backgroundCover"></div>
    <span class="headerTitle">{{ selectMonth }}月</span>
    <div class="calendar" @click.stop="toggleCalendar()">
      <div class="container">
        <div class="year">
          <div @click.stop="toggleYear(-1)" v-clickStyle></div>
          <span>{{selectYear}}</span>
          <div @click.stop="toggleYear(1)" v-clickStyle></div>
        </div>
        <ol>
          <li v-for="m in 12" 
              :key="m" 
              :class="{'now': m == parentMonth && selectYear == parentYear}"
              @click="toggleMonth(m)"
          >{{m}}月</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'monthlyCalendar',
  props: ['parentYear', 'parentMonth'],
  data() {
    return {
      calendarIsOpen: false,
      selectYear: 0,
      selectMonth: 0,
    }
  },
  created(){
      this.selectYear = this.parentYear;
      this.selectMonth = this.parentMonth;
  },
  methods: {
    toggleCalendar(toggleDirection){
      if(toggleDirection != undefined){
        this.calendarIsOpen = toggleDirection;
      } else {
        this.calendarIsOpen = !this.calendarIsOpen;
      }
      event.stopPropagation();
    },
    toggleYear(toggleDirection){
      this.selectYear = this.selectYear + toggleDirection;
    },
    toggleMonth(selectMonth){
      this.selectMonth = selectMonth;
      this.$emit('selectOtherMonth', {
          selectYear: this.selectYear, 
          selectMonth: this.selectMonth
      });
      this.toggleCalendar();
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/find/monthlyCalendar.scss"></style>
