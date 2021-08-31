import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);

app.directive('clickStyle', {
    // created(el){ },
    // beforeMount(el){ },
    mounted(el){
        el.classList.add('clickStyle');
        el.addEventListener('mousedown', ()=>{
            el.classList.add('mousedown');
            event.stopPropagation();
        });
        el.addEventListener('touchstart', ()=>{
            el.classList.add('mousedown');
            event.stopPropagation();
        });
        el.addEventListener('mouseup', ()=>{
            el.classList.remove('mousedown');
            event.stopPropagation();
        });
        el.addEventListener('touchend', ()=>{
            el.classList.remove('mousedown');
            event.stopPropagation();
        });
        el.addEventListener('click', ()=>{
            event.stopPropagation();
        });
    },
    // beforeUpdated(el){ },
    updated(el){
        el.classList.add('clickStyle');
        el.addEventListener('mousedown', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('touchstart', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('mouseup', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('touchend', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('click', ()=>{
            event.stopPropagation();
        });
    },
    // beforeUnmount(el){ },
    // umounted(el){ }
});
app.directive('stopPropagation', {
    mounted(el){
        el.addEventListener('mousedown', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('touchstart', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('mouseup', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('touchend', ()=>{
            event.stopPropagation();
        });
        el.addEventListener('click', ()=>{
            event.stopPropagation();
        });
    }
})

app.use(store).use(router).mount('#app');