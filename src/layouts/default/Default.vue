<template>
  <v-app>
    <Header />

    <login v-if="isLoginVisible"/>
    <register v-else/>
  </v-app>
</template>

<script setup>
  //import DefaultBar from './AppBar.vue' <default-bar />
  //import DefaultView from './View.vue' <default-view />
  import Header from '../../components/Header.vue'
  import Login from '../../components/LoginForm.vue'
  import Register from '../../components/RegisterForm.vue'
  
</script>
