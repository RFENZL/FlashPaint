<template>
    <Header />
    <div v-if="isClient">
        <div class="titles"><h2> Mes prochains rendez-vous : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardUser
            v-for="appointment in sortedAppointmentsUser"
            :key="appointment.id"
            :artistName="appointment.artistName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
        <div class="titles"><h2> Tous mes rendez-vous : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardUser
            v-for="appointment in appointmentsUser"
            :key="appointment.id"
            :artistName="appointment.artistName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
    </div>
    <div v-else>
        <div class="titles"><h2> Rendez-vous à valider : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardArtist
            v-for="appointment in pendingAppointmentsArtist"
            :key="appointment.id"
            :id="appointment.id"
            :clientName="appointment.clientName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
        <div class="titles"><h2> Mes prochains rendez-vous : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardArtist
            v-for="appointment in validateAppointmentsArtist"
            :key="appointment.id"
            :clientName="appointment.clientName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
        <div class="titles"><h2> Tous mes rendez-vous : </h2></div>
        <div class="appointment-cards-container">
            <AppointementCardArtist
            v-for="appointment in appointmentsArtist"
            :key="appointment.id"
            :clientName="appointment.clientName"
            :date="appointment.date"
            :status="appointment.status"
            />
        </div>
    </div> 

</template>

<script setup>
import Header from '../components/Header.vue'
import AppointementCardUser from '../components/AppointementCardUser.vue'
import AppointementCardArtist from '../components/AppointmentCardArtist.vue'
import { ref, onMounted } from 'vue'

const appointmentsUser = ref([])
let sortedAppointmentsUser = ref([])
const appointmentsArtist = ref([])
let pendingAppointmentsArtist = ref([])
let validateAppointmentsArtist = ref([])
let isClient = ref(true)

const getUserType = async () => {
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
    for (let i in data) {
      if (i === localStorage.getItem('user')) {
        if (data[i].userType === 'Artist' || data[i].userType === 'Artiste' || data[i].userType === 'artist' || data[i].userType === 'artiste') {
          isClient.value = !isClient.value
        }
      }
    }
  }
  onMounted(getUserType)

const fetchAppointmentsUser = async () => {
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
        if (isClient.value) {
          response.forEach((appointment) => {
            if (appointment.userId === localStorage.getItem('user')) {
                appointmentsUser.value.push(appointment)
            }
          })
          sortedAppointmentsUser.value = appointmentsUser.value
            .filter(appointment => appointment.status === 'Validé' || appointment.status === 'En attente')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        } else {
          response.forEach((appointment) => {
            if (appointment.artistId === localStorage.getItem('user')) {
                appointmentsArtist.value.push(appointment)
            }
          })
          pendingAppointmentsArtist.value = appointmentsArtist.value
            .filter(appointment => appointment.status === 'En attente')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
          validateAppointmentsArtist.value = appointmentsArtist.value
            .filter(appointment => appointment.status === 'Validé')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            console.log(appointmentsArtist.value)
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      appointmentsUser.value = [];
    }
  };
  onMounted(fetchAppointmentsUser)

  const getNames = async () => {
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
    for (let i in data) {
      if (isClient.value) {
        appointmentsUser.value.forEach((appointment) => {
        if (i === appointment.artistId) {
          appointment.artistName = data[i].lastName + ' ' + data[i].firstName
        }
      })
      } else {
        appointmentsArtist.value.forEach((appointment) => {
        if (i === appointment.userId) {
          appointment.clientName = data[i].lastName + ' ' + data[i].firstName
        }
      })
    }
  }
  }
  onMounted(getNames)


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