<template>
    <div class="appointment-card" :style="cardStyle">
        <h2>{{ artistName }}</h2>
        <p>{{ date }}</p>
        <p>Status: <br> {{ status }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  artistName: String,
  date: String,
  status: String
})

const cardStyle = computed(() => {
    let backgroundColor = '#white';
    let opacity = 1;
    if (props.status === 'Validé') {
        backgroundColor = 'paleGreen';
    } else if (props.status === 'En attente') {
        backgroundColor = 'white';
    } else if (props.status === 'Refusé') {
        backgroundColor = '#FF746C';
    } else if (props.status === 'Terminé') {
        backgroundColor = '#ccc';
        opacity = 0.6;
    }
    return { backgroundColor, opacity };
});
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