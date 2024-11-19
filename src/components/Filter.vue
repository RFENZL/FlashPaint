<template>
    <div>
      <!-- Overlay sombre pour fermer le popup -->
      <div 
        class="overlay" 
        v-if="isVisible" 
        @click="$emit('close')">
      </div>
  
      <!-- Popup coulissant -->
      <div class="popup" :class="{ open: isVisible }">
        <div class="popup-header">
          <h2>Filtrer</h2>
          <button class="close-popup-btn" @click="$emit('close')">✖</button>
        </div>
        <div class="popup-content">
          <h3>Choisissez vos tags</h3>
          <div class="tags">
            <button 
              v-for="tag in tags" 
              :key="tag" 
              :class="{ selected: selectedTags.includes(tag) }"
              @click="toggleTag(tag)">
              {{ tag }}
            </button>
          </div>
  
          <h3>Choisissez un thème</h3>
          <div class="themes">
            <button 
              v-for="theme in themes" 
              :key="theme" 
              :class="{ selected: selectedTheme === theme }"
              @click="selectTheme(theme)">
              {{ theme }}
            </button>
          </div>
  
          <button class="search-btn" @click="search">Rechercher</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { ref } from 'vue';
  
  export default {
    name: "SlidingFilter",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    setup(_, { emit }) {
      const tags = ref(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]);
      const themes = ref(["Thème1", "Thème2", "Thème3", "Thème4", "Thème5"]);
  
      const selectedTags = ref([]);
      const selectedTheme = ref(null);
  
      const toggleTag = (tag) => {
        if (selectedTags.value.includes(tag)) {
          selectedTags.value = selectedTags.value.filter((t) => t !== tag);
        } else {
          selectedTags.value.push(tag);
        }
      };
  
      const selectTheme = (theme) => {
        selectedTheme.value = theme;
      };
  
      const search = () => {
        const data = {
          theme: selectedTheme.value,
          tags: selectedTags.value,
        };
        console.log(data);
        alert(`Recherche avec thème "${data.theme}" et tags : ${data.tags.join(", ")}`);
        emit('close'); // Fermer le popup après la recherche
      };
  
      return {
        tags,
        themes,
        selectedTags,
        selectedTheme,
        toggleTag,
        selectTheme,
        search,
      };
    },
  };
  </script>
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  
  .popup {
    position: fixed;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    z-index: 20;
    padding: 20px;
    transition: left 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
  }
  
  .popup.open {
    left: 0;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .popup-header h2 {
    margin: 0;
    font-size: 20px;
  }
  
  .close-popup-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .popup-content {
    margin-top: 20px;
  }
  
  .tags, .themes {
    margin: 10px 0;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  button {
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  button.selected {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  button:hover {
    background-color: #e0e0e0;
  }
  
  .search-btn {
    margin-top: 20px;
    padding: 10px 40px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    align-self: center;
  }
  
  .search-btn:hover {
    background-color: #0056b3;
  }
  </style>
  
  