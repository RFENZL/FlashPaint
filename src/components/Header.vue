<template>
    <header class="header">
        <nav class="nav-buttons">
            <button class="navs-btn" @click="navigate('home')" >
                <svg-icon type="mdi" :path="pathHome"></svg-icon>
                <p> Accueil </p>
            </button>
            <button class="navs-btn" @click="navigate('about')">
                <svg-icon type="mdi" :path="pathSearch"></svg-icon>
                <p> Recherche </p>
            </button>
            <button class="navs-btn" @click="navigate('contact')">
                <svg-icon type="mdi" :path="pathCalendar"></svg-icon>
                <p> Mon Espace </p>
            </button>
        </nav>
        <button class="profile-btn" @click="goToProfile">
            <svg-icon type="mdi" :path="pathAccount" :width="50" :height="50"></svg-icon>
        </button>
    </header>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountCircle, mdiHome, mdiMagnify, mdiCalendarBlank } from '@mdi/js'

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            pathAccount: mdiAccountCircle,
            pathHome: mdiHome,
            pathSearch: mdiMagnify,
            pathCalendar: mdiCalendarBlank,
        }
    },
    methods: {
        goToProfile() {
            // Logic to navigate to the profile
        },
        navigate(page) {
            // Logic to navigate to different pages
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f8f9fa;
    height: 12%;
}

.profile-btn {
    border-radius: 50%;
    padding: 4px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.nav-buttons button {
    margin-left: 15px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: space-around;
}
</style>