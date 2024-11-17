const db = require('../firebase'); // Importez votre configuration firebase

async function deleteCanvas(canvasId, deleteConfirmation) {
  if (!canvasId || deleteConfirmation !== 'yes') {
    throw new Error('Les paramètres canvasId et delete (valeur doit être "yes") sont requis.');
  }

  const canvasSnapshot = await db.ref(`Canvas/${canvasId}`).once('value');
  const canvas = canvasSnapshot.val();

  if (!canvas) {
    throw new Error('Canvas non trouvé.');
  }

  // Mettre à jour la référence canvas avec l'attribut delete
  await db.ref(`Canvas/${canvasId}`).update({ delete: true });

  return { message: 'Attribut "delete" ajouté au canvas avec succès.' };
}

module.exports = { deleteCanvas };
