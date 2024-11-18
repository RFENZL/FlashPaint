const db = require('../firebase'); // Importez votre configuration firebase

// Fonction pour créer un nouveau canvas
async function createCanvas(canvasId, artistId, type, tags, status) {
  if (!canvasId || !artistId || !type || !tags || !status) {
    throw new Error('Tous les champs sont requis : canvasId, artistId, type, tags, status.');
  }

  await db.ref(`Canvas/${canvasId}`).set({
    artistId,
    type,
    tags,
    status        
  });

  return { id: canvasId, message: 'Canvas créé avec succès' };
}

module.exports = { createCanvas };
