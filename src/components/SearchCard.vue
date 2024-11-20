<template>
    <div class="search-card">
      <h2>Nom : {{ artist.lastName }}</h2>
      <h2>Prénom : {{ artist.firstName }}</h2>
      <button @click="openPopup">Prendre rendez-vous</button>
      <button @click="goToProfile">Voir le profil</button>
    </div>

    <TakeAppointment
      v-if="isPopupVisible"
      :artist="artist"
      :dateOptions="dateOptions"
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
        email: '',
        artistId: ''
      })
    },
    dateOptions: {
      type: Object,
      required: true,
      default: () => ({
        years: ["2025", "2026", "2027", "2028", "2029", "2030"],
        months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        days: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
      })
    }
  });

  const getArtistId = async () => {
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    for (let i in data) {
      if (data[i].email !== null && data[i].email === props.artist.email) {
        return i;
      }
    }
  };
  getArtistId().then(id => {
    // eslint-disable-next-line vue/no-mutating-props
    props.artist.artistId = id;
  });
  
  const isPopupVisible = ref(false);

  const goToProfile = () => {
    // Rediriger vers le profil de l'artiste
    window.location.href = `/artists/${props.artist.email}`; // Utilisez un identifiant unique comme email
  };

  const openPopup = () => {
    //console.log('open popup', props.artist.firstName);
    isPopupVisible.value = true;
  };

  const closePopup = () => {
    isPopupVisible.value = false;
  };
  </script>
  
  <style scoped>
  .search-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    width: 65%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  