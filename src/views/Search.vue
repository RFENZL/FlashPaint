<template>
    <Header />
    <SearchBar @search="fetchArtists" />
    
    <div class="grid-container">
      <SearchCard 
        v-for="artist in artists" 
        :key="artist.email" 
        :artist="artist" 
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Header from '../components/Header.vue';
  import SearchBar from '../components/SearchBar.vue';
  import SearchCard from '../components/SearchCard.vue';
  
  const artists = ref([]);
  const searchQuery = ref(''); // Variable pour stocker la valeur de recherche
  
  // Méthode pour récupérer les artistes et filtrer par prénom et nom
  const fetchArtists = async (query = '') => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
  
      const data = await response.json();
      console.log('Données récupérées:', data);
  
      if (data) {
        const users = Object.values(data);
  
        // Filtrer les utilisateurs par userType (Artist ou Artiste) et par prénom et nom
        artists.value = users
          .filter(user => 
            (user.userType && (user.userType.toLowerCase() === 'artist' || user.userType.toLowerCase() === 'artiste'))
          )
          .filter(user => 
            user.firstName.toLowerCase().includes(query.toLowerCase()) || // Filtrage par prénom
            user.lastName.toLowerCase().includes(query.toLowerCase())   // Filtrage par nom
          );
      } else {
        console.error('Les données des utilisateurs sont mal formatées ou absentes');
        artists.value = [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des artistes:', error);
      artists.value = [];
    }
  };
  
  // Appel initial pour récupérer tous les artistes
  onMounted(() => {
    fetchArtists();
  });
  
  // Écouteur pour le changement de recherche
  const handleSearch = (query) => {
    fetchArtists(query); // Filtrer les artistes avec le terme de recherche
  };
  </script>
  
  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  </style>
  