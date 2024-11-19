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

onMounted(async () => {
  appointments.value = [
    { id: 1, artistName: 'Marc Dutronc',  date: '2023-10-01', status: 'Validé' },
    { id: 2, artistName: 'Picasso', date: '2023-10-02', status: 'En attente' },
    { id: 3, artistName: 'Jean Marc', date: '2023-10-03', status: 'Validé' },
    { id: 4, artistName: 'Van Gogh',  date: '2023-10-04', status: 'Refusé' },
    { id: 1, artistName: 'Marc Dutronc',  date: '2023-10-01', status: 'Terminé' },
    { id: 2, artistName: 'Picasso', date: '2023-10-02', status: 'En attente' },
    { id: 3, artistName: 'Jean Marc', date: '2023-10-03', status: 'Validé' },
    { id: 4, artistName: 'Van Gogh',  date: '2023-10-04', status: 'Refusé' },
    { id: 1, artistName: 'Marc Dutronc',  date: '2023-10-01', status: 'Validé' },
    { id: 2, artistName: 'Picasso', date: '2023-10-02', status: 'En attente' },
    { id: 3, artistName: 'Jean Marc', date: '2023-10-03', status: 'Terminé' },
    { id: 4, artistName: 'Van Gogh',  date: '2023-10-04', status: 'Refusé' },
    { id: 1, artistName: 'Marc Dutronc',  date: '2023-10-01', status: 'Validé' },
    { id: 2, artistName: 'Picasso', date: '2023-10-02', status: 'En attente' },
    { id: 3, artistName: 'Jean Marc', date: '2023-10-03', status: 'Validé' },
    { id: 4, artistName: 'Van Gogh',  date: '2023-10-04', status: 'Refusé' }
  ]

    
    sortedAppointments.value = appointments.value
        .filter(appointment => appointment.status === 'Validé' || appointment.status === 'En attente')
        .sort((a, b) => new Date(a.date) - new Date(b.date));

})

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