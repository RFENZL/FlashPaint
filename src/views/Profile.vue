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
            <div class="user-info-tail">
                <p>{{ lastName }}</p>
                <p>{{ firstName }}</p>
                <p>{{ email }}</p>
                <p>{{ userType }}</p>
            </div>
        </div>
    </div>



</template>

<script setup>
    import Header from '../components/Header.vue'

    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'John.Doe@hotmail.com';
    const userType = 'Client';

    const isAdmin = true;
    const isOwnProfile = true;


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