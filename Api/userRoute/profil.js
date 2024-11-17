const fastify = require('fastify')({ logger: true });
const db = require('../firebase');

async function getUserProfile(id) {
    if (!id) {
      throw new Error('Le paramètre id est requis.');
    }
  
    const userSnapshot = await db.ref(`Users/${id}`).once('value');
    const user = userSnapshot.val();
  
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }
  
    return user;
  }
  
  // Exporter la fonction
  module.exports = { getUserProfile };
  