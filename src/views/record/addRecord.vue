<template>
  <div class="addRecord" @click="toggleTypeMenu(false)">
    <header>
      <div class="container">
        <div class="left" v-clickStyle @click="back">
          <cssIcon_arrowLeft></cssIcon_arrowLeft>
        </div>
        <div class="center">
          <div class="typeSelector" :class="{'open': type.selectorIsOpen}">
            <div class="headerTitle" v-clickStyle @click.stop="toggleTypeMenu()">{{ type.isIncome ? '收入' : '支出' }}</div>
            <ul>
              <li @click="selectType(false)" :class="{'now': type.isIncome == false}">支出</li>
              <li @click="selectType(true )" :class="{'now': type.isIncome == true }">收入</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <ul class="classSelector">
          <li v-for="(item, index) in classList[type.isIncome ? 'income' : 'cost']"
              :key="index" 
              :class="{'gray': index !== classSelectIndex[type.isIncome ? 'income' : 'cost']}"
              @click="selectClass(index)">
            <div class="icon" :class="['icon_'+ item.iconImg, 'color_'+ item.iconColor]"></div>
            <span>{{ item.className }}</span>
          </li>
          <li>
            <router-link to="addClass">
              <div>+</div>
              <span>添加類別</span>
            </router-link>
          </li>
        </ul>
        <div class="form" :class="[{'open': form.isOpen}, {'enterDescription': form.description.onFocus}]">
          <div class="input">
            <input class="description"
                   type="text" placeholder="備註"
                   @focus="inputOnFocus(true)" 
                   @blur="inputOnFocus(false)" 
                   v-model="form.description.value">
            <div class="calculate">
              <template v-if="form.recordNumber.calculate.calculateMode">
                <div class="before">{{          form.recordNumber.calculate.before            }}</div>
                <div class="calculateSmybol">{{ form.recordNumber.calculate.isAdd ? '+' : '-' }}</div>
                <div class="after">{{           form.recordNumber.calculate.after             }}</div>
              </template>
              <template v-else>
                <div>{{ form.recordNumber.value }}</div>
              </template>
            </div>
          </div>
          <div class="keyboard">
            <ol class="number">
              <li v-clickStyle v-for="(i, index) in 10" @click="enterNumber(index)">{{ index }}</li>
              <li              class="other"> </li>
              <li v-clickStyle class="delete" @click="deleteNumber">delete</li>
            </ol>
            <div>
              <div v-clickStyle class="calendarBtn" @click="toggleCalendar(true)">
                <span v-if="
                  (form.date.year == today.year) && 
                  (form.date.month == today.month) && 
                  (form.date.day == today.day)
                ">今天</span>
                <span v-else>{{form.date.year}}</span>
                <span>{{ form.date.month }}/{{ form.date.day }}</span>
              </div>
              <div v-clickStyle class="add" @click="runCalculate(true)">+</div>
              <div v-clickStyle class="subtract" @click="runCalculate(false)"><span>-</span></div>
              <div class="submit">
                <div v-if="!form.recordNumber.calculate.calculateMode" class="cssIcon cssIcon_check" @click="submit">
                  <div></div>
                </div>
                <div v-else class="calculate" @click="calculateIsDone">=</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <calendar 
      v-if="mounted" 
      @cancelSelect="cancelSelect"
      @checkedDate="checkedDate"
      :dateInformation="form.date" 
      :isOpenFromParent="calendarIsOpen"></calendar>
  </div>
</template>

<script>
import router from '@/router'
import calendar from '@/components/record/calendar.vue'
import classBtn from '@/components/record/classBtn.vue'
import keyboard from '@/components/record/keyboard.vue'
import cssIcon_arrowLeft from '@/components/public/cssIcon_arrowLeft.vue'

