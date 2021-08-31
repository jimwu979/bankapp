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
          <li v-for="(item, index) in _class.list" 
              :key="index" 
              :class="{'gray': index !== _class.selectIndex}"
              @click="selectClass(index)">
            <div class="icon" :class="['icon_'+ item.icon, 'color_'+ item.color]"></div>
            <span>{{ item.name }}</span>
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
                <span>{{ form.date.month }}/{{ form.date.day }}</span>
              </div>
              <div v-clickStyle class="add" @click="runCalculate(true)">+</div>
              <div v-clickStyle class="subtract" @click="runCalculate(false)"><span>-</span></div>
              <div class="submit">
                <div v-if="!form.recordNumber.calculate.calculateMode" class="cssIcon cssIcon_check" @click="back">
                  <div></div>
                </div>
                <div v-else class="calculate" @click="calculateIsDone">=</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="fixbox" :class="{'open': calendar.isOpen}">
      <div class="lightbox">
        <div class="title">
          <span>{{ today.year }}年</span>
          <h2>{{today.month}}月{{today.day}}日 週{{ ['日', '一', '二', '三', '四', '五', '六'][today.dayOfTheWeek] }}</h2>
        </div>
        <div class="content">
          <div class="selectMonth">
            <span @click="selectMonth(-1)"></span>
            <div>{{ calendar.year }}年{{ calendar.month }}月</div>
            <span @click="selectMonth(1)"></span>
          </div>
          <div class="selectDay">
            <ol>
              <li v-for="d in ['日', '一', '二', '三', '四', '五', '六']">{{ d }}</li>
            </ol>
            <ol>
              <li v-for="(n, index) in calendar.firstDayOfTheWeek" :key="n"></li>
              <li v-for="(d, index) in calendar.NumberOfDays     " :key="d" 
                  :class="{'select': (index + 1 == calendar.selectDay.day) && 
                                     (calendar.year == calendar.selectDay.year) && 
                                     (calendar.month == calendar.selectDay.month)}"
                  @click="selectDay(d)">{{ d }}</li>
            </ol>
          </div>
          <div class="action">
            <div @click="toggleCalendar(false)">取消</div>
            <div @click="checkedDate(false)">確定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      type: {
        isIncome: false,
        selectorIsOpen: false,
      },
      _class: {
        list: [
          { icon: 0, color: 2, name: '電話費'},
          { icon: 1, color: 3, name: '水電費'},
          { icon: 2, color: 5, name: '酒精'},
          { icon: 3, color: 7, name: '儲糧'},
          { icon: 4, color: 0, name: '零食'},
          { icon: 5, color: 3, name: '交通'},
          { icon: 6, color: 6, name: '飲料'},
          { icon: 7, color: 3, name: '其他'},
          { icon: 8, color: 1, name: '正餐'},
          { icon: 9, color: 4, name: '貓'},
          { icon: 10, color: 5, name: '車'},
        ],
        selectIndex: null
      },
      form: {
        isOpen: false,
        description: {
            value: '',
            onFocus: false
        },
        date: {
          year: null,
          month: null,
          day: null
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
      calendar: {
        isOpen: false,
        year: 2021,
        month: 8,
        day: 31,
        NumberOfDays: 0,
        firstDayOfTheWeek: 0,
        selectDay: {
          year: 2021,
          month: 8,
          day: 31
        }
      }
    }
  },
  mounted() {
    this.form.date = this.today;
    this.initCalendar();
    // let formY = this.form.date.year;
    // let formM = this.form.date.month;
    // this.calendar.NumberOfDays = new Date(formY, formM, 0).getDate();
    // this.calendar.firstDayOfTheWeek = new Date(formY + "/"+ formM +"/1").getDay();
    // this.calendar.year = this.form.date.year;
    // this.calendar.month = this.form.date.month;
    // this.calendar.day = this.form.date.day;
    // this.calendar.selectDay.year = this.form.date.year;
    // this.calendar.selectDay.month = this.form.date.month;
    // this.calendar.selectDay.day = this.form.date.day;
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
    }
  },
  methods: {
    //calendar
    initCalendar(){
      let formY = this.form.date.year;
      let formM = this.form.date.month;
      this.calendar.NumberOfDays = new Date(formY, formM, 0).getDate();
      this.calendar.firstDayOfTheWeek = new Date(formY + "/"+ formM +"/1").getDay();
      this.calendar.year = this.form.date.year;
      this.calendar.month = this.form.date.month;
      this.calendar.day = this.form.date.day;
      this.calendar.selectDay.year = this.form.date.year;
      this.calendar.selectDay.month = this.form.date.month;
      this.calendar.selectDay.day = this.form.date.day;
    },
    toggleCalendar(toggleDirection){
      if(toggleDirection !== undefined){
        this.calendar.isOpen = toggleDirection;
      } else {
        this.calendar.isOpen = !this.calendar.isOpen;
      }
      if(this.calendar.isOpen) this.initCalendar();
    },
    selectDay(day){
      this.calendar.selectDay = {
        year: this.calendar.year,
        month: this.calendar.month,
        day: day
      }
    },
    selectMonth(selectDirection){
      this.calendar.month += selectDirection;
      if(this.calendar.month >= 13){
        this.calendar.month = 1;
        this.calendar.year++;
      } 
      else if (this.calendar.month <= 0){
        this.calendar.month = 12;
        this.calendar.year--;
      }
      this.calendar.NumberOfDays = new Date(this.calendar.year, this.calendar.month, 0).getDate();
      this.calendar.firstDayOfTheWeek = new Date(this.calendar.year + "/"+ this.calendar.month +"/1").getDay();
      this.calendar.day = 0;
    },
    checkedDate(){
      this.form.date = {
        year: this.calendar.selectDay.year,
        month: this.calendar.selectDay.month,
        day: this.calendar.selectDay.day
      }
      this.toggleCalendar(false);
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
      this._class.selectIndex = selectIndex;
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
  },
}
</script>
<style lang="scss" src="@/scss/record/addRecord.scss"></style>