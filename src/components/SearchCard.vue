<template>
    <div class="search-card">
      <h2>Nom : {{ artist.lastName }}</h2>
      <h2>Prénom : {{ artist.firstName }}</h2>
      <button @click="openPopup">Prendre rendez-vous</button>
      <button @click="goToProfile">Voir le profil</button>
    </div>

    <TakeAppointment
      v-if="isPopupVisible"
      @update-profile="updateProfile"
      @close="closePopup"
    />
  </template>
  
  <script setup>
  import TakeAppointment from './takeAppointment.vue';
  import { ref } from 'vue';

  const props = defineProps({
    artist: {
      type: Object,
      required: true,
      default: () => ({
        firstName: '',
        lastName: '',
        artistId: '',
        profileUrl: ''
      })
    }
  });

  const isPopupVisible = ref(false);

  const goToProfile = () => {
    // Rediriger vers le profil de l'artiste
    window.location.href = `/artists/${props.artist.email}`; // Utilisez un identifiant unique comme email
  };

  const openPopup = () => {
    isPopupVisible.value = true;
  };

  const closePopup = () => {
    isPopupVisible.value = false;
  };
  </script>
  
  <style scoped>
  .search-card {
    border: 1px solid #ccc;
    padding: 2.5%;
    border-radius: 8px;
    text-align: center;
  }
  
  button {
    margin-top: 8px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  