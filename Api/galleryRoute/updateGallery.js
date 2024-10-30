const db = require('../firebase');

async function updateGallery(id, requesterId, newGallery) {
  if (!id || !requesterId || !Array.isArray(newGallery)) {
    throw new Error('Les paramètres id, requesterId et newGallery (doit être un tableau) sont requis.');
  }

  const userSnapshot = await db.ref(`Users/${id}`).once('value');
  const user = userSnapshot.val();

  if (!user) {
    throw new Error('Utilisateur non trouvé.');
  }

  // Vérifier si l'utilisateur est Admin ou s'il met à jour son propre profil
  if (user.userType !== 'Admin' && id !== requesterId) {
    throw new Error('Accès interdit. Seul l\'administrateur ou l\'utilisateur concerné peut modifier cette galerie.');
  }

  // Mettre à jour la galerie de l'utilisateur dans la base de données
  await db.ref(`Users/${id}`).update({ gallery: newGallery });

  return { message: 'Galerie mise à jour avec succès.' };
}

// Exporter la fonction
module.exports = { updateGallery };
