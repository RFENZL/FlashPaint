
const db = require('../firebase'); // Importez votre configuration firebase


async function deleteUser(id, deleteConfirmation) {
  if (!id || deleteConfirmation !== 'yes') {
    throw new Error('Les paramètres id et delete (valeur doit être "yes") sont requis.');
  }

  const userSnapshot = await db.ref(`Users/${id}`).once('value');
  const user = userSnapshot.val();

  if (!user) {
    throw new Error('Utilisateur non trouvé.');
  }

  // Mettre à jour la référence utilisateur avec l'attribut delete
  await db.ref(`Users/${id}`).update({ delete: true });

  return { message: 'Attribut "delete" ajouté à l\'utilisateur avec succès.' };
}

module.exports = { deleteUser };
