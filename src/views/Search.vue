<template>
    <Header />
    <SearchBar />
    <div class="grid-container">
        <SearchCard v-for="n in 10" :key="n" />
    </div>
    
    
</template>

<script setup>
    import Header from '../components/Header.vue'
    import SearchBar from '../components/SearchBar.vue'
    import SearchCard from '../components/SearchCard.vue'

</script>

<style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
        gap: 1rem;
        padding: 1rem;
    }
</style>