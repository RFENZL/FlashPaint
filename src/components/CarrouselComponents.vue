<template>
  <div class="Bienvenue">Bienvenue sur FlashPaint</div>
  <v-carousel :cycle="cycle" :height="height" show-arrows class="custom-carousel">
    <v-carousel-item
      v-for="(image, index) in images"
      :key="index"
      :src="image">
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { ref } from 'vue';
import Joconde from '@/assets/Tableau/Joconde.jpg';
import LeCri from '@/assets/Tableau/Le Cri.png';
import Monet from '@/assets/Tableau/Monet.png';
import Picasso from '@/assets/Tableau/Picasso.png';
import Tournessol from '@/assets/Tableau/Tournesols Van Gogh.jpg';

export default {
  name: "CarrouselComponents",
  setup() {
    // Déclare les données comme refs
    const images = ref([
      Joconde,
      LeCri,
      Monet,
      Picasso,
      Tournessol
    ]);
    const cycle = ref(true);
    const height = ref("80vh");

    // Retourne les valeurs pour les rendre disponibles dans le template
    return {
      images,
      cycle,
      height,
    };
  },
};
</script>

<style scoped>
.Bienvenue{
  font-size: 30px;
  text-align: center;
}

.custom-carousel {
  max-width: 80%; /* Diminue la largeur à 80% de l'écran */
  margin: 0 auto; /* Centre le carrousel */
}
</style>
