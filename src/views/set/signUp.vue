<template>
    <div class="signUp">
        <div class="container">
            <h2>註冊會員</h2>
            <div class="board">
                <label for="name">姓名</label>
                <input id="name" type="text" v-model="name.val">
                <p :class="{'show': !name.done}">姓名未填寫</p>

                <label for="email">email</label>
                <input id="email" type="text" v-model="email.val" class="email">
                <p :class="{'show': !email.done}">email未填寫</p>
                
                <label for="password">密碼</label>
                <input id="password" type="password" v-model="password.val">
                <p :class="{'show': !password.done}">密碼未填寫</p>
                
                <label for="checkPassword">確認密碼</label>
                <input id="checkPassword" type="password" v-model="checkPassword.val">
                <p :class="{'show': !checkPassword.done}">密碼輸入不一致</p>
            </div>
            <router-link to="login" @click.native.capture="checkForm">送出</router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'signUp',
    data() {
        return {
            name: {
                val: '',
                done: true
            },
            email: {
                val: '',
                done: true
            },
            password: {
                val: '',
                done: true
            },
            checkPassword: {
                val: '',
                done: true
            },
            fillDone: false
        }
    },
    methods: {
        checkForm(){
            this.name.done = this.name.val.length > 0 ? true : false;
            this.email.done = this.email.val.length > 0 && this.email.val.indexOf('@') != -1 ? true : false;
            this.password.done = this.password.val.length > 0 ? true : false;
            this.checkPassword.done = this.password.val == this.checkPassword.val ? true : false;
            this.fillDone = this.name.done && 
                            this.email.done && 
                            this.password.done && 
                            this.checkPassword.done ?
                            true : false;
            if(!this.fillDone){
                event.preventDefault();
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('post', '/api/signUp', true);
                xhr.setRequestHeader("Content-type","application/json");
                xhr.send(JSON.stringify({
                    name: this.name.val,
                    email: this.email.val,
                    password: this.password.val,
                }));
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        let response = xhr.response;
                        console.log(response);
                    }
                };
            }
        }
    },
}
</script>
<style lang="scss" src="@/scss/set/signUp.scss"></style>