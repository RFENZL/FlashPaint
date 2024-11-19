<template>
    <Header />

    <div class="profile">
        <div class="actions">
            <button v-if="isOwnProfile">Modifier le profil</button>
            <button v-if="isAdmin">Panel Admin</button>
        </div>
        <div class="user_info">
            <div class="user-info-head">
                <p><strong>Nom:</strong></p>
                <p><strong>Prénom:</strong></p>
                <p><strong>Email:</strong></p>
                <p><strong>Rôle:</strong></p>
            </div>
            <div class="user-info-tail" v-if="profilData">
                <p>{{ profilData.firstName }}</p>
                <p>{{ profilData.lastName }}</p>
                <p>{{ profilData.email }}</p>
                <p>{{ profilData.userType }}</p>
            </div>
        </div>
    </div>



</template>

<script setup>
    import Header from '../components/Header.vue'
    import { ref, onMounted } from 'vue'

    let profilData = ref(null)
    let isAdmin = false
    let isOwnProfile = false

    onMounted(async () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user')
    const url = `http://localhost:3000/profil?id=${userId}`

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        })
        const data = await response.json()
        profilData.value = data.user.user

        isAdmin = profilData.value.userType === 'admin'
        isOwnProfile = data.user.id === userId

    } catch (error) {
        console.error('Error:', error)
        alert('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
    })
</script>

<style scoped>
    .profile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        height: 80vh;
    }

    .user_info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }

    .user-info-head, .user-info-tail {
        max-width: 50%;
        margin-bottom: 1rem; 
        font-size: 3em;
    }

    .user-info-head {
        display: flex;
        flex-direction: column;
        justify-content: right;
        align-items: center;
        padding-right: 2em;
    }

    .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .actions button {
        padding: 0.5em;
        background-color: #007BFF;
        color: white;
        border: none;
        cursor: pointer;
        margin-left: 1em; 
        margin-right: 1em;
    }
</style>