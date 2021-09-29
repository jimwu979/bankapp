<template>
  <div class="monthlyCalendar"
        @click="toggleCalendar()"
        v-clickStyle
        :class="{'mousedown': false, 'open': calendarIsOpen}">
    <div @click="toggleCalendar(false)" v-stopPropagation class="backgroundCover"></div>
    <span class="headerTitle">{{ selectMonth.month }}月</span>
    <div class="calendar" @click.stop="toggleCalendar()">
      <div class="container">
        <div class="year">
          <div @click.stop="toggleYear(-1)" v-clickStyle></div>
          <span>{{menuYear}}</span>
          <div @click.stop="toggleYear(1)" v-clickStyle></div>
        </div>
        <ol>
          <li v-for="m in 12" 
              :key="m" 
              :class="{'now': m == selectMonth.month && menuYear == selectMonth.year}"
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
      calendarIsOpen: false,
      menuYear: 0,
    }
  },
  created(){
    this.menuYear = this.selectMonth.year;
  },
  computed: {
    selectMonth(){
      return this.$store.state.selectMonth;
    },
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
      this.menuYear = this.menuYear + toggleDirection;
    },
    toggleMonth(selectMonth){
      this.$store.commit('selectMonth', {
          year: this.menuYear, 
          month: selectMonth,
      });
      this.$emit('selectOtherMonth');
      this.toggleCalendar();
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/find/monthlyCalendar.scss"></style>
