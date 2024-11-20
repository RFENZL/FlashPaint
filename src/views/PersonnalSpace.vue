<template>
    <Header />
    <div v-if="isClient">
        <div class="titles"><h2> Mes prochains rendez-vous : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardUser
            v-for="appointment in sortedAppointments"
            :key="appointment.id"
            :artistName="appointment.artistName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
        <div class="titles"><h2> Tous mes rendez-vous : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardUser
            v-for="appointment in appointments"
            :key="appointment.id"
            :artistName="appointment.artistName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
    </div>
    <div v-else>
        <div class="titles"><h2> Mes prochains rendez-vous : </h2></div>

        <div class="titles"><h2> Tous mes rendez-vous : </h2></div>
    </div> 

</template>

<script setup>
import Header from '../components/Header.vue'
import AppointementCardUser from '../components/AppointementCardUser.vue'
import { ref, onMounted } from 'vue'

const appointments = ref([])
let sortedAppointments = ref([])
const isClient = ref(true)

const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
  
      const data = await response.json();
  
      if (data) {
        const response = Object.values(data);
        //console.log(response)

        response.forEach((appointment) => {
            if (appointment.userId === localStorage.getItem('user')) {
                appointments.value.push(appointment)
            }
        })

        sortedAppointments.value = appointments.value
            .filter(appointment => appointment.status === 'Validé' || appointment.status === 'En attente')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      appointments.value = [];
    }
  };

onMounted(fetchAppointments)

</script>

<style scoped>
.titles {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 2vw;
}

.appointment-cards-container {
    display: flex;
    flex-direction: row;
    justify-content: left;
    overflow-x: auto;
    max-height: 300px;
    gap: 10px;
    margin-bottom: 25px;
}
</style>