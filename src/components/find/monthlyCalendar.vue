<template>
  <div class="monthlyCalendar"
        @click="toggleCalendar()"
        v-clickStyle
        :class="{'mousedown': false, 'open': calendarIsOpen}">
    <div @click="toggleCalendar(false)" v-stopPropagation class="backgroundCover"></div>
    <span>8月</span>
    <div class="calendar" @click.stop="toggleCalendar()">
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
</template>
<script>
export default {
  name: 'monthlyCalendar',
  data() {
    return {
      nowYear: 2021,
      nowMonth: 8,
      calendarIsOpen: false
    }
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
      this.nowYear = this.nowYear + toggleDirection;
    },
    toggleMonth(selectMonth){
      this.nowMonth = selectMonth;
      this.toggleCalendar();
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/monthlyCalendar.scss"></style>
