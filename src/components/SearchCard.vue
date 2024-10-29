<template>
    <div class="search-card">
        <!-- <h2> Nom : {{ artist.lastName }}</h2>
        <h2> Prénom : {{ artist.firstName }}</h2> -->
        <h2> Nom : Fayolle</h2>
        <h2> Prénom : Quentin</h2>
        <button @click="goToProfile">Voir le profil</button>
    </div>
</template>

<script>
export default {
    name: 'SearchCard',
    props: {
        artist: {
            type: Object,
            required: true,
            default: () => ({
                firstName: '',
                lastName: '',
                profileUrl: ''
            })
        }
    },
    methods: {
        goToProfile() {
            window.location.href = this.artist.profileUrl;
        }
    }
}
</script>

<style scoped>
.search-card {
    border: 1px solid #ccc;
    padding: 2.5%;
    border-radius: 8px;
    text-align: center;
}
button {
    margin-top: 8px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
</style>