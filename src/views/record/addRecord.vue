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
          <li v-for="(item, index) in _class[type.isIncome ? 'income' : 'cost'].list"
              :key="index" 
              :class="{'gray': index !== _class[type.isIncome ? 'income' : 'cost'].selectIndex}"
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
      recordId: '',
      type: {
        isIncome: false,
        selectorIsOpen: false,
      },
      _class: {
        income: {
          list: [],
          selectIndex: null
        },
        cost: {
          list: [],
          selectIndex: null
        }
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
  beforeMount(){
    // 初始化日期
    this.form.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    }
      
    // 載入收支類別
    let res;
    let xhrClass = new XMLHttpRequest();
    xhrClass.onreadystatechange = function(){
      if(xhrClass.readyState === 4 && xhrClass.status === 200){
        res = JSON.parse(xhrClass.response);
      }
    };
    xhrClass.open('post', '/api/readClass', false);
    xhrClass.setRequestHeader('Content-type', 'application/json');
    xhrClass.send(JSON.stringify({
      email: localStorage.getItem('email'),
      loginCodeName: localStorage.getItem('loginCodeName'),
    }));
    res.forEach(item => {
      this._class[item.typeIsIncome ? 'income' : 'cost'].list.push(item);
    });
    this._class['income'].list = this._class['income'].list.sort(function (a, b) {
      return a.order > b.order ? 1 : -1;
    });
    this._class['cost'].list = this._class['cost'].list.sort(function (a, b) {
      return a.order > b.order ? 1 : -1;
    });

    // 修改帳目
    if(this.$route.query.id){
      let id = this.$route.query.id;
      this.recordId = id;
      let _this = this;
      let xhrRecord = new XMLHttpRequest();
      xhrRecord.onreadystatechange = function(){
        if(xhrRecord.readyState === 4 && xhrRecord.status === 200){
          let res = JSON.parse(xhrRecord.response);
          _this.type.isIncome = res.isIncome;
          _this.form.description.value = res.description;
          _this.form.date = {
            year: res.year,
            month: res.month,
            day: res.day,
          }
          _this.form.recordNumber.value = res.value;
          _this.form.isOpen = true;
          _this.timestamp = res.timestamp;
          let classOrder = _this._class[res.typeIsIncome?'income':'cost'].list.filter(function(value){
            return res.classId == value._id;
          })[0].order;
          _this._class[res.typeIsIncome?'income':'cost'].selectIndex = classOrder;
        }
      };
      xhrRecord.open('post', '/api/readRecord_findOne', false);
      xhrRecord.setRequestHeader('Content-type', 'application/json');
      xhrRecord.send(JSON.stringify({
        email: localStorage.getItem('email'),
        loginCodeName: localStorage.getItem('loginCodeName'),
        id: id
      }));
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
    today(){
      let today = new Date();
      return {
        year:   today.getFullYear(),
        month:  today.getMonth() + 1,
        day:    today.getDate(),
        // dayOfTheWeek: today.getDay()
      }
    },
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
      this._class[this.type.isIncome ? 'income' : 'cost'].selectIndex = selectIndex;
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
      if(this.$route.query.id){
        // 更新帳目
        let _this = this;
        this.timestamp.push(new Date())
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState === 4 && xhr.status === 200){
            if(JSON.parse(xhr.response).isSuccess) _this.back();
          }
        };
        xhr.open('post', '/api/updateRecord', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        let _class = this._class[this.typeIsIncome ? 'income' : 'cost'];
        xhr.send(JSON.stringify({
          email: localStorage.getItem('email'),
          loginCodeName: localStorage.getItem('loginCodeName'),
          recordId: this.$route.query.id,
          classId: _class.list[_class.selectIndex]._id,
          typeIsIncome: this.type.isIncome,
          description: this.form.description.value,
          value: Number(this.form.recordNumber.value),
          // time: new Date(this.form.date.year, this.form.date.month - 1, this.form.date.day),
          year: this.form.date.year,
          month: this.form.date.month,
          day: this.form.date.day,
          timestamp: this.timestamp,
        }));
      } else {
        // 新增帳目
        let _this = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState === 4 && xhr.status === 200){
            if(JSON.parse(xhr.response).isSuccess) _this.back();
          }
        };
        xhr.open('post', '/api/createRecord', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        let _class = this._class[this.type.isIncome ? 'income' : 'cost'];
        xhr.send(JSON.stringify({
          email: localStorage.getItem('email'),
          loginCodeName: localStorage.getItem('loginCodeName'),
          classId: _class.list[_class.selectIndex]._id,
          typeIsIncome: this.type.isIncome,
          description: this.form.description.value,
          value: Number(this.form.recordNumber.value),
          // time: new Date(this.form.date.year, this.form.date.month - 1, this.form.date.day),
          year: this.form.date.year,
          month: this.form.date.month,
          day: this.form.date.day,
          timestamp: new Date(),
        }));        
      }

    },
  },
}
</script>
<style scoped lang="scss" src="@/scss/record/addRecord.scss"></style>