export default {
  name: 'addRecord',
  components: {
    calendar, classBtn, keyboard,
    cssIcon_arrowLeft
  },
  data() {
    return {
      // recordId: '',
      type: {
        isIncome: false,
        selectorIsOpen: false,
      },
      classSelectIndex: {
        income: null,
        cost: null
      },
      form: {
        isOpen: false,
        description: {
            value: '',
            onFocus: false
        },
        date: {
          year: 0,
          month: 0,
          day: 0
        },
        recordNumber: {
          value: '0',
          calculate: {
            calculateMode: false,
            before: '',
            after: '',
            isAdd: true,
          }
        }
      },
      timestamp: [],
      mounted: false,
      calendarIsOpen: false
    }
  },
  computed: {
    classList(){
      return this.$store.state.classList;
    },
    recordId(){
      return this.$route.query.id;
    },
    record(){
      return this.$store.state.recordList.find(item => {
        return item._id == this.recordId;
      });
    },
    today(){
      let date = new Date();
      return {
        year:   date.getFullYear(),
        month:  date.getMonth() + 1,
        day:    date.getDate(),
        // dayOfTheWeek: date.getDay()
      }
    },
  },
  beforeMount(){
    
    // 初始化日期
    this.form.date = {
      year: this.recordId ? this.record.year : this.today.year,
      month: this.recordId ? this.record.month : this.today.month,
      day: this.recordId ? this.record.day : this.today.day,
    }
    // 修改帳目
    if(this.recordId){
      let id = this.recordId;
      this.recordId = id;
      this.type.isIncome = this.record.typeIsIncome;
      this.form.description.value = this.record.description;
      this.form.recordNumber.value = this.record.typeIsIncome ? this.record.value.toString() : (this.record.value * -1).toString();
      this.form.isOpen = true;
      this.timestamp = this.record.timestamp;
      let _this = this;
      let classOrder = this.classList[this.record.typeIsIncome?'income':'cost'].filter(function(item){
        return _this.record.classId == item._id;
      })[0].order;
      this.classSelectIndex[this.record.typeIsIncome?'income':'cost'] = classOrder;
    }
  },
  mounted() {
    this.mounted = true;
  },
  methods: {
    //calendar
    toggleCalendar(toggleDirection){
      if(toggleDirection !== undefined){
        this.calendarIsOpen = toggleDirection;
      } else {
        this.calendarIsOpen = !this.calendarIsOpen;
      }
    },
    cancelSelect(){
      this.calendarIsOpen = false;
    },
    checkedDate(selectDate){
      this.calendarIsOpen = false;
      this.form.date = selectDate;
    },

    // calculate
    runCalculate(isAdd){
      let calculate = this.form.recordNumber.calculate;
      if(calculate.calculateMode){
        calculate.before = Number(calculate.before) + (Number(calculate.after) * (calculate.isAdd ? 1 : -1));
        calculate.before = calculate.before.toString();
        calculate.isAdd = isAdd;
        calculate.after = '';
      } else {
        calculate.after = '';
        calculate.calculateMode = true;
        calculate.isAdd = isAdd;
        calculate.before = this.form.recordNumber.value;
      }
    },
    calculateIsDone(){
      let calculate = this.form.recordNumber.calculate;
      calculate.calculateMode = false;
      calculate.after = Number(calculate.after) * (calculate.isAdd ? 1 : -1);
      this.form.recordNumber.value = (Number(calculate.before) + calculate.after).toString();
    },
    enterNumber(num){
      if(this.form.recordNumber.calculate.calculateMode){
        this.form.recordNumber.calculate.after += num;
      } else {
        if(this.form.recordNumber.value == '0'){
          this.form.recordNumber.value = num.toString();
        } else {
          this.form.recordNumber.value += num.toString();
        }
      }
    },
    deleteNumber(){
      if(this.form.recordNumber.calculate.calculateMode){
          let calculate = this.form.recordNumber.calculate;
          calculate.after = calculate.after.substr(0, calculate.after.length);
        } else {
          let recordNumber = this.form.recordNumber;
          recordNumber.value = recordNumber.value.substr(0, recordNumber.value.length - 1);
      }
    },

    //other
    toggleTypeMenu(toggleDirection){
      if(toggleDirection !== undefined){
        this.type.selectorIsOpen = toggleDirection;
      } else {
        this.type.selectorIsOpen = !this.type.selectorIsOpen;
      }
    },
    selectType(isIncome){
      this.type.isIncome = isIncome;
      this.type.selectorIsOpen = false;
    },
    selectClass(selectIndex){
      this.classSelectIndex[this.type.isIncome ? 'income' : 'cost'] = selectIndex;
      this.form.isOpen = true;
      this.type.selectorIsOpen = false;
    },
    inputOnFocus(onFocus){
      if(onFocus !== undefined){
        this.form.description.onFocus = onFocus;
      } else {
        this.form.description.onFocus = !this.form.description.onFocus;
      }
    },
    back(){
      router.go(-1);
    },
    submit(){
      this.$store.commit('updateRecord', {
          isNew: this.recordId ? false : true,
          recordId: this.recordId ? this.recordId : null,
          classId: this.$store.state.classList[this.type.isIncome?'income':'cost'][this.classSelectIndex[this.type.isIncome?'income':'cost']],
          typeIsIncome: this.type.isIncome,
          description: this.form.description.value,
          value: Number(this.form.recordNumber.value),
          year: this.form.date.year,
          month: this.form.date.month,
          day: this.form.date.day,
          timestamp: this.timestamp,
      });       
      this.back();
    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/record/addRecord.scss"></style>