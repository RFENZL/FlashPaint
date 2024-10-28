<template>
  <v-app>
    <Header />
    
    <default-view />

  </v-app>
</template>

<script setup>
  //import DefaultBar from './AppBar.vue' <default-bar />
  import DefaultView from './View.vue' 
  import Header from '../../components/Header.vue'
  // import Login from '../../components/LoginForm.vue'    <login v-if="isLoginVisible"/>  
  // import Register from '../../components/RegisterForm.vue'  <register v-else/>

</script>
