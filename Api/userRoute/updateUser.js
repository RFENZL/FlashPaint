const db = require('../firebase');

async function updateUserProfile(id, requesterId, updates) {
    if (!id || !requesterId) {
      throw new Error('Les paramètres id et requesterId sont requis.');
    }
  
    const userSnapshot = await db.ref(`Users/${id}`).once('value');
    const user = userSnapshot.val();
  
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }
  
    // Vérifier si l'utilisateur est Admin ou s'il met à jour son propre profil
    if (user.userType !== 'Admin' && id !== requesterId) {
      throw new Error('Accès interdit. Seul l\'administrateur ou l\'utilisateur concerné peut modifier ce profil.');
    }
  
    // Préparer les données à mettre à jour
    const validUpdates = {};
    if (updates.firstName) validUpdates.firstName = updates.firstName;
    if (updates.lastName) validUpdates.lastName = updates.lastName;
    if (updates.userType) validUpdates.userType = updates.userType;
  
    // Mettre à jour l'utilisateur dans la base de données
    await db.ref(`Users/${id}`).update(validUpdates);
  
    return { message: 'Profil utilisateur mis à jour avec succès.' };
  }
  
  // Exporter la fonction
  module.exports = { updateUserProfile };
  