<template>
    <Header />
    <button @click="showLogin">Show Login</button>
    <button @click="showRegister">Show Register</button>

    <login v-if="isLoginVisible"/>  
    <register v-else/>
</template>

<script setup>
    import { ref } from 'vue'
    import Header from '../components/Header.vue'
    import Login from '../components/LoginForm.vue'    
    import Register from '../components/RegisterForm.vue' 

    const isLoginVisible = ref(true)

    const showLogin = () => {
        isLoginVisible.value = true
    }

    const showRegister = () => {
        isLoginVisible.value = false
    }
</script>