const db = require('./firebase');

// Fonction pour récupérer tous les canvas
async function getAllCanvas() {
  const canvasSnapshot = await db.ref('Canvas').once('value');
  const canvas = canvasSnapshot.val();

  if (!canvas || Object.keys(canvas).length === 0) {
    return { message: 'Aucun canvas trouvé dans la collection.' };
  }

  return canvas;
}

module.exports = { getAllCanvas };
