<template>
    <div class="appointment-card">
        <h2>{{ clientName }}</h2>
        <p>{{ date }}</p>
        <p>Status:</p>
        <div style="display: flex; gap: 8px;" v-if="status == 'En attente'">
            <button @click="acceptAppointment">Valider</button>
            <button @click="rejectAppointment">Refuser</button>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
  id : String,
  clientName: String,
  date: String,
  status: String
})

const acceptAppointment = () => {
    modifStatus('Validé')
}

const rejectAppointment = () => {
    modifStatus('Refusé')
}

const modifStatus = async (changedStatus) => {
    let url = `http://localhost:3000/updateAppointment?id=${props.id}`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            status: changedStatus
        })
    })

    if (response.ok) {
        console.log('Status modifié')
    } else {
        console.log('Erreur lors de la modification du status')
    }
}
</script>

<style scoped>

.appointment-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    min-width: 15vw;
    min-height: 10vh;
    padding: 8px;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>