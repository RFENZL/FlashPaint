<template>
    <Header />

    <login v-if="isLoginVisible"/>
    <register v-else/>

    <button v-if="isLoginVisible" class="SwapForm" @click="showRegister">Créer un compte</button>
    <button v-else class="SwapForm" @click="showLogin">Déjà un compte ?</button>
</template>

<script setup>
    import { ref } from 'vue'
    import Header from '../components/Header.vue'
    import Login from '../components/LoginForm.vue'    
    import Register from '../components/RegisterForm.vue' 

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const isLoginVisible = ref(true)

    const showLogin = () => {
        isLoginVisible.value = true
    }

    const showRegister = () => {
        isLoginVisible.value = false
    }
</script>

<style>
.SwapForm {
    width: 20%;
    margin-left: 40%;
    margin-top: 10px;
    margin-bottom: 25px;
    padding: 0.5em;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
</style>