<template>
    <div class="popup-overlay">
      <div class="popup">
        <h2>Prendre le rendez-vous</h2>
        <form @submit.prevent="submitChanges">

          <div class="actions">
            <button type="submit">Valider</button>
            <button type="button" @click="closePopup">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'takeAppointment',
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
    methods: {
      submitChanges() {
        this.$emit('update-profile', this.formData);
      },
      closePopup() {
        this.$emit('close');
      },
    },
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
  </style>
  