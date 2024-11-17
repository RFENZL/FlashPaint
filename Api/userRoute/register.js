const fastify = require('fastify')({ logger: true });
const db = require('../firebase');
async function registerUser(userId, firstName, lastName, userType) {
    if (!userId || !firstName || !lastName || !userType) {
      throw new Error('Tous les champs sont requis : userId, firstName, lastName, userType.');
    }
  
    await db.ref(`Users/${userId}`).set({
      firstName,
      lastName,
      userType
    });
  
    return { id: userId, message: 'Utilisateur ajouté avec succès' };
  }
  module.exports = { registerUser };