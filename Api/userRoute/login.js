const fastify = require('fastify')({ logger: true });
const db = require('../firebase');

async function loginUser(userId) {
    if (!userId) {
      throw new Error('Le champ userId est requis.');
    }
  
    const userSnapshot = await db.ref(`Users/${userId}`).once('value');
    const user = userSnapshot.val();
  
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }
  
    return { message: 'Connexion réussie.', user };
  }
  
  // Exporter la fonction
  module.exports = { loginUser };
  