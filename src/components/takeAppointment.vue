<template>
    <div class="popup-overlay">
      <div class="popup">
        <h2>Prendre le rendez-vous</h2>
        <div class="artistName"><h3> Artiste : <br> {{ artist.lastName }} {{ artist.firstName }}</h3></div>
        <form @submit.prevent="submitChanges">
          <label for="date" style="text-align: center;"><h3>Date</h3></label>
            <div style="display: flex; gap: 3%;">
            <div style="width: 30%;">
              <label for="year">Année</label>
              <select id="year" v-model="selectedDate.year" required>
                <option v-for="year in props.dateOptions.years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>

            <div style="width: 30%;">
              <label for="month">Mois</label>
              <select id="month" v-model="selectedDate.month" required>
              <option v-for="month in props.dateOptions.months" :key="month" :value="month">{{ month }}</option>
              </select>
            </div>

            <div style="width: 30%;">
              <label for="day">Jour</label>
              <select id="day" v-model="selectedDate.day" required>
              <option v-for="day in props.dateOptions.days" :key="day" :value="day">{{ day }}</option>
              </select>
            </div>
            </div>
          <div class="actions">
            <button type="submit" @click="submitAppointment">Valider</button>
            <button type="button" @click="closePopup">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';

  const props = defineProps({
    artist: {
      type: Object,
      required: true,
    },
    dateOptions: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(['close']);

  const selectedDate = ref({
    year: '',
    month: '',
    day: '',
  });

  const submitAppointment = async () => {
    const appointmentData = {
      userId: localStorage.getItem('user'),
      artistId: props.artist.artistId,
      date: `${selectedDate.value.year}-${selectedDate.value.month}-${selectedDate.value.day}`,
    };
    console.log(appointmentData);
    const response = await fetch('http://localhost:3000/newAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du rendez-vous');
    } else {
      console.log('Rendez-vous créé avec succès');
    }

    emit('close');
  };

  const closePopup = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
  }
  
  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  
  label {
    display: block;
    margin: 0.5rem 0 0.2rem;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"] {
    background-color: #007bff;
    color: white;
  }
  
  button[type="button"] {
    background-color: #ccc;
    color: black;
  }

  .artistName {
    text-align: center;
  }
  </style>
  