<template>
  <div class="addRecord">
    
  </div>
</template>

<script>
import board from '@/components/public/board.vue'
import header from '@/components/public/header.vue'
import menu from '@/components/public/menu.vue'
import calendar from '@/components/record/calendar.vue'
import classBtn from '@/components/record/classBtn.vue'
import keyboard from '@/components/record/keyboard.vue'

export default {
  name: 'addRecord',
  components: {
    calendar, classBtn, keyboard, board, header, menu
  }
}
</script>
