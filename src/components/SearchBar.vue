<template>
    <div class="search-bar">
      <!-- Bouton pour ouvrir les filtres -->
      <!-- <button @click="togglePopup">
        <svg-icon type="mdi" :path="pathFilter" />
        <p>Filtres</p>
      </button> -->
  
      <!-- Champ de recherche -->
      <input 
        type="text" 
        v-model="query" 
        @input="onSearch"  
        placeholder="Rechercher un artiste"
      />
  
      <!-- Bouton pour effectuer la recherche -->
      <button @click="onSearch">
        <svg-icon type="mdi" :path="pathSearch" />
        <p>Rechercher</p>
      </button>
  
      <!-- Popup SlidingFilter -->
      <SlidingFilter 
        :isVisible="isPopupVisible" 
        @close="togglePopup" 
        @filter="onFilterApply" 
      />
    </div>
  </template>
  
  <script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiMagnify, mdiFilter } from '@mdi/js';
  import SlidingFilter from '../components/Filter.vue'; // Assurez-vous que le chemin est correct
  
  export default {
    name: 'SearchBar',
    components: {
      SvgIcon,
      SlidingFilter,
    },
    data() {
      return {
        query: '', // Valeur de la recherche
        pathSearch: mdiMagnify, // Icône de recherche
        pathFilter: mdiFilter, // Icône de filtre
        isPopupVisible: false, // Contrôle la visibilité du popup
      };
    },
    methods: {
      // Méthode appelée lors de l'input de recherche
      onSearch() {
        this.$emit('search', this.query); // Émettre l'événement avec la valeur de la recherche
      },
  
      // Toggle la visibilité du popup
      togglePopup() {
        this.isPopupVisible = !this.isPopupVisible;
      },
  
      // Gestion des filtres appliqués depuis le popup
      onFilterApply(filterData) {
        console.log('Filtres appliqués:', filterData);
        this.$emit('filters', filterData);
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
  }
  
  .search-bar input {
    width: 100%;
    max-width: 60%;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .search-bar button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .search-bar button p {
    margin: 0 5px;
  }
  </style>
  