<template>
    <div class="search-bar">
        <button @click="onFilters">
            <svg-icon type="mdi" :path="pathFilter"></svg-icon>
            <p> Filtres </p> 
        </button>
        <input type="text" v-model="query" @keyup.enter="onSearch" placeholder="Rechercher un artiste">
        <button @click="onSearch">
            <svg-icon type="mdi" :path="pathSearch"></svg-icon>
            <p> Rechercher </p>  
        </button>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify, mdiFilter} from '@mdi/js'

export default {
    name: 'SearchBar',
    components: {
        SvgIcon
    },
    data() {
        return {
            query: '',
            pathSearch: mdiMagnify,
            pathFilter: mdiFilter
        };
    },
    methods: {
        onSearch() {
            this.$emit('search', this.query);
        },
        onFilters() {
            this.$emit('filters');
        }
    }
};
</script>

<style scoped>
.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;

}

.search-bar input {
    width: 100%;
    max-width: 60%;
    border: 1px solid #ccc;
    padding: 10px;
}

.search-bar button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: space-around;
}

</style>