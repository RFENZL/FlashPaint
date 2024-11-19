<template>
  <v-carousel :cycle="cycle" :height="height" show-arrows>
    <v-carousel-item
      v-for="(image, index) in images"
      :key="index"
      :src="image"
    >
      <!-- Contenu supplémentaire -->
    </v-carousel-item>
  </v-carousel>
</template>

<script>
// Importation des images locales
import Joconde from '@/assets/Tableau/Joconde.jpg';
import LeCri from '@/assets/Tableau/Le Cri.png';
import Monet from '@/assets/Tableau/Monet.png';
import Picasso from '@/assets/Tableau/Picasso.png';
import Tournessol from '@/assets/Tableau/Tournesols Van Gogh.jpg';

export default {
  name: "CarrouselComponents",
  data() {
    return {
      // Liste des images locales importées
      images: [
        Joconde,
        LeCri,
        Monet,
        Picasso,
        Tournessol
      ],
      cycle: true,
      height: "70vh",
    };
  },
};
</script>

<style scoped>

</style>
