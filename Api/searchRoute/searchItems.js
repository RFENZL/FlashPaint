const db = require('../firebase');

async function searchItems(filters) {
  try {
    const snapshot = await db.ref('Canvas').once('value');

    console.log('Lecture des données depuis Firebase...');
    if (!snapshot.exists()) {
      console.log('Aucune donnée trouvée.');
      return [];
    }

    const allItems = snapshot.val();
    console.log('Données récupérées:', allItems);

    const results = Object.keys(allItems)
      .map((key) => ({ id: key, ...allItems[key] }))
      .filter((item) => {
        const matchType = !filters.type || item.type === filters.type;
        const matchArtist = !filters.artist || String(item.artistId) === String(filters.artist);
        const matchStatus = !filters.status || item.status === filters.status;
        const matchTags =
          !filters.tags ||
          (Array.isArray(item.tags) &&
            filters.tags.some((tag) => item.tags.includes(tag))); // Au moins un tag correspondant

        console.log(`Filtrage de l'item ${item.id}:`, {
          matchType,
          matchArtist,
          matchStatus,
          matchTags,
        });

        return matchType && matchArtist && matchStatus && matchTags;
      });

    console.log('Filtres appliqués :', filters);
    console.log('Résultats après filtrage :', results);

    return results;
  } catch (error) {
    console.error('Erreur lors de la recherche dans la base de données Firebase:', error);
    throw new Error('Erreur lors de la recherche.');
  }
}

module.exports = { searchItems };
