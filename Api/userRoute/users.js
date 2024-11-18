const db = require('../firebase');

async function getAllUsers() {
    const usersSnapshot = await db.ref('Users').once('value');
    const users = usersSnapshot.val();
  
    if (!users) {
      throw new Error('Aucun utilisateur trouvé dans la collection.');
    }
  
    return users;
  }
  
  module.exports = { getAllUsers };
